'use client';

import React from 'react';

import { cn } from '@/lib/utils';

const menuItems = [
  { id: 'overview', label: 'Visão Geral', icon: '📊' },
  { id: 'network', label: 'Mapa de Fluxo', icon: '🕸️' },
  { id: 'missions', label: 'Missões', icon: '🎯' },
  { id: 'logs', label: 'Logs de Chat', icon: '📝' },
  { id: 'tokens', label: 'Token Hub', icon: '🪙' },
  { id: 'errors', label: 'Debug & Erros', icon: '⚠️' },
  { id: 'memory', label: 'Memórias', icon: '💾' },
  { id: 'rules', label: 'Políticas', icon: '🛡️' },
  { id: 'agents', label: 'Agentes', icon: '🤖' },
  { id: 'openclaw', label: 'Simulação 2D', icon: '🕹️' },
  { id: 'projetos', label: 'Projetos', icon: '📁' },
  { id: '_separator', label: 'GESTÃO', icon: '' },
  { id: 'kpi', label: 'KPI Dashboard', icon: '📈' },
  { id: 'calendar', label: 'Calendário', icon: '📅' },
  { id: 'incidents', label: 'Incidentes', icon: '🚨' },
  { id: 'gamification', label: 'Gamificação', icon: '🎖️' },
  { id: 'templates', label: 'Templates SAAS', icon: '📦' },
  { id: 'sprint', label: 'Sprint Board', icon: '🏃' },
  { id: 'pnl', label: 'P&L Tracker', icon: '💰' },
];

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <aside className="w-64 shrink-0 border-r border-zinc-800 bg-zinc-950 h-[calc(100vh-64px)] flex flex-col sticky top-16">
      <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          if (item.id === '_separator') {
            return (
              <div key={item.id} className="pt-4 pb-2 px-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">{item.label}</p>
              </div>
            );
          }
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                activeTab === item.id 
                  ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" 
                  : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900"
              )}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </button>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-zinc-800">
        <div className="bg-zinc-900/50 rounded-xl p-4 border border-zinc-800/50">
          <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold mb-2">Status do Sistema</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-xs text-zinc-300 font-medium">SaldaCloud Gestão Online</span>
          </div>
          <div className="mt-3 h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full w-[85%] bg-emerald-500 rounded-full"></div>
          </div>
          <p className="text-[10px] text-zinc-500 mt-2">Uso de Tokens: 85% do limite</p>
        </div>
      </div>
    </aside>
  );
}
