'use client';

import { FiltroAlocacoes } from '@/components/FiltroAlocacoes';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';

export function Alocacoes() {
  return (
    <div className="bg-[#1B1B1B] rounded-lg border-1 border-[#D1D1D1] w-full text-white p-5">
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
        <div className="relative">
          <div className="border-l-4 rounded-full border-muted-foreground left-2 h-full z-10 absolute" />
          {/* Lista de cards */}
          <h2 className="relative z-10">ola</h2>
          <h2 className="relative z-10">ola</h2>
          <h2 className="relative z-10">ola</h2>
          <h2 className="relative z-10">ola</h2>
        </div>
        <p className="text-muted-foreground">Atualizado</p>
      </div>
    </div>
  );
}
