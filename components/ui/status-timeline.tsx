import { Check, Clock3, X } from "lucide-react";
import type { RunStatus } from "@/lib/api/schemas";
import { cn } from "@/lib/utils";

const stages: { key: RunStatus; label: string }[] = [
  { key: "ingesting", label: "Ingest" },
  { key: "clustering", label: "Cluster" },
  { key: "summarizing", label: "Summarize" },
  { key: "rendering", label: "Render" },
  { key: "publishing", label: "Publish" },
  { key: "completed", label: "Done" },
];

export function StatusTimeline({ status }: { status: RunStatus }) {
  const normalizedStatus = status === "pending" ? "ingesting" : status;
  const activeIndex = stages.findIndex((stage) => stage.key === normalizedStatus);
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-3 2xl:grid-cols-6">
      {stages.map((stage, index) => {
        const isFailed = status === "failed" && index === Math.max(activeIndex, 0);
        const isDone = normalizedStatus === "completed" || (activeIndex > index && status !== "failed");
        const isActive = stage.key === normalizedStatus;
        return (
          <div
            key={stage.key}
            className={cn(
              "flex min-h-11 min-w-0 items-center gap-2 rounded-md border bg-white/65 px-3 py-2 text-xs font-semibold text-[#64748B]",
              isDone && "border-emerald-200 bg-emerald-50 text-emerald-800",
              isActive && "border-[#10756D]/30 bg-[#E7F3F1] text-[#10756D]",
              isFailed && "border-red-200 bg-red-50 text-red-800",
            )}
          >
            {isFailed ? <X className="h-3.5 w-3.5 shrink-0" /> : isDone ? <Check className="h-3.5 w-3.5 shrink-0" /> : <Clock3 className="h-3.5 w-3.5 shrink-0" />}
            <span className="min-w-0 break-words leading-tight">{stage.label}</span>
          </div>
        );
      })}
    </div>
  );
}