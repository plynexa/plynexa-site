import React from 'react';
import { Clock, TrendingUp, Cpu } from 'lucide-react';

export default function Metrics() {
  const stats = [
    {
      id: 1,
      icon: <Clock className="text-primaryGreen" size={28} />,
      value: "85%",
      title: "Redução no Tempo de Espera",
      desc: "Atendimento imediato e respostas precisas 24/7 sem qualquer fila."
    },
    {
      id: 2,
      icon: <Cpu className="text-primaryGreen" size={28} />,
      value: "24/7/365",
      title: "Operação Ininterrupta",
      desc: "Captura de leads, qualificação e suporte rodando até nos finais de semana."
    },
    {
      id: 3,
      icon: <TrendingUp className="text-primaryGreen" size={28} />,
      value: "70%",
      title: "Economia Operacional",
      desc: "Eliminação total de tarefas administrativas repetitivas no operacional."
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <div key={stat.id} className="glass-card p-6 rounded-2xl border border-borderGray hover:border-primaryGreen/40 transition-colors group">
          <div className="w-12 h-12 rounded-xl bg-primaryGreen/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
            {stat.icon}
          </div>
          <h3 className="text-4xl font-extrabold text-white mb-2">{stat.value}</h3>
          <h4 className="text-base font-bold text-white mb-2">{stat.title}</h4>
          <p className="text-xs text-mutedGray leading-relaxed">{stat.desc}</p>
        </div>
      ))}
    </div>
  );
}