"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "~/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
  icon: LucideIcon;
  delay?: number;
}

export function StatCard({ title, value, trend, trendUp, icon: Icon, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="glass-card p-6 rounded-3xl relative overflow-hidden group cursor-default"
    >
      {/* Hover Ambient Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="flex items-start justify-between relative z-10">
        <div>
          <p className="text-white/60 font-medium mb-1">{title}</p>
          <h3 className="text-3xl font-bold tracking-tight">{value}</h3>
          
          {trend && (
            <div className="mt-4 flex items-center space-x-2">
              <span className={cn(
                "text-xs font-medium px-2 py-1 rounded-full bg-opacity-20",
                trendUp ? "text-green-400 bg-green-500/20" : "text-red-400 bg-red-500/20"
              )}>
                {trendUp ? "+" : "-"}{trend}
              </span>
              <span className="text-xs text-white/40">vs last month</span>
            </div>
          )}
        </div>
        
        <div className="p-3 bg-white/5 rounded-2xl border border-white/10 group-hover:border-white/20 transition-colors">
          <Icon className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" />
        </div>
      </div>
    </motion.div>
  );
}
