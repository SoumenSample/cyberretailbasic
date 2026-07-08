import { NextResponse } from "next/server";

const PREMIUM_MESSAGE = "Shelf Management is a premium feature. Contact sales to upgrade your business plan.";

export async function PATCH() {
  return NextResponse.json({ error: PREMIUM_MESSAGE, code: "PREMIUM_FEATURE" }, { status: 403 });
}

export async function DELETE() {
  return NextResponse.json({ error: PREMIUM_MESSAGE, code: "PREMIUM_FEATURE" }, { status: 403 });
}
