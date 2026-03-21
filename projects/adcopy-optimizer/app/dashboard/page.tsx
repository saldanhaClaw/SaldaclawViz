'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newText, setNewText] = useState('');
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adcopy_token');
    const u = localStorage.getItem('adcopy_user');
    if (!token || !u) {
      router.push('/auth');
      return;
    }
    setUser(JSON.parse(u));
    fetchAds(token);
  }, []);

  const fetchAds = async (token: string) => {
    try {
      const res = await fetch('/api/ads', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      setAds(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    const token = localStorage.getItem('adcopy_token');
    const res = await fetch('/api/ads', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify({ originalText: newText }),
    });
    if (res.ok) {
      setNewText('');
      fetchAds(token!);
    }
  };

  const handleOptimize = async (id: number) => {
    const token = localStorage.getItem('adcopy_token');
    const res = await fetch(`/api/ads/${id}/optimize`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (res.ok) fetchAds(token!);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex">
      {/* Sidebar */}
      <div className="w-64 border-r border-zinc-800 p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center font-bold text-black">A</div>
          <span className="font-bold tracking-tight text-lg">AdCopy.ai</span>
        </div>

        <nav className="flex-1 space-y-2">
          <button className="w-full text-left px-4 py-2 bg-emerald-500/10 text-emerald-500 rounded-lg font-medium">Dashboard</button>
          <button className="w-full text-left px-4 py-2 text-zinc-400 hover:bg-zinc-900 rounded-lg transition-colors">Histórico</button>
          <button className="w-full text-left px-4 py-2 text-zinc-400 hover:bg-zinc-900 rounded-lg transition-colors">Configurações</button>
        </nav>

        <div className="pt-6 border-t border-zinc-800">
          <p className="text-xs text-zinc-500 mb-1">Logado como:</p>
          <p className="text-sm font-medium truncate">{user?.email}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Seus Anúncios</h1>
          </div>

          {/* New Ad Input */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-10 shadow-xl">
            <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">Nova Otimização</h3>
            <textarea 
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-white focus:outline-none focus:border-emerald-500 min-h-[100px] mb-4"
              placeholder="Cole seu texto original aqui..."
            />
            <button 
              onClick={handleCreate}
              className="bg-emerald-600 hover:bg-emerald-500 px-6 py-2 rounded-lg font-bold transition-all"
            >
              Criar Rascunho
            </button>
          </div>

          {/* Ad List */}
          <div className="space-y-6">
            {loading ? <p>Carregando...</p> : ads.map((ad: any) => (
              <div key={ad.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-2 py-1 rounded-md text-[10px] uppercase font-black ${ad.status === 'optimized' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-amber-500/20 text-amber-500'}`}>
                    {ad.status === 'optimized' ? 'Otimizado' : 'Rascunho'}
                  </span>
                  <button 
                    onClick={() => handleOptimize(ad.id)}
                    className="text-xs text-emerald-500 hover:underline font-bold transition-opacity"
                  >
                    Otimizar com IA ✨
                  </button>
                </div>
                <p className="text-zinc-300 mb-6 italic">"{ad.original_text}"</p>

                {ad.optimized_variations && ad.optimized_variations.length > 0 && (
                  <div className="space-y-3 pt-4 border-t border-zinc-800">
                    <p className="text-xs font-bold text-zinc-500 uppercase">Variações Sugeridas:</p>
                    {ad.optimized_variations.map((v: string, i: number) => (
                      <div key={i} className="bg-zinc-950 p-4 rounded-xl border border-dotted border-zinc-800 text-sm text-emerald-50 text-white leading-relaxed">
                        {v}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
