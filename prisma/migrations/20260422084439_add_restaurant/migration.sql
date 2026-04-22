-- CreateTable
CREATE TABLE "restaurants" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nom" TEXT NOT NULL,
    "imageUrls" TEXT NOT NULL,
    "adresse" TEXT NOT NULL,
    "distinction" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "restaurant_horaires" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "restaurantId" TEXT NOT NULL,
    "jour" TEXT NOT NULL,
    "creneaux" TEXT NOT NULL,
    CONSTRAINT "restaurant_horaires_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "restaurants" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "restaurant_horaires_restaurantId_jour_key" ON "restaurant_horaires"("restaurantId", "jour");
