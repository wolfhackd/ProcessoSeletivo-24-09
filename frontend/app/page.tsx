'use client';

import { FiltroAlocacoes } from '@/components/FiltroAlocacoes';
import { Button } from '@/components/ui/button';
import { Alocacoes } from '@/pages/Alocacoes';
import Projecao from '@/pages/Projecao';
import { PlusIcon } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const navLinks = [
  { name: 'Alocações', href: 'Alocações' },
  { name: 'Projeção', href: 'Projecoes' },
  { name: 'Histórico', href: 'Historico' },
];

export default function Home() {
  const [ativo, setAtivo] = useState('Projecoes');

  const handleClick = (href: string) => {
    setAtivo(href);
  };
  return (
    <div className="flex min-h-screen flex-col items-center pt-12 bg-[#101010] abeezee-regular">
      {/* Aqui define  o que vai aparecer no main */}
      {/* Tenho que fazer a parte ativa pegar estilização */}
      <nav className="text-white abeezee-regular space-x-4">
        {navLinks.map((link) => {
          return (
            <Button
              key={link.name}
              variant="link"
              className={`text-white ${ativo === link.href ? 'text-muted-foreground' : ''}`}
              onClick={() => handleClick(link.href)}
            >
              {link.name}
            </Button>
          );
        })}
      </nav>
      {/* Aqui pelo state eu configuro o que aparece na pagina */}
      <main className="mt-11 px-6 w-full">
        {ativo === 'Alocações' && <Alocacoes />}
        {ativo === 'Projecoes' && <Projecao />}
        {ativo === 'Historico' && <Alocacoes />}
      </main>
    </div>
  );
}
