import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Développer in DRC", description: "La plateforme des développeurs congolais et africains." };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="fr"><body>{children}</body></html>}