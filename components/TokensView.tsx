import React from 'react';

export default function TokensView() {
  return (
    <div className="animate-in fade-in duration-500 space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-3">
          <span className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">🪙</span>
          Token Hub
        </h2>
        <p className="text-sm text-zinc-400 mt-1">Monitoramento de consumo e custos de API (Hunter-Alpha Enforcement).</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
          <div className="text-xs text-zinc-500 uppercase font-bold tracking-widest mb-1">Custo Acumulado (Hoje)</div>
          <div className="text-3xl font-bold text-emerald-400">$0.00</div>
          <div className="text-[10px] text-zinc-600 mt-2">Graças ao uso do hunter-alpha gratuito.</div>
        </div>
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
          <div className="text-xs text-zinc-500 uppercase font-bold tracking-widest mb-1">Tokens Processados</div>
          <div className="text-3xl font-bold text-zinc-100">842.1k</div>
          <div className="text-[10px] text-emerald-500 font-bold mt-2">↑ 12% vs ontem</div>
        </div>
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
          <div className="text-xs text-zinc-500 uppercase font-bold tracking-widest mb-1">Quota OpenRouter</div>
          <div className="text-3xl font-bold text-zinc-100">ILIMITADO</div>
          <div className="text-[10px] text-zinc-600 mt-2">Tier: Free Hunter</div>
        </div>
      </div>

      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 h-64 flex flex-col items-center justify-center text-zinc-600">
        <div className="w-full h-full bg-[repeating-linear-gradient(90deg,transparent,transparent_40px,rgba(16,185,129,0.05)_40px,rgba(16,185,129,0.05)_41px)] opacity-50 relative">
           <div className="absolute inset-x-8 bottom-12 top-12 border-b border-l border-zinc-800" />
           <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs italic">Gráfico de consumo real-time em processamento...</div>
        </div>
      </div>
    </div>
  );
}
