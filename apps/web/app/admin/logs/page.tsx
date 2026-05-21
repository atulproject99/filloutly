"use client";

import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import { AdminEmptyState } from "~/components/admin/admin-empty-state";

export default function LogsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-black tracking-tighter uppercase text-white"
        >
          System Logs
        </motion.h1>
      </div>

      <AdminEmptyState 
        title="Live Stream Inactive"
        description="The developer console is currently offline. Connect to the WebSocket stream to view live backend logs."
        icon={Terminal}
        actionLabel="Connect Terminal"
        onAction={() => console.log("Connect")}
      />
    </div>
  );
}
