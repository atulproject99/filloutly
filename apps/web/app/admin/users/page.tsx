"use client";

import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { AdminEmptyState } from "~/components/admin/admin-empty-state";

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-black tracking-tighter uppercase text-white"
        >
          User Management
        </motion.h1>
      </div>

      <AdminEmptyState 
        title="Creator Database"
        description="Premium glass data grid for creator profiles, usage stats, and active plans will initialize here. Awaiting database connection."
        icon={Users}
        actionLabel="Initialize Database"
        onAction={() => console.log("Init DB")}
      />
    </div>
  );
}
