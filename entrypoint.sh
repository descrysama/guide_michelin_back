#!/bin/sh
set -e

echo "Running Prisma migrations..."
npx prisma migrate deploy

echo "Checking seed..."
COUNT=$(node -e "
const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
p.restaurant.count()
  .then(n => { console.log(n); return p.\$disconnect(); })
  .catch(() => { console.log(0); return p.\$disconnect(); });
" 2>/dev/null || echo "0")

if [ "$COUNT" = "0" ]; then
  echo "DB is empty — seeding..."
  node dist/seed/seed.js
else
  echo "DB has $COUNT restaurants — skipping seed."
fi

exec node dist/src/main.js
