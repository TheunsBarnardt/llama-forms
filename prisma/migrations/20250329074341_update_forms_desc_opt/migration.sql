-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Form" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "thumbnail" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "createDate" DATETIME NOT NULL,
    "changeDate" DATETIME NOT NULL
);
INSERT INTO "new_Form" ("changeDate", "createDate", "description", "id", "thumbnail", "title") SELECT "changeDate", "createDate", "description", "id", "thumbnail", "title" FROM "Form";
DROP TABLE "Form";
ALTER TABLE "new_Form" RENAME TO "Form";
CREATE TABLE "new_Question" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
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
INSERT INTO "new_Question" ("changeDate", "createDate", "description", "formId", "id", "message", "name", "options", "required", "type", "validation") SELECT "changeDate", "createDate", "description", "formId", "id", "message", "name", "options", "required", "type", "validation" FROM "Question";
DROP TABLE "Question";
ALTER TABLE "new_Question" RENAME TO "Question";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
