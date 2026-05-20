"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "~/components/ui/button";
import { AuthDialog } from "~/components/auth/AuthDialog";

export function FinalCTA() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <section className="py-32 relative bg-transparent overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(220,38,38,0.15)_0%,transparent_50%)] pointer-events-none" />
      
      <div className="container mx-auto px-6 lg:px-8 max-w-5xl relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-3xl glass-card p-12 md:p-20 border border-red-500/20 shadow-[0_0_80px_rgba(220,38,38,0.15)] relative overflow-hidden"
        >
          {/* Subtle grid pattern inside card */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none" />
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
              Build forms people <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600 crimson-text-glow">actually remember.</span>
            </h2>
            <p className="text-xl text-neutral-400 mb-10 max-w-2xl mx-auto">
              Stop using generic tools. Start building cinematic experiences today. Join the elite creator community.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button onClick={() => setIsAuthOpen(true)} size="lg" className="h-14 px-8 text-lg bg-red-600 hover:bg-red-500 text-white rounded-xl shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-transform hover:scale-105 w-full sm:w-auto">
                Start Free
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-white/20 text-white hover:bg-white/10 glass-panel rounded-xl transition-transform hover:scale-105 w-full sm:w-auto">
                Explore Templates
              </Button>
            </div>
            <AuthDialog isOpen={isAuthOpen} onOpenChange={setIsAuthOpen} initialView="register" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
