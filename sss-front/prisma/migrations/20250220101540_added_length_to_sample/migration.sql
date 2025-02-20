/*
  Warnings:

  - Added the required column `length` to the `Sample` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sample" ADD COLUMN     "length" DOUBLE PRECISION NOT NULL;
