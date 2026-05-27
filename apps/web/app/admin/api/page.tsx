"use client";

import { motion } from "framer-motion";
import { Server, Activity, ArrowUpRight, ArrowDownRight, Zap } from "lucide-react";

const endpoints = [
  { path: "/api/trpc/form.createForm", method: "POST", latency: "142ms", status: 200, calls: "2.1k/min" },
  { path: "/api/trpc/form.getForms", method: "GET", latency: "89ms", status: 200, calls: "8.4k/min" },
  { path: "/api/trpc/form.submitResponse", method: "POST", latency: "215ms", status: 200, calls: "12.5k/min" },
  { path: "/api/trpc/form.getAnalytics", method: "GET", latency: "412ms", status: 200, calls: "450/min" },
  { path: "/api/webhooks/stripe", method: "POST", latency: "1.2s", status: 400, calls: "12/min", error: true },
];

export default function AdminApiPage() {
  return (
    <div className="space-y-6 pb-10">
      <div className="flex items-center justify-between mb-8">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-black tracking-tighter uppercase text-white"
        >
          API Monitoring
        </motion.h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { title: "Avg Latency", value: "142ms", trend: "-12ms", icon: Activity, good: true },
          { title: "Uptime", value: "99.99%", trend: "0%", icon: Server, good: true },
          { title: "Error Rate", value: "0.12%", trend: "+0.04%", icon: Zap, good: false },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-black/40 border border-red-500/20 rounded-2xl p-6 backdrop-blur-xl"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-red-950/30 rounded-xl text-red-400">
                <stat.icon className="w-5 h-5" />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold ${stat.good ? 'text-green-400' : 'text-red-400'}`}>
                {stat.good ? <ArrowDownRight className="w-3 h-3" /> : <ArrowUpRight className="w-3 h-3" />}
                {stat.trend}
              </div>
            </div>
            <h3 className="text-sm font-medium text-white/50 mb-1">{stat.title}</h3>
            <div className="text-3xl font-black text-white">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      <div className="bg-black/40 border border-red-500/20 rounded-2xl overflow-hidden backdrop-blur-xl">
        <div className="px-6 py-4 border-b border-red-500/20 bg-red-950/10">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">Active Endpoints</h2>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 bg-white/[0.02]">
              <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-white/40">Method</th>
              <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-white/40">Endpoint</th>
              <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-white/40">Status</th>
              <th className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-white/40">Latency</th>
              <th className="px-6 py-3 text-right text-xs font-bold uppercase tracking-wider text-white/40">Throughput</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {endpoints.map((ep, i) => (
              <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-6 py-4">
                  <span className={`text-[10px] font-black tracking-widest px-2 py-1 rounded bg-white/10 ${
                    ep.method === 'GET' ? 'text-blue-400' : 'text-green-400'
                  }`}>
                    {ep.method}
                  </span>
                </td>
                <td className="px-6 py-4 font-mono text-sm text-white/80">{ep.path}</td>
                <td className="px-6 py-4">
                  <span className={`flex items-center gap-2 text-sm font-bold ${ep.error ? 'text-red-400' : 'text-green-400'}`}>
                    <div className={`w-2 h-2 rounded-full ${ep.error ? 'bg-red-400 animate-pulse' : 'bg-green-400'}`} />
                    {ep.status}
                  </span>
                </td>
                <td className="px-6 py-4 font-mono text-sm text-white/60">{ep.latency}</td>
                <td className="px-6 py-4 text-right font-mono text-sm text-white/40">{ep.calls}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
