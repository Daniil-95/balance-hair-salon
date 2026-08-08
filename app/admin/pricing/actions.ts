"use server";

import { revalidatePath } from "next/cache";
import { createPriceCategory, createPriceItem, deletePriceCategory, deletePriceItem, updatePriceCategory, updatePriceItem } from "@/lib/prices";

export async function createPriceCategoryAction(formData: FormData) {
  const name = formData.get("name")?.toString() ?? "";
  const description = formData.get("description")?.toString() || undefined;
  const order = Number(formData.get("order") ?? 0);

  if (!name) {
    return;
  }

  await createPriceCategory({ name, description, order });
  revalidatePath("/admin/pricing");
}

export async function updatePriceCategoryAction(formData: FormData) {
  const id = formData.get("id")?.toString();
  const name = formData.get("name")?.toString() ?? "";
  const description = formData.get("description")?.toString() || undefined;
  const order = Number(formData.get("order") ?? 0);

  if (!id || !name) {
    return;
  }

  await updatePriceCategory({ id, name, description, order });
  revalidatePath("/admin/pricing");
}

export async function deletePriceCategoryAction(formData: FormData) {
  const id = formData.get("id")?.toString();
  if (!id) {
    return;
  }

  await deletePriceCategory(id);
  revalidatePath("/admin/pricing");
}

export async function createPriceItemAction(formData: FormData) {
  const categoryId = formData.get("categoryId")?.toString() ?? "";
  const title = formData.get("title")?.toString() ?? "";
  const price = formData.get("price")?.toString() ?? "";
  const description = formData.get("description")?.toString() || undefined;
  const order = Number(formData.get("order") ?? 0);

  if (!categoryId || !title || !price) {
    return;
  }

  await createPriceItem({ categoryId, title, price, description, order });
  revalidatePath("/admin/pricing");
}

export async function updatePriceItemAction(formData: FormData) {
  const id = formData.get("id")?.toString();
  const title = formData.get("title")?.toString() ?? "";
  const price = formData.get("price")?.toString() ?? "";
  const description = formData.get("description")?.toString() || undefined;
  const order = Number(formData.get("order") ?? 0);

  if (!id || !title || !price) {
    return;
  }

  await updatePriceItem({ id, title, price, description, order });
  revalidatePath("/admin/pricing");
}

export async function deletePriceItemAction(formData: FormData) {
  const id = formData.get("id")?.toString();
  if (!id) {
    return;
  }

  await deletePriceItem(id);
  revalidatePath("/admin/pricing");
}
