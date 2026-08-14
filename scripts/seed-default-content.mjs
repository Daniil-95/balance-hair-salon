import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const uploadedHero = "1786267518870-IMG_1426.PNG";

const heroMeta = {
  _schema: "hero-meta-v1",
  meta: {
    overline: "Kadeřnické studio",
    imageAlt: "Interier salonu Balance",
    instagramUrl: "https://www.instagram.com/balance.kadernictvi",
    instagramLabel: "Instagram",
    whatsappLabel: "Whatsapp",
    whatsappUrl: "+420603561625",
    openingHoursLabel: "Po-Pa 8:00-18:00",
    metaRowLeftLabel: "Cenkov 93, 262 23 Cenkov",
    metaRowCenterLabel: "Po-Pa 8:00-18:00",
    metaRowRightLabel: "+420 603 561 625"
  }
};

const aboutMeta = {
  _schema: "about-meta-v1",
  meta: {
    overline: "O nas",
    secondParagraph:
      "Nasz salon je misto, kde se profesionalni pece setkava s prijemnou atmosferou. Kazde navsteve venujeme cas i individualni pristup.",
    secondaryImage: uploadedHero,
    imageMainAlt: "Tym salonu Balance",
    imageCutawayAlt: "Detail interieru salonu"
  }
};

const services = [
  {
    title: "Damsky strih",
    description: "Precizni strih podle tvaru obliceje a typu vlasu.",
    icon: "✂",
    order: 1
  },
  {
    title: "Barveni vlasu",
    description: "Jednobarevne barveni, melir i moderni techniky.",
    icon: "🎨",
    order: 2
  },
  {
    title: "Styling",
    description: "Foukana, zehleni, kulmovani i slavnostni uprava.",
    icon: "✨",
    order: 3
  },
  {
    title: "Regenerace",
    description: "Hloubkova pece a vyzivne ritualy pro zdrave vlasy.",
    icon: "💆",
    order: 4
  }
];

const pricing = [
  {
    name: "Damske sluzby",
    order: 1,
    items: [
      { title: "Strih + foukana", price: "od 790 Kc", order: 1 },
      { title: "Barveni", price: "od 1190 Kc", order: 2 },
      { title: "Melir", price: "od 1390 Kc", order: 3 }
    ]
  },
  {
    name: "Panske sluzby",
    order: 2,
    items: [
      { title: "Pansky strih", price: "od 390 Kc", order: 1 },
      { title: "Uprava vousu", price: "od 220 Kc", order: 2 }
    ]
  }
];

const openingHours = [
  { day: "Pondeli", open: "8:00", close: "18:00", isClosed: false, order: 0 },
  { day: "Utery", open: "8:00", close: "18:00", isClosed: false, order: 1 },
  { day: "Streda", open: "8:00", close: "18:00", isClosed: false, order: 2 },
  { day: "Ctvrtek", open: "8:00", close: "18:00", isClosed: false, order: 3 },
  { day: "Patek", open: "8:00", close: "18:00", isClosed: false, order: 4 },
  { day: "Sobota", open: "dle objednani", close: "", isClosed: false, order: 5 },
  { day: "Nedele", open: "", close: "", isClosed: true, order: 6 }
];

