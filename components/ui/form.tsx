import type React from "react";
import { cn } from "@/lib/utils";

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "h-10 w-full rounded-md border border-[#DCD4C9] bg-white/80 px-3 text-sm text-[#1A1A1A] outline-none transition focus:border-[#10756D] focus:ring-2 focus:ring-[#10756D]/15 disabled:cursor-not-allowed disabled:opacity-60",
        props.className,
      )}
    />
  );
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(
        "min-h-24 w-full rounded-md border border-[#DCD4C9] bg-white/80 px-3 py-2 text-sm text-[#1A1A1A] outline-none transition focus:border-[#10756D] focus:ring-2 focus:ring-[#10756D]/15 disabled:cursor-not-allowed disabled:opacity-60",
        props.className,
      )}
    />
  );
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={cn(
        "h-10 w-full rounded-md border border-[#DCD4C9] bg-white/80 px-3 text-sm text-[#1A1A1A] outline-none transition focus:border-[#10756D] focus:ring-2 focus:ring-[#10756D]/15 disabled:cursor-not-allowed disabled:opacity-60",
        props.className,
      )}
    />
  );
}

export function Checkbox({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="flex items-center gap-2 text-sm font-medium text-[#334155]">
      <input type="checkbox" {...props} className="h-4 w-4 rounded border-[#DCD4C9] accent-[#10756D]" />
      {label}
    </label>
  );
}

export function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-1.5 text-sm font-semibold text-[#334155]">
      <span>{label}</span>
      {children}
      {error ? <span className="text-xs font-medium text-red-700">{error}</span> : null}
    </label>
  );
}