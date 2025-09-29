/*
  Warnings:

  - You are about to drop the column `ano` on the `Projecao` table. All the data in the column will be lost.
  - You are about to drop the column `contribuicao` on the `Projecao` table. All the data in the column will be lost.
  - You are about to drop the column `patrimonio_final` on the `Projecao` table. All the data in the column will be lost.
  - You are about to drop the column `patrimonio_inicial` on the `Projecao` table. All the data in the column will be lost.
  - You are about to drop the column `taxa_crescimento` on the `Projecao` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Projecao" DROP COLUMN "ano",
DROP COLUMN "contribuicao",
DROP COLUMN "patrimonio_final",
DROP COLUMN "patrimonio_inicial",
DROP COLUMN "taxa_crescimento",
ADD COLUMN     "status" INTEGER NOT NULL DEFAULT 1;
