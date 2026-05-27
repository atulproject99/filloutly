"use client";

import { motion } from "framer-motion";
import { BarChart, TrendingUp, Users, FileStack } from "lucide-react";
import { LiveActivityChart } from "~/components/admin/live-activity-chart";

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6 pb-10">
      <div className="flex items-center justify-between mb-8">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-black tracking-tighter uppercase text-white"
        >
          Platform Analytics
        </motion.h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {[
          { title: "Monthly Recurring Revenue", value: "$1,249,000", trend: "+14.5%", icon: TrendingUp },
          { title: "Active Paid Subscriptions", value: "8,942", trend: "+5.2%", icon: Users },
          { title: "Avg Forms Per User", value: "14.2", trend: "+1.1%", icon: FileStack },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-black/40 border border-red-500/20 rounded-2xl p-6 backdrop-blur-xl relative overflow-hidden group"
          >
            <div className="absolute -right-6 -top-6 text-red-500/5 group-hover:text-red-500/10 transition-colors">
              <stat.icon className="w-32 h-32" />
            </div>
            <div className="relative z-10">
              <h3 className="text-sm font-medium text-white/50 mb-1">{stat.title}</h3>
              <div className="flex items-end gap-3">
                <span className="text-3xl font-black text-white">{stat.value}</span>
                <span className="text-sm font-bold text-green-400 mb-1">{stat.trend}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6">
        <LiveActivityChart />
      </div>
    </div>
  );
}
