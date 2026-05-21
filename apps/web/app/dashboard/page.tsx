"use client";

import { motion } from "framer-motion";
import { FileStack, Inbox, MousePointerClick, Zap } from "lucide-react";
import { HeroSection } from "~/components/dashboard/hero-section";
import { StatCard } from "~/components/dashboard/stat-card";
import { FormCard } from "~/components/dashboard/form-card";

export default function DashboardPage() {
  return (
    <div className="space-y-8 pb-10">
      <HeroSection />

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Forms" 
          value="12" 
          trend="2" 
          trendUp={true} 
          icon={FileStack} 
          delay={0.1} 
        />
        <StatCard 
          title="Total Responses" 
          value="84,230" 
          trend="12.5%" 
          trendUp={true} 
          icon={Inbox} 
          delay={0.2} 
        />
        <StatCard 
          title="Avg. Completion Rate" 
          value="72.8%" 
          trend="4.1%" 
          trendUp={true} 
          icon={MousePointerClick} 
          delay={0.3} 
        />
        <StatCard 
          title="Active Workflows" 
          value="5" 
          trend="1" 
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
          <FormCard 
            title="Waitlist & Early Access" 
            theme="Money Heist" 
            responses={12450} 
            status="Published" 
            delay={0.6}
          />
          <FormCard 
            title="Creator Feedback Survey" 
            theme="Apple Glass" 
            responses={824} 
            status="Published" 
            delay={0.7}
          />
          <FormCard 
            title="SaaS Onboarding Flow" 
            theme="Cyberpunk" 
            responses={0} 
            status="Draft" 
            delay={0.8}
          />
        </div>
      </div>
    </div>
  );
}
