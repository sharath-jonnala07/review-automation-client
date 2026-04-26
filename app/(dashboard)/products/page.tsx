"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, Plus, Search, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ErrorState, EmptyState } from "@/components/ui/empty-state";
import { Checkbox, Field, Input } from "@/components/ui/form";
import { PageHeader } from "@/components/ui/page-header";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, Td, Th } from "@/components/ui/data-table";
import { useCreateProduct, useDeleteProduct, useProducts, useRuns, useUpsertProduct } from "@/lib/api/hooks";
import { productPayloadSchema, type Product, type ProductPayload } from "@/lib/api/schemas";

const blankProduct: ProductPayload = {
  key: "",
  displayName: "",
  appstoreId: "",
  playPackage: "",
  gdocId: "",
  gmailTo: "",
  isActive: true,
};

function normalizeProduct(values: ProductPayload): ProductPayload {
  return {
    ...values,
    appstoreId: values.appstoreId?.trim() || null,
    playPackage: values.playPackage?.trim() || null,
    gdocId: values.gdocId?.trim() || null,
    gmailTo: values.gmailTo?.trim() || null,
  };
}

function productToPayload(product: Product): ProductPayload {
  return {
    key: product.key,
    displayName: product.displayName,
    appstoreId: product.appstoreId ?? "",
    playPackage: product.playPackage ?? "",
    gdocId: product.gdocId ?? "",
    gmailTo: product.gmailTo ?? "",
    isActive: product.isActive,
  };
}

export default function ProductsPage() {
  const productsQuery = useProducts();
  const runsQuery = useRuns();
  const createProduct = useCreateProduct();
  const updateProduct = useUpsertProduct();
  const deleteProduct = useDeleteProduct();
  const [query, setQuery] = useState("");
  const [editingKey, setEditingKey] = useState<string | null>(null);

  const form = useForm<ProductPayload>({
    resolver: zodResolver(productPayloadSchema),
    defaultValues: blankProduct,
  });

  const products = productsQuery.data ?? [];
  const runs = useMemo(() => runsQuery.data ?? [], [runsQuery.data]);
  const latestRunByProduct = useMemo(() => {
    const map = new Map<string, string>();
    for (const run of runs) {
      if (!map.has(run.productKey)) {
        map.set(run.productKey, `${run.status} (${run.metrics.reviewsIngested ?? 0} reviews)`);
      }
    }
    return map;
  }, [runs]);

  const filteredProducts = products.filter((product) => {
    const haystack = `${product.key} ${product.displayName} ${product.appstoreId ?? ""} ${product.playPackage ?? ""}`.toLowerCase();
    return haystack.includes(query.toLowerCase());
  });

  function startCreate() {
    setEditingKey(null);
    form.reset(blankProduct);
  }

  function startEdit(product: Product) {
    setEditingKey(product.key);
    form.reset(productToPayload(product));
  }

  function submit(values: ProductPayload) {
    const payload = normalizeProduct(values);
    const mutation = editingKey ? updateProduct : createProduct;
    mutation.mutate(payload, {
      onSuccess: () => {
        setEditingKey(null);
        form.reset(blankProduct);
      },
    });
  }

  function confirmDelete(product: Product) {
    if (window.confirm(`Delete ${product.displayName}? This removes its local runs and reviews too.`)) {
      deleteProduct.mutate(product.key);
    }
  }

  const pending = createProduct.isPending || updateProduct.isPending || deleteProduct.isPending;
  const mutationError = createProduct.error ?? updateProduct.error ?? deleteProduct.error;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Products"
        title="Tracked product manager"
        description="Configure store IDs, delivery destinations, activation, and readiness for each app reviewed by Pulse."
        actions={<Button onClick={startCreate}><Plus className="h-4 w-4" /> New product</Button>}
      />

      {productsQuery.isLoading ? <Skeleton className="h-96" /> : productsQuery.error ? <ErrorState message={(productsQuery.error as Error).message} /> : (
        <div className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
          <section className="space-y-4">
            <div className="glass-card flex items-center gap-3 rounded-lg p-3">
              <Search className="h-4 w-4 text-[#64748B]" />
              <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products, keys, store IDs" className="border-0 bg-transparent focus:ring-0" />
            </div>

            {filteredProducts.length ? (
              <Table>
                <thead>
                  <tr>
                    <Th>Product</Th>
                    <Th>Store IDs</Th>
                    <Th>Delivery</Th>
                    <Th>Last Run</Th>
                    <Th>Actions</Th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.key}>
                      <Td>
                        <div className="font-semibold text-[#1A1A1A]">{product.displayName}</div>
                        <div className="text-xs text-[#64748B]">{product.key}</div>
                        <div className="mt-2"><Badge className={product.isActive ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-slate-200 bg-slate-50 text-slate-700"}>{product.isActive ? "Active" : "Disabled"}</Badge></div>
                      </Td>
                      <Td>
                        <div className="space-y-1 text-xs leading-5">
                          <div>App Store: {product.appstoreId || "Not set"}</div>
                          <div>Play: {product.playPackage || "Not set"}</div>
                        </div>
                      </Td>
                      <Td>
                        <div className="space-y-1 text-xs leading-5">
                          <div>Doc: {product.gdocId || "Not set"}</div>
                          <div>Gmail: {product.gmailTo || "Not set"}</div>
                        </div>
                      </Td>
                      <Td>{latestRunByProduct.get(product.key) ?? "No runs"}</Td>
                      <Td>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => startEdit(product)}><Edit className="h-4 w-4" /> Edit</Button>
                          <Button variant="outline" size="sm" onClick={() => confirmDelete(product)}><Trash2 className="h-4 w-4" /> Delete</Button>
                        </div>
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : <EmptyState title="No matching products" description="Adjust the search or create a new tracked product." />}
          </section>

          <form onSubmit={form.handleSubmit(submit)} className="glass-card h-fit rounded-lg p-5">
            <div className="mb-5">
              <h2 className="text-lg font-semibold text-[#1A1A1A]">{editingKey ? "Edit product" : "Create product"}</h2>
              <p className="mt-1 text-sm text-[#64748B]">At least one App Store ID or Play package is required.</p>
            </div>
            <div className="grid gap-4">
              <Field label="Product key" error={form.formState.errors.key?.message}>
                <Input disabled={Boolean(editingKey)} {...form.register("key")} placeholder="groww" />
              </Field>
              <Field label="Display name" error={form.formState.errors.displayName?.message}>
                <Input {...form.register("displayName")} placeholder="Groww" />
              </Field>
              <Field label="App Store ID" error={form.formState.errors.appstoreId?.message}>
                <Input {...form.register("appstoreId")} placeholder="123456789" />
              </Field>
              <Field label="Play package" error={form.formState.errors.playPackage?.message}>
                <Input {...form.register("playPackage")} placeholder="com.example.app" />
              </Field>
              <Field label="Google Doc ID" error={form.formState.errors.gdocId?.message}>
                <Input {...form.register("gdocId")} placeholder="Optional target doc" />
              </Field>
              <Field label="Gmail recipients" error={form.formState.errors.gmailTo?.message}>
                <Input {...form.register("gmailTo")} placeholder="lead@example.com, pm@example.com" />
              </Field>
              <Checkbox label="Active" {...form.register("isActive")} />
              {mutationError ? <p className="text-sm font-semibold text-red-700">{(mutationError as Error).message}</p> : null}
              <div className="flex flex-wrap gap-2 pt-2">
                <Button disabled={pending} type="submit">{editingKey ? "Save changes" : "Create product"}</Button>
                <Button type="button" variant="outline" onClick={startCreate}>Clear</Button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
