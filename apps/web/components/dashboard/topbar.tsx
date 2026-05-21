"use client";

import { Bell, Search, User, Menu } from "lucide-react";
import { cn } from "~/lib/utils";

interface TopbarProps {
  setMobileMenuOpen: (open: boolean) => void;
}

export function Topbar({ setMobileMenuOpen }: TopbarProps) {
  return (
    <header className={cn(
      "h-16 lg:mt-4 lg:mr-4 lg:rounded-3xl shrink-0 flex items-center justify-between px-4 lg:px-6",
      "glass-panel border-b-white/5 border-b lg:border-b-0 rounded-none z-30"
    )}>
      <div className="flex items-center">
        <button 
          className="lg:hidden p-2 -ml-2 mr-2 text-white/60 hover:text-white transition-colors rounded-xl hover:bg-white/5"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
        <span className="lg:hidden font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-800 text-lg">
          Filloutly
        </span>
      </div>
      
      <div className="flex-1" />
      
      <div className="flex items-center space-x-2 lg:space-x-4">
        <button className="hidden sm:block p-2 text-white/60 hover:text-white transition-colors rounded-xl hover:bg-white/5">
          <Search className="w-5 h-5" />
        </button>
        <button className="relative p-2 text-white/60 hover:text-white transition-colors rounded-xl hover:bg-white/5">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full crimson-glow" />
        </button>
        <button className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-red-800 text-white font-medium text-sm overflow-hidden border border-white/10 ml-2">
          <User className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
