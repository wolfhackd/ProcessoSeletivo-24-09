'use client';

import CardAlocacao from '@/components/CardAlocacao';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PlusIcon } from 'lucide-react';

export function Alocacoes() {
  return (
    <div className="bg-[#1B1B1B] rounded-lg border-1 border-[#D1D1D1] w-full text-white p-3">
      <div className="flex justify-between items-center">
        <h2>Timeline de alocações manuais</h2>
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2">
            <span className="text-sm text-white">Alocações:</span>
            <Select defaultValue="todas">
              <SelectTrigger className="w-[170px] rounded-full">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent className="bg-[#1B1B1B] text-white">
                <SelectItem value="todas">Todas</SelectItem>
                <SelectItem value="ativas">Ativas</SelectItem>
                <SelectItem value="inativas">Inativas</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="bg-[#CD5700] items-center rounded-full">
            <PlusIcon className="text-white size-4" /> Adicionar
          </Button>
        </div>
      </div>
      <div className="mt-10">
        <p className="text-muted-foreground">Dados Antigos</p>
        <div className="relative py-2 ">
          <div className="border-l-4 rounded-full border-muted-foreground left-4 h-full z-10 absolute" />
          {/* Lista de cards */}
          {/* falta a versão de progresso */}
          <CardAlocacao />
          <CardAlocacao />
          <CardAlocacao />
        </div>
        <p className="text-muted-foreground mt-2">Atualizado</p>
      </div>
    </div>
  );
}
