'use client';

import React, { useState, useEffect } from 'react';
import { Trophy, Plus, Minus, Star, Medal, Award } from 'lucide-react';

interface AgentScore {
  id: string;
  name: string;
  emoji: string;
  sector: string;
  points: number;
  history: { action: string; points: number; date: number }[];
}

const STORAGE_KEY = 'saldacloud_gamification';

const defaultAgents: AgentScore[] = [
  { id: 'frontend-ux', name: 'Frontend UI/UX', emoji: '✨', sector: 'Engenharia', points: 0, history: [] },
  { id: 'backend-dev', name: 'Backend Architect', emoji: '🏗️', sector: 'Engenharia', points: 0, history: [] },
  { id: 'stripe-architect', name: 'Stripe Architect', emoji: '💳', sector: 'Engenharia', points: 0, history: [] },
  { id: 'qa-debugger', name: 'QA Debugger', emoji: '🐞', sector: 'Engenharia', points: 0, history: [] },
  { id: 'growth-hacker', name: 'Growth Hacker', emoji: '🔥', sector: 'Growth', points: 0, history: [] },
  { id: 'community-manager', name: 'Community Manager', emoji: '💬', sector: 'Growth', points: 0, history: [] },
  { id: 'trend-researcher', name: 'Trend Researcher', emoji: '🔍', sector: 'Growth', points: 0, history: [] },
  { id: 'copywriter-pro', name: 'Copywriter Pro', emoji: '✍️', sector: 'Conteúdo', points: 0, history: [] },
  { id: 'premium-designer', name: 'Premium Designer', emoji: '🎨', sector: 'Conteúdo', points: 0, history: [] },
];

const actionPresets = [
  { label: 'Deploy sem bugs', points: 3 },
  { label: 'Código aprovado no QA', points: 2 },
  { label: 'Insight de estudo salvo', points: 1 },
  { label: 'Componente 21st.dev', points: 1 },
  { label: 'Mastermind útil', points: 2 },
  { label: 'Bug em produção', points: -3 },
  { label: 'Dados inventados', points: -2 },
  { label: 'Ocioso sem estudar', points: -2 },
  { label: 'Código clonado', points: -3 },
  { label: 'Tentou reiniciar GW', points: -5 },
];

function getBadge(points: number) {
  if (points >= 20) return { icon: <Trophy className="w-4 h-4 text-yellow-400" />, label: '🥇 Elite' };
  if (points >= 10) return { icon: <Medal className="w-4 h-4 text-zinc-300" />, label: '🥈 Veterano' };
  if (points >= 5) return { icon: <Award className="w-4 h-4 text-amber-600" />, label: '🥉 Ativo' };
  return { icon: <Star className="w-4 h-4 text-zinc-600" />, label: '⚪ Novato' };
}

