"use client";

import { motion } from "framer-motion";
import { FileBarChart, Download, Calendar, ShieldCheck, Zap } from "lucide-react";
import { Button } from "~/components/ui/button";

export default function AdminReportsPage() {
  return (
    <div className="space-y-6 pb-10">
      <div className="flex items-center justify-between mb-8">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-black tracking-tighter uppercase text-white"
        >
          Compliance & Reports
        </motion.h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { title: "Monthly Usage Report", desc: "Detailed breakdown of form submissions, API requests, and bandwidth usage.", icon: Calendar, color: "text-blue-400" },
          { title: "Security & Compliance Audit", desc: "Log of all admin actions, failed login attempts, and data export events.", icon: ShieldCheck, color: "text-red-400" },
          { title: "Performance Metrics", desc: "System latency, database query times, and infrastructure load averages.", icon: Zap, color: "text-yellow-400" },
          { title: "Revenue & Churn Analysis", desc: "Subscription upgrades, downgrades, MRR changes, and forecasted churn.", icon: FileBarChart, color: "text-green-400" },
        ].map((report, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-black/40 border border-red-500/20 rounded-2xl p-6 backdrop-blur-xl flex flex-col justify-between group hover:border-red-500/50 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl bg-white/5 border border-white/10 ${report.color}`}>
                  <report.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{report.title}</h3>
                  <p className="text-sm text-white/50 max-w-sm mt-1">{report.desc}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex items-center justify-between pt-4 border-t border-white/5">
              <span className="text-xs text-white/30">Last generated: 2 hours ago</span>
              <Button size="sm" variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white/10 group-hover:bg-red-500 group-hover:border-red-500 group-hover:text-white transition-all">
                <Download className="w-4 h-4 mr-2" />
                Generate CSV
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
