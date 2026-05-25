"use client";

import { motion } from "framer-motion";
import { MessageSquare, List, Loader2, Calendar } from "lucide-react";
import { EmptyState } from "~/components/dashboard/empty-state";
import { trpc } from "~/trpc/client";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { format } from "date-fns";

export default function ResponsesPage() {
  const { data: forms, isLoading } = trpc.form.getForms.useQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-white/50" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-8">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold tracking-tight"
        >
          Response Viewer
        </motion.h1>
      </div>

      {!forms || forms.length === 0 ? (
        <EmptyState 
          title="No Forms Yet"
          description="Create a form first to start collecting responses."
          icon={MessageSquare}
          actionLabel="Go to Forms"
          onAction={() => window.location.href = "/dashboard/forms"}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {forms.map((form) => (
            <motion.div
              key={form.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -4 }}
              className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 transition-all hover:bg-white/[0.04] hover:shadow-xl hover:border-red-500/20 group flex flex-col"
            >
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-red-500/10 rounded-xl text-red-400 group-hover:scale-110 group-hover:bg-red-500/20 transition-all">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    form.status === 'published' 
                      ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                      : form.status === 'archived'
                        ? 'bg-gray-500/10 text-gray-400 border border-gray-500/20'
                        : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                  }`}>
                    {form.status.charAt(0).toUpperCase() + form.status.slice(1)}
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-2 line-clamp-1">{form.title}</h3>
                
                {form.description ? (
                  <p className="text-sm text-white/50 mb-4 line-clamp-2">{form.description}</p>
                ) : (
                  <p className="text-sm text-white/30 mb-4 italic">No description</p>
                )}
              </div>
              
              <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center text-xs text-white/40">
                  <Calendar className="w-3.5 h-3.5 mr-1.5" />
                  {format(new Date(form.createdAt), "MMM d, yyyy")}
                </div>
                <Button 
                  asChild 
                  size="sm" 
                  className="bg-white/10 hover:bg-white/20 text-white rounded-lg px-4"
                >
                  <Link href={`/dashboard/forms/${form.id}/responses`}>
                    <List className="w-4 h-4 mr-2" />
                    View Responses
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
