'use client';
import React, { useState, useEffect } from 'react';
import { 
  Trash2, 
  Edit, 
  CheckCircle2, 
  X, 
  Lock, 
  RefreshCw, 
  Phone, 
  Mail, 
  Briefcase, 
  Calendar,
  Building,
  User,
  MessageSquare,
  AlertTriangle
} from 'lucide-react';

interface Lead {
  place_id: string;
  created_at: string;
  business_name: string;
  contact_name: string | null;
  email: string | null;
  phone: string | null;
  service_interest: string | null;
  message: string | null;
  status: string | null;
}

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Estados de Edição
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [editForm, setEditForm] = useState({
    business_name: '',
    contact_name: '',
    email: '',
    phone: '',
    service_interest: '',
    status: 'HUMAN_REVIEW'
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Verifica se já estava autenticado na sessão atual
  useEffect(() => {
    const sessionAuth = sessionStorage.getItem('plynexa_admin_auth');
    if (sessionAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Carrega os leads se estiver autenticado
  useEffect(() => {
    if (isAuthenticated) {
      fetchLeads();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'plynexa2026') {
      setIsAuthenticated(true);
      setAuthError('');
      sessionStorage.setItem('plynexa_admin_auth', 'true');
    } else {
      setAuthError('Senha incorreta. Tente novamente.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
    sessionStorage.removeItem('plynexa_admin_auth');
  };

  const fetchLeads = async () => {
    if (!supabaseUrl || !supabaseKey) {
      setError('Credenciais do Supabase não configuradas na Vercel.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${supabaseUrl}/rest/v1/agency_leads?order=created_at.desc`, {
        method: 'GET',
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setLeads(data);
      } else {
        const errText = await response.text();
        setError(`Erro ao buscar dados: ${response.status} - ${errText}`);
      }
    } catch (err: any) {
      setError(`Erro na requisição: ${err?.message || err}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (placeId: string) => {
    if (!confirm('Tem certeza absoluta que deseja excluir este lead permanentemente?')) {
      return;
    }

    try {
      const response = await fetch(`${supabaseUrl}/rest/v1/agency_leads?place_id=eq.${encodeURIComponent(placeId)}`, {
        method: 'DELETE',
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        // Remove da lista localmente
        setLeads(leads.filter(lead => lead.place_id !== placeId));
      } else {
        alert('Erro ao excluir no Supabase. Verifique se as permissões de DELETE estão liberadas.');
      }
    } catch (err) {
      console.error(err);
      alert('Erro de conexão ao tentar excluir.');
    }
  };

  const startEdit = (lead: Lead) => {
    setEditingLead(lead);
    setEditForm({
      business_name: lead.business_name || '',
      contact_name: lead.contact_name || '',
      email: lead.email || '',
      phone: lead.phone || '',
      service_interest: lead.service_interest || '',
      status: lead.status || 'HUMAN_REVIEW'
    });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLead) return;

    try {
      const response = await fetch(`${supabaseUrl}/rest/v1/agency_leads?place_id=eq.${encodeURIComponent(editingLead.place_id)}`, {
        method: 'PATCH',
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        },
        body: JSON.stringify({
          business_name: editForm.business_name,
          contact_name: editForm.contact_name,
          email: editForm.email,
          phone: editForm.phone,
          service_interest: editForm.service_interest,
          status: editForm.status
        })
      });

      if (response.ok) {
        // Atualiza a lista localmente
        setLeads(leads.map(lead => 
          lead.place_id === editingLead.place_id 
            ? { ...lead, ...editForm } 
            : lead
        ));
        setEditingLead(null);
      } else {
        alert('Erro ao atualizar dados no Supabase. Verifique se as permissões de UPDATE estão liberadas.');
      }
    } catch (err) {
      console.error(err);
      alert('Erro de conexão ao tentar salvar alterações.');
    }
  };

  // Retorna uma mensagem formatada para abrir no WhatsApp
  const getWhatsAppLink = (lead: Lead) => {
    if (!lead.phone) return '#';
    const cleanPhone = lead.phone.replace(/\D/g, '');
    const phoneWithDdi = cleanPhone.length <= 11 && !cleanPhone.startsWith('55') ? `55${cleanPhone}` : cleanPhone;
    
    const message = `Olá ${lead.contact_name || ''}! Tudo bem? Sou da Plynexa. Vi que você enviou um contato em nosso site demonstrando interesse no serviço: "${lead.service_interest || 'Experiência Inteligente'}".\n\nPodemos conversar um pouco sobre os seus gargalos operacionais?`;
    
    return `https://wa.me/${phoneWithDdi}?text=${encodeURIComponent(message)}`;
  };

  // Se NÃO estiver autenticado, exibe a tela de login com o estilo do site
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6 selection:bg-primaryGreen selection:text-background">
        <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-primaryGreen/5 to-transparent pointer-events-none z-0"></div>
        
        <div className="glass-card p-8 rounded-2xl border border-borderGray glow-green max-w-md w-full relative z-10 text-center space-y-6">
          <div className="flex justify-center">
            {/* Hexagon Logo Icon */}
            <svg className="w-12 h-12" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polygon points="250,50 430,150 430,350 250,450 70,350 70,150" fill="none" stroke="#39FF14" strokeWidth="24" strokeLinejoin="round" />
              <path d="M 150,210 L 250,260 L 350,210" stroke="#FFFFFF" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <path d="M 150,270 L 250,320 L 350,270" stroke="#39FF14" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </div>
          
          <div>
            <h1 className="text-2xl font-extrabold text-white">Área Administrativa</h1>
            <p className="text-xs text-mutedGray mt-1">Digite sua credencial para acessar os leads do site.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1 text-left">
              <label className="text-[10px] text-mutedGray uppercase tracking-wider font-bold flex items-center gap-1.5">
                <Lock size={12} className="text-primaryGreen" /> Senha de Acesso
              </label>
              <input 
                type="password" 
                required
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-background border border-borderGray rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primaryGreen transition-colors"
              />
            </div>

            {authError && (
              <p className="text-xs text-red-400 font-semibold text-left flex items-center gap-1">
                <AlertTriangle size={14} /> {authError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-primaryGreen text-background font-extrabold rounded-xl hover:shadow-[0_0_15px_rgba(57,255,20,0.3)] transition-all text-sm"
            >
              Entrar no Painel
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Tela Administrativa Principal
  return (
    <div className="min-h-screen bg-background relative selection:bg-primaryGreen selection:text-background text-white font-sans">
      <div className="absolute top-0 left-0 right-0 h-[400px] bg-gradient-to-b from-primaryGreen/5 to-transparent pointer-events-none z-0"></div>

      {/* Header Simplificado */}
      <header className="relative border-b border-borderGray bg-cardBg/35 backdrop-blur-md z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primaryGreen/10 flex items-center justify-center border border-primaryGreen/20">
              <span className="text-primaryGreen font-bold text-sm">⚡</span>
            </div>
            <div>
              <h2 className="text-base font-extrabold tracking-wider">PLYNEXA</h2>
              <p className="text-[10px] text-primaryGreen font-bold uppercase tracking-widest">Painel Administrativo</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={fetchLeads}
              className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-mutedGray hover:text-white"
              title="Recarregar"
            >
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            </button>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg border border-red-500/30 hover:bg-red-500/10 text-xs font-bold text-red-400 transition-all"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="relative max-w-7xl mx-auto px-6 py-10 z-10 space-y-8">
        
        {/* Erro de Configuração ou Requisição */}
        {error && (
          <div className="p-4 bg-red-950/40 border border-red-500/30 text-red-200 rounded-xl text-sm flex gap-3 items-center">
            <AlertTriangle size={20} className="shrink-0 text-red-400" />
            <div>
              <p className="font-bold">Atenção!</p>
              <p className="text-xs text-red-300 mt-0.5">{error}</p>
            </div>
          </div>
        )}

        {/* Quadro Geral de Leads */}
        <div className="glass-card rounded-2xl border border-borderGray overflow-hidden">
          <div className="px-6 py-5 border-b border-borderGray bg-cardBg/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold">Leads Recebidos</h3>
              <p className="text-xs text-mutedGray mt-0.5">Gerenciamento simplificado dos contatos recebidos pelo formulário institucional.</p>
            </div>
            <div className="bg-primaryGreen/10 border border-primaryGreen/20 rounded-xl px-4 py-2 text-center sm:text-right">
              <span className="text-[10px] text-primaryGreen font-bold uppercase block tracking-wider">Total de Contatos</span>
              <span className="text-xl font-extrabold">{leads.length}</span>
            </div>
          </div>

          {loading ? (
            <div className="p-20 text-center space-y-3">
              <div className="w-10 h-10 border-4 border-primaryGreen border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-xs text-mutedGray">Carregando contatos do Supabase...</p>
            </div>
          ) : leads.length === 0 ? (
            <div className="p-20 text-center space-y-2">
              <p className="text-base text-mutedGray font-medium">Nenhum lead encontrado.</p>
              <p className="text-xs text-mutedGray/60">Tente preencher o formulário no seu site para simular uma entrada real.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-borderGray/50 text-[10px] text-mutedGray uppercase tracking-wider bg-cardBg/10">
                    <th className="py-4 px-6">Empresa / Contato</th>
                    <th className="py-4 px-6">Canais de Contato</th>
                    <th className="py-4 px-6">Serviço Desejado</th>
                    <th className="py-4 px-6">Mensagem</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-borderGray/40 text-sm">
                  {leads.map((lead) => (
                    <tr key={lead.place_id} className="hover:bg-white/[0.02] transition-colors">
                      {/* Empresa e Contato */}
                      <td className="py-4 px-6">
                        <div className="font-bold text-white flex items-center gap-1.5">
                          <Building size={14} className="text-primaryGreen" />
                          {lead.business_name}
                        </div>
                        <div className="text-xs text-mutedGray mt-1 flex items-center gap-1.5">
                          <User size={12} />
                          {lead.contact_name || 'Não informado'}
                        </div>
                      </td>
                      
                      {/* Canais de Contato */}
                      <td className="py-4 px-6 space-y-1">
                        {lead.phone && (
                          <div className="text-xs text-white flex items-center gap-1.5">
                            <Phone size={12} className="text-primaryGreen shrink-0" />
                            {lead.phone}
                          </div>
                        )}
                        {lead.email && (
                          <div className="text-xs text-mutedGray flex items-center gap-1.5">
                            <Mail size={12} className="shrink-0" />
                            {lead.email}
                          </div>
                        )}
                      </td>

                      {/* Serviço Desejado */}
                      <td className="py-4 px-6">
                        <div className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 text-xs text-white rounded-lg px-2.5 py-1">
                          <Briefcase size={12} className="text-primaryGreen" />
                          {lead.service_interest || 'Geral'}
                        </div>
                        <div className="text-[10px] text-mutedGray mt-1 flex items-center gap-1">
                          <Calendar size={10} />
                          {new Date(lead.created_at).toLocaleDateString('pt-BR')}
                        </div>
                      </td>

                      {/* Mensagem */}
                      <td className="py-4 px-6 max-w-xs">
                        <p className="text-xs text-mutedGray line-clamp-2" title={lead.message || ''}>
                          {lead.message || <span className="italic text-mutedGray/50">Sem mensagem...</span>}
                        </p>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-6">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          lead.status === 'CONTACTED' 
                            ? 'bg-blue-500/10 border border-blue-500/30 text-blue-400'
                            : lead.status === 'ARCHIVED'
                            ? 'bg-white/5 border border-white/10 text-mutedGray'
                            : 'bg-primaryGreen/10 border border-primaryGreen/30 text-primaryGreen'
                        }`}>
                          {lead.status === 'CONTACTED' ? 'Contatado' : lead.status === 'ARCHIVED' ? 'Arquivado' : 'Novo'}
                        </span>
                      </td>

                      {/* Ações */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {lead.phone && (
                            <a
                              href={getWhatsAppLink(lead)}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={async () => {
                                // Auto-marca como contatado ao abrir WhatsApp
                                if (lead.status === 'HUMAN_REVIEW') {
                                  await fetch(`${supabaseUrl}/rest/v1/agency_leads?place_id=eq.${encodeURIComponent(lead.place_id)}`, {
                                    method: 'PATCH',
                                    headers: {
                                      'apikey': supabaseKey,
                                      'Authorization': `Bearer ${supabaseKey}`,
                                      'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({ status: 'CONTACTED' })
                                  });
                                  fetchLeads();
                                }
                              }}
                              className="p-2 rounded-lg bg-primaryGreen/10 border border-primaryGreen/20 hover:bg-primaryGreen hover:text-background transition-all text-primaryGreen text-xs flex items-center gap-1"
                              title="Chamar no WhatsApp"
                            >
                              <Phone size={14} /> WhatsApp
                            </a>
                          )}
                          <button
                            onClick={() => startEdit(lead)}
                            className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all"
                            title="Editar Lead"
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(lead.place_id)}
                            className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 hover:bg-red-500 hover:text-white text-red-400 transition-all"
                            title="Excluir Lead"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Modal / Caixa de Edição de Lead */}
      {editingLead && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-6 z-50">
          <div className="glass-card p-6 md:p-8 rounded-2xl border border-borderGray glow-green max-w-lg w-full space-y-6">
            <div className="flex items-center justify-between border-b border-borderGray/50 pb-4">
              <h4 className="text-lg font-bold text-white flex items-center gap-2">
                <Edit size={18} className="text-primaryGreen" /> Editar Informações
              </h4>
              <button 
                onClick={() => setEditingLead(null)}
                className="text-mutedGray hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-mutedGray uppercase tracking-wider font-bold">Empresa</label>
                  <input 
                    type="text" 
                    required
                    value={editForm.business_name}
                    onChange={e => setEditForm({...editForm, business_name: e.target.value})}
                    className="w-full bg-background border border-borderGray rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primaryGreen"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-mutedGray uppercase tracking-wider font-bold">Nome do Contato</label>
                  <input 
                    type="text" 
                    value={editForm.contact_name}
                    onChange={e => setEditForm({...editForm, contact_name: e.target.value})}
                    className="w-full bg-background border border-borderGray rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primaryGreen"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-mutedGray uppercase tracking-wider font-bold">E-mail</label>
                  <input 
                    type="email" 
                    value={editForm.email}
                    onChange={e => setEditForm({...editForm, email: e.target.value})}
                    className="w-full bg-background border border-borderGray rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primaryGreen"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-mutedGray uppercase tracking-wider font-bold">Telefone / WhatsApp</label>
                  <input 
                    type="text" 
                    value={editForm.phone}
                    onChange={e => setEditForm({...editForm, phone: e.target.value})}
                    className="w-full bg-background border border-borderGray rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primaryGreen"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-mutedGray uppercase tracking-wider font-bold">Solução Desejada</label>
                  <select 
                    value={editForm.service_interest}
                    onChange={e => setEditForm({...editForm, service_interest: e.target.value})}
                    className="w-full bg-background border border-borderGray rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primaryGreen"
                  >
                    <option value="Site Essencial">Site Essencial</option>
                    <option value="Site de Conversão">Site de Conversão</option>
                    <option value="Experiência Inteligente">Experiência Inteligente</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-mutedGray uppercase tracking-wider font-bold">Status do Lead</label>
                  <select 
                    value={editForm.status}
                    onChange={e => setEditForm({...editForm, status: e.target.value})}
                    className="w-full bg-background border border-borderGray rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primaryGreen"
                  >
                    <option value="HUMAN_REVIEW">Novo</option>
                    <option value="CONTACTED">Contatado</option>
                    <option value="ARCHIVED">Arquivado</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-borderGray/50 flex items-center justify-end gap-3">
                <button 
                  type="button"
                  onClick={() => setEditingLead(null)}
                  className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold hover:bg-white/10 transition-all"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-primaryGreen text-background font-extrabold text-xs hover:shadow-[0_0_15px_rgba(57,255,20,0.3)] transition-all"
                >
                  Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
