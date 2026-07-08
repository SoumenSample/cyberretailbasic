import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getCloudinary } from "@/lib/cloudinary";
import { rateLimit } from "@/lib/rate-limit";
import { validateUploadFile, sanitizeFolderName } from "@/utils/sanitize";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  const limiter = rateLimit(`upload:${ip}`, 30, 60_000);
  if (!limiter.ok) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const rawFolder = String(formData.get("folder") ?? "gstandbilling");
  const folder = `${session.user.businessId}/${sanitizeFolderName(rawFolder)}`;

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "File is required" }, { status: 400 });
  }

  const validation = validateUploadFile(file);
  if (!validation.ok) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const base64 = buffer.toString("base64");
  const mime = file.type;

  let cloudinary;
  try {
    cloudinary = getCloudinary();
  } catch {
    return NextResponse.json(
      { error: "Cloudinary not configured" },
      { status: 500 }
    );
  }

  try {
    const result = await cloudinary.uploader.upload(
      `data:${mime};base64,${base64}`,
      {
        folder,
        resource_type: "image",
        secure: true,
      }
    );

    return NextResponse.json({
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true });
}
