import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Kerala Trails | Discover South India",
    template: "%s | Kerala Trails",
  },
  description: "Discover thoughtfully curated Kerala and South India travel experiences.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
