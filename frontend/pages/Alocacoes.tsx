'use client';

import { FiltroAlocacoes } from '@/components/FiltroAlocacoes';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { AlertTriangleIcon, MoreVertical, PencilIcon, PlusIcon } from 'lucide-react';

export function Alocacoes() {
  return (
    <div className="bg-[#1B1B1B] rounded-lg border-1 border-[#D1D1D1] w-full text-white p-3">
      <div className="flex justify-between items-center">
        <h2>Timeline de alocações manuais</h2>
        <div className="flex items-center gap-10">
          <FiltroAlocacoes />
          <Button className="bg-[#CD5700] items-center">
            <PlusIcon className="text-white size-4" /> Adicionar
          </Button>
        </div>
      </div>
      <div className="mt-10">
        <p className="text-muted-foreground">Dados Antigos</p>
        <div className="relative py-2">
          <div className="border-l-4 rounded-full border-muted-foreground left-4 h-full z-10 absolute" />
          {/* Lista de cards */}
          <Card className="bg-[#1B1B1B] text-white mt-2 relative z-20">
            <CardContent className="px-2.5 flex justify-between items-center">
              <div>
                <div className="flex gap-2 items-center">
                  <h2>CDB Banco Itaú</h2>
                  <Badge className="bg-[#CFF8DF] text-[#408E37]">Financeira Manual</Badge>
                </div>
                <p>Inicio: 20/06/2023</p>
              </div>
              <div className="flex justify-between items-center gap-12">
                <Button
                  variant={'outline'}
                  className="border-[#FD6C00] text-[#FD6C00] bg-[#F8F8F8] hover:text-[#FD6C00] hover:border-[#FD6C00] rounded-full h-9 w-36"
                >
                  <PencilIcon /> Atualizar
                </Button>
                <div className="flex gap-4 items-center">
                  <div className="flex flex-col text-right">
                    <h2 className="text-xl">R$ 1.000.000</h2>
                    <span className="text-[#FD6C00] flex items-center gap-2 text-sm">
                      <AlertTriangleIcon className="size-4" /> Última atualização: 10/06/2023
                    </span>
                  </div>
                  <MoreVertical />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <p className="text-muted-foreground mt-2">Atualizado</p>
      </div>
    </div>
  );
}
