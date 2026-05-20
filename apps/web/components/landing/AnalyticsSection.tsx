"use client";

import { motion } from "framer-motion";
import { Activity, Globe, MousePointerClick, Clock } from "lucide-react";

export function AnalyticsSection() {
  return (
    <section className="py-32 relative bg-transparent overflow-hidden" id="analytics">
      {/* Background gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-red-900/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Insights that feel <br/>
            <span className="text-neutral-500">like mission control</span>
          </motion.h2>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            Stop guessing. Our real-time analytics dashboard gives you god-mode visibility into every interaction, heatmap, and drop-off point.
          </p>
        </div>

        <div className="rounded-3xl glass-card p-6 md:p-10 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/20 blur-[80px] rounded-full pointer-events-none" />

          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Main Chart Area */}
            <div className="flex-1 space-y-8">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">Audience Engagement</h3>
                  <p className="text-sm text-neutral-500">Live data streaming • Secure Connection</p>
                </div>
                <div className="flex gap-2">
                  <div className="px-3 py-1 rounded-md bg-white/5 text-xs text-white border border-white/10 cursor-pointer hover:bg-white/10">24H</div>
                  <div className="px-3 py-1 rounded-md bg-red-600 text-xs text-white shadow-[0_0_10px_rgba(220,38,38,0.4)] cursor-pointer">7D</div>
                  <div className="px-3 py-1 rounded-md bg-white/5 text-xs text-white border border-white/10 cursor-pointer hover:bg-white/10">30D</div>
                </div>
              </div>

              {/* Big Mock Chart */}
              <div className="h-64 flex items-end gap-3 pt-8 border-b border-white/5 relative">
                <div className="absolute top-0 left-0 right-0 border-t border-white/5 border-dashed" />
                <div className="absolute top-1/2 left-0 right-0 border-t border-white/5 border-dashed" />
                
                {[30, 45, 60, 40, 70, 85, 65, 90, 75, 100, 80, 60, 50, 70, 40, 60].map((h, i) => (
                  <motion.div 
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.05 }}
                    className="flex-1 bg-gradient-to-t from-red-600/10 via-red-500/50 to-red-500 rounded-t-sm relative group"
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/80 px-2 py-1 rounded text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 border border-white/10">
                      {h * 12} Views
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Side Widgets Area */}
            <div className="w-full lg:w-80 space-y-4">
              
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-red-500/30 transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-red-500/20 text-red-400">
                    <Activity className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium text-neutral-300">Completion Rate</span>
                </div>
                <div className="text-3xl font-bold text-white mb-2">94.2%</div>
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "94.2%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]" 
                  />
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-red-500/30 transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                    <Clock className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium text-neutral-300">Avg. Time to Complete</span>
                </div>
                <div className="text-3xl font-bold text-white mb-2">1m 12s</div>
                <div className="text-xs text-green-400">-14s vs industry average</div>
              </motion.div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                  <Globe className="w-5 h-5 text-neutral-400 mx-auto mb-2" />
                  <div className="text-xl font-bold text-white">42</div>
                  <div className="text-xs text-neutral-500">Countries</div>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                  <MousePointerClick className="w-5 h-5 text-neutral-400 mx-auto mb-2" />
                  <div className="text-xl font-bold text-white">8.5k</div>
                  <div className="text-xs text-neutral-500">Clicks</div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
