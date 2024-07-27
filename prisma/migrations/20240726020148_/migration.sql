/*
  Warnings:

  - You are about to drop the `Analysis` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "JOURNAL_ENTRY_STATUS" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- AlterTable
ALTER TABLE "JournalEntry" ADD COLUMN     "status" "JOURNAL_ENTRY_STATUS" NOT NULL DEFAULT 'DRAFT';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "name" TEXT;

-- DropTable
DROP TABLE "Analysis";

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EntryAnalysis" (
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
    "sentimentScore" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "EntryAnalysis_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_userId_key" ON "Account"("userId");

-- CreateIndex
CREATE INDEX "EntryAnalysis_userId_idx" ON "EntryAnalysis"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "EntryAnalysis_entryId_key" ON "EntryAnalysis"("entryId");
