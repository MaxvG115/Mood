/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Analysis` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Analysis" ADD COLUMN     "sentimentScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name";

-- CreateIndex
CREATE INDEX "Analysis_userId_idx" ON "Analysis"("userId");
