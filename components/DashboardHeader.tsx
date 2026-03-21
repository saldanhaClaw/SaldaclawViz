'use client';

import React from 'react';


export default function DashboardHeader() {
  return (
    <header className="h-16 border-b border-zinc-800 bg-zinc-950 flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
          <span className="text-zinc-950 text-xl">⚡</span>
        </div>
        <h1 className="text-xl font-bold tracking-tight text-zinc-100">
          SaldaCloud <span className="text-emerald-500">Gestão</span>
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-zinc-400 hover:text-zinc-100 transition-colors relative">
          <span className="text-xl">🔔</span>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full border-2 border-zinc-950"></span>
        </button>
        <button className="p-2 text-zinc-400 hover:text-zinc-100 transition-colors">
          <span className="text-xl">⚙️</span>
        </button>
        <div className="h-8 w-[1px] bg-zinc-800 mx-2"></div>
        <div className="flex items-center gap-3 pl-2">
          <div className="text-right">
            <p className="text-sm font-medium text-zinc-100 leading-none">Admin User</p>
            <p className="text-xs text-zinc-500 mt-1">Master Controller</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center">
            <span className="text-zinc-400 text-sm">👤</span>
          </div>
        </div>
      </div>
    </header>
  );
}
