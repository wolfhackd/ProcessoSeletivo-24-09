'use client';

import CardAlocacao from '@/components/CardAlocacao';
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
        <div className="relative py-2 ">
          <div className="border-l-4 rounded-full border-muted-foreground left-4 h-full z-10 absolute" />
          {/* Lista de cards */}
          <CardAlocacao />
          <CardAlocacao />
          <CardAlocacao />
        </div>
        <p className="text-muted-foreground mt-2">Atualizado</p>
      </div>
    </div>
  );
}
