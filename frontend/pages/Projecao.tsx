'use client';
import CardMovimentacoes from '@/components/CardMovimentacoes';
import CardSeguro from '@/components/CardSeguro';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';

const Projecao = () => {
  const [porcentagemProjecao, setPorcentagemProjecao] = useState(54);

  const financialData = [
    { year: 2025, value: 'R$ 15.000', label: 'CLT' },
    { year: 2025, value: 'R$ 5.000', label: 'Autônomo' },
    { year: 2040, value: 'R$ 35.000', label: 'Autônomo' },
    { year: 2050, value: 'Aposentadoria', label: '' }, // Aposentadoria pode ser um tipo diferente de evento
  ];

  const eventMarkers = [
    { year: 2030, value: 'R$ 12.000' },
    { year: 2040, value: 'R$ 20.000' },
    { year: 2045, value: 'R$ 10.000' },
    { year: 2050, value: 'R$ 15.000' },
  ];

  return (
    <div className="text-white work-sans flex flex-col mx-20">
      <div className="flex">
        <div className="flex flex-col gap-10 mr-16">
          <Select defaultValue="todas">
            <SelectTrigger className="w-full rounded-full text-2xl">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent className="bg-[#1B1B1B] text-white">
              {/* Tenho que puxar do banco os nomes */}
              <SelectItem value="todas">Mateus Silveira</SelectItem>
              <SelectItem value="ativas">Mauro Leal</SelectItem>
              <SelectItem value="inativas">Marcos</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex flex-col">
            <span className="text-muted-foreground text-lg">Patrimônio Liquido Total</span>
            <div className="flex items-end">
              <h2 className="work-sans-weight-500 text-4xl ">
                <span className="text-muted-foreground">R$</span>2.676.930,00
              </h2>
              <span className="text-lg bottom-0 text-[#68AAF1]">+52,37%</span>
            </div>
          </div>
        </div>
        <div className="flex mt-4 overflow-hidden relative">
          {/* Card de projeção */}
          <div className="w-96 max-w-sm">
            {/* Valor */}
            <p className="text-sm ml-4 mb-2 font-medium">R$ 2.679.930,00</p>

            {/* Barra de progresso */}
            <div className="border-[#444444] border-x px-4 pb-4">
              <div className=" w-full ">
                <div className="w-full h-10 rounded-md bg-[#1e2235] overflow-hidden ">
                  <div
                    className="h-full bg-gradient-to-r from-green-400 to-blue-500"
                    // style={{ width: '73%' }} // controla o preenchimento ayé 100.00%
                    style={{ width: porcentagemProjecao + '%' }}
                  />
                </div>
              </div>
            </div>
            {/* Informações abaixo */}
            <div className="flex items-end pt-10 gap-2 text-sm text-muted-foreground  border-x border-t  border-[#444444] pl-4">
              <span>2025</span>
              <span className="bg-[#5384EB3D] text-xs px-2 py-0.5 text-[#5880EF] rounded">
                Hoje
              </span>
            </div>
            <p className="text-blue-400 font-medium ml-4">45 anos</p>
          </div>
        </div>
      </div>
      <div>
        {/* Time Lines */}
        <h2 className="text-[#48F7A1] font-serif text-xl ml-4 my-5">TimeLine</h2>
        {/* <TimeLine /> */}
      </div>
      <div>
        {/* Movimentações */}
        <div className="flex items-center justify-between">
          <h2 className="text-[#48F7A1] font-serif text-xl ml-4 my-5">Movimentações</h2>
          <div className="flex gap-2">
            <Button className="rounded-full work-sans font-bold">Financeiras</Button>
            <Button className="rounded-full work-sans font-bold">Imobilizadas</Button>
          </div>
        </div>
        {/* Cards de movimentações */}
        <div className="w-full grid lg:grid-cols-2 gap-4">
          <CardMovimentacoes />
          <CardMovimentacoes />
          <CardMovimentacoes />
        </div>
      </div>
      <div className="w-full">
        {/* Seguros */}
        <h2 className="text-[#48F7A1] font-serif text-xl ml-4 my-5">Seguros</h2>
        <div className="w-full grid lg:grid-cols-2 gap-4">
          <CardSeguro />
          <CardSeguro />
          <CardSeguro />
        </div>
      </div>
    </div>
  );
};

export default Projecao;
