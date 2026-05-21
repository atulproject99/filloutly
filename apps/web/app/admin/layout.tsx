import { AdminShell } from "~/components/admin/admin-shell";

export const metadata = {
  title: "Admin Control - Filloutly",
  description: "Billion-dollar stealth startup control center.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminShell>
      {children}
    </AdminShell>
  );
}
