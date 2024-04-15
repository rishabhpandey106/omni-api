/*
  Warnings:

  - The primary key for the `Terms` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[name]` on the table `Terms` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Terms" DROP CONSTRAINT "Terms_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Terms_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Terms_name_key" ON "Terms"("name");
