"use client";

import Link from "next/link";
import { Activity, Database, DollarSign, Play, RefreshCw, ShieldCheck } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/badge";
import { ErrorState, EmptyState } from "@/components/ui/empty-state";
import { Checkbox, Field, Input, Select } from "@/components/ui/form";
import { MetricCard } from "@/components/ui/metric-card";
import { PageHeader } from "@/components/ui/page-header";
import { SkeletonGrid } from "@/components/ui/skeleton";
import { StatusTimeline } from "@/components/ui/status-timeline";
import { Table, Td, Th } from "@/components/ui/data-table";
import { useCreateRun, useProducts, useRuns, useSystemReadiness } from "@/lib/api/hooks";
import type { Run } from "@/lib/api/schemas";

const activeStatuses = new Set(["pending", "ingesting", "clustering", "summarizing", "rendering", "publishing"]);

function getIsoWeek(date = new Date()) {
  const target = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNumber = target.getUTCDay() || 7;
  target.setUTCDate(target.getUTCDate() + 4 - dayNumber);
  const yearStart = new Date(Date.UTC(target.getUTCFullYear(), 0, 1));
  const weekNumber = Math.ceil(((target.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return `${target.getUTCFullYear()}-W${String(weekNumber).padStart(2, "0")}`;
}

function formatCurrency(value?: number) {
  return `$${(value ?? 0).toFixed(2)}`;
}

function DashboardTable({ runs }: { runs: Run[] }) {
  if (!runs.length) {
    return <EmptyState title="No runs yet" description="Launch a dry run when products have enough reviews. Completed and failed runs will appear here." />;
  }

  return (
    <Table>
      <thead>
        <tr>
          <Th>Run</Th>
          <Th>Status</Th>
          <Th>Reviews</Th>
          <Th>Cost</Th>
          <Th>Delivery</Th>
        </tr>
      </thead>
      <tbody>
        {runs.slice(0, 8).map((run) => (
          <tr key={run.id}>
            <Td>
              <Link href={`/runs/${run.id}`} className="font-semibold text-[#10756D] hover:underline">
                {run.productName ?? run.productKey}
              </Link>
              <div className="text-xs text-[#64748B]">{run.isoWeek}</div>
            </Td>
            <Td><StatusBadge status={run.status} /></Td>
            <Td>{run.metrics.reviewsIngested ?? 0}</Td>
            <Td>{formatCurrency(run.metrics.llmCostUsd)}</Td>
            <Td>
              <div className="text-xs leading-5 text-[#64748B]">
                <div>Doc: {run.gdocId ? "Ready" : "Not published"}</div>
                <div>Email: {run.gmailMessageId ? "Sent" : "Not sent"}</div>
              </div>
            </Td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default function DashboardPage() {
  const productsQuery = useProducts();
  const runsQuery = useRuns();
  const readinessQuery = useSystemReadiness();
  const createRun = useCreateRun();
  const [productKey, setProductKey] = useState("");
  const [weeks, setWeeks] = useState(10);
  const [isoWeek, setIsoWeek] = useState(getIsoWeek());
  const [dryRun, setDryRun] = useState(false);
  const [modeTouched, setModeTouched] = useState(false);

  const products = productsQuery.data ?? [];
  const runs = useMemo(() => runsQuery.data ?? [], [runsQuery.data]);
  const readiness = readinessQuery.data;
  const activeRuns = runs.filter((run) => activeStatuses.has(run.status));
  const activeProducts = products.filter((product) => product.isActive);
  const minReviews = readiness?.minReviewsPerRun ?? 200;
  const publishReady = Boolean(readiness?.docsMcpConfigured && readiness?.gmailMcpConfigured && readiness?.confirmSend);
  const selectedDryRun = modeTouched ? dryRun : readiness ? !publishReady : false;

  const averageCost = useMemo(() => {
    const runsWithCost = runs.filter((run) => run.metrics.llmCostUsd !== undefined);
    if (!runsWithCost.length) return 0;
    return runsWithCost.reduce((total, run) => total + (run.metrics.llmCostUsd ?? 0), 0) / runsWithCost.length;
  }, [runs]);

  function submitRun(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const selectedProduct = productKey || activeProducts[0]?.key;
    if (!selectedProduct) return;
    createRun.mutate({ productKey: selectedProduct, isoWeek, weeks, dryRun: selectedDryRun });
  }

  const loading = productsQuery.isLoading || runsQuery.isLoading || readinessQuery.isLoading;
  const error = productsQuery.error ?? runsQuery.error ?? readinessQuery.error;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Operations"
        title="Review pulse dashboard"
        description="Track product coverage, run health, cost, delivery state, and the 200-review readiness gate from one console."
        actions={<Button onClick={() => runsQuery.refetch()} variant="outline"><RefreshCw className="h-4 w-4" /> Refresh</Button>}
      />

      {loading ? <SkeletonGrid /> : error ? <ErrorState message={(error as Error).message} /> : (
        <>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            <MetricCard label="Products" value={activeProducts.length} detail={`${products.length} configured total`} icon={<Database className="h-4 w-4" />} />
            <MetricCard label="Active Runs" value={activeRuns.length} detail="Polling pauses when runs finish" icon={<Activity className="h-4 w-4" />} />
            <MetricCard label="Review Minimum" value={minReviews} detail="Runs fail clearly below this gate" icon={<ShieldCheck className="h-4 w-4" />} />
            <MetricCard label="Avg Cost" value={formatCurrency(averageCost)} detail={`Cap ${formatCurrency(readiness?.llmMaxCostUsd)}`} icon={<DollarSign className="h-4 w-4" />} />
            <MetricCard label="MCP Ready" value={(readiness?.docsMcpConfigured && readiness?.gmailMcpConfigured) ? "Yes" : "Partial"} detail={`Confirm send ${readiness?.confirmSend ? "on" : "off"}`} />
          </div>

          <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
            <form onSubmit={submitRun} className="glass-card rounded-lg p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-[#1A1A1A]">Launch pulse run</h2>
                  <p className="mt-1 text-sm text-[#64748B]">Choose whether this run should publish the Doc and send the stakeholder email.</p>
                </div>
                <Button disabled={createRun.isPending || !activeProducts.length} type="submit">
                  <Play className="h-4 w-4" /> Start
                </Button>
              </div>
              <div className="mt-5 rounded-2xl border border-[#E6DDD0] bg-white/70 p-2">
                <div className="grid gap-2 md:grid-cols-2">
                  <button
                    type="button"
                    className={`rounded-xl border px-4 py-4 text-left transition ${!selectedDryRun ? "border-[#10756D] bg-[#E7F3F1] shadow-sm" : "border-transparent bg-transparent hover:border-[#D9D0C2] hover:bg-[#F8F4EE]"}`}
                    onClick={() => {
                      setModeTouched(true);
                      setDryRun(false);
                    }}
                  >
                    <div className="text-sm font-semibold text-[#1A1A1A]">Publish run</div>
                    <p className="mt-1 text-sm leading-6 text-[#64748B]">Creates the Google Doc section and sends the Gmail update when MCP and confirm-send are ready.</p>
                  </button>
                  <button
                    type="button"
                    className={`rounded-xl border px-4 py-4 text-left transition ${selectedDryRun ? "border-[#9A3412]/20 bg-[#FFF7ED] shadow-sm" : "border-transparent bg-transparent hover:border-[#D9D0C2] hover:bg-[#F8F4EE]"}`}
                    onClick={() => {
                      setModeTouched(true);
                      setDryRun(true);
                    }}
                  >
                    <div className="text-sm font-semibold text-[#1A1A1A]">Dry run</div>
                    <p className="mt-1 text-sm leading-6 text-[#64748B]">Skips Docs and Gmail so you can validate ingestion, clustering, and summaries only.</p>
                  </button>
                </div>
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <Field label="Product">
                  <Select value={productKey || activeProducts[0]?.key || ""} onChange={(event) => setProductKey(event.target.value)}>
                    {activeProducts.map((product) => <option key={product.key} value={product.key}>{product.displayName}</option>)}
                  </Select>
                </Field>
                <Field label="ISO week">
                  <Input value={isoWeek} onChange={(event) => setIsoWeek(event.target.value)} placeholder="2026-W17" />
                </Field>
                <Field label="Lookback weeks">
                  <Input type="number" min={1} max={52} value={weeks} onChange={(event) => setWeeks(Number(event.target.value))} />
                </Field>
                <div className="flex items-end pb-2">
                  <Checkbox label="Skip publish for this run" checked={selectedDryRun} onChange={(event) => {
                    setModeTouched(true);
                    setDryRun(event.target.checked);
                  }} />
                </div>
              </div>
              <div className={`mt-4 rounded-md px-3 py-2 text-sm font-medium ${selectedDryRun ? "bg-[#FFF7ED] text-[#9A3412]" : publishReady ? "bg-[#E7F3F1] text-[#10756D]" : "bg-[#FEF3C7] text-[#92400E]"}`}>
                {selectedDryRun
                  ? "Dry mode selected. This run will not publish the Doc or send email."
                  : publishReady
                    ? "Publish mode selected. Docs and Gmail are ready, so delivery will be attempted automatically."
                    : "Publish mode selected, but delivery is not fully ready yet. Check MCP readiness and confirm-send before starting if you expect email."}
              </div>
              <p className="mt-3 rounded-md bg-[#E7F3F1] px-3 py-2 text-sm font-medium text-[#10756D]">
                Requires at least {minReviews} reviews before clustering starts.
              </p>
              {createRun.error ? <p className="mt-3 text-sm font-semibold text-red-700">{(createRun.error as Error).message}</p> : null}
            </form>

            <div className="glass-card rounded-lg p-5">
              <h2 className="text-lg font-semibold text-[#1A1A1A]">Active timelines</h2>
              <div className="mt-4 space-y-4">
                {activeRuns.length ? activeRuns.map((run) => (
                  <Link key={run.id} href={`/runs/${run.id}`} className="block rounded-lg border border-[#E6DDD0] bg-white/55 p-4 transition hover:border-[#10756D]/30 hover:bg-white/75">
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                      <div className="font-semibold text-[#1A1A1A]">{run.productName ?? run.productKey} <span className="text-[#64748B]">{run.isoWeek}</span></div>
                      <StatusBadge status={run.status} />
                    </div>
                    <StatusTimeline status={run.status} />
                  </Link>
                )) : <EmptyState title="No active runs" description="Start a pulse run to watch ingestion, clustering, summarization, rendering, and publishing progress." />}
              </div>
            </div>
          </div>

          <section className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-[#1A1A1A]">Latest runs</h2>
              <Link href="/runs" className="text-sm font-semibold text-[#10756D] hover:underline">View all</Link>
            </div>
            <DashboardTable runs={runs} />
          </section>
        </>
      )}
    </div>
  );
}
