"use client";

import Link from "next/link";
import { RefreshCw, RotateCcw, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/badge";
import { ErrorState, EmptyState } from "@/components/ui/empty-state";
import { Input, Select } from "@/components/ui/form";
import { PageHeader } from "@/components/ui/page-header";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, Td, Th } from "@/components/ui/data-table";
import { useProducts, useRetryRun, useRuns } from "@/lib/api/hooks";
import type { RunStatus } from "@/lib/api/schemas";

const statuses = ["all", "pending", "ingesting", "clustering", "summarizing", "rendering", "publishing", "completed", "failed"];

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }).format(new Date(value));
}

export default function RunsPage() {
  const runsQuery = useRuns();
  const productsQuery = useProducts();
  const retryRun = useRetryRun();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [productKey, setProductKey] = useState("all");
  const [page, setPage] = useState(1);

  const products = productsQuery.data ?? [];
  const runs = useMemo(() => runsQuery.data ?? [], [runsQuery.data]);
  const filteredRuns = useMemo(() => {
    return runs.filter((run) => {
      const matchesText = `${run.id} ${run.productKey} ${run.productName ?? ""} ${run.isoWeek}`.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = status === "all" || run.status === status;
      const matchesProduct = productKey === "all" || run.productKey === productKey;
      return matchesText && matchesStatus && matchesProduct;
    });
  }, [productKey, query, runs, status]);

  const pageSize = 12;
  const pageCount = Math.max(1, Math.ceil(filteredRuns.length / pageSize));
  const visibleRuns = filteredRuns.slice((page - 1) * pageSize, page * pageSize);
  const error = runsQuery.error ?? productsQuery.error;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Runs"
        title="Run history"
        description="Filter previous pulse runs, inspect failures, retry jobs, and open generated delivery artifacts."
        actions={<Button onClick={() => runsQuery.refetch()} variant="outline"><RefreshCw className="h-4 w-4" /> Refresh</Button>}
      />

      <div className="glass-card grid gap-3 rounded-lg p-3 md:grid-cols-[1fr_180px_180px]">
        <div className="flex items-center gap-2 rounded-md border border-[#DCD4C9] bg-white/70 px-3">
          <Search className="h-4 w-4 text-[#64748B]" />
          <Input value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} placeholder="Search by product, run ID, or week" className="border-0 bg-transparent focus:ring-0" />
        </div>
        <Select value={status} onChange={(event) => { setStatus(event.target.value); setPage(1); }}>
          {statuses.map((item) => <option key={item} value={item}>{item === "all" ? "All statuses" : item}</option>)}
        </Select>
        <Select value={productKey} onChange={(event) => { setProductKey(event.target.value); setPage(1); }}>
          <option value="all">All products</option>
          {products.map((product) => <option key={product.key} value={product.key}>{product.displayName}</option>)}
        </Select>
      </div>

      {runsQuery.isLoading ? <Skeleton className="h-96" /> : error ? <ErrorState message={(error as Error).message} /> : visibleRuns.length ? (
        <>
          <Table>
            <thead>
              <tr>
                <Th>Run</Th>
                <Th>Status</Th>
                <Th>Window</Th>
                <Th>Metrics</Th>
                <Th>Artifacts</Th>
                <Th>Actions</Th>
              </tr>
            </thead>
            <tbody>
              {visibleRuns.map((run) => (
                <tr key={run.id}>
                  <Td>
                    <Link href={`/runs/${run.id}`} className="font-semibold text-[#10756D] hover:underline">{run.productName ?? run.productKey}</Link>
                    <div className="text-xs text-[#64748B]">{run.isoWeek} - {run.id}</div>
                  </Td>
                  <Td><StatusBadge status={run.status as RunStatus} /></Td>
                  <Td>
                    <div className="text-xs leading-5 text-[#64748B]">
                      <div>{run.windowStart} to {run.windowEnd}</div>
                      <div>Updated {formatDate(run.updatedAt)}</div>
                    </div>
                  </Td>
                  <Td>
                    <div className="text-xs leading-5 text-[#334155]">
                      <div>{run.metrics.reviewsIngested ?? 0} reviews</div>
                      <div>{run.metrics.clustersFormed ?? 0} clusters</div>
                      <div>${(run.metrics.llmCostUsd ?? 0).toFixed(2)} cost</div>
                    </div>
                  </Td>
                  <Td>
                    <div className="text-xs leading-5 text-[#334155]">
                      <div>Doc: {run.gdocId ? <a className="text-[#10756D] underline" href={`https://docs.google.com/document/d/${run.gdocId}`} target="_blank">Open</a> : "None"}</div>
                      <div>Email: {run.gmailMessageId ? "Sent" : "Not sent"}</div>
                    </div>
                  </Td>
                  <Td>
                    <div className="flex flex-wrap gap-2">
                      <Button asChild size="sm" variant="outline"><Link href={`/runs/${run.id}`}>Details</Link></Button>
                      {run.status === "failed" ? <Button size="sm" onClick={() => retryRun.mutate(run.id)}><RotateCcw className="h-4 w-4" /> Retry</Button> : null}
                    </div>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="flex items-center justify-between text-sm text-[#64748B]">
            <span>Page {page} of {pageCount}</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage((value) => Math.max(1, value - 1))}>Previous</Button>
              <Button variant="outline" size="sm" disabled={page === pageCount} onClick={() => setPage((value) => Math.min(pageCount, value + 1))}>Next</Button>
            </div>
          </div>
        </>
      ) : <EmptyState title="No runs match" description="Try a broader filter, or launch a run from the dashboard." />}
    </div>
  );
}
