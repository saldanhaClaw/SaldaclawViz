'use client';

import React, { useState } from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import Sidebar from '@/components/Sidebar';
import Overview from '@/components/Overview';
import CloudBotView from '@/components/CloudBotView';
import MappingView from '@/components/MappingView';
import ProjectsView from '@/components/ProjectsView';
import MissionsView from '@/components/MissionsView';
import ChatsView from '@/components/ChatsView';
import TokensView from '@/components/TokensView';
import ErrorsView from '@/components/ErrorsView';
import MemoriesView from '@/components/MemoriesView';
import PoliciesView from '@/components/PoliciesView';
import AgentsView from '@/components/AgentsView';
import Simulacao2DView from '@/components/Simulacao2DView';
import KPIDashboard from '@/components/KPIDashboard';
import ContentCalendar from '@/components/ContentCalendar';
import IncidentBoard from '@/components/IncidentBoard';
import GamificationBoard from '@/components/GamificationBoard';
import TemplatesHub from '@/components/TemplatesHub';
import SprintBoard from '@/components/SprintBoard';
import PLTracker from '@/components/PLTracker';

export default function Home() {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': 
        return <Overview />;
      case 'network':
        return <MappingView />;
      case 'missions':
        return <MissionsView />;
      case 'logs':
        return <ChatsView />;
      case 'tokens':
        return <TokensView />;
      case 'errors':
        return <ErrorsView />;
      case 'memory':
        return <MemoriesView />;
      case 'rules':
        return <PoliciesView />;
      case 'agents':
        return <AgentsView />;
      case 'openclaw':
        return <Simulacao2DView />;
      case 'projetos':
        return <ProjectsView />;
      case 'kpi':
        return <KPIDashboard />;
      case 'calendar':
        return <ContentCalendar />;
      case 'incidents':
        return <IncidentBoard />;
      case 'gamification':
        return <GamificationBoard />;
      case 'templates':
        return <TemplatesHub />;
      case 'sprint':
        return <SprintBoard />;
      case 'pnl':
        return <PLTracker />;
      default:
        return <CloudBotView tabName={activeTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 font-sans selection:bg-emerald-500/30 selection:text-emerald-200 text-zinc-100">
      <DashboardHeader />
      <div className="flex">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 overflow-y-auto h-[calc(100vh-64px)] p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
