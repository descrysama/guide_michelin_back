CREATE TABLE "user_restaurant_favorites" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "restaurantId" TEXT NOT NULL,
    "restaurantName" TEXT NOT NULL,
    "restaurantImage" TEXT,
    "restaurantAddress" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "user_restaurant_favorites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "user_restaurant_favorites_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "restaurants" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE UNIQUE INDEX "user_restaurant_favorites_userId_restaurantId_key" ON "user_restaurant_favorites"("userId", "restaurantId");

CREATE TABLE "user_hotel_favorites" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "hotelKey" TEXT NOT NULL,
    "hotelName" TEXT NOT NULL,
    "hotelImage" TEXT NOT NULL,
    "hotelUrl" TEXT NOT NULL,
    "hotelLocationSlug" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "user_hotel_favorites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE UNIQUE INDEX "user_hotel_favorites_userId_hotelKey_key" ON "user_hotel_favorites"("userId", "hotelKey");
