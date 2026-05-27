"use client";

import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import { AdminEmptyState } from "~/components/admin/admin-empty-state";

export default function LogsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-black tracking-tighter uppercase text-white"
        >
          System Logs
        </motion.h1>
      </div>

      <div className="bg-black border border-red-500/30 rounded-xl overflow-hidden font-mono text-sm relative shadow-[0_0_30px_rgba(220,38,38,0.15)]">
        <div className="flex items-center gap-2 px-4 py-2 bg-red-950/40 border-b border-red-500/20">
          <div className="w-3 h-3 rounded-full bg-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/50" />
          <span className="ml-4 text-xs text-red-500/50 uppercase tracking-widest font-bold">system.log</span>
        </div>
        <div className="p-4 h-[500px] overflow-y-auto space-y-1">
          {[
            { time: "22:45:01.004", level: "INFO", msg: "Worker node 03 initialized successfully." },
            { time: "22:45:03.112", level: "WARN", msg: "High latency detected on DB replica region:us-east." },
            { time: "22:45:05.441", level: "INFO", msg: "Incoming webhook from Stripe: evt_12498234." },
            { time: "22:45:10.993", level: "ERROR", msg: "Failed to parse JSON payload on /api/webhooks." },
            { time: "22:45:11.002", level: "INFO", msg: "Retrying payload parsing with fallback schema." },
            { time: "22:45:14.501", level: "INFO", msg: "User usr_10924 successfully authenticated." },
            { time: "22:45:19.230", level: "INFO", msg: "Form frm_99182 published to edge CDN." },
            { time: "22:45:21.411", level: "WARN", msg: "Rate limit threshold reached for IP 192.168.1.44." },
          ].map((log, i) => (
            <div key={i} className="flex gap-4">
              <span className="text-white/30 shrink-0">[{log.time}]</span>
              <span className={`shrink-0 w-12 ${
                log.level === 'INFO' ? 'text-blue-400' : 
                log.level === 'WARN' ? 'text-yellow-400' : 'text-red-500'
              }`}>{log.level}</span>
              <span className="text-white/70">{log.msg}</span>
            </div>
          ))}
          <div className="flex gap-4 animate-pulse">
            <span className="text-white/30">[{new Date().toISOString().split('T')[1]?.slice(0, 12) || ""}]</span>
            <span className="text-green-400">WAIT</span>
            <span className="text-white/70">Listening for incoming connections...</span>
          </div>
        </div>
      </div>
    </div>
  );
}
