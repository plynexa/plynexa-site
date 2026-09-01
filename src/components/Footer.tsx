import React from 'react';
import {
  Facebook,
  Github,
  Globe2,
  Instagram,
  Mail,
  MessageCircle,
} from 'lucide-react';
import Logo from './Logo';

const whatsappMessage =
  'Olá! Gostaria de saber mais sobre criação de sites, automações e os serviços da Plynexa.';
const whatsappUrl = `https://wa.me/5522998741943?text=${encodeURIComponent(whatsappMessage)}`;

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/plynexa?igsi=MWdqZ204bGw5NzlwMQ%3D%3D&utm_source=qr',
    Icon: Instagram,
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/share/1EX5FFTyJS/?mibextid=wwXIfr',
    Icon: Facebook,
  },
  { label: 'GitHub', href: 'https://github.com/plynexa', Icon: Github },
];

export default function Footer() {
  return (
    <footer className="border-t border-borderGray bg-cardBg/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-md text-sm leading-relaxed text-mutedGray">
            Tecnologia conectada para negócios. Consultoria, automação de processos,
            agentes de IA e experiências digitais para empresas que querem escalar
            atendimento, vendas e operações.
          </p>
          <p className="mt-4 flex items-center gap-2 text-sm text-mutedGray">
            <Globe2 className="h-4 w-4 text-primaryGreen" />
            Atendimento remoto para empresas de todo o Brasil.
          </p>
          <div className="mt-5 flex items-center gap-2">
            {socialLinks.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Acessar ${label} da Plynexa`}
                title={label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-borderGray bg-white/5 text-mutedGray transition-colors hover:border-primaryGreen/35 hover:text-primaryGreen"
              >
                <Icon className="h-[18px] w-[18px]" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-white">Navegação</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-mutedGray">
            <li><a href="#servicos" className="hover:text-primaryGreen">Serviços</a></li>
            <li><a href="#processo" className="hover:text-primaryGreen">Como funciona</a></li>
            <li><a href="#portfolio" className="hover:text-primaryGreen">Portfólio demonstrativo</a></li>
            <li><a href="#modelos" className="hover:text-primaryGreen">Modelos de sites</a></li>
            <li><a href="#roi" className="hover:text-primaryGreen">Resultados estimados</a></li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-white">Contato comercial</h2>
          <ul className="mt-4 space-y-3 text-sm text-mutedGray">
            <li className="flex gap-2">
              <Mail className="h-4 w-4 shrink-0 text-primaryGreen" />
              <a href="mailto:plynexa@gmail.com" className="hover:text-primaryGreen">
                plynexa@gmail.com
              </a>
            </li>
            <li className="flex gap-2">
              <MessageCircle className="h-4 w-4 shrink-0 text-primaryGreen" />
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primaryGreen"
              >
                +55 (22) 99874-1943
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-borderGray">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-center text-xs text-mutedGray sm:flex-row sm:justify-between sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Plynexa. Todos os direitos reservados.</p>
          <p>Desenvolvido com inovação, clareza e precisão.</p>
        </div>
      </div>
    </footer>
  );
}
