"use client";

import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Terminal } from "lucide-react";

const data = [
  { time: "00:00", requests: 4000, latency: 24 },
  { time: "04:00", requests: 3000, latency: 22 },
  { time: "08:00", requests: 2000, latency: 18 },
  { time: "12:00", requests: 2780, latency: 39 },
  { time: "16:00", requests: 1890, latency: 48 },
  { time: "20:00", requests: 2390, latency: 38 },
  { time: "24:00", requests: 3490, latency: 43 },
];

export function LiveActivityChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="col-span-1 lg:col-span-3 xl:col-span-4 bg-black/60 backdrop-blur-xl border border-white/5 rounded-3xl p-6 relative overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/5 to-transparent z-0 pointer-events-none" />
      
      <div className="relative z-10 flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-red-950/50 border border-red-500/30 rounded-lg">
            <Terminal className="w-5 h-5 text-red-500" />
          </div>
          <div>
            <h3 className="font-mono text-lg text-white font-bold tracking-tight">API_TRAFFIC_MONITOR</h3>
            <p className="text-xs font-mono text-white/40">Live requests & system latency</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          <span className="text-xs font-mono text-red-400">LIVE</span>
        </div>
      </div>

      <div className="h-[300px] w-full relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
            <XAxis dataKey="time" stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000}k`} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#000000e0', borderColor: '#ef444440', borderRadius: '12px', color: '#fff' }}
              itemStyle={{ color: '#ef4444' }}
            />
            <Line 
              type="monotone" 
              dataKey="requests" 
              stroke="#ef4444" 
              strokeWidth={3}
              dot={{ r: 4, fill: '#000', stroke: '#ef4444', strokeWidth: 2 }}
              activeDot={{ r: 6, fill: '#ef4444', stroke: '#000', strokeWidth: 2 }}
              style={{ filter: 'drop-shadow(0 0 8px rgba(239, 68, 68, 0.5))' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
