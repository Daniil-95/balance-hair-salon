import fs from "node:fs";
import path from "node:path";
import initSqlJs from "sql.js";
import { PrismaClient } from "@prisma/client";

const sqlitePath = path.resolve(process.cwd(), process.argv[2] || "prisma/dev.db");

const TABLES = [
  { table: "User", delegate: "user", booleans: [] },
  { table: "Hero", delegate: "hero", booleans: [] },
  { table: "About", delegate: "about", booleans: [] },
  { table: "Service", delegate: "service", booleans: ["featured"] },
  { table: "PriceCategory", delegate: "priceCategory", booleans: [] },
  { table: "GalleryCategory", delegate: "galleryCategory", booleans: [] },
  { table: "Review", delegate: "review", booleans: [] },
  { table: "SocialLink", delegate: "socialLink", booleans: [] },
  { table: "Contact", delegate: "contact", booleans: [] },
  { table: "OpeningHour", delegate: "openingHour", booleans: ["isClosed"] },
  { table: "Seo", delegate: "seo", booleans: [] },
  { table: "SiteSettings", delegate: "siteSettings", booleans: [] },
  { table: "PriceItem", delegate: "priceItem", booleans: [] },
  { table: "GalleryImage", delegate: "galleryImage", booleans: [] },
];

function toBoolean(value) {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value !== 0;
  if (typeof value === "string") return value === "1" || value.toLowerCase() === "true";
  return Boolean(value);
}

function normalizeRow(row, booleanFields) {
  const normalized = {};

  for (const [key, value] of Object.entries(row)) {
    if (value === undefined) continue;

    if (value === null) {
      normalized[key] = null;
      continue;
    }

    if (booleanFields.includes(key)) {
      normalized[key] = toBoolean(value);
      continue;
    }

    if (key === "createdAt" || key === "updatedAt") {
      if (typeof value === "string" || typeof value === "number") {
        normalized[key] = new Date(value);
        continue;
      }
    }

    normalized[key] = value;
  }

  return normalized;
}

function readTable(db, table) {
  const result = db.exec(`SELECT * FROM "${table}"`);
  if (!result.length) return [];

  const [{ columns, values }] = result;

  return values.map((valueRow) => {
    const row = {};
    for (let i = 0; i < columns.length; i += 1) {
      row[columns[i]] = valueRow[i];
    }
    return row;
  });
}

async function main() {
  if (!fs.existsSync(sqlitePath)) {
    throw new Error(`SQLite file not found: ${sqlitePath}`);
  }

  const wasmPath = path.resolve(process.cwd(), "node_modules/sql.js/dist");
  const SQL = await initSqlJs({
    locateFile: (file) => path.join(wasmPath, file),
  });

  const sqliteBinary = fs.readFileSync(sqlitePath);
  const sqliteDb = new SQL.Database(sqliteBinary);

  const prisma = new PrismaClient({ log: ["error", "warn"] });

  try {
    await prisma.$connect();

    let totalRows = 0;

    for (const config of TABLES) {
      const rows = readTable(sqliteDb, config.table);
      totalRows += rows.length;

      if (rows.length === 0) {
        console.log(`[skip] ${config.table}: 0 rows`);
        continue;
      }

      const delegate = prisma[config.delegate];
      let applied = 0;

      for (const sourceRow of rows) {
        const row = normalizeRow(sourceRow, config.booleans);
        const id = row.id;

        if (!id) {
          continue;
        }

        const { id: _, ...updateData } = row;

        await delegate.upsert({
          where: { id },
          update: updateData,
          create: row,
        });

        applied += 1;
      }

      console.log(`[ok] ${config.table}: source=${rows.length}, upserted=${applied}`);
    }

    console.log(`Done. Processed rows: ${totalRows}`);
  } finally {
    await prisma.$disconnect();
    sqliteDb.close();
  }
}

main().catch((error) => {
  console.error("Restore failed:", error.message);
  process.exitCode = 1;
});
