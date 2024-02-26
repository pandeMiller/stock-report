/*
  Warnings:

  - Added the required column `symbol` to the `stock_report` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "stock_report" ADD COLUMN     "symbol" TEXT NOT NULL;
