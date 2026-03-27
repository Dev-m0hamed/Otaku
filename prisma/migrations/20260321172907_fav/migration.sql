/*
  Warnings:

  - You are about to drop the `anime` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "favorite" DROP CONSTRAINT "favorite_animeId_fkey";

-- DropTable
DROP TABLE "anime";
