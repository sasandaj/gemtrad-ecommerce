'use client';

import React from 'react';
import { Gemstone } from '@/types/gem';
import { X, Award, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface CertificateModalProps {
  gem: Gemstone | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ gem, isOpen, onClose }) => {
  if (!isOpen || !gem) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Certificate Header Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gem-gold/20 border border-gem-gold/40 flex items-center justify-center text-gem-gold">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-slate-400 font-semibold">Official Laboratory Report</div>
              <h3 className="text-xl font-cinzel font-bold text-white flex items-center gap-2">
                {gem.certLab} Gemological Dossier
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Body */}
        <div className="p-6 md:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Security Seal & Identification */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200 gap-4">
            <div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Report Number</div>
              <div className="text-lg font-mono font-bold text-slate-900 flex items-center gap-2">
                {gem.certNumber}
                <span className="text-xs px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-sans font-semibold">Verified</span>
              </div>
              <div className="text-xs text-slate-500 mt-0.5">Date of Examination: {gem.certDate}</div>
            </div>
            <div className="flex items-center gap-2 text-gem-blue text-xs font-semibold bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-lg">
              <ShieldCheck className="w-4 h-4" />
              <span>Tamper-Proof QR Archive</span>
            </div>
          </div>

          {/* 4Cs & Scientific Analysis Grid */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Identification & Characteristics</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div className="text-[11px] text-slate-500 font-medium">Species & Variety</div>
                <div className="text-sm font-semibold text-slate-900">{gem.variety}</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div className="text-[11px] text-slate-500 font-medium">Weight (Carat)</div>
                <div className="text-sm font-semibold text-slate-900 font-mono">{gem.carat.toFixed(2)} ct</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div className="text-[11px] text-slate-500 font-medium">Shape & Cut Style</div>
                <div className="text-sm font-semibold text-slate-900">{gem.cut} Brilliant</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div className="text-[11px] text-slate-500 font-medium">Color Saturation</div>
                <div className="text-sm font-semibold text-slate-900">{gem.color}</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div className="text-[11px] text-slate-500 font-medium">Clarity Grade</div>
                <div className="text-sm font-semibold text-slate-900">{gem.clarity}</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div className="text-[11px] text-slate-500 font-medium">Geographic Origin</div>
                <div className="text-sm font-semibold text-slate-900">{gem.origin}</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 col-span-2 sm:col-span-2">
                <div className="text-[11px] text-slate-500 font-medium">Thermal / Enhancement Treatment</div>
                <div className="text-sm font-bold text-emerald-700 flex items-center gap-1.5 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{gem.treatment}</span>
                </div>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 col-span-2 sm:col-span-1">
                <div className="text-[11px] text-slate-500 font-medium">Dimensions</div>
                <div className="text-xs font-mono font-semibold text-slate-800 mt-1">{gem.dimensions}</div>
              </div>
            </div>
          </div>

          {/* Description & Guarantee */}
          <div className="p-4 bg-amber-50/60 border border-amber-200/80 rounded-xl text-xs text-amber-900/90 leading-relaxed">
            <span className="font-bold text-amber-950">Atelier Authenticity Guarantee: </span>
            This gemstone has been physically inspected by GEMTRAD certified gemologists and cross-referenced with the official {gem.certLab} archives. It is guaranteed natural, conflict-free, and ethically mined under strict ESG standards.
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <div className="text-xs text-slate-500 flex items-center gap-1">
            <span>Official Archive:</span>
            <span className="font-medium text-slate-700">{gem.certLab}.org/verify</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold tracking-wide transition-colors"
          >
            Close Report
          </button>
        </div>
      </div>
    </div>
  );
};
