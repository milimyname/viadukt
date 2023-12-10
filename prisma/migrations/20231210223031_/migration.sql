/*
  Warnings:

  - You are about to drop the column `containerItems` on the `Calculation` table. All the data in the column will be lost.
  - Added the required column `type` to the `Calculation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Calculation" DROP COLUMN "containerItems",
ADD COLUMN     "type" TEXT NOT NULL;