async function seed() {
  const counts = {
    hero: await prisma.hero.count(),
    about: await prisma.about.count(),
    services: await prisma.service.count(),
    priceCategories: await prisma.priceCategory.count(),
    galleryCategories: await prisma.galleryCategory.count(),
    contact: await prisma.contact.count(),
    openingHours: await prisma.openingHour.count(),
    siteSettings: await prisma.siteSettings.count(),
    seo: await prisma.seo.count()
  };

  if (counts.siteSettings === 0) {
    await prisma.siteSettings.create({
      data: {
        salonName: "Balance",
        tagline: "Vas styl. Nase pece.",
        heroCtaLabel: "Objednat termin online",
        heroCtaUrl: "https://invia.cz/objednani/",
        navigationLogoName: "Balance",
        navigationLogoSub: "Kadernicke studio",
        servicesSectionTitle: "Strih, barveni a pece v jednom miste.",
        servicesSectionSub: "Vyberte si sluzbu podle sveho stylu a potreb vlasu.",
        pricingSectionTitle: "Ceny sluzeb na jednom miste.",
        pricingSectionSub: "Presna cena zavisi na delce, hustote vlasu a zvolenem vysledku.",
        contactSectionTitle: "Ozte se nam nebo se stavte v salonu.",
        contactSectionSub: "Telefon, WhatsApp i mapa na jednom miste.",
        contactCardTitle: "Zastavte se u nás nebo nám napište.",
        contactCardDescription: "Salon Balance najdete v Cenkově. Pro rychlý kontakt využijte telefon nebo WhatsApp, pro novinky sledujte Instagram."
      }
    });
  }

  if (counts.hero === 0) {
    await prisma.hero.create({
      data: {
        headline: "Balance",
        subheadline: "Vas styl. Nase pece.",
        ctaLabel: "Objednat termin online",
        ctaUrl: "https://invia.cz/objednani/",
        image: uploadedHero,
        background: JSON.stringify(heroMeta)
      }
    });
  }

  if (counts.about === 0) {
    await prisma.about.create({
      data: {
        title: "Misto, kde se budete citit dobre",
        description:
          "V salonu Balance se zamerujeme na individualni pristup, moderni techniky a prirozeny vysledek, ktery podrhne vas styl.",
        image: uploadedHero,
        highlights: JSON.stringify(aboutMeta)
      }
    });
  }

  if (counts.services === 0) {
    await prisma.service.createMany({ data: services });
  }

  if (counts.priceCategories === 0) {
    for (const category of pricing) {
      const created = await prisma.priceCategory.create({
        data: {
          name: category.name,
          order: category.order
        }
      });

      await prisma.priceItem.createMany({
        data: category.items.map((item) => ({
          categoryId: created.id,
          title: item.title,
          price: item.price,
          order: item.order
        }))
      });
    }
  }

  if (counts.galleryCategories === 0) {
    const galleryCategory = await prisma.galleryCategory.create({
      data: {
        name: "Galerie",
        slug: "default",
        order: 0
      }
    });

    await prisma.galleryImage.createMany({
      data: [
        {
          title: "Interier salonu",
          alt: "Interier salonu",
          filename: uploadedHero,
          categoryId: galleryCategory.id,
          order: 1
        },
        {
          title: "Detail pracoviste",
          alt: "Detail pracoviste",
          filename: uploadedHero,
          categoryId: galleryCategory.id,
          order: 2
        },
        {
          title: "Uces po navsteve",
          alt: "Uces po navsteve",
          filename: uploadedHero,
          categoryId: galleryCategory.id,
          order: 3
        }
      ]
    });
  }

  if (counts.contact === 0) {
    await prisma.contact.create({
      data: {
        address: "Cenkov 93, 262 23 Cenkov",
        phone: "+420 603 561 625",
        whatsapp: "+420 603 561 625",
        email: "info@balancekadernictvi.cz",
        mapUrl: "https://maps.google.com/?q=Cenkov+93"
      }
    });
  }

  if (counts.openingHours === 0) {
    await prisma.openingHour.createMany({ data: openingHours });
  }

  if (counts.seo === 0) {
    await prisma.seo.create({
      data: {
        title: "Kadernictvi Balance v Cenkove | Damske a panske strihy",
        description: "Kadernicke sluzby, barveni, styling a pece o vlasy v Cenkove.",
        keywords: "kadernictvi,cenkov,strih,barveni,styling",
        canonicalUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
        ogTitle: "Kadernictvi Balance",
        ogDescription: "Kadernicke studio v Cenkove",
        robots: "index"
      }
    });
  }

  console.log("Seed completed.");
}

seed()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
