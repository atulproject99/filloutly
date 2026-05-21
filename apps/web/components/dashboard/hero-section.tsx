"use client";

import { motion } from "framer-motion";
import { Sparkles, TrendingUp, Users } from "lucide-react";

export function HeroSection() {
  return (
    <div className="relative overflow-hidden rounded-3xl glass-card p-8 md:p-12 mb-8 border-red-500/10">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-black/40 to-black/80 z-0" />
      
      {/* Floating Orbs */}
      <motion.div 
        animate={{ 
          y: [0, -20, 0],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-10 right-[20%] w-32 h-32 bg-red-600/20 rounded-full blur-[60px]"
      />
      <motion.div 
        animate={{ 
          y: [0, 30, 0],
          x: [0, -20, 0],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-10 left-[40%] w-48 h-48 bg-red-800/20 rounded-full blur-[80px]"
      />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-red-500/10 border border-red-500/20 rounded-full px-3 py-1 mb-4"
          >
            <Sparkles className="w-4 h-4 text-red-400" />
            <span className="text-xs font-medium text-red-200">Creator Mode Active</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-4 tracking-tight"
          >
            Welcome back, <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-red-600 crimson-text-glow">Atul</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/60 text-lg max-w-xl"
          >
            Your forms are performing exceptionally well today. Engagement is up by 24% across all cinematic themes.
          </motion.p>
        </div>

        {/* Floating Mini Stats */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 w-full md:w-auto"
        >
          <div className="glass-panel p-4 rounded-2xl flex items-center space-x-4 border-white/5">
            <div className="p-3 bg-red-500/20 rounded-xl">
              <Users className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <p className="text-sm text-white/50">Live Viewers</p>
              <p className="text-2xl font-bold">1,248</p>
            </div>
          </div>
          
          <div className="glass-panel p-4 rounded-2xl flex items-center space-x-4 border-white/5">
            <div className="p-3 bg-green-500/20 rounded-xl">
              <TrendingUp className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-sm text-white/50">Completion</p>
              <p className="text-2xl font-bold">68.4%</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
