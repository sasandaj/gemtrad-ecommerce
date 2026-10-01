'use client';

import React, { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  ShieldCheck, 
  Compass 
} from 'lucide-react';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'ord-sample';
  const trackingNumber = searchParams.get('tracking') || 'GTRAD-2026-889104';

  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0854C4', '#D71920', '#D4AF37', '#CBD5E1'],
      });
    } catch {
      // ignore
    }
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Main Confirmation Box */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Vault Allocation Confirmed</span>
            </div>
            <h1 className="font-cinzel text-3xl sm:text-4xl font-bold text-slate-900">
              Acquisition Successfully Secured
            </h1>
            <p className="text-slate-600 text-sm mt-2 max-w-md mx-auto leading-relaxed">
              Your unheated gemstone has been removed from public circulation and locked in our Geneva/Colombo security vault for your order.
            </p>
          </div>

          {/* Tracking Number Card */}
          <div className="p-6 bg-slate-900 rounded-2xl text-white max-w-lg mx-auto shadow-inner text-left sm:text-center">
            <div className="text-xs uppercase font-bold tracking-widest text-slate-400">
              Official Atelier Tracking Dossier
            </div>
            <div className="font-mono text-xl sm:text-2xl font-bold text-gem-gold mt-1 tracking-wider">
              {trackingNumber}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Internal Order Reference: {orderId}
            </div>
          </div>

          {/* Next Steps Timeline */}
          <div className="text-left border-t border-slate-100 pt-6 space-y-4">
            <h3 className="font-cinzel font-bold text-slate-900 text-sm text-center">
              What Happens Next at GEMTRAD Atelier
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <span className="font-bold text-gem-blue block">1. Security Lockdown</span>
                <p className="text-slate-500 text-[11px]">
                  Physical stone is inspected under polarized microscopy and sealed in a micro-vault container.
                </p>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <span className="font-bold text-gem-red block">2. CAD & Master Jeweler</span>
                <p className="text-slate-500 text-[11px]">
                  Senior atelier designer initiates 3D CAD modeling or prepares the loose stone laboratory credentials.
                </p>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <span className="font-bold text-slate-900 block">3. Armored Dispatch</span>
                <p className="text-slate-500 text-[11px]">
                  Armored vehicle courier is booked with GPS tracking coordinates sent directly to your phone.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href={`/tracker?tracking=${trackingNumber}`}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-gem-blue to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4" />
              <span>Track Live Atelier & Courier Status</span>
            </Link>

            <Link
              href="/gems"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Explore More Gemstones</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center">Loading Order Confirmation...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}
