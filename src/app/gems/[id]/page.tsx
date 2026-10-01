'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useInventory } from '@/context/InventoryContext';
import { useCart } from '@/context/CartContext';
import { Gem360Viewer } from '@/components/Gem360Viewer';
import { CertificateModal } from '@/components/CertificateModal';
import { 
  Award, 
  ShieldCheck, 
  Sparkles, 
  ShoppingBag, 
  Truck, 
  RefreshCcw, 
  Check, 
  ArrowLeft, 
  Eye, 
  CheckCircle2 
} from 'lucide-react';

export default function GemDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { getGemstone, gemstones } = useInventory();
  const { addLooseGem, items } = useCart();

  const gemId = params?.id as string;
  const gem = getGemstone(gemId);

  const [activeTab, setActiveTab] = useState<'360' | 'photo'>('360');
  const [showCertModal, setShowCertModal] = useState(false);

  if (!gem) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-cinzel font-bold text-slate-900">Gemstone Not Found</h2>
        <p className="text-sm text-slate-500">This gemstone may have been acquired by another collector.</p>
        <Link
          href="/gems"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Catalog</span>
        </Link>
      </div>
    );
  }

  const isInCart = items.some(item => item.gem.id === gem.id);

  const handleBuyLoose = () => {
    addLooseGem(gem);
    router.push('/cart');
  };

  const relatedGems = gemstones.filter(g => g.id !== gem.id && g.variety === gem.variety).slice(0, 3);

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-slate-900">Home</Link>
          <span>/</span>
          <Link href="/gems" className="hover:text-slate-900">Loose Gemstones</Link>
          <span>/</span>
          <span className="text-slate-900 font-medium truncate max-w-xs">{gem.name}</span>
        </div>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Interactive Media (360 + High-res Photo) */}
          <div className="lg:col-span-7 space-y-4">
            {/* View Mode Switcher */}
            <div className="flex items-center gap-2 bg-white p-1.5 rounded-xl border border-slate-200/90 shadow-sm w-fit">
              <button
                onClick={() => setActiveTab('360')}
                className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
                  activeTab === '360'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Eye className="w-4 h-4 text-blue-400" />
                <span>360° Interactive Facet View</span>
              </button>
              <button
                onClick={() => setActiveTab('photo')}
                className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
                  activeTab === 'photo'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>Macro High-Res Still</span>
              </button>
            </div>

            {/* Media Display Container */}
            {activeTab === '360' ? (
              <Gem360Viewer
                color={gem.hexColor}
                gemName={gem.name}
                shape={gem.cut}
                className="w-full min-h-[460px]"
              />
            ) : (
              <div className="relative h-[460px] w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 shadow-xl">
                <Image
                  src={gem.image}
                  alt={gem.name}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-slate-700 text-xs text-white">
                  Natural Daylight Photography • Unfiltered
                </div>
              </div>
            )}

            {/* Trust highlights below media */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <div className="text-[11px] leading-tight">
                  <div className="font-bold text-slate-800">100% Conflict-Free</div>
                  <div className="text-slate-500">Ethical Provenance</div>
                </div>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
                <Truck className="w-5 h-5 text-gem-blue flex-shrink-0" />
                <div className="text-[11px] leading-tight">
                  <div className="font-bold text-slate-800">Armored Courier</div>
                  <div className="text-slate-500">Malca-Amit 100% Insured</div>
                </div>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
                <RefreshCcw className="w-5 h-5 text-rose-600 flex-shrink-0" />
                <div className="text-[11px] leading-tight">
                  <div className="font-bold text-slate-800">30-Day Inspection</div>
                  <div className="text-slate-500">Full Escrow Guarantee</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Spec Sheet & Acquisition Actions */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold tracking-wider text-gem-blue">
                  {gem.variety} • {gem.origin}
                </span>
                <span className="px-2.5 py-1 rounded text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  In Vault
                </span>
              </div>

              <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                {gem.name}
              </h1>

              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-3xl font-mono font-bold text-slate-900">
                  ${gem.price.toLocaleString()}
                </span>
                <span className="text-xs text-slate-500">USD • Import duties & armored transit included</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-3 pt-2">
              <Link
                href={`/custom-studio?gemId=${gem.id}`}
                className="w-full py-4 px-6 rounded-xl text-sm font-bold bg-gradient-to-r from-gem-red to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white shadow-lg hover:shadow-ruby-hover transition-all flex items-center justify-center gap-2 group"
              >
                <Sparkles className="w-4 h-4 text-amber-300 group-hover:rotate-12 transition-transform" />
                <span>Make Customized Jewelry with Our Expert Designer</span>
              </Link>

              <button
                onClick={handleBuyLoose}
                disabled={isInCart}
                className={`w-full py-3.5 px-6 rounded-xl text-sm font-bold border-2 transition-all flex items-center justify-center gap-2 ${
                  isInCart
                    ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-white border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white'
                }`}
              >
                {isInCart ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>In Shopping Cart (Vault Locked)</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Buy Loose Gemstone (${gem.price.toLocaleString()})</span>
                  </>
                )}
              </button>
            </div>

            {/* Official Lab Report Button */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/90 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gem-gold/20 text-gem-gold flex items-center justify-center">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">{gem.certLab} Gemological Dossier</div>
                  <div className="text-[11px] font-mono text-slate-500">Report #{gem.certNumber}</div>
                </div>
              </div>
              <button
                onClick={() => setShowCertModal(true)}
                className="px-3.5 py-1.5 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 transition-colors"
              >
                Inspect Report
              </button>
            </div>

            {/* Technical Specifications Grid */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Scientific Dossier Specifications
              </h3>
              <div className="divide-y divide-slate-100 text-xs">
                <div className="py-2.5 flex justify-between">
                  <span className="text-slate-500">Carat Weight</span>
                  <span className="font-mono font-bold text-slate-900">{gem.carat.toFixed(2)} Carats</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-slate-500">Cut & Shape</span>
                  <span className="font-semibold text-slate-900">{gem.cut} Brilliant</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-slate-500">Color Grade</span>
                  <span className="font-semibold text-slate-900">{gem.color}</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-slate-500">Clarity</span>
                  <span className="font-semibold text-slate-900">{gem.clarity}</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-slate-500">Geographic Origin</span>
                  <span className="font-semibold text-slate-900">{gem.origin}</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-slate-500">Thermal Treatment</span>
                  <span className="font-bold text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{gem.treatment}</span>
                  </span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-slate-500">Dimensions</span>
                  <span className="font-mono font-medium text-slate-800">{gem.dimensions}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
              <strong className="text-slate-900">Gemologist Assessment: </strong>
              {gem.description}
            </div>
          </div>
        </div>

        {/* Related Gemstones */}
        {relatedGems.length > 0 && (
          <div className="pt-12 border-t border-slate-200">
            <h3 className="font-cinzel text-xl font-bold text-slate-900 mb-6">
              Similar Rare {gem.variety} Specimens
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedGems.map(related => (
                <div key={related.id} className="bg-white p-4 rounded-xl border border-slate-200 flex gap-4 items-center">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-slate-900 flex-shrink-0">
                    <Image src={related.image} alt={related.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-semibold text-slate-900 truncate">{related.name}</div>
                    <div className="text-[11px] text-slate-500">{related.carat}ct • {related.origin}</div>
                    <div className="text-xs font-mono font-bold text-gem-blue mt-1">${related.price.toLocaleString()}</div>
                    <Link href={`/gems/${related.id}`} className="text-[11px] text-gem-red font-semibold hover:underline mt-1 inline-block">
                      View Specimen →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <CertificateModal
        gem={gem}
        isOpen={showCertModal}
        onClose={() => setShowCertModal(false)}
      />
    </div>
  );
}
