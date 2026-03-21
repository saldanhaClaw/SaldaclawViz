import React from 'react';

export default function MemoriesView() {
  const memories = [
    { title: 'Identidade do Líder', content: 'Saldanha é o Arquiteto e Proprietário do Swarm SaldaCloud.', date: '2026-03-17' },
    { title: 'Modelo Preferencial', content: 'Uso obrigatório de hunter-alpha para economia de custos.', date: '2026-03-18' },
    { title: 'Stack AdCopy Optimizer', content: 'Next.js + Vercel + NeonDB.', date: '2026-03-18' }
  ];

  return (
    <div className="animate-in fade-in duration-500 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-3">
          <span className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">🧠</span>
          Memória de Longo Prazo
        </h2>
        <p className="text-sm text-zinc-400 mt-1">Conhecimento persistente e aprendizados do Swarm.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {memories.map((m, i) => (
          <div key={i} className="bg-zinc-900/50 border border-zinc-800 p-5 rounded-2xl hover:border-emerald-500/30 transition-all">
             <div className="flex justify-between items-center mb-2">
               <h3 className="font-bold text-emerald-400 text-sm">{m.title}</h3>
               <span className="text-[10px] text-zinc-600 font-mono">{m.date}</span>
             </div>
             <p className="text-sm text-zinc-400 leading-relaxed">{m.content}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-zinc-950 border border-dashed border-zinc-800 rounded-2xl text-center">
         <p className="text-xs text-zinc-600 italic">Sincronizado com MEMORY.md e dossier_antigravity.json</p>
      </div>
    </div>
  );
}
