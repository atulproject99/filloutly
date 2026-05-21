"use client";

import { useState } from "react";
import { AdminSidebar } from "./admin-sidebar";
import { AdminTopbar } from "./admin-topbar";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden relative lg:gap-4">
      {/* Deep Cyberpunk / Money Heist ambient glow effect */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-red-900/10 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-red-950/20 rounded-full blur-[180px] pointer-events-none z-0" />
      
      {/* Subtle grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" 
        style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />

      <AdminSidebar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden relative z-10 lg:space-y-4">
        <AdminTopbar setMobileMenuOpen={setMobileMenuOpen} />
        
        {/* Scrollable page content */}
        <main className="flex-1 overflow-y-auto lg:mr-4 lg:mb-4 lg:rounded-3xl bg-black/40 backdrop-blur-3xl relative border-t border-white/5 lg:border lg:border-white/5 shadow-[inset_0_0_100px_rgba(220,38,38,0.02)]">
          <div className="relative z-10 p-4 sm:p-6 lg:p-8 h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
