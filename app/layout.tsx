import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ONEWORLD — Global Social Platform",
  description: "Plateforme sociale mondiale combinant vidéo, communautés, IA, commerce et paiements internationaux.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="fr"><body>{children}</body></html>;
}