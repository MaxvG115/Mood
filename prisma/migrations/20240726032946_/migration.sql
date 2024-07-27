/*
  Warnings:

  - You are about to drop the column `sentimentScore` on the `Analysis` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Analysis` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Analysis_userId_idx";

-- AlterTable
ALTER TABLE "Analysis" DROP COLUMN "sentimentScore",
DROP COLUMN "userId";
