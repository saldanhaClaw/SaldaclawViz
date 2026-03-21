import React from 'react';

export default function MappingView() {
  return (
    <div className="animate-in fade-in duration-500 space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-3">
            <span className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">🕸️</span>
            Mapa de Fluxo Tático
          </h2>
          <p className="text-sm text-zinc-400 mt-1">Conexões neurais e dependências entre os agentes do Swarm.</p>
        </div>
      </div>

      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-8 min-h-[500px] flex items-center justify-center relative overflow-hidden group">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/5 via-transparent to-transparent" />
        
        {/* Visualização de Fluxo (Simplificada como um Grafo CSS para agora) */}
        <div className="relative z-10 flex flex-col items-center gap-12 w-full max-w-2xl">
          
          {/* Central: SaldaClawd */}
          <div className="group/node bg-emerald-500/10 border-2 border-emerald-500/50 p-6 rounded-2xl shadow-[0_0_20px_rgba(16,185,129,0.2)] text-center w-48 relative">
            <div className="text-3xl mb-2">🤖</div>
            <div className="font-bold text-emerald-100 text-lg">SaldaClawd</div>
            <div className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider">Líder do Swarm</div>
            <div className="absolute -inset-1 bg-emerald-500/20 rounded-2xl animate-pulse -z-10 group-hover/node:bg-emerald-500/40 transition-all" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 w-full">
            {['Backend API', 'Frontend UX', 'QA Debugger', 'Copywriter', 'Growth Marketing'].map((agent, i) => (
              <div key={agent} className="flex flex-col items-center gap-4 relative">
                {/* Linha conectora simples (SVG placeholder) */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-0.5 h-12 bg-gradient-to-t from-emerald-500/20 to-transparent" />
                
                <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl text-center w-full group/sub transition-all hover:border-emerald-500/30">
                  <div className="text-xl mb-1">{['⚙️', '✨', '🐛', '✍️', '🚀'][i]}</div>
                  <div className="text-xs font-bold text-zinc-200">{agent}</div>
                  <div className="text-[8px] text-zinc-500 font-mono mt-1 uppercase tracking-widest">Ativo • Local</div>
                </div>
              </div>
            ))}
          </div>

        </div>

        <div className="absolute bottom-4 right-6 text-xs text-zinc-600 font-mono italic">
          v1.2 // Arquitetura Headless Ativa
        </div>
      </div>
    </div>
  );
}
