'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { 
  ShoppingBag, 
  Sparkles, 
  Gem, 
  Clock, 
  ShieldCheck, 
  Menu, 
  X, 
  Compass, 
  Settings, 
  PhoneCall 
} from 'lucide-react';

export const Header: React.FC = () => {
  const { itemsCount, reserveExpiresAt } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState<string | null>(null);

  // Countdown timer for gem reservation
  useEffect(() => {
    if (!reserveExpiresAt) {
      setTimeLeft(null);
      return;
    }

    const updateTimer = () => {
      const diff = reserveExpiresAt - Date.now();
      if (diff <= 0) {
        setTimeLeft('00:00');
        return;
      }
      const mins = Math.floor(diff / 60000);
      const secs = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [reserveExpiresAt]);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top Luxury Announcement Bar */}
      <div className="bg-slate-950 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium text-slate-200">
              Direct Mine-to-Market Gemstones • Ratnapura & Muzo Ethical Provenance
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            {timeLeft ? (
              <div className="flex items-center gap-1.5 text-gem-gold font-mono font-semibold bg-gem-gold/10 px-2.5 py-0.5 rounded border border-gem-gold/30">
                <Clock className="w-3.5 h-3.5 text-gem-gold animate-spin" style={{ animationDuration: '10s' }} />
                <span>Gem Vault Lock: {timeLeft}</span>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Malca-Amit & FedEx Priority Armored Shipping</span>
              </div>
            )}
            <Link href="/admin" className="hover:text-white transition-colors flex items-center gap-1">
              <Settings className="w-3 h-3" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="relative w-9 h-9 sm:w-11 sm:h-11">
            <Image
              src="/images/gemtrad-logo.png"
              alt="GEMTRAD Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div>
            <div className="font-cinzel text-xl sm:text-2xl font-black tracking-widest text-slate-900">
              GEMTRAD<span className="text-gem-red">.</span>
            </div>
            <div className="text-[9px] uppercase tracking-widest text-slate-500 font-semibold -mt-1">
              Haute Joaillerie & Gems
            </div>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-700">
          <Link href="/gems" className="hover:text-gem-blue transition-colors flex items-center gap-1.5">
            <Gem className="w-4 h-4 text-gem-blue" />
            <span>Rare Loose Gems</span>
          </Link>
          <Link
            href="/custom-studio"
            className="text-gem-red hover:text-gem-red-hover transition-colors flex items-center gap-1.5 bg-gem-red-light px-3 py-1.5 rounded-full border border-red-200"
          >
            <Sparkles className="w-4 h-4 text-gem-red animate-pulse" />
            <span>Design Bespoke Studio</span>
          </Link>
          <Link href="/tracker" className="hover:text-slate-900 transition-colors flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-slate-400" />
            <span>Track Order</span>
          </Link>
          <Link href="/#heritage" className="hover:text-slate-900 transition-colors">
            Our Atelier
          </Link>
        </nav>

        {/* Right CTA / Cart */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="/custom-studio"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-gem-dark to-slate-800 hover:from-slate-800 hover:to-slate-700 shadow-sm transition-all"
          >
            <PhoneCall className="w-3.5 h-3.5 text-gem-gold" />
            <span>Expert Designer</span>
          </Link>

          {/* Cart Icon */}
          <Link
            href="/cart"
            className="relative p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 text-slate-800 transition-all flex items-center justify-center"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5 text-slate-800" />
            {itemsCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-gem-red text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-bounce">
                {itemsCount}
              </span>
            )}
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 lg:hidden text-slate-700 hover:text-slate-900"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-6 space-y-4">
          <Link
            href="/gems"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 py-2 text-base font-semibold text-slate-800"
          >
            <Gem className="w-5 h-5 text-gem-blue" />
            <span>Rare Loose Gems</span>
          </Link>
          <Link
            href="/custom-studio"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 py-2 text-base font-semibold text-gem-red"
          >
            <Sparkles className="w-5 h-5 text-gem-red" />
            <span>Design Bespoke Studio (With Expert)</span>
          </Link>
          <Link
            href="/tracker"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 py-2 text-base font-semibold text-slate-800"
          >
            <Compass className="w-5 h-5 text-slate-500" />
            <span>Track Order & CAD Progress</span>
          </Link>
          <Link
            href="/admin"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 py-2 text-base font-semibold text-slate-800"
          >
            <Settings className="w-5 h-5 text-slate-500" />
            <span>Admin Management</span>
          </Link>
        </div>
      )}
    </header>
  );
};
