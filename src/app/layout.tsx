import React from 'react';
import './globals.css';

export const metadata = {
  title: 'Plynexa — Agentes de IA e automação para empresas',
  description: 'Sites profissionais, agentes de IA e automação de processos para escalar atendimento, vendas e operações.',
  icons: {
    icon: '/plynexa-logo.png',
    apple: '/plynexa-logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Inter:wght@400;500;600&display=swap" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
