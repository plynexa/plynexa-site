import React from 'react';

export default function Logo({ className = "h-8" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      {/* Hexagon icon resembling the Plynexa Logo */}
      <svg className="w-8 h-8" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Main hexagon shape */}
        <polygon points="250,50 430,150 430,350 250,450 70,350 70,150" fill="none" stroke="#39FF14" strokeWidth="24" strokeLinejoin="round" />
        
        {/* Layer steps */}
        <path d="M 150,210 L 250,260 L 350,210" stroke="#FFFFFF" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M 150,270 L 250,320 L 350,270" stroke="#39FF14" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M 150,330 L 250,380 L 350,330" stroke="#10B981" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        
        {/* Digital circuits/pins at the sides */}
        <circle cx="250" cy="130" r="16" fill="#39FF14" />
        <line x1="250" y1="130" x2="250" y2="190" stroke="#39FF14" strokeWidth="12" />
        
        {/* Left circuit branches */}
        <line x1="70" y1="200" x2="20" y2="200" stroke="#39FF14" strokeWidth="12" />
        <circle cx="20" cy="200" r="16" fill="#39FF14" />
        
        <line x1="70" y1="300" x2="0" y2="300" stroke="#39FF14" strokeWidth="12" />
        <circle cx="0" cy="300" r="16" fill="#39FF14" />

        {/* Right circuit branches */}
        <line x1="430" y1="200" x2="480" y2="200" stroke="#39FF14" strokeWidth="12" />
        <circle cx="480" cy="200" r="16" fill="#39FF14" />
        
        <line x1="430" y1="300" x2="500" y2="300" stroke="#39FF14" strokeWidth="12" />
        <circle cx="500" cy="300" r="16" fill="#39FF14" />
      </svg>
      <span className="font-extrabold text-xl tracking-wider text-white">
        PLYNEXA
      </span>
    </div>
  );
}