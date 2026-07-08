export function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const ALLOWED_UPLOAD_MIMES = new Set([
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
  "application/pdf",
]);

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export function validateUploadFile(file: File): { ok: true } | { ok: false; error: string } {
  if (!ALLOWED_UPLOAD_MIMES.has(file.type)) {
    return { ok: false, error: "File type not allowed" };
  }
  if (file.size > MAX_FILE_SIZE) {
    return { ok: false, error: "File too large (max 5MB)" };
  }
  return { ok: true };
}

export function sanitizeFolderName(raw: string): string {
  return raw.replace(/[^a-zA-Z0-9/_-]/g, "").replace(/\.\./g, "").slice(0, 100);
}
