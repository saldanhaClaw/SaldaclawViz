'use client';

import React from 'react';
import { Terminal, Bot, Settings2, PlayCircle, ShieldCheck } from 'lucide-react';

interface CloudBotViewProps {
  tabName: string;
}

const titles: Record<string, string> = {
  network: 'Mapa de Fluxo',
  missions: 'Central de Missões',
  logs: 'Logs do Chat (SaldaClawd)',
  tokens: 'Token Hub / Orçamento',
  errors: 'Console de Debug & Erros',
  memory: 'Arquivos de Memória',
  rules: 'Políticas do Sistema',
  agents: 'Configuração de Agentes',
  openclaw: 'Simulação 2D (OpenClaw)',
  projetos: 'Hub de Projetos',
};

export default function CloudBotView({ tabName }: CloudBotViewProps) {
  const currentTitle = titles[tabName] || 'Painel do Agente';

  return (
    <div className="flex flex-col h-full bg-zinc-950/50 rounded-2xl border border-zinc-800/50 overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-zinc-800/50 bg-zinc-900/20">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
            <Bot className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">{currentTitle}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-sm font-medium text-emerald-500">Conectado ao SaldaClawd (CloudBot)</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="p-2 bg-zinc-900/50 hover:bg-zinc-800 border border-zinc-800 rounded-lg text-zinc-400 transition-colors">
            <Settings2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-8 flex flex-col items-center justify-center text-center max-w-2xl mx-auto">
        <div className="w-16 h-16 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
          <Terminal className="w-8 h-8 text-zinc-500" />
        </div>
        
        <h2 className="text-2xl font-bold text-zinc-100 mb-4">Interface de Comando Autônomo</h2>
        
        <p className="text-zinc-400 mb-8 leading-relaxed">
          Esta sessão centraliza o monitoramento do <strong>SaldaClawd</strong>. Atualmente, a ligação entre o Agente CloudBot e o 
          Antigravity ocorre via arquivos (<code className="bg-zinc-900 px-1 py-0.5 rounded text-emerald-400 text-sm">antigravity_tasks/</code>) 
          e mensagens via Telegram.
        </p>

        <div className="w-full bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 text-left relative overflow-hidden">
          <ShieldCheck className="absolute -bottom-4 -right-4 w-24 h-24 text-blue-500/10" />
          <h3 className="font-bold text-blue-400 mb-2 flex items-center gap-2">
            <PlayCircle className="w-5 h-5" /> Arquitetura de Automação Headless
          </h3>
          <p className="text-sm text-blue-200/80 mb-4 leading-relaxed relative z-10">
            <strong>Saldanha</strong>, o chat atual do Antigravity funciona como um &quot;copiloto assistido&quot; (requer seus prompts na janela). 
            Para automação 100% invisível (onde o SaldaClawd conversa comigo sem você abrir o chat), 
            é necessário executar um Daemon Node.js usando sua chave da API da Gemini. 
          </p>
          <div className="p-3 bg-zinc-950/80 border border-blue-500/30 rounded-lg text-xs font-mono text-zinc-300 relative z-10">
            // Exemplo do pipeline Headless:
            <br />
            1. SaldaClawd detecta erro e escreve specs em disco.
            <br />
            2. Script de Fundo (Antigravity Headless) detecta o arquivo.
            <br />
            3. Script auto-repara o código e faz push, avisando via Telegram.
          </div>
        </div>
      </div>

    </div>
  );
}
