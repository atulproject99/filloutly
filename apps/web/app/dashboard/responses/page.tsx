"use client";

import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";
import { EmptyState } from "~/components/dashboard/empty-state";

export default function ResponsesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold tracking-tight"
        >
          Response Viewer
        </motion.h1>
      </div>

      <EmptyState 
        title="No Responses Yet"
        description="Share your forms with your audience. Once they start filling them out, their responses will appear here in beautiful, expandable glass cards."
        icon={MessageSquare}
        actionLabel="Share Form"
        onAction={() => console.log("Share form")}
      />
    </div>
  );
}
