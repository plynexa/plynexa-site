import React from 'react';
import Logo from './Logo';
import { Mail, MessageSquare } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-borderGray bg-background/50 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        <div className="space-y-4 md:col-span-2">
          <Logo />
          <p className="text-xs md:text-sm text-mutedGray max-w-sm leading-relaxed">
            Tecnologia conectada para negócios. Agência especializada em automação comercial, desenvolvimento inteligente e implementação estratégica de agentes de Inteligência Artificial B2B.
          </p>
        </div>

        <div>
          <h5 className="text-white font-bold text-xs uppercase tracking-widest mb-4">Soluções</h5>
          <ul className="space-y-2 text-xs md:text-sm text-mutedGray">
            <li><a href="#solucoes" className="hover:text-primaryGreen transition-colors">Atendimento Inteligente</a></li>
            <li><a href="#solucoes" className="hover:text-primaryGreen transition-colors">Vendas e Conversão</a></li>
            <li><a href="#solucoes" className="hover:text-primaryGreen transition-colors">Automação de Processos</a></li>
            <li><a href="#servicos" className="hover:text-primaryGreen transition-colors">Aplicações com IA</a></li>
          </ul>
        </div>

        <div>
          <h5 className="text-white font-bold text-xs uppercase tracking-widest mb-4">Contato Comercial</h5>
          <ul className="space-y-3 text-xs md:text-sm text-mutedGray">
            <li className="flex items-center gap-2 text-white">
              <Mail size={16} className="text-primaryGreen" />
              <a href="mailto:Plynexa@gmail.com" className="hover:text-primaryGreen transition-all">Plynexa@gmail.com</a>
            </li>
            <li className="flex items-center gap-2 text-white">
              <MessageSquare size={16} className="text-primaryGreen" />
              <a href="https://wa.me/5522998741943" target="_blank" rel="noopener noreferrer" className="hover:text-primaryGreen transition-all">+55 (22) 99874-1943</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-6 border-t border-borderGray flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[10px] md:text-xs text-mutedGray text-center">
          &copy; {new Date().getFullYear()} Plynexa. Todos os direitos reservados.
        </p>
        <p className="text-[10px] md:text-xs text-mutedGray text-center">
          CNPJ: 50.123.456/0001-89 | Desenvolvido com inovação e precisão.
        </p>
      </div>
    </footer>
  );
}