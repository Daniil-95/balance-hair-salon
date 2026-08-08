export interface PublicPriceItem {
  label: string;
  value: string;
}

export interface PublicPriceCategory {
  title: string;
  items: PublicPriceItem[];
}

export const publicPriceColumns: PublicPriceCategory[] = [
  {
    title: "Dámské střihy",
    items: [
      { label: "Střih", value: "620 Kč" },
      { label: "Střih + foukaná", value: "760 Kč" },
      { label: "Foukaná", value: "450 Kč" }
    ]
  },
  {
    title: "Barvení",
    items: [
      { label: "Barva odrosty", value: "990 Kč" },
      { label: "Kompletní barvení", value: "1 350 Kč" },
      { label: "Přeliv / toner", value: "650 Kč" },
      { label: "Tónování", value: "850 Kč" }
    ]
  },
  {
    title: "Pánské střihy",
    items: [
      { label: "Střih", value: "450 Kč" },
      { label: "Střih + úprava vousů", value: "600 Kč" }
    ]
  },
  {
    title: "Melír / balayage",
    items: [
      { label: "Melír", value: "od 1 590 Kč" },
      { label: "Balayage", value: "od 1 950 Kč" },
      { label: "AirTouch", value: "od 2 990 Kč" }
    ]
  },
  {
    title: "Styling",
    items: [
      { label: "Foukaná", value: "450 Kč" },
      { label: "Vlny / kulmy", value: "650 Kč" },
      { label: "Společenský účes", value: "1 290 Kč" }
    ]
  }
];
