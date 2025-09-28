'use client';
import React from 'react';
import { Card, CardContent } from './ui/card';

const CardSeguro = () => {
  return (
    <Card className="bg-[#1D1F1E] border-[#48F7A1]">
      <CardContent className="flex flex-col">
        <h2 className="text-[#C9C9C9] font-medium text-2xl">Seguro de Vida Familiar</h2>
        <div className="flex items-end justify-between">
          <div className="flex flex-col">
            <span className="text-[#919191] font-bold">Seguro de Vida</span>
            <span className="text-[#919191] font-bold">Duração: 15 anos</span>
            <span className="text-[#919191] font-bold">Prêmio: R$ 120/mês</span>
          </div>
          <span className="font-bold text-[#A034FF]">R$ 500.000</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardSeguro;
