-- CreateTable
CREATE TABLE "user_dish_favorites" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "dishId" TEXT NOT NULL,
    "dishTitle" TEXT NOT NULL,
    "dishCaption" TEXT NOT NULL,
    "dishImage" TEXT NOT NULL,
    "dishCuisine" TEXT NOT NULL,
    "restaurantName" TEXT NOT NULL,
    "restaurantAddress" TEXT NOT NULL,
    "restaurantHours" TEXT NOT NULL,
    "restaurantPhone" TEXT,
    "expiresAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "user_dish_favorites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "user_dish_favorites_userId_dishId_key" ON "user_dish_favorites"("userId", "dishId");
