"use client";

import { motion } from "framer-motion";
import { FileStack, Inbox, MousePointerClick, Zap } from "lucide-react";
import { FormCard } from "~/components/dashboard/form-card";
import { HeroSection } from "~/components/dashboard/hero-section";
import { StatCard } from "~/components/dashboard/stat-card";
import { trpc } from "~/trpc/client";
import { Loader2 } from "lucide-react";

export default function DashboardPage() {
  const { data: analytics, isLoading: isLoadingAnalytics } = trpc.form.getAnalytics.useQuery();
  const { data: forms, isLoading: isLoadingForms } = trpc.form.getForms.useQuery();

  return (
    <div className="space-y-8 pb-10">
      <HeroSection />

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Forms"
          value={isLoadingAnalytics ? "-" : (analytics?.totalForms?.toString() || "0")}
          trend=""
          trendUp={true}
          icon={FileStack}
          delay={0.1}
        />
        <StatCard
          title="Total Responses"
          value={isLoadingAnalytics ? "-" : (analytics?.totalResponses?.toString() || "0")}
          trend=""
          trendUp={true}
          icon={Inbox}
          delay={0.2}
        />
        <StatCard
          title="Published Forms"
          value={isLoadingAnalytics ? "-" : (analytics?.publishedForms?.toString() || "0")}
          trend=""
          trendUp={true}
          icon={MousePointerClick}
          delay={0.3}
        />
        <StatCard
          title="Draft Forms"
          value={isLoadingAnalytics ? "-" : (analytics?.draftForms?.toString() || "0")}
          trend=""
          trendUp={false}
          icon={Zap}
          delay={0.4}
        />
      </div>

      {/* Form Management Area */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-2xl font-bold tracking-tight"
          >
            Recent Forms
          </motion.h2>
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-sm font-medium text-red-400 hover:text-red-300 transition-colors"
          >
            View All
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {isLoadingForms ? (
            <div className="col-span-full py-12 flex justify-center items-center">
              <Loader2 className="w-8 h-8 animate-spin text-red-500" />
            </div>
          ) : forms && forms.length > 0 ? (
            forms.map((form, index) => (
              <FormCard
                key={form.id}
                id={form.id}
                slug={form.slug}
                title={form.title}
                theme={form.theme || "apple-glass"}
                responses={0}
                status={form.status === "published" ? "Published" : "Draft"}
                delay={0.6 + (index * 0.1)}
              />
            ))
          ) : (
            <div className="col-span-full py-12 text-center border border-white/5 border-dashed rounded-2xl bg-white/5">
              <p className="text-white/60">No forms found. Create your first form!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
