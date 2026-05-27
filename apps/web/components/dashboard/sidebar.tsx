"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  Copy,
  Palette,
  MessageSquare,
  BarChart3,
  Compass,
  Settings,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { cn } from "~/lib/utils";
import { trpc } from "~/trpc/client";

const menus = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Forms", href: "/dashboard/forms", icon: FileText },
  { name: "Templates", href: "/dashboard/templates", icon: Copy },
  { name: "Themes", href: "/dashboard/themes", icon: Palette },
  { name: "Responses", href: "/dashboard/responses", icon: MessageSquare },
  // { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
];

interface SidebarProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export function Sidebar({ mobileMenuOpen, setMobileMenuOpen }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const utils = trpc.useUtils();

  // Close mobile menu when route changes
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
            className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-800"
          >
            Filloutly
          </motion.div>
        )}
        {isCollapsed && (
          <div className="mx-auto w-8 h-8 bg-gradient-to-br from-red-500 to-red-800 rounded-full" />
        )}
        
        {/* Mobile Close Button */}
        <button 
          className="lg:hidden p-2 text-white/60 hover:text-white"
          onClick={() => setMobileMenuOpen(false)}
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
        {menus.map((menu) => {
          let isActive = false;
          if (menu.href === "/dashboard") {
            isActive = pathname === "/dashboard";
          } else if (menu.name === "Responses") {
            isActive = pathname.startsWith("/dashboard/responses") || pathname.includes("/responses");
          } else if (menu.name === "My Forms") {
            isActive = pathname.startsWith("/dashboard/forms") && !pathname.includes("/responses");
          } else {
            isActive = pathname.startsWith(menu.href);
          }

          return (
            <Link
              key={menu.name}
              href={menu.href}
              onClick={(e) => {
                if (menu.name === "My Forms") {
                  utils.form.getForms.invalidate();
                } else if (menu.name === "Responses") {
                  utils.form.getForms.invalidate();
                  utils.form.getResponses.invalidate();
                }
              }}
              className={cn(
                "group relative flex items-center p-3 rounded-2xl transition-colors",
                isActive ? "text-white" : "text-white/60 hover:text-white hover:bg-white/5"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="active-sidebar-item"
                  className="absolute inset-0 bg-red-500/10 rounded-2xl border border-red-500/20"
                  initial={false}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <menu.icon className={cn("w-5 h-5 z-10 shrink-0", isCollapsed ? "mx-auto" : "mr-4")} />
              {!isCollapsed && (
                <span className="z-10 font-medium truncate">{menu.name}</span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto hidden lg:block">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex items-center justify-center w-full p-2 text-white/50 hover:text-white transition-colors rounded-xl hover:bg-white/5"
        >
          {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        initial={{ width: 260 }}
        animate={{ width: isCollapsed ? 80 : 260 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "relative hidden lg:flex flex-col h-full rounded-3xl",
          "glass-panel border-l-red-500/20 z-50 overflow-hidden shrink-0"
        )}
      >
        {SidebarContent}
      </motion.aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className={cn(
                "fixed top-0 left-0 bottom-0 w-72 flex flex-col z-50 rounded-r-3xl",
                "glass-panel border-l-red-500/20 lg:hidden"
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
