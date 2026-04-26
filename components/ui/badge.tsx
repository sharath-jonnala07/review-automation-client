import type React from "react";
import { cn } from "@/lib/utils";
import type { RunStatus } from "@/lib/api/schemas";

const statusClasses: Record<RunStatus, string> = {
  pending: "border-slate-200 bg-slate-50 text-slate-700",
  ingesting: "border-cyan-200 bg-cyan-50 text-cyan-800",
  clustering: "border-teal-200 bg-teal-50 text-teal-800",
  summarizing: "border-amber-200 bg-amber-50 text-amber-800",
  rendering: "border-indigo-200 bg-indigo-50 text-indigo-800",
  publishing: "border-violet-200 bg-violet-50 text-violet-800",
  completed: "border-emerald-200 bg-emerald-50 text-emerald-800",
  failed: "border-red-200 bg-red-50 text-red-800",
};

export function Badge({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <span className={cn("inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold", className)}>
      {children}
    </span>
  );
}

export function StatusBadge({ status }: { status: RunStatus }) {
  return <Badge className={statusClasses[status]}>{status.replace("_", " ")}</Badge>;
}

export function ReadinessBadge({ ready, label }: { ready: boolean; label: string }) {
  return (
    <Badge className={ready ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-amber-200 bg-amber-50 text-amber-800"}>
      {ready ? "Ready" : "Needs setup"}: {label}
    </Badge>
  );
}