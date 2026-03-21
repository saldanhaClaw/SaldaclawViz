'use client';

import React, { useState, useEffect } from 'react';
import { Plus, X, GripVertical } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  agent: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: number;
}

interface Column {
  id: string;
  title: string;
  emoji: string;
  color: string;
  tasks: Task[];
}

const STORAGE_KEY = 'saldacloud_sprint_board';

const defaultColumns: Column[] = [
  { id: 'backlog', title: 'Backlog', emoji: '📋', color: 'zinc', tasks: [] },
  { id: 'doing', title: 'Em Progresso', emoji: '🔨', color: 'orange', tasks: [] },
  { id: 'review', title: 'QA Review', emoji: '🔍', color: 'violet', tasks: [] },
  { id: 'done', title: 'Concluído', emoji: '✅', color: 'emerald', tasks: [] },
  { id: 'shipped', title: 'Shipped', emoji: '🚀', color: 'cyan', tasks: [] },
];

const priorityConfig = {
  low: { label: 'Low', color: 'bg-zinc-500/20 text-zinc-400 border-zinc-500/20' },
  medium: { label: 'Med', color: 'bg-orange-500/20 text-orange-400 border-orange-500/20' },
  high: { label: 'High', color: 'bg-red-500/20 text-red-400 border-red-500/20' },
};

const columnColors: Record<string, { header: string; border: string }> = {
  zinc: { header: 'bg-zinc-500/10 text-zinc-400', border: 'border-zinc-800' },
  orange: { header: 'bg-orange-500/10 text-orange-400', border: 'border-orange-500/20' },
  violet: { header: 'bg-violet-500/10 text-violet-400', border: 'border-violet-500/20' },
  emerald: { header: 'bg-emerald-500/10 text-emerald-400', border: 'border-emerald-500/20' },
  cyan: { header: 'bg-cyan-500/10 text-cyan-400', border: 'border-cyan-500/20' },
};

export default function SprintBoard() {
  const [columns, setColumns] = useState<Column[]>(defaultColumns);
  const [showForm, setShowForm] = useState<string | null>(null);
  const [form, setForm] = useState({ title: '', agent: '', priority: 'medium' as Task['priority'] });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) { try { setColumns(JSON.parse(saved)); } catch { /* */ } }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(columns));
  }, [columns]);

  const addTask = (colId: string) => {
    if (!form.title.trim()) return;
    setColumns(prev => prev.map(col => {
      if (col.id !== colId) return col;
      return { ...col, tasks: [...col.tasks, { ...form, id: Date.now().toString(), createdAt: Date.now() }] };
    }));
    setForm({ title: '', agent: '', priority: 'medium' });
    setShowForm(null);
  };

  const moveTask = (taskId: string, fromCol: string, direction: 1 | -1) => {
    const colIndex = columns.findIndex(c => c.id === fromCol);
    const targetIndex = colIndex + direction;
    if (targetIndex < 0 || targetIndex >= columns.length) return;

    setColumns(prev => {
      const updated = prev.map(c => ({ ...c, tasks: [...c.tasks] }));
      const task = updated[colIndex].tasks.find(t => t.id === taskId);
      if (!task) return prev;
      updated[colIndex].tasks = updated[colIndex].tasks.filter(t => t.id !== taskId);
      updated[targetIndex].tasks.push(task);
      return updated;
    });
  };

  const removeTask = (colId: string, taskId: string) => {
    setColumns(prev => prev.map(col => {
      if (col.id !== colId) return col;
      return { ...col, tasks: col.tasks.filter(t => t.id !== taskId) };
    }));
  };

  const totalTasks = columns.reduce((sum, c) => sum + c.tasks.length, 0);
  const shippedTasks = columns.find(c => c.id === 'shipped')?.tasks.length || 0;
  const doneTasks = columns.find(c => c.id === 'done')?.tasks.length || 0;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">🏃 Sprint Board</h1>
          <p className="text-sm text-zinc-500 mt-1">Kanban semanal — Ship Fast, Ship Often</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <span className="text-emerald-400 font-bold">{shippedTasks + doneTasks}</span>/{totalTasks} completas
          </div>
          <div className="w-24 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${totalTasks > 0 ? ((shippedTasks + doneTasks) / totalTasks) * 100 : 0}%` }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 min-h-[500px]">
        {columns.map((col, colIdx) => {
          const colors = columnColors[col.color];
          return (
            <div key={col.id} className={`bg-zinc-900/30 border ${colors.border} rounded-xl flex flex-col`}>
              <div className={`px-3 py-2.5 ${colors.header} rounded-t-xl border-b ${colors.border} flex items-center justify-between`}>
                <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  {col.emoji} {col.title}
                </span>
                <span className="text-[10px] font-mono opacity-60">{col.tasks.length}</span>
              </div>

              <div className="p-2 space-y-2 flex-1 overflow-y-auto">
                {col.tasks.map(task => (
                  <div key={task.id} className="bg-zinc-950/60 border border-zinc-800/50 rounded-lg p-2.5 group relative">
                    <div className="flex items-start gap-2">
                      <GripVertical className="w-3 h-3 text-zinc-700 mt-0.5 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-zinc-200 leading-tight">{task.title}</p>
                        {task.agent && <p className="text-[10px] text-zinc-600 mt-1">👤 {task.agent}</p>}
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded border ${priorityConfig[task.priority].color}`}>
                        {priorityConfig[task.priority].label}
                      </span>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {colIdx > 0 && (
                          <button onClick={() => moveTask(task.id, col.id, -1)} className="text-[10px] text-zinc-600 hover:text-zinc-300">◀</button>
                        )}
                        {colIdx < columns.length - 1 && (
                          <button onClick={() => moveTask(task.id, col.id, 1)} className="text-[10px] text-zinc-600 hover:text-emerald-400">▶</button>
                        )}
                        <button onClick={() => removeTask(col.id, task.id)} className="text-[10px] text-zinc-600 hover:text-red-400 ml-1">
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {showForm === col.id ? (
                <div className="p-2 border-t border-zinc-800/50 space-y-1.5">
                  <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Task..." className="w-full bg-zinc-950 border border-zinc-700 rounded px-2 py-1.5 text-xs text-zinc-200 placeholder:text-zinc-600 outline-none" onKeyDown={e => e.key === 'Enter' && addTask(col.id)} />
                  <div className="flex gap-1">
                    <input value={form.agent} onChange={e => setForm({ ...form, agent: e.target.value })} placeholder="Agente..." className="flex-1 bg-zinc-950 border border-zinc-700 rounded px-2 py-1 text-[10px] text-zinc-200 placeholder:text-zinc-600 outline-none" />
                    <select value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value as Task['priority'] })} className="bg-zinc-950 border border-zinc-700 rounded px-1.5 py-1 text-[10px] text-zinc-200 outline-none">
                      <option value="low">Low</option>
                      <option value="medium">Med</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => addTask(col.id)} className="flex-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded px-2 py-1 text-[10px] font-bold">Add</button>
                    <button onClick={() => setShowForm(null)} className="px-2 py-1 text-[10px] text-zinc-600">✕</button>
                  </div>
                </div>
              ) : (
                <button onClick={() => setShowForm(col.id)} className="m-2 py-1.5 border border-dashed border-zinc-800 rounded-lg text-[10px] text-zinc-600 hover:text-emerald-400 hover:border-emerald-500/30 transition-colors flex items-center justify-center gap-1">
                  <Plus className="w-3 h-3" /> Add Task
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
