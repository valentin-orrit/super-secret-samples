/*
  Warnings:

  - Made the column `s3CompressedReferenceName` on table `Sample` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Sample" ALTER COLUMN "s3CompressedReferenceName" SET NOT NULL;
