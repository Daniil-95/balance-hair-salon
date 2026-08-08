import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Balance Hair Salon",
  description: "Protected salon admin area for updating services, gallery items, and site settings."
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
