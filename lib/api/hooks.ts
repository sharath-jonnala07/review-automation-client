import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { apiFetch } from "./client";
import {
  auditEventSchema,
  productPayloadSchema,
  productSchema,
  runSchema,
  StartRunPayload,
  systemReadinessSchema,
  themeSchema,
  type ProductPayload,
} from "./schemas";

const productsSchema = z.array(productSchema);
const runsSchema = z.array(runSchema);
const themesSchema = z.array(themeSchema);
const auditSchema = z.array(auditEventSchema);
const emptySchema = z.undefined();

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => apiFetch("/api/v1/products", productsSchema),
  });
}

export function useRuns(productKey?: string) {
  return useQuery({
    queryKey: ["runs", productKey ?? "all"],
    queryFn: () => apiFetch(`/api/v1/runs${productKey ? `?product_key=${productKey}` : ""}`, runsSchema),
    refetchInterval: (query) => {
      const runs = query.state.data ?? [];
      return runs.some((run) => !["completed", "failed"].includes(run.status)) ? 3500 : false;
    },
  });
}

export function useRun(runId: string) {
  return useQuery({
    queryKey: ["run", runId],
    queryFn: () => apiFetch(`/api/v1/runs/${runId}`, runSchema),
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      return status && !["completed", "failed"].includes(status) ? 3500 : false;
    },
  });
}

export function useRunThemes(runId: string) {
  return useQuery({
    queryKey: ["run", runId, "themes"],
    queryFn: () => apiFetch(`/api/v1/runs/${runId}/themes`, themesSchema),
  });
}

export function useRunAudit(runId: string) {
  return useQuery({
    queryKey: ["run", runId, "audit"],
    queryFn: () => apiFetch(`/api/v1/runs/${runId}/audit`, auditSchema),
  });
}

export function useSystemReadiness() {
  return useQuery({
    queryKey: ["system-readiness"],
    queryFn: () => apiFetch("/api/v1/system/readiness", systemReadinessSchema),
  });
}

export function useCreateRun() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: StartRunPayload) => apiFetch("/api/v1/runs", runSchema, { method: "POST", body: payload }),
    onSuccess: (run) => {
      queryClient.invalidateQueries({ queryKey: ["runs"] });
      queryClient.setQueryData(["run", run.id], run);
    },
  });
}

export function useRetryRun() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (runId: string) => apiFetch(`/api/v1/runs/${runId}/retry`, runSchema, { method: "POST" }),
    onSuccess: (run) => {
      queryClient.invalidateQueries({ queryKey: ["runs"] });
      queryClient.setQueryData(["run", run.id], run);
    },
  });
}

export function useUpsertProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: ProductPayload) => {
      const cleanPayload = productPayloadSchema.parse(payload);
      return apiFetch(`/api/v1/products/${cleanPayload.key}`, productSchema, {
        method: "PUT",
        body: cleanPayload,
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: ProductPayload) => apiFetch("/api/v1/products", productSchema, { method: "POST", body: productPayloadSchema.parse(payload) }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (productKey: string) => apiFetch(`/api/v1/products/${productKey}`, emptySchema, { method: "DELETE" }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });
}