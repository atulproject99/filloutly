"use client";

import { motion } from "framer-motion";
import { ShieldAlert } from "lucide-react";
import { AdminEmptyState } from "~/components/admin/admin-empty-state";

export default function ModerationPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-black tracking-tighter uppercase text-white"
        >
          Form Moderation
        </motion.h1>
      </div>

      <AdminEmptyState 
        title="Zero Active Threats"
        description="No reported forms or abusive submissions detected in the last 24 hours. The moderation queue is empty."
        icon={ShieldAlert}
        actionLabel="Run Manual Scan"
        onAction={() => console.log("Scan")}
        alert={false}
      />
    </div>
  );
}
