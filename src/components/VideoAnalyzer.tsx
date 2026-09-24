import React, { useRef, useEffect, useState, useImperativeHandle, forwardRef, useCallback } from 'react';
import { Camera, Upload, AlertTriangle, ShieldCheck, Compass, Sparkles, SlidersHorizontal } from 'lucide-react';
import type { BoundingBox, Scenario, DebrisCategory } from '../types';
import { renderUnderwaterFrame } from '../services/sampleVideoGenerator';
import { applySplitDehazing } from '../services/dehazeFilter';

export interface VideoAnalyzerRef {
  captureFrame: () => string | null;
}

interface Props {
  currentScenario: Scenario;
  bboxes: BoundingBox[];
  isScanning: boolean;
  splitRatio: number;
  onSplitRatioChange: (ratio: number) => void;
  confidenceThreshold: number;
  activeCategories: DebrisCategory[];
}

export const VideoAnalyzer = forwardRef<VideoAnalyzerRef, Props>(({
  currentScenario,
  bboxes,
  isScanning,
  splitRatio,
  onSplitRatioChange,
  confidenceThreshold,
  activeCategories,
}, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const simCanvasRef = useRef<HTMLCanvasElement>(null);
  const displayCanvasRef = useRef<HTMLCanvasElement>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [useLiveCamera, setUseLiveCamera] = useState(false);
  const [customVideoUrl, setCustomVideoUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Filter bboxes based on confidence and selected categories
  const filteredBboxes = bboxes.filter(
    b => b.confidence >= confidenceThreshold && activeCategories.includes(b.category)
  );

  // Animation loop for simulation & split dehazing
  useEffect(() => {
    if (useLiveCamera || customVideoUrl) return;

    let animId: number;
    const startTime = performance.now();

    const render = () => {
      const simCanvas = simCanvasRef.current;
      const displayCanvas = displayCanvasRef.current;

      if (simCanvas && displayCanvas) {
        const ctx = simCanvas.getContext('2d');
        if (ctx) {
          const elapsed = (performance.now() - startTime) / 1000;
          renderUnderwaterFrame(ctx, simCanvas.width, simCanvas.height, currentScenario.id, elapsed);

          // Apply side-by-side split dehazing in real-time
          applySplitDehazing(simCanvas, displayCanvas, splitRatio, 0.92);
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [currentScenario.id, splitRatio, useLiveCamera, customVideoUrl]);

  // Overlay bounding boxes & tactical telemetry
  useEffect(() => {
    const canvas = overlayCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw tactical grid crosshairs
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.2)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx - 24, cy); ctx.lineTo(cx + 24, cy);
    ctx.moveTo(cx, cy - 24); ctx.lineTo(cx, cy + 24);
    ctx.stroke();

    // Draw Filtered Bounding Boxes
    filteredBboxes.forEach(box => {
      const bx = box.x * canvas.width;
      const by = box.y * canvas.height;
      const bw = box.width * canvas.width;
      const bh = box.height * canvas.height;

      let color = box.color || '#00E699';
      if (box.threatLevel === 'critical') color = '#FF3366';
      else if (box.threatLevel === 'moderate') color = '#FFB800';

      ctx.save();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.strokeRect(bx, by, bw, bh);

      // Semi-transparent fill
      ctx.fillStyle = `${color}22`;
      ctx.fillRect(bx, by, bw, bh);

      // Tactical corner brackets
      const corner = 14;
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.moveTo(bx, by + corner); ctx.lineTo(bx, by); ctx.lineTo(bx + corner, by);
      ctx.moveTo(bx + bw - corner, by); ctx.lineTo(bx + bw, by); ctx.lineTo(bx + bw, by + corner);
      ctx.moveTo(bx, by + bh - corner); ctx.lineTo(bx, by + bh); ctx.lineTo(bx + corner, by + bh);
      ctx.moveTo(bx + bw - corner, by + bh); ctx.lineTo(bx + bw, by + bh); ctx.lineTo(bx + bw, by + bh - corner);
      ctx.stroke();

      // Label background
      ctx.fillStyle = color;
      ctx.font = 'bold 12px Orbitron, monospace';
      const labelText = `${box.label} [${Math.round(box.confidence * 100)}%]`;
      const textMetrics = ctx.measureText(labelText);
      ctx.fillRect(bx, Math.max(0, by - 24), textMetrics.width + 14, 24);

      // Label text
      ctx.fillStyle = '#000000';
      ctx.fillText(labelText, bx + 7, Math.max(16, by - 7));

      // Weight estimate tag
      if (box.estimatedWeightKg) {
        ctx.fillStyle = 'rgba(2, 11, 20, 0.85)';
        ctx.fillRect(bx, by + bh + 4, 115, 20);
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.strokeRect(bx, by + bh + 4, 115, 20);
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 10px Inter, sans-serif';
        ctx.fillText(`MASS: ~${box.estimatedWeightKg} kg`, bx + 8, by + bh + 18);
      }

      ctx.restore();
    });
  }, [filteredBboxes]);

  // Handle Dragging Split-Slider with Mouse/Touch
  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const ratio = Math.max(0.05, Math.min(0.95, (clientX - rect.left) / rect.width));
    onSplitRatioChange(ratio);
  }, [onSplitRatioChange]);

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleMove(e.clientX);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (isDragging) handleMove(e.clientX);
  };

  const onMouseUp = () => setIsDragging(false);

  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) handleMove(e.touches[0].clientX);
  };

  // Expose captureFrame to parent
  useImperativeHandle(ref, () => ({
    captureFrame: () => {
      const target = displayCanvasRef.current || simCanvasRef.current;
      if (!target) return null;
      return target.toDataURL('image/jpeg', 0.88);
    },
  }));

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setCustomVideoUrl(url);
    setUseLiveCamera(false);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      {/* Video / Canvas Container with Interactive Split Drag */}
      <div
        ref={containerRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchMove={onTouchMove}
        className="relative w-full aspect-[4/3] sm:aspect-video rounded-2xl overflow-hidden bg-ocean-950 border-2 border-ocean-700/60 shadow-2xl select-none cursor-ew-resize"
      >
        {/* Hidden Simulation Canvas (Raw source) */}
        <canvas ref={simCanvasRef} width={800} height={450} className="hidden" />

        {/* Display Canvas with Before/After Split Render */}
        {useLiveCamera ? (
          <video ref={videoRef} playsInline muted autoPlay className="w-full h-full object-cover" />
        ) : customVideoUrl ? (
          <video src={customVideoUrl} playsInline autoPlay loop muted className="w-full h-full object-cover" />
        ) : (
          <canvas ref={displayCanvasRef} width={800} height={450} className="w-full h-full object-cover" />
        )}

        {/* Bounding Boxes Tactical Overlay */}
        <canvas
          ref={overlayCanvasRef}
          width={800}
          height={450}
          className="absolute inset-0 w-full h-full pointer-events-none"
        />

        {/* Top Left Telemetry HUD */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 font-hud text-xs pointer-events-none">
          <div className="flex items-center gap-2 bg-ocean-950/85 backdrop-blur px-3 py-1.5 rounded-lg border border-ocean-700/60 text-cyan-300">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span>AUV CAM-01 • {currentScenario.location}</span>
          </div>

          <div className="flex items-center gap-3 bg-ocean-950/80 backdrop-blur px-3 py-1 rounded border border-ocean-800 text-[11px] text-slate-400 font-mono">
            <span>DEPTH: <strong className="text-white">{currentScenario.depthMeters} m</strong></span>
            <span>TURBIDITY: <strong className="text-yellow-400">{currentScenario.turbidityPct}%</strong></span>
            <span>TEMP: <strong className="text-cyan-400">{currentScenario.tempCelsius}°C</strong></span>
          </div>
        </div>

        {/* Top Right Split Percentage Badge */}
        <div className="absolute top-3 right-3 flex items-center gap-2 pointer-events-none">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-ocean-950/85 backdrop-blur border border-cyan-400/50 text-cyan-300 font-hud text-xs font-bold shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>SPLIT: {Math.round(splitRatio * 100)}%</span>
          </div>
        </div>

        {/* Threat Alert Banner if Critical */}
        {currentScenario.expectedThreat === 'critical' && (
          <div className="absolute top-12 inset-x-0 mx-auto w-max bg-red-600/90 text-white font-hud text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-2 animate-bounce border border-red-400 shadow-lg pointer-events-none">
            <AlertTriangle className="w-4 h-4" />
            <span>CRITICAL MARINE HAZARD DETECTED</span>
          </div>
        )}

        {/* Scanning Radar HUD Pulse */}
        {isScanning && (
          <div className="absolute inset-0 border-2 border-cyan-400/40 pointer-events-none flex items-center justify-center">
            <div className="w-64 h-64 rounded-full border border-cyan-400/30 animate-ping opacity-30"></div>
            <div className="absolute bottom-14 bg-ocean-950/90 border border-cyan-400 text-cyan-400 px-4 py-1.5 rounded-full text-xs font-hud font-bold tracking-widest">
              NEURAL SCAN IN PROGRESS...
            </div>
          </div>
        )}

        {/* Bottom Controls Bar */}
        <div className="absolute bottom-3 inset-x-3 flex items-center justify-between pointer-events-auto">
          <div className="flex items-center gap-2 bg-ocean-950/85 backdrop-blur px-3 py-1.5 rounded-lg border border-ocean-800 text-xs text-slate-300 font-mono">
            <Compass className="w-4 h-4 text-cyan-400" />
            <span>GPS: {currentScenario.coordinates}</span>
          </div>

          <div className="flex items-center gap-2">
            {customVideoUrl && (
              <button
                onClick={() => setCustomVideoUrl(null)}
                className="px-3 py-1 bg-cyan-400 text-black font-semibold rounded-lg text-xs hover:bg-cyan-300 transition font-mono"
              >
                Reset
              </button>
            )}

            <label
              className="p-2 bg-ocean-900/85 backdrop-blur text-slate-300 hover:text-white rounded-lg border border-ocean-700 hover:border-cyan-400 transition cursor-pointer"
              title="Upload Custom Video / Image"
            >
              <Upload className="w-4 h-4" />
              <input type="file" accept="video/*,image/*" className="hidden" onChange={handleFileUpload} />
            </label>

            <button
              onClick={() => setUseLiveCamera(c => !c)}
              className={`p-2 rounded-lg border transition ${
                useLiveCamera
                  ? 'bg-emerald-600 text-white border-emerald-400'
                  : 'bg-ocean-900/85 text-slate-300 hover:text-white border-ocean-700'
              }`}
              title="Toggle Live Webcam / USB Underwater Cam"
            >
              {useLiveCamera ? <ShieldCheck className="w-4 h-4" /> : <Camera className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Split-Slider Quick Presets & Guidance Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-ocean-900/80 border border-ocean-800 rounded-xl text-xs font-mono text-slate-300">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
          <span className="text-slate-400">Drag video or select view:</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onSplitRatioChange(0.98)}
            className={`px-2.5 py-1 rounded text-[11px] font-bold transition ${
              splitRatio > 0.85
                ? 'bg-slate-700 text-white border border-slate-500'
                : 'bg-ocean-950 text-slate-400 hover:text-white'
            }`}
          >
            100% RAW
          </button>
          <button
            onClick={() => onSplitRatioChange(0.5)}
            className={`px-2.5 py-1 rounded text-[11px] font-bold transition ${
              splitRatio >= 0.4 && splitRatio <= 0.6
                ? 'bg-cyan-500 text-black border border-cyan-300'
                : 'bg-ocean-950 text-slate-400 hover:text-white'
            }`}
          >
            50/50 SPLIT
          </button>
          <button
            onClick={() => onSplitRatioChange(0.02)}
            className={`px-2.5 py-1 rounded text-[11px] font-bold transition ${
              splitRatio < 0.15
                ? 'bg-cyan-400 text-black border border-cyan-300'
                : 'bg-ocean-950 text-slate-400 hover:text-white'
            }`}
          >
            100% DEHAZED
          </button>
        </div>
      </div>
    </div>
  );
});
