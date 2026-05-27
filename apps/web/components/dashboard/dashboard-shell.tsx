"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";
import useUser from "~/hooks/useUser";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const [user, error, isLoading, isError] = useUser();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isLoading && (isError || !user)) {
      router.push("/");
    }
  }, [isLoading, isError, user, router]);

  if (!isMounted) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex h-screen bg-[#0a0a0a] text-white items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-white/60 text-sm">Authenticating...</p>
        </div>
      </div>
    );
  }

  // Prevent flashing the dashboard content while redirecting
  if (isError || !user) {
    return null;
  }

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-white overflow-hidden relative p-2 sm:p-4 gap-2 sm:gap-4">
      {/* Background ambient glow effect */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-red-900/10 rounded-full blur-[150px] pointer-events-none" />

      <Sidebar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden relative z-10 gap-2 sm:gap-4">
        <Topbar setMobileMenuOpen={setMobileMenuOpen} />
        
        {/* Scrollable page content */}
        <main className="flex-1 overflow-y-auto rounded-2xl sm:rounded-3xl glass-panel relative border border-white/5">
          <div className="absolute inset-0 bg-black/20 pointer-events-none rounded-2xl sm:rounded-3xl" />
          <div className="relative z-10 p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
