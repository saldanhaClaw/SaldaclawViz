'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Twitter, MessageSquare, Newspaper, Check, Clock, AlertCircle } from 'lucide-react';

interface PostSlot {
  id: string;
  platform: 'twitter' | 'reddit' | 'hackernews' | 'indiehackers';
  type: 'educativo' | 'provocativo' | 'showcase' | 'thread' | 'resposta';
  title: string;
  status: 'scheduled' | 'posted' | 'missed';
}

interface DayPlan {
  day: string;
  dayShort: string;
  posts: PostSlot[];
}

const STORAGE_KEY = 'saldacloud_content_calendar';

const platformConfig = {
  twitter: { icon: <Twitter className="w-3.5 h-3.5" />, color: 'text-sky-400', bg: 'bg-sky-500/10 border-sky-500/20' },
  reddit: { icon: <MessageSquare className="w-3.5 h-3.5" />, color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20' },
  hackernews: { icon: <Newspaper className="w-3.5 h-3.5" />, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
  indiehackers: { icon: <Newspaper className="w-3.5 h-3.5" />, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
};

const statusConfig = {
  scheduled: { icon: <Clock className="w-3 h-3" />, color: 'text-zinc-400', bg: 'bg-zinc-500/10 border-zinc-500/20', label: 'Agendado' },
  posted: { icon: <Check className="w-3 h-3" />, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20', label: 'Postado' },
  missed: { icon: <AlertCircle className="w-3 h-3" />, color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20', label: 'Perdido' },
};

const typeColors: Record<string, string> = {
  educativo: 'text-emerald-400',
  provocativo: 'text-red-400',
  showcase: 'text-violet-400',
  thread: 'text-cyan-400',
  resposta: 'text-orange-400',
};

const defaultWeek: DayPlan[] = [
  { day: 'Segunda', dayShort: 'SEG', posts: [
    { id: '1', platform: 'twitter', type: 'educativo', title: 'Post educativo sobre SAAS', status: 'scheduled' },
  ]},
  { day: 'Terça', dayShort: 'TER', posts: [
    { id: '2', platform: 'reddit', type: 'resposta', title: 'Responder threads em r/SaaS', status: 'scheduled' },
  ]},
  { day: 'Quarta', dayShort: 'QUA', posts: [
    { id: '3', platform: 'twitter', type: 'provocativo', title: 'Hot take sobre o nicho', status: 'scheduled' },
  ]},
  { day: 'Quinta', dayShort: 'QUI', posts: [
    { id: '4', platform: 'indiehackers', type: 'resposta', title: 'Contribuir em Indie Hackers', status: 'scheduled' },
  ]},
  { day: 'Sexta', dayShort: 'SEX', posts: [
    { id: '5', platform: 'twitter', type: 'showcase', title: 'Showcase do produto da semana', status: 'scheduled' },
  ]},
  { day: 'Sábado', dayShort: 'SAB', posts: [] },
  { day: 'Domingo', dayShort: 'DOM', posts: [
    { id: '6', platform: 'twitter', type: 'thread', title: 'Thread semanal de aprendizados', status: 'scheduled' },
  ]},
];

export default function ContentCalendar() {
  const [week, setWeek] = useState<DayPlan[]>(defaultWeek);
  const [showForm, setShowForm] = useState<number | null>(null);
  const [newPost, setNewPost] = useState({ platform: 'twitter' as PostSlot['platform'], type: 'educativo' as PostSlot['type'], title: '' });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try { setWeek(JSON.parse(saved)); } catch { /* ignore */ }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(week));
  }, [week]);

  const addPost = (dayIndex: number) => {
    if (!newPost.title.trim()) return;
    const updated = [...week];
    updated[dayIndex].posts.push({
      id: Date.now().toString(),
      ...newPost,
      status: 'scheduled',
    });
    setWeek(updated);
    setNewPost({ platform: 'twitter', type: 'educativo', title: '' });
    setShowForm(null);
  };

  const toggleStatus = (dayIndex: number, postId: string) => {
    const updated = [...week];
    const post = updated[dayIndex].posts.find(p => p.id === postId);
    if (post) {
      const cycle: PostSlot['status'][] = ['scheduled', 'posted', 'missed'];
      const currentIdx = cycle.indexOf(post.status);
      post.status = cycle[(currentIdx + 1) % cycle.length];
      setWeek(updated);
    }
  };

  const removePost = (dayIndex: number, postId: string) => {
    const updated = [...week];
    updated[dayIndex].posts = updated[dayIndex].posts.filter(p => p.id !== postId);
    setWeek(updated);
  };

  const totalPosts = week.reduce((sum, d) => sum + d.posts.length, 0);
  const postedCount = week.reduce((sum, d) => sum + d.posts.filter(p => p.status === 'posted').length, 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">📅 Calendário de Conteúdo</h1>
          <p className="text-sm text-zinc-500 mt-1">Agenda semanal do community-manager</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-xs text-zinc-500">
            <span className="text-emerald-400 font-bold">{postedCount}</span>/{totalPosts} postados
          </div>
          <div className="w-24 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${totalPosts > 0 ? (postedCount / totalPosts) * 100 : 0}%` }} />
          </div>
        </div>
      </div>

      {/* Weekly Grid */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
        {week.map((day, dayIndex) => (
          <div
            key={day.day}
            className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 hover:border-zinc-700 transition-colors min-h-[200px] flex flex-col"
          >
            {/* Day Header */}
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">{day.dayShort}</span>
                <p className="text-sm font-medium text-zinc-300">{day.day}</p>
              </div>
              <span className="text-xs text-zinc-600 font-mono">{day.posts.length}</span>
            </div>

            {/* Posts */}
            <div className="space-y-2 flex-1">
              {day.posts.map((post) => {
                const plat = platformConfig[post.platform];
                const stat = statusConfig[post.status];
                return (
                  <div
                    key={post.id}
                    className="bg-zinc-950/50 border border-zinc-800/50 rounded-lg p-2.5 group relative"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`${plat.color}`}>{plat.icon}</span>
                      <span className={`text-[10px] font-bold uppercase ${typeColors[post.type]}`}>{post.type}</span>
                    </div>
                    <p className="text-xs text-zinc-300 line-clamp-2 mb-2">{post.title}</p>
                    <button
                      onClick={() => toggleStatus(dayIndex, post.id)}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold uppercase border ${stat.bg} ${stat.color}`}
                    >
                      {stat.icon} {stat.label}
                    </button>
                    <button
                      onClick={() => removePost(dayIndex, post.id)}
                      className="absolute top-1 right-1 text-zinc-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                    >
                      ✕
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Add Button or Form */}
            {showForm === dayIndex ? (
              <div className="mt-2 space-y-2 bg-zinc-950/50 border border-zinc-800 rounded-lg p-2">
                <input
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  placeholder="Descrição do post..."
                  className="w-full bg-zinc-900 border border-zinc-700 rounded px-2 py-1.5 text-xs text-zinc-200 placeholder:text-zinc-600 outline-none focus:border-emerald-500/50"
                  onKeyDown={(e) => e.key === 'Enter' && addPost(dayIndex)}
                />
                <div className="flex gap-1">
                  <select
                    value={newPost.platform}
                    onChange={(e) => setNewPost({ ...newPost, platform: e.target.value as PostSlot['platform'] })}
                    className="flex-1 bg-zinc-900 border border-zinc-700 rounded px-1.5 py-1 text-[10px] text-zinc-300 outline-none"
                  >
                    <option value="twitter">Twitter</option>
                    <option value="reddit">Reddit</option>
                    <option value="hackernews">HN</option>
                    <option value="indiehackers">IH</option>
                  </select>
                  <select
                    value={newPost.type}
                    onChange={(e) => setNewPost({ ...newPost, type: e.target.value as PostSlot['type'] })}
                    className="flex-1 bg-zinc-900 border border-zinc-700 rounded px-1.5 py-1 text-[10px] text-zinc-300 outline-none"
                  >
                    <option value="educativo">Educativo</option>
                    <option value="provocativo">Provocativo</option>
                    <option value="showcase">Showcase</option>
                    <option value="thread">Thread</option>
                    <option value="resposta">Resposta</option>
                  </select>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => addPost(dayIndex)} className="flex-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded px-2 py-1 text-[10px] font-bold hover:bg-emerald-500/30 transition-colors">
                    Adicionar
                  </button>
                  <button onClick={() => setShowForm(null)} className="px-2 py-1 text-[10px] text-zinc-500 hover:text-zinc-300">
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowForm(dayIndex)}
                className="mt-2 w-full flex items-center justify-center gap-1 py-2 border border-dashed border-zinc-800 rounded-lg text-xs text-zinc-600 hover:text-emerald-400 hover:border-emerald-500/30 transition-colors"
              >
                <Plus className="w-3 h-3" /> Add
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
