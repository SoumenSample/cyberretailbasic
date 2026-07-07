import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function requireSession() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  return session;
}

export async function requireBusinessContext() {
  const session = await requireSession();
  if (!session.user.businessId) redirect("/dashboard");
  return session;
}

export async function getBusinessId() {
  const session = await requireBusinessContext();
  return session.user.businessId as string;
}
