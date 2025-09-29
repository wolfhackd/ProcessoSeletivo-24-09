-- CreateTable
CREATE TABLE "public"."Projecao" (
    "id" SERIAL NOT NULL,
    "ano" INTEGER NOT NULL,
    "patrimonio_inicial" DECIMAL(65,30) NOT NULL,
    "taxa_crescimento" DECIMAL(65,30) NOT NULL,
    "contribuicao" DECIMAL(65,30) NOT NULL,
    "patrimonio_final" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Projecao_pkey" PRIMARY KEY ("id")
);
