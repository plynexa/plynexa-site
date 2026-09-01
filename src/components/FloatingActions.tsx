'use client';

import React, { useEffect, useState } from 'react';
import { ArrowUp, MessageCircle } from 'lucide-react';

const whatsappMessage =
  'Olá! Gostaria de saber mais sobre criação de sites, automações e os serviços da Plynexa.';
const whatsappUrl = `https://wa.me/5522998741943?text=${encodeURIComponent(whatsappMessage)}`;

export default function FloatingActions() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 600);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar com a Plynexa pelo WhatsApp"
        className="fixed right-4 top-20 z-40 inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#25D366] px-3.5 py-3 text-sm font-bold text-[#04130a] shadow-[0_12px_36px_rgba(37,211,102,0.28)] transition-transform hover:-translate-y-0.5 sm:right-6 sm:top-24"
      >
        <MessageCircle size={20} aria-hidden="true" />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>

      {showBackToTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Voltar ao topo"
          title="Voltar ao topo"
          className="fixed bottom-5 right-4 z-40 inline-flex h-10 w-10 items-center justify-center rounded-full border border-borderGray bg-cardBg/90 text-mutedGray shadow-lg backdrop-blur-xl transition-colors hover:border-primaryGreen/40 hover:text-primaryGreen sm:right-6"
        >
          <ArrowUp size={18} aria-hidden="true" />
        </button>
      )}
    </>
  );
}
