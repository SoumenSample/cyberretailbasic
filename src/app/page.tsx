import { ArrowRight, BarChart3, Package, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-6 py-16 dark:bg-zinc-950">
      <main className="w-full max-w-4xl space-y-16">
        {/* Hero */}
        <div className="text-center space-y-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-900 shadow-lg dark:bg-white">
            <Image src="/logo.png" alt="Cyber Retail" width={48} height={48} className="object-contain" />
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">
            Cyber Retail
          </h1>
          <p className="mx-auto max-w-lg text-lg text-zinc-500 dark:text-zinc-400">
            A complete solution for managing your inventory, tracking sales, and
            growing your retail business.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/login"
              className="inline-flex h-12 items-center gap-2 rounded-xl bg-zinc-900 px-7 text-sm font-medium text-white shadow-md transition-all hover:bg-zinc-800 hover:shadow-lg dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Sign in
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/signup"
              className="inline-flex h-12 items-center gap-2 rounded-xl border border-zinc-200 bg-white px-7 text-sm font-medium text-zinc-900 shadow-sm transition-all hover:border-zinc-300 hover:bg-zinc-50 hover:shadow dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-700 dark:hover:bg-zinc-800"
            >
              Create an account
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            {
              icon: Package,
              title: "Inventory",
              desc: "Track stock levels, set reorder points, and manage suppliers.",
            },
            {
              icon: BarChart3,
              title: "Analytics",
              desc: "Real-time dashboards with sales trends and performance metrics.",
            },
            {
              icon: Users,
              title: "Team",
              desc: "Role-based access control for staff across multiple locations.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800">
                <f.icon className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
              </div>
              <h3 className="mt-4 text-base font-medium text-zinc-900 dark:text-white">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
