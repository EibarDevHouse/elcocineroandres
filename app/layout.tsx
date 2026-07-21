import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "El Cocinero Andrés",
  description: "Sabor que se apodera de tus sentidos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Caprasimo:wght@400&family=Figtree:wght@400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="m-0 p-0">{children}</body>
    </html>
  );
}
