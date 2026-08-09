# Balance Hair Salon

Moderní prezentační web pro kadeřnické studio s vlastní administrací obsahu.

Projekt je navržen jako lehké, rychlé a plně kontrolovatelné řešení bez závislosti na externích CMS platformách.

---

## 🧩 O projektu

Web slouží jako kompletní online prezentace salonu a pokrývá všechny klíčové potřeby:

- přehled služeb,
- ceník,
- galerie realizací,
- kontaktní informace a otevírací doba,
- interní administrace pro správu obsahu.

Obsah spravovaný v administraci je okamžitě dostupný ve veřejné části aplikace.

---

## ⚙️ Tech Stack

- **Next.js 15 (App Router)**
- **React 19**
- **TypeScript**
- **SCSS Modules**
- **Prisma ORM**
- **SQLite**
- **JWT Authentication**
- **Fancybox (gallery)**

---

## 🚀 Funkcionalita

- responzivní marketingový web,
- vlastní admin panel (`/admin`),
- správa:
  - služeb,
  - ceníku,
  - galerie,
  - kontaktů,
  - globálního nastavení,
- upload obrázků,
- zabezpečená autentizace (JWT),
- ochrana neveřejných rout,
- role-based přístup (ADMIN).

---

## 🔐 Administrace

Pro správné fungování je nutné nastavit environment proměnné:

- `DATABASE_URL`
- `JWT_SECRET`
- `ADMIN_SETUP_KEY`

### První vytvoření admina

1. Otevřete `/admin/login`
2. Přepněte na režim vytvoření admina
3. Zadejte e-mail, heslo a `ADMIN_SETUP_KEY`

Po vytvoření prvního účtu je setup klíč dále nevyužíván.

---

## ▶️ Spuštění projektu

```bash
npm install
npm run prisma:generate
npm run dev