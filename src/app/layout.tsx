import type { Metadata } from 'next';
import './globals.css';
import { InventoryProvider } from '@/context/InventoryContext';
import { CartProvider } from '@/context/CartContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'GEMTRAD | Haute Joaillerie & Rare Untreated Gemstones',
  description: 'Acquire rare unheated Ceylon sapphires, Burmese rubies, Colombian emeralds, and craft bespoke high jewelry with our master atelier designers.',
  keywords: ['gemstones', 'ceylon sapphire', 'burmese ruby', 'muzo emerald', 'custom jewelry', 'bespoke ring', 'GIA certified gems', 'GEMTRAD'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-blue-600 selection:text-white">
        <InventoryProvider>
          <CartProvider>
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </CartProvider>
        </InventoryProvider>
      </body>
    </html>
  );
}
