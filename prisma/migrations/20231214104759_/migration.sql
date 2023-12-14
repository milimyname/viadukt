/*
  Warnings:

  - You are about to drop the `Calculation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CostBlock` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Calculation" DROP CONSTRAINT "Calculation_user_id_fkey";

-- DropForeignKey
ALTER TABLE "CostBlock" DROP CONSTRAINT "CostBlock_calculation_id_fkey";

-- DropTable
DROP TABLE "Calculation";

-- DropTable
DROP TABLE "CostBlock";
