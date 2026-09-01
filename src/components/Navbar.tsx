'use client';

import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

const links = [
  ['Soluções', '#solucoes'],
  ['Serviços', '#servicos'],
  ['Como funciona', '#processo'],
  ['Portfólio', '#portfolio'],
  ['Modelos', '#modelos'],
  ['Resultados estimados', '#roi'],
  ['FAQ', '#faq'],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-borderGray bg-background/90 backdrop-blur-xl'
          : 'border-b border-transparent bg-background/45 backdrop-blur-md'
      }`}
    >
      <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a href="#topo" aria-label="Plynexa — voltar ao início">
          <Logo />
        </a>

        <ul className="hidden items-center gap-5 xl:flex">
          {links.map(([label, href]) => (
            <li key={label}>
              <a
                href={href}
                className="text-sm text-mutedGray transition-colors hover:text-white"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contato"
          className="hidden rounded-xl bg-primaryGreen px-4 py-2.5 text-sm font-bold text-background transition-opacity hover:opacity-90 lg:inline-flex"
        >
          Agendar diagnóstico
        </a>

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Abrir menu"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-borderGray lg:hidden"
        >
          <Menu size={20} />
        </button>
      </nav>

      {open && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl lg:hidden">
          <div className="flex h-[72px] items-center justify-between px-4">
            <a href="#topo" onClick={() => setOpen(false)} aria-label="Plynexa — voltar ao início">
              <Logo />
            </a>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Fechar menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-borderGray"
            >
              <X size={20} />
            </button>
          </div>
          <ul className="flex flex-col gap-1 px-4 py-4">
            {links.map(([label, href]) => (
              <li key={label}>
                <a
                  href={href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-3 text-base text-white hover:bg-cardBg"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <div className="px-4">
            <a
              href="#contato"
              onClick={() => setOpen(false)}
              className="block w-full rounded-xl bg-primaryGreen py-3 text-center text-sm font-bold text-background"
            >
              Agendar diagnóstico
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
