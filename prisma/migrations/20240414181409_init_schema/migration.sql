/*
  Warnings:

  - The primary key for the `Terms` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Terms` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Terms" DROP CONSTRAINT "Terms_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Terms_pkey" PRIMARY KEY ("name");
