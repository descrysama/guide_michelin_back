CREATE TABLE "experiences" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "locationName" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "priceEur" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "bookingUrl" TEXT NOT NULL,
    "sourceUrl" TEXT,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

CREATE INDEX "experiences_city_idx" ON "experiences"("city");
CREATE INDEX "experiences_category_idx" ON "experiences"("category");

CREATE TABLE "user_experience_favorites" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "experienceId" TEXT NOT NULL,
    "experienceTitle" TEXT NOT NULL,
    "experienceImage" TEXT NOT NULL,
    "experienceCity" TEXT NOT NULL,
    "experiencePrice" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "user_experience_favorites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "user_experience_favorites_experienceId_fkey" FOREIGN KEY ("experienceId") REFERENCES "experiences" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE UNIQUE INDEX "user_experience_favorites_userId_experienceId_key" ON "user_experience_favorites"("userId", "experienceId");
