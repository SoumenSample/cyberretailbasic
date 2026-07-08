"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { useRouter } from "next/navigation";
import { INDIA_STATES } from "@/utils/india-states";
import { SiteHeader } from "@/components/site-header";
import { businessSettingsSchema } from "@/schemas/business";

type BusinessForm = z.infer<typeof businessSettingsSchema>;

type BusinessSettingsFormProps = {
  business: {
    name?: string | null;
    ownerName?: string | null;
    gstin?: string | null;
    pan?: string | null;
    address?: string | null;
    state?: string | null;
    stateCode?: string | null;
    phone?: string | null;
    email?: string | null;
    website?: string | null;
    invoicePrefix?: string | null;
    gstRegistrationType?: "REGULAR" | "UNREGISTERED" | null;
    bankDetails?: {
      bankName?: string | null;
      accountNumber?: string | null;
      ifsc?: string | null;
      branch?: string | null;
    } | null;
    signatureUrl?: string | null;
    upiQrUrl?: string | null;
    financialYearStartMonth?: number | null;
  };
};

function imageUrl(value?: string | null) {
  return value && value.length > 0 ? value : null;
}

export default function BusinessSettingsForm({ business }: BusinessSettingsFormProps) {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  const form = useForm<BusinessForm>({
    resolver: zodResolver(businessSettingsSchema),
    defaultValues: {
      name: business.name ?? "",
      ownerName: business.ownerName ?? "",
      gstin: business.gstin ?? "",
      pan: business.pan ?? "",
      address: business.address ?? "",
      state: business.state ?? "",
      stateCode: business.stateCode ?? "",
      phone: business.phone ?? "",
      email: business.email ?? "",
      website: business.website ?? "",
      invoicePrefix: business.invoicePrefix ?? "INV",
      gstRegistrationType: business.gstRegistrationType ?? "REGULAR",
      bankDetails: {
        bankName: business.bankDetails?.bankName ?? "",
        accountNumber: business.bankDetails?.accountNumber ?? "",
        ifsc: business.bankDetails?.ifsc ?? "",
        branch: business.bankDetails?.branch ?? "",
      },
      signatureUrl: business.signatureUrl ?? "",
      upiQrUrl: business.upiQrUrl ?? "",
      financialYearStartMonth: business.financialYearStartMonth ?? 4,
    },
  });

  const signatureUrl = useWatch({ control: form.control, name: "signatureUrl" });
  const upiQrUrl = useWatch({ control: form.control, name: "upiQrUrl" });

  const uploadImage = async (file: File, field: keyof Pick<BusinessForm, "signatureUrl" | "upiQrUrl">) => {
    try {
      setUploadingField(field);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "gstandbilling/business");

      const response = await fetch("/api/uploads", {
        method: "POST",
        body: formData,
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error ?? "Upload failed");
      }

      form.setValue(field, data.url ?? "", { shouldDirty: true });
      setMessage("Asset uploaded.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setUploadingField(null);
    }
  };

  const onSubmit = async (values: BusinessForm) => {
    setSaving(true);
    setMessage(null);

    try {
      const response = await fetch("/api/business", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        const issues = data.issues ? JSON.stringify(data.issues, null, 2) : null;
        throw new Error(data.error ?? (issues ? `Unable to save settings: ${issues}` : "Unable to save settings."));
      }

      setMessage("Business settings updated.");
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to save settings.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <SiteHeader />

      <div className="mx-auto w-full max-w-6xl flex-1 overflow-y-auto px-6 py-10">
      <header className="flex flex-col gap-2">
        {/* <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Workspace</p> */}
        <h1 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-zinc-100">Business settings</h1>
        <p className="text-sm text-slate-600 dark:text-zinc-400">
          Update the business profile, logo, signature, and other billing details used across invoices and documents.
        </p>
      </header>

      <form className="grid gap-6" onSubmit={form.handleSubmit(onSubmit)}>
        <section className="grid gap-4 rounded-3xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-zinc-100">Business profile</h2>
              <p className="text-sm text-slate-500 dark:text-zinc-400">Core identity and registration details.</p>
            </div>
            <div className="rounded-full bg-slate-100 dark:bg-zinc-800 px-3 py-1 text-xs font-medium text-slate-600 dark:text-zinc-400">
              Owner only
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Business name" error={form.formState.errors.name?.message as string | undefined}>
              <input className="input" {...form.register("name")} />
            </Field>
            <Field label="Owner name" error={form.formState.errors.ownerName?.message as string | undefined}>
              <input className="input" {...form.register("ownerName")} />
            </Field>
            <Field label="GSTIN" error={form.formState.errors.gstin?.message as string | undefined}>
              <input className="input uppercase" {...form.register("gstin")} />
            </Field>
            <Field label="PAN" error={form.formState.errors.pan?.message as string | undefined}>
              <input className="input uppercase" {...form.register("pan")} />
            </Field>
            <Field label="Invoice prefix" error={form.formState.errors.invoicePrefix?.message as string | undefined}>
              <input className="input" {...form.register("invoicePrefix")} />
            </Field>
            <Field label="GST registration" error={form.formState.errors.gstRegistrationType?.message as string | undefined}>
              <select className="input" {...form.register("gstRegistrationType")}>
                <option value="REGULAR">Regular</option>
                <option value="UNREGISTERED">Unregistered</option>
              </select>
            </Field>
            <Field label="Financial year start month" error={form.formState.errors.financialYearStartMonth?.message as string | undefined}>
              <select className="input" {...form.register("financialYearStartMonth", { valueAsNumber: true })}>
                {[
                  [1, "January"],
                  [2, "February"],
                  [3, "March"],
                  [4, "April"],
                  [5, "May"],
                  [6, "June"],
                  [7, "July"],
                  [8, "August"],
                  [9, "September"],
                  [10, "October"],
                  [11, "November"],
                  [12, "December"],
                ].map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field label="Address" error={form.formState.errors.address?.message as string | undefined}>
            <textarea className="input min-h-28 py-3" {...form.register("address")} />
          </Field>

          <div className="grid gap-4 md:grid-cols-3">
            <Field label="State" error={form.formState.errors.state?.message as string | undefined}>
              <select className="input" {...form.register("state")}>
                <option value="">Select state</option>
                {INDIA_STATES.map((state) => (
                  <option key={state.code} value={state.name}>
                    {state.name}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="State code" error={form.formState.errors.stateCode?.message as string | undefined}>
              <select className="input" {...form.register("stateCode")}>
                <option value="">Code</option>
                {INDIA_STATES.map((state) => (
                  <option key={state.code} value={state.code}>
                    {state.code}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Website" error={form.formState.errors.website?.message as string | undefined}>
              <input className="input" {...form.register("website")} placeholder="https://example.com" />
            </Field>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Business phone" error={form.formState.errors.phone?.message as string | undefined}>
              <input className="input" {...form.register("phone")} />
            </Field>
            <Field label="Business email" error={form.formState.errors.email?.message as string | undefined}>
              <input className="input" {...form.register("email")} />
            </Field>
          </div>
        </section>

        <section className="grid gap-4 rounded-3xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-6 shadow-sm">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-zinc-100">Bank details</h2>
            <p className="text-sm text-slate-500 dark:text-zinc-400">Used on invoices and payment documents.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Bank name" error={form.formState.errors.bankDetails?.bankName?.message as string | undefined}>
              <input className="input" {...form.register("bankDetails.bankName")} />
            </Field>
            <Field label="Account number" error={form.formState.errors.bankDetails?.accountNumber?.message as string | undefined}>
              <input className="input" {...form.register("bankDetails.accountNumber")} />
            </Field>
            <Field label="IFSC" error={form.formState.errors.bankDetails?.ifsc?.message as string | undefined}>
              <input className="input uppercase" {...form.register("bankDetails.ifsc")} />
            </Field>
            <Field label="Branch" error={form.formState.errors.bankDetails?.branch?.message as string | undefined}>
              <input className="input" {...form.register("bankDetails.branch")} />
            </Field>
          </div>
        </section>

        <section className="grid gap-4 rounded-3xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-6 shadow-sm">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-zinc-100">Brand assets</h2>
            <p className="text-sm text-slate-500 dark:text-zinc-400">Upload the signature and UPI QR used in documents.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <AssetField
              label="Signature image"
              value={signatureUrl}
              uploading={uploadingField === "signatureUrl"}
              onUpload={(file) => uploadImage(file, "signatureUrl")}
            />
            <AssetField
              label="UPI QR image"
              value={upiQrUrl}
              uploading={uploadingField === "upiQrUrl"}
              onUpload={(file) => uploadImage(file, "upiQrUrl")}
            />
          </div>
        </section>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500 dark:text-zinc-400">
            Changes here update the active workspace immediately after save.
          </p>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex h-11 items-center justify-center rounded-full bg-slate-950 dark:bg-zinc-100 px-6 text-sm font-medium text-white dark:text-zinc-900 transition hover:bg-slate-800 dark:hover:bg-zinc-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save settings"}
          </button>
        </div>

        {message && (
          <div className="rounded-2xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800/50 px-4 py-3 text-sm text-slate-700 dark:text-zinc-300">
            {message}
          </div>
        )}
      </form>
    </div>
  </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-zinc-300">
      <span>{label}</span>
      {children}
      {error ? <span className="text-xs font-normal text-rose-600">{error}</span> : null}
    </label>
  );
}

function AssetField({
  label,
  value,
  uploading,
  onUpload,
}: {
  label: string;
  value?: string | null;
  uploading: boolean;
  onUpload: (file: File) => Promise<void>;
}) {
  return (
    <div className="grid gap-2 rounded-2xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800/50 p-4">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-slate-700 dark:text-zinc-300">{label}</span>
        {value ? <span className="text-xs text-emerald-700">Uploaded</span> : null}
      </div>
      {imageUrl(value) ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imageUrl(value) as string} alt={label} className="h-28 w-full rounded-xl bg-white dark:bg-zinc-900 object-contain" />
      ) : (
        <div className="flex h-28 items-center justify-center rounded-xl border border-dashed border-slate-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 text-xs text-slate-400 dark:text-zinc-500">
          No image uploaded
        </div>
      )}
      <label className="inline-flex w-fit cursor-pointer items-center justify-center rounded-full bg-slate-950 dark:bg-zinc-100 px-4 py-2 text-xs font-medium text-white dark:text-zinc-900 transition hover:bg-slate-800 dark:hover:bg-zinc-300">
        {uploading ? "Uploading..." : "Upload image"}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          disabled={uploading}
          onChange={async (event) => {
            const file = event.target.files?.[0];
            if (!file) return;
            await onUpload(file);
            event.target.value = "";
          }}
        />
      </label>
      {value ? <span className="break-all text-[11px] text-slate-500 dark:text-zinc-400">{value}</span> : null}
    </div>
  );
}