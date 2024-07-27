/*
  Warnings:

  - You are about to drop the column `status` on the `JournalEntry` table. All the data in the column will be lost.
  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EntryAnalysis` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "JournalEntry" DROP COLUMN "status";

-- DropTable
DROP TABLE "Account";

-- DropTable
DROP TABLE "EntryAnalysis";

-- DropEnum
DROP TYPE "JOURNAL_ENTRY_STATUS";

-- CreateTable
CREATE TABLE "Analysis" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "entryId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "mood" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "negative" BOOLEAN NOT NULL,
    "summary" TEXT NOT NULL,
    "color" TEXT NOT NULL DEFAULT '#0101fe',
    "sentimentScore" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "Analysis_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Analysis_userId_idx" ON "Analysis"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Analysis_entryId_key" ON "Analysis"("entryId");
