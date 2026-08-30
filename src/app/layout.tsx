import React from 'react';
import './globals.css';

export const metadata = {
  title: 'Plynexa - Inteligência Artificial, Sites Profissionais e Automação',
  description: 'Tecnologia conectada para negócios. Escale suas vendas e atendimento com agentes de IA 24/7 de alta conversão.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>⚡</text></svg>" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}