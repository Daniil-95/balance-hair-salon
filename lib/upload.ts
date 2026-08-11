import { put, del } from "@vercel/blob";

const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;
const ALLOWED_IMAGE_MIME_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"]);

export function validateUploadImageFile(file: File | null | undefined) {
  if (!file) {
    throw new Error("Nebyl vybran zadny soubor.");
  }

  if (file.size <= 0) {
    throw new Error("Soubor je prazdny.");
  }

  if (file.size > MAX_UPLOAD_BYTES) {
    throw new Error("Soubor je prilis velky. Maximalni velikost je 10 MB.");
  }

  if (!ALLOWED_IMAGE_MIME_TYPES.has(file.type)) {
    throw new Error("Nepodporovany format souboru.");
  }
}

export async function uploadToBlob(file: File): Promise<string> {
  const { url } = await put(`${Date.now()}-${file.name}`, file, { access: "public" });
  return url;
}

export async function deleteBlobByUrl(url: string): Promise<void> {
  await del(url);
}
