import { NextResponse } from "next/server";

const PREMIUM_MESSAGE = "Employee Management is a premium feature. Contact sales to upgrade your business plan.";

export async function GET() {
  return NextResponse.json({ error: PREMIUM_MESSAGE, code: "PREMIUM_FEATURE" }, { status: 403 });
}

export async function PUT() {
  return NextResponse.json({ error: PREMIUM_MESSAGE, code: "PREMIUM_FEATURE" }, { status: 403 });
}

export async function DELETE() {
  return NextResponse.json({ error: PREMIUM_MESSAGE, code: "PREMIUM_FEATURE" }, { status: 403 });
}
