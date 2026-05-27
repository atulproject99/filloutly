"use client";

import { Bell, Loader2, LogOut, Menu, Search, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { cn } from "~/lib/utils";
import { trpc } from "~/trpc/client";

interface TopbarProps {
  setMobileMenuOpen: (open: boolean) => void;
}

export function Topbar({ setMobileMenuOpen }: TopbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const utils = trpc.useUtils();
  const { data: user, isLoading } = trpc.auth.getUserInfo.useQuery();

  let activeTitle = "Dashboard";
  if (pathname.includes("/responses")) {
    activeTitle = "Responses";
  } else if (pathname.startsWith("/dashboard/forms")) {
    activeTitle = "My Forms";
  } else if (pathname.startsWith("/dashboard/templates")) {
    activeTitle = "Templates";
  } else if (pathname.startsWith("/dashboard/themes")) {
    activeTitle = "Themes";
  }
  const signOut = trpc.auth.signOut.useMutation({
    onSuccess: () => {
      utils.auth.getUserInfo.reset();

      window.location.href = "/";
    },
  });

  return (
    <header
      className={cn(
        "h-16 rounded-2xl sm:rounded-3xl shrink-0 flex items-center justify-between px-4 lg:px-6",
        "glass-panel border-white/5 border z-30",
      )}
    >
      <div className="flex items-center">
        <button
          className="lg:hidden p-2 -ml-2 mr-2 text-white/60 hover:text-white transition-colors rounded-xl hover:bg-white/5"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="flex items-center space-x-3">
          <span className="lg:hidden font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-800 text-lg">
            Filloutly
          </span>
          <div className="lg:hidden w-px h-4 bg-white/20" />
          <h1 className="text-lg font-semibold tracking-tight text-white/90">
            {activeTitle}
          </h1>
        </div>
      </div>

      <div className="flex-1" />

      <div className="flex items-center space-x-2 lg:space-x-4">
        <button className="hidden sm:block p-2 text-white/60 hover:text-white transition-colors rounded-xl hover:bg-white/5">
          <Search className="w-5 h-5" />
        </button>
        <button className="relative p-2 text-white/60 hover:text-white transition-colors rounded-xl hover:bg-white/5">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full crimson-glow" />
        </button>
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
                <p className="text-sm font-medium leading-none">{user?.fullName || "User"}</p>
                <p className="text-xs leading-none text-white/50">{user?.email || "Loading..."}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem
              className="text-red-400 focus:text-red-300 focus:bg-red-500/10 cursor-pointer"
              onClick={() => signOut.mutate()}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
