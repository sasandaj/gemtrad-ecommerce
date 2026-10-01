'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { RotateCw, ZoomIn, ZoomOut, Play, Pause, Sparkles } from 'lucide-react';

interface Gem360ViewerProps {
  color?: string;
  gemName?: string;
  shape?: string;
  className?: string;
}

export const Gem360Viewer: React.FC<Gem360ViewerProps> = ({
  color = '#0854C4',
  gemName = 'Precious Gemstone',
  shape = 'Cushion',
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [angle, setAngle] = useState(0);
  const [isAutoSpin, setIsAutoSpin] = useState(true);
  const [zoom, setZoom] = useState(1);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const angleRef = useRef(0);

  // Sync ref with state
  angleRef.current = angle;

  const hexToRgb = (hex: string) => {
    let cleanHex = hex.replace('#', '');
    if (cleanHex.length === 3) {
      cleanHex = cleanHex.split('').map(c => c + c).join('');
    }
    const num = parseInt(cleanHex, 16);
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255,
    };
  };

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h / 2;

    ctx.clearRect(0, 0, w, h);

    // Ground Contact Shadow
    const shadow = ctx.createRadialGradient(cx, cy + 90 * zoom, 10, cx, cy + 90 * zoom, 110 * zoom);
    shadow.addColorStop(0, 'rgba(15, 23, 42, 0.28)');
    shadow.addColorStop(1, 'rgba(15, 23, 42, 0)');
    ctx.fillStyle = shadow;
    ctx.beginPath();
    ctx.ellipse(cx, cy + 90 * zoom, 115 * zoom, 25 * zoom, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(zoom, zoom);

    const radius = 90;
    const facets = 14;
    const rgb = hexToRgb(color);
    const curAngle = angleRef.current;

    // Draw Pavillion (bottom facets)
    for (let i = 0; i < facets; i++) {
      const a1 = (i / facets) * Math.PI * 2 + curAngle;
      const a2 = ((i + 1) / facets) * Math.PI * 2 + curAngle;

      const x1 = Math.cos(a1) * radius;
      const y1 = Math.sin(a1) * radius * 0.45;
      const x2 = Math.cos(a2) * radius;
      const y2 = Math.sin(a2) * radius * 0.45;

      const light = Math.max(0.12, Math.min(0.85, 0.4 + Math.cos(a1 + 0.5) * 0.4));

      ctx.beginPath();
      ctx.moveTo(0, 65); // culet
      ctx.lineTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.closePath();

      ctx.fillStyle = `rgba(${Math.round(rgb.r * light * 0.8)}, ${Math.round(rgb.g * light * 0.8)}, ${Math.round(rgb.b * light * 0.8)}, 0.95)`;
      ctx.fill();
      ctx.strokeStyle = `rgba(255, 255, 255, 0.18)`;
      ctx.lineWidth = 0.8;
      ctx.stroke();
    }

    // Draw Crown Facets
    for (let i = 0; i < facets; i++) {
      const a1 = (i / facets) * Math.PI * 2 + curAngle;
      const a2 = ((i + 1) / facets) * Math.PI * 2 + curAngle;

      const x1 = Math.cos(a1) * radius;
      const y1 = Math.sin(a1) * radius * 0.45;
      const x2 = Math.cos(a2) * radius;
      const y2 = Math.sin(a2) * radius * 0.45;

      const tx1 = Math.cos(a1) * radius * 0.56;
      const ty1 = Math.sin(a1) * radius * 0.28 - 25;
      const tx2 = Math.cos(a2) * radius * 0.56;
      const ty2 = Math.sin(a2) * radius * 0.28 - 25;

      const light = Math.max(0.2, Math.min(1.0, 0.55 + Math.cos(a1 - 0.7) * 0.45));

      // Kite / upper facet
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(tx1, ty1);
      ctx.lineTo(tx2, ty2);
      ctx.lineTo(x2, y2);
      ctx.closePath();

      ctx.fillStyle = `rgba(${Math.min(255, Math.round(rgb.r * light * 1.3))}, ${Math.min(255, Math.round(rgb.g * light * 1.3))}, ${Math.min(255, Math.round(rgb.b * light * 1.3))}, 0.92)`;
      ctx.fill();
      ctx.strokeStyle = `rgba(255, 255, 255, 0.35)`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Draw Table Facet (top center flat polygon)
    ctx.beginPath();
    for (let i = 0; i < facets; i++) {
      const a = (i / facets) * Math.PI * 2 + curAngle;
      const tx = Math.cos(a) * radius * 0.56;
      const ty = Math.sin(a) * radius * 0.28 - 25;
      if (i === 0) ctx.moveTo(tx, ty);
      else ctx.lineTo(tx, ty);
    }
    ctx.closePath();

    // Table Gradient reflection
    const tableGrad = ctx.createLinearGradient(-30, -50, 40, 10);
    tableGrad.addColorStop(0, `rgba(${Math.min(255, rgb.r + 70)}, ${Math.min(255, rgb.g + 70)}, ${Math.min(255, rgb.b + 70)}, 0.95)`);
    tableGrad.addColorStop(0.5, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.88)`);
    tableGrad.addColorStop(1, `rgba(${Math.round(rgb.r * 0.7)}, ${Math.round(rgb.g * 0.7)}, ${Math.round(rgb.b * 0.7)}, 0.95)`);
    ctx.fillStyle = tableGrad;
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // Specular Glint
    const glintX = Math.cos(curAngle + 1.2) * radius * 0.3;
    const glintY = Math.sin(curAngle + 1.2) * radius * 0.15 - 25;
    const sparkleGrad = ctx.createRadialGradient(glintX, glintY, 1, glintX, glintY, 22);
    sparkleGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
    sparkleGrad.addColorStop(0.3, 'rgba(255, 255, 255, 0.45)');
    sparkleGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = sparkleGrad;
    ctx.beginPath();
    ctx.arc(glintX, glintY, 22, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }, [color, zoom]);

  useEffect(() => {
    draw();
  }, [draw]);

  useEffect(() => {
    if (!isAutoSpin) return;
    const interval = setInterval(() => {
      setAngle(prev => (prev + 0.012) % (Math.PI * 2));
    }, 28);
    return () => clearInterval(interval);
  }, [isAutoSpin]);

  // Touch and Mouse handlers
  const handlePointerDown = (clientX: number) => {
    setIsAutoSpin(false);
    isDraggingRef.current = true;
    startXRef.current = clientX;
  };

  const handlePointerMove = (clientX: number) => {
    if (!isDraggingRef.current) return;
    const delta = clientX - startXRef.current;
    setAngle(prev => (prev + delta * 0.015) % (Math.PI * 2));
    startXRef.current = clientX;
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <div className={`relative bg-gradient-to-b from-slate-900 via-slate-800 to-slate-950 rounded-2xl overflow-hidden border border-slate-700/60 shadow-2xl flex flex-col items-center justify-center p-4 ${className}`}>
      {/* Top badges */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
        <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-700/60 text-xs font-medium text-slate-200">
          <RotateCw className="w-3.5 h-3.5 text-blue-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span>360° Rotational Specular Engine</span>
        </div>
        <div className="bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-700/60 text-xs font-semibold text-amber-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{shape} Cut Refraction</span>
        </div>
      </div>

      {/* Main Canvas */}
      <div
        className="w-full flex items-center justify-center cursor-grab active:cursor-grabbing select-none py-6"
        onMouseDown={e => handlePointerDown(e.clientX)}
        onMouseMove={e => handlePointerMove(e.clientX)}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerUp}
        onTouchStart={e => {
          if (e.touches.length === 1) handlePointerDown(e.touches[0].clientX);
        }}
        onTouchMove={e => {
          if (e.touches.length === 1) handlePointerMove(e.touches[0].clientX);
        }}
        onTouchEnd={handlePointerUp}
      >
        <canvas
          ref={canvasRef}
          width={400}
          height={320}
          aria-label={`360 interactive view for ${gemName}`}
          className="max-w-full drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)]"
        />
      </div>

      {/* Control bar */}
      <div className="flex items-center justify-between w-full max-w-sm px-4 py-2 bg-slate-900/90 backdrop-blur-md rounded-xl border border-slate-700/70 text-slate-300 text-xs">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsAutoSpin(!isAutoSpin)}
            className="p-1.5 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5 text-slate-200"
            title={isAutoSpin ? 'Pause Rotation' : 'Auto Rotate'}
          >
            {isAutoSpin ? <Pause className="w-4 h-4 text-blue-400" /> : <Play className="w-4 h-4 text-emerald-400" />}
            <span className="hidden sm:inline">{isAutoSpin ? 'Auto' : 'Play'}</span>
          </button>
        </div>

        <div className="text-slate-400 text-[11px] font-medium tracking-wide">
          Drag horizontally to inspect facets
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setZoom(z => Math.max(0.7, z - 0.15))}
            className="p-1.5 hover:bg-slate-800 rounded-lg transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-[11px] font-mono w-9 text-center">{Math.round(zoom * 100)}%</span>
          <button
            onClick={() => setZoom(z => Math.min(1.6, z + 0.15))}
            className="p-1.5 hover:bg-slate-800 rounded-lg transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
