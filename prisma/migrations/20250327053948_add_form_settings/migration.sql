-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Form" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "screenshot" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "allowResponses" BOOLEAN NOT NULL DEFAULT true,
    "theme" TEXT DEFAULT 'default',
    CONSTRAINT "Form_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Form" ("description", "id", "name", "screenshot", "userId") SELECT "description", "id", "name", "screenshot", "userId" FROM "Form";
DROP TABLE "Form";
ALTER TABLE "new_Form" RENAME TO "Form";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
