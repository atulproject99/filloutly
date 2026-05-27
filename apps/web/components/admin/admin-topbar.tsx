"use client";

import { useState } from "react";
import { ShieldCheck, Menu, LogOut, Loader2, User } from "lucide-react";
import { cn } from "~/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import { trpc } from "~/trpc/client";

interface AdminTopbarProps {
  setMobileMenuOpen: (open: boolean) => void;
}

export function AdminTopbar({ setMobileMenuOpen }: AdminTopbarProps) {
  const utils = trpc.useUtils();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const { data: user, isLoading } = trpc.auth.getUserInfo.useQuery();

  const signOut = trpc.auth.signOut.useMutation({
    onSuccess: () => {
      utils.auth.getUserInfo.reset();
      window.location.href = "/";
    },
  });

  return (
    <header className={cn(
      "h-16 lg:mt-4 lg:mr-4 lg:rounded-3xl shrink-0 flex items-center justify-between px-4 lg:px-6",
      "bg-black/60 backdrop-blur-xl border border-white/5 border-b lg:border-b-white/5 rounded-none z-30"
    )}>
      <div className="flex items-center">
        <button 
          className="lg:hidden p-2 -ml-2 mr-2 text-white/60 hover:text-red-400 transition-colors rounded-xl"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
        
        <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 bg-red-950/30 border border-red-500/20 rounded-full">
          <ShieldCheck className="w-4 h-4 text-green-500" />
          <span className="text-xs font-mono text-green-400">SYSTEM SECURE</span>
        </div>
      </div>
      
      <div className="flex-1" />
      
      <div className="flex items-center space-x-2 lg:space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-red-800 text-white font-medium text-sm overflow-hidden border border-white/10 ml-2 hover:ring-2 hover:ring-red-500/50 transition-all">
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : user?.profileImageUrl ? (
                <img
                  src={user.profileImageUrl}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-4 h-4" />
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 glass-panel border-white/10 text-white">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.fullName || "Admin"}</p>
                <p className="text-xs leading-none text-white/50">{user?.email || "Loading..."}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem
              className="text-red-400 focus:text-red-300 focus:bg-red-500/10 cursor-pointer"
              onSelect={(e) => {
                e.preventDefault();
                setShowLogoutDialog(true);
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent className="bg-[#0a0a0a] border border-white/10 text-white glass-card">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
            <AlertDialogDescription className="text-neutral-400">
              You will be securely logged out and returned to the main screen. You'll need to authenticate again to access this dashboard.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-transparent border-white/10 text-white hover:bg-white/5">Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={(e) => {
                e.preventDefault();
                signOut.mutate();
              }}
              disabled={signOut.isPending}
              className="bg-red-600 hover:bg-red-500 text-white"
            >
              {signOut.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              Log out
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </header>
  );
}
