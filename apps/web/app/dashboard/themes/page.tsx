"use client";

import { motion } from "framer-motion";
import { Palette } from "lucide-react";
import { EmptyState } from "~/components/dashboard/empty-state";

export default function ThemesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold tracking-tight"
        >
          Theme Marketplace
        </motion.h1>
      </div>

      <EmptyState 
        title="Cinematic Themes"
        description="Explore premium themes like Money Heist, Cyberpunk, Apple Glass, and Startup Minimal to make your forms unforgettable."
        icon={Palette}
        actionLabel="Browse Themes"
        onAction={() => console.log("Browse themes")}
      />
    </div>
  );
}
