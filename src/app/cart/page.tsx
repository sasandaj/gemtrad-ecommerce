'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { 
  ShoppingBag, 
  Trash2, 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  Truck, 
  Gem, 
  ArrowLeft 
} from 'lucide-react';

export default function CartPage() {
  const { items, removeItem, totalAmount, reserveExpiresAt, clearCart } = useCart();
  const [timeLeft, setTimeLeft] = useState<string | null>(null);

  useEffect(() => {
    if (!reserveExpiresAt) {
      setTimeLeft(null);
      return;
    }

    const updateTimer = () => {
      const diff = reserveExpiresAt - Date.now();
      if (diff <= 0) {
        setTimeLeft('00:00 (Expired)');
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

  if (items.length === 0) {
    return (
      <div className="bg-slate-50 min-h-screen py-16">
        <div className="max-w-2xl mx-auto px-4 text-center space-y-6 bg-white p-10 rounded-3xl border border-slate-200 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h1 className="font-cinzel text-2xl font-bold text-slate-900">Your Private Vault is Empty</h1>
          <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
            You currently have no unheated gemstones or bespoke jewelry commissions reserved.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
            <Link
              href="/gems"
              className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2"
            >
              <Gem className="w-4 h-4 text-gem-blue" />
              <span>Explore Loose Gems</span>
            </Link>
            <Link
              href="/custom-studio"
              className="px-6 py-3 bg-gradient-to-r from-gem-red to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Custom Jewelry Studio</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header with 30-min Vault Hold Indicator */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-cinzel text-3xl font-bold text-slate-900">Private Vault Cart</h1>
            <p className="text-xs text-slate-500 mt-1">Review reserved gemstones and custom atelier commissions.</p>
          </div>

          {timeLeft && (
            <div className="flex items-center gap-2 bg-amber-50 border border-amber-300/80 px-4 py-2 rounded-xl text-xs text-amber-900">
              <Clock className="w-4 h-4 text-amber-600 animate-spin" style={{ animationDuration: '8s' }} />
              <div>
                <span className="font-bold">Exclusive Gem Hold: </span>
                <span className="font-mono font-bold text-amber-950">{timeLeft}</span>
              </div>
            </div>
          )}
        </div>

        {/* 2-Column Cart Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cart Items List (8 Cols) */}
          <div className="lg:col-span-8 space-y-4">
            {items.map(item => {
              const isBespoke = item.type === 'bespoke_jewelry';
              return (
                <div
                  key={item.id}
                  className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-5 items-start justify-between"
                >
                  <div className="flex gap-4">
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-slate-900 flex-shrink-0">
                      <Image
                        src={item.gem.image}
                        alt={item.gem.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          isBespoke
                            ? 'bg-red-50 text-gem-red border border-red-200'
                            : 'bg-blue-50 text-gem-blue border border-blue-200'
                        }`}>
                          {isBespoke ? 'Bespoke Atelier Commission' : 'Natural Loose Gem'}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono">
                          {item.gem.certLab} #{item.gem.certNumber}
                        </span>
                      </div>

                      <h3 className="font-cinzel font-bold text-slate-900 text-base">
                        {isBespoke
                          ? `Custom ${item.bespokeConfig?.settingStyle.toUpperCase()} Ring`
                          : item.gem.name}
                      </h3>

                      {isBespoke ? (
                        <div className="text-xs text-slate-500 space-y-0.5 pt-1">
                          <div>
                            <strong>Center Stone:</strong> {item.gem.name} ({item.gem.carat}ct)
                          </div>
                          <div>
                            <strong>Setting & Metal:</strong> {item.bespokeConfig?.metal.replace('_', ' ').toUpperCase()} • Size {item.bespokeConfig?.ringSize}
                          </div>
                          <div>
                            <strong>Consultation:</strong> {item.bespokeConfig?.consultationType.replace('_', ' ').toUpperCase()}
                          </div>
                          {item.isDepositOnly && (
                            <span className="inline-block mt-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                              50% Production Deposit (Balance due upon 3D CAD approval)
                            </span>
                          )}
                        </div>
                      ) : (
                        <div className="text-xs text-slate-500 pt-1">
                          {item.gem.carat.toFixed(2)} Carats • {item.gem.cut} Cut • {item.gem.origin}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Price & Remove */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    <div className="text-right">
                      <div className="text-lg font-mono font-bold text-slate-900">
                        ${item.price.toLocaleString()} <span className="text-xs font-normal text-slate-500">USD</span>
                      </div>
                      {isBespoke && !item.isDepositOnly && (
                        <div className="text-[10px] text-slate-400">Total Paid in Full</div>
                      )}
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-xs text-slate-400 hover:text-rose-600 flex items-center gap-1 transition-colors mt-2 sm:mt-4"
                      title="Release Gem Hold"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Release Hold</span>
                    </button>
                  </div>
                </div>
              );
            })}

            <div className="flex justify-between items-center pt-2">
              <Link
                href="/gems"
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Add More Gemstones</span>
              </Link>

              <button
                onClick={clearCart}
                className="text-xs text-slate-400 hover:text-rose-600"
              >
                Clear All Holds
              </button>
            </div>
          </div>

          {/* Checkout Summary (4 Cols) */}
          <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-lg space-y-6">
            <h3 className="font-cinzel font-bold text-slate-900 text-base pb-3 border-b border-slate-100">
              Acquisition Summary
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal Items ({items.length})</span>
                <span className="font-mono font-semibold text-slate-900">${totalAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-blue-500" />
                  <span>Armored Courier Delivery</span>
                </span>
                <span className="font-semibold text-emerald-600">Complimentary</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Full Transit Insurance (Lloyd’s)</span>
                </span>
                <span className="font-semibold text-emerald-600">Included</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-baseline justify-between">
              <div>
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">Total Due</span>
                <span className="text-[11px] text-slate-400">All duties & taxes included</span>
              </div>
              <div className="text-2xl font-mono font-bold text-slate-900">
                ${totalAmount.toLocaleString()} <span className="text-xs font-normal text-slate-500">USD</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-gem-blue to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all"
            >
              <span>Proceed to Armored Courier Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Escrow Guarantee Note */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-[11px] text-slate-500 leading-relaxed">
              <strong className="text-slate-700">GEMTRAD Escrow Protection: </strong>
              Funds are held securely. For bespoke creations, casting only begins once you approve your physical wax or 3D CAD render.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
