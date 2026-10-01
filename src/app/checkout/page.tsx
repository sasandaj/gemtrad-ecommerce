'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { 
  Lock, 
  CreditCard, 
  Building2, 
  Truck, 
  CheckCircle, 
  Sparkles, 
  ArrowLeft 
} from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalAmount, createOrder } = useCart();

  const [fullName, setFullName] = useState('Alexandra Vance');
  const [email, setEmail] = useState('a.vance@privatevault.com');
  const [phone, setPhone] = useState('+1 (555) 924-8182');
  const [address, setAddress] = useState('740 Park Avenue, Apt 11B');
  const [city, setCity] = useState('New York');
  const [state, setState] = useState('NY');
  const [postalCode, setPostalCode] = useState('10021');
  const [country, setCountry] = useState('United States');

  const [courierMethod, setCourierMethod] = useState<'malca_amit' | 'fedex_priority' | 'salon_pickup'>('malca_amit');
  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'bank_wire' | 'deposit_50'>('credit_card');
  const [isProcessing, setIsProcessing] = useState(false);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 py-20 text-center">
        <h2 className="text-xl font-cinzel font-bold text-slate-800">Your Cart is Empty</h2>
        <button
          onClick={() => router.push('/gems')}
          className="mt-4 px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-semibold"
        >
          Return to Catalog
        </button>
      </div>
    );
  }

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const order = createOrder({
        customer: {
          fullName,
          email,
          phone,
          address,
          city,
          state,
          postalCode,
          country,
        },
        items,
        subtotal: totalAmount,
        shipping: 0,
        total: totalAmount,
        paymentMethod,
      });

      router.push(`/order-success?orderId=${order.id}&tracking=${order.trackingNumber}`);
    }, 1200);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <button
            onClick={() => router.back()}
            className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1 mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Cart</span>
          </button>
          <h1 className="font-cinzel text-3xl font-bold text-slate-900">
            Secure Armored Delivery Checkout
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Encrypted 256-bit SSL transaction with insured courier handoff to verified recipient.
          </p>
        </div>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Courier Recipient Details */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <Truck className="w-5 h-5 text-gem-blue" />
                <h3 className="font-cinzel font-bold text-slate-900 text-base">
                  1. Recipient & Armored Delivery Address
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-slate-700 block mb-1">Full Legal Name (ID Verified upon handoff)</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-gem-blue"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-gem-blue"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Direct Contact Phone</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-gem-blue"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-slate-700 block mb-1">Street Address or Private Bank Vault</label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-gem-blue"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-gem-blue"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">State / Province</label>
                    <input
                      type="text"
                      required
                      value={state}
                      onChange={e => setState(e.target.value)}
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-gem-blue"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Postal Code</label>
                    <input
                      type="text"
                      required
                      value={postalCode}
                      onChange={e => setPostalCode(e.target.value)}
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-gem-blue"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-slate-700 block mb-1">Country / Territory</label>
                  <input
                    type="text"
                    required
                    value={country}
                    onChange={e => setCountry(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-gem-blue"
                  />
                </div>
              </div>
            </div>

            {/* Courier Selection */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-cinzel font-bold text-slate-900 text-base pb-3 border-b border-slate-100">
                2. Select Armored Transit Method
              </h3>
              <div className="space-y-3">
                {[
                  {
                    id: 'malca_amit',
                    name: 'Malca-Amit Ultra-Secure Armored Transport',
                    desc: 'Discreet armored vehicle and bonded security courier directly to your doorstep with biometric ID verification.',
                    cost: 'Complimentary (Standard for High Jewelry)',
                  },
                  {
                    id: 'fedex_priority',
                    name: 'FedEx Custom Critical Priority Express',
                    desc: 'Priority dedicated air charter with tamper-evident GPS electronic tracker and adult signature required.',
                    cost: 'Complimentary',
                  },
                  {
                    id: 'salon_pickup',
                    name: 'Private Salon VIP Collection (Geneva or Colombo)',
                    desc: 'Private tasting and salon reveal with our senior gemologist in Geneva, Switzerland or Colombo, Sri Lanka.',
                    cost: 'Complimentary',
                  },
                ].map(opt => (
                  <div
                    key={opt.id}
                    onClick={() => setCourierMethod(opt.id as 'malca_amit' | 'fedex_priority' | 'salon_pickup')}
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex justify-between items-start ${
                      courierMethod === opt.id
                        ? 'border-gem-blue bg-blue-50/40 ring-1 ring-gem-blue'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="font-cinzel font-bold text-slate-900 text-xs flex items-center gap-2">
                        {opt.name}
                        {courierMethod === opt.id && <CheckCircle className="w-4 h-4 text-gem-blue" />}
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{opt.desc}</p>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-600 whitespace-nowrap ml-4">
                      {opt.cost}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <Lock className="w-5 h-5 text-emerald-600" />
                <h3 className="font-cinzel font-bold text-slate-900 text-base">
                  3. Encrypted Payment Execution
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    id: 'credit_card',
                    name: 'Credit Card (Stripe 3DS)',
                    icon: CreditCard,
                    desc: 'Visa, Mastercard, Amex Centurion',
                  },
                  {
                    id: 'bank_wire',
                    name: 'Private Bank Wire',
                    icon: Building2,
                    desc: 'Instant SWIFT / IBAN Details',
                  },
                  {
                    id: 'deposit_50',
                    name: '50% Atelier Deposit',
                    icon: Sparkles,
                    desc: 'Balance on CAD Approval',
                  },
                ].map(pay => {
                  const Icon = pay.icon;
                  return (
                    <div
                      key={pay.id}
                      onClick={() => setPaymentMethod(pay.id as 'credit_card' | 'bank_wire' | 'deposit_50')}
                      className={`p-4 rounded-xl border-2 transition-all cursor-pointer text-center flex flex-col items-center justify-center gap-1 ${
                        paymentMethod === pay.id
                          ? 'border-slate-900 bg-slate-900 text-white shadow-md'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                      }`}
                    >
                      <Icon className="w-5 h-5 mb-1" />
                      <div className="font-bold text-xs">{pay.name}</div>
                      <div className={`text-[10px] ${paymentMethod === pay.id ? 'text-slate-300' : 'text-slate-400'}`}>
                        {pay.desc}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Card Inputs Mock */}
              {paymentMethod === 'credit_card' && (
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 pt-4">
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">Card Number</label>
                    <input
                      type="text"
                      placeholder="4000 1234 5678 9010"
                      defaultValue="4242 •••• •••• 4242"
                      className="w-full text-xs font-mono bg-white border border-slate-200 rounded-lg p-2.5"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        defaultValue="12/28"
                        className="w-full text-xs font-mono bg-white border border-slate-200 rounded-lg p-2.5"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">CVC / Security Code</label>
                      <input
                        type="password"
                        placeholder="•••"
                        defaultValue="888"
                        className="w-full text-xs font-mono bg-white border border-slate-200 rounded-lg p-2.5"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Summary (5 Cols) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xl space-y-6 sticky top-28">
            <h3 className="font-cinzel font-bold text-slate-900 text-lg pb-3 border-b border-slate-100">
              Acquisition Order Review
            </h3>

            {/* Items */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {items.map(i => (
                <div key={i.id} className="flex gap-3 items-center py-2 border-b border-slate-100 last:border-0">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-slate-900 flex-shrink-0">
                    <Image src={i.gem.image} alt={i.gem.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0 text-xs">
                    <div className="font-bold text-slate-900 truncate">
                      {i.type === 'bespoke_jewelry' ? `Custom ${i.bespokeConfig?.settingStyle} Ring` : i.gem.name}
                    </div>
                    <div className="text-[11px] text-slate-500">{i.gem.carat}ct • {i.gem.origin}</div>
                  </div>
                  <div className="text-xs font-mono font-bold text-slate-900">
                    ${i.price.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="space-y-2 text-xs pt-2">
              <div className="flex justify-between text-slate-600">
                <span>Items Subtotal</span>
                <span className="font-mono">${totalAmount.toLocaleString()} USD</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Armored Courier & Escrow</span>
                <span className="font-bold text-emerald-600">Complimentary</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Lloyd’s Transit Insurance</span>
                <span className="font-bold text-emerald-600">100% Insured</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-baseline justify-between">
              <div>
                <span className="text-xs font-bold text-slate-900 block">Total Acquisition</span>
                <span className="text-[10px] text-slate-400">All duties, taxes & hallmarks included</span>
              </div>
              <div className="text-2xl font-mono font-bold text-slate-900">
                ${totalAmount.toLocaleString()} <span className="text-xs font-normal text-slate-500">USD</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-gem-dark to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white font-bold text-xs uppercase tracking-wider shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isProcessing ? (
                <span>Authorizing 256-bit Encrypted Transaction...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-gem-gold" />
                  <span>Authorize & Lock Order (${totalAmount.toLocaleString()})</span>
                </>
              )}
            </button>

            <div className="text-[11px] text-slate-400 text-center leading-relaxed">
              Upon authorization, an official gemologist dossier with tracking and direct WhatsApp concierge access will be dispatched to your registered address.
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
