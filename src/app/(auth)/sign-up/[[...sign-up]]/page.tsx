import { SignUp } from '@clerk/nextjs';
import { ChartLine, Clock, ShieldCheck, Sparkles } from 'lucide-react';

export default function SignUpPage() {
  const highlights = [
    {
      icon: Clock,
      title: 'Cobrança no tempo certo',
      description:
        'Defina o vencimento uma vez e o Lembreto envia automaticamente no melhor horário.',
    },
    {
      icon: ChartLine,
      title: 'Mais previsibilidade no caixa',
      description:
        'Acompanhe quem recebeu, quem abriu e quais contatos estão perto do vencimento.',
    },
    {
      icon: ShieldCheck,
      title: 'Tom profissional, sem constrangimento',
      description:
        'Use mensagens padronizadas e respeitosas para cobrar com consistência e segurança.',
    },
    {
      icon: Sparkles,
      title: 'WhatsApp, SMS e e-mail em um fluxo',
      description:
        'Escolha os canais ideais para cada cliente e mantenha o acompanhamento centralizado.',
    },
  ];

  return (
    <div className='bg-muted grid flex-1 lg:grid-cols-2'>
      <div className='hidden flex-1 items-center justify-end p-6 md:p-10 lg:flex'>
        <div className='max-w-sm space-y-8'>
          <div className='space-y-2'>
            <p className='text-primary text-xs font-semibold tracking-[0.14em] uppercase'>
              Comece agora
            </p>
            <h1 className='text-2xl font-bold tracking-tight'>
              Crie sua conta e automatize suas cobranças
            </h1>
            <p className='text-muted-foreground text-sm leading-relaxed'>
              Sem cartão de crédito, setup rápido e envio inteligente para você
              receber mais em dia.
            </p>
          </div>

          <ul className='space-y-5'>
            {highlights.map(({ icon: Icon, title, description }) => (
              <li key={title} className='flex gap-3'>
                <div className='bg-primary/15 text-primary mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg'>
                  <Icon className='size-4' />
                </div>
                <div>
                  <p className='font-semibold'>{title}</p>
                  <p className='text-muted-foreground mt-1 text-sm leading-relaxed'>
                    {description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className='flex flex-1 items-center justify-center p-6 md:p-10 lg:justify-start'>
        <SignUp />
      </div>
    </div>
  );
}
