"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "~/components/ui/button";
import { ChevronRight, Play, Users, Zap, Terminal } from "lucide-react";
import { AuthDialog } from "~/components/auth/AuthDialog";

export function HeroSection() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden bg-transparent">

      <div className="relative z-10 container mx-auto px-6 lg:px-8 flex flex-col xl:flex-row items-center gap-16 xl:gap-8 max-w-7xl">
        
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex-1 text-center xl:text-left pt-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-8 border-red-500/30">
            <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-sm font-medium text-red-200">Filloutly 2.0 is live</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
            Turn Forms Into <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600 crimson-text-glow">Experiences</span>
          </h1>
          
          <p className="text-lg md:text-xl text-neutral-400 mb-10 max-w-2xl mx-auto xl:mx-0 leading-relaxed">
            Build immersive forms inspired by movies, anime, hacker culture, startups and creator communities. The secret weapon for elite creators.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center xl:justify-start gap-4">
            <Button onClick={() => setIsAuthOpen(true)} size="lg" className="h-14 px-8 text-base bg-white text-black hover:bg-neutral-200 rounded-xl transition-transform hover:scale-105 w-full sm:w-auto">
              Start Building
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-base border-white/20 text-white hover:bg-white/10 glass-panel rounded-xl transition-transform hover:scale-105 w-full sm:w-auto gap-2">
              <Play className="w-4 h-4" /> Explore Themes
            </Button>
          </div>
          <AuthDialog isOpen={isAuthOpen} onOpenChange={setIsAuthOpen} initialView="register" />
          
          {/* Mini social proof */}
          <div className="mt-12 flex items-center justify-center xl:justify-start gap-4 text-sm text-neutral-500">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-neutral-800" />
              ))}
            </div>
            <span>Joined by 10,000+ creators</span>
          </div>
        </motion.div>

        {/* Right Dashboard Preview */}
        <motion.div 
          initial={{ opacity: 0, y: 100, rotateX: 20 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1.2, delay: 0.4, type: "spring" }}
          style={{ perspective: "1000px" }}
          className="flex-1 w-full max-w-2xl xl:max-w-none relative"
        >
          <div className="relative rounded-2xl glass-card p-4 border border-white/10 overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            
            {/* Cinematic Reflection Sweep */}
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 pointer-events-none" />
            
            {/* Window Controls */}
            <div className="flex items-center gap-2 mb-6 px-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <div className="ml-4 text-xs text-neutral-500 font-mono flex items-center gap-2">
                <Terminal className="w-3 h-3" /> vault_control_panel.sh
              </div>
            </div>

            {/* Dashboard Mockup Grid */}
            <div className="grid grid-cols-2 gap-4">
              
              {/* Main Chart Card */}
              <div className="col-span-2 rounded-xl bg-black/40 border border-white/5 p-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  {/* Subtle mask icon abstraction */}
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-red-500"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <div className="text-neutral-400 text-sm mb-1">Live Responses</div>
                    <div className="text-3xl font-bold text-white">2,492</div>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-medium border border-red-500/30">
                    +14.5% 
                  </div>
                </div>
                {/* Mock Chart */}
                <div className="h-32 flex items-end gap-2">
                  {[40, 70, 45, 90, 65, 85, 120, 80, 50, 100].map((h, i) => (
                    <motion.div 
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ duration: 1, delay: 0.8 + i * 0.1 }}
                      className="flex-1 bg-gradient-to-t from-red-600/20 to-red-500 rounded-t-sm"
                    />
                  ))}
                </div>
              </div>

              {/* Smaller Cards */}
              <div className="rounded-xl bg-black/40 border border-white/5 p-5 hover:bg-white/5 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center mb-4 text-neutral-300">
                  <Zap className="w-4 h-4" />
                </div>
                <div className="text-neutral-400 text-sm mb-1">Conversion Rate</div>
                <div className="text-2xl font-bold text-white">68.2%</div>
              </div>

              <div className="rounded-xl bg-black/40 border border-white/5 p-5 hover:bg-white/5 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center mb-4 text-neutral-300">
                  <Users className="w-4 h-4" />
                </div>
                <div className="text-neutral-400 text-sm mb-1">Active Viewers</div>
                <div className="text-2xl font-bold text-white">1,024</div>
              </div>

            </div>

            {/* Floating Widget overlay */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-8 top-1/3 glass-panel p-4 rounded-xl hidden md:flex items-center gap-4 border-red-500/20 crimson-glow"
            >
              <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white">
                <ChevronRight className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">New Submission</div>
                <div className="text-xs text-neutral-400">Tokyo Region • Just now</div>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
