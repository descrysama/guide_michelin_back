-- CreateTable
CREATE TABLE "dishes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "restaurantId" TEXT NOT NULL,
    "sourceKey" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "caption" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "cuisine" TEXT NOT NULL,
    "mood" TEXT NOT NULL,
    "budget" TEXT NOT NULL,
    "prepTime" INTEGER NOT NULL,
    "vegan" BOOLEAN NOT NULL DEFAULT false,
    "ingredients" TEXT NOT NULL DEFAULT '[]',
    "allergens" TEXT NOT NULL DEFAULT '[]',
    "tags" TEXT NOT NULL DEFAULT '[]',
    "sourceUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "dishes_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "restaurants" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_restaurants" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nom" TEXT NOT NULL,
    "imageUrls" TEXT NOT NULL,
    "adresse" TEXT NOT NULL,
    "distinction" INTEGER NOT NULL,
    "latitude" REAL,
    "longitude" REAL,
    "ville" TEXT,
    "pays" TEXT,
    "cuisineType" TEXT,
    "priceRange" TEXT,
    "michelinSlug" TEXT,
    "sourceUrl" TEXT,
    "sourceHotelName" TEXT,
    "sourceAttributes" TEXT NOT NULL DEFAULT '{}',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_restaurants" ("adresse", "createdAt", "distinction", "id", "imageUrls", "latitude", "longitude", "nom", "updatedAt") SELECT "adresse", "createdAt", "distinction", "id", "imageUrls", "latitude", "longitude", "nom", "updatedAt" FROM "restaurants";
DROP TABLE "restaurants";
ALTER TABLE "new_restaurants" RENAME TO "restaurants";
CREATE UNIQUE INDEX "restaurants_michelinSlug_key" ON "restaurants"("michelinSlug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "dishes_sourceKey_key" ON "dishes"("sourceKey");

-- CreateIndex
CREATE INDEX "dishes_restaurantId_idx" ON "dishes"("restaurantId");

-- CreateIndex
CREATE INDEX "dishes_cuisine_idx" ON "dishes"("cuisine");
