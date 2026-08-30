'use client';
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import ChatDemo from '../components/ChatDemo';
import Metrics from '../components/Metrics';
import ROICalculator from '../components/ROICalculator';
import FAQ from '../components/FAQ';
import LeadForm from '../components/LeadForm';
import Footer from '../components/Footer';
import { Cpu, Zap, Star, ShieldCheck, ArrowUpRight, Code, MessageSquare, Terminal } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'atendimento' | 'vendas' | 'operacoes' | 'experiencias'>('atendimento');

  const portfolio = [
    {
      title: "Clínica de Saúde Inteligente",
      category: "Atendimento com IA",
      desc: "Site premium integrado com agente de IA no WhatsApp para agendamento automático e triagem prévia.",
      impact: "+40% de conversão de consultas"
    },
    {
      title: "Imobiliária Digital Integrada",
      category: "Automação",
      desc: "Captura de leads, qualificação instantânea com envio automático de imóveis compatíveis e sincronização com CRM.",
      impact: "Zero perda de leads na triagem"
    },
    {
      title: "E-Commerce com Assistente de IA",
      category: "Sites Inteligentes",
      desc: "Loja virtual moderna acoplada com agente inteligente que recomenda produtos e recupera carrinhos abandonados.",
      impact: "Recuperação de 28% dos carrinhos"
    },
    {
      title: "Plataforma de Serviços Profissionais",
      category: "Sistemas Internos",
      desc: "Automação de ponta a ponta para escritórios, incluindo triagem automática e coleta segura de documentos via webhook.",
      impact: "Redução de 85% no tempo de triagem"
    },
    {
      title: "SaaS B2B Helpdesk Automatizado",
      category: "Atendimento com IA",
      desc: "Central de ajuda autônoma respondendo chamados complexos por e-mail e webchat com IA generativa.",
      impact: "70% de chamados resolvidos de primeira"
    },
    {
      title: "Dashboard Operacional Plynexa",
      category: "Dashboards",
      desc: "Acompanhamento em tempo real das métricas de atendimento, economia gerada e volume de automação de processos.",
      impact: "Visibilidade absoluta de custos"
    }
  ];

  return (
    <div className="min-h-screen bg-background relative selection:bg-primaryGreen selection:text-background">
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 left-0 right-0 h-[800px] bg-gradient-to-b from-primaryGreen/5 to-transparent pointer-events-none z-0"></div>

      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-6 max-w-7xl mx-auto z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primaryGreen/10 border border-primaryGreen/20 text-xs text-primaryGreen font-bold tracking-wider uppercase">
              <Cpu size={14} className="animate-spin" />
              Agentes de IA e Automações de Alta Conversão
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
              Escale sua empresa com <span className="green-gradient">Inteligência Artificial</span> e Automação 24/7
            </h1>
            
            <p className="text-base sm:text-lg text-mutedGray max-w-xl leading-relaxed">
              Automatize o atendimento no WhatsApp, qualifique leads automaticamente e conecte seus sistemas internos sem precisar expandir sua equipe.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a 
                href="#contato" 
                className="px-8 py-4 rounded-xl bg-primaryGreen text-background font-extrabold text-center hover:shadow-[0_0_20px_rgba(57,255,20,0.4)] transition-all flex items-center justify-center gap-2"
              >
                Garantir Meu Diagnóstico
              </a>
              <a 
                href="#solucoes" 
                className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-extrabold text-center hover:bg-white/10 transition-all flex items-center justify-center gap-1.5"
              >
                Conhecer Soluções
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-4 border-t border-borderGray text-xs text-mutedGray">
              <span className="flex items-center gap-1.5 text-white">✓ Sem fidelidade obrigatória</span>
              <span className="flex items-center gap-1.5 text-white">✓ Suporte 100% customizado</span>
              <span className="flex items-center gap-1.5 text-white">✓ Adequação integral à LGPD</span>
            </div>
          </div>

          <div className="relative">
            {/* Ambient glow */}
            <div className="absolute -inset-1.5 bg-primaryGreen/20 rounded-2xl blur-2xl z-0"></div>
            <div className="relative z-10">
              <ChatDemo />
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-12 bg-cardBg/30 border-y border-borderGray">
        <div className="max-w-7xl mx-auto px-6">
          <Metrics />
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solucoes" className="py-20 md:py-28 px-6 max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Soluções Completas para sua Empresa</h2>
          <p className="text-sm sm:text-base text-mutedGray max-w-xl mx-auto">Desenvolvemos arquiteturas personalizadas com foco em resultados reais para cada setor.</p>
          
          {/* Tab Selector */}
          <div className="inline-flex p-1 bg-cardBg border border-borderGray rounded-xl max-w-full overflow-x-auto gap-1">
            {(['atendimento', 'vendas', 'operacoes', 'experiencias'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-lg text-xs md:text-sm font-bold capitalize transition-all whitespace-nowrap ${
                  activeTab === tab 
                    ? 'bg-primaryGreen text-background shadow-lg' 
                    : 'text-mutedGray hover:text-white'
                }`}
              >
                {tab === 'experiencias' ? 'Experiências Digitais' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="glass-card p-6 md:p-10 rounded-2xl border border-borderGray glow-green max-w-4xl mx-auto">
          {activeTab === 'atendimento' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primaryGreen font-bold text-sm">
                <Cpu size={18} /> Atendimento Automatizado 24/7
              </div>
              <h3 className="text-2xl font-bold text-white">Resolução imediata nos canais preferidos dos clientes</h3>
              <p className="text-sm md:text-base text-mutedGray leading-relaxed">
                Integramos agentes de inteligência artificial treinados com toda a base de conhecimento do seu negócio para responder dúvidas, triar leads, consultar andamento de pedidos e realizar suporte nível 1 de forma instantânea e humanizada, encaminhando o cliente para o atendente correto apenas quando estritamente necessário.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-borderGray/50 text-xs md:text-sm">
                <span className="text-white">● Respostas automáticas em &lt; 3 seg</span>
                <span className="text-white">● Integração oficial de WhatsApp API</span>
                <span className="text-white">● Suporte omnicanal unificado</span>
                <span className="text-white">● Redução drástica de abandono</span>
              </div>
            </div>
          )}

          {activeTab === 'vendas' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primaryGreen font-bold text-sm">
                <Zap size={18} /> Qualificação e Conversão de Leads
              </div>
              <h3 className="text-2xl font-bold text-white">Não perca vendas por demora no tempo de resposta</h3>
              <p className="text-sm md:text-base text-mutedGray leading-relaxed">
                Nossos agentes comerciais virtuais iniciam e dão andamento na conversa com leads de campanhas a qualquer hora do dia ou da noite. Eles realizam a qualificação de forma automática seguindo o perfil de cliente ideal da empresa, e efetuam o agendamento de reuniões comerciais diretamente na agenda do seu time comercial.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-borderGray/50 text-xs md:text-sm">
                <span className="text-white">● Abordagem ativa em novos leads</span>
                <span className="text-white">● Agendamento automático no Calendly</span>
                <span className="text-white">● Integração em tempo real com CRM</span>
                <span className="text-white">● Recuperação ativa de carrinhos</span>
              </div>
            </div>
          )}

          {activeTab === 'operacoes' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primaryGreen font-bold text-sm">
                <Terminal size={18} /> Automação Interna de Processos
              </div>
              <h3 className="text-2xl font-bold text-white">Elimine o trabalho repetitivo e libere seu time</h3>
              <p className="text-sm md:text-base text-mutedGray leading-relaxed">
                Desenvolvemos fluxos de automação de dados integrando seus CRMs (HubSpot, Pipedrive, RD Station), ERPs e ferramentas de planilhas. Desde a triagem automatizada e validação de documentos recebidos até a geração automática de relatórios operacionais completos com resumos inteligentes.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-borderGray/50 text-xs md:text-sm">
                <span className="text-white">● Sincronização automática entre plataformas</span>
                <span className="text-white">● Validação e leitura de documentos por IA</span>
                <span className="text-white">● Notificações e fluxos em tempo real</span>
                <span className="text-white">● Zero erros de preenchimento manual</span>
              </div>
            </div>
          )}

          {activeTab === 'experiencias' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primaryGreen font-bold text-sm">
                <Code size={18} /> Desenvolvimento de Sites Inteligentes
              </div>
              <h3 className="text-2xl font-bold text-white">Sua vitrine digital otimizada para alta conversão</h3>
              <p className="text-sm md:text-base text-mutedGray leading-relaxed">
                Criamos landing pages, sites institucionais modernos e portais corporativos responsivos com foco total em conversão e velocidade de carregamento (SEO acima de 90). Todos os sites já contam com recursos integrados de captação de leads e inteligência artificial nativa incorporada para maximizar resultados.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-borderGray/50 text-xs md:text-sm">
                <span className="text-white">● Velocidade otimizada para dispositivos móveis</span>
                <span className="text-white">● Código limpo otimizado para SEO local</span>
                <span className="text-white">● Elementos visuais interativos</span>
                <span className="text-white">● Suporte técnico e evolução contínua</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Services Cards */}
      <section id="servicos" className="py-20 bg-cardBg/20 border-y border-borderGray px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Nossas Linhas de Atuação</h2>
            <p className="text-sm text-mutedGray max-w-xl mx-auto">Escolha o nível de implementação ideal para o atual momento de crescimento do seu negócio.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="glass-card p-8 rounded-2xl border border-borderGray flex flex-col justify-between hover:border-primaryGreen/40 transition-colors">
              <div className="space-y-5">
                <div className="text-xs font-bold text-primaryGreen uppercase tracking-widest">Nível 01</div>
                <h3 className="text-2xl font-bold text-white">Site Essencial</h3>
                <p className="text-sm text-mutedGray leading-relaxed">Website institucional profissional, com carregamento ultrarrápido, design moderno sob medida e otimização de SEO para buscadores.</p>
                <ul className="space-y-2.5 text-xs text-mutedGray border-t border-borderGray/50 pt-5">
                  <li className="flex items-center gap-2 text-white">✓ Landing page responsiva de alta performance</li>
                  <li className="flex items-center gap-2 text-white">✓ Otimização de SEO (Lighthouse &gt; 90)</li>
                  <li className="flex items-center gap-2 text-white">✓ Formuários integrados para recebimento de leads</li>
                </ul>
              </div>
              <a href="#contato" className="mt-8 w-full py-3 text-center rounded-xl border border-primaryGreen/30 text-primaryGreen font-bold text-xs hover:bg-primaryGreen hover:text-background transition-all">Solicitar Orçamento</a>
            </div>

            {/* Card 2 */}
            <div className="glass-card p-8 rounded-2xl border-2 border-primaryGreen glow-green flex flex-col justify-between relative">
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primaryGreen text-background text-[10px] font-extrabold uppercase tracking-wider">Mais Procurado</span>
              <div className="space-y-5">
                <div className="text-xs font-bold text-primaryGreen uppercase tracking-widest">Nível 02</div>
                <h3 className="text-2xl font-bold text-white">Site de Conversão</h3>
                <p className="text-sm text-mutedGray leading-relaxed">Experiência inteligente completa com landing pages avançadas integradas com CRM e fluxos automáticos de acompanhamento comercial.</p>
                <ul className="space-y-2.5 text-xs text-mutedGray border-t border-borderGray/50 pt-5">
                  <li className="flex items-center gap-2 text-white">✓ Landing page + Automação de CRM (API)</li>
                  <li className="flex items-center gap-2 text-white">✓ Dashboard básico de acompanhamento</li>
                  <li className="flex items-center gap-2 text-white">✓ Rastreamento de conversão pixel/analytics</li>
                </ul>
              </div>
              <a href="#contato" className="mt-8 w-full py-3 text-center rounded-xl bg-primaryGreen text-background font-extrabold text-xs hover:opacity-90 transition-opacity">Contratar Solução</a>
            </div>

            {/* Card 3 */}
            <div className="glass-card p-8 rounded-2xl border border-borderGray flex flex-col justify-between hover:border-primaryGreen/40 transition-colors">
              <div className="space-y-5">
                <div className="text-xs font-bold text-primaryGreen uppercase tracking-widest">Nível 03</div>
                <h3 className="text-2xl font-bold text-white">Experiência Inteligente</h3>
                <p className="text-sm text-mutedGray leading-relaxed">Automação máxima com agente inteligente de IA integrado ao WhatsApp, site e CRM para triagem de leads, vendas e agendamento automático.</p>
                <ul className="space-y-2.5 text-xs text-mutedGray border-t border-borderGray/50 pt-5">
                  <li className="flex items-center gap-2 text-white">✓ Agente de IA customizado (WhatsApp e Webchat)</li>
                  <li className="flex items-center gap-2 text-white">✓ Integrações customizadas via Webhooks e APIs</li>
                  <li className="flex items-center gap-2 text-white">✓ Treinamento com base de conhecimento</li>
                </ul>
              </div>
              <a href="#contato" className="mt-8 w-full py-3 text-center rounded-xl border border-primaryGreen/30 text-primaryGreen font-bold text-xs hover:bg-primaryGreen hover:text-background transition-all">Solicitar Escopo de IA</a>
            </div>
          </div>
        </div>
      </section>

      {/* Portfólio Section */}
      <section id="portfolio" className="py-20 md:py-28 px-6 max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Portfólio de Soluções Plynexa</h2>
          <p className="text-sm sm:text-base text-mutedGray max-w-xl mx-auto">Demonstrações de aplicações de mercado estruturadas com IA prontas para adaptação.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolio.map((item, idx) => (
            <div key={idx} className="glass-card p-6 rounded-2xl border border-borderGray flex flex-col justify-between hover:border-primaryGreen/30 transition-colors">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-primaryGreen font-bold uppercase tracking-wider bg-primaryGreen/10 border border-primaryGreen/20 px-2 py-0.5 rounded-md">Demonstrativo</span>
                  <span className="text-[10px] text-mutedGray">{item.category}</span>
                </div>
                <h4 className="text-lg font-bold text-white">{item.title}</h4>
                <p className="text-xs text-mutedGray leading-relaxed">{item.desc}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-borderGray/50 flex items-center justify-between">
                <span className="text-[10px] text-white font-medium">Métrica Projetada:</span>
                <span className="text-[10px] text-primaryGreen font-bold">{item.impact}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ROI Section */}
      <section id="roi" className="py-20 bg-cardBg/20 border-y border-borderGray px-6">
        <div className="max-w-7xl mx-auto">
          <ROICalculator />
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 md:py-28 px-6 max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Dúvidas Frequentes</h2>
          <p className="text-sm text-mutedGray max-w-xl mx-auto">Tudo o que você precisa saber sobre a segurança, implementação e custos da Plynexa.</p>
        </div>
        <FAQ />
      </section>

      {/* Lead / Contact Section */}
      <section id="contato" className="py-20 bg-cardBg/40 border-t border-borderGray px-6">
        <div className="max-w-7xl mx-auto">
          <LeadForm />
        </div>
      </section>

      <Footer />
    </div>
  );
}