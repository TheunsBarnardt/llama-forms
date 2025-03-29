/*
  Warnings:

  - You are about to alter the column `createDate` on the `Form` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.
  - Added the required column `changeDate` to the `Form` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Form` table without a default value. This is not possible if the table is not empty.
  - Added the required column `changeDate` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createDate` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Form" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "thumbnail" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createDate" DATETIME NOT NULL,
    "changeDate" DATETIME NOT NULL
);
INSERT INTO "new_Form" ("createDate", "id", "thumbnail", "title") SELECT "createDate", "id", "thumbnail", "title" FROM "Form";
DROP TABLE "Form";
ALTER TABLE "new_Form" RENAME TO "Form";
CREATE TABLE "new_Question" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "options" JSONB,
    "required" BOOLEAN NOT NULL,
    "validation" TEXT,
    "message" JSONB,
    "createDate" DATETIME NOT NULL,
    "changeDate" DATETIME NOT NULL,
    "formId" INTEGER NOT NULL,
    CONSTRAINT "Question_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Question" ("formId", "id", "message", "name", "options", "required", "type", "validation") SELECT "formId", "id", "message", "name", "options", "required", "type", "validation" FROM "Question";
DROP TABLE "Question";
ALTER TABLE "new_Question" RENAME TO "Question";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
