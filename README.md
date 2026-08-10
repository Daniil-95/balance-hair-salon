# Balance Hair Salon

Moderní prezentační web pro kadeřnické studio s vlastní administrací a obsahem řízeným z databáze.

Projekt je postaven bez externího CMS, aby bylo možné mít plnou kontrolu nad architekturou, datovým modelem i editací obsahu.

## Hlavní výhody

- Veřejná prezentační část: úvod, služby, ceník, galerie, kontakt, ochrana osobních údajů.
- Interní administrace na `/admin` pro správu obsahu.
- JWT autentizace, ochrana admin rout a autorizace server actions.
- Prisma + PostgreSQL (připraveno pro Supabase).
- Nahrávání obrázků (Vercel Blob + kompatibilita se staršími lokálními cestami).
- Dynamické SEO spravované přímo z administrace.

## Rozsah administrace

Po přihlášení (`/admin/login`) lze spravovat:

- Přehled
- Úvodní sekce
- O nás
- Služby
- Ceník
- Galerie
- Kontakt
- SEO
- Nastavení

## Technologie

- Next.js 15 (App Router)
- React 19
- TypeScript
- SCSS Modules
- Prisma ORM
- PostgreSQL (Supabase)
- JWT (autentizace přes cookies)
- Fancybox + Swiper
- Zod validace

## Rychlý start

```bash
npm install
npm run prisma:generate
npm run db:push
npm run dev
```

Aplikace poběží lokálně na `http://localhost:3000`.


## Skripty

```bash
npm run dev              # prisma generate + next dev
npm run build            # prisma generate + next build
npm run start            # next start
npm run lint             # eslint
npm run format           # prettier --write .
npm run prisma:generate  # prisma generate
npm run db:push          # prisma db push
npm run db:seed          # prisma db seed
npm run db:reset         # prisma migrate reset
npm run prisma:migrate   # prisma migrate dev --name init
npm run prisma:pull      # prisma db pull
```

## Proč je tento projekt zajímavý

Projekt ukazuje kompletní vlastnictví reálného webového produktu pro podnikání:

- vlastní architektonická rozhodnutí (bez externího CMS),
- kompletní implementaci (UI, autentizace, databáze, administrační workflow),
- produkčně orientované řešení (validace, chráněné akce, stack připravený na nasazení).
