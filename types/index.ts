export type NavItem = {
  label: string;
  href: string;
};

export type ServiceItem = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export type PriceItem = {
  id: string;
  category: string;
  item: string;
  price: string;
  description?: string;
};

export type GalleryImageItem = {
  id: string;
  title: string;
  category: string;
  filename: string;
  alt: string;
};
