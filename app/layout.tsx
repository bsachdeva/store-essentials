import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Store Essentials",
  description: "Next.js MERN storefront with cart and orders",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
