import type { Metadata } from 'next';
import './globals.css';
import SessionProvider from '@/components/SessionProvider';

export const metadata: Metadata = {
  title: 'Priyoma - Luxury Candles',
  description: 'Premium handmade candles for your home',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white">
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
