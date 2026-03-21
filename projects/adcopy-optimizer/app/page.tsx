'use client';
import React, { useState } from 'react';
import { Sparkles, TrendingUp, Zap, Target } from 'lucide-react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <main className="flex flex-col items-center min-h-screen">
      
      {/* ── Navbar ── */}
      <nav className="w-full max-w-6xl flex justify-between items-center py-6 px-4 z-50">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-500/10 rounded-lg">
            <Zap className="w-5 h-5 text-emerald-400" />
          </div>
          <span className="font-bold text-xl tracking-tight text-white">Ad<span className="text-emerald-400">Copy</span></span>
        </div>
        <button className="px-5 py-2 text-sm font-semibold border border-zinc-800 hover:border-zinc-700 bg-zinc-900/50 rounded-full transition-all">
          Login
        </button>
      </nav>

      {/* ── Hero Section ── */}
      <section className="relative w-full max-w-6xl mx-auto px-4 pt-24 pb-32 flex flex-col items-center text-center">
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-8 animate-fade-in-up">
          <Sparkles className="w-4 h-4" />
          <span>Inteligência Artificial Direcionada a Conversão</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white max-w-4xl mb-6 leading-[1.1]">
          Não gaste mais dinheiro testando <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-500">
             copy ruim de anúncios.
          </span>
        </h1>

        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-12 font-medium">
          Pare com o "achismo" no Google e Facebook Ads. Descubra quais 
          palavras convertem melhor <span className="text-zinc-200">antes</span> de pagar por cada clique.
        </p>

        {/* Form Captura */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md animate-fade-in-up delay-200 relative z-10">
          <input 
            type="email" 
            placeholder="Seu melhor email..." 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === 'loading' || status === 'success'}
            className="flex-1 bg-zinc-900 border border-zinc-800 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 rounded-xl px-5 py-4 outline-none text-zinc-100 placeholder:text-zinc-600 transition-all font-medium disabled:opacity-50"
            required
          />
          <button 
            type="submit" 
            disabled={status === 'loading' || status === 'success'}
            className={`font-bold px-8 py-4 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all flex items-center justify-center gap-2 whitespace-nowrap group ${
              status === 'success' 
                ? 'bg-emerald-600 text-white cursor-default' 
                : 'bg-emerald-500 hover:bg-emerald-400 text-zinc-950 hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]'
            }`}
          >
            {status === 'loading' ? 'Enviando...' : 
             status === 'success' ? 'Você está na lista! 🎉' : 
             'Acesso Antecipado'}
            {status !== 'success' && <span className="group-hover:translate-x-1 transition-transform">→</span>}
          </button>
        </form>

        {status === 'error' && (
          <p className="mt-4 text-sm text-red-400 font-medium">Erro ao cadastrar. Tente novamente.</p>
        )}

        <p className="mt-4 text-xs text-zinc-600 font-medium">Junte-se a 430+ profissionais de marketing na fila de espera.</p>
      </section>

      {/* ── Interface Mockup Reveal ── */}
      <section className="w-full max-w-5xl px-4 relative -mt-16 z-20 pb-32">
        <div className="w-full aspect-video bg-zinc-950 rounded-2xl border border-zinc-800 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col">
          {/* Mockup Topbar */}
          <div className="h-12 bg-zinc-900 border-b border-zinc-800 flex items-center px-4 gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            <div className="ml-4 px-3 py-1.5 bg-zinc-950 border border-zinc-800 rounded font-mono text-[10px] text-zinc-600 w-64 text-center">
              app.adcopy.ai/dashboard
            </div>
          </div>
          {/* Mockup Body */}
          <div className="flex-1 p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-zinc-950/50">
            <div className="space-y-4">
              <div className="h-8 w-48 bg-zinc-800 rounded-lg animate-pulse" />
              <div className="h-4 w-full bg-zinc-800/80 rounded animate-pulse" />
              <div className="h-4 w-3/4 bg-zinc-800/80 rounded animate-pulse" />
              
              <div className="mt-8 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                 <div className="text-emerald-400 font-mono text-xs mb-2">SCORE DE CONVERSÃO ESTIMADO</div>
                 <div className="text-4xl font-extrabold text-white">92.4%</div>
              </div>
            </div>
            <div className="h-full bg-zinc-900 border border-zinc-800 rounded-xl relative overflow-hidden">
               <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-emerald-500/20 to-transparent pointer-events-none" />
               <div className="absolute bottom-0 w-full h-full flex items-end p-4 gap-2">
                 <div className="w-1/4 h-1/3 bg-zinc-800 rounded-t-sm" />
                 <div className="w-1/4 h-1/2 bg-zinc-800 rounded-t-sm" />
                 <div className="w-1/4 h-3/4 bg-zinc-800 rounded-t-sm" />
                 <div className="w-1/4 h-full bg-emerald-500 rounded-t-sm shadow-[0_0_15px_rgba(16,185,129,0.3)] animate-pulse-glow" />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="w-full max-w-6xl px-4 py-24 border-t border-zinc-900">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="p-6 bg-zinc-900/30 border border-zinc-800 rounded-2xl hover:border-zinc-700 transition-colors group">
            <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Target className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Análise de Concorrentes</h3>
            <p className="text-zinc-400 leading-relaxed">
              Escaneamos os anúncios de quem domina o seu nicho. Saiba exatamente o que eles dizem para fisgar os clientes que você quer.
            </p>
          </div>

          <div className="p-6 bg-zinc-900/30 border border-zinc-800 rounded-2xl hover:border-zinc-700 transition-colors group">
            <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-white">
              <Sparkles className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">Geração Multivariável</h3>
            <p className="text-zinc-400 leading-relaxed">
              Crie 50 variações de títulos, descrições e ganchos instantaneamente. Focados 100% em neuromarketing e persuasão direta.
            </p>
          </div>

          <div className="p-6 bg-zinc-900/30 border border-zinc-800 rounded-2xl hover:border-zinc-700 transition-colors group">
            <div className="w-12 h-12 bg-orange-500/10 border border-orange-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-white">
              <TrendingUp className="w-6 h-6 text-orange-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">Score Preditivo</h3>
            <p className="text-zinc-400 leading-relaxed">
              Antes de subir a campanha, o modelo testa sua copy contra uma base histórica de bilhões de cliques. Evite os erros óbvios.
            </p>
          </div>

        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="w-full border-t border-zinc-900 py-12 px-4 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between text-zinc-600 text-sm">
          <p>© 2026 AdCopy Optimizer. Feito pelo Swarm OpenClaw.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
             <a href="#" className="hover:text-zinc-300 transition-colors">Twitter (X)</a>
             <a href="#" className="hover:text-zinc-300 transition-colors">Termos</a>
             <a href="#" className="hover:text-zinc-300 transition-colors">Privacidade</a>
          </div>
        </div>
      </footer>

    </main>
  );
}
