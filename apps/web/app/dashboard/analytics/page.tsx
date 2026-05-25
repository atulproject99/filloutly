"use client";

import { motion } from "framer-motion";
import { BarChart3, FileText, CheckCircle, Clock, Users, ArrowUpRight, Loader2 } from "lucide-react";
import { trpc } from "~/trpc/client";
import { format } from "date-fns";

export default function AnalyticsPage() {
  const { data: analytics, isLoading } = trpc.form.getAnalytics.useQuery();

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
          Analytics Intelligence
        </motion.h1>
      </div>

      {!analytics ? (
        <div className="p-8 text-center bg-white/5 border border-white/10 rounded-2xl">
          <p className="text-white/50">Failed to load analytics data.</p>
        </div>
      ) : (
        <>
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Forms */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-white/60">Total Forms</p>
                <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                  <FileText className="w-4 h-4" />
                </div>
              </div>
              <h3 className="text-4xl font-bold text-white">{analytics.totalForms}</h3>
            </motion.div>

            {/* Total Responses */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-white/60">Total Responses</p>
                <div className="p-2 bg-red-500/20 rounded-lg text-red-400">
                  <Users className="w-4 h-4" />
                </div>
              </div>
              <h3 className="text-4xl font-bold text-white">{analytics.totalResponses}</h3>
            </motion.div>

            {/* Published Forms */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-white/60">Published Forms</p>
                <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400">
                  <CheckCircle className="w-4 h-4" />
                </div>
              </div>
              <h3 className="text-4xl font-bold text-white">{analytics.publishedForms}</h3>
            </motion.div>

            {/* Draft Forms */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-gray-500/10 to-slate-500/10 border border-gray-500/20 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-white/60">Draft Forms</p>
                <div className="p-2 bg-gray-500/20 rounded-lg text-gray-400">
                  <Clock className="w-4 h-4" />
                </div>
              </div>
              <h3 className="text-4xl font-bold text-white">{analytics.draftForms}</h3>
            </motion.div>
          </div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 mt-8"
          >
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <ArrowUpRight className="w-5 h-5 mr-2 text-red-500" />
              Recent Submissions
            </h2>
            
            {analytics.recentResponses && analytics.recentResponses.length > 0 ? (
              <div className="space-y-4">
                {analytics.recentResponses.map((response: any) => (
                  <div key={response.id} className="flex items-center justify-between p-4 bg-white/[0.02] hover:bg-white/[0.04] transition-colors rounded-xl border border-white/5">
                    <div className="flex flex-col">
                      <span className="font-medium text-white">New response recorded</span>
                      <span className="text-sm text-white/50">Form ID: {response.formId.slice(0, 8)}...</span>
                    </div>
                    <span className="text-sm text-white/40">
                      {format(new Date(response.submittedAt), "MMM d, h:mm a")}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-8 text-white/40 italic bg-black/20 rounded-xl">
                No recent activity to display.
              </div>
            )}
          </motion.div>
        </>
      )}
    </div>
  );
}
