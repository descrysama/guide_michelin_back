-- CreateTable
CREATE TABLE "user_preferences" (
    "userId" TEXT NOT NULL PRIMARY KEY,
    "veganOnly" BOOLEAN NOT NULL DEFAULT false,
    "excludedIngredients" TEXT NOT NULL DEFAULT '[]',
    "allergens" TEXT NOT NULL DEFAULT '[]',
    "excludedTags" TEXT NOT NULL DEFAULT '[]',
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "user_preferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
