import { Clock, Cpu, TrendingUp } from 'lucide-react';

const stats = [
  {
    Icon: Clock,
    value: 'Potencial',
    title: 'Menos tempo de espera',
    description: 'Respostas mais rápidas conforme os canais e fluxos automatizados.',
  },
  {
    Icon: Cpu,
    value: '24/7',
    title: 'Atendimento contínuo',
    description: 'Captação e triagem disponíveis inclusive fora do horário comercial.',
  },
  {
    Icon: TrendingUp,
    value: 'Estimativa',
    title: 'Mais eficiência operacional',
    description: 'Impacto calculado conforme volume, equipe, processos e integrações.',
  },
];

export default function Metrics() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map(({ Icon, value, title, description }) => (
        <article key={title} className="glass-card rounded-2xl p-6 text-center">
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl border border-primaryGreen/25 bg-primaryGreen/10">
            <Icon className="h-5 w-5 text-primaryGreen" />
          </div>
          <p className="mt-4 font-display text-3xl font-bold text-gradient-brand">{value}</p>
          <h3 className="mt-2 text-sm font-semibold text-white">{title}</h3>
          <p className="mt-2 text-xs leading-relaxed text-mutedGray">{description}</p>
        </article>
      ))}
    </div>
  );
}
