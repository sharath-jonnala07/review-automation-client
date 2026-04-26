import type React from "react";
import { cn } from "@/lib/utils";

export function MetricCard({
  label,
  value,
  detail,
  icon,
  className,
}: {
  label: string;
  value: string | number;
  detail?: string;
  icon?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("glass-card rounded-lg p-4", className)}>
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#64748B]">{label}</p>
        {icon ? <div className="text-[#10756D]">{icon}</div> : null}
      </div>
      <div className="mt-3 text-3xl font-semibold tracking-normal text-[#1A1A1A]">{value}</div>
      {detail ? <p className="mt-2 text-xs leading-5 text-[#64748B]">{detail}</p> : null}
    </div>
  );
}