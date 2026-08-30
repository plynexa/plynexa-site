import React, { useState, useEffect } from 'react';
import { Send, Bot, User, CheckCircle2 } from 'lucide-react';

interface Message {
  id: number;
  sender: 'user' | 'ia';
  text: string;
  time: string;
  meta?: string;
}

export default function ChatDemo() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: 'user', text: "Olá! Gostaria de entender mais sobre as soluções de automação da Plynexa para minha empresa.", time: "14:32" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [step, setStep] = useState(0);

  const scenario = [
    {
      iaText: "Olá! Seja muito bem-vindo à Plynexa. Sou o assistente inteligente da Plynexa. Qual é o seu nome e de qual empresa você fala?",
      userText: "Me chamo Roberto, falo da LogiTech Distribuidora."
    },
    {
      iaText: "Muito prazer, Roberto! Entendido, LogiTech. Qual é hoje o seu maior gargalo operacional? Atendimento ao cliente demorado, processos internos manuais ou falta de integração de IA?",
      userText: "Nossos clientes demoram muito para serem respondidos no WhatsApp, e os dados de leads não vão pro CRM."
    },
    {
      iaText: "Perfeito! A Plynexa automatiza isso conectando um agente inteligente ao seu WhatsApp. Ele qualifica e atualiza seu CRM automaticamente. Quer agendar um diagnóstico gratuito com nossa equipe de especialistas?",
      userText: "Sim, gostaria sim! Quinta-feira às 15h é possível?"
    },
    {
      iaText: "Agendado com sucesso! Roberto - LogiTech, Quinta-feira às 15h. Acabo de atualizar seu cadastro no CRM com prioridade alta! Nos vemos em breve.",
      userText: "Perfeito! Obrigado pelo excelente atendimento."
    }
  ];

  useEffect(() => {
    if (step === 0) {
      setIsTyping(true);
      const timer = setTimeout(() => {
        setMessages(prev => [...prev, {
          id: Date.now(),
          sender: 'ia',
          text: "Olá! Seja muito bem-vindo à Plynexa. Sou o agente virtual oficial da Plynexa. 🤖 Como posso transformar sua operação de vendas ou atendimento hoje?",
          time: "14:32"
        }]);
        setIsTyping(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleNextStep = () => {
    if (step >= scenario.length) return;
    
    // User replies
    const userMsg = scenario[step].userText;
    setMessages(prev => [...prev, {
      id: Date.now(),
      sender: 'user',
      text: userMsg,
      time: "14:33"
    }]);

    setStep(prev => prev + 1);
    setIsTyping(true);

    // IA replies
    setTimeout(() => {
      const iaMsg = scenario[step].iaText;
      let meta = undefined;
      if (step === scenario.length - 1) {
        meta = "✓ Lead Qualificado | ✓ CRM Atualizado via API | ✓ Reunião Agendada";
      }
      setMessages(prev => [...prev, {
        id: Date.now(),
        sender: 'ia',
        text: iaMsg,
        time: "14:34",
        meta: meta
      }]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <div className="glass-card rounded-2xl glow-green overflow-hidden border border-borderGray flex flex-col h-[480px] w-full max-w-md mx-auto">
      {/* Header */}
      <div className="bg-cardBg/95 px-5 py-4 border-b border-borderGray flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primaryGreen/10 flex items-center justify-center border border-primaryGreen/20">
            <Bot size={20} className="text-primaryGreen animate-pulse" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
              Agente Virtual Plynexa
              <span className="w-2 h-2 rounded-full bg-primaryGreen inline-block"></span>
            </h4>
            <p className="text-xs text-mutedGray">Operação 24/7 Ativa</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 flex flex-col justify-end">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex flex-col max-w-[85%] ${
              msg.sender === 'user' ? 'self-end items-end' : 'self-start items-start'
            }`}
          >
            <div className={`p-3.5 rounded-2xl text-sm ${
              msg.sender === 'user' 
                ? 'bg-primaryGreen text-background font-medium rounded-tr-none' 
                : 'bg-cardBg/90 border border-borderGray text-white rounded-tl-none'
            }`}>
              {msg.text}
            </div>
            <span className="text-[10px] text-mutedGray mt-1 px-1">{msg.time}</span>
            {msg.meta && (
              <span className="text-[10px] bg-primaryGreen/10 border border-primaryGreen/30 text-primaryGreen rounded-lg px-2 py-1 mt-2 flex items-center gap-1">
                <CheckCircle2 size={12} /> {msg.meta}
              </span>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="self-start max-w-[85%] flex flex-col items-start">
            <div className="p-3 bg-cardBg/90 border border-borderGray text-white rounded-2xl rounded-tl-none text-sm flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-primaryGreen rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-primaryGreen rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 bg-primaryGreen rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </div>
        )}
      </div>

      {/* Input / Control Footer */}
      <div className="p-4 bg-cardBg/80 border-t border-borderGray">
        {step < scenario.length ? (
          <button
            onClick={handleNextStep}
            disabled={isTyping}
            className="w-full py-3 px-4 rounded-xl bg-primaryGreen/10 border border-primaryGreen/30 text-primaryGreen font-bold text-xs hover:bg-primaryGreen hover:text-background flex items-center justify-center gap-2 transition-all"
          >
            <Send size={14} />
            Simular Próxima Resposta de Lead
          </button>
        ) : (
          <button
            onClick={() => {
              setMessages([
                { id: 1, sender: 'user', text: "Olá! Gostaria de entender mais sobre as soluções de automação da Plynexa para minha empresa.", time: "14:32" }
              ]);
              setStep(0);
            }}
            className="w-full py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-xs hover:bg-white/10 flex items-center justify-center gap-2 transition-all"
          >
            Reiniciar Simulação Comercial
          </button>
        )}
      </div>
    </div>
  );
}