/*
  Warnings:

  - Added the required column `result` to the `JsonLogic` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "JsonLogic" ADD COLUMN     "result" JSONB NOT NULL;
