'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useInventory } from '@/context/InventoryContext';
import { useCart } from '@/context/CartContext';
import { SettingStyle, MetalType, AccentType, ConsultationType, BespokeConfig } from '@/types/gem';
import { 
  Sparkles, 
  Check, 
  ArrowRight, 
  Upload, 
  Video, 
  UserCheck, 
  Compass 
} from 'lucide-react';

const SPOT_RATES: Record<MetalType, number> = {
  platinum_950: 44.80,
  '18k_white': 59.20,
  '18k_yellow': 58.50,
  '18k_rose': 58.50,
};

const METAL_NAMES: Record<MetalType, string> = {
  platinum_950: 'Platinum 950',
  '18k_white': '18K White Gold',
  '18k_yellow': '18K Yellow Gold',
  '18k_rose': '18K Rose Gold',
};

const BASE_WEIGHTS: Record<SettingStyle, number> = {
  solitaire: 4.20,
  cathedral: 5.40,
  halo: 5.60,
  bezel: 4.80,
  three_stone: 5.80,
  vintage: 5.20,
};

function CustomStudioContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { gemstones } = useInventory();
  const { addBespokeJewelry } = useCart();

  const initialGemId = searchParams.get('gemId');

  // Step state (1: Select Gem, 2: Setting Style, 3: Metal & Sizing, 4: Designer Details)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Configuration state
  const [selectedGemId, setSelectedGemId] = useState<string>(initialGemId || (gemstones[0]?.id ?? ''));
  const [category, setCategory] = useState<'ring' | 'pendant' | 'earrings' | 'bracelet'>('ring');
  const [settingStyle, setSettingStyle] = useState<SettingStyle>('cathedral');
  const [metal, setMetal] = useState<MetalType>('platinum_950');
  const [ringSize, setRingSize] = useState<string>('6.5');
  const [accentType, setAccentType] = useState<AccentType>('natural_vs_diamond');
  const [engraving, setEngraving] = useState<string>('');
  const [customNotes, setCustomNotes] = useState<string>('');
  const [consultationType, setConsultationType] = useState<ConsultationType>('video_call');
  const [uploadedImagePreview, setUploadedImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (initialGemId) {
      setSelectedGemId(initialGemId);
    }
  }, [initialGemId]);

  const selectedGem = gemstones.find(g => g.id === selectedGemId) || gemstones[0];

  // Dynamic price calculation
  const calculations = React.useMemo(() => {
    if (!selectedGem) {
      return { metalCost: 0, accentCost: 0, laborCost: 0, totalQuote: 0, depositAmount: 0 };
    }

    // Weight calculation adjusted by finger size
    let weight = BASE_WEIGHTS[settingStyle] || 5.0;
    const numSize = parseFloat(ringSize) || 6.5;
    if (numSize > 6.0) {
      weight += (numSize - 6.0) * 0.14;
    }

    // Metal cost: Weight * 1.15 (casting loss) * Spot rate
    const spot = SPOT_RATES[metal] || 44.80;
    const metalCost = Math.round(weight * 1.15 * spot);

    // Accent stones
    let accentCost = 0;
    if (accentType === 'natural_vs_diamond') accentCost = 350;
    else if (accentType === 'lab_diamond') accentCost = 150;

    // Labor: CAD file generation + 3D wax printing + hand micro-prong setting
    const cadFee = 250;
    const castingFee = 160;
    const settingFee = accentCost > 0 ? 180 : 80;
    const laborCost = cadFee + castingFee + settingFee;

    // Setting craftsmanship markup
    const settingSubtotal = Math.round((metalCost + accentCost + laborCost) * 1.25);
    const totalQuote = selectedGem.price + settingSubtotal;
    const depositAmount = Math.round(selectedGem.price + settingSubtotal * 0.5);

    return {
      metalCost,
      accentCost,
      laborCost,
      settingSubtotal,
      totalQuote,
      depositAmount,
    };
  }, [selectedGem, settingStyle, metal, ringSize, accentType]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => {
        setUploadedImagePreview(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddToCart = (depositOnly: boolean) => {
    if (!selectedGem) return;

    const config: BespokeConfig = {
      gemId: selectedGem.id,
      category,
      settingStyle,
      metal,
      ringSize,
      accentType,
      engraving,
      customNotes,
      consultationType,
      metalCost: calculations.metalCost,
      accentCost: calculations.accentCost,
      laborCost: calculations.laborCost,
      totalQuote: calculations.totalQuote,
      depositAmount: calculations.depositAmount,
      referenceImages: uploadedImagePreview ? [uploadedImagePreview] : [],
    };

    addBespokeJewelry(selectedGem, config, depositOnly);
    router.push('/cart');
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gem-red-light border border-red-200 text-xs font-bold text-gem-red uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-gem-red" />
            <span>GEMTRAD Bespoke Atelier</span>
          </div>
          <h1 className="font-cinzel text-3xl sm:text-4xl font-bold text-slate-900">
            Select Your Gem & Customize Jewelry with Our Expert Designer
          </h1>
          <p className="text-slate-600 text-sm mt-2">
            Follow the 4-step configurator to select an untreated center gemstone, tailor the precious metal setting, submit your custom design sketches, and calculate real-time transparent costs.
          </p>
        </div>

        {/* 4-Step Progress Navigation Bar */}
        <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between overflow-x-auto gap-2">
          {[
            { num: 1, label: '1. Center Gem' },
            { num: 2, label: '2. Setting Style' },
            { num: 3, label: '3. Metal & Sizing' },
            { num: 4, label: '4. Expert Designer' },
          ].map(s => (
            <button
              key={s.num}
              onClick={() => setCurrentStep(s.num)}
              className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                currentStep === s.num
                  ? 'bg-slate-900 text-white shadow-sm'
                  : currentStep > s.num
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
              }`}
            >
              {currentStep > s.num ? (
                <Check className="w-4 h-4 text-emerald-600" />
              ) : (
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                  currentStep === s.num ? 'bg-gem-red text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  {s.num}
                </span>
              )}
              <span>{s.label}</span>
            </button>
          ))}
        </div>

        {/* Studio Layout: 2 Columns (Configurator Steps + Sticky Real-Time Quote) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Step Builder (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* STEP 1: CHOOSE CENTER GEM */}
            {currentStep === 1 && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6 animate-in fade-in duration-200">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div>
                    <h2 className="font-cinzel text-xl font-bold text-slate-900">
                      Step 1: Select Your Centerpiece Gemstone
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Choose an authenticated unheated gemstone from our vault to serve as the heart of your jewelry.
                    </p>
                  </div>
                  <Link href="/gems" className="text-xs font-semibold text-gem-blue hover:underline">
                    Browse All ({gemstones.length}) →
                  </Link>
                </div>

                {/* Gems Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {gemstones.map(g => {
                    const isSelected = g.id === selectedGemId;
                    return (
                      <div
                        key={g.id}
                        onClick={() => setSelectedGemId(g.id)}
                        className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex gap-3.5 items-center relative ${
                          isSelected
                            ? 'border-gem-blue bg-blue-50/50 shadow-md ring-1 ring-gem-blue'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-gem-blue text-white flex items-center justify-center">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                        )}
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-slate-900 flex-shrink-0">
                          <Image src={g.image} alt={g.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-gem-red">
                            {g.carat.toFixed(2)} CT • {g.cut}
                          </span>
                          <h4 className="font-cinzel font-bold text-slate-900 text-xs truncate mt-0.5">
                            {g.name}
                          </h4>
                          <div className="text-[11px] text-slate-500">{g.origin} • {g.certLab}</div>
                          <div className="text-xs font-mono font-bold text-slate-900 mt-1">
                            ${g.price.toLocaleString()} USD
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-2"
                  >
                    <span>Proceed to Setting Style</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: SETTING STYLE */}
            {currentStep === 2 && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6 animate-in fade-in duration-200">
                <div className="pb-4 border-b border-slate-100">
                  <h2 className="font-cinzel text-xl font-bold text-slate-900">
                    Step 2: Jewelry Category & Mounting Architecture
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Select how your gemstone will be held and elevated on the finger or neckline.
                  </p>
                </div>

                {/* Category tabs */}
                <div className="flex gap-2">
                  {[
                    { id: 'ring', label: 'Bespoke Ring' },
                    { id: 'pendant', label: 'Pendant & Necklace' },
                    { id: 'earrings', label: 'Earring Studs' },
                    { id: 'bracelet', label: 'Cuff / Bracelet' },
                  ].map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setCategory(cat.id as 'ring' | 'pendant' | 'earrings' | 'bracelet')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        category === cat.id
                          ? 'bg-slate-900 text-white shadow-sm'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Setting Styles */}
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-3">
                    Mounting Style Design
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {[
                      {
                        id: 'solitaire',
                        name: 'Classic Solitaire',
                        desc: 'Four or six delicate wire prongs maximizing 360 light entry.',
                        weight: '4.2g base',
                      },
                      {
                        id: 'cathedral',
                        name: 'Cathedral Arch',
                        desc: 'Elevated shoulders sweeping upward into a protective basket.',
                        weight: '5.4g base',
                      },
                      {
                        id: 'halo',
                        name: 'Micro-Pave Halo',
                        desc: 'A shimmering border of melee diamonds amplifying center diameter.',
                        weight: '5.6g base',
                      },
                      {
                        id: 'bezel',
                        name: 'Modern Full Bezel',
                        desc: 'Smooth metal rim encasing the gem girdle for maximum security.',
                        weight: '4.8g base',
                      },
                      {
                        id: 'three_stone',
                        name: 'Trilogy Three-Stone',
                        desc: 'Flanked by two trapezoid or tapered baguette side stones.',
                        weight: '5.8g base',
                      },
                      {
                        id: 'vintage',
                        name: 'Vintage Hand-Milgrain',
                        desc: 'Hand-engraved filigree scrollwork with antique European flair.',
                        weight: '5.2g base',
                      },
                    ].map(style => (
                      <div
                        key={style.id}
                        onClick={() => setSettingStyle(style.id as SettingStyle)}
                        className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                          settingStyle === style.id
                            ? 'border-gem-red bg-red-50/40 shadow-sm ring-1 ring-gem-red'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-cinzel font-bold text-slate-900 text-xs">{style.name}</span>
                            {settingStyle === style.id && <Check className="w-4 h-4 text-gem-red" />}
                          </div>
                          <p className="text-[11px] text-slate-500 leading-relaxed">{style.desc}</p>
                        </div>
                        <div className="mt-3 text-[10px] font-mono text-slate-400 border-t border-slate-100 pt-2">
                          Est. Metal: {style.weight}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-100"
                  >
                    Back to Gem
                  </button>
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-2"
                  >
                    <span>Proceed to Metal & Sizing</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: METAL & SIZING */}
            {currentStep === 3 && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6 animate-in fade-in duration-200">
                <div className="pb-4 border-b border-slate-100">
                  <h2 className="font-cinzel text-xl font-bold text-slate-900">
                    Step 3: Precious Metal, Sizing & Melee Accents
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Configure metal alloy purity, exact finger dimension, and optional diamond pavé.
                  </p>
                </div>

                {/* Metal Selection */}
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-3">
                    Precious Metal Alloy (Live Spot Rates)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      {
                        id: 'platinum_950',
                        name: 'Platinum 950 (PT950)',
                        desc: '95% Pure Platinum. High density, hypoallergenic, permanent white luster.',
                        rate: '$44.80/g',
                      },
                      {
                        id: '18k_white',
                        name: '18K White Gold',
                        desc: '75% Pure Gold with palladium/silver alloy and rhodium mirror finish.',
                        rate: '$59.20/g',
                      },
                      {
                        id: '18k_yellow',
                        name: '18K Royal Yellow Gold',
                        desc: 'Rich warm golden hue preferred for vivid Ceylon Sapphires.',
                        rate: '$58.50/g',
                      },
                      {
                        id: '18k_rose',
                        name: '18K Rose Gold',
                        desc: 'Romantic copper blush alloy enhancing Padparadscha and Rubies.',
                        rate: '$58.50/g',
                      },
                    ].map(m => (
                      <div
                        key={m.id}
                        onClick={() => setMetal(m.id as MetalType)}
                        className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex justify-between items-start ${
                          metal === m.id
                            ? 'border-gem-blue bg-blue-50/40 shadow-sm ring-1 ring-gem-blue'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div>
                          <div className="font-cinzel font-bold text-slate-900 text-xs flex items-center gap-1.5">
                            {m.name}
                            {metal === m.id && <Check className="w-3.5 h-3.5 text-gem-blue" />}
                          </div>
                          <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{m.desc}</p>
                          <span className="text-[10px] font-mono text-gem-blue mt-2 inline-block font-semibold">
                            Spot Rate: {m.rate}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Finger Sizing & Accents */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                      Ring Size (US Standards)
                    </label>
                    <select
                      value={ringSize}
                      onChange={e => setRingSize(e.target.value)}
                      className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:border-gem-blue"
                    >
                      {['4.0', '4.5', '5.0', '5.5', '6.0', '6.5', '7.0', '7.5', '8.0', '8.5', '9.0', '9.5', '10.0'].map(sz => (
                        <option key={sz} value={sz}>
                          US Size {sz} (Free resizing within 90 days)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                      Side Accent Diamonds
                    </label>
                    <select
                      value={accentType}
                      onChange={e => setAccentType(e.target.value as AccentType)}
                      className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:border-gem-blue"
                    >
                      <option value="natural_vs_diamond">Natural VS1/F-Color Diamonds (+ $350)</option>
                      <option value="lab_diamond">Lab Precision Diamonds (+ $150)</option>
                      <option value="none">No Accent Stones / Solitaire Clean (+ $0)</option>
                    </select>
                  </div>
                </div>

                {/* Engraving */}
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Custom Laser Engraving Inside Band (Complimentary)
                  </label>
                  <input
                    type="text"
                    maxLength={30}
                    value={engraving}
                    onChange={e => setEngraving(e.target.value)}
                    placeholder="e.g. Forever & Always • 10.24.26"
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:border-gem-blue"
                  />
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-100"
                  >
                    Back to Style
                  </button>
                  <button
                    onClick={() => setCurrentStep(4)}
                    className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-2"
                  >
                    <span>Proceed to Expert Designer</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: EXPERT DESIGNER COLLABORATION */}
            {currentStep === 4 && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6 animate-in fade-in duration-200">
                <div className="pb-4 border-b border-slate-100">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-amber-50 text-amber-800 border border-amber-200 text-xs font-semibold mb-2">
                    <UserCheck className="w-3.5 h-3.5 text-amber-600" />
                    <span>Dedicated Haute Joaillerie Master Designer Assigned</span>
                  </div>
                  <h2 className="font-cinzel text-xl font-bold text-slate-900">
                    Step 4: Collaborate with Our Senior Designer
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Share your vision, upload hand sketches or Pinterest inspirations, and select your consultation format.
                  </p>
                </div>

                {/* Consultation method */}
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-3">
                    Preferred Consultation Format
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      {
                        id: 'video_call',
                        title: 'Virtual CAD Video Call',
                        desc: 'Live 1-on-1 session with senior gemologist via Google Meet or Zoom.',
                        icon: Video,
                      },
                      {
                        id: 'cad_approval',
                        title: 'Direct 3D CAD Renders',
                        desc: 'Receive 360 photorealistic 3D CAD renders via WhatsApp & Email for review.',
                        icon: Sparkles,
                      },
                      {
                        id: 'in_person',
                        title: 'Private Atelier Visit',
                        desc: 'In-person champagne consultation at our Geneva or Colombo salon.',
                        icon: Compass,
                      },
                    ].map(c => {
                      const Icon = c.icon;
                      return (
                        <div
                          key={c.id}
                          onClick={() => setConsultationType(c.id as ConsultationType)}
                          className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                            consultationType === c.id
                              ? 'border-gem-blue bg-blue-50/40 shadow-sm ring-1 ring-gem-blue'
                              : 'border-slate-200 hover:border-slate-300 bg-white'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
                                <Icon className="w-4 h-4" />
                              </div>
                              {consultationType === c.id && <Check className="w-4 h-4 text-gem-blue" />}
                            </div>
                            <div className="font-cinzel font-bold text-slate-900 text-xs">{c.title}</div>
                            <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{c.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* File / Sketch Upload */}
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                    Upload Inspiration Photos or Hand Sketches
                  </label>
                  <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-slate-400 transition-colors bg-slate-50">
                    {uploadedImagePreview ? (
                      <div className="space-y-3">
                        <div className="relative w-36 h-36 mx-auto rounded-lg overflow-hidden border border-slate-300 shadow-sm">
                          <Image src={uploadedImagePreview} alt="Uploaded Inspiration" fill className="object-cover" />
                        </div>
                        <p className="text-xs text-emerald-700 font-semibold">Sketch successfully loaded!</p>
                        <button
                          type="button"
                          onClick={() => setUploadedImagePreview(null)}
                          className="text-xs text-rose-600 hover:underline"
                        >
                          Remove and upload another
                        </button>
                      </div>
                    ) : (
                      <label className="cursor-pointer block">
                        <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                        <span className="text-xs font-bold text-slate-700 block">Click to upload JPEG, PNG, or PDF sketch</span>
                        <span className="text-[11px] text-slate-400 block mt-1">Our master jewelers will translate your sketch into exact 3D proportions.</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>

                {/* Custom Notes */}
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Special Instructions for Master Jeweler
                  </label>
                  <textarea
                    rows={3}
                    value={customNotes}
                    onChange={e => setCustomNotes(e.target.value)}
                    placeholder="e.g. Low profile basket so it doesn't snag on knitwear, double talon prongs, matte satin finish on shank..."
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:border-gem-blue"
                  />
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-100"
                  >
                    Back to Metal & Sizing
                  </button>
                  <button
                    onClick={() => handleAddToCart(true)}
                    className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-gem-red to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white text-xs font-bold flex items-center gap-2 shadow-lg"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Lock Stone & Add to Cart (${calculations.depositAmount.toLocaleString()})</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sticky Real-Time Quote Sidebar (4 Cols) */}
          <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-lg space-y-6 sticky top-28">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Live Dynamic Quote</span>
                <span className="text-[11px] px-2 py-0.5 rounded bg-blue-50 text-gem-blue font-bold">
                  Bespoke Commission
                </span>
              </div>

              {/* Selected Gem Preview Card */}
              {selectedGem && (
                <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200 flex gap-3 items-center">
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-slate-900 flex-shrink-0">
                    <Image src={selectedGem.image} alt={selectedGem.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-slate-900 truncate font-cinzel">
                      {selectedGem.name}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {selectedGem.carat.toFixed(2)}ct • {selectedGem.cut} • {selectedGem.origin}
                    </div>
                    <div className="text-xs font-mono font-bold text-gem-blue mt-0.5">
                      ${selectedGem.price.toLocaleString()} USD
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Config Summary Items */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Selected Setting:</span>
                <strong className="text-slate-900 capitalize">{settingStyle} Ring</strong>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Precious Metal:</span>
                <strong className="text-slate-900">{METAL_NAMES[metal]}</strong>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Ring Size:</span>
                <strong className="text-slate-900">US {ringSize}</strong>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Consultation Mode:</span>
                <strong className="text-slate-900 capitalize">{consultationType.replace('_', ' ')}</strong>
              </div>
            </div>

            {/* Itemized Cost Breakdown */}
            <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Centerpiece Natural Gemstone</span>
                <span className="font-mono text-slate-800">${selectedGem?.price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Precious Metal Casting (Alloy & Loss)</span>
                <span className="font-mono text-slate-800">${calculations.metalCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Side Accent Diamonds</span>
                <span className="font-mono text-slate-800">${calculations.accentCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>CAD Modeling & Master Micro-setting</span>
                <span className="font-mono text-slate-800">${calculations.laborCost.toLocaleString()}</span>
              </div>
            </div>

            {/* Total / Deposit Calculation */}
            <div className="pt-4 border-t-2 border-slate-200 space-y-2">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-700 block">Total Bespoke Commission</span>
                  <span className="text-[11px] text-slate-400">Insured shipping & hallmarks included</span>
                </div>
                <div className="text-2xl font-mono font-bold text-slate-900">
                  ${calculations.totalQuote.toLocaleString()}
                </div>
              </div>

              {/* 50% Deposit Callout */}
              <div className="p-3 bg-red-50/70 border border-red-200/80 rounded-xl flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-gem-red block">50% Project Deposit to Start:</span>
                  <span className="text-[11px] text-slate-600">Balance due after CAD & hallmarking approval</span>
                </div>
                <div className="text-lg font-mono font-bold text-gem-red">
                  ${calculations.depositAmount.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Direct Commission CTA buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => handleAddToCart(true)}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-gem-red to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Lock Gem with 50% Deposit (${calculations.depositAmount.toLocaleString()})</span>
              </button>

              <button
                onClick={() => handleAddToCart(false)}
                className="w-full py-2.5 px-4 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Pay Full Amount (${calculations.totalQuote.toLocaleString()})</span>
              </button>
            </div>

            <div className="text-[11px] text-slate-400 text-center leading-relaxed">
              Includes full money-back guarantee if you are not 100% satisfied with your photorealistic 3D CAD renders before metal casting.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CustomStudioPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center">Loading Bespoke Studio...</div>}>
      <CustomStudioContent />
    </Suspense>
  );
}
