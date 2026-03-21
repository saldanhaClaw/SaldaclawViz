'use client';

import React, { useState, useEffect } from 'react';
import { AlertTriangle, Clock, CheckCircle, Plus, X } from 'lucide-react';

interface Incident {
  id: string;
  title: string;
  service: string;
  agent: string;
  priority: 'P0' | 'P1' | 'P2';
  status: 'open' | 'investigating' | 'resolved';
  createdAt: number;
}

const STORAGE_KEY = 'saldacloud_incidents';

const priorityConfig = {
  P0: { label: 'Crítico', color: 'border-red-500/30 bg-red-500/5', badge: 'bg-red-500/20 text-red-400 border-red-500/30', headerBg: 'bg-red-500/10', headerText: 'text-red-400' },
  P1: { label: 'Alto', color: 'border-orange-500/30 bg-orange-500/5', badge: 'bg-orange-500/20 text-orange-400 border-orange-500/30', headerBg: 'bg-orange-500/10', headerText: 'text-orange-400' },
  P2: { label: 'Médio', color: 'border-yellow-500/30 bg-yellow-500/5', badge: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', headerBg: 'bg-yellow-500/10', headerText: 'text-yellow-400' },
};

const statusConfig = {
  open: { icon: <AlertTriangle className="w-3 h-3" />, label: 'Aberto', color: 'text-red-400' },
  investigating: { icon: <Clock className="w-3 h-3" />, label: 'Investigando', color: 'text-orange-400' },
  resolved: { icon: <CheckCircle className="w-3 h-3" />, label: 'Resolvido', color: 'text-emerald-400' },
};

function timeAgo(ts: number): string {
  const diff = Math.floor((Date.now() - ts) / 1000);
  if (diff < 60) return `${diff}s`;
  if (diff < 3600) return `${Math.floor(diff / 60)}min`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  return `${Math.floor(diff / 86400)}d`;
}

export default function IncidentBoard() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', service: '', agent: '', priority: 'P1' as Incident['priority'] });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) { try { setIncidents(JSON.parse(saved)); } catch { /* */ } }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(incidents));
  }, [incidents]);

  const addIncident = () => {
    if (!form.title.trim()) return;
    setIncidents([...incidents, { ...form, id: Date.now().toString(), status: 'open', createdAt: Date.now() }]);
    setForm({ title: '', service: '', agent: '', priority: 'P1' });
    setShowForm(false);
  };

  const cycleStatus = (id: string) => {
    setIncidents(prev => prev.map(inc => {
      if (inc.id !== id) return inc;
      const cycle: Incident['status'][] = ['open', 'investigating', 'resolved'];
      return { ...inc, status: cycle[(cycle.indexOf(inc.status) + 1) % cycle.length] };
    }));
  };

  const removeIncident = (id: string) => setIncidents(prev => prev.filter(i => i.id !== id));

  const columns: Incident['priority'][] = ['P0', 'P1', 'P2'];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">🚨 Painel de Incidentes</h1>
          <p className="text-sm text-zinc-500 mt-1">Rastreio de problemas por prioridade (P0 / P1 / P2)</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg text-sm font-semibold hover:bg-red-500/20 transition-colors">
          <Plus className="w-4 h-4" /> Reportar Incidente
        </button>
      </div>

      {showForm && (
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Título do incidente..." className="bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-600 outline-none focus:border-red-500/50" />
            <input value={form.service} onChange={e => setForm({ ...form, service: e.target.value })} placeholder="Serviço afetado (Stripe, Vercel...)" className="bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-600 outline-none focus:border-red-500/50" />
            <input value={form.agent} onChange={e => setForm({ ...form, agent: e.target.value })} placeholder="Agente responsável..." className="bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-600 outline-none focus:border-red-500/50" />
            <select value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value as Incident['priority'] })} className="bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-200 outline-none">
              <option value="P0">P0 — Crítico</option>
              <option value="P1">P1 — Alto</option>
              <option value="P2">P2 — Médio</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button onClick={addIncident} className="px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg text-sm font-semibold hover:bg-red-500/30 transition-colors">Criar Incidente</button>
            <button onClick={() => setShowForm(false)} className="px-4 py-2 text-zinc-500 hover:text-zinc-300 text-sm">Cancelar</button>
          </div>
        </div>
      )}

      {/* Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columns.map(prio => {
          const config = priorityConfig[prio];
          const items = incidents.filter(i => i.priority === prio && i.status !== 'resolved');
          const resolved = incidents.filter(i => i.priority === prio && i.status === 'resolved');

          return (
            <div key={prio} className={`border rounded-xl overflow-hidden ${config.color}`}>
              <div className={`px-4 py-3 ${config.headerBg} border-b ${config.color.split(' ')[0]}`}>
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-bold uppercase tracking-wider ${config.headerText}`}>{prio} — {config.label}</span>
                  <span className={`text-xs font-mono ${config.headerText}`}>{items.length}</span>
                </div>
              </div>

              <div className="p-3 space-y-2 min-h-[200px]">
                {items.map(inc => {
                  const stat = statusConfig[inc.status];
                  return (
                    <div key={inc.id} className="bg-zinc-950/50 border border-zinc-800/50 rounded-lg p-3 group relative">
                      <h4 className="text-sm font-medium text-zinc-200 mb-1">{inc.title}</h4>
                      <div className="flex items-center gap-2 text-xs text-zinc-500 mb-2">
                        <span>🔧 {inc.service || 'N/A'}</span>
                        <span>•</span>
                        <span>👤 {inc.agent || 'N/A'}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <button onClick={() => cycleStatus(inc.id)} className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${stat.color} hover:opacity-80`}>
                          {stat.icon} {stat.label}
                        </button>
                        <span className="text-[10px] text-zinc-600 font-mono">⏱ {timeAgo(inc.createdAt)}</span>
                      </div>
                      <button onClick={() => removeIncident(inc.id)} className="absolute top-1 right-1 text-zinc-700 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  );
                })}

                {items.length === 0 && (
                  <div className="text-center text-zinc-700 text-xs py-8">Nenhum incidente ativo</div>
                )}

                {resolved.length > 0 && (
                  <details className="mt-2">
                    <summary className="text-[10px] text-zinc-600 cursor-pointer hover:text-zinc-400">
                      {resolved.length} resolvido(s)
                    </summary>
                    <div className="mt-2 space-y-1">
                      {resolved.map(inc => (
                        <div key={inc.id} className="flex items-center gap-2 px-2 py-1 text-xs text-zinc-600 line-through">
                          <CheckCircle className="w-3 h-3 text-emerald-600" />
                          {inc.title}
                          <button onClick={() => removeIncident(inc.id)} className="ml-auto text-zinc-700 hover:text-red-400"><X className="w-3 h-3" /></button>
                        </div>
                      ))}
                    </div>
                  </details>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
