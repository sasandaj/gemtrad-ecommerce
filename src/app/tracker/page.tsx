'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Order } from '@/types/gem';
import { 
  Compass, 
  Search, 
  CheckCircle2 
} from 'lucide-react';

const STAGES = [
  { id: 'Confirmed', title: 'Vault Allocation Confirmed', desc: 'Centerpiece gem inspected under microscopy and locked for production.' },
  { id: 'CAD Design', title: '3D CAD Modeling & Review', desc: 'Atelier design team renders photorealistic digital wax geometry.' },
  { id: 'Master Setting', title: 'Platinum/Gold Casting & Setting', desc: 'Master goldsmith casts precious metal alloy and hand-sets prongs.' },
  { id: 'Certification', title: 'Swiss Lab Hallmarking', desc: 'Independent assay certification and microscopic hallmark laser engraving.' },
  { id: 'Insured Transit', title: 'Armored Courier Transit', desc: 'Discreet armored vehicle in transit with biometric signature verification.' },
  { id: 'Delivered', title: 'Handed Over to Collector', desc: 'Acquisition finalized with lifetime authenticity warranty.' },
];

function TrackerContent() {
  const searchParams = useSearchParams();
  const initialTracking = searchParams.get('tracking') || '';
  const { orders, getOrder } = useCart();

  const [inputTracking, setInputTracking] = useState(initialTracking);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (initialTracking) {
      const found = getOrder(initialTracking);
      if (found) {
        setSelectedOrder(found);
      }
    } else if (orders.length > 0) {
      setSelectedOrder(orders[0]);
      setInputTracking(orders[0].trackingNumber);
    }
  }, [initialTracking, orders, getOrder]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputTracking.trim()) return;
    const found = getOrder(inputTracking);
    if (found) {
      setSelectedOrder(found);
    } else {
      setSelectedOrder(null);
    }
  };

  // Determine current active stage index
  const getCurrentStageIndex = (status?: string) => {
    if (!status) return 0;
    const idx = STAGES.findIndex(s => s.id.toLowerCase() === status.toLowerCase());
    return idx >= 0 ? idx : 0;
  };

  const currentIdx = getCurrentStageIndex(selectedOrder?.status);

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-semibold mb-2">
            <Compass className="w-3.5 h-3.5 text-blue-400" />
            <span>GEMTRAD Live Telemetry</span>
          </div>
          <h1 className="font-cinzel text-3xl font-bold text-slate-900">
            Order & CAD Atelier Progress Tracker
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time milestone tracking for loose gemstone shipments and custom bespoke commissions.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm max-w-xl mx-auto">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={inputTracking}
                onChange={e => setInputTracking(e.target.value)}
                placeholder="Enter Tracking # (e.g. GTRAD-2026-...) or Order ID"
                className="w-full pl-10 pr-3 py-2.5 text-xs font-mono uppercase bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-gem-blue"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors"
            >
              Track Status
            </button>
          </form>
        </div>

        {/* Order Details Display */}
        {selectedOrder ? (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Top Order Badge Card */}
            <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-slate-400">
                  Active Atelier Tracking Number
                </div>
                <div className="text-2xl sm:text-3xl font-mono font-bold text-gem-gold mt-1">
                  {selectedOrder.trackingNumber}
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Commissioned by: <strong className="text-slate-200">{selectedOrder.customer.fullName}</strong> • {selectedOrder.customer.city}, {selectedOrder.customer.country}
                </div>
              </div>

              <div className="text-left md:text-right">
                <span className="text-xs text-slate-400 block">Current Milestone</span>
                <span className="inline-block mt-1 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  {selectedOrder.status}
                </span>
                <div className="text-xs font-mono text-slate-300 mt-1">
                  Total Value: ${selectedOrder.total.toLocaleString()} USD
                </div>
              </div>
            </div>

            {/* Visual Timeline Stepper */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <h3 className="font-cinzel font-bold text-slate-900 text-base">
                Production & Dispatch Lifecycle
              </h3>

              <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-2.5 sm:before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
                {STAGES.map((stage, idx) => {
                  const isDone = idx < currentIdx;
                  const isCurrent = idx === currentIdx;
                  return (
                    <div key={stage.id} className="relative flex items-start gap-4">
                      {/* Status indicator dot */}
                      <div
                        className={`absolute -left-6 sm:-left-8 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold z-10 transition-colors ${
                          isDone
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : isCurrent
                            ? 'bg-gem-blue text-white ring-4 ring-blue-100 shadow-md animate-pulse'
                            : 'bg-white border-2 border-slate-300 text-slate-400'
                        }`}
                      >
                        {isDone ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className={`text-sm font-bold ${isCurrent ? 'text-gem-blue' : isDone ? 'text-slate-900' : 'text-slate-400'}`}>
                            {stage.title}
                          </h4>
                          {isCurrent && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-gem-blue uppercase">
                              In Progress
                            </span>
                          )}
                          {isDone && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700">
                              Completed
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">{stage.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Itemized Order Breakdown */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-cinzel font-bold text-slate-900 text-base pb-3 border-b border-slate-100">
                Commission Dossier Contents
              </h3>

              <div className="space-y-4">
                {selectedOrder.items.map(item => (
                  <div key={item.id} className="flex flex-col sm:flex-row gap-4 items-start justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex gap-4">
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-slate-900 flex-shrink-0">
                        <Image src={item.gem.image} alt={item.gem.name} fill className="object-cover" />
                      </div>
                      <div className="text-xs space-y-1">
                        <div className="font-bold text-slate-900 font-cinzel text-sm">
                          {item.type === 'bespoke_jewelry'
                            ? `Custom ${item.bespokeConfig?.settingStyle} Ring`
                            : item.gem.name}
                        </div>
                        <div className="text-slate-600">
                          <strong>Stone:</strong> {item.gem.name} ({item.gem.carat}ct • {item.gem.origin})
                        </div>
                        {item.bespokeConfig && (
                          <div className="text-slate-500">
                            <strong>Metal:</strong> {item.bespokeConfig.metal.replace('_', ' ').toUpperCase()} • Size {item.bespokeConfig.ringSize}
                          </div>
                        )}
                        <div className="font-mono text-slate-500">
                          Laboratory Report: {item.gem.certLab} #{item.gem.certNumber}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-base font-mono font-bold text-slate-900">
                        ${item.price.toLocaleString()} USD
                      </div>
                      {item.isDepositOnly && (
                        <div className="text-[10px] text-amber-700 font-bold">50% Deposit Paid</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-4 max-w-xl mx-auto shadow-sm">
            <Compass className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="font-cinzel text-lg font-bold text-slate-900">No Order Found</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              We couldn&apos;t locate an order with tracking number <span className="font-mono font-bold text-slate-700">{inputTracking}</span>. Please verify your tracking number from your receipt or contact your private concierge.
            </p>
            <div className="pt-2">
              <Link
                href="/gems"
                className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors inline-block"
              >
                Return to Gemstones Catalog
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TrackerPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center">Loading Tracker...</div>}>
      <TrackerContent />
    </Suspense>
  );
}
