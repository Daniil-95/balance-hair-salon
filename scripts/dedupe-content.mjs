import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ log: ["error", "warn"] });

function normalize(value) {
  return (value ?? "")
    .toString()
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

async function dedupeByKey(modelName, rows, keyFn) {
  const groups = new Map();

  for (const row of rows) {
    const key = keyFn(row);
    if (!key) continue;

    const list = groups.get(key) ?? [];
    list.push(row);
    groups.set(key, list);
  }

  let removed = 0;

  for (const [, list] of groups) {
    if (list.length <= 1) continue;

    list.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    const removeIds = list.slice(1).map((item) => item.id);

    if (!removeIds.length) continue;

    const result = await prisma[modelName].deleteMany({
      where: { id: { in: removeIds } },
    });

    removed += result.count;
  }

  return removed;
}

async function main() {
  await prisma.$connect();

  const report = [];

  const openingHours = await prisma.openingHour.findMany({
    select: { id: true, day: true, updatedAt: true },
  });

  const openingHourRemoved = await dedupeByKey("openingHour", openingHours, (row) => normalize(row.day));
  report.push({ table: "OpeningHour", removed: openingHourRemoved });

  const services = await prisma.service.findMany({
    select: { id: true, title: true, updatedAt: true },
  });

  const serviceRemoved = await dedupeByKey("service", services, (row) => normalize(row.title));
  report.push({ table: "Service", removed: serviceRemoved });

  const priceItems = await prisma.priceItem.findMany({
    select: { id: true, categoryId: true, title: true, price: true, description: true, updatedAt: true },
  });

  const priceItemRemoved = await dedupeByKey(
    "priceItem",
    priceItems,
    (row) => `${row.categoryId}|${normalize(row.title)}|${normalize(row.price)}|${normalize(row.description)}`
  );
  report.push({ table: "PriceItem(exact)", removed: priceItemRemoved });

  const galleryCategories = await prisma.galleryCategory.findMany({
    select: { id: true, slug: true, updatedAt: true },
  });

  const galleryCategoryRemoved = await dedupeByKey("galleryCategory", galleryCategories, (row) => normalize(row.slug));
  report.push({ table: "GalleryCategory(exact slug)", removed: galleryCategoryRemoved });

  const galleryImages = await prisma.galleryImage.findMany({
    select: { id: true, categoryId: true, filename: true, title: true, alt: true, updatedAt: true },
  });

  const galleryImageRemoved = await dedupeByKey(
    "galleryImage",
    galleryImages,
    (row) => `${row.categoryId}|${normalize(row.filename)}|${normalize(row.title)}|${normalize(row.alt)}`
  );
  report.push({ table: "GalleryImage(exact)", removed: galleryImageRemoved });

  console.log(JSON.stringify(report, null, 2));

  const totals = {
    services: await prisma.service.count(),
    priceCategories: await prisma.priceCategory.count(),
    priceItems: await prisma.priceItem.count(),
    galleryCategories: await prisma.galleryCategory.count(),
    galleryImages: await prisma.galleryImage.count(),
    openingHours: await prisma.openingHour.count(),
  };

  console.log("Totals:", JSON.stringify(totals, null, 2));
}

main()
  .catch((error) => {
    console.error("Dedupe failed:", error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
