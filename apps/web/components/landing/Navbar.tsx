"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { AuthDialog } from "~/components/auth/AuthDialog";

export function Navbar() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authView, setAuthView] = useState<"login" | "register">("login");

  const openAuth = (view: "login" | "register") => {
    setAuthView(view);
    setIsAuthOpen(true);
  };

  return (
    <>
      <motion.nav 
        initial={{ y: -100, opacity: 0, x: "-50%" }}
        animate={{ y: 0, opacity: 1, x: "-50%" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-4 left-1/2 w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] lg:w-[1200px] z-50 flex items-center justify-between px-6 py-4 rounded-2xl glass-panel"
      >
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 rounded-xl bg-gradient-to-br from-red-500 to-red-800 flex items-center justify-center crimson-glow overflow-hidden">
            <div className="absolute inset-0 bg-white/20 blur-sm mix-blend-overlay"></div>
            <div className="w-3 h-3 bg-white rounded-full shadow-[0_0_10px_white]"></div>
          </div>
          <span className="text-xl font-bold tracking-tight text-white">Filloutly</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-400">
          <Link href="#features" className="hover:text-white transition-colors">Features</Link>
          <Link href="#themes" className="hover:text-white transition-colors">Themes</Link>
          <Link href="#templates" className="hover:text-white transition-colors">Templates</Link>
          <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
          <Link href="#docs" className="hover:text-white transition-colors">Docs</Link>
        </div>

        <div className="flex items-center gap-4">
          <Button onClick={() => openAuth("login")} variant="ghost" className="text-neutral-300 hover:text-white hover:bg-white/10 hidden sm:flex">
            Login
          </Button>
          <Button onClick={() => openAuth("register")} className="bg-red-600 hover:bg-red-500 text-white shadow-[0_0_20px_rgba(220,38,38,0.4)] border border-red-500/50 transition-all duration-300 hover:scale-105 rounded-xl px-6">
            Start Free
          </Button>
        </div>
      </motion.nav>

      <AuthDialog 
        isOpen={isAuthOpen} 
        onOpenChange={setIsAuthOpen} 
        initialView={authView} 
      />
    </>
  );
}
