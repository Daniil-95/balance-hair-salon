"use server";

import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/auth";
import { createPriceCategory, createPriceItem, deletePriceCategory, deletePriceItem, updatePriceCategory, updatePriceItem } from "@/lib/prices";

function revalidatePricingViews() {
  revalidatePath("/admin/pricing");
  revalidatePath("/");
  revalidatePath("/pricing");
}

export async function createPriceCategoryAction(formData: FormData) {
  await requireAdminSession();
  const name = formData.get("name")?.toString() ?? "";
  const order = Number(formData.get("order") ?? 0);

  if (!name) {
    return;
  }

  await createPriceCategory({ name, order });
  revalidatePricingViews();
}

export async function updatePriceCategoryAction(formData: FormData) {
  await requireAdminSession();
  const id = formData.get("id")?.toString();
  const name = formData.get("name")?.toString() ?? "";
  const order = Number(formData.get("order") ?? 0);

  if (!id || !name) {
    return;
  }

  await updatePriceCategory({ id, name, order });
  revalidatePricingViews();
}

export async function deletePriceCategoryAction(formData: FormData) {
  await requireAdminSession();
  const id = formData.get("id")?.toString();
  if (!id) {
    return;
  }

  await deletePriceCategory(id);
  revalidatePricingViews();
}

export async function createPriceItemAction(formData: FormData) {
  await requireAdminSession();
  const categoryId = formData.get("categoryId")?.toString() ?? "";
  const title = formData.get("title")?.toString() ?? "";
  const price = formData.get("price")?.toString() ?? "";
  const order = Number(formData.get("order") ?? 0);

  if (!categoryId || !title || !price) {
    return;
  }

  await createPriceItem({ categoryId, title, price, order });
  revalidatePricingViews();
}

export async function updatePriceItemAction(formData: FormData) {
  await requireAdminSession();
  const id = formData.get("id")?.toString();
  const title = formData.get("title")?.toString() ?? "";
  const price = formData.get("price")?.toString() ?? "";
  const order = Number(formData.get("order") ?? 0);

  if (!id || !title || !price) {
    return;
  }

  await updatePriceItem({ id, title, price, order });
  revalidatePricingViews();
}

export async function deletePriceItemAction(formData: FormData) {
  await requireAdminSession();
  const id = formData.get("id")?.toString();
  if (!id) {
    return;
  }

  await deletePriceItem(id);
  revalidatePricingViews();
}
