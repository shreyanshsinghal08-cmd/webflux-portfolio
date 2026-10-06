'use client';

import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';

export default function PanelShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-panel-bg">
      <Sidebar />
      <div className="ml-[256px] transition-all duration-200">
        <TopHeader />
        <main className="p-6 lg:p-8 max-w-[1400px] animate-fade-in">{children}</main>
      </div>
    </div>
  );
}
