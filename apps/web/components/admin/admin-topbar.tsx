"use client";

import { Bell, Search, ShieldCheck, Menu, Terminal } from "lucide-react";
import { cn } from "~/lib/utils";

interface AdminTopbarProps {
  setMobileMenuOpen: (open: boolean) => void;
}

export function AdminTopbar({ setMobileMenuOpen }: AdminTopbarProps) {
  return (
    <header className={cn(
      "h-16 lg:mt-4 lg:mr-4 lg:rounded-3xl shrink-0 flex items-center justify-between px-4 lg:px-6",
      "bg-black/60 backdrop-blur-xl border border-white/5 border-b lg:border-b-white/5 rounded-none z-30"
    )}>
      <div className="flex items-center">
        <button 
          className="lg:hidden p-2 -ml-2 mr-2 text-white/60 hover:text-red-400 transition-colors rounded-xl"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
        
        <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 bg-red-950/30 border border-red-500/20 rounded-full">
          <ShieldCheck className="w-4 h-4 text-green-500" />
          <span className="text-xs font-mono text-green-400">SYSTEM SECURE</span>
        </div>
      </div>
      
      <div className="flex-1" />
      
      <div className="flex items-center space-x-2 lg:space-x-4">
        <button className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-black border border-white/10 hover:border-red-500/30 rounded-xl text-white/50 hover:text-white transition-colors group">
          <Search className="w-4 h-4 group-hover:text-red-400" />
          <span className="text-sm font-mono">Search logs...</span>
          <kbd className="hidden lg:inline-flex items-center gap-1 px-1.5 font-mono text-[10px] text-white/40 bg-white/5 rounded ml-4">
            <span className="text-xs">⌘</span>K
          </kbd>
        </button>

        <button className="relative p-2 text-white/60 hover:text-red-400 transition-colors rounded-xl hover:bg-white/5">
          <Terminal className="w-5 h-5" />
        </button>

        <button className="relative p-2 text-white/60 hover:text-red-400 transition-colors rounded-xl hover:bg-white/5">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.8)]" />
        </button>
      </div>
    </header>
  );
}
