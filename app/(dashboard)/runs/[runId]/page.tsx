"use client";

import Link from "next/link";
import { ArrowLeft, ExternalLink, RotateCcw } from "lucide-react";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/badge";
import { ErrorState, EmptyState } from "@/components/ui/empty-state";
import { MetricCard } from "@/components/ui/metric-card";
import { PageHeader } from "@/components/ui/page-header";
import { Skeleton } from "@/components/ui/skeleton";
import { StatusTimeline } from "@/components/ui/status-timeline";
import { useRetryRun, useRun, useRunAudit, useRunThemes } from "@/lib/api/hooks";

export default function RunDetailPage() {
  const params = useParams<{ runId: string }>();
  const runId = params.runId;
  const [activePanel, setActivePanel] = useState<"themes" | "audit">("themes");
  const runQuery = useRun(runId);
  const themesQuery = useRunThemes(runId);
  const auditQuery = useRunAudit(runId);
  const retryRun = useRetryRun();
  const run = runQuery.data;
  const themeCount = themesQuery.data?.length ?? 0;
  const actionCount = useMemo(
    () => (themesQuery.data ?? []).reduce((total, theme) => total + theme.actionIdeas.length, 0),
    [themesQuery.data],
  );
  const auditCount = auditQuery.data?.length ?? 0;
  const latestAuditEvent = auditQuery.data?.[auditQuery.data.length - 1];

  if (runQuery.isLoading) {
    return <Skeleton className="h-[620px]" />;
  }

  if (runQuery.error || !run) {
    return <ErrorState message={(runQuery.error as Error | undefined)?.message ?? "Run not found."} />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Run detail"
        title={run.productName ?? run.productKey}
        description={`${run.isoWeek}, ${run.windowStart} to ${run.windowEnd}`}
        actions={
          <>
            <Button asChild variant="outline"><Link href="/runs"><ArrowLeft className="h-4 w-4" /> Runs</Link></Button>
            {run.status === "failed" ? <Button onClick={() => retryRun.mutate(run.id)}><RotateCcw className="h-4 w-4" /> Retry</Button> : null}
            {run.gdocId ? <Button asChild><a href={`https://docs.google.com/document/d/${run.gdocId}`} target="_blank"><ExternalLink className="h-4 w-4" /> Doc</a></Button> : null}
          </>
        }
      />

      <div className="glass-card rounded-lg p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <StatusBadge status={run.status} />
          <span className="text-xs font-semibold text-[#64748B]">Run ID {run.id}</span>
        </div>
        <StatusTimeline status={run.status} />
        {run.errorMessage ? <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-800">{run.errorMessage}</div> : null}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <MetricCard
          label="Reviews"
          value={run.metrics.reviewsSelected ?? run.metrics.reviewsIngested ?? 0}
          detail={[
            `${run.metrics.reviewsIngested ?? 0} ingested`,
            `${run.metrics.lowSignalDropped ?? 0} low-signal ignored`,
          ].join(" • ")}
        />
        <MetricCard label="Clusters" value={run.metrics.clustersFormed ?? 0} detail="Generated from embeddings" />
        <MetricCard label="Cost" value={`$${(run.metrics.llmCostUsd ?? 0).toFixed(2)}`} detail={`${run.metrics.llmTokens ?? 0} tokens`} />
        <MetricCard label="Duration" value={`${run.metrics.durationSeconds ?? 0}s`} detail="Background execution" />
        <MetricCard label="Mode" value={run.metrics.dryRun ? "Dry" : "Publish"} detail={run.gmailMessageId ? "Email sent" : "Email not sent"} />
      </div>

      <section className="glass-card rounded-lg p-5">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-[#1A1A1A]">Run explorer</h2>
            <p className="mt-1 text-sm leading-6 text-[#64748B]">Themes now get the full reading width. Switch to the audit trail only when you need the execution details.</p>
          </div>
          <div className="flex flex-wrap gap-2 rounded-xl border border-[#E6DDD0] bg-white/70 p-1">
            <button
              type="button"
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${activePanel === "themes" ? "bg-[#10756D] text-white" : "text-[#64748B] hover:bg-[#F5F0E8]"}`}
              onClick={() => setActivePanel("themes")}
            >
              Themes and actions · {themeCount}
            </button>
            <button
              type="button"
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${activePanel === "audit" ? "bg-[#10756D] text-white" : "text-[#64748B] hover:bg-[#F5F0E8]"}`}
              onClick={() => setActivePanel("audit")}
            >
              Audit trail · {auditCount}
            </button>
          </div>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <div className="rounded-lg border border-[#E6DDD0] bg-white/60 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#64748B]">Themes</p>
            <p className="mt-2 text-2xl font-semibold text-[#1A1A1A]">{themeCount}</p>
            <p className="mt-1 text-sm text-[#64748B]">Clusters promoted into reviewable product themes.</p>
          </div>
          <div className="rounded-lg border border-[#E6DDD0] bg-white/60 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#64748B]">Actions</p>
            <p className="mt-2 text-2xl font-semibold text-[#1A1A1A]">{actionCount}</p>
            <p className="mt-1 text-sm text-[#64748B]">Follow-up recommendations extracted from the summary.</p>
          </div>
          <div className="rounded-lg border border-[#E6DDD0] bg-white/60 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#64748B]">Latest audit</p>
            <p className="mt-2 text-sm font-semibold text-[#1A1A1A]">{latestAuditEvent?.eventType ?? "No events yet"}</p>
            <p className="mt-1 text-sm text-[#64748B]">{latestAuditEvent ? new Date(latestAuditEvent.createdAt).toLocaleString() : "Execution details will appear here once the run starts."}</p>
          </div>
        </div>

        {activePanel === "themes" ? (
          <div className="mt-5 space-y-3">
            {themesQuery.isLoading ? <Skeleton className="h-48" /> : themesQuery.data?.length ? themesQuery.data.map((theme) => (
              <article key={theme.id} className="rounded-lg border border-[#E6DDD0] bg-white/60 p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-semibold text-[#1A1A1A]">{theme.rank}. {theme.label}</h3>
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#10756D]">{theme.sentiment}</span>
                </div>
                <p className="mt-2 text-sm leading-6 text-[#64748B]">{theme.description}</p>
                <p className="mt-3 text-xs font-semibold text-[#334155]">{theme.reviewCount} reviews</p>
                {theme.actionIdeas.length ? (
                  <ul className="mt-4 space-y-3 text-sm text-[#334155]">
                    {theme.actionIdeas.map((action, index) => (
                      <li key={`${theme.id}-${index}`} className="rounded-lg border border-[#EFE7DB] bg-[#FCFAF7] px-4 py-3">
                        <span className="font-semibold text-[#1A1A1A]">{action.title}:</span> {action.description}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </article>
            )) : <EmptyState title="No themes yet" description="Themes appear after clustering and summarization complete." />}
          </div>
        ) : (
          <div className="mt-5 space-y-3">
            {auditQuery.isLoading ? <Skeleton className="h-48" /> : auditQuery.data?.length ? auditQuery.data.map((event) => (
              <article key={event.id} className="rounded-lg border border-[#E6DDD0] bg-white/60 p-5">
                <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h3 className="font-semibold text-[#1A1A1A]">{event.eventType}</h3>
                    <p className="mt-1 text-sm text-[#64748B]">{new Date(event.createdAt).toLocaleString()}</p>
                  </div>
                </div>
                <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-md bg-[#F5F0E8] p-3 text-[11px] leading-5 text-[#64748B]">{JSON.stringify(event.eventData, null, 2)}</pre>
              </article>
            )) : <EmptyState title="No audit events" description="Run events will appear once the background task starts." />}
          </div>
        )}
      </section>
    </div>
  );
}
