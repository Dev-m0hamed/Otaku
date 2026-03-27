/*
  Warnings:

  - You are about to drop the column `animeId` on the `favorite` table. All the data in the column will be lost.
  - You are about to drop the column `englishTitle` on the `favorite` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `favorite` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[mal_id,userId]` on the table `favorite` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `mal_id` to the `favorite` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "favorite_animeId_userId_key";

-- AlterTable
ALTER TABLE "favorite" DROP COLUMN "animeId",
DROP COLUMN "englishTitle",
DROP COLUMN "image",
ADD COLUMN     "images" TEXT,
ADD COLUMN     "mal_id" INTEGER NOT NULL,
ADD COLUMN     "title_english" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "favorite_mal_id_userId_key" ON "favorite"("mal_id", "userId");
