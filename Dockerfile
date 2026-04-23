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
# Compile seed separately (ts-node is a devDep, unavailable in runner)
RUN npx tsc --target ES2020 --module commonjs --esModuleInterop true \
    --resolveJsonModule true --skipLibCheck true \
    --outDir dist/seed prisma/seed.ts

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
COPY --from=builder /app/prisma/data ./prisma/data
COPY entrypoint.sh ./entrypoint.sh
RUN chmod +x entrypoint.sh

# Crée le dossier où vivra le fichier SQLite (monté en volume)
RUN mkdir -p /data

EXPOSE 3000
ENTRYPOINT ["sh", "entrypoint.sh"]