/*
  Warnings:

  - You are about to drop the `EnergyUpgrade` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `JsonLogic` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "EnergyUpgrade" DROP CONSTRAINT "EnergyUpgrade_user_id_fkey";

-- DropForeignKey
ALTER TABLE "JsonLogic" DROP CONSTRAINT "JsonLogic_user_id_fkey";

-- DropTable
DROP TABLE "EnergyUpgrade";

-- DropTable
DROP TABLE "JsonLogic";

-- CreateTable
CREATE TABLE "CostBlock" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "calculation_id" INTEGER NOT NULL,

    CONSTRAINT "CostBlock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Calculation" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "containerItems" JSONB NOT NULL,
    "result" DOUBLE PRECISION NOT NULL,
    "selectedOperator" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Calculation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Calculation_user_id_idx" ON "Calculation"("user_id");

-- AddForeignKey
ALTER TABLE "CostBlock" ADD CONSTRAINT "CostBlock_calculation_id_fkey" FOREIGN KEY ("calculation_id") REFERENCES "Calculation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Calculation" ADD CONSTRAINT "Calculation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
