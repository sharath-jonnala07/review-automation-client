"use client";

import { Bot, Database, KeyRound, Mail, Send, Settings2 } from "lucide-react";
import { ReadinessBadge } from "@/components/ui/badge";
import { ErrorState } from "@/components/ui/empty-state";
import { MetricCard } from "@/components/ui/metric-card";
import { PageHeader } from "@/components/ui/page-header";
import { SkeletonGrid } from "@/components/ui/skeleton";
import { useSystemReadiness } from "@/lib/api/hooks";

export default function SettingsPage() {
  const readinessQuery = useSystemReadiness();
  const readiness = readinessQuery.data;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Settings"
        title="System readiness"
        description="Confirm database access, model configuration, MCP publishing setup, cost guardrails, and the review minimum without exposing secrets."
      />

      {readinessQuery.isLoading ? <SkeletonGrid /> : readinessQuery.error || !readiness ? <ErrorState message={(readinessQuery.error as Error | undefined)?.message} /> : (
        <>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <MetricCard label="Review minimum" value={readiness.minReviewsPerRun} detail="Required before clustering" icon={<Settings2 className="h-4 w-4" />} />
            <MetricCard label="Cost cap" value={`$${readiness.llmMaxCostUsd.toFixed(2)}`} detail="Maximum per run" icon={<KeyRound className="h-4 w-4" />} />
            <MetricCard label="LLM model" value={readiness.llmModel} detail={`Provider: ${readiness.llmProvider}`} icon={<Bot className="h-4 w-4" />} />
            <MetricCard label="Embedding model" value={readiness.embeddingModel} detail={readiness.embeddingBackend} />
          </div>

          <section className="glass-card rounded-lg p-5">
            <h2 className="text-lg font-semibold text-[#1A1A1A]">Readiness checks</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              <ReadinessBadge ready={readiness.database} label="Database" />
              <ReadinessBadge ready={readiness.llmReady} label={`LLM ready (${readiness.llmProvider})`} />
              <ReadinessBadge ready={readiness.groqKeyPresent} label="Groq key" />
              <ReadinessBadge ready={readiness.openaiKeyPresent} label="OpenAI key" />
              <ReadinessBadge ready={readiness.docsMcpConfigured} label="Docs MCP" />
              <ReadinessBadge ready={readiness.gmailMcpConfigured} label="Gmail MCP" />
              <ReadinessBadge ready={readiness.confirmSend} label="Confirm send" />
              <ReadinessBadge ready label={`Embedding backend: ${readiness.embeddingBackend}`} />
              <ReadinessBadge ready={readiness.heuristicLlmEnabled} label="Heuristic fallback" />
              <ReadinessBadge ready={readiness.openaiFallbackConfigured} label="OpenAI fallback" />
            </div>
          </section>

          <section className="grid gap-4 xl:grid-cols-3">
            <div className="rounded-lg border border-[#E6DDD0] bg-white/60 p-4">
              <Database className="h-5 w-5 text-[#10756D]" />
              <h3 className="mt-3 font-semibold text-[#1A1A1A]">Database</h3>
              <p className="mt-2 text-sm leading-6 text-[#64748B]">Configured through DATABASE_URL. The readiness endpoint verifies a simple query.</p>
            </div>
            <div className="rounded-lg border border-[#E6DDD0] bg-white/60 p-4">
              <KeyRound className="h-5 w-5 text-[#10756D]" />
              <h3 className="mt-3 font-semibold text-[#1A1A1A]">Models</h3>
              <p className="mt-2 text-sm leading-6 text-[#64748B]">The default embedding backend is the free Hugging Face model Qwen/Qwen3-Embedding-0.6B. The first clustering run downloads it locally.</p>
              <p className="mt-2 text-sm leading-6 text-[#64748B]">LLM routing now resolves between Groq, OpenAI-compatible endpoints, and a deterministic heuristic fallback for local development.</p>
            </div>
            <div className="rounded-lg border border-[#E6DDD0] bg-white/60 p-4">
              <Send className="h-5 w-5 text-[#10756D]" />
              <h3 className="mt-3 font-semibold text-[#1A1A1A]">Docs publishing</h3>
              <p className="mt-2 text-sm leading-6 text-[#64748B]">DOCS_MCP_URL controls document publishing. Dry runs skip this step.</p>
            </div>
            <div className="rounded-lg border border-[#E6DDD0] bg-white/60 p-4">
              <Mail className="h-5 w-5 text-[#10756D]" />
              <h3 className="mt-3 font-semibold text-[#1A1A1A]">Gmail delivery</h3>
              <p className="mt-2 text-sm leading-6 text-[#64748B]">GMAIL_MCP_URL and CONFIRM_SEND decide whether real stakeholder emails are sent.</p>
            </div>
          </section>

          <section className="glass-card rounded-lg p-5">
            <h2 className="text-lg font-semibold text-[#1A1A1A]">Prompt versions</h2>
            <p className="mt-2 text-sm leading-6 text-[#64748B]">Prompt version visibility is reserved for the prompt_versions table. The current UI reads system readiness first, then can attach prompt registry details when exposed by the API.</p>
          </section>
        </>
      )}
    </div>
  );
}
