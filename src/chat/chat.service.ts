import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { FavoritesService } from '../favorites/favorites.service';
import { ChatMessageDto } from './dto/chat-request.dto';

const SYSTEM_PROMPT = `Tu es un assistant culinaire expert du Guide Michelin. Tu aides les utilisateurs à explorer des restaurants, plats et expériences gastronomiques.
Tu peux consulter les favoris de l'utilisateur pour personnaliser tes réponses. Réponds toujours en français sauf si l'utilisateur écrit dans une autre langue.`;

const GET_FAVORITES_TOOL = {
  type: 'function',
  function: {
    name: 'get_favorites',
    description:
      "Récupère tous les favoris de l'utilisateur : plats favoris, restaurants favoris et expériences favorites.",
    parameters: { type: 'object', properties: {}, required: [] },
  },
};

interface AzureToolCall {
  id: string;
  type: 'function';
  function: { name: string; arguments: string };
}

interface AzureMessage {
  role: string;
  content: string | null;
  tool_calls?: AzureToolCall[];
  tool_call_id?: string;
}

@Injectable()
export class ChatService {
  private readonly baseUrl: string;
  private readonly apiKey: string;
  private readonly model: string;

  constructor(private readonly favoritesService: FavoritesService) {
    this.baseUrl = process.env.AZURE_OPENAI_ENDPOINT ?? '';
    this.apiKey = process.env.AZURE_AI_KEY ?? '';
    this.model = process.env.AZURE_AI_MODEL ?? 'gpt-4o';

    if (!this.baseUrl || !this.apiKey) {
      console.warn('[ChatService] AZURE_OPENAI_ENDPOINT ou AZURE_AI_KEY manquant dans .env');
    }
  }

  async chat(userId: string, messages: ChatMessageDto[]): Promise<string> {
    const conversation: AzureMessage[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages.map((m) => ({ role: m.role, content: m.content })),
    ];

    const response = await this.callChatCompletion(conversation, [GET_FAVORITES_TOOL]);

    if (!response.tool_calls?.length) {
      return response.content ?? '';
    }

    conversation.push({
      role: 'assistant',
      content: response.content,
      tool_calls: response.tool_calls,
    });

    for (const toolCall of response.tool_calls) {
      const result = await this.executeTool(userId, toolCall.function.name);
      conversation.push({
        role: 'tool',
        tool_call_id: toolCall.id,
        content: JSON.stringify(result),
      });
    }

    const final = await this.callChatCompletion(conversation, [GET_FAVORITES_TOOL]);
    return final.content ?? '';
  }

  private async executeTool(userId: string, toolName: string): Promise<unknown> {
    if (toolName === 'get_favorites') {
      const [dishes, restaurants, experiences] = await Promise.allSettled([
        this.favoritesService.listForUser(userId),
        this.favoritesService.listRestaurantFavoritesForUser(userId),
        this.favoritesService.listExperienceFavoritesForUser(userId),
      ]);
      return {
        dishes: dishes.status === 'fulfilled' ? dishes.value : [],
        restaurants: restaurants.status === 'fulfilled' ? restaurants.value : [],
        experiences: experiences.status === 'fulfilled' ? experiences.value : [],
      };
    }
    return { error: `Outil inconnu: ${toolName}` };
  }

  private async callChatCompletion(
    messages: AzureMessage[],
    tools: unknown[],
  ): Promise<{ content: string | null; tool_calls?: AzureToolCall[] }> {
    const url = `${this.baseUrl}/chat/completions`;

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': this.apiKey,
      },
      body: JSON.stringify({ model: this.model, messages, tools, tool_choice: 'auto' }),
    });

    if (!res.ok) {
      const error = await res.text();
      throw new InternalServerErrorException(`Azure OpenAI error ${res.status}: ${error}`);
    }

    const data = (await res.json()) as any;
    const choice = data.choices[0];
    return {
      content: choice.message.content,
      tool_calls: choice.message.tool_calls,
    };
  }
}
