"use client";

import { motion } from "framer-motion";
import { Users, FileStack, Database, CreditCard } from "lucide-react";
import { MissionControlStat } from "~/components/admin/mission-control-stats";
import { trpc } from "~/trpc/client";
import { Loader2 } from "lucide-react";

export default function AdminOverviewPage() {
  const { data: stats, isLoading } = trpc.admin.getPlatformStats.useQuery();
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
        

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {isLoading ? (
          <div className="col-span-4 flex justify-center py-12">
            <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
          </div>
        ) : (
          <>
            <MissionControlStat 
              title="Total Creators" 
              value={stats?.totalUsers.toLocaleString() || "0"} 
              trend="--" 
              trendUp={true} 
              icon={Users} 
              delay={0.1} 
            />
            <MissionControlStat 
              title="Active Forms" 
              value={stats?.totalForms.toLocaleString() || "0"} 
              trend="--" 
              trendUp={true} 
              icon={FileStack} 
              delay={0.2} 
            />
            <MissionControlStat 
              title="Total Responses" 
              value={stats?.totalResponses.toLocaleString() || "0"} 
              trend="--" 
              trendUp={true} 
              icon={Database} 
              delay={0.3} 
            />
            <MissionControlStat 
              title="MRR" 
              value="$0" 
              trend="--" 
              trendUp={true} 
              icon={CreditCard} 
              delay={0.4} 
            />
          </>
        )}
      </div>


    </div>
  );
}
