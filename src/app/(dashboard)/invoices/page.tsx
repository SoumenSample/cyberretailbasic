"use client";

import { SiteHeader } from "@/components/site-header";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";

type Invoice = {
  _id: string;
  invoiceNumber: string;
  buyerName: string;
  grandTotal: number;
  status: string;
  createdAt: string;
};

type InvoiceList = {
  items: Invoice[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

export default function InvoiceListPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const invoiceQuery = useQuery<InvoiceList>({
    queryKey: ["invoices", { search, page }],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: String(page),
        pageSize: "20",
        search,
      });
      const res = await fetch(`/api/invoices?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to load invoices");
      return res.json();
    },
  });

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <SiteHeader />
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-zinc-400">Billing</p>
        <h1 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-zinc-100">Invoices</h1>
        <p className="text-sm text-slate-600 dark:text-zinc-400">
          Create and manage GST compliant invoices.
        </p>
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <input
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setPage(1);
          }}
          placeholder="Search invoices"
          className="h-11 rounded-xl border border-slate-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 px-4 text-sm"
        />
        <Link
          href="/invoices/new"
          className="inline-flex h-11 items-center justify-center rounded-xl bg-slate-900 px-5 text-sm font-medium text-white transition hover:bg-slate-700"
        >
          New invoice
        </Link>
      </div>

      {invoiceQuery.isLoading ? (
        <p className="text-sm text-zinc-500 dark:text-zinc-400">Loading invoices...</p>
      ) : invoiceQuery.isError ? (
        <p className="text-sm text-red-600">Failed to load invoices.</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-sm">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800/50 text-xs uppercase tracking-wide text-slate-500 dark:text-zinc-400">
              <tr>
                <th className="px-4 py-3">Invoice</th>
                <th className="px-4 py-3">Buyer</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoiceQuery.data?.items.map((invoice) => (
                <tr key={invoice._id} className="border-b border-slate-100 dark:border-zinc-800 transition hover:bg-slate-50/70 dark:hover:bg-zinc-800/70">
                  <td className="px-4 py-3 font-medium text-slate-900 dark:text-zinc-100">
                    {invoice.invoiceNumber}
                  </td>
                  <td className="px-4 py-3 text-slate-700 dark:text-zinc-300">{invoice.buyerName}</td>
                  <td className="px-4 py-3 font-medium text-slate-800 dark:text-zinc-200">₹{invoice.grandTotal}</td>
                  <td className="px-4 py-3 capitalize text-slate-700 dark:text-zinc-300">{invoice.status}</td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/invoices/${invoice._id}`}
                      className="text-sm font-semibold text-slate-900 dark:text-zinc-100 underline-offset-4 hover:underline"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </div>
  );
}
