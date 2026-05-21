"use client";

import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";
import { EmptyState } from "~/components/dashboard/empty-state";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold tracking-tight"
        >
          Analytics Intelligence
        </motion.h1>
      </div>

      <EmptyState 
        title="Mission Control Center"
        description="Heatmaps, completion funnels, and advanced device breakdowns will appear here once you publish your first form and receive traffic."
        icon={BarChart3}
        actionLabel="Create a Form"
        onAction={() => console.log("Create form")}
      />
    </div>
  );
}
