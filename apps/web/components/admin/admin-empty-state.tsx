"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "~/lib/utils";

interface AdminEmptyStateProps {
  title: string;
  description: string;
  icon: LucideIcon;
  actionLabel?: string;
  onAction?: () => void;
  alert?: boolean;
}

export function AdminEmptyState({ title, description, icon: Icon, actionLabel, onAction, alert = false }: AdminEmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "flex flex-col items-center justify-center p-12 text-center bg-black/60 backdrop-blur-xl rounded-3xl border relative overflow-hidden",
        alert ? "border-red-500/50 shadow-[0_0_50px_rgba(220,38,38,0.15)]" : "border-white/5"
      )}
    >
      {/* Hacker grid background */}
      <div 
        className="absolute inset-0 opacity-[0.05] z-0 pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />
      
      {/* Ambient glowing orb behind the icon */}
      <div className={cn(
        "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-[80px] z-0 pointer-events-none",
        alert ? "bg-red-600/20" : "bg-white/5"
      )} />

      <div className="relative z-10 flex flex-col items-center">
        <div className={cn(
          "p-5 rounded-2xl mb-6 border",
          alert ? "bg-red-950/50 border-red-500/30 text-red-500 shadow-[0_0_30px_rgba(220,38,38,0.3)]" : "bg-white/5 border-white/10 text-white/50"
        )}>
          <Icon className="w-12 h-12" />
        </div>
        
        <h3 className={cn(
          "text-2xl font-black tracking-widest uppercase mb-2",
          alert ? "text-red-500 crimson-text-glow" : "text-white"
        )}>
          {title}
        </h3>
        <p className="text-white/40 max-w-md mb-8 font-mono text-sm">{description}</p>
        
        {actionLabel && onAction && (
          <button
            onClick={onAction}
            className={cn(
              "px-6 py-3 font-mono text-sm uppercase tracking-widest rounded-xl transition-all duration-300 border",
              alert 
                ? "bg-red-950/80 hover:bg-red-900 border-red-500/50 text-red-200 hover:text-white shadow-[0_0_20px_rgba(220,38,38,0.2)]" 
                : "bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20 text-white"
            )}
          >
            {actionLabel}
          </button>
        )}
      </div>
    </motion.div>
  );
}
