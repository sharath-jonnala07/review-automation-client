import type React from "react";
import { cn } from "@/lib/utils";

export function Table({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("overflow-x-auto rounded-lg border border-[#E6DDD0] bg-white/60", className)}><table className="w-full min-w-[760px] text-left text-sm">{children}</table></div>;
}

export function Th({ children }: { children: React.ReactNode }) {
  return <th className="border-b border-[#E6DDD0] px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] text-[#64748B]">{children}</th>;
}

export function Td({ children, className }: { children: React.ReactNode; className?: string }) {
  return <td className={cn("border-b border-[#F0E8DC] px-4 py-3 align-top text-[#334155]", className)}>{children}</td>;
}