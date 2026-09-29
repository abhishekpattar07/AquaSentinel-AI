import React, { useState, useEffect } from 'react';
import {
  Radio,
  Sliders,
  Send,
  Presentation,
  Fish,
  AlertOctagon,
  Trash2,
  Biohazard,
  Play,
  VolumeX,
  FileText,
  Table,
  Filter,
  Activity,
  Sparkles,
  BarChart3,
  Clock,
  Compass,
  Thermometer,
  Droplets,
  BatteryCharging,
} from 'lucide-react';
import type { Scenario, BoundingBox, DebrisCategory, EventLog, CumulativeStats } from '../types';
import { SCENARIOS } from '../services/sampleVideoGenerator';

interface Props {
  currentScenario: Scenario;
  onSelectScenario: (scenario: Scenario) => void;
  bboxes: BoundingBox[];
  isScanning: boolean;
  onTriggerScan: () => void;
  onOpenROVModal: () => void;
  onOpenPitchDeck: () => void;
  confidenceThreshold: number;
  onConfidenceChange: (val: number) => void;
  activeCategories: DebrisCategory[];
  onToggleCategory: (cat: DebrisCategory) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  eventLogs: EventLog[];
  cumulativeStats: CumulativeStats;
  onExportCSV: () => void;
  onExportReport: () => void;
}

