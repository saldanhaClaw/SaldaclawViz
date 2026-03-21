'use client';

import React from 'react';
import { Code, Layout, Mail, GitBranch, ExternalLink, Copy } from 'lucide-react';

interface Template {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
  color: string;
  command: string;
  size: 'normal' | 'wide' | 'tall';
}

const templates: Template[] = [
  {
    id: 'saas-lp',
    name: 'SAAS Landing Page',
    description: 'Hero section + Bento Grid + Pricing Table + Footer. Dark mode, GSAP animations, fully responsive.',
    icon: <Layout className="w-6 h-6" />,
    tags: ['HTML', 'CSS', 'GSAP', 'Tailwind'],
    color: 'violet',
    command: 'npx -y create-next-app@latest ./ --ts --tailwind --app --src-dir --use-npm',
    size: 'wide',
  },
  {
    id: 'fullstack-starter',
    name: 'Next.js Full-Stack Starter',
    description: 'Auth (NextAuth) + Prisma (Neon PostgreSQL) + Stripe Billing + Dashboard protegido. Pronto para produção.',
    icon: <Code className="w-6 h-6" />,
    tags: ['Next.js 14', 'Prisma', 'Stripe', 'NextAuth'],
    color: 'emerald',
    command: 'npx -y create-next-app@latest ./ --ts --tailwind --app --src-dir --use-npm',
    size: 'wide',
  },
  {
    id: 'email-pack',
    name: 'E-mail Templates',
    description: 'Welcome, Trial Ending, Payment Failed, Upgrade Nudge. Compatível com Resend/SendGrid.',
    icon: <Mail className="w-6 h-6" />,
    tags: ['React Email', 'Resend'],
    color: 'cyan',
    command: 'npx -y create-email@latest',
    size: 'normal',
  },
  {
    id: 'api-starter',
    name: 'API Starter Kit',
    description: 'Express.js + Prisma + JWT Auth + Rate Limiting + Swagger docs. Deploy-ready na Vercel.',
    icon: <GitBranch className="w-6 h-6" />,
    tags: ['Node.js', 'Express', 'Prisma', 'JWT'],
    color: 'orange',
    command: 'npx -y create-next-app@latest ./ --ts --app --use-npm',
    size: 'normal',
  },
];

const colorMap: Record<string, { bg: string; border: string; text: string; iconBg: string; tagBg: string }> = {
  violet: { bg: 'hover:border-violet-500/30', border: 'border-violet-500/20', text: 'text-violet-400', iconBg: 'bg-violet-500/10', tagBg: 'bg-violet-500/10 text-violet-400' },
  emerald: { bg: 'hover:border-emerald-500/30', border: 'border-emerald-500/20', text: 'text-emerald-400', iconBg: 'bg-emerald-500/10', tagBg: 'bg-emerald-500/10 text-emerald-400' },
  cyan: { bg: 'hover:border-cyan-500/30', border: 'border-cyan-500/20', text: 'text-cyan-400', iconBg: 'bg-cyan-500/10', tagBg: 'bg-cyan-500/10 text-cyan-400' },
  orange: { bg: 'hover:border-orange-500/30', border: 'border-orange-500/20', text: 'text-orange-400', iconBg: 'bg-orange-500/10', tagBg: 'bg-orange-500/10 text-orange-400' },
};

export default function TemplatesHub() {
  const copyCommand = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">📦 Templates SAAS</h1>
          <p className="text-sm text-zinc-500 mt-1">Starters reutilizáveis para acelerar novos projetos</p>
        </div>
        <a
          href="https://github.com/saldanhaClaw"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-zinc-900/50 text-zinc-400 border border-zinc-800 rounded-lg text-sm hover:text-zinc-200 hover:border-zinc-700 transition-colors"
        >
          <GitBranch className="w-4 h-4" /> GitHub
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map(tpl => {
          const colors = colorMap[tpl.color];
          return (
            <div
              key={tpl.id}
              className={`bg-zinc-900/50 border border-zinc-800 ${colors.bg} rounded-xl p-6 transition-all duration-300 group relative overflow-hidden ${tpl.size === 'wide' ? 'md:col-span-2' : ''}`}
            >
              {/* Background glow */}
              <div className={`absolute top-0 right-0 w-32 h-32 ${colors.iconBg} rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity`} />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${colors.iconBg} ${colors.text}`}>
                    {tpl.icon}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-zinc-100 mb-2">{tpl.name}</h3>
                <p className="text-sm text-zinc-400 mb-4 leading-relaxed">{tpl.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {tpl.tags.map(tag => (
                    <span key={tag} className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider border ${colors.tagBg} ${colors.border}`}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Command */}
                <div className="bg-zinc-950/80 border border-zinc-800 rounded-lg p-3 flex items-center justify-between group/cmd">
                  <code className="text-xs text-zinc-400 font-mono truncate">{tpl.command}</code>
                  <button
                    onClick={() => copyCommand(tpl.command)}
                    className="ml-3 p-1.5 text-zinc-600 hover:text-emerald-400 transition-colors shrink-0"
                    title="Copiar comando"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Reference */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
        <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4">🔗 Referências Rápidas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: '21st.dev', desc: 'Componentes UI modernos', url: 'https://21st.dev' },
            { name: 'Stripe Docs', desc: 'Billing & Subscriptions', url: 'https://docs.stripe.com/billing' },
            { name: 'Prisma Docs', desc: 'ORM & Database', url: 'https://www.prisma.io/docs' },
            { name: 'Next.js Docs', desc: 'App Router & API Routes', url: 'https://nextjs.org/docs' },
            { name: 'Vercel Docs', desc: 'Deployment & Edge', url: 'https://vercel.com/docs' },
            { name: 'Neon Docs', desc: 'Serverless PostgreSQL', url: 'https://neon.tech/docs' },
          ].map(ref => (
            <a
              key={ref.name}
              href={ref.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 bg-zinc-950/50 border border-zinc-800 rounded-lg hover:border-zinc-700 hover:bg-zinc-900/30 transition-colors group"
            >
              <ExternalLink className="w-4 h-4 text-zinc-600 group-hover:text-emerald-400 transition-colors" />
              <div>
                <div className="text-sm font-medium text-zinc-300 group-hover:text-zinc-100">{ref.name}</div>
                <div className="text-xs text-zinc-600">{ref.desc}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
