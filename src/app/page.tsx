'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useInventory } from '@/context/InventoryContext';
import { GemCard } from '@/components/GemCard';
import { Gem360Viewer } from '@/components/Gem360Viewer';
import { 
  Sparkles, 
  ArrowRight, 
  Award, 
  ShieldCheck, 
  Gem, 
  CheckCircle, 
  PenTool 
} from 'lucide-react';

export default function HomePage() {
  const { gemstones } = useInventory();
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const filteredGems = selectedFilter === 'All'
    ? gemstones.slice(0, 6)
    : gemstones.filter(g => g.variety.toLowerCase() === selectedFilter.toLowerCase());

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white pt-16 pb-24 md:pt-24 md:pb-32">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[300px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs font-semibold text-slate-300">
                <span className="w-2 h-2 rounded-full bg-gem-red animate-pulse" />
                <span>Haute Joaillerie & Untreated Mineral Specimens</span>
              </div>

              <h1 className="font-cinzel text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                Luster of Wealth. <br />
                <span className="bg-gradient-to-r from-blue-300 via-slate-200 to-rose-300 bg-clip-text text-transparent">
                  Bespoke High Jewelry.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-light leading-relaxed">
                Direct mine-to-market unheated Ceylon Sapphires, Burmese Rubies, and Colombian Emeralds. Acquire loose rare gems or commission a one-of-a-kind heirloom with our master atelier designers.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/custom-studio"
                  className="w-full sm:w-auto px-7 py-4 rounded-xl text-sm font-bold bg-gradient-to-r from-gem-red to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white shadow-lg hover:shadow-ruby-hover transition-all flex items-center justify-center gap-2 group"
                >
                  <Sparkles className="w-4 h-4 text-amber-300 group-hover:rotate-12 transition-transform" />
                  <span>Select Gem & Design with Expert</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/gems"
                  className="w-full sm:w-auto px-7 py-4 rounded-xl text-sm font-bold bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-100 hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  <Gem className="w-4 h-4 text-gem-blue" />
                  <span>Browse Loose Gems</span>
                </Link>
              </div>

              {/* Badges */}
              <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-left">
                <div>
                  <div className="text-xl sm:text-2xl font-cinzel font-bold text-white">100%</div>
                  <div className="text-xs text-slate-400">Natural & Certified</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-cinzel font-bold text-white">GIA • Gübelin</div>
                  <div className="text-xs text-slate-400">Independent Lab Reports</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-cinzel font-bold text-white">Geneva & Colombo</div>
                  <div className="text-xs text-slate-400">Master Lapidary Ateliers</div>
                </div>
              </div>
            </div>

            {/* Right Hero: Live 360 Gem Viewer */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="w-full max-w-md">
                <Gem360Viewer
                  color="#0854C4"
                  gemName="2.45ct Royal Blue Ceylon Sapphire"
                  shape="Cushion"
                />
                <div className="text-center mt-3 text-xs text-slate-400">
                  <span className="font-semibold text-slate-200">Featured Gemstone:</span> 2.45ct Cushion Royal Blue Ceylon Sapphire (Unheated)
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6-Stage Bespoke Conversion Flow */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold tracking-widest text-gem-blue">Haute Joaillerie Experience</span>
          <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-slate-900 mt-2">
            The GEMTRAD 6-Stage Bespoke Journey
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            From rough mineral discovery in Ratnapura to your private vault: a seamless, transparent luxury commission process.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            {
              step: '01',
              title: 'Discover Stone',
              desc: 'Select from certified untreated sapphires, rubies, and emeralds.',
              accent: 'border-t-gem-blue text-gem-blue',
            },
            {
              step: '02',
              title: '360° Inspection',
              desc: 'Examine high-res facet luster and official GIA/Gübelin dossiers.',
              accent: 'border-t-gem-red text-gem-red',
            },
            {
              step: '03',
              title: 'Lock or Reserve',
              desc: 'Acquire loose or place a 30-minute vault hold to start setting.',
              accent: 'border-t-gem-blue text-gem-blue',
            },
            {
              step: '04',
              title: 'Bespoke Studio',
              desc: 'Configure setting style, Platinum/18K gold, accents, and engraving.',
              accent: 'border-t-gem-red text-gem-red',
            },
            {
              step: '05',
              title: 'Instant Quote',
              desc: 'Dynamic live pricing based on spot metal, diamond melee, and CAD.',
              accent: 'border-t-gem-blue text-gem-blue',
            },
            {
              step: '06',
              title: 'Deal Close & CAD',
              desc: 'Track master goldsmith crafting, casting, hallmarking, and armored transit.',
              accent: 'border-t-gem-red text-gem-red',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`p-4 bg-white rounded-xl border border-slate-200/90 shadow-sm border-t-4 ${item.accent} flex flex-col justify-between`}
            >
              <div>
                <span className="text-xs font-mono font-bold tracking-widest opacity-80">{item.step}</span>
                <h3 className="font-cinzel font-bold text-slate-900 text-sm mt-1">{item.title}</h3>
                <p className="text-slate-500 text-xs mt-2 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Curated Gemstones Catalog Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-gem-red">Vault Collection</span>
            <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-slate-900 mt-1">
              Curated Rare Loose Gemstones
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Every stone is accompanied by physical GIA, Gübelin, or SSEF credentials.
            </p>
          </div>

          {/* Variety Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200">
            {['All', 'Sapphire', 'Ruby', 'Emerald', 'Padparadscha'].map(tab => (
              <button
                key={tab}
                onClick={() => setSelectedFilter(tab)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedFilter === tab
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {tab === 'All' ? 'All Varieties' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Gemstones Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredGems.map(gem => (
            <GemCard key={gem.id} gem={gem} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/gems"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white font-bold text-xs uppercase tracking-wider transition-all"
          >
            <span>View All Vault Gemstones ({gemstones.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Featured Bespoke Studio Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 rounded-3xl p-8 sm:p-12 text-white border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left description */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-700/50 text-xs font-semibold text-red-300">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Custom Ring & Pendant Atelier</span>
              </div>

              <h2 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
                Select Your Gem. <br />
                <span className="text-gem-gold">Customize Jewelry with Our Expert Designer.</span>
              </h2>

              <p className="text-slate-300 text-sm leading-relaxed max-w-xl">
                Don’t settle for mass-produced settings. Choose any natural center stone from our vault, customize Platinum 950 or 18K Gold mounting styles, upload sketches or reference photos, and collaborate directly with our senior CAD jewelry designer.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Real-time spot metal & labor pricing engine</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Interactive 3D setting preview with finger sizing</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Direct 1-on-1 virtual design consultation</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Photorealistic 3D CAD render before metal casting</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/custom-studio"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-gem-red to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white font-bold text-sm shadow-lg hover:shadow-ruby-hover transition-all"
                >
                  <PenTool className="w-4 h-4 text-amber-300" />
                  <span>Launch Customizer Studio Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right illustration / bespoke ring image */}
            <div className="lg:col-span-5 relative">
              <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
                <Image
                  src="/images/bespoke-ring.jpg"
                  alt="GEMTRAD Bespoke Ring Masterpiece"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 bg-slate-900/85 backdrop-blur-md p-3.5 rounded-xl border border-slate-700/80 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-cinzel font-bold text-white">Cathedral Solitaire in Platinum 950</div>
                    <div className="text-[11px] text-slate-400">Featuring 2.45ct Royal Blue Ceylon Sapphire</div>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-gem-gold/20 text-gem-gold font-mono font-bold text-xs">
                    Handmade
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ethical Mine Provenance & Laboratory Guarantee */}
      <section id="heritage" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border border-slate-200 rounded-3xl p-8 sm:p-12 bg-slate-50/60">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <span className="text-xs uppercase font-bold tracking-widest text-gem-blue">Ethical Provenance</span>
              <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-slate-900">
                Direct from Historic Earth Formations
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                GEMTRAD was founded on the principle of unfiltered geological honesty. Every Ceylon sapphire is recovered from the virgin gravel beds of Ratnapura, Sri Lanka. Our emeralds originate from the Muzo hydrothermal veins in Colombia.
              </p>
              <p className="text-slate-600 text-sm leading-relaxed">
                We reject lattice diffusion, synthetic fissure filling, and opaque origins. When you invest in a GEMTRAD gemstone, you receive an enduring treasure of Mother Nature, completely traceable and legally cleared under international OECD guidelines.
              </p>
              
              <div className="pt-2 flex flex-wrap gap-3">
                <span className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 shadow-sm flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Zero Child Labor Guarantee</span>
                </span>
                <span className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 shadow-sm flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-gem-blue" />
                  <span>Gübelin Gem Lab Partner</span>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
                <div className="text-3xl font-cinzel font-bold text-gem-blue">Ratnapura</div>
                <div className="text-xs font-semibold text-slate-500 uppercase mt-1">Sri Lanka</div>
                <p className="text-xs text-slate-600 mt-2">World-renowned source of untreated royal blue and padparadscha corundum.</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
                <div className="text-3xl font-cinzel font-bold text-emerald-600">Muzo</div>
                <div className="text-xs font-semibold text-slate-500 uppercase mt-1">Colombia</div>
                <p className="text-xs text-slate-600 mt-2">Historic emerald mine producing rich bluish-green beryl with fire.</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
                <div className="text-3xl font-cinzel font-bold text-gem-red">Mogok</div>
                <div className="text-xs font-semibold text-slate-500 uppercase mt-1">Burma</div>
                <p className="text-xs text-slate-600 mt-2">Legendary Valley of Rubies, famed for natural fluorescence and pure pigeon blood red.</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
                <div className="text-3xl font-cinzel font-bold text-slate-800">Geneva</div>
                <div className="text-xs font-semibold text-slate-500 uppercase mt-1">Switzerland</div>
                <p className="text-xs text-slate-600 mt-2">Independent scientific laboratory analysis and master jewelry casting salon.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
