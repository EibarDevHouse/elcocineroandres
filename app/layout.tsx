import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'El Cocinero Andrés',
  description: 'Sabor que se apodera de tus sentidos',
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
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Caprasimo:wght@400&family=Figtree:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <meta
          property="og:title"
          content="El Cocinero Andrés | Chef José Durán"
        />
        <meta
          property="og:description"
          content="Un apasionado por la cocina y por complacer a sus comensales. Te lleva a una experiencia sensorial en cada bocado."
        />
        <meta property="og:image" content="/open-graph.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </head>
      <body className="m-0 p-0">{children}</body>
    </html>
  );
}
