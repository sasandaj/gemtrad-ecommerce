'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useInventory } from '@/context/InventoryContext';
import { useCart } from '@/context/CartContext';
import { GemVariety, GemCut, CertLab, Order } from '@/types/gem';
import { 
  Plus, 
  Trash2, 
  Gem, 
  ShoppingBag, 
  DollarSign, 
  RefreshCcw, 
  Search, 
  Sparkles 
} from 'lucide-react';

export default function AdminPage() {
  const { gemstones, addGemstone, updateGemstone, deleteGemstone, resetInventory } = useInventory();
  const { orders, updateOrderStatus } = useCart();

  const [activeTab, setActiveTab] = useState<'inventory' | 'orders' | 'add_gem'>('inventory');
  const [searchQuery, setSearchQuery] = useState('');

  // Form state for adding new gemstone
  const [newGem, setNewGem] = useState<{
    name: string;
    variety: GemVariety;
    color: string;
    carat: number;
    cut: GemCut;
    clarity: string;
    origin: string;
    treatment: string;
    dimensions: string;
    price: number;
    status: 'available' | 'reserved' | 'sold';
    image: string;
    certLab: CertLab;
    certNumber: string;
    certDate: string;
    hexColor: string;
    description: string;
  }>({
    name: '',
    variety: 'Sapphire',
    color: 'Vivid Royal Blue',
    carat: 2.50,
    cut: 'Cushion',
    clarity: 'Eye Clean (VVS1)',
    origin: 'Sri Lanka (Ceylon)',
    treatment: 'Unheated / Untreated',
    dimensions: '8.20 x 7.10 x 4.90 mm',
    price: 7500,
    status: 'available',
    image: '/images/sapphire.jpg',
    certLab: 'GIA',
    certNumber: `GIA-${Math.floor(10000000 + Math.random() * 90000000)}`,
    certDate: 'October 2026',
    hexColor: '#0854C4',
    description: 'Natural unheated gemstone certified by international gemological laboratory.',
  });

  // KPI calculations
  const totalInventoryValue = gemstones.reduce((sum, g) => sum + g.price, 0);
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const activeCount = gemstones.filter(g => g.status === 'available').length;

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGem.name.trim()) return;

    addGemstone(newGem);
    alert('Gemstone successfully registered in GEMTRAD Vault!');
    setActiveTab('inventory');
    setNewGem({
      name: '',
      variety: 'Sapphire',
      color: 'Vivid Royal Blue',
      carat: 2.50,
      cut: 'Cushion',
      clarity: 'Eye Clean (VVS1)',
      origin: 'Sri Lanka (Ceylon)',
      treatment: 'Unheated / Untreated',
      dimensions: '8.20 x 7.10 x 4.90 mm',
      price: 7500,
      status: 'available',
      image: '/images/sapphire.jpg',
      certLab: 'GIA',
      certNumber: `GIA-${Math.floor(10000000 + Math.random() * 90000000)}`,
      certDate: 'October 2026',
      hexColor: '#0854C4',
      description: '',
    });
  };

  const filteredGemstones = gemstones.filter(g =>
    g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.certNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.variety.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>GEMTRAD Administrative Headquarters</span>
            </div>
            <h1 className="font-cinzel text-3xl font-bold text-slate-900">
              Vault & Atelier Management Portal
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('add_gem')}
              className="px-4 py-2.5 bg-gem-blue hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Gemstone</span>
            </button>
            <button
              onClick={resetInventory}
              className="px-4 py-2.5 bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
              title="Reset inventory to default curated gemstones"
            >
              <RefreshCcw className="w-3.5 h-3.5" />
              <span>Reset Vault</span>
            </button>
          </div>
        </div>

        {/* Analytics KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 text-xs">
              <span>Total Vault Value</span>
              <DollarSign className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-mono font-bold text-slate-900 mt-2">
              ${totalInventoryValue.toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Across {gemstones.length} curated specimens</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 text-xs">
              <span>Active Available</span>
              <Gem className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-mono font-bold text-slate-900 mt-2">
              {activeCount} Stones
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Available for instant acquisition</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 text-xs">
              <span>Total Commissions</span>
              <ShoppingBag className="w-4 h-4 text-gem-red" />
            </div>
            <div className="text-2xl font-mono font-bold text-slate-900 mt-2">
              {orders.length} Orders
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Loose gems & bespoke rings</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 text-xs">
              <span>Gross Commission Volume</span>
              <Sparkles className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-mono font-bold text-emerald-700 mt-2">
              ${totalRevenue.toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Processed securely via Stripe/Wire</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 gap-4 text-sm font-semibold">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`pb-3 px-2 border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'inventory'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            <Gem className="w-4 h-4" />
            <span>Gemstone Vault Inventory ({gemstones.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 px-2 border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Orders & Bespoke Commissions ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('add_gem')}
            className={`pb-3 px-2 border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'add_gem'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>Add Gemstone</span>
          </button>
        </div>

        {/* TAB 1: INVENTORY TABLE */}
        {activeTab === 'inventory' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-4 p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="relative w-full sm:max-w-xs">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Filter inventory..."
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div className="text-xs text-slate-500">
                Displaying <strong>{filteredGemstones.length}</strong> items
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-bold uppercase tracking-wider">
                    <th className="p-3">Gemstone</th>
                    <th className="p-3">Variety / Cut</th>
                    <th className="p-3">Carat</th>
                    <th className="p-3">Origin</th>
                    <th className="p-3">Lab Report</th>
                    <th className="p-3">Price (USD)</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredGemstones.map(g => (
                    <tr key={g.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-slate-900 flex-shrink-0">
                            <Image src={g.image} alt={g.name} fill className="object-cover" />
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 truncate max-w-xs">{g.name}</div>
                            <div className="text-[11px] text-slate-400">{g.clarity} • {g.dimensions}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <span className="font-semibold text-slate-800">{g.variety}</span>
                        <div className="text-[11px] text-slate-500">{g.cut} Cut</div>
                      </td>
                      <td className="p-3 font-mono font-bold text-slate-900">
                        {g.carat.toFixed(2)} ct
                      </td>
                      <td className="p-3 text-slate-700">{g.origin}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-800">
                          {g.certLab}
                        </span>
                        <div className="text-[10px] font-mono text-slate-500">{g.certNumber}</div>
                      </td>
                      <td className="p-3 font-mono font-bold text-slate-900">
                        ${g.price.toLocaleString()}
                      </td>
                      <td className="p-3">
                        <select
                          value={g.status}
                          onChange={e => updateGemstone(g.id, { status: e.target.value as 'available' | 'reserved' | 'sold' })}
                          className={`text-[11px] font-bold px-2 py-1 rounded-lg border focus:outline-none ${
                            g.status === 'available'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : g.status === 'reserved'
                              ? 'bg-amber-50 text-amber-800 border-amber-200'
                              : 'bg-rose-50 text-rose-800 border-rose-200'
                          }`}
                        >
                          <option value="available">Available</option>
                          <option value="reserved">Reserved</option>
                          <option value="sold">Sold</option>
                        </select>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => {
                            if (confirm(`Remove ${g.name} from inventory?`)) {
                              deleteGemstone(g.id);
                            }
                          }}
                          className="p-1.5 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded transition-colors"
                          title="Delete Gemstone"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
            <h2 className="font-cinzel text-xl font-bold text-slate-900">
              Active Client Orders & Bespoke Requests
            </h2>

            {orders.length === 0 ? (
              <div className="p-10 text-center text-slate-400 text-xs">
                No client commissions received yet. Place a test order from the checkout flow to see live status management!
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map(order => (
                  <div key={order.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-4">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 pb-3 border-b border-slate-200">
                      <div>
                        <div className="text-xs font-mono font-bold text-gem-gold bg-slate-900 px-2.5 py-1 rounded inline-block">
                          {order.trackingNumber}
                        </div>
                        <div className="text-xs text-slate-600 mt-1">
                          Client: <strong>{order.customer.fullName}</strong> ({order.customer.email}) • {order.customer.phone}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="text-sm font-mono font-bold text-slate-900">
                            ${order.total.toLocaleString()} USD
                          </div>
                          <div className="text-[10px] text-slate-400 capitalize">{order.paymentMethod.replace('_', ' ')}</div>
                        </div>

                        {/* Status updater */}
                        <select
                          value={order.status}
                          onChange={e => updateOrderStatus(order.id, e.target.value as Order['status'])}
                          className="text-xs font-bold bg-white border border-slate-300 rounded-xl px-3 py-1.5 focus:outline-none"
                        >
                          <option value="Confirmed">Confirmed</option>
                          <option value="CAD Design">CAD Design</option>
                          <option value="Master Setting">Master Setting</option>
                          <option value="Certification">Certification</option>
                          <option value="Insured Transit">Insured Transit</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </div>
                    </div>

                    {/* Order items */}
                    <div className="space-y-2">
                      {order.items.map(item => (
                        <div key={item.id} className="flex items-center gap-3 text-xs bg-white p-3 rounded-xl border border-slate-200/80">
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-slate-900 flex-shrink-0">
                            <Image src={item.gem.image} alt={item.gem.name} fill className="object-cover" />
                          </div>
                          <div className="flex-1">
                            <span className="font-bold text-slate-900">{item.gem.name}</span>
                            {item.bespokeConfig ? (
                              <div className="text-slate-500 text-[11px]">
                                Custom {item.bespokeConfig.settingStyle.toUpperCase()} in {item.bespokeConfig.metal.replace('_', ' ').toUpperCase()} • Size {item.bespokeConfig.ringSize} • {item.bespokeConfig.consultationType.toUpperCase()}
                              </div>
                            ) : (
                              <div className="text-slate-500 text-[11px]">Loose Gemstone Purchase</div>
                            )}
                          </div>
                          <div className="font-mono font-bold text-slate-900">
                            ${item.price.toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: ADD GEMSTONE FORM */}
        {activeTab === 'add_gem' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 max-w-3xl mx-auto space-y-6">
            <h2 className="font-cinzel text-xl font-bold text-slate-900 pb-3 border-b border-slate-100">
              Register New Loose Gemstone to Vault
            </h2>

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Gemstone Commercial Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 3.40ct Royal Blue Ceylon Sapphire"
                  value={newGem.name}
                  onChange={e => setNewGem({ ...newGem, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-gem-blue"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Variety</label>
                  <select
                    value={newGem.variety}
                    onChange={e => setNewGem({ ...newGem, variety: e.target.value as GemVariety })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3"
                  >
                    {['Sapphire', 'Ruby', 'Emerald', 'Padparadscha', 'Diamond', 'Alexandrite'].map(v => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Cut / Shape</label>
                  <select
                    value={newGem.cut}
                    onChange={e => setNewGem({ ...newGem, cut: e.target.value as GemCut })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3"
                  >
                    {['Cushion', 'Oval', 'Emerald', 'Round', 'Pear', 'Princess'].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Carat Weight</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={newGem.carat}
                    onChange={e => setNewGem({ ...newGem, carat: parseFloat(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Color Saturation</label>
                  <input
                    type="text"
                    value={newGem.color}
                    onChange={e => setNewGem({ ...newGem, color: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Clarity Grade</label>
                  <input
                    type="text"
                    value={newGem.clarity}
                    onChange={e => setNewGem({ ...newGem, clarity: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Origin</label>
                  <input
                    type="text"
                    value={newGem.origin}
                    onChange={e => setNewGem({ ...newGem, origin: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Treatment</label>
                  <input
                    type="text"
                    value={newGem.treatment}
                    onChange={e => setNewGem({ ...newGem, treatment: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Price (USD)</label>
                  <input
                    type="number"
                    required
                    value={newGem.price}
                    onChange={e => setNewGem({ ...newGem, price: parseInt(e.target.value, 10) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Lab Authority</label>
                  <select
                    value={newGem.certLab}
                    onChange={e => setNewGem({ ...newGem, certLab: e.target.value as CertLab })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3"
                  >
                    {['GIA', 'Gübelin', 'SSEF', 'GRS', 'IGI'].map(l => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Cert Report Number</label>
                  <input
                    type="text"
                    value={newGem.certNumber}
                    onChange={e => setNewGem({ ...newGem, certNumber: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-mono"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Image Asset</label>
                  <select
                    value={newGem.image}
                    onChange={e => setNewGem({ ...newGem, image: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3"
                  >
                    <option value="/images/sapphire.jpg">Sapphire (Royal Blue)</option>
                    <option value="/images/ruby.jpg">Ruby (Pigeon Blood)</option>
                    <option value="/images/emerald.jpg">Emerald (Colombian)</option>
                    <option value="/images/padparadscha.jpg">Padparadscha</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Gemologist Description</label>
                <textarea
                  rows={3}
                  value={newGem.description}
                  onChange={e => setNewGem({ ...newGem, description: e.target.value })}
                  placeholder="Notes on brilliance, inclusion characteristics, provenance..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab('inventory')}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gem-blue text-white font-bold hover:bg-blue-700"
                >
                  Save Gemstone to Vault
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
