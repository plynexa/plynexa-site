import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      q: "Como funcionam as automações de IA no WhatsApp?",
      a: "Nossos agentes inteligentes são conectados de forma oficial ao WhatsApp (via API Cloud). Eles respondem imediatamente aos clientes utilizando a base de conhecimento específica da sua empresa, qualificam leads e os encaminham para o CRM."
    },
    {
      q: "Os dados da minha empresa estarão seguros?",
      a: "Com certeza. A Plynexa segue rígidos padrões de conformidade com a LGPD. Todos os dados são criptografados de ponta a ponta em servidores de alta segurança e nunca são compartilhados ou utilizados para treinamento externo de modelos públicos."
    },
    {
      q: "A IA pode errar ou inventar informações?",
      a: "Nossos prompts são desenhados de maneira extremamente restritiva para garantir que o agente virtual responda exclusivamente de acordo com a base de conhecimento cadastrada por você. Caso o usuário pergunte algo fora do escopo, ele transfere de forma educada para o suporte humano."
    },
    {
      q: "Qual o prazo médio de implementação de um projeto?",
      a: "Depende da complexidade do projeto. Sites institucionais (Site Essencial) levam entre 10 e 15 dias úteis, enquanto integrações completas com agentes customizados no WhatsApp e dashboards levam de 25 a 45 dias úteis."
    },
    {
      q: "Como é feita a integração com o CRM?",
      a: "Desenvolvemos integrações via webhooks e APIs diretamente nos seus CRMs favoritos (como Pipedrive, HubSpot, Salesforce, RD Station) ou em sistemas internos e ERPs customizados."
    }
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div 
            key={idx} 
            className="glass-card rounded-xl border border-borderGray overflow-hidden transition-all duration-300"
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className="w-full px-6 py-5 flex items-center justify-between text-left text-white hover:text-primaryGreen font-bold text-sm md:text-base"
            >
              <span>{faq.q}</span>
              <span className="text-primaryGreen ml-4 shrink-0">
                {isOpen ? <Minus size={18} /> : <Plus size={18} />}
              </span>
            </button>
            
            {isOpen && (
              <div className="px-6 pb-5 pt-1 text-xs md:text-sm text-mutedGray leading-relaxed border-t border-borderGray/50 animate-fade-in">
                {faq.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}