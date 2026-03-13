import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JamConnect - Rencontre des musiciens",
  description: "Plateforme communautaire française de mise en relation entre musiciens",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
