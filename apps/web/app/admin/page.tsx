"use client";

import { motion } from "framer-motion";
import { Users, FileStack, Database, CreditCard } from "lucide-react";
import { MissionControlStat } from "~/components/admin/mission-control-stats";
import { LiveActivityChart } from "~/components/admin/live-activity-chart";

export default function AdminOverviewPage() {
  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-black tracking-tighter uppercase text-white"
          >
            Mission Control
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-sm font-mono text-white/50 mt-1"
          >
            SYSTEM_STATUS: <span className="text-green-400">OPTIMAL</span>
          </motion.p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center space-x-3 bg-red-950/20 border border-red-500/20 px-4 py-2 rounded-xl"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
          <span className="text-sm font-mono text-white/70">LIVE MONITORING ACTIVE</span>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <MissionControlStat 
          title="Total Creators" 
          value="14,204" 
          trend="8.2%" 
          trendUp={true} 
          icon={Users} 
          delay={0.1} 
        />
        <MissionControlStat 
          title="Active Forms" 
          value="892,103" 
          trend="12.4%" 
          trendUp={true} 
          icon={FileStack} 
          delay={0.2} 
        />
        <MissionControlStat 
          title="API Load" 
          value="84%" 
          trend="4.1%" 
          trendUp={true} 
          icon={Database} 
          delay={0.3} 
          alert={true}
        />
        <MissionControlStat 
          title="MRR" 
          value="$1.2M" 
          trend="18.5%" 
          trendUp={true} 
          icon={CreditCard} 
          delay={0.4} 
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mt-6">
        <LiveActivityChart />
        {/* Placeholder for smaller widget next to the chart on very wide screens, or chart spans full on smaller */}
      </div>
    </div>
  );
}
