"use server";

import { revalidatePath } from "next/cache";
import { createService, deleteService, toggleServiceFeatured, updateService } from "@/lib/services";

export async function createServiceAction(formData: FormData) {
  const title = formData.get("title")?.toString() ?? "";
  const description = formData.get("description")?.toString() ?? "";
  const icon = formData.get("icon")?.toString() ?? "";
  const order = Number(formData.get("order") ?? 0);

  if (!title || !description || !icon) {
    return;
  }

  await createService({ title, description, icon, order });
  revalidatePath("/admin/services");
}

export async function updateServiceAction(formData: FormData) {
  const id = formData.get("id")?.toString();
  const title = formData.get("title")?.toString() ?? "";
  const description = formData.get("description")?.toString() ?? "";
  const icon = formData.get("icon")?.toString() ?? "";
  const order = Number(formData.get("order") ?? 0);

  if (!id || !title || !description || !icon) {
    return;
  }

  await updateService({ id, title, description, icon, order });
  revalidatePath("/admin/services");
}

export async function deleteServiceAction(formData: FormData) {
  const id = formData.get("id")?.toString();
  if (!id) {
    return;
  }

  await deleteService(id);
  revalidatePath("/admin/services");
}

export async function toggleServiceFeaturedAction(formData: FormData) {
  const id = formData.get("id")?.toString();
  const featured = formData.get("featured")?.toString() === "true";
  if (!id) {
    return;
  }

  await toggleServiceFeatured(id, featured);
  revalidatePath("/admin/services");
}
