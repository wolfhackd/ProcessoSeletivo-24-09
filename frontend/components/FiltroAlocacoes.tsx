'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function FiltroAlocacoes() {
  return (
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
  );
}
