export interface PublicGalleryItem {
  title: string;
  label: string;
  description: string;
  position: string;
  src: string;
  alt: string;
}

export const publicGalleryItems: PublicGalleryItem[] = [
  {
    title: "Recepce",
    label: "Balance",
    description: "Vstupní recepce s teplým osvětlením, zlatými akcenty a klidnou atmosférou salonu.",
    position: "left center",
    src: "/images/image.png",
    alt: "Recepce salonu Balance"
  },
  {
    title: "Přípravna",
    label: "Interiér",
    description: "Detail zóny pro přípravu barev a péči, kde se propojuje funkčnost s čistým vizuálním stylem.",
    position: "center center",
    src: "/images/image.png",
    alt: "Přípravná část interiéru salonu Balance"
  },
  {
    title: "Logo stěna",
    label: "Balance",
    description: "Dominantní brand wall, která podtrhuje identitu studia a vytváří reprezentativní první dojem.",
    position: "center left",
    src: "/images/image.png",
    alt: "Logo stěna salonu Balance"
  },
  {
    title: "Zrcadla",
    label: "Studio",
    description: "Stylingová místa s podsvícenými zrcadly a vyváženým světlem pro komfort klientů i přesnou práci.",
    position: "right center",
    src: "/images/image.png",
    alt: "Stylingová zóna se zrcadly v salonu Balance"
  },
  {
    title: "Detail",
    label: "Atmosféra",
    description: "Atmosférický detail interiéru, který zachycuje materiály, světlo a celkový premium charakter prostoru.",
    position: "center right",
    src: "/images/image.png",
    alt: "Atmosférický detail interiéru salonu Balance"
  }
];
