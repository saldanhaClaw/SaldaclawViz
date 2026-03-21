'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Erro na autenticação');

      if (isLogin) {
        localStorage.setItem('adcopy_token', data.token);
        localStorage.setItem('adcopy_user', JSON.stringify(data.user));
        router.push('/dashboard');
      } else {
        alert('Cadastro realizado! Faça login agora.');
        setIsLogin(true);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="inline-block p-3 rounded-xl bg-emerald-500/10 text-emerald-500 mb-4">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            {isLogin ? 'Bem-vindo de volta' : 'Crie sua conta'}
          </h1>
          <p className="text-zinc-400 text-sm">
            AdCopy Optimizer Gateway
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-zinc-400 text-xs font-medium uppercase tracking-wider mb-2">E-mail</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
              placeholder="exemplo@email.com"
            />
          </div>
          <div>
            <label className="block text-zinc-400 text-xs font-medium uppercase tracking-wider mb-2">Senha</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs p-3 rounded-lg">
              {error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold py-3 rounded-xl shadow-lg transition-all active:scale-[0.98]"
          >
            {loading ? 'Processando...' : (isLogin ? 'Entrar' : 'Cadastrar')}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-zinc-800 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-zinc-400 text-sm hover:text-emerald-500 transition-colors"
          >
            {isLogin ? 'Não tem conta? Registre-se' : 'Já tem conta? Entre aqui'}
          </button>
        </div>
      </div>
    </div>
  );
}
