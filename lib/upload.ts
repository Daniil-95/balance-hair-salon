import { put, del } from "@vercel/blob";

export async function uploadToBlob(file: File): Promise<string> {
  const { url } = await put(`${Date.now()}-${file.name}`, file, { access: "public" });
  return url;
}

export async function deleteBlobByUrl(url: string): Promise<void> {
  await del(url);
}
