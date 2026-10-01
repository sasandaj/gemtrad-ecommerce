'use client';

import React, { useState, useMemo } from 'react';
import { useInventory } from '@/context/InventoryContext';
import { GemCard } from '@/components/GemCard';
import { 
  Filter, 
  X, 
  RotateCcw, 
  SlidersHorizontal, 
  Sparkles, 
  Search, 
  Award, 
  ArrowUpDown 
} from 'lucide-react';

export default function GemsCatalogPage() {
  const { gemstones } = useInventory();

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVariety, setSelectedVariety] = useState<string>('All');
  const [selectedCut, setSelectedCut] = useState<string>('All');
  const [selectedCert, setSelectedCert] = useState<string>('All');
  const [selectedOrigin, setSelectedOrigin] = useState<string>('All');
  const [unheatedOnly, setUnheatedOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number>(20000);
  const [minCarat, setMinCarat] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Extract unique origins
  const origins = useMemo(() => {
    const list = Array.from(new Set(gemstones.map(g => g.origin.split(' ')[0])));
    return ['All', ...list];
  }, [gemstones]);

  // Filter logic
  const filteredGemstones = useMemo(() => {
    return gemstones.filter(gem => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = gem.name.toLowerCase().includes(q);
        const matchColor = gem.color.toLowerCase().includes(q);
        const matchCert = gem.certNumber.toLowerCase().includes(q);
        const matchOrigin = gem.origin.toLowerCase().includes(q);
        if (!matchName && !matchColor && !matchCert && !matchOrigin) return false;
      }

      // Variety
      if (selectedVariety !== 'All' && gem.variety.toLowerCase() !== selectedVariety.toLowerCase()) {
        return false;
      }

      // Cut
      if (selectedCut !== 'All' && gem.cut.toLowerCase() !== selectedCut.toLowerCase()) {
        return false;
      }

      // Cert Lab
      if (selectedCert !== 'All' && gem.certLab.toLowerCase() !== selectedCert.toLowerCase()) {
        return false;
      }

      // Origin
      if (selectedOrigin !== 'All' && !gem.origin.includes(selectedOrigin)) {
        return false;
      }

      // Unheated
      if (unheatedOnly && !gem.treatment.toLowerCase().includes('unheated')) {
        return false;
      }

      // Price
      if (gem.price > maxPrice) {
        return false;
      }

      // Carat
      if (gem.carat < minCarat) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'carat-high') return b.carat - a.carat;
      if (sortBy === 'carat-low') return a.carat - b.carat;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [
    gemstones,
    searchQuery,
    selectedVariety,
    selectedCut,
    selectedCert,
    selectedOrigin,
    unheatedOnly,
    maxPrice,
    minCarat,
    sortBy,
  ]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedVariety('All');
    setSelectedCut('All');
    setSelectedCert('All');
    setSelectedOrigin('All');
    setUnheatedOnly(false);
    setMaxPrice(20000);
    setMinCarat(1);
    setSortBy('featured');
  };

  const hasActiveFilters =
    searchQuery ||
    selectedVariety !== 'All' ||
    selectedCut !== 'All' ||
    selectedCert !== 'All' ||
    selectedOrigin !== 'All' ||
    unheatedOnly ||
    maxPrice < 20000 ||
    minCarat > 1;

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-gem-blue uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Vault Reserve Inventory</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-cinzel font-bold text-slate-900">
                Rare Untreated Loose Gemstones
              </h1>
              <p className="text-slate-600 text-sm mt-1 max-w-2xl">
                Explore individual specimens with certified GIA, Gübelin, or SSEF credentials. Buy loose or mount onto a bespoke custom ring with our master atelier.
              </p>
            </div>

            {/* Mobile filter toggle */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-300 rounded-xl font-semibold text-xs text-slate-800 shadow-sm"
            >
              <Filter className="w-4 h-4 text-gem-blue" />
              <span>Filter Gemstones {hasActiveFilters && '(Active)'}</span>
            </button>
          </div>
        </div>

        {/* Search & Sort Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative w-full md:max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by variety, color, lab cert #, origin..."
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-gem-blue focus:ring-1 focus:ring-gem-blue"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Variety Badges */}
          <div className="hidden sm:flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {['All', 'Sapphire', 'Ruby', 'Emerald', 'Padparadscha'].map(varName => (
              <button
                key={varName}
                onClick={() => setSelectedVariety(varName)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedVariety === varName
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {varName}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <span className="text-xs text-slate-500 whitespace-nowrap flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>Sort:</span>
            </span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-gem-blue"
            >
              <option value="featured">Featured Gems First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="carat-high">Carat: Largest First</option>
              <option value="carat-low">Carat: Smallest First</option>
            </select>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block lg:col-span-3 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 sticky top-28">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-gem-blue" />
                <h3 className="font-cinzel font-bold text-slate-900 text-sm">Faceted Refinement</h3>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={handleResetFilters}
                  className="text-[11px] font-semibold text-gem-red hover:underline flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* Shape / Cut */}
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                Shape / Cut
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {['All', 'Cushion', 'Oval', 'Emerald', 'Round'].map(cut => (
                  <button
                    key={cut}
                    onClick={() => setSelectedCut(cut)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-medium text-left transition-colors ${
                      selectedCut === cut
                        ? 'bg-blue-50 text-gem-blue border border-blue-200 font-semibold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {cut}
                  </button>
                ))}
              </div>
            </div>

            {/* Certification Laboratory */}
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                Laboratory Dossier
              </label>
              <div className="flex flex-wrap gap-1.5">
                {['All', 'GIA', 'Gübelin', 'SSEF', 'GRS', 'IGI'].map(lab => (
                  <button
                    key={lab}
                    onClick={() => setSelectedCert(lab)}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                      selectedCert === lab
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {lab}
                  </button>
                ))}
              </div>
            </div>

            {/* Origin */}
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                Geographic Provenance
              </label>
              <select
                value={selectedOrigin}
                onChange={e => setSelectedOrigin(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-700 focus:outline-none"
              >
                {origins.map(orig => (
                  <option key={orig} value={orig}>
                    {orig === 'All' ? 'All Origins' : orig}
                  </option>
                ))}
              </select>
            </div>

            {/* Minimum Carat */}
            <div>
              <div className="flex justify-between items-center text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                <span>Minimum Carat</span>
                <span className="font-mono text-gem-blue font-bold">{minCarat.toFixed(1)} ct+</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="4.0"
                step="0.1"
                value={minCarat}
                onChange={e => setMinCarat(parseFloat(e.target.value))}
                className="w-full accent-gem-blue cursor-pointer"
              />
            </div>

            {/* Max Budget Price */}
            <div>
              <div className="flex justify-between items-center text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                <span>Max Budget (USD)</span>
                <span className="font-mono text-slate-900 font-bold">${maxPrice.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="4000"
                max="20000"
                step="500"
                value={maxPrice}
                onChange={e => setMaxPrice(parseInt(e.target.value, 10))}
                className="w-full accent-gem-blue cursor-pointer"
              />
            </div>

            {/* Unheated Only Checkbox */}
            <div className="pt-2 border-t border-slate-100">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={unheatedOnly}
                  onChange={e => setUnheatedOnly(e.target.checked)}
                  className="rounded text-gem-blue focus:ring-gem-blue w-4 h-4 accent-gem-blue"
                />
                <span className="text-xs font-semibold text-slate-800">
                  Unheated / Untreated Only
                </span>
              </label>
              <p className="text-[11px] text-slate-400 mt-1 pl-6">
                Only stones with zero thermal modification recorded in lab report.
              </p>
            </div>
          </aside>

          {/* Gemstones Grid */}
          <div className="lg:col-span-9 space-y-6">
            <div className="flex items-center justify-between text-xs text-slate-500 px-1">
              <span>Showing <strong>{filteredGemstones.length}</strong> authenticated gemstones</span>
              {hasActiveFilters && (
                <button
                  onClick={handleResetFilters}
                  className="text-gem-blue hover:underline font-semibold"
                >
                  Clear all filters
                </button>
              )}
            </div>

            {filteredGemstones.length === 0 ? (
              <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-4">
                <Award className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="font-cinzel text-lg font-bold text-slate-900">No Gemstones Match Your Criteria</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Try broadening your carat, variety, or budget filters to explore more of our private vault inventory.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredGemstones.map(gem => (
                  <GemCard key={gem.id} gem={gem} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer Filter Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm lg:hidden">
          <div className="w-full max-w-xs bg-white h-full p-6 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <h3 className="font-cinzel font-bold text-slate-900">Filters</h3>
              <button onClick={() => setMobileFilterOpen(false)} className="p-2 text-slate-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Varieties */}
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase block mb-2">Variety</label>
              <div className="grid grid-cols-2 gap-2">
                {['All', 'Sapphire', 'Ruby', 'Emerald', 'Padparadscha'].map(v => (
                  <button
                    key={v}
                    onClick={() => setSelectedVariety(v)}
                    className={`p-2 rounded text-xs text-left ${
                      selectedVariety === v ? 'bg-gem-blue text-white font-bold' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Cut */}
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase block mb-2">Cut</label>
              <div className="grid grid-cols-2 gap-2">
                {['All', 'Cushion', 'Oval', 'Emerald', 'Round'].map(c => (
                  <button
                    key={c}
                    onClick={() => setSelectedCut(c)}
                    className={`p-2 rounded text-xs text-left ${
                      selectedCut === c ? 'bg-slate-900 text-white font-bold' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Unheated */}
            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={unheatedOnly}
                  onChange={e => setUnheatedOnly(e.target.checked)}
                />
                <span className="text-xs font-semibold text-slate-800">Unheated Only</span>
              </label>
            </div>

            <div className="pt-4 border-t border-slate-200 space-y-2">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 bg-gem-blue text-white rounded-xl text-xs font-bold"
              >
                Apply Filters ({filteredGemstones.length})
              </button>
              <button
                onClick={handleResetFilters}
                className="w-full py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
