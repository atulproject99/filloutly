"use client";

import { motion } from "framer-motion";
import { FileText, Eye, ShieldAlert, Trash2, Loader2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { trpc } from "~/trpc/client";

export default function AdminFormsPage() {
  const { data: forms, isLoading } = trpc.admin.getGlobalForms.useQuery();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-black tracking-tighter uppercase text-white"
        >
          Global Forms
        </motion.h1>
      </div>

      <div className="bg-black/40 border border-red-500/20 rounded-2xl overflow-hidden backdrop-blur-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-red-500/20 bg-red-950/20">
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-white/50">Form ID</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-white/50">Title</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-white/50">Creator</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-white/50">Responses</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-white/50">Status</th>
              <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-white/50">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-red-500/10">
            {isLoading ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center">
                  <Loader2 className="w-6 h-6 text-red-500 animate-spin mx-auto" />
                </td>
              </tr>
            ) : forms?.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-white/50">
                  No forms found
                </td>
              </tr>
            ) : (
              forms?.map((form) => (
                <tr key={form.id} className="hover:bg-red-950/10 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-red-300 truncate max-w-[120px]">{form.id}</td>
                  <td className="px-6 py-4 text-sm font-medium text-white/90">{form.title}</td>
                  <td className="px-6 py-4 text-sm text-white/60">{form.creatorEmail}</td>
                  <td className="px-6 py-4 text-sm text-white/80">{form.responses.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-widest ${
                      form.status === "published" ? "bg-green-500/10 text-green-400 border border-green-500/20" : 
                      form.status === "archived" ? "bg-red-500/20 text-red-400 border border-red-500/40" :
                      "bg-white/5 text-white/40 border border-white/10"
                    }`}>
                      {form.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-white/40 hover:text-white hover:bg-white/10">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-orange-400/60 hover:text-orange-400 hover:bg-orange-500/10">
                        <ShieldAlert className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400/60 hover:text-red-400 hover:bg-red-500/10">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
