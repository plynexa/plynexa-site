import Image from 'next/image';
import React from 'react';

export default function Logo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-primaryGreen/20 bg-[#02091b] shadow-[0_0_20px_rgba(57,255,20,0.12)]">
        <Image
          src="/plynexa-logo.png"
          alt="Símbolo oficial da Plynexa"
          width={64}
          height={64}
          priority
          className="absolute -left-[7px] -top-[5px] h-16 w-16 max-w-none"
        />
      </span>
      <span className="font-display text-xl font-extrabold tracking-[0.16em] text-white">
        PLYNEXA
      </span>
    </div>
  );
}
