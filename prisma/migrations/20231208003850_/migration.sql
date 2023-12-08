/*
  Warnings:

  - The `incentives` column on the `EnergyUpgrade` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "EnergyUpgrade" DROP COLUMN "incentives",
ADD COLUMN     "incentives" DOUBLE PRECISION;
