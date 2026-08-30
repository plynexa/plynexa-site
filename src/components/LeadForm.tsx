'use client';
import React, { useState } from 'react';
import { Send, CheckCircle, AlertTriangle } from 'lucide-react';

export default function LeadForm() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    whatsapp: '',
    empresa: '',
    servico: 'Experiência Inteligente',
    mensagem: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error("Configurações do Supabase não encontradas nas variáveis de ambiente da Vercel.");
      setStatus('error');
      return;
    }

    try {
      // Faz o envio direto para a API Rest pública do seu Supabase
      const response = await fetch(`${supabaseUrl}/rest/v1/agency_leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          business_name: formData.empresa,
          contact_name: formData.nome,
          email: formData.email,
          phone: formData.whatsapp,
          service_interest: formData.servico,
          message: formData.mensagem
        })
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ nome: '', email: '', whatsapp: '', empresa: '', servico: 'Experiência Inteligente', message: '' });
      } else {
        const errorText = await response.text();
        console.error("Erro do Supabase:", errorText);
        setStatus('error');
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      setStatus('error');
    }
  };

  return (
    <div className="glass-card p-6 md:p-8 rounded-2xl border border-borderGray glow-green max-w-xl mx-auto">
      {status === 'success' ? (
        <div className="text-center py-12 space-y-4">
          <div className="w-16 h-16 rounded-full bg-primaryGreen/10 border border-primaryGreen/30 flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} className="text-primaryGreen" />
          </div>
          <h3 className="text-2xl font-bold text-white">Solicitação Recebida!</h3>
          <p className="text-sm text-mutedGray max-w-sm mx-auto">
            Nossos engenheiros de IA e soluções comerciais já estão analisando os canais do seu negócio. Entraremos em contato no WhatsApp em breve!
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <h4 className="text-xl font-extrabold text-white mb-1">Agendar Diagnóstico de IA Gratuito</h4>
            <p className="text-xs text-mutedGray">Identifique os gargalos de atendimento do seu negócio em 15 minutos.</p>
          </div>

          {status === 'error' && (
            <div className="p-4 bg-red-950/40 border border-red-500/30 text-red-200 rounded-xl text-xs flex gap-2 items-center">
              <AlertTriangle size={16} className="shrink-0 text-red-400" />
              <span>Ocorreu um erro ao enviar seus dados para o banco. Verifique suas variáveis de ambiente na Vercel.</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] text-mutedGray uppercase tracking-wider font-bold">Seu Nome</label>
              <input 
                type="text" 
                required
                placeholder="Ex: Roberto Silva"
                value={formData.nome}
                onChange={e => setFormData({...formData, nome: e.target.value})}
                className="w-full bg-background border border-borderGray rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primaryGreen transition-colors"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-mutedGray uppercase tracking-wider font-bold">Nome da Empresa</label>
              <input 
                type="text" 
                required
                placeholder="Ex: LogiTech Ltda"
                value={formData.empresa}
                onChange={e => setFormData({...formData, empresa: e.target.value})}
                className="w-full bg-background border border-borderGray rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primaryGreen transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] text-mutedGray uppercase tracking-wider font-bold">E-mail Corporativo</label>
              <input 
                type="email" 
                required
                placeholder="roberto@empresa.com"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                className="w-full bg-background border border-borderGray rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primaryGreen transition-colors"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-mutedGray uppercase tracking-wider font-bold">WhatsApp de Contato</label>
              <input 
                type="tel" 
                required
                placeholder="(22) 99874-1943"
                value={formData.whatsapp}
                onChange={e => setFormData({...formData, whatsapp: e.target.value})}
                className="w-full bg-background border border-borderGray rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primaryGreen transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] text-mutedGray uppercase tracking-wider font-bold">Solução Desejada</label>
            <select 
              value={formData.servico}
              onChange={e => setFormData({...formData, servico: e.target.value})}
              className="w-full bg-background border border-borderGray rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primaryGreen transition-colors appearance-none"
            >\n              <option value="Site Essencial">Site Essencial (Apenas Site Institucional)</option>
              <option value="Site de Conversão">Site de Conversão (Landing Page + Automações)</option>
              <option value="Experiência Inteligente">Experiência Inteligente (Site + Agente de IA e WhatsApp)</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] text-mutedGray uppercase tracking-wider font-bold">Mensagem Adicional (Opcional)</label>
            <textarea 
              rows={3}
              placeholder="Descreva brevemente sua operação e o que espera da IA..."
              value={formData.mensagem}
              onChange={e => setFormData({...formData, mensagem: e.target.value})}
              className="w-full bg-background border border-borderGray rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primaryGreen transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full py-3.5 bg-primaryGreen text-background font-bold rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 text-sm"
          >
            {status === 'loading' ? (
              <span className="w-5 h-5 border-2 border-background border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                <Send size={16} />
                Solicitar Diagnóstico Gratuito
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
