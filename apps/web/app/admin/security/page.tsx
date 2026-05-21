"use client";

import { motion } from "framer-motion";
import { ShieldAlert } from "lucide-react";
import { AdminEmptyState } from "~/components/admin/admin-empty-state";

export default function SecurityPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-black tracking-tighter uppercase text-white"
        >
          Security Center
        </motion.h1>
      </div>

      <AdminEmptyState 
        title="Threat Detected"
        description="Multiple failed login attempts detected from unknown IP ranges. Initiating automated countermeasures."
        icon={ShieldAlert}
        actionLabel="Lock Down Network"
        onAction={() => console.log("Lock down")}
        alert={true}
      />
    </div>
  );
}
