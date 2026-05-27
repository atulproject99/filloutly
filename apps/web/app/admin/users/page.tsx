"use client";

import { motion } from "framer-motion";
import { Users, Loader2 } from "lucide-react";
import { AdminEmptyState } from "~/components/admin/admin-empty-state";
import { trpc } from "~/trpc/client";

export default function UsersPage() {
  const { data: users, isLoading } = trpc.auth.getAllUsers.useQuery();
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

      <div className="bg-black/40 border border-red-500/20 rounded-2xl overflow-hidden backdrop-blur-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-red-500/20 bg-red-950/20">
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-white/50">User ID</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-white/50">Email</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-white/50">Status</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-white/50">Plan</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-white/50">Joined</th>
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
            ) : users?.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-white/50">
                  No users found
                </td>
              </tr>
            ) : (
              users?.map((user) => (
                <tr key={user.id} className="hover:bg-red-950/10 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-red-300 truncate max-w-[120px]">{user.id}</td>
                  <td className="px-6 py-4 text-sm text-white/80">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-white/60">Free</td>
                  <td className="px-6 py-4 text-sm text-white/40">
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Unknown"}
                  </td>
                  <td className="px-6 py-4 text-right text-sm">
                    <button className="text-red-400 hover:text-red-300 hover:underline">Manage</button>
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
