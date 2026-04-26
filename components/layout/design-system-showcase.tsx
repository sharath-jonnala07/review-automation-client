import { Activity, Check, Clock3, Play } from "lucide-react";
import { Badge, StatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, Td, Th } from "@/components/ui/data-table";
import { Field, Input, Select, Textarea } from "@/components/ui/form";
import { MetricCard } from "@/components/ui/metric-card";
import { PageHeader } from "@/components/ui/page-header";
import { StatusTimeline } from "@/components/ui/status-timeline";

const swatches = [
  ["Cream", "#FAF6F0"],
  ["Warm Cream", "#F5F0E8"],
  ["Teal", "#10756D"],
  ["Teal Dark", "#0A524C"],
  ["Charcoal", "#1A1A1A"],
  ["Slate", "#64748B"],
];

export function DesignSystemShowcase() {
  return (
    <div className="space-y-7">
      <PageHeader
        eyebrow="Reference"
        title="Pulse design system"
        description="Reusable dashboard surfaces, status language, controls, tables, and accessibility rules for the internal review intelligence console."
      />

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
        {swatches.map(([name, color]) => (
          <div key={name} className="rounded-lg border border-[#E6DDD0] bg-white/65 p-3">
            <div className="h-16 rounded-md border border-black/5" style={{ background: color }} />
            <div className="mt-3 text-sm font-semibold text-[#1A1A1A]">{name}</div>
            <div className="text-xs text-[#64748B]">{color}</div>
          </div>
        ))}
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Metric Card" value="200" detail="Stable dimensions, compact labels" icon={<Activity className="h-4 w-4" />} />
        <MetricCard label="Cost" value="$0.12" detail="Use exact values and cap context" />
        <MetricCard label="Mode" value="Dry" detail="Dry runs skip publishing" />
        <MetricCard label="Readiness" value="Ready" detail="Pair color with text" />
      </section>

      <section className="glass-card rounded-lg p-5">
        <h2 className="text-lg font-semibold text-[#1A1A1A]">Controls</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Button><Play className="h-4 w-4" /> Primary</Button>
          <Button variant="outline"><Clock3 className="h-4 w-4" /> Outline</Button>
          <Badge className="border-[#10756D]/20 bg-[#E7F3F1] text-[#10756D]">Neutral badge</Badge>
          <StatusBadge status="failed" />
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <Field label="Input"><Input placeholder="groww" /></Field>
          <Field label="Select"><Select defaultValue="dry"><option value="dry">Dry run</option><option value="publish">Publish</option></Select></Field>
          <Field label="Textarea"><Textarea placeholder="Notes" /></Field>
        </div>
      </section>

      <section className="glass-card rounded-lg p-5">
        <h2 className="text-lg font-semibold text-[#1A1A1A]">Run timeline</h2>
        <div className="mt-4 space-y-3">
          <StatusTimeline status="clustering" />
          <StatusTimeline status="completed" />
        </div>
      </section>

      <section className="glass-card rounded-lg p-5">
        <h2 className="text-lg font-semibold text-[#1A1A1A]">Tables and empty states</h2>
        <div className="mt-4">
          <Table>
            <thead>
              <tr><Th>Pattern</Th><Th>Rule</Th><Th>State</Th></tr>
            </thead>
            <tbody>
              <tr><Td>Status</Td><Td>Use text with color</Td><Td><Check className="h-4 w-4 text-emerald-700" /></Td></tr>
              <tr><Td>Spacing</Td><Td>Compact, scan-friendly rows</Td><Td>Ready</Td></tr>
              <tr><Td>Motion</Td><Td>Use feedback motion sparingly</Td><Td>Subtle</Td></tr>
            </tbody>
          </Table>
        </div>
      </section>
    </div>
  );
}
