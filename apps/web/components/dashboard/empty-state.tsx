"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  icon: LucideIcon;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ title, description, icon: Icon, actionLabel, onAction }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center p-12 text-center glass-card rounded-3xl border border-white/5 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 via-black/40 to-black/80 z-0" />
      
      {/* Ambient glowing orb behind the icon */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-red-600/10 rounded-full blur-[60px] z-0" />

      <div className="relative z-10 flex flex-col items-center">
        <div className="p-4 bg-white/5 rounded-full mb-6 border border-white/10 shadow-[0_0_40px_rgba(220,38,38,0.2)]">
          <Icon className="w-10 h-10 text-red-400" />
        </div>
        
        <h3 className="text-2xl font-bold mb-2 tracking-tight">{title}</h3>
        <p className="text-white/50 max-w-md mb-8">{description}</p>
        
        {actionLabel && onAction && (
          <button
            onClick={onAction}
            className="px-6 py-3 bg-white text-black font-medium rounded-xl hover:bg-white/90 transition-colors shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          >
            {actionLabel}
          </button>
        )}
      </div>
    </motion.div>
  );
}
