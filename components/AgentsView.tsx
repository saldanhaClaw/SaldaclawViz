import React from 'react';

export default function AgentsView() {
  const agents = [
    { name: 'SaldaClawd', role: 'Orchestrator', desc: 'Coordenador central do Swarm.' },
    { name: 'Backend API', role: 'Dev', desc: 'Engenheiro de sistemas e banco de dados.' },
    { name: 'Frontend UX', role: 'Designer', desc: 'Especialista em interfaces premium.' },
    { name: 'QA Debugger', role: 'Tester', desc: 'Garantia de qualidade e correção de bugs.' },
    { name: 'Copywriter', role: 'Marketing', desc: 'Redator focado em alta conversão.' },
    { name: 'Growth', role: 'Strategy', desc: 'Distribuição e escala de Micro-SaaS.' }
  ];

  return (
    <div className="animate-in fade-in duration-500 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-3">
          <span className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">👥</span>
          Equipe de Agentes
        </h2>
        <p className="text-sm text-zinc-400 mt-1">Status detalhado e especializações da equipe SaldaCloud.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <div key={agent.name} className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl shadow-xl hover:scale-[1.02] transition-all">
             <div className="w-12 h-12 bg-zinc-800 rounded-xl mb-4 flex items-center justify-center text-2xl">🤖</div>
             <h3 className="font-bold text-zinc-100">{agent.name}</h3>
             <div className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider mb-2">{agent.role}</div>
             <p className="text-xs text-zinc-500 leading-relaxed">{agent.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