export default function GamificationBoard() {
  const [agents, setAgents] = useState<AgentScore[]>(defaultAgents);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [customAction, setCustomAction] = useState('');
  const [customPoints, setCustomPoints] = useState(1);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) { try { setAgents(JSON.parse(saved)); } catch { /* */ } }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(agents));
  }, [agents]);

  const addPoints = (agentId: string, action: string, points: number) => {
    setAgents(prev => prev.map(a => {
      if (a.id !== agentId) return a;
      return { ...a, points: a.points + points, history: [{ action, points, date: Date.now() }, ...a.history.slice(0, 19)] };
    }));
  };

  const sorted = [...agents].sort((a, b) => b.points - a.points);
  const maxPoints = Math.max(...agents.map(a => Math.abs(a.points)), 1);
  const totalPoints = agents.reduce((sum, a) => sum + a.points, 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">🎖️ Gamificação</h1>
          <p className="text-sm text-zinc-500 mt-1">Scoreboard de performance do time</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-zinc-900/50 border border-zinc-800 rounded-lg">
            <span className="text-xs text-zinc-500">Total: </span>
            <span className={`text-lg font-bold ${totalPoints >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>{totalPoints > 0 ? '+' : ''}{totalPoints} pts</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leaderboard */}
        <div className="lg:col-span-2 bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-zinc-800 bg-zinc-900/80">
            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Ranking</h3>
          </div>
          <div className="divide-y divide-zinc-800/50">
            {sorted.map((agent, i) => {
              const badge = getBadge(agent.points);
              const barWidth = agent.points > 0 ? (agent.points / maxPoints) * 100 : 0;
              return (
                <div
                  key={agent.id}
                  onClick={() => setSelectedAgent(selectedAgent === agent.id ? null : agent.id)}
                  className={`flex items-center gap-4 px-5 py-3.5 hover:bg-zinc-800/30 transition-colors cursor-pointer ${selectedAgent === agent.id ? 'bg-zinc-800/20' : ''}`}
                >
                  <span className="text-lg font-bold text-zinc-600 w-8 text-center font-mono">{i + 1}</span>
                  <span className="text-xl">{agent.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-zinc-200">{agent.name}</span>
                      <span className="text-[10px] text-zinc-600 uppercase">{agent.sector}</span>
                    </div>
                    <div className="mt-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden w-full max-w-[200px]">
                      <div className={`h-full rounded-full transition-all duration-500 ${agent.points >= 0 ? 'bg-emerald-500' : 'bg-red-500'}`} style={{ width: `${Math.max(barWidth, 2)}%` }} />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {badge.icon}
                    <span className={`text-lg font-bold font-mono ${agent.points >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {agent.points > 0 ? '+' : ''}{agent.points}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Panel */}
        <div className="space-y-4">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5">
            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4">Registrar Ação</h3>

            <select
              value={selectedAgent || ''}
              onChange={e => setSelectedAgent(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-200 outline-none mb-3"
            >
              <option value="">Selecione um agente...</option>
              {agents.map(a => <option key={a.id} value={a.id}>{a.emoji} {a.name}</option>)}
            </select>

            <div className="space-y-1.5 mb-4">
              {actionPresets.map((preset, i) => (
                <button
                  key={i}
                  onClick={() => selectedAgent && addPoints(selectedAgent, preset.label, preset.points)}
                  disabled={!selectedAgent}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors border ${
                    preset.points > 0
                      ? 'border-emerald-500/10 hover:bg-emerald-500/10 text-zinc-300 hover:text-emerald-400'
                      : 'border-red-500/10 hover:bg-red-500/10 text-zinc-300 hover:text-red-400'
                  } disabled:opacity-30 disabled:cursor-not-allowed`}
                >
                  <span className="flex items-center gap-2">
                    {preset.points > 0 ? <Plus className="w-3 h-3 text-emerald-500" /> : <Minus className="w-3 h-3 text-red-500" />}
                    {preset.label}
                  </span>
                  <span className={preset.points > 0 ? 'text-emerald-400' : 'text-red-400'}>
                    {preset.points > 0 ? '+' : ''}{preset.points}
                  </span>
                </button>
              ))}
            </div>

            <div className="border-t border-zinc-800 pt-3">
              <p className="text-[10px] text-zinc-600 uppercase tracking-wider mb-2">Ação Personalizada</p>
              <div className="flex gap-2">
                <input value={customAction} onChange={e => setCustomAction(e.target.value)} placeholder="Descrição..." className="flex-1 bg-zinc-950 border border-zinc-700 rounded px-2 py-1.5 text-xs text-zinc-200 placeholder:text-zinc-600 outline-none" />
                <input type="number" value={customPoints} onChange={e => setCustomPoints(Number(e.target.value))} className="w-14 bg-zinc-950 border border-zinc-700 rounded px-2 py-1.5 text-xs text-zinc-200 text-center outline-none" />
                <button
                  onClick={() => { if (selectedAgent && customAction.trim()) { addPoints(selectedAgent, customAction, customPoints); setCustomAction(''); } }}
                  disabled={!selectedAgent || !customAction.trim()}
                  className="px-3 py-1.5 bg-violet-500/20 text-violet-400 border border-violet-500/30 rounded text-xs font-bold hover:bg-violet-500/30 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Log
                </button>
              </div>
            </div>
          </div>

          {/* History for selected agent */}
          {selectedAgent && (() => {
            const agent = agents.find(a => a.id === selectedAgent);
            if (!agent || agent.history.length === 0) return null;
            return (
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
                <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">{agent.emoji} Histórico</h4>
                <div className="space-y-1.5 max-h-[200px] overflow-y-auto">
                  {agent.history.map((h, i) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                      <span className="text-zinc-400">{h.action}</span>
                      <span className={`font-mono font-bold ${h.points >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {h.points > 0 ? '+' : ''}{h.points}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
