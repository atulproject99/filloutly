"use client";

import { useParams } from "next/navigation";
import { trpc } from "~/trpc/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { Loader2, ArrowLeft } from "lucide-react";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { format } from "date-fns";
import { Download } from "lucide-react";

export default function FormResponsesPage() {
  const params = useParams();
  const formId = params.id as string;

  const { data: form, isLoading: isFormLoading } = trpc.form.getFormById.useQuery({ id: formId });
  const { data: responses, isLoading: isResponsesLoading } = trpc.form.getResponses.useQuery({ formId });

  if (isFormLoading || isResponsesLoading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-white/50" />
      </div>
    );
  }

  if (!form) {
    return <div className="p-8 text-white">Form not found</div>;
  }

  const fields = form.fields || [];

  const handleExportCSV = () => {
    if (!responses || responses.length === 0) return;
    
    const headers = ["Submitted At", ...fields.map((f: any) => f.label)];
    const csvRows = [];
    csvRows.push(headers.join(","));
    
    responses.forEach((resp: any) => {
      const answers = resp.answers || {};
      const row = [format(new Date(resp.submittedAt), "yyyy-MM-dd HH:mm:ss")];
      fields.forEach((field: any) => {
        const val = answers[field.id];
        let displayVal = val;
        if (typeof val === "boolean") displayVal = val ? "Yes" : "No";
        else if (Array.isArray(val)) displayVal = val.join("; ");
        
        // Escape quotes and wrap in quotes to handle commas inside values
        const escaped = String(displayVal || "").replace(/"/g, '""');
        row.push(`"${escaped}"`);
      });
      csvRows.push(row.join(","));
    });
    
    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${form.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_responses.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a] text-white">
      {/* ── Header ── */}
      <header className="flex items-center justify-between px-5 py-3 border-b border-white/8 bg-black/60 backdrop-blur-xl z-10 flex-shrink-0">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild className="hover:bg-white/8 h-8 w-8">
            <Link href={`/dashboard/forms/${formId}/builder`}>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </Button>
          <div className="w-px h-5 bg-white/10" />
          <div>
            <h1 className="text-sm font-semibold text-white leading-none">{form.title}</h1>
            <p className="text-xs text-white/40 mt-0.5">Responses</p>
          </div>
        </div>
      </header>

      {/* ── Main Layout ── */}
      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Submissions ({responses?.length || 0})</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportCSV}
              disabled={!responses || responses.length === 0}
              className="border-white/10 bg-white/5 hover:bg-white/10 text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>

          <div className="border border-white/10 rounded-lg overflow-hidden bg-white/[0.02]">
            <Table>
              <TableHeader className="bg-white/5 border-b border-white/10">
                <TableRow className="border-b border-white/10 hover:bg-transparent">
                  <TableHead className="w-[180px] text-white/60">Submitted At</TableHead>
                  {fields.map((field: any) => (
                    <TableHead key={field.id} className="text-white/60 truncate max-w-[200px]" title={field.label}>
                      {field.label}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {responses?.length === 0 ? (
                  <TableRow className="hover:bg-transparent">
                    <TableCell colSpan={fields.length + 1} className="h-24 text-center text-white/40">
                      No responses yet.
                    </TableCell>
                  </TableRow>
                ) : (
                  responses?.map((resp: any) => {
                    const answers = resp.answers || {};
                    return (
                      <TableRow key={resp.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                        <TableCell className="text-white/80">
                          {format(new Date(resp.submittedAt), "MMM d, yyyy HH:mm")}
                        </TableCell>
                        {fields.map((field: any) => {
                          const val = answers[field.id];
                          let displayVal = val;
                          if (typeof val === "boolean") {
                            displayVal = val ? "Yes" : "No";
                          } else if (Array.isArray(val)) {
                            displayVal = val.join(", ");
                          }
                          return (
                            <TableCell key={field.id} className="text-white/80 truncate max-w-[200px]" title={String(displayVal || "")}>
                              {displayVal || "-"}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </div>
  );
}
