import React from 'react';

export default function Simulacao2DView() {
  return (
    <div className="animate-in fade-in duration-500 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-3">
          <span className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">🌌</span>
          Simulação 2D (Headless)
        </h2>
        <p className="text-sm text-zinc-400 mt-1">Representação visual do processamento autônomo em background.</p>
      </div>

      <div className="bg-black border border-zinc-800 rounded-2xl h-[500px] relative overflow-hidden flex items-center justify-center">
         <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
         
         {/* Central Processor */}
         <div className="relative">
            <div className="w-32 h-32 rounded-full border-2 border-emerald-500/50 flex items-center justify-center animate-[spin_10s_linear_infinite]">
               <div className="w-2 h-2 bg-emerald-500 rounded-full" style={{ transform: 'translateY(-64px)' }} />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="w-16 h-16 bg-emerald-500/20 rounded-xl border border-emerald-500 flex items-center justify-center text-3xl shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                  🌀
               </div>
            </div>
         </div>

         {/* Peripheral Nodes orbiting */}
         <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 12 }).map((_, i) => (
              <div 
                key={i}
                className="absolute left-1/2 top-1/2 w-1 h-1 bg-emerald-500/40 rounded-full"
                style={{
                  transform: `rotate(${i * 30}deg) translateY(${120 + i * 5}px)`,
                  opacity: 0.3 + (i % 3) * 0.2
                }}
              />
            ))}
         </div>

         <div className="absolute top-6 right-6 flex flex-col items-end gap-1">
            <span className="text-[10px] text-zinc-600 font-mono">CORE_LATENCY: 42ms</span>
            <span className="text-[10px] text-zinc-600 font-mono">SWARM_SYNC: 100%</span>
         </div>

         <div className="absolute bottom-12 text-center w-full">
            <p className="text-xs text-zinc-500 font-mono uppercase tracking-[0.3em] animate-pulse">
               Processamento Headless Ativo
            </p>
         </div>
      </div>
    </div>
  );
}
