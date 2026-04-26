import { z } from "zod";

export const runStatusSchema = z.enum([
  "pending",
  "ingesting",
  "clustering",
  "summarizing",
  "rendering",
  "publishing",
  "completed",
  "failed",
]);

export const productSchema = z.object({
  key: z.string(),
  displayName: z.string(),
  appstoreId: z.string().nullable().optional(),
  playPackage: z.string().nullable().optional(),
  gdocId: z.string().nullable().optional(),
  gmailTo: z.string().nullable().optional(),
  isActive: z.boolean(),
  createdAt: z.string(),
});

export const productPayloadSchema = z.object({
  key: z.string().min(2).regex(/^[a-z0-9][a-z0-9_-]*$/),
  displayName: z.string().min(1),
  appstoreId: z.string().nullable().optional(),
  playPackage: z.string().nullable().optional(),
  gdocId: z.string().nullable().optional(),
  gmailTo: z.string().nullable().optional(),
  isActive: z.boolean(),
}).refine((value) => Boolean(value.appstoreId || value.playPackage), {
  message: "Add at least one store identifier.",
  path: ["appstoreId"],
});

export const runMetricsSchema = z.object({
  weeks: z.number().optional(),
  dryRun: z.boolean().optional(),
  minReviews: z.number().optional(),
  maxReviews: z.number().optional(),
  reviewsIngested: z.number().optional(),
  reviewsSelected: z.number().optional(),
  reviewsAvailable: z.number().optional(),
  reviewsInserted: z.number().optional(),
  lowSignalDropped: z.number().optional(),
  highSignalOverflow: z.number().optional(),
  appstoreReviews: z.number().optional(),
  playstoreReviews: z.number().optional(),
  avgRating: z.number().optional(),
  clustersFormed: z.number().optional(),
  llmTokens: z.number().optional(),
  llmCostUsd: z.number().optional(),
  durationSeconds: z.number().optional(),
}).passthrough();

export const runSchema = z.object({
  id: z.string(),
  productKey: z.string(),
  productName: z.string().nullable().optional(),
  isoWeek: z.string(),
  status: runStatusSchema,
  metrics: runMetricsSchema.default({}),
  gdocId: z.string().nullable().optional(),
  gdocHeadingId: z.string().nullable().optional(),
  gmailMessageId: z.string().nullable().optional(),
  errorMessage: z.string().nullable().optional(),
  windowStart: z.string(),
  windowEnd: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const themeSchema = z.object({
  id: z.string(),
  rank: z.number(),
  label: z.string(),
  description: z.string(),
  sentiment: z.string(),
  reviewCount: z.number(),
  representativeReviewIds: z.array(z.string()),
  actionIdeas: z.array(z.object({ title: z.string(), description: z.string() }).passthrough()),
  createdAt: z.string(),
});

export const auditEventSchema = z.object({
  id: z.number(),
  runId: z.string().nullable(),
  eventType: z.string(),
  eventData: z.record(z.string(), z.unknown()),
  createdAt: z.string(),
});

export const systemReadinessSchema = z.object({
  database: z.boolean(),
  groqKeyPresent: z.boolean(),
  openaiKeyPresent: z.boolean(),
  docsMcpConfigured: z.boolean(),
  gmailMcpConfigured: z.boolean(),
  confirmSend: z.boolean(),
  minReviewsPerRun: z.number(),
  llmMaxCostUsd: z.number(),
  llmModel: z.string(),
  llmReady: z.boolean(),
  llmProvider: z.string(),
  heuristicLlmEnabled: z.boolean(),
  embeddingBackend: z.string(),
  embeddingModel: z.string(),
  openaiFallbackConfigured: z.boolean(),
});

export type Product = z.infer<typeof productSchema>;
export type ProductPayload = z.infer<typeof productPayloadSchema>;
export type Run = z.infer<typeof runSchema>;
export type RunStatus = z.infer<typeof runStatusSchema>;
export type RunMetrics = z.infer<typeof runMetricsSchema>;
export type Theme = z.infer<typeof themeSchema>;
export type AuditEvent = z.infer<typeof auditEventSchema>;
export type SystemReadiness = z.infer<typeof systemReadinessSchema>;

export type StartRunPayload = {
  productKey: string;
  isoWeek?: string;
  weeks: number;
  dryRun: boolean;
};