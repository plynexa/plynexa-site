'use client';
import React,{useState} from 'react';
import {Plus,Minus} from 'lucide-react';
import {faqs} from '../content/plynexa';
export default function FAQ(){
 const [open,setOpen]=useState<number|null>(null);
 return <div className="space-y-3">{faqs.map(([q,a],i)=><div key={q} className="glass-card overflow-hidden rounded-xl"><button onClick={()=>setOpen(open===i?null:i)} className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-semibold text-white hover:text-primaryGreen sm:text-base"><span>{q}</span>{open===i?<Minus className="ml-4 size-4 shrink-0 text-primaryGreen"/>:<Plus className="ml-4 size-4 shrink-0 text-primaryGreen"/>}</button>{open===i&&<div className="border-t border-borderGray px-5 pb-5 pt-4 text-sm leading-relaxed text-mutedGray">{a}</div>}</div>)}</div>
}
