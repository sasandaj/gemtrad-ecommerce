'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Gemstone } from '@/types/gem';
import { useCart } from '@/context/CartContext';
import { Award, Sparkles, ShoppingBag, Eye, Check } from 'lucide-react';
import { CertificateModal } from './CertificateModal';

interface GemCardProps {
  gem: Gemstone;
}

export const GemCard: React.FC<GemCardProps> = ({ gem }) => {
  const { addLooseGem, items } = useCart();
  const [showCert, setShowCert] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const isInCart = items.some(item => item.gem.id === gem.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addLooseGem(gem);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <>
      <div className="group relative bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 overflow-hidden flex flex-col">
        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
          <span className="px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wider uppercase bg-white/90 backdrop-blur-md text-slate-800 shadow-sm border border-slate-100">
            {gem.carat.toFixed(2)} CT • {gem.cut}
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowCert(true);
            }}
            className="pointer-events-auto px-2 py-1 rounded-md text-[11px] font-bold bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur-md flex items-center gap-1 shadow-sm transition-colors"
            title="Inspect Official Laboratory Certificate"
          >
            <Award className="w-3.5 h-3.5 text-gem-gold" />
            <span>{gem.certLab}</span>
          </button>
        </div>

        {/* Image Container with Link */}
        <Link href={`/gems/${gem.id}`} className="relative h-64 w-full bg-slate-900 overflow-hidden flex items-center justify-center cursor-pointer">
          <Image
            src={gem.image}
            alt={gem.name}
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20" />
          
          {/* Quick 360 preview hint */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs text-white/90 bg-slate-900/60 backdrop-blur-sm px-2.5 py-1 rounded-md">
            <Eye className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-[11px]">Click for 360° Inspection</span>
          </div>

          {/* Treatment badge */}
          <div className="absolute bottom-3 right-3 text-[11px] font-semibold text-emerald-400 bg-slate-900/60 backdrop-blur-sm px-2 py-0.5 rounded">
            {gem.treatment.split('/')[0]}
          </div>
        </Link>

        {/* Content Section */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>{gem.variety}</span>
              <span>{gem.origin}</span>
            </div>

            <Link href={`/gems/${gem.id}`}>
              <h3 className="font-cinzel font-bold text-slate-900 text-base leading-snug group-hover:text-gem-blue transition-colors line-clamp-1">
                {gem.name}
              </h3>
            </Link>

            <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
              {gem.description}
            </p>

            <div className="mt-3 flex items-center gap-2 text-xs text-slate-600 font-mono">
              <span className="px-2 py-0.5 bg-slate-100 rounded text-[11px]">{gem.clarity}</span>
              <span className="px-2 py-0.5 bg-slate-100 rounded text-[11px]">{gem.dimensions}</span>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100">
            <div className="flex items-baseline justify-between mb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Acquisition Price</span>
                <div className="text-xl font-bold font-mono text-slate-900">
                  ${gem.price.toLocaleString()} <span className="text-xs font-normal text-slate-500">USD</span>
                </div>
              </div>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                In Vault
              </span>
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleAddToCart}
                disabled={isInCart}
                className={`w-full py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  isInCart
                    ? 'bg-slate-100 text-slate-500 cursor-not-allowed'
                    : isAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-900 hover:bg-slate-800 text-white'
                }`}
              >
                {isInCart ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>In Cart</span>
                  </>
                ) : isAdded ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Added</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Buy Loose</span>
                  </>
                )}
              </button>

              <Link
                href={`/custom-studio?gemId=${gem.id}`}
                className="w-full py-2.5 px-3 rounded-xl text-xs font-semibold bg-gradient-to-r from-gem-blue to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white flex items-center justify-center gap-1.5 shadow-sm transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Custom Ring</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <CertificateModal
        gem={gem}
        isOpen={showCert}
        onClose={() => setShowCert(false)}
      />
    </>
  );
};
