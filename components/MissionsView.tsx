import React from 'react';

export default function MissionsView() {
  return (
    <div className="animate-in fade-in duration-500 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-3">
          <span className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">🎯</span>
          Mural de Missões
        </h2>
        <p className="text-sm text-zinc-400 mt-1">Objetivos de alto nível delegados ao Swarm.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="bg-zinc-900/50 border-l-4 border-l-emerald-500 border border-zinc-800 p-6 rounded-r-2xl">
           <div className="flex justify-between items-start">
             <div>
               <h3 className="font-bold text-zinc-100 italic">"Conquistar o mercado de Micro-SaaS para Agências"</h3>
               <p className="text-xs text-zinc-500 mt-1 mb-4">Meta: Faturamento recorrente de R$ 5k até o fim do semestre.</p>
             </div>
             <span className="px-2 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-bold rounded">EM ANDAMENTO</span>
           </div>
           <div className="space-y-3">
             <div className="flex items-center gap-3">
               <div className="w-4 h-4 rounded bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-[10px]">✓</div>
               <span className="text-xs text-zinc-400 line-through">Lançar AdCopy Optimizer Alpha</span>
             </div>
             <div className="flex items-center gap-3">
               <div className="w-4 h-4 rounded bg-zinc-800 border border-zinc-700" />
               <span className="text-xs text-zinc-400 font-medium">Auto-venda via Landing Page Premium</span>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
