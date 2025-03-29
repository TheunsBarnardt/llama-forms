/*
  Warnings:

  - The primary key for the `Form` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `allowResponses` on the `Form` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Form` table. All the data in the column will be lost.
  - You are about to drop the column `isPublic` on the `Form` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Form` table. All the data in the column will be lost.
  - You are about to drop the column `screenshot` on the `Form` table. All the data in the column will be lost.
  - You are about to drop the column `theme` on the `Form` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Form` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `Form` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `Question` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `text` on the `Question` table. All the data in the column will be lost.
  - You are about to alter the column `formId` on the `Question` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `id` on the `Question` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `Response` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `answers` on the `Response` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Response` table. All the data in the column will be lost.
  - You are about to alter the column `formId` on the `Response` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `id` on the `Response` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - Added the required column `createDate` to the `Form` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnail` to the `Form` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Form` table without a default value. This is not possible if the table is not empty.
  - Added the required column `message` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `options` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Response` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `Response` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Form" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "thumbnail" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createDate" TEXT NOT NULL
);
INSERT INTO "new_Form" ("id") SELECT "id" FROM "Form";
DROP TABLE "Form";
ALTER TABLE "new_Form" RENAME TO "Form";
CREATE TABLE "new_Question" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "options" JSONB NOT NULL,
    "required" BOOLEAN NOT NULL,
    "validation" TEXT,
    "message" JSONB NOT NULL,
    "formId" INTEGER NOT NULL,
    CONSTRAINT "Question_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Question" ("formId", "id", "required", "type") SELECT "formId", "id", "required", "type" FROM "Question";
DROP TABLE "Question";
ALTER TABLE "new_Question" RENAME TO "Question";
CREATE TABLE "new_Response" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "formId" INTEGER NOT NULL,
    CONSTRAINT "Response_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Response" ("formId", "id") SELECT "formId", "id" FROM "Response";
DROP TABLE "Response";
ALTER TABLE "new_Response" RENAME TO "Response";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
