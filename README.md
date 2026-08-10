# Balance Hair Salon

Moderní prezentační web pro kadeřnické studio s vlastní administrací obsahu.

Projekt je postaven jako lehké a plně kontrolovatelné řešení bez externího CMS.

---

## O projektu

Web pokrývá klíčové potřeby salonu:

- úvodní sekce,
- sekce O nás,
- služby,
- ceník,
- galerie,
- kontakt a otevírací doba,
- stránka Ochrana osobních údajů,
- interní administrace pro správu obsahu.

Obsah uložený v administraci se promítá do veřejné části webu.

---

## Tech Stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- SCSS Modules
- Prisma ORM
- PostgreSQL (Supabase)
- JWT autentizace
- Fancybox + Swiper (galerie)

---

## Co je hotové

- responzivní veřejný web,
- vlastní admin panel na `/admin`,
- správa hero, O nás, služeb, ceníku, galerie, kontaktu, SEO a globálních nastavení,
- správa textů navigace a patičky odděleně,
- správa title/subtitle pro sekce hlavní stránky,
- editovatelný obsah stránky Ochrana osobních údajů,
- upload obrázků přes admin formuláře,
- ochrana admin rout + ochrana server actions.

---

## Administrace

Admin je dostupný na:

- `/admin/login`

Po přihlášení jsou dostupné sekce:

- Přehled
- Úvodní sekce
- O nás
- Služby
- Galerie
- Ceník
- Kontakt
- SEO
- Nastavení

---

## Nastavení prostředí

Projekt používá oddělené profily pro vývoj a produkci.

Povinné proměnné:

- `DATABASE_URL`
- `DIRECT_URL`
- `JWT_SECRET`
- `ADMIN_SETUP_KEY`
- `NEXT_PUBLIC_SITE_URL`

Volitelná proměnná pro obrázky:

- `NEXT_PUBLIC_UPLOADS_BASE_URL`

### Doporučené rozdělení

1. `/.env` nebo `/.env.production`:
	hodnoty pro produkční databázi a produkční URL.
2. `/.env.development.local`:
	lokální přepisy pouze pro vývoj (soubor je ignorovaný v Gitu).

Minimální lokální přepis:

```env
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

Pokud lokálně používáte vzdálenou DB (např. produkční) a v `public/uploads` chybí soubory,
nastavte i:

```env
NEXT_PUBLIC_UPLOADS_BASE_URL="https://your-production-domain.com"
```

Pak se veřejné obrázky budou načítat z tohoto hostu.

Příklad pro Supabase:

```env
DATABASE_URL="postgresql://postgres.<project-ref>:<password>@aws-<region>.pooler.supabase.com:6543/postgres?pgbouncer=true&sslmode=require"
DIRECT_URL="postgresql://postgres.<project-ref>:<password>@aws-<region>.pooler.supabase.com:5432/postgres?sslmode=require"
```

---

## Spuštění lokálně

```bash
npm install
npx prisma generate
npx prisma db push
npm run dev
```

### Další příkazy

```bash
npm run lint
npm run build
npm run start
```

---

## První vytvoření admin účtu

1. Otevřete `/admin/login`.
2. Přepněte na režim vytvoření prvního admina.
3. Zadejte e-mail, heslo a `ADMIN_SETUP_KEY`.

Po vytvoření prvního admina setup endpoint přirozeně ztrácí význam pro další bootstrap.
