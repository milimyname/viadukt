/*
  Warnings:

  - Added the required column `schema` to the `Calculation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Calculation" ADD COLUMN     "schema" TEXT NOT NULL;
