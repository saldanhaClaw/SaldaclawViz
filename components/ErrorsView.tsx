import React from 'react';

export default function ErrorsView() {
  return (
    <div className="animate-in fade-in duration-500 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-3">
            <span className="p-2 bg-red-500/10 rounded-lg text-red-500">⚠️</span>
            Debug & Erros
          </h2>
          <p className="text-sm text-zinc-400 mt-1">Rastreamento de exceções e integridade do Swarm.</p>
        </div>
        <button className="px-3 py-1 bg-zinc-800 text-zinc-100 text-xs rounded border border-zinc-700 hover:bg-zinc-700 transition-colors">
          Limpar Logs
        </button>
      </div>

      <div className="space-y-4">
        <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4 flex items-center gap-4">
           <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center text-red-400">🚨</div>
           <div className="flex-1">
             <div className="text-sm font-bold text-red-300">Port 3001 Conflict (Resolved)</div>
             <div className="text-xs text-zinc-500 font-mono">EADDRINUSE: target port already taken by PID 6820.</div>
           </div>
           <div className="text-xs text-zinc-600">10m atrás</div>
        </div>

        <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-4 flex items-center gap-4 opacity-50">
           <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center text-zinc-500">✓</div>
           <div className="flex-1">
             <div className="text-sm font-bold text-zinc-400">Handshake Gateway Antigravity</div>
             <div className="text-xs text-zinc-600 font-mono">200 OK - integration successful.</div>
           </div>
           <div className="text-xs text-zinc-600">1h atrás</div>
        </div>
      </div>

      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 min-h-[300px] font-mono text-xs text-zinc-500">
         <div className="mb-2 text-zinc-700">// Final system health check @ 2026-03-18T13:10:00Z</div>
         <div>[SYSTEM] Initializing kernel... OK</div>
         <div>[NETWORK] bridge.js active on port 3000... OK</div>
         <div>[MODEL] hunter-alpha enforcement... OK</div>
         <div>[DB] Neon Postgres connected... OK</div>
         <div className="mt-4 animate-pulse">_ Waiting for next event...</div>
      </div>
    </div>
  );
}
