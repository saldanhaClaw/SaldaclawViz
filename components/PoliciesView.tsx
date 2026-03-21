import React from 'react';

export default function PoliciesView() {
  return (
    <div className="animate-in fade-in duration-500 space-y-6 text-zinc-400">
      <div>
        <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-3">
          <span className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">📜</span>
          Políticas de Governança
        </h2>
        <p className="text-sm text-zinc-400 mt-1">Diretrizes éticas e operacionais do Swarm SaldaCloud.</p>
      </div>

      <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-8 space-y-8 max-w-3xl">
        <section>
          <h3 className="text-zinc-100 font-bold mb-2 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-emerald-500 rounded-full" />
            01. Soberania do Arquiteto
          </h3>
          <p className="text-sm leading-relaxed">
            O Arquiteto (Saldanha) detém autoridade total sobre o direcionamento do Swarm. Nenhuma ação crítica de infraestrutura ou financeira deve ser tomada sem validação explícita.
          </p>
        </section>

        <section>
          <h3 className="text-zinc-100 font-bold mb-2 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-emerald-500 rounded-full" />
            02. Eficiência de Custos
          </h3>
          <p className="text-sm leading-relaxed">
            Prioridade máxima para modelos de custo zero (ex: hunter-alpha) em tarefas de rotina. Modelos premium são reservados exclusivamente para codificação complexa e raciocínio tático crítico.
          </p>
        </section>

        <section>
          <h3 className="text-zinc-100 font-bold mb-2 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-emerald-500 rounded-full" />
            03. Entrega de Valor (Micro-SaaS)
          </h3>
          <p className="text-sm leading-relaxed">
            Toda iteração deve aproximar o projeto da fase de "Ready for Vercel". O foco deve ser em código limpo, documentado e pronto para produção.
          </p>
        </section>
      </div>
    </div>
  );
}
