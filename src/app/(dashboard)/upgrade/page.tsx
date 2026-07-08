import { Lock, ArrowLeft, Mail, Phone } from "lucide-react";
import Link from "next/link";

export default function UpgradePage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-6">
      <div className="w-full max-w-lg text-center space-y-8">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-amber-100 dark:bg-amber-900/30">
          <Lock className="h-10 w-10 text-amber-600 dark:text-amber-400" />
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">
            Premium Feature
          </h1>
          <p className="text-lg text-zinc-500 dark:text-zinc-400">
            Shelf Management and Employee Management are premium features
            available in our Business and Enterprise plans.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 text-left space-y-4">
          <h2 className="text-lg font-medium text-zinc-900 dark:text-white">
            Upgrade to unlock:
          </h2>
          <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
            <li className="flex items-center gap-3">
              <div className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              Shelf & bin-level inventory tracking
            </li>
            <li className="flex items-center gap-3">
              <div className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              Barcode & QR code shelf labels
            </li>
            <li className="flex items-center gap-3">
              <div className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              Employee onboarding & role management
            </li>
            <li className="flex items-center gap-3">
              <div className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              Attendance, shifts & payroll tracking
            </li>
            <li className="flex items-center gap-3">
              <div className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              Performance reviews & analytics
            </li>
          </ul>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Link
              href="mailto:cyberspaceworks@gmail.com"
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-zinc-900 px-6 text-sm font-medium text-white shadow-md transition-all hover:bg-zinc-800 hover:shadow-lg dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              <Mail className="h-4 w-4" />
              Contact Sales
            </Link>
            <Link
              href="tel:+919876543210"
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-zinc-200 bg-white px-6 text-sm font-medium text-zinc-900 shadow-sm transition-all hover:border-zinc-300 hover:bg-zinc-50 hover:shadow dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-700 dark:hover:bg-zinc-800"
            >
              <Phone className="h-4 w-4" />
              Call Us
            </Link>
          </div>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
