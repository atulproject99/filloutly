"use client";

import { useState, useEffect } from "react";
import { AdminSidebar } from "./admin-sidebar";
import { AdminTopbar } from "./admin-topbar";
import useUser from "~/hooks/useUser";
import { useRouter } from "next/navigation";
import { Loader2, ShieldAlert } from "lucide-react";
import { Button } from "~/components/ui/button";
import { trpc } from "~/trpc/client";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const utils = trpc.useUtils();
  const [user, error, isLoading, isError] = useUser();

  const signOut = trpc.auth.signOut.useMutation({
    onSuccess: () => {
      utils.auth.getUserInfo.reset();
      window.location.href = "/";
    },
  });

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
      <div className="flex h-screen bg-black text-white items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-red-600" />
          <p className="text-white/60 text-sm">Verifying Access...</p>
        </div>
      </div>
    );
  }

  if (isError || !user) {
    return null;
  }

  if (user.role === "creator") {
    return (
      <div className="flex h-screen bg-black text-white items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-red-900/10 rounded-full blur-[150px] pointer-events-none z-0" />
        <div className="max-w-md w-full bg-white/5 backdrop-blur-xl border border-red-500/20 rounded-3xl p-8 flex flex-col items-center text-center relative z-10">
          <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mb-6">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
          <p className="text-white/60 mb-8">
            You don't have permission to access the admin dashboard. 
          </p>
          <div className="flex flex-col w-full gap-3">
            <Button 
              className="w-full bg-red-600 hover:bg-red-700 text-white" 
              onClick={() => signOut.mutate()}
              disabled={signOut.isPending}
            >
              {signOut.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              Return to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden relative lg:gap-4">
      {/* Deep Cyberpunk / Money Heist ambient glow effect */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-red-900/10 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-red-950/20 rounded-full blur-[180px] pointer-events-none z-0" />
      
      {/* Subtle grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" 
        style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />

      <AdminSidebar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden relative z-10 lg:space-y-4">
        <AdminTopbar setMobileMenuOpen={setMobileMenuOpen} />
        
        {/* Scrollable page content */}
        <main className="flex-1 overflow-y-auto lg:mr-4 lg:mb-4 lg:rounded-3xl bg-black/40 backdrop-blur-3xl relative border-t border-white/5 lg:border lg:border-white/5 shadow-[inset_0_0_100px_rgba(220,38,38,0.02)]">
          <div className="relative z-10 p-4 sm:p-6 lg:p-8 h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
