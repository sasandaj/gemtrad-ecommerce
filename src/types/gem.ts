export type GemVariety = 'Sapphire' | 'Ruby' | 'Emerald' | 'Padparadscha' | 'Diamond' | 'Alexandrite';

export type GemCut = 'Cushion' | 'Oval' | 'Emerald' | 'Round' | 'Pear' | 'Princess';

export type CertLab = 'GIA' | 'IGI' | 'Gübelin' | 'GRS' | 'SSEF';

export interface Gemstone {
  id: string;
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
  featured?: boolean;
}

export type SettingStyle = 'solitaire' | 'cathedral' | 'halo' | 'bezel' | 'three_stone' | 'vintage';

export type MetalType = 'platinum_950' | '18k_white' | '18k_yellow' | '18k_rose';

export type AccentType = 'none' | 'natural_vs_diamond' | 'lab_diamond';

export type ConsultationType = 'video_call' | 'in_person' | 'cad_approval';

export interface BespokeConfig {
  gemId: string;
  category: 'ring' | 'pendant' | 'earrings' | 'bracelet';
  settingStyle: SettingStyle;
  metal: MetalType;
  ringSize: string;
  accentType: AccentType;
  engraving: string;
  customNotes: string;
  consultationType: ConsultationType;
  metalCost: number;
  accentCost: number;
  laborCost: number;
  totalQuote: number;
  depositAmount: number;
  referenceImages?: string[];
}

export interface CartItem {
  id: string;
  type: 'loose_gem' | 'bespoke_jewelry';
  gem: Gemstone;
  bespokeConfig?: BespokeConfig;
  price: number;
  isDepositOnly?: boolean;
  addedAt: number;
}

export interface Order {
  id: string;
  createdAt: string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: 'credit_card' | 'bank_wire' | 'deposit_50';
  status: 'Confirmed' | 'CAD Design' | 'Master Setting' | 'Certification' | 'Insured Transit' | 'Delivered';
  trackingNumber: string;
}
