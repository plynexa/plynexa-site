'use client';
import React,{useEffect,useState} from 'react';
import {Bot,CheckCheck,Database,Target,Users,BookOpen} from 'lucide-react';

const steps=[
 {k:'user',t:'Olá! Gostaria de entender as soluções de automação da Plynexa para minha empresa.'},
 {k:'event',t:'Intenção identificada: interesse comercial · atendimento e vendas',i:Target},
 {k:'event',t:'Consultando base de conhecimento da empresa',i:BookOpen},
 {k:'agent',t:'Olá! Posso entender seu cenário, qualificar a oportunidade e encaminhar um diagnóstico com contexto completo.'},
 {k:'user',t:'Nossos clientes demoram para ser respondidos no WhatsApp e os leads não chegam ao CRM.'},
 {k:'event',t:'Lead qualificado: atendimento · CRM · prioridade comercial',i:CheckCheck},
 {k:'agent',t:'Perfeito. Podemos conectar o atendimento, automatizar a qualificação e sincronizar os dados com o CRM.'},
 {k:'event',t:'CRM atualizado · transferência para humano com contexto',i:Database},
];
export default function ChatDemo(){
 const [visible,setVisible]=useState(1);
 useEffect(()=>{const id=setInterval(()=>setVisible(v=>v>=steps.length?1:v+1),1700);return()=>clearInterval(id)},[]);
 return <div className="glass-card glow-brand relative overflow-hidden rounded-2xl">
  <div className="flex items-center justify-between border-b border-borderGray px-5 py-4">
   <div className="flex items-center gap-3"><span className="flex size-9 items-center justify-center rounded-full bg-emerald-400/10 border border-emerald-400/20"><Bot className="size-4 text-primaryGreen"/></span><div><p className="text-sm font-semibold">Agente Virtual Plynexa</p><p className="text-xs text-primaryGreen">online · operação 24/7</p></div></div>
   <span className="rounded-full border border-borderGray px-2.5 py-1 text-[10px] uppercase tracking-wide text-mutedGray">Demonstração</span>
  </div>
  <div className="min-h-[420px] space-y-3 p-5 flex flex-col justify-end">
   {steps.slice(0,visible).map((s,i)=>{const I=s.i; return <div key={i} className={s.k==='user'?'max-w-[88%] self-end rounded-2xl rounded-br-sm bg-cardBg px-4 py-2.5 text-sm':s.k==='agent'?'max-w-[90%] self-start rounded-2xl rounded-bl-sm border border-primaryGreen/25 bg-primaryGreen/10 px-4 py-2.5 text-sm':'flex items-center gap-2 self-start rounded-lg border border-borderGray bg-background/60 px-3 py-1.5 text-[11px] text-mutedGray'}>{s.k==='agent'&&<Bot className="mt-0.5 size-3.5 shrink-0 text-primaryGreen"/>}{I&&<I className="size-3.5 shrink-0 text-primaryGreen"/>}<span>{s.t}</span></div>})}
  </div>
 </div>
}
