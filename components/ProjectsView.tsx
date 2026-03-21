import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface Project {
  id: string;
  name: string;
  status: 'em andamento' | 'concluido' | 'pausado';
  completion: number;
  tech_stack: string[];
  last_update: string;
  description: string;
}

export default function ProjectsView() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`/_ag_viz.json?t=${Date.now()}`);
        const data = await res.json();
        if (data.projects_portfolio) {
          setProjects(data.projects_portfolio);
        }
      } catch (e) {
        console.error("Erro ao carregar projetos:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
    const interval = setInterval(fetchProjects, 10000);
    return () => clearInterval(interval);
  }, []);

  if (loading && projects.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'em andamento': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      case 'concluido': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      default: return 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20';
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-3">
            <span className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">📁</span>
            Hub de Projetos
          </h2>
          <p className="text-sm text-zinc-400 mt-1">Gestão de portfólio e lifecycle dos Micro-SaaS.</p>
        </div>
        <button className="px-4 py-2 bg-emerald-500 text-zinc-950 font-bold rounded-lg hover:bg-emerald-400 transition-all text-sm">
          + Novo Projeto
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div 
            key={project.id}
            className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-all group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">{project.id}</span>
                <h3 className="text-lg font-bold text-zinc-100 mt-1">{project.name}</h3>
              </div>
              <div className={cn("px-3 py-1 rounded-full text-[10px] font-bold uppercase border", getStatusConfig(project.status))}>
                {project.status || 'desconhecido'}
              </div>
            </div>

            <p className="text-sm text-zinc-400 mb-6 line-clamp-2 relative z-10">{project.description || 'Sem descrição.'}</p>

            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-zinc-500">Progresso</span>
                <span className="text-emerald-400 font-bold">{project.completion || 0}%</span>
              </div>
              <div className="h-2 w-full bg-zinc-800/50 rounded-full overflow-hidden border border-zinc-800">
                <div 
                  className="h-full bg-emerald-500 transition-all duration-1000 ease-out" 
                  style={{ width: `${project.completion || 0}%` }}
                />
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {(project.tech_stack || []).map((tech) => (
                  <span key={tech} className="px-2 py-0.5 bg-zinc-950/50 border border-zinc-800 rounded text-[10px] text-zinc-500">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-800/50 flex items-center justify-between relative z-10">
              <span className="text-[10px] text-zinc-500 italic">Atualizado em: {project.last_update || 'N/A'}</span>
              <button className="text-emerald-500 text-xs font-bold hover:underline flex items-center gap-1">
                Ver Detalhes <span>&rsaquo;</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