export const MarineHUD: React.FC<Props> = ({
  currentScenario,
  onSelectScenario,
  bboxes,
  isScanning,
  onTriggerScan,
  onOpenROVModal,
  onOpenPitchDeck,
  confidenceThreshold,
  onConfidenceChange,
  activeCategories,
  onToggleCategory,
  soundEnabled,
  onToggleSound,
  eventLogs,
  cumulativeStats,
  onExportCSV,
  onExportReport,
}) => {
  const [telemetryTime, setTelemetryTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTelemetryTime(now.toTimeString().split(' ')[0] + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Filter active boxes based on confidence & category
  const filteredBoxes = bboxes.filter(
    b => b.confidence >= confidenceThreshold && activeCategories.includes(b.category)
  );

  const ghostNets = filteredBoxes.filter(b => b.category === 'ghost_net').length;
  const plastics = filteredBoxes.filter(b => b.category === 'plastic' || b.category === 'metal_debris').length;
  const toxics = filteredBoxes.filter(b => b.category === 'toxic_drum').length;
  const marineLife = filteredBoxes.filter(b => b.category === 'marine_life').length;

  // Marine Pollution Index calculation
  let mpiScore = (ghostNets * 35) + (toxics * 45) + (plastics * 15);
  mpiScore = Math.min(100, Math.max(12, mpiScore));

  const getMpiColor = () => {
    if (mpiScore >= 70) return { text: 'text-red-400', stroke: '#FF3366', bg: 'bg-red-950/40', label: 'CRITICAL HAZARD' };
    if (mpiScore >= 40) return { text: 'text-yellow-400', stroke: '#FFB800', bg: 'bg-yellow-950/40', label: 'MODERATE POLLUTION' };
    return { text: 'text-emerald-400', stroke: '#00E699', bg: 'bg-emerald-950/40', label: 'ECOLOGICAL NORMAL' };
  };

  const mpiTheme = getMpiColor();

  const categoriesList: { id: DebrisCategory; label: string; icon: React.ReactNode; color: string; count: number }[] = [
    { id: 'ghost_net', label: 'Ghost Nets', icon: <AlertOctagon className="w-3.5 h-3.5" />, color: '#FF3366', count: ghostNets },
    { id: 'plastic', label: 'Plastics', icon: <Trash2 className="w-3.5 h-3.5" />, color: '#FFB800', count: plastics },
    { id: 'toxic_drum', label: 'Toxics', icon: <Biohazard className="w-3.5 h-3.5" />, color: '#FF3366', count: toxics },
    { id: 'marine_life', label: 'Fauna', icon: <Fish className="w-3.5 h-3.5" />, color: '#00E699', count: marineLife },
  ];

  return (
    <div className="flex flex-col gap-3.5 w-full">
      {/* Tactical Telemetry Strip */}
      <div className="glass-card px-3.5 py-2 rounded-xl flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-slate-300">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-cyan-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            SYS-ONLINE
          </span>
          <span className="text-slate-400 flex items-center gap-1">
            <Clock className="w-3 h-3 text-slate-400" />
            {telemetryTime || '12:00:00 UTC'}
          </span>
          <span className="hidden sm:flex items-center gap-1 text-slate-400">
            <Compass className="w-3 h-3 text-cyan-400" />
            25.204° N, 55.271° E
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-slate-300">
            <Droplets className="w-3 h-3 text-cyan-400" />
            DEPTH: <strong className="text-white">-{currentScenario.depthMeters}m</strong>
          </span>
          <span className="hidden md:flex items-center gap-1 text-slate-300">
            <Thermometer className="w-3 h-3 text-teal-400" />
            22.4°C
          </span>
          <span className="hidden md:flex items-center gap-1 text-emerald-400">
            <BatteryCharging className="w-3 h-3" />
            88%
          </span>
        </div>
      </div>

      {/* Top Action Bar: Pitch Deck, Equalizer/Sound, Export, Dispatch */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenPitchDeck}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 border border-cyan-400/40 hover:border-cyan-400 rounded-xl text-xs font-bold font-hud text-cyan-300 transition shadow-lg shadow-cyan-500/10 cursor-pointer"
          >
            <Presentation className="w-3.5 h-3.5 text-cyan-400" />
            <span>PITCH DECK</span>
          </button>

          {/* Sound toggle with animated audio waveform equalizer */}
          <button
            onClick={onToggleSound}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono transition cursor-pointer ${
              soundEnabled
                ? 'bg-cyan-950/80 border-cyan-400 text-cyan-300 shadow-sm'
                : 'bg-ocean-900 border-ocean-700 text-slate-400'
            }`}
            title="Toggle Sonar Audio Feedback"
          >
            {soundEnabled ? (
              <div className="flex items-end gap-0.5 h-3.5 w-3.5">
                <span className="w-0.5 bg-cyan-400 rounded-full eq-bar-1" />
                <span className="w-0.5 bg-cyan-400 rounded-full eq-bar-2" />
                <span className="w-0.5 bg-cyan-400 rounded-full eq-bar-3" />
                <span className="w-0.5 bg-cyan-400 rounded-full eq-bar-4" />
                <span className="w-0.5 bg-cyan-400 rounded-full eq-bar-5" />
              </div>
            ) : (
              <VolumeX className="w-3.5 h-3.5" />
            )}
            <span>{soundEnabled ? '120 kHz ACTIVE' : 'AUDIO MUTED'}</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onExportReport}
            className="p-2 bg-ocean-900/90 hover:bg-ocean-800 border border-ocean-700 hover:border-cyan-400/50 rounded-xl text-slate-300 hover:text-white transition cursor-pointer"
            title="Print / Export Environmental Survey Report (PDF)"
          >
            <FileText className="w-4 h-4 text-cyan-400" />
          </button>

          <button
            onClick={onExportCSV}
            className="p-2 bg-ocean-900/90 hover:bg-ocean-800 border border-ocean-700 hover:border-emerald-400/50 rounded-xl text-slate-300 hover:text-white transition cursor-pointer"
            title="Export CSV Telemetry"
          >
            <Table className="w-4 h-4 text-emerald-400" />
          </button>

          <button
            onClick={onOpenROVModal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 hover:from-emerald-500/30 border border-emerald-400/50 hover:border-emerald-400 rounded-xl text-xs font-bold font-hud text-emerald-300 transition shadow-lg shadow-emerald-500/10 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5 text-emerald-400" />
            <span>DISPATCH AUV</span>
          </button>
        </div>
      </div>

      {/* Scenario Selector Tabs */}
      <div className="glass-card rounded-2xl p-3 shadow-xl">
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-xs font-hud text-cyan-400 font-bold flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5" /> SELECT UNDERWATER TEST SCENARIO
          </span>
          <span className="text-[10px] text-slate-400 font-mono">1-Click Live Test</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {SCENARIOS.map(s => {
            const isSelected = currentScenario.id === s.id;
            return (
              <button
                key={s.id}
                onClick={() => onSelectScenario(s)}
                className={`p-2.5 rounded-xl border text-left transition flex flex-col justify-between min-h-[64px] cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-950/70 border-cyan-400 text-white shadow-md shadow-cyan-500/20'
                    : 'bg-ocean-950/60 border-ocean-800/80 text-slate-400 hover:border-ocean-700 hover:text-slate-200'
                }`}
              >
                <div className="text-xs font-bold leading-snug line-clamp-1">
                  {s.title}
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mt-1">
                  <span>-{s.depthMeters}m</span>
                  <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${
                    s.expectedThreat === 'critical' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {s.expectedThreat}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Scan Trigger Button */}
      <button
        onClick={onTriggerScan}
        disabled={isScanning}
        className={`w-full py-3.5 px-6 rounded-2xl font-hud font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all transform active:scale-95 shadow-xl cursor-pointer ${
          isScanning
            ? 'bg-cyan-600 text-black animate-pulse cursor-wait'
            : 'bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-black shadow-cyan-400/25'
        }`}
      >
        {isScanning ? (
          <>
            <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
            <span>ANALYZING SPECTRAL ACOUSTICS...</span>
          </>
        ) : (
          <>
            <Play className="w-5 h-5 fill-black" />
            <span>TRIGGER AUV NEURAL FRAME SCAN</span>
          </>
        )}
      </button>

      {/* Model Parameter Controls: Confidence Slider & Class Filter Chips */}
      <div className="p-3.5 glass-card rounded-2xl space-y-2.5 shadow-lg">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="flex items-center gap-1 text-slate-300">
            <Filter className="w-3.5 h-3.5 text-cyan-400" />
            <span>Confidence Threshold:</span>
          </span>
          <span className="font-bold text-cyan-300 px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-400/30">
            {Math.round(confidenceThreshold * 100)}%
          </span>
        </div>

        <input
          type="range"
          min="0.50"
          max="0.95"
          step="0.05"
          value={confidenceThreshold}
          onChange={(e) => onConfidenceChange(parseFloat(e.target.value))}
          className="w-full h-1.5 rounded-lg appearance-none cursor-pointer"
        />

        {/* Class Filter Chips */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {categoriesList.map(cat => {
            const isActive = activeCategories.includes(cat.id);
            return (
              <button
                key={cat.id}
                onClick={() => onToggleCategory(cat.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono transition border cursor-pointer ${
                  isActive
                    ? 'bg-ocean-950 text-white border-cyan-400/80 shadow-sm'
                    : 'bg-ocean-950/40 text-slate-500 border-ocean-800 line-through opacity-60'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
                {isActive && (
                  <span className="ml-0.5 px-1 py-0.2 rounded bg-cyan-500/20 text-cyan-300 font-bold text-[10px]">
                    {cat.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sonar Radar & Radial Marine Pollution Index (MPI) Container */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
        {/* Sonar Radar View */}
        <div className="sm:col-span-5 glass-card rounded-2xl p-3 flex flex-col items-center justify-center relative overflow-hidden shadow-xl">
          <div className="text-[11px] font-hud text-slate-400 font-bold mb-2 flex items-center justify-between w-full px-1">
            <span className="flex items-center gap-1">
              <Radio className="w-3.5 h-3.5 text-cyan-400" />
              <span>120 kHz SONAR</span>
            </span>
            <span className="text-[9px] font-mono text-cyan-300 bg-cyan-950/80 px-1.5 py-0.5 rounded border border-cyan-400/30">
              50m SWEEP
            </span>
          </div>

          {/* Radar Circular Display */}
          <div className="relative w-32 h-32 rounded-full border border-cyan-500/30 bg-ocean-950 flex items-center justify-center shadow-inner">
            <div className="absolute w-24 h-24 rounded-full border border-cyan-500/20"></div>
            <div className="absolute w-14 h-14 rounded-full border border-cyan-500/20"></div>
            <div className="absolute w-full h-px bg-cyan-500/20"></div>
            <div className="absolute h-full w-px bg-cyan-500/20"></div>

            {/* Sweeping beam */}
            <div className="absolute inset-0 rounded-full sonar-sweep overflow-hidden pointer-events-none">
              <div className="w-1/2 h-1/2 bg-gradient-to-br from-cyan-400/40 to-transparent origin-bottom-right"></div>
            </div>

            {/* Detected Blips */}
            {ghostNets > 0 && <div className="absolute top-7 left-9 w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></div>}
            {toxics > 0 && <div className="absolute bottom-8 right-7 w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></div>}
            {plastics > 0 && <div className="absolute top-14 right-8 w-2 h-2 rounded-full bg-yellow-400"></div>}
            {marineLife > 0 && <div className="absolute bottom-9 left-10 w-2 h-2 rounded-full bg-emerald-400"></div>}
          </div>

          <div className="mt-2 text-[10px] font-mono text-slate-400 flex items-center gap-2">
            <span>PING: <strong className="text-cyan-400">120.4 kHz</strong></span>
            <span>BEARING: <strong className="text-white">142° SE</strong></span>
          </div>
        </div>

        {/* Marine Pollution Index & Metrics */}
        <div className="sm:col-span-7 glass-card rounded-2xl p-3.5 flex flex-col justify-between shadow-xl">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-hud text-slate-400 font-bold">
              POLLUTION INDEX (MPI)
            </span>
            <span className={`px-2 py-0.5 rounded-full border text-xs font-hud font-bold ${mpiTheme.text} ${mpiTheme.bg} border-current`}>
              {mpiScore} / 100
            </span>
          </div>

          {/* Progress Bar with glow */}
          <div className="w-full h-2 bg-ocean-950 rounded-full overflow-hidden border border-ocean-800 mb-2.5">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                mpiScore >= 70 ? 'bg-red-500 shadow-sm shadow-red-500' : mpiScore >= 40 ? 'bg-yellow-400' : 'bg-emerald-400'
              }`}
              style={{ width: `${mpiScore}%` }}
            />
          </div>

          {/* 4 Counter Badges */}
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 bg-ocean-950/80 rounded-xl border border-red-500/25 flex items-center gap-2">
              <AlertOctagon className="w-4 h-4 text-red-400 shrink-0" />
              <div>
                <div className="text-[9px] text-slate-400 font-mono">GHOST NETS</div>
                <div className="text-xs font-hud font-bold text-red-400">{ghostNets}</div>
              </div>
            </div>

            <div className="p-2 bg-ocean-950/80 rounded-xl border border-yellow-500/25 flex items-center gap-2">
              <Trash2 className="w-4 h-4 text-yellow-400 shrink-0" />
              <div>
                <div className="text-[9px] text-slate-400 font-mono">PLASTICS</div>
                <div className="text-xs font-hud font-bold text-yellow-400">{plastics}</div>
              </div>
            </div>

            <div className="p-2 bg-ocean-950/80 rounded-xl border border-red-500/25 flex items-center gap-2">
              <Biohazard className="w-4 h-4 text-red-400 shrink-0" />
              <div>
                <div className="text-[9px] text-slate-400 font-mono">CHEMICAL/TOXIC</div>
                <div className="text-xs font-hud font-bold text-red-400">{toxics}</div>
              </div>
            </div>

            <div className="p-2 bg-ocean-950/80 rounded-xl border border-emerald-500/25 flex items-center gap-2">
              <Fish className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <div className="text-[9px] text-slate-400 font-mono">PROTECTED FAUNA</div>
                <div className="text-xs font-hud font-bold text-emerald-400">{marineLife}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gemini AI Natural Language Narrative Report */}
      <div className="p-3.5 glass-card rounded-2xl shadow-xl space-y-1.5 border border-cyan-400/30">
        <div className="flex items-center gap-1.5 text-cyan-400 font-hud text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI OCEANOGRAPHIC MISSION BRIEFING</span>
        </div>
        <p className="text-xs text-slate-300 font-mono leading-relaxed bg-ocean-950/90 p-3 rounded-xl border border-ocean-800">
          {currentScenario.narrativeReport}
        </p>
      </div>

      {/* Cumulative Environmental Impact Stats Panel */}
      <div className="p-3.5 glass-card rounded-2xl space-y-2 shadow-xl">
        <div className="flex items-center gap-1.5 text-xs font-hud text-slate-300 font-bold">
          <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
          <span>CUMULATIVE EXPEDITION METRICS</span>
        </div>

        <div className="grid grid-cols-4 gap-2 text-center font-mono">
          <div className="p-2.5 bg-ocean-950/90 rounded-xl border border-ocean-800">
            <div className="text-sm font-bold text-cyan-300">{cumulativeStats.totalScans}</div>
            <div className="text-[9px] text-slate-400">SCANS</div>
          </div>
          <div className="p-2.5 bg-ocean-950/90 rounded-xl border border-ocean-800">
            <div className="text-sm font-bold text-yellow-300">{cumulativeStats.totalDebrisCount}</div>
            <div className="text-[9px] text-slate-400">DEBRIS</div>
          </div>
          <div className="p-2.5 bg-ocean-950/90 rounded-xl border border-ocean-800">
            <div className="text-sm font-bold text-red-400">~{cumulativeStats.totalMassKg.toFixed(0)} kg</div>
            <div className="text-[9px] text-slate-400">MASS</div>
          </div>
          <div className="p-2.5 bg-ocean-950/90 rounded-xl border border-ocean-800">
            <div className="text-sm font-bold text-emerald-400">{cumulativeStats.protectedSpeciesCount}</div>
            <div className="text-[9px] text-slate-400">SPECIES</div>
          </div>
        </div>
      </div>

      {/* Live Detection Event Log / Ticker */}
      <div className="p-3.5 glass-card rounded-2xl space-y-2 shadow-xl">
        <div className="flex items-center justify-between text-xs font-hud text-slate-300 font-bold">
          <span className="flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span>MISSION EVENT LOG</span>
          </span>
          <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
            <Clock className="w-3 h-3 text-cyan-400" /> Live Ticker
          </span>
        </div>

        <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
          {eventLogs.map((log) => (
            <div
              key={log.id}
              className="flex items-center justify-between p-2 bg-ocean-950/70 border border-ocean-800/80 rounded-xl text-[11px] font-mono hover:border-cyan-500/30 transition"
            >
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${
                  log.threatLevel === 'critical' ? 'bg-red-400 animate-pulse' : 'bg-cyan-400'
                }`} />
                <span className="text-slate-300">{log.message}</span>
              </div>
              <span className="text-slate-500 text-[10px]">{log.timestamp}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
