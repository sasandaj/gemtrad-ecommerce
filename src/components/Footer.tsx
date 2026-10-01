'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Truck, Award, RefreshCcw, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      {/* 4 Pillars Trust Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-slate-800">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-gem-gold flex-shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-cinzel font-bold text-white text-sm">GIA & Gübelin Certified</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Every gemstone includes an independent laboratory report verifying origin and zero heat.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400 flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-cinzel font-bold text-white text-sm">Direct Ethical Mines</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Sourced directly from artisanal miners in Ratnapura (Ceylon) and Muzo (Colombia) with full ESG provenance.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-blue-400 flex-shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-cinzel font-bold text-white text-sm">Armored Insured Courier</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Complimentary 100% insured delivery via Malca-Amit and FedEx Custom Critical with discreet handoff.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-rose-400 flex-shrink-0">
              <RefreshCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-cinzel font-bold text-white text-sm">30-Day Inspection Return</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Examine your gemstone with your own gemologist. 100% money-back guarantee if not thoroughly captivated.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Links & Information */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8">
                <Image
                  src="/images/gemtrad-logo.png"
                  alt="GEMTRAD Logo"
                  fill
                  className="object-contain filter brightness-110"
                />
              </div>
              <span className="font-cinzel text-xl font-bold tracking-widest text-white">
                GEMTRAD<span className="text-gem-red">.</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              GEMTRAD (Luster of Wealth) is an international purveyor of rare untreated gemstones and bespoke haute joaillerie. Handcrafted in Geneva and Colombo with world-class lapidary mastery.
            </p>
            <div className="pt-2">
              <div className="text-xs font-semibold text-white uppercase tracking-wider mb-2">Private VIP Vault Access</div>
              <div className="flex max-w-sm">
                <input
                  type="email"
                  placeholder="Enter your private email..."
                  className="bg-slate-900 text-white placeholder-slate-500 text-xs px-3.5 py-2.5 rounded-l-lg border border-slate-800 focus:outline-none focus:border-blue-500 flex-1"
                />
                <button className="bg-gem-blue hover:bg-blue-700 text-white px-4 py-2.5 rounded-r-lg text-xs font-semibold transition-colors flex items-center gap-1">
                  <span>Join</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Column 2: Loose Gemstones */}
          <div>
            <h5 className="font-cinzel font-bold text-white text-xs uppercase tracking-wider mb-4">Rare Gemstones</h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/gems?variety=Sapphire" className="hover:text-white transition-colors">Ceylon Royal Sapphires</Link></li>
              <li><Link href="/gems?variety=Ruby" className="hover:text-white transition-colors">Burmese Pigeon Blood Rubies</Link></li>
              <li><Link href="/gems?variety=Emerald" className="hover:text-white transition-colors">Colombian Muzo Emeralds</Link></li>
              <li><Link href="/gems?variety=Padparadscha" className="hover:text-white transition-colors">Padparadscha Sapphires</Link></li>
              <li><Link href="/gems?treatment=unheated" className="hover:text-white transition-colors">Unheated Natural Specimens</Link></li>
            </ul>
          </div>

          {/* Column 3: Bespoke Studio */}
          <div>
            <h5 className="font-cinzel font-bold text-white text-xs uppercase tracking-wider mb-4">Bespoke Atelier</h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/custom-studio" className="hover:text-white transition-colors">Custom Ring Configurator</Link></li>
              <li><Link href="/custom-studio" className="hover:text-white transition-colors">Book Expert Designer Call</Link></li>
              <li><Link href="/custom-studio" className="hover:text-white transition-colors">Upload Custom CAD Sketch</Link></li>
              <li><Link href="/tracker" className="hover:text-white transition-colors">Order & CAD Tracker</Link></li>
              <li><Link href="/admin" className="hover:text-white transition-colors">Inventory Portal</Link></li>
            </ul>
          </div>

          {/* Column 4: Private Ateliers */}
          <div>
            <h5 className="font-cinzel font-bold text-white text-xs uppercase tracking-wider mb-4">Atelier Salons</h5>
            <div className="space-y-3 text-xs text-slate-400">
              <div>
                <strong className="text-slate-200">Geneva, Switzerland</strong>
                <p className="text-[11px] text-slate-500">Rue du Rhône 42, 1204 Genève</p>
              </div>
              <div>
                <strong className="text-slate-200">Colombo, Sri Lanka</strong>
                <p className="text-[11px] text-slate-500">Galle Face Terrace 03, Colombo</p>
              </div>
              <div>
                <strong className="text-slate-200">New York, USA</strong>
                <p className="text-[11px] text-slate-500">Fifth Avenue, Diamond District</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-900 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          © {new Date().getFullYear()} GEMTRAD International Ltd. All Rights Reserved. GIA, IGI, Gübelin registered hallmarks.
        </div>
        <div className="flex items-center gap-6">
          <Link href="/#privacy" className="hover:text-slate-400 transition-colors">Privacy Policy</Link>
          <Link href="/#terms" className="hover:text-slate-400 transition-colors">Terms of Sale</Link>
          <Link href="/#compliance" className="hover:text-slate-400 transition-colors">ESG Provenance</Link>
        </div>
      </div>
    </footer>
  );
};
