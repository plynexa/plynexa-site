'use client';
import React, { useState } from 'react';
import { Landmark, TrendingUp, Hourglass, ShieldAlert } from 'lucide-react';

export default function ROICalculator() {
  const [tickets, setTickets] = useState(1500);
  const [costPerHour, setCostPerHour] = useState(25);
  const [timePerTicket, setTimePerTicket] = useState(15); // minutes

  // Calculations
  const totalHoursSpent = Math.round((tickets * timePerTicket) / 60);
  const totalCost = totalHoursSpent * costPerHour;
  
  // Premise: 75% average automated tickets
  const automatedTickets = Math.round(tickets * 0.75);
  const hoursSaved = Math.round((automatedTickets * timePerTicket) / 60);
  const monthlySavings = hoursSaved * costPerHour;
  const annualSavings = monthlySavings * 12;

  return (
    <div className="glass-card rounded-2xl border border-borderGray p-6 md:p-8 glow-green grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Parameters */}
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-extrabold text-white mb-2">Calculadora de ROI da Plynexa</h3>
          <p className="text-sm text-mutedGray">Descubra quanto sua empresa economiza automatizando processos de vendas e atendimento.</p>
        </div>

        {/* Param 1 */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-white font-medium">Contatos mensais (WhatsApp/Site)</span>
            <span className="text-primaryGreen font-bold">{tickets.toLocaleString()} atendimentos</span>
          </div>
          <input 
            type="range" 
            min="200" 
            max="10000" 
            step="100"
            value={tickets} 
            onChange={(e) => setTickets(Number(e.target.value))}
            className="w-full accent-primaryGreen bg-background h-2 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Param 2 */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-white font-medium">Custo por hora da equipe de atendimento</span>
            <span className="text-primaryGreen font-bold">R$ {costPerHour}/hora</span>
          </div>
          <input 
            type="range" 
            min="10" 
            max="150" 
            step="5"
            value={costPerHour} 
            onChange={(e) => setCostPerHour(Number(e.target.value))}
            className="w-full accent-primaryGreen bg-background h-2 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Param 3 */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-white font-medium">Tempo médio de cada atendimento</span>
            <span className="text-primaryGreen font-bold">{timePerTicket} minutos</span>
          </div>
          <input 
            type="range" 
            min="5" 
            max="45" 
            step="1"
            value={timePerTicket} 
            onChange={(e) => setTimePerTicket(Number(e.target.value))}
            className="w-full accent-primaryGreen bg-background h-2 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div className="p-3.5 bg-white/5 border border-white/5 rounded-xl text-xs text-mutedGray flex gap-2">
          <ShieldAlert size={16} className="text-primaryGreen shrink-0" />
          <span>Este simulador é baseado em métricas de eficiência médias. O impacto exato depende das integrações de sistemas e da complexidade da operação de cada negócio.</span>
        </div>
      </div>

      {/* Results */}
      <div className="bg-background/80 rounded-xl p-6 border border-borderGray flex flex-col justify-between space-y-6">
        <h4 className="text-base font-bold text-white uppercase tracking-wider">Impacto Mensal Estimado</h4>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-cardBg/90 border border-borderGray rounded-xl">
            <div className="flex items-center gap-2 text-mutedGray mb-1 text-xs">
              <Hourglass size={14} className="text-primaryGreen" />
              Horas Poupadas / Mês
            </div>
            <p className="text-2xl font-extrabold text-white">{hoursSaved}h</p>
          </div>

          <div className="p-4 bg-cardBg/90 border border-borderGray rounded-xl">
            <div className="flex items-center gap-2 text-mutedGray mb-1 text-xs">
              <Landmark size={14} className="text-primaryGreen" />
              Economia Mensal
            </div>
            <p className="text-2xl font-extrabold text-white">R$ {monthlySavings.toLocaleString()}</p>
          </div>
        </div>

        <div className="p-6 bg-primaryGreen/10 border border-primaryGreen/30 rounded-xl text-center">
          <p className="text-xs text-mutedGray uppercase tracking-widest mb-1 font-bold">Economia Operacional Anual Estimada</p>
          <p className="text-4xl font-extrabold text-primaryGreen">R$ {annualSavings.toLocaleString()}</p>
          <p className="text-[10px] text-mutedGray mt-2">Equivalente a automatizar {automatedTickets.toLocaleString()} contatos todo mês.</p>
        </div>

        <a 
          href="#contato" 
          className="w-full text-center py-3 bg-primaryGreen text-background font-bold rounded-xl text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        >
          <TrendingUp size={16} />
          Garantir Minha Economia na Plynexa
        </a>
      </div>
    </div>
  );
}