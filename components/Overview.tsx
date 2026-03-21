'use client';

import React, { useState, useEffect } from 'react';


interface AgentStatus {
  model: string;
  status: 'Pensando' | 'Idle' | 'Executando';
  lastAction: string;
}

interface Idea {
  id: string;
  name: string;
  problem: string;
  viability: number;
}

interface LogEntry {
  timestamp: string;
  agent: string;
  message: string;
}

interface AntigravityStatus {
  status: 'Online' | 'Offline' | 'Processando';
  current_task: {
    id: string;
    requester: string;
    type: string;
    priority: string;
    project: string;
    description: string;
    received_at: string;
  } | null;
  tasks_completed: number;
  last_heartbeat: string;
}

interface VizData {
  status: 'ONLINE' | 'ERRO';
  totalIdeas: number;
  agents: Record<string, AgentStatus>;
  ideas: Idea[];
  logs: LogEntry[];
  antigravity?: AntigravityStatus;
}

export default function Overview() {
  const [data, setData] = useState<VizData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const fetchData = async () => {
    try {
      // Simulate cache busting to ensure we always get the fresh file
      const res = await fetch(`/_ag_viz.json?t=${Date.now()}`);
      if (!res.ok) {
        throw new Error('Falha ao carregar o arquivo de vizualização');
      }
      const json = await res.json();
      setData(json);
      setError(null);
      setLastUpdated(new Date());
    } catch (err: any) {
      console.error(err);
      setError('Erro ao carregar _ag_viz.json. Verifique se o arquivo existe e é válido.');
      // Optional: Set system status to ERRO while keeping old data if desired
      if (data) {
         setData({ ...data, status: 'ERRO' });
      }
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getAgentIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'saldaclawd': return <span>🤖</span>;
      case 'backend api': return <span>⚙️</span>;
      case 'frontend ui/ux': return <span>✨</span>;
      case 'qa debugger': return <span>🐛</span>;
      case 'copywriter': return <span>✍️</span>;
      case 'growth marketing': return <span>🚀</span>;
      default: return <span>⚡</span>;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pensando': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'executando': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'idle': return 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30';
      default: return 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30';
    }
  };
  
  const getAgentLogColor = (agent: string) => {
     switch (agent.toLowerCase()) {
      case 'saldaclawd': return 'text-purple-400';
      case 'backend api': return 'text-blue-400';
      case 'frontend ui/ux': return 'text-cyan-400';
      case 'qa debugger': return 'text-red-400';
      case 'copywriter': return 'text-pink-400';
      case 'growth marketing': return 'text-orange-400';
      case 'antigravity': return 'text-violet-400';
      default: return 'text-zinc-400';
    }
  }

  /**
   * Returns how long ago the heartbeat was, in a human-readable format.
   */
  const getHeartbeatAge = (isoStr: string) => {
    const diff = Date.now() - new Date(isoStr).getTime();
    const seconds = Math.floor(diff / 1000);
    if (seconds < 60) return `${seconds}s atrás`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}min atrás`;
    return `${Math.floor(minutes / 60)}h atrás`;
  };

  const getAntigravityStatusConfig = (status: string) => {
    switch (status) {
      case 'Online':
        return {
          color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
          dotColor: 'bg-emerald-400',
          glowColor: 'shadow-[0_0_12px_rgba(16,185,129,0.4)]',
          borderColor: 'border-violet-500/30 hover:border-violet-500/50',
        };
      case 'Processando':
        return {
          color: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
          dotColor: 'bg-orange-400',
          glowColor: 'shadow-[0_0_12px_rgba(249,115,22,0.4)]',
          borderColor: 'border-orange-500/30 hover:border-orange-500/50',
        };
      default:
        return {
          color: 'bg-red-500/20 text-red-400 border-red-500/30',
          dotColor: 'bg-red-400',
          glowColor: '',
          borderColor: 'border-red-500/30 hover:border-red-500/50',
        };
    }
  };

  return (
    <div className="font-sans font-mono animate-in fade-in duration-500">
      

      {/* Main Content */}
      <div className="space-y-8">
        
        {/* Error Alert */}
        {error && (
          <div 
            className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-4 text-red-400"
          >
            <span>⚠️</span>
            <div>
              <h3 className="font-medium text-red-300">Falha na Sincronização</h3>
              <p className="text-sm opacity-80">{error}</p>
            </div>
          </div>
        )}

        {/* ── Antigravity Status Card ─────────────── */}
        {data?.antigravity && (() => {
          const ag = data.antigravity;
          const cfg = getAntigravityStatusConfig(ag.status);
          return (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-lg font-semibold text-zinc-100 flex items-center gap-2">
                   🌀 Antigravity Link
                </h2>
                <div className="h-px flex-1 bg-gradient-to-r from-violet-800/50 to-transparent ml-4" />
              </div>

              <div className={`relative bg-zinc-900/60 border ${cfg.borderColor} rounded-xl p-5 transition-colors overflow-hidden`}>
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-indigo-500/5 pointer-events-none" />
                {ag.status === 'Processando' && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/5 to-transparent animate-pulse pointer-events-none" />
                )}

                <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  {/* Left: Identity + Status */}
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="p-3 bg-violet-500/10 border border-violet-500/20 rounded-xl">
                        <span className="text-2xl">🌀</span>
                      </div>
                      {/* Pulsing dot */}
                      <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${cfg.dotColor} ${cfg.glowColor}`}>
                        {ag.status === 'Online' && (
                          <div className={`absolute inset-0 rounded-full ${cfg.dotColor} animate-ping opacity-50`} />
                        )}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-zinc-100 text-lg">Antigravity</h3>
                      <p className="text-xs text-zinc-500 font-mono">Engenheiro Tático • Windows</p>
                    </div>
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider border ${cfg.color}`}>
                      {ag.status === 'Processando' && <span>🔄</span>}
                      {ag.status === 'Online' && <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />}
                      {ag.status}
                    </div>
                  </div>

                  {/* Right: Metrics */}
                  <div className="flex items-center gap-6 text-sm">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-violet-400">{ag.tasks_completed}</div>
                      <div className="text-xs text-zinc-500">Tarefas</div>
                    </div>
                    <div className="w-px h-8 bg-zinc-800" />
                    <div className="text-center">
                      <div className="text-xs text-zinc-400 font-mono">
                        💚 {ag.last_heartbeat ? getHeartbeatAge(ag.last_heartbeat) : 'N/A'}
                      </div>
                      <div className="text-xs text-zinc-500">Último Pulso</div>
                    </div>
                  </div>
                </div>

                {/* Current Task (if any) */}
                {ag.current_task && (
                  <div className="relative z-10 mt-4 p-3 bg-zinc-950/50 rounded-lg border border-zinc-800">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-orange-400 font-semibold uppercase">Tarefa Ativa</span>
                      <span className="text-xs text-zinc-600">•</span>
                      <span className="text-xs text-zinc-500 font-mono">{ag.current_task.id}</span>
                    </div>
                    <p className="text-sm text-zinc-300">{ag.current_task.description}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-zinc-500">
                      <span>📦 {ag.current_task.project}</span>
                      <span>👤 {ag.current_task.requester}</span>
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                        ag.current_task.priority === 'critical' ? 'bg-red-500/20 text-red-400' :
                        ag.current_task.priority === 'high' ? 'bg-orange-500/20 text-orange-400' :
                        'bg-zinc-500/20 text-zinc-400'
                      }`}>{ag.current_task.priority}</span>
                    </div>
                  </div>
                )}
              </div>
            </section>
          );
        })()}

        {/* Section 1: Swarm Status */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-lg font-semibold text-zinc-100 flex items-center gap-2">
               🧠 Swarm Status
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent ml-4" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data?.agents && Object.entries(data.agents).map(([agentName, info]) => (
              <div 
                key={agentName}
                className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition-colors flex flex-col relative overflow-hidden"
              >
                {/* Visual indicator corner */}
                <div className="absolute top-0 right-0 p-4 opacity-10">
                   {getAgentIcon(agentName)}
                </div>

                <div className="flex items-center justify-between mb-4 relative z-10">
                   <div className="flex items-center gap-3">
                     <div className="p-2 bg-zinc-800 rounded-lg">
                       {getAgentIcon(agentName)}
                     </div>
                     <div>
                       <h3 className="font-semibold text-zinc-100">{agentName}</h3>
                       <p className="text-xs text-zinc-500 font-mono">{info.model}</p>
                     </div>
                   </div>
                </div>

                <div className="mt-2 space-y-3 relative z-10">
                  <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wider border ${getStatusColor(info.status)}`}>
                    {info.status === 'Executando' && <span>🔄</span>}
                    {info.status === 'Pensando' && <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />}
                    {info.status === 'Idle' && <div className="w-1.5 h-1.5 rounded-full bg-current opacity-50" />}
                    {info.status}
                  </div>
                  
                  <div className="bg-zinc-950/50 rounded-lg p-3 text-sm text-zinc-300 font-mono line-clamp-2 border border-zinc-900 relative group">
                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                     <span className="text-zinc-600 mr-2">&gt;</span>{info.lastAction}
                  </div>
                </div>
              </div>
            ))}
            
            {!data?.agents && Array.from({ length: 4 }).map((_, i) => (
               <div key={`skeleton-${i}`} className="bg-zinc-900/30 border border-zinc-800/50 rounded-xl p-5 h-[160px] animate-pulse" />
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Section 2: Idea Pipeline */}
          <section className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
               <h2 className="text-lg font-semibold text-zinc-100 flex items-center gap-2">
                  🚀 Pipeline de Ideias
               </h2>
               <div className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent ml-4" />
            </div>
            
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap md:whitespace-normal">
                  <thead className="bg-zinc-900/80 text-zinc-400 font-medium border-b border-zinc-800 text-xs uppercase tracking-wider">
                    <tr>
                      <th className="px-4 py-3 text-center w-16">ID</th>
                      <th className="px-4 py-3">Nome Sugerido</th>
                      <th className="px-4 py-3">Problema Identificado</th>
                      <th className="px-4 py-3 text-center">Viabilidade</th>
                      <th className="px-4 py-3 text-right">Ação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/50">
                    {data?.ideas ? data.ideas.map((idea) => (
                      <tr 
                        key={idea.id}
                        className="hover:bg-zinc-800/30 transition-colors group"
                      >
                        <td className="px-4 py-4 text-center">
                           <span className="font-mono text-zinc-500 text-xs">{idea.id}</span>
                        </td>
                        <td className="px-4 py-4 font-medium text-emerald-100">{idea.name}</td>
                        <td className="px-4 py-4 text-zinc-400 text-xs max-w-[200px] truncate" title={idea.problem}>
                           {idea.problem}
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <div 
                                key={i} 
                                className={`w-2 h-4 rounded-sm ${i < idea.viability ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]' : 'bg-zinc-800'}`}
                              />
                            ))}
                          </div>
                        </td>
                        <td className="px-4 py-4 text-right">
                          <button className="px-3 py-1.5 bg-zinc-800 hover:bg-emerald-500/20 hover:text-emerald-400 hover:border-emerald-500/30 text-zinc-300 border border-zinc-700 rounded-lg text-xs font-semibold transition-all inline-flex items-center gap-2 group-hover:scale-105">
                             Selecionar <span>&rsaquo;</span>
                          </button>
                        </td>
                      </tr>
                    )) : (
                       <tr>
                          <td colSpan={5} className="px-4 py-12 text-center text-zinc-600">Aguardando dados...</td>
                       </tr>
                    )}
                    
                    {data?.ideas && data.ideas.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-4 py-12 text-center text-zinc-600">Nenhuma ideia no pipeline.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Section 3: Live Execution Logs */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
               <h2 className="text-lg font-semibold text-zinc-100 flex items-center gap-2">
                  ⚡ Logs em Tempo Real
               </h2>
               <div className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent ml-4" />
            </div>
            
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden h-[400px] flex flex-col shadow-inner relative">
              <div className="absolute inset-0 pointer-events-none shadow-[inset_0_4px_24px_rgba(0,0,0,0.5)] z-10" />
              <div className="p-3 border-b border-zinc-800/50 bg-zinc-900/50 flex justify-between items-center z-20">
                 <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                    ▶️ _ag_stdout.log
                 </div>
              </div>
              <div className="p-4 flex-1 overflow-y-auto font-mono text-xs space-y-3 relative z-0 scroll-smooth pb-12">
                  {data?.logs?.map((log, index) => (
                    <div 
                      key={`${log.timestamp}-${index}`}
                      className="flex gap-3 items-start border-l-2 border-zinc-800/50 pl-3 py-0.5 hover:border-zinc-700 hover:bg-zinc-900/30 transition-colors"
                    >
                      <div className="text-zinc-600 shrink-0 select-none">
                        [{new Date(log.timestamp).toLocaleTimeString([], { hour12: false })}]
                      </div>
                      <div className={`font-semibold shrink-0 ${getAgentLogColor(log.agent)}`}>
                        &lt;{log.agent}&gt;
                      </div>
                      <div className="text-zinc-300 break-words">
                        {log.message}
                      </div>
                    </div>
                  ))}
                  
                  {!data?.logs && (
                     <div className="text-zinc-600 text-center mt-10">Aguardando log stream...</div>
                  )}
              </div>
              <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none z-10" />
            </div>
          </section>
        </div>

      </div>
    </div>
  );
}
