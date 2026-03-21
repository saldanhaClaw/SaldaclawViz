'use client';

import React, { useState } from 'react';
import { TrendingUp, Users, Rocket, Bug, Trophy, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface MetricCard {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ReactNode;
  color: string;
}

const defaultMetrics: MetricCard[] = [
  { label: 'MRR', value: 'R$ 0', change: '+0%', trend: 'up', icon: <DollarSign className="w-5 h-5" />, color: 'emerald' },
  { label: 'Subscribers', value: '0', change: '+0', trend: 'up', icon: <Users className="w-5 h-5" />, color: 'violet' },
  { label: 'Deploys (Semana)', value: '0', change: '+0', trend: 'up', icon: <Rocket className="w-5 h-5" />, color: 'cyan' },
  { label: 'Bugs Resolvidos', value: '0/0', change: '0%', trend: 'up', icon: <Bug className="w-5 h-5" />, color: 'orange' },
  { label: 'Gamification Score', value: '0 pts', change: '+0', trend: 'up', icon: <Trophy className="w-5 h-5" />, color: 'yellow' },
  { label: 'Revenue Trend', value: 'R$ 0', change: '+0%', trend: 'up', icon: <TrendingUp className="w-5 h-5" />, color: 'emerald' },
];

const colorMap: Record<string, { bg: string; border: string; text: string; iconBg: string }> = {
  emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-400', iconBg: 'bg-emerald-500/20' },
  violet: { bg: 'bg-violet-500/10', border: 'border-violet-500/20', text: 'text-violet-400', iconBg: 'bg-violet-500/20' },
  cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', text: 'text-cyan-400', iconBg: 'bg-cyan-500/20' },
  orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/20', text: 'text-orange-400', iconBg: 'bg-orange-500/20' },
  yellow: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', text: 'text-yellow-400', iconBg: 'bg-yellow-500/20' },
};

const revenueData = [
  { month: 'Jan', value: 0 },
  { month: 'Fev', value: 0 },
  { month: 'Mar', value: 0 },
  { month: 'Abr', value: 0 },
  { month: 'Mai', value: 0 },
  { month: 'Jun', value: 0 },
];

export default function KPIDashboard() {
  const [metrics] = useState<MetricCard[]>(defaultMetrics);

  const maxRevenue = Math.max(...revenueData.map(d => d.value), 1);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">📊 KPI Dashboard</h1>
          <p className="text-sm text-zinc-500 mt-1">Métricas de negócio em tempo real da SaldaCloud</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900/50 border border-zinc-800 rounded-lg">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs text-zinc-400 font-mono">Live</span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric, i) => {
          const colors = colorMap[metric.color] || colorMap.emerald;
          return (
            <div
              key={i}
              className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2.5 rounded-lg ${colors.iconBg} ${colors.text}`}>
                  {metric.icon}
                </div>
                <div className={`flex items-center gap-1 text-xs font-semibold ${metric.trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
                  {metric.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {metric.change}
                </div>
              </div>
              <div className="text-2xl font-bold text-zinc-100 mb-1">{metric.value}</div>
              <div className="text-xs text-zinc-500 uppercase tracking-wider">{metric.label}</div>
            </div>
          );
        })}
      </div>

      {/* Revenue Chart */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-zinc-100">Revenue Trend</h2>
            <p className="text-xs text-zinc-500">Últimos 6 meses</p>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg text-xs font-semibold">Mensal</button>
            <button className="px-3 py-1.5 bg-zinc-800 text-zinc-400 border border-zinc-700 rounded-lg text-xs font-semibold hover:bg-zinc-700 transition-colors">Anual</button>
          </div>
        </div>

        {/* Simple bar chart */}
        <div className="flex items-end gap-3 h-48">
          {revenueData.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-xs text-zinc-500 font-mono">R${d.value}</span>
              <div className="w-full bg-zinc-800 rounded-t-lg relative overflow-hidden" style={{ height: `${Math.max((d.value / maxRevenue) * 100, 4)}%` }}>
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/60 to-emerald-500/20 rounded-t-lg" />
              </div>
              <span className="text-xs text-zinc-500">{d.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">Saúde do Sistema</h3>
          <div className="space-y-3">
            {[
              { label: 'Vercel Uptime', value: '99.9%', bar: 99.9 },
              { label: 'Stripe API', value: 'Operacional', bar: 100 },
              { label: 'Neon DB', value: 'Operacional', bar: 100 },
              { label: 'Twitter API', value: 'Conectado', bar: 100 },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-sm text-zinc-300">{item.label}</span>
                <div className="flex items-center gap-3">
                  <div className="w-24 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${item.bar}%` }} />
                  </div>
                  <span className="text-xs text-emerald-400 font-mono w-20 text-right">{item.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">Atividade Recente</h3>
          <div className="space-y-3">
            {[
              { time: 'Agora', action: 'Sistema de gestão refatorado', agent: 'AntiGravity' },
              { time: '2h', action: 'Pivot Tech/SAAS executado', agent: 'GM' },
              { time: '4h', action: 'Credenciais Live atualizadas', agent: 'AntiGravity' },
              { time: '6h', action: 'SAAS Blueprint criado', agent: 'AntiGravity' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-xs text-zinc-600 font-mono w-10 shrink-0 pt-0.5">{item.time}</span>
                <div className="flex-1">
                  <p className="text-sm text-zinc-300">{item.action}</p>
                  <p className="text-xs text-zinc-500">{item.agent}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
