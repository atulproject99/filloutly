"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  Users,
  FileText,
  BarChart,
  FileBarChart,
  Palette,
  ShieldAlert,
  Server,
  CreditCard,
  Terminal,
  Settings,
  ChevronLeft,
  ChevronRight,
  X,
  Radio,
} from "lucide-react";
import { cn } from "~/lib/utils";

const adminMenus = [
  { name: "Platform Overview", href: "/admin", icon: Activity },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Forms", href: "/admin/forms", icon: FileText },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart },
  { name: "Reports", href: "/admin/reports", icon: FileBarChart },
  { name: "Themes", href: "/admin/themes", icon: Palette },
  { name: "API Monitoring", href: "/admin/api", icon: Server },
  { name: "System Logs", href: "/admin/logs", icon: Terminal },
];

interface AdminSidebarProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export function AdminSidebar({ mobileMenuOpen, setMobileMenuOpen }: AdminSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname, setMobileMenuOpen]);

  const SidebarContent = (
    <>
      <div className="flex items-center justify-between p-6">
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center space-x-2"
          >
            <Radio className="w-5 h-5 text-red-500 animate-pulse" />
            <span className="text-xl font-black tracking-wider uppercase text-red-500 crimson-text-glow">
              Control
            </span>
          </motion.div>
        )}
        {isCollapsed && (
          <div className="mx-auto w-8 h-8 bg-red-950 border border-red-500/50 rounded-md flex items-center justify-center">
             <Radio className="w-4 h-4 text-red-500 animate-pulse" />
          </div>
        )}
        
        <button 
          className="lg:hidden p-2 text-red-500/60 hover:text-red-500"
          onClick={() => setMobileMenuOpen(false)}
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex-1 px-4 space-y-1 mt-4 overflow-y-auto">
        {adminMenus.map((menu) => {
          const isActive = pathname === menu.href;

          return (
            <Link
              key={menu.name}
              href={menu.href}
              className={cn(
                "group relative flex items-center p-3 rounded-xl transition-all duration-300",
                isActive 
                  ? "text-red-400 bg-red-950/40 border border-red-500/30 shadow-[0_0_15px_rgba(220,38,38,0.15)]" 
                  : "text-white/50 hover:text-red-300 hover:bg-red-950/20 border border-transparent"
              )}
            >
              <menu.icon className={cn("w-5 h-5 z-10 shrink-0", isCollapsed ? "mx-auto" : "mr-4", isActive ? "text-red-400" : "text-white/40 group-hover:text-red-400")} />
              {!isCollapsed && (
                <span className="z-10 font-medium truncate tracking-wide text-sm">{menu.name}</span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto hidden lg:block">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex items-center justify-center w-full p-2 text-white/30 hover:text-red-400 transition-colors rounded-xl hover:bg-red-950/30 border border-transparent hover:border-red-500/20"
        >
          {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>
    </>
  );

  return (
    <>
      <motion.aside
        initial={{ width: 280 }}
        animate={{ width: isCollapsed ? 80 : 280 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "relative hidden lg:flex flex-col h-[calc(100vh-2rem)] my-4 ml-4 rounded-3xl",
          "bg-black/80 backdrop-blur-2xl border border-red-500/20 shadow-[0_0_40px_rgba(220,38,38,0.05)] z-50 overflow-hidden shrink-0"
        )}
      >
        {SidebarContent}
      </motion.aside>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className={cn(
                "fixed top-0 left-0 bottom-0 w-72 flex flex-col z-50 rounded-r-3xl",
                "bg-black/90 backdrop-blur-2xl border-r border-red-500/20 shadow-[0_0_50px_rgba(220,38,38,0.1)] lg:hidden"
              )}
            >
              {SidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
