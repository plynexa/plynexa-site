import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Soluções', href: '#solucoes' },
    { name: 'Serviços', href: '#servicos' },
    { name: 'Como Funciona', href: '#processo' },
    { name: 'Portfólio', href: '#portfolio' },
    { name: 'Calculadora ROI', href: '#roi' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-background/90 border-b border-borderGray backdrop-blur-md py-4' 
        : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Logo />

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm text-mutedGray hover:text-primaryGreen transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <a 
            href="#contato" 
            className="px-5 py-2.5 rounded-xl border border-primaryGreen/30 text-sm text-primaryGreen hover:bg-primaryGreen/10 transition-all"
          >
            Falar com Especialista
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden text-white hover:text-primaryGreen transition-colors"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-cardBg border-b border-borderGray p-6 flex flex-col gap-4 animate-fade-in">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsOpen(false)}
              className="text-base text-mutedGray hover:text-primaryGreen py-2"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contato" 
            onClick={() => setIsOpen(false)}
            className="w-full text-center py-3 rounded-xl bg-primaryGreen text-background font-bold text-sm hover:opacity-90 transition-opacity"
          >
            Falar com Especialista
          </a>
        </div>
      )}
    </nav>
  );
}