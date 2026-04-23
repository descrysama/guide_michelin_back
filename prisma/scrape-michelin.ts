import { PrismaClient } from '@prisma/client';

type ScrapedRestaurant = {
  slug: string;
  nom: string;
  adresse: string;
  ville: string;
  pays: string;
  imageUrls: string[];
  distinction: number;
  latitude: number | null;
  longitude: number | null;
  cuisineType: string;
  priceRange: string;
  sourceUrl: string;
  sourceHotelName: string | null;
  sourceAttributes: Record<string, string | number | null>;
};

type DishTemplate = {
  title: string;
  caption: string;
  mood: string;
  vegan: boolean;
  ingredients: string[];
  allergens: string[];
  tags: string[];
  prepTimeRange: [number, number];
};

const prisma = new PrismaClient();
const BASE_URL = 'https://guide.michelin.com';
const LIST_URL = `${BASE_URL}/fr/fr/restaurants`;

const DEFAULT_HORAIRES = [
  { jour: 'LUNDI', creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:00', fermeture: '22:00' }] },
  { jour: 'MARDI', creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:00', fermeture: '22:00' }] },
  { jour: 'MERCREDI', creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:00', fermeture: '22:00' }] },
  { jour: 'JEUDI', creneaux: [{ ouverture: '12:00', fermeture: '14:00' }, { ouverture: '19:00', fermeture: '22:00' }] },
  { jour: 'VENDREDI', creneaux: [{ ouverture: '12:00', fermeture: '14:30' }, { ouverture: '19:00', fermeture: '22:30' }] },
  { jour: 'SAMEDI', creneaux: [{ ouverture: '12:00', fermeture: '14:30' }, { ouverture: '19:00', fermeture: '22:30' }] },
  { jour: 'DIMANCHE', creneaux: [{ ouverture: '12:00', fermeture: '14:30' }] },
];

function htmlDecode(input: string): string {
  return input
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&eacute;/g, '�')
    .replace(/&egrave;/g, '�')
    .replace(/&ecirc;/g, '�')
    .replace(/&agrave;/g, '�')
    .replace(/&ccedil;/g, '�')
    .replace(/&ocirc;/g, '�')
    .replace(/&ucirc;/g, '�')
    .replace(/&icirc;/g, '�')
    .replace(/&uuml;/g, '�')
    .replace(/&ouml;/g, '�')
    .replace(/&auml;/g, '�')
    .replace(/&ndash;/g, '-')
    .replace(/&mdash;/g, '-')
    .replace(/&rsquo;/g, '�')
    .replace(/&lsquo;/g, '�')
    .replace(/&ldquo;/g, '�')
    .replace(/&rdquo;/g, '�')
    .replace(/&#(\d+);/g, (_, num) => String.fromCharCode(Number(num)));
}

function stripTags(input: string): string {
  return htmlDecode(input.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
}

function slugFromHref(href: string): string {
  const normalized = href.replace(/^https?:\/\/[^/]+/, '');
  const parts = normalized.split('/').filter(Boolean);
  return parts[parts.length - 1] ?? normalized;
}

function splitCards(html: string): string[] {
  const marker = '<div class="card__menu selection-card';
  const cards: string[] = [];
  let cursor = 0;

  while (true) {
    const start = html.indexOf(marker, cursor);
    if (start === -1) break;

    const next = html.indexOf(marker, start + marker.length);
    cards.push(html.slice(start, next === -1 ? html.length : next));
    if (next === -1) break;
    cursor = next;
  }

  return cards;
}

function parseCard(card: string): ScrapedRestaurant | null {
  const hrefMatch = card.match(/<h3 class="card__menu-content--title[\s\S]*?<a href="([^"]*\/restaurant\/[^"]+)"/i);
  if (!hrefMatch?.[1]) return null;

  const href = hrefMatch[1];
  const slug = slugFromHref(href);

  const nameMatch = card.match(/<h3 class="card__menu-content--title[\s\S]*?<a [^>]*>([\s\S]*?)<\/a>/i);
  const nom = stripTags(nameMatch?.[1] ?? '').trim();

  const imageMatch = card.match(/ci-bg-url="([^"]+)"/i);
  const imageUrl = imageMatch?.[1] ?? '';

  const starCount = (card.match(/class="michelin-award"/g) ?? []).length;
  const distinction = Math.max(1, Math.min(3, starCount || 1));

  const locationMatch = card.match(/<div class="card__menu-footer--score pl-text">\s*([\s\S]*?)\s*<\/div>/i);
  const locationRaw = stripTags(locationMatch?.[1] ?? '');
  const locationParts = locationRaw.split(',').map((part) => part.trim()).filter(Boolean);
  const ville = locationParts[0] ?? '';
  const pays = locationParts[locationParts.length - 1] ?? '';

  const scoreBlocks = [...card.matchAll(/<div class="card__menu-footer--score pl-text\s*">([\s\S]*?)<\/div>/gi)];
  const scoreText = stripTags(scoreBlocks[1]?.[1] ?? '');

  const priceMatch = scoreText.match(/[�$��]{1,4}/);
  const priceRange = priceMatch?.[0] ?? '��';
  const cuisineType = scoreText.replace(/[�$��]{1,4}/g, '').replace(/�/g, '').trim() || 'Cuisine gastronomique';

  const latMatch = card.match(/data-lat="([^"]+)"/i);
  const lngMatch = card.match(/data-lng="([^"]+)"/i);
  const latitude = latMatch ? Number(latMatch[1]) : null;
  const longitude = lngMatch ? Number(lngMatch[1]) : null;

  const hotelMatch = card.match(/class="card__menu-footer--restaurant[\s\S]*?<span>([\s\S]*?)<\/span>/i);
  const sourceHotelName = hotelMatch?.[1] ? stripTags(hotelMatch[1]) : null;

  const dtmRegion = card.match(/data-dtm-region="([^"]*)"/i)?.[1] ?? '';
  const dtmCity = card.match(/data-dtm-city="([^"]*)"/i)?.[1] ?? '';
  const dtmPrice = card.match(/data-dtm-price="([^"]*)"/i)?.[1] ?? '';

  const adresse = [ville, pays].filter(Boolean).join(', ') || locationRaw || 'Adresse non communiqu�e';

  return {
    slug,
    nom: nom || slug,
    adresse,
    ville,
    pays,
    imageUrls: imageUrl ? [imageUrl] : [],
    distinction,
    latitude: Number.isFinite(latitude as number) ? (latitude as number) : null,
    longitude: Number.isFinite(longitude as number) ? (longitude as number) : null,
    cuisineType,
    priceRange,
    sourceUrl: href.startsWith('http') ? href : `${BASE_URL}${href}`,
    sourceHotelName,
    sourceAttributes: {
      dtmRegion: stripTags(dtmRegion),
      dtmCity: stripTags(dtmCity),
      dtmPrice: stripTags(dtmPrice),
    },
  };
}

async function fetchListPage(page: number): Promise<string> {
  const url = page <= 1 ? LIST_URL : `${LIST_URL}/page/${page}`;
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      Accept: 'text/html,application/xhtml+xml',
      'Accept-Language': 'fr-FR,fr;q=0.9,en;q=0.8',
    },
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status} sur ${url}`);
  }

  return res.text();
}

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function pick<T>(items: T[], seed: number, indexOffset = 0): T {
  return items[(seed + indexOffset) % items.length];
}

function budgetFromPriceRange(priceRange: string): string {
  const len = priceRange.replace(/[^�$��]/g, '').length;
  if (len >= 4) return '���';
  if (len === 3) return '���';
  if (len === 2) return '��';
  return '�';
}

function cuisineTemplates(cuisineType: string): DishTemplate[] {
  const normalized = cuisineType.toLowerCase();

  if (normalized.includes('japon')) {
    return [
      {
        title: 'Nigiri Omakase',
        caption: 'S�lection du chef autour des meilleurs poissons du jour.',
        mood: 'Date',
        vegan: false,
        ingredients: ['riz', 'poisson', 'vinaigre', 'algues'],
        allergens: ['poisson'],
        tags: ['Signature', 'Pr�cis'],
        prepTimeRange: [18, 30],
      },
      {
        title: 'Ramen Umami',
        caption: 'Bouillon longuement infus� et garnitures de saison.',
        mood: 'Comfort',
        vegan: false,
        ingredients: ['nouilles', 'bouillon', 'soja', 'oignon nouveau'],
        allergens: ['gluten', 'soja'],
        tags: ['R�confort', 'Umami'],
        prepTimeRange: [20, 35],
      },
      {
        title: 'Tempura de L�gumes',
        caption: 'Beignets ultra-croustillants servis avec sauce tentsuyu.',
        mood: 'Festif',
        vegan: true,
        ingredients: ['l�gumes', 'farine', 'eau gazeuse'],
        allergens: ['gluten'],
        tags: ['Croustillant', '� partager'],
        prepTimeRange: [12, 20],
      },
      {
        title: 'Donburi V�g�tal',
        caption: 'Bol complet aux l�gumes grill�s et marinade miso.',
        mood: 'Healthy',
        vegan: true,
        ingredients: ['riz', 'miso', 'l�gumes', 's�same'],
        allergens: ['soja', 's�same'],
        tags: ['Vegan', '�quilibr�'],
        prepTimeRange: [15, 25],
      },
    ];
  }

  if (normalized.includes('ital')) {
    return [
      {
        title: 'Risotto Cr�meux',
        caption: 'Cuisson minute, texture fondante et finale parmesan.',
        mood: 'Date',
        vegan: false,
        ingredients: ['riz arborio', 'parmesan', 'vin blanc', 'beurre'],
        allergens: ['lait'],
        tags: ['Gourmet', 'Signature'],
        prepTimeRange: [25, 38],
      },
      {
        title: 'Tagliatelle Maison',
        caption: 'P�tes fra�ches du jour et r�duction de tomates confites.',
        mood: 'Comfort',
        vegan: false,
        ingredients: ['farine', '�uf', 'tomate', 'basilic'],
        allergens: ['gluten', '�uf'],
        tags: ['Maison', 'Tradition'],
        prepTimeRange: [20, 32],
      },
      {
        title: 'Carpaccio de L�gumes',
        caption: 'Assortiment cru, huile d�olive et agrumes.',
        mood: 'Fresh',
        vegan: true,
        ingredients: ['courgette', 'fenouil', 'huile d�olive', 'citron'],
        allergens: [],
        tags: ['Vegan', 'Fra�cheur'],
        prepTimeRange: [10, 18],
      },
      {
        title: 'Gnocchi Truffe Noire',
        caption: 'Gnocchi moelleux napp�s d�une sauce l�g�re � la truffe.',
        mood: 'Festif',
        vegan: false,
        ingredients: ['pomme de terre', 'farine', 'truffe', 'cr�me'],
        allergens: ['gluten', 'lait'],
        tags: ['Premium', 'Convivial'],
        prepTimeRange: [18, 28],
      },
    ];
  }

  if (normalized.includes('v�g�t') || normalized.includes('vegan')) {
    return [
      {
        title: 'Assiette Verte Signature',
        caption: 'L�gumes r�tis, herbes fra�ches et sauce aux graines.',
        mood: 'Healthy',
        vegan: true,
        ingredients: ['l�gumes', 'graines', 'huile d�olive'],
        allergens: ['s�same'],
        tags: ['Vegan', '�quilibr�'],
        prepTimeRange: [14, 24],
      },
      {
        title: 'Curry Doux de Saison',
        caption: 'Coco l�ger, �pices douces et riz parfum�.',
        mood: 'Comfort',
        vegan: true,
        ingredients: ['l�gumes', 'lait de coco', 'riz', '�pices'],
        allergens: [],
        tags: ['R�confort', '�pic�'],
        prepTimeRange: [18, 30],
      },
      {
        title: 'Tofu Grill� Miso',
        caption: 'Marinade umami et l�gumes croquants.',
        mood: 'Fresh',
        vegan: true,
        ingredients: ['tofu', 'miso', 'brocoli', 's�same'],
        allergens: ['soja', 's�same'],
        tags: ['Prot�in�', 'L�ger'],
        prepTimeRange: [12, 22],
      },
      {
        title: 'Tarte Fine Potag�re',
        caption: 'P�te croustillante et assortiment de l�gumes confits.',
        mood: 'Family',
        vegan: true,
        ingredients: ['farine', 'l�gumes', 'huile d�olive'],
        allergens: ['gluten'],
        tags: ['Convivial', 'Saisonnier'],
        prepTimeRange: [20, 30],
      },
    ];
  }

  if (normalized.includes('mer') || normalized.includes('poisson')) {
    return [
      {
        title: 'Tartare de Bar',
        caption: 'D�coupe fine, agrumes et huile verte.',
        mood: 'Fresh',
        vegan: false,
        ingredients: ['bar', 'citron', 'herbes', '�chalote'],
        allergens: ['poisson'],
        tags: ['Fra�cheur', 'Signature'],
        prepTimeRange: [12, 20],
      },
      {
        title: 'Saint-Jacques Saisies',
        caption: 'Cuisson nacr�e et pur�e de saison.',
        mood: 'Date',
        vegan: false,
        ingredients: ['saint-jacques', 'beurre', 'panais'],
        allergens: ['mollusques', 'lait'],
        tags: ['Premium', 'D�licat'],
        prepTimeRange: [16, 26],
      },
      {
        title: 'Bouillabaisse Moderne',
        caption: 'Interpr�tation contemporaine d�un classique iod�.',
        mood: 'Family',
        vegan: false,
        ingredients: ['poisson', 'safran', 'fenouil', 'tomate'],
        allergens: ['poisson'],
        tags: ['Tradition', 'Convivial'],
        prepTimeRange: [28, 42],
      },
      {
        title: 'Ceviche du Jour',
        caption: 'Poisson marin� minute, touche piment�e et herbac�e.',
        mood: 'Festif',
        vegan: false,
        ingredients: ['poisson', 'citron vert', 'oignon rouge', 'piment'],
        allergens: ['poisson'],
        tags: ['Acidul�', '� partager'],
        prepTimeRange: [10, 18],
      },
    ];
  }

  return [
    {
      title: 'Menu D�gustation Signature',
      caption: 'S�lection en plusieurs services autour des produits de saison.',
      mood: 'Date',
      vegan: false,
      ingredients: ['produits de saison', 'herbes', 'fonds maison'],
      allergens: ['lait', 'gluten'],
      tags: ['Signature', 'Gastronomique'],
      prepTimeRange: [25, 45],
    },
    {
      title: 'Plat du March�',
      caption: 'Interpr�tation quotidienne inspir�e du march� local.',
      mood: 'Family',
      vegan: false,
      ingredients: ['l�gumes', 'prot�ine', '�pices'],
      allergens: ['gluten'],
      tags: ['Saisonnier', 'Convivial'],
      prepTimeRange: [18, 32],
    },
    {
      title: 'Assiette V�g�tale',
      caption: 'Focus l�gumes, textures vari�es et assaisonnement pr�cis.',
      mood: 'Healthy',
      vegan: true,
      ingredients: ['l�gumes', 'graines', 'vinaigre'],
      allergens: ['s�same'],
      tags: ['Vegan', '�quilibr�'],
      prepTimeRange: [14, 24],
    },
    {
      title: 'Cr�ation du Chef',
      caption: 'Plat embl�matique de la maison avec dressage soign�.',
      mood: 'Festif',
      vegan: false,
      ingredients: ['ingr�dients maison', 'sauce', 'aromates'],
      allergens: ['lait'],
      tags: ['Premium', 'Cr�atif'],
      prepTimeRange: [20, 36],
    },
  ];
}

function generateDishes(restaurant: ScrapedRestaurant, perRestaurant: number) {
  const templates = cuisineTemplates(restaurant.cuisineType);
  const seed = hashString(restaurant.slug);
  const budget = budgetFromPriceRange(restaurant.priceRange);
  const image = restaurant.imageUrls[0] || 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0';

  return Array.from({ length: perRestaurant }).map((_, index) => {
    const tpl = pick(templates, seed, index);
    const localSeed = hashString(`${restaurant.slug}-${index}`);
    const [minPrep, maxPrep] = tpl.prepTimeRange;
    const prepTime = minPrep + (localSeed % (maxPrep - minPrep + 1));

    return {
      sourceKey: `${restaurant.slug}::${index + 1}`,
      title: tpl.title,
      caption: tpl.caption,
      imageUrl: image,
      cuisine: restaurant.cuisineType || 'Cuisine gastronomique',
      mood: tpl.mood,
      budget,
      prepTime,
      vegan: tpl.vegan,
      ingredients: JSON.stringify(tpl.ingredients),
      allergens: JSON.stringify(tpl.allergens),
      tags: JSON.stringify(tpl.tags),
      sourceUrl: restaurant.sourceUrl,
    };
  });
}

async function scrapeRestaurants(maxPages: number): Promise<ScrapedRestaurant[]> {
  const bySlug = new Map<string, ScrapedRestaurant>();

  for (let page = 1; page <= maxPages; page += 1) {
    try {
      const html = await fetchListPage(page);
      const cards = splitCards(html);
      if (cards.length === 0) {
        console.log(`Page ${page}: aucune carte, arr�t.`);
        break;
      }

      let pageInserted = 0;
      for (const card of cards) {
        const parsed = parseCard(card);
        if (!parsed?.slug) continue;
        if (!bySlug.has(parsed.slug)) {
          bySlug.set(parsed.slug, parsed);
          pageInserted += 1;
        }
      }

      console.log(`Page ${page}: ${cards.length} cartes, ${pageInserted} restaurants uniques.`);

      if (pageInserted === 0) {
        console.log('Aucun nouveau restaurant trouv�, arr�t de la pagination.');
        break;
      }
    } catch (error: any) {
      console.error(`Erreur page ${page}:`, error.message || error);
      break;
    }
  }

  return [...bySlug.values()];
}

async function upsertDataset(restaurants: ScrapedRestaurant[], perRestaurant: number, wipe: boolean) {
  if (wipe) {
    console.log('Suppression du jeu de donn�es existant (restaurants/plats)...');
    await prisma.dish.deleteMany();
    await prisma.restaurantHoraire.deleteMany();
    await prisma.restaurant.deleteMany();
  }

  let restaurantCount = 0;
  let dishCount = 0;

  for (const rest of restaurants) {
    const record = await prisma.restaurant.upsert({
      where: { michelinSlug: rest.slug },
      update: {
        nom: rest.nom,
        imageUrls: JSON.stringify(rest.imageUrls),
        adresse: rest.adresse,
        distinction: rest.distinction,
        latitude: rest.latitude,
        longitude: rest.longitude,
        ville: rest.ville || null,
        pays: rest.pays || null,
        cuisineType: rest.cuisineType || null,
        priceRange: rest.priceRange || null,
        sourceUrl: rest.sourceUrl,
        sourceHotelName: rest.sourceHotelName,
        sourceAttributes: JSON.stringify(rest.sourceAttributes),
      },
      create: {
        nom: rest.nom,
        imageUrls: JSON.stringify(rest.imageUrls),
        adresse: rest.adresse,
        distinction: rest.distinction,
        latitude: rest.latitude,
        longitude: rest.longitude,
        ville: rest.ville || null,
        pays: rest.pays || null,
        cuisineType: rest.cuisineType || null,
        priceRange: rest.priceRange || null,
        michelinSlug: rest.slug,
        sourceUrl: rest.sourceUrl,
        sourceHotelName: rest.sourceHotelName,
        sourceAttributes: JSON.stringify(rest.sourceAttributes),
      },
    });

    await prisma.restaurantHoraire.deleteMany({ where: { restaurantId: record.id } });
    await prisma.restaurantHoraire.createMany({
      data: DEFAULT_HORAIRES.map((h) => ({
        restaurantId: record.id,
        jour: h.jour,
        creneaux: JSON.stringify(h.creneaux),
      })),
    });

    const dishes = generateDishes(rest, perRestaurant).map((dish) => ({ ...dish, restaurantId: record.id }));

    await prisma.dish.deleteMany({ where: { restaurantId: record.id } });
    await prisma.dish.createMany({ data: dishes });

    restaurantCount += 1;
    dishCount += dishes.length;
  }

  console.log(`Import termin�: ${restaurantCount} restaurants, ${dishCount} plats.`);
}

async function main() {
  const pagesArg = process.argv.find((arg) => arg.startsWith('--pages='));
  const perRestaurantArg = process.argv.find((arg) => arg.startsWith('--dishes='));
  const noWipe = process.argv.includes('--no-wipe');

  const maxPages = Math.max(1, Number(pagesArg?.split('=')[1] ?? 8));
  const perRestaurant = Math.max(1, Number(perRestaurantArg?.split('=')[1] ?? 5));

  console.log(`Scraping Michelin: ${maxPages} pages max, ${perRestaurant} plats/restaurant.`);
  const restaurants = await scrapeRestaurants(maxPages);
  console.log(`Restaurants uniques collect�s: ${restaurants.length}`);

  if (restaurants.length === 0) {
    throw new Error('Aucun restaurant collect�.');
  }

  await upsertDataset(restaurants, perRestaurant, !noWipe);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


