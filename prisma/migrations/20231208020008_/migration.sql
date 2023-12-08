/*
  Warnings:

  - The primary key for the `JsonLogic` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `JsonLogic` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropIndex
DROP INDEX "JsonLogic_id_key";

-- AlterTable
ALTER TABLE "JsonLogic" DROP CONSTRAINT "JsonLogic_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "JsonLogic_pkey" PRIMARY KEY ("id");
