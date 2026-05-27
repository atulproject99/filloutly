"use client";

import { motion } from "framer-motion";
import { Play, Share2, BarChart2, Edit3 } from "lucide-react";
import { cn } from "~/lib/utils";
import Link from "next/link";
import { toast } from "sonner";

interface FormCardProps {
  id: string;
  slug?: string | null;
  title: string;
  theme: string;
  responses: number;
  status: "Published" | "Draft";
  delay?: number;
}

export function FormCard({ id, slug, title, theme, responses, status, delay = 0 }: FormCardProps) {
  const isPublished = status === "Published";

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!slug) {
      toast.error("Form doesn't have a public link yet. Publish it first.");
      return;
    }
    const url = `${window.location.origin}/f/${slug}`;
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard!");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group relative flex flex-col glass-card rounded-3xl overflow-hidden border border-white/5 hover:border-red-500/30 transition-colors"
    >
      {/* Form Preview Area (Mocked) */}
      <div className="h-40 bg-gradient-to-br from-white/5 to-white/10 relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-black/20" />
        {/* Subtle cinematic red glow on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-red-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10 w-3/4 h-24 glass-panel rounded-xl shadow-2xl flex flex-col space-y-2 p-3 transform group-hover:scale-105 transition-transform duration-500">
          <div className="h-2 w-1/3 bg-white/20 rounded-full" />
          <div className="h-2 w-full bg-white/10 rounded-full mt-auto" />
          <div className="h-2 w-2/3 bg-white/10 rounded-full" />
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg text-white group-hover:text-red-100 transition-colors line-clamp-1">{title}</h3>
        </div>
        
        <div className="flex items-center space-x-2 mb-6">
          <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-white/10 text-white/70 border border-white/5">
            {theme}
          </span>
          <span className={cn(
            "text-xs font-medium px-2 py-0.5 rounded-md border",
            isPublished ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
          )}>
            {status}
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-white/50">Responses</span>
            <span className="font-medium text-white">{responses.toLocaleString()}</span>
          </div>

          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
            <Link href={`/dashboard/forms/${id}/responses`} className="p-2 text-white/60 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-colors tooltip-trigger" title="Analytics">
              <BarChart2 className="w-4 h-4" />
            </Link>
            <button onClick={handleShare} className="p-2 text-white/60 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-colors" title="Share">
              <Share2 className="w-4 h-4" />
            </button>
            <Link href={`/dashboard/forms/${id}/builder`} className="p-2 text-white hover:text-white bg-red-600/80 hover:bg-red-500 rounded-xl transition-colors shadow-lg shadow-red-500/20" title="Edit">
              <Edit3 className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
