import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Mogazoa',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr">
      <body>{children}</body>
    </html>
  );
}
