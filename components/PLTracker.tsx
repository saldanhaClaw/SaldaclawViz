'use client';

import React, { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, TrendingDown, Plus, X, Calculator } from 'lucide-react';

interface CostItem {
  id: string;
  name: string;
  amount: number;
  type: 'fixed' | 'variable';
  category: string;
}

interface RevenueItem {
  id: string;
  name: string;
  mrr: number;
  subscribers: number;
}

interface PLData {
  costs: CostItem[];
  revenues: RevenueItem[];
}

const STORAGE_KEY = 'saldacloud_pl_tracker';

const defaultData: PLData = {
  costs: [
    { id: '1', name: 'Vercel Pro', amount: 20, type: 'fixed', category: 'Hosting' },
    { id: '2', name: 'Neon Database', amount: 0, type: 'fixed', category: 'Database' },
    { id: '3', name: 'Domínio .com', amount: 1, type: 'fixed', category: 'Domain' },
    { id: '4', name: 'Stripe Fees (2.9%)', amount: 0, type: 'variable', category: 'Payment' },
  ],
  revenues: [
    { id: '1', name: 'SAAS #1 (A definir)', mrr: 0, subscribers: 0 },
  ],
};

export default function PLTracker() {
  const [data, setData] = useState<PLData>(defaultData);
  const [showCostForm, setShowCostForm] = useState(false);
  const [showRevForm, setShowRevForm] = useState(false);
  const [costForm, setCostForm] = useState({ name: '', amount: 0, type: 'fixed' as CostItem['type'], category: '' });
  const [revForm, setRevForm] = useState({ name: '', mrr: 0, subscribers: 0 });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) { try { setData(JSON.parse(saved)); } catch { /* */ } }
  }, []);

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }, [data]);

  const addCost = () => {
    if (!costForm.name.trim()) return;
    setData(prev => ({ ...prev, costs: [...prev.costs, { ...costForm, id: Date.now().toString() }] }));
    setCostForm({ name: '', amount: 0, type: 'fixed', category: '' });
    setShowCostForm(false);
  };

  const addRevenue = () => {
    if (!revForm.name.trim()) return;
    setData(prev => ({ ...prev, revenues: [...prev.revenues, { ...revForm, id: Date.now().toString() }] }));
    setRevForm({ name: '', mrr: 0, subscribers: 0 });
    setShowRevForm(false);
  };

  const removeCost = (id: string) => setData(prev => ({ ...prev, costs: prev.costs.filter(c => c.id !== id) }));
  const removeRevenue = (id: string) => setData(prev => ({ ...prev, revenues: prev.revenues.filter(r => r.id !== id) }));

  const updateCost = (id: string, amount: number) => {
    setData(prev => ({ ...prev, costs: prev.costs.map(c => c.id === id ? { ...c, amount } : c) }));
  };
  const updateRevenue = (id: string, mrr: number, subscribers: number) => {
    setData(prev => ({ ...prev, revenues: prev.revenues.map(r => r.id === id ? { ...r, mrr, subscribers } : r) }));
  };

  const totalCosts = data.costs.reduce((sum, c) => sum + c.amount, 0);
  const totalMRR = data.revenues.reduce((sum, r) => sum + r.mrr, 0);
  const totalSubscribers = data.revenues.reduce((sum, r) => sum + r.subscribers, 0);
  const profit = totalMRR - totalCosts;
  const margin = totalMRR > 0 ? ((profit / totalMRR) * 100).toFixed(1) : '0.0';

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">💰 P&L Tracker</h1>
          <p className="text-sm text-zinc-500 mt-1">Lucro e Prejuízo — Visão financeira por projeto</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900/50 border border-zinc-800 rounded-lg">
          <Calculator className="w-4 h-4 text-zinc-500" />
          <span className="text-xs text-zinc-500">Margem: </span>
          <span className={`text-sm font-bold ${Number(margin) >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>{margin}%</span>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-zinc-900/50 border border-emerald-500/20 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-emerald-500/10 rounded-lg"><TrendingUp className="w-5 h-5 text-emerald-400" /></div>
            <span className="text-xs text-zinc-500 uppercase tracking-wider">MRR Total</span>
          </div>
          <div className="text-2xl font-bold text-emerald-400">R$ {totalMRR.toLocaleString()}</div>
        </div>
        <div className="bg-zinc-900/50 border border-red-500/20 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-red-500/10 rounded-lg"><TrendingDown className="w-5 h-5 text-red-400" /></div>
            <span className="text-xs text-zinc-500 uppercase tracking-wider">Custos Mensais</span>
          </div>
          <div className="text-2xl font-bold text-red-400">R$ {totalCosts.toLocaleString()}</div>
        </div>
        <div className={`bg-zinc-900/50 border ${profit >= 0 ? 'border-emerald-500/20' : 'border-red-500/20'} rounded-xl p-5`}>
          <div className="flex items-center gap-3 mb-3">
            <div className={`p-2 rounded-lg ${profit >= 0 ? 'bg-emerald-500/10' : 'bg-red-500/10'}`}>
              <DollarSign className={`w-5 h-5 ${profit >= 0 ? 'text-emerald-400' : 'text-red-400'}`} />
            </div>
            <span className="text-xs text-zinc-500 uppercase tracking-wider">Lucro Líquido</span>
          </div>
          <div className={`text-2xl font-bold ${profit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>R$ {profit.toLocaleString()}</div>
        </div>
        <div className="bg-zinc-900/50 border border-violet-500/20 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-violet-500/10 rounded-lg"><span className="text-violet-400 text-lg">👥</span></div>
            <span className="text-xs text-zinc-500 uppercase tracking-wider">Subscribers</span>
          </div>
          <div className="text-2xl font-bold text-violet-400">{totalSubscribers}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-zinc-800 bg-emerald-500/5 flex items-center justify-between">
            <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">📈 Receita (MRR)</h3>
            <button onClick={() => setShowRevForm(!showRevForm)} className="text-emerald-400 hover:text-emerald-300"><Plus className="w-4 h-4" /></button>
          </div>
          {showRevForm && (
            <div className="p-3 border-b border-zinc-800 flex gap-2">
              <input value={revForm.name} onChange={e => setRevForm({ ...revForm, name: e.target.value })} placeholder="Produto..." className="flex-1 bg-zinc-950 border border-zinc-700 rounded px-2 py-1.5 text-xs text-zinc-200 outline-none" />
              <input type="number" value={revForm.mrr} onChange={e => setRevForm({ ...revForm, mrr: Number(e.target.value) })} placeholder="MRR" className="w-20 bg-zinc-950 border border-zinc-700 rounded px-2 py-1.5 text-xs text-zinc-200 outline-none text-center" />
              <button onClick={addRevenue} className="px-3 py-1.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded text-xs font-bold">Add</button>
            </div>
          )}
          <div className="divide-y divide-zinc-800/50">
            {data.revenues.map(rev => (
              <div key={rev.id} className="flex items-center justify-between px-5 py-3 hover:bg-zinc-800/20 group">
                <div>
                  <span className="text-sm text-zinc-200">{rev.name}</span>
                  <span className="text-xs text-zinc-600 ml-2">({rev.subscribers} subs)</span>
                </div>
                <div className="flex items-center gap-3">
                  <input type="number" value={rev.mrr} onChange={e => updateRevenue(rev.id, Number(e.target.value), rev.subscribers)} className="w-20 bg-zinc-950 border border-zinc-700 rounded px-2 py-1 text-xs text-emerald-400 text-right outline-none font-mono" />
                  <input type="number" value={rev.subscribers} onChange={e => updateRevenue(rev.id, rev.mrr, Number(e.target.value))} className="w-14 bg-zinc-950 border border-zinc-700 rounded px-2 py-1 text-xs text-violet-400 text-right outline-none font-mono" placeholder="subs" />
                  <button onClick={() => removeRevenue(rev.id)} className="text-zinc-700 hover:text-red-400 opacity-0 group-hover:opacity-100"><X className="w-3 h-3" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Costs */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-zinc-800 bg-red-500/5 flex items-center justify-between">
            <h3 className="text-sm font-bold text-red-400 uppercase tracking-wider">📉 Custos Mensais</h3>
            <button onClick={() => setShowCostForm(!showCostForm)} className="text-red-400 hover:text-red-300"><Plus className="w-4 h-4" /></button>
          </div>
          {showCostForm && (
            <div className="p-3 border-b border-zinc-800 flex gap-2">
              <input value={costForm.name} onChange={e => setCostForm({ ...costForm, name: e.target.value })} placeholder="Custo..." className="flex-1 bg-zinc-950 border border-zinc-700 rounded px-2 py-1.5 text-xs text-zinc-200 outline-none" />
              <input type="number" value={costForm.amount} onChange={e => setCostForm({ ...costForm, amount: Number(e.target.value) })} placeholder="R$" className="w-20 bg-zinc-950 border border-zinc-700 rounded px-2 py-1.5 text-xs text-zinc-200 outline-none text-center" />
              <input value={costForm.category} onChange={e => setCostForm({ ...costForm, category: e.target.value })} placeholder="Categoria" className="w-24 bg-zinc-950 border border-zinc-700 rounded px-2 py-1.5 text-xs text-zinc-200 outline-none" />
              <button onClick={addCost} className="px-3 py-1.5 bg-red-500/20 text-red-400 border border-red-500/30 rounded text-xs font-bold">Add</button>
            </div>
          )}
          <div className="divide-y divide-zinc-800/50">
            {data.costs.map(cost => (
              <div key={cost.id} className="flex items-center justify-between px-5 py-3 hover:bg-zinc-800/20 group">
                <div>
                  <span className="text-sm text-zinc-200">{cost.name}</span>
                  {cost.category && <span className="text-[10px] text-zinc-600 ml-2 uppercase">{cost.category}</span>}
                </div>
                <div className="flex items-center gap-3">
                  <input type="number" value={cost.amount} onChange={e => updateCost(cost.id, Number(e.target.value))} className="w-20 bg-zinc-950 border border-zinc-700 rounded px-2 py-1 text-xs text-red-400 text-right outline-none font-mono" />
                  <button onClick={() => removeCost(cost.id)} className="text-zinc-700 hover:text-red-400 opacity-0 group-hover:opacity-100"><X className="w-3 h-3" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
