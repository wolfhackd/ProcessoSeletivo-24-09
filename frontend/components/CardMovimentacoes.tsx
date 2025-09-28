'use client';
import React from 'react';
import { Card, CardContent } from './ui/card';
import { ArrowDown, ArrowUp } from 'lucide-react';

const CardMovimentacoes = () => {
  return (
    <Card className="bg-[#1D1F1E] border-[#48F7A1]">
      <CardContent className="flex flex-col">
        <h2 className="text-[#C9C9C9] font-medium text-2xl">Herança</h2>
        <div className="flex items-end justify-between">
          <div className="flex flex-col">
            <span className="text-[#919191] font-bold">09/07/23 - 22/07/23</span>
            <span className="text-[#919191] font-bold">Frequência: Única</span>
            <span className="text-[#919191] font-bold">Crédito</span>
          </div>
          {/* Condição nessa flecha */}
          <span className="font-bold text-[#C65353] flex items-center gap-2">
            <ArrowDown className="size-5" /> R$ 500.000
          </span>
          {/* <span className="font-bold text-[#408E37] flex items-center gap-2">
            <ArrowUp className="size-5" /> R$ 500.000
          </span> */}
        </div>
      </CardContent>
    </Card>
  );
};

export default CardMovimentacoes;
