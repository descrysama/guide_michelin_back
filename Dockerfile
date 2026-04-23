# ---- Build stage ----
FROM node:20-alpine AS builder
WORKDIR /app

# Dépendances système pour compiler better-sqlite3 / sqlite3 natifs
RUN apk add --no-cache python3 make g++ openssl

COPY package*.json ./
RUN npm ci

COPY prisma ./prisma
RUN npx prisma generate

COPY . .
RUN npm run build

# ---- Production stage ----
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Besoin des outils de build pour réinstaller les deps natives en prod
RUN apk add --no-cache python3 make g++ openssl

COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY prisma ./prisma
RUN npx prisma generate

COPY --from=builder /app/dist ./dist

# Crée le dossier où vivra le fichier SQLite (monté en volume)
RUN mkdir -p /data

EXPOSE 3000
CMD ["node", "dist/src/main.js"]