import type React from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function EmptyState({
  title,
  description,
  action,
  className,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-lg border border-dashed border-[#DCD4C9] bg-white/45 p-8 text-center", className)}>
      <AlertCircle className="mx-auto h-6 w-6 text-[#10756D]" />
      <h3 className="mt-3 text-base font-semibold text-[#1A1A1A]">{title}</h3>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-[#64748B]">{description}</p>
      {action ? <div className="mt-4 flex justify-center">{action}</div> : null}
    </div>
  );
}

export function ErrorState({ message }: { message?: string }) {
  return (
    <EmptyState
      title="Backend unavailable"
      description={message ?? "Start FastAPI on http://localhost:8000 or update NEXT_PUBLIC_API_BASE_URL."}
    />
  );
}