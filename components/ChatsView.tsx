import React, { useState, useEffect } from 'react';

interface LogEntry {
  timestamp: string;
  agent: string;
  message: string;
}

export default function ChatsView() {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await fetch(`/_ag_viz.json?t=${Date.now()}`);
        const data = await res.json();
        if (data.logs) setLogs(data.logs);
      } catch (e) {
        console.error("Erro ao carregar logs:", e);
      }
    };
    fetchLogs();
    const interval = setInterval(fetchLogs, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="animate-in fade-in duration-500 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-3">
          <span className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">📝</span>
          Logs de Chat do Swarm
        </h2>
        <p className="text-sm text-zinc-400 mt-1">Histórico em tempo real das interações entre os agentes.</p>
      </div>

      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden flex flex-col h-[calc(100vh-250px)]">
        <div className="p-4 border-b border-zinc-800 bg-zinc-900/50 flex justify-between items-center">
          <span className="text-xs font-mono text-zinc-500">streaming assistant_messages.jsonl...</span>
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <div className="w-2 h-2 rounded-full bg-emerald-500/50" />
            <div className="w-2 h-2 rounded-full bg-emerald-500/20" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4 font-mono text-sm">
          {logs.map((log, i) => (
            <div key={i} className="flex gap-4 group">
              <span className="text-zinc-600 shrink-0">[{new Date(log.timestamp).toLocaleTimeString([], { hour12: false })}]</span>
              <span className="text-emerald-500 font-bold shrink-0">&lt;{log.agent}&gt;</span>
              <span className="text-zinc-300 group-hover:text-zinc-100 transition-colors">{log.message}</span>
            </div>
          ))}
          {logs.length === 0 && (
            <div className="text-center py-20 text-zinc-600">Nenhum log capturado ainda. O Swarm está em standby.</div>
          )}
        </div>
      </div>
    </div>
  );
}
