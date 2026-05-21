"use client";

import { useState } from "react";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-white overflow-hidden relative lg:gap-4">
      {/* Background ambient glow effect */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-red-900/10 rounded-full blur-[150px] pointer-events-none" />

      <Sidebar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden relative z-10 lg:space-y-4">
        <Topbar setMobileMenuOpen={setMobileMenuOpen} />
        
        {/* Scrollable page content */}
        <main className="flex-1 overflow-y-auto lg:mr-4 lg:mb-4 lg:rounded-3xl glass-panel relative border-t border-white/5 lg:border-t-0">
          <div className="absolute inset-0 bg-black/20 pointer-events-none lg:rounded-3xl" />
          <div className="relative z-10 p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
