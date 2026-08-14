import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const heroMeta = JSON.stringify({
    _schema: "hero-meta-v1",
    meta: {
      overline: "Kadernicke studio",
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
  });

  const aboutMeta = JSON.stringify({
    _schema: "about-meta-v1",
    meta: {
      overline: "O nas",
      secondParagraph:
        "Nasz salon je misto, kde se profesionalni pece setkava s prijemnou atmosferou. Kazde navsteve venujeme cas i individualni pristup.",
      secondaryImage: "1786267518870-IMG_1426.PNG",
      imageMainAlt: "Tym salonu Balance",
      imageCutawayAlt: "Detail interieru salonu"
    }
  });

  const settings = await prisma.siteSettings.findFirst();
  if (!settings) {
    await prisma.siteSettings.create({
      data: {
        salonName: "Balance",
        tagline: "Vas styl. Nase pece.",
        heroCtaLabel: "Objednat termin online",
        heroCtaUrl: "https://invia.cz/objednani/",
        contactCardTitle: "Zastavte se u nás nebo nám napište.",
        contactCardDescription:
          "Salon Balance najdete v Cenkově. Pro rychlý kontakt využijte telefon nebo WhatsApp, pro novinky sledujte Instagram.",
      }
    });
  }

  const hero = await prisma.hero.findFirst();
  if (!hero) {
    await prisma.hero.create({
      data: {
        headline: "Balance",
        subheadline: "Vas styl. Nase pece.",
        ctaLabel: "Objednat termin online",
        ctaUrl: "https://invia.cz/objednani/",
        image: "1786267518870-IMG_1426.PNG",
        background: heroMeta
      }
    });
  }

  const about = await prisma.about.findFirst();
  if (!about) {
    await prisma.about.create({
      data: {
        title: "Misto, kde se budete citit dobre",
        description:
          "V salonu Balance se zamerujeme na individualni pristup, moderni techniky a prirozeny vysledek, ktery podrhne vas styl.",
        image: "1786267518870-IMG_1426.PNG",
        highlights: aboutMeta
      }
    });
  }

  const servicesCount = await prisma.service.count();
  if (servicesCount === 0) {
    await prisma.service.createMany({
      data: [
        { title: "Damsky strih", description: "Precizni strih podle tvaru obliceje.", icon: "✂", order: 1 },
        { title: "Barveni vlasu", description: "Jednobarevne barveni i moderni techniky.", icon: "🎨", order: 2 },
        { title: "Styling", description: "Foukana, zehleni i slavnostni uprava.", icon: "✨", order: 3 }
      ]
    });
  }

  console.log("Prisma seed completed.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
