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
    if (mpiScore >= 70) return { text: 'text-red-700', stroke: '#DC2626', bg: 'bg-red-50', border: 'border-red-200', label: 'CRITICAL HAZARD' };
    if (mpiScore >= 40) return { text: 'text-amber-700', stroke: '#D97706', bg: 'bg-amber-50', border: 'border-amber-200', label: 'MODERATE POLLUTION' };
    return { text: 'text-emerald-700', stroke: '#059669', bg: 'bg-emerald-50', border: 'border-emerald-200', label: 'ECOLOGICAL NORMAL' };
  };

  const mpiTheme = getMpiColor();

  const categoriesList: { id: DebrisCategory; label: string; icon: React.ReactNode; color: string; count: number }[] = [
    { id: 'ghost_net', label: 'Ghost Nets', icon: <AlertOctagon className="w-3.5 h-3.5 text-red-600" />, color: '#DC2626', count: ghostNets },
    { id: 'plastic', label: 'Plastics', icon: <Trash2 className="w-3.5 h-3.5 text-amber-600" />, color: '#D97706', count: plastics },
    { id: 'toxic_drum', label: 'Toxics', icon: <Biohazard className="w-3.5 h-3.5 text-rose-600" />, color: '#E11D48', count: toxics },
    { id: 'marine_life', label: 'Fauna', icon: <Fish className="w-3.5 h-3.5 text-emerald-600" />, color: '#059669', count: marineLife },
  ];

  return (
    <div className="flex flex-col gap-3.5 w-full">
      {/* Tactical Telemetry Strip */}
      <div className="bg-white border border-slate-200 px-4 py-2.5 rounded-xl flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-700 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            SYS-ONLINE
          </span>
          <span className="text-slate-500 flex items-center gap-1">
            <Clock className="w-3 h-3 text-slate-400" />
            {telemetryTime || '12:00:00 UTC'}
          </span>
          <span className="hidden sm:flex items-center gap-1 text-slate-500">
            <Compass className="w-3 h-3 text-sky-600" />
            25.204° N, 55.271° E
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-slate-700">
            <Droplets className="w-3 h-3 text-sky-600" />
            DEPTH: <strong className="text-slate-900">-{currentScenario.depthMeters}m</strong>
          </span>
          <span className="hidden md:flex items-center gap-1 text-slate-600">
            <Thermometer className="w-3 h-3 text-teal-600" />
            22.4°C
          </span>
          <span className="hidden md:flex items-center gap-1 text-emerald-700 font-semibold">
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
            className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-50 hover:bg-sky-100 border border-sky-300 rounded-xl text-xs font-hud font-bold text-sky-800 transition shadow-sm cursor-pointer"
          >
            <Presentation className="w-3.5 h-3.5 text-sky-600" />
            <span>PITCH DECK</span>
          </button>

          {/* Sound toggle with animated audio waveform equalizer */}
          <button
            onClick={onToggleSound}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono transition cursor-pointer shadow-sm ${
              soundEnabled
                ? 'bg-sky-50 border-sky-300 text-sky-800 font-semibold'
                : 'bg-slate-100 border-slate-300 text-slate-500'
            }`}
            title="Toggle Sonar Audio Feedback"
          >
            {soundEnabled ? (
              <div className="flex items-end gap-0.5 h-3.5 w-3.5">
                <span className="w-0.5 bg-sky-600 rounded-full eq-bar-1" />
                <span className="w-0.5 bg-sky-600 rounded-full eq-bar-2" />
                <span className="w-0.5 bg-sky-600 rounded-full eq-bar-3" />
                <span className="w-0.5 bg-sky-600 rounded-full eq-bar-4" />
                <span className="w-0.5 bg-sky-600 rounded-full eq-bar-5" />
              </div>
            ) : (
              <VolumeX className="w-3.5 h-3.5" />
            )}
            <span>{soundEnabled ? '120 kHz ACTIVE' : 'MUTED'}</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onExportReport}
            className="p-2 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl text-slate-700 transition cursor-pointer shadow-sm"
            title="Print / Export Environmental Survey Report (PDF)"
          >
            <FileText className="w-4 h-4 text-sky-600" />
          </button>

          <button
            onClick={onExportCSV}
            className="p-2 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl text-slate-700 transition cursor-pointer shadow-sm"
            title="Export CSV Telemetry"
          >
            <Table className="w-4 h-4 text-emerald-600" />
          </button>

          <button
            onClick={onOpenROVModal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold font-hud transition shadow-md shadow-emerald-600/20 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5 text-white" />
            <span>DISPATCH AUV</span>
          </button>
        </div>
      </div>

      {/* Scenario Selector Tabs */}
      <div className="bg-white border border-slate-200 rounded-2xl p-3.5 shadow-sm">
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-xs font-hud text-slate-900 font-bold flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-sky-600" /> SELECT UNDERWATER TEST SCENARIO
          </span>
          <span className="text-[10px] text-slate-500 font-mono">1-Click Live Test</span>
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
                    ? 'bg-sky-50 border-2 border-sky-600 text-slate-900 shadow-sm'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-white'
                }`}
              >
                <div className="text-xs font-bold leading-snug line-clamp-1">
                  {s.title}
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono mt-1">
                  <span>-{s.depthMeters}m</span>
                  <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold uppercase ${
                    s.expectedThreat === 'critical' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-800'
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
        className={`w-full py-3.5 px-6 rounded-2xl font-hud font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all transform active:scale-95 shadow-md cursor-pointer ${
          isScanning
            ? 'bg-sky-700 text-white animate-pulse cursor-wait'
            : 'bg-sky-600 hover:bg-sky-500 text-white shadow-sky-600/25'
        }`}
      >
        {isScanning ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>ANALYZING SPECTRAL ACOUSTICS...</span>
          </>
        ) : (
          <>
            <Play className="w-5 h-5 fill-white text-white" />
            <span>TRIGGER AUV NEURAL FRAME SCAN</span>
          </>
        )}
      </button>

      {/* Model Parameter Controls: Confidence Slider & Class Filter Chips */}
      <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-2.5 shadow-sm">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="flex items-center gap-1.5 text-slate-700 font-medium">
            <Filter className="w-3.5 h-3.5 text-sky-600" />
            <span>Confidence Threshold:</span>
          </span>
          <span className="font-bold text-sky-800 px-2 py-0.5 rounded bg-sky-50 border border-sky-200">
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
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition border cursor-pointer ${
                  isActive
                    ? 'bg-white text-slate-900 border-sky-400 shadow-sm font-semibold'
                    : 'bg-slate-100 text-slate-400 border-slate-200 line-through opacity-60'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
                {isActive && (
                  <span className="ml-0.5 px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-700 font-bold text-[10px] border border-slate-200">
                    {cat.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sonar Radar & Marine Pollution Index (MPI) Container */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
        {/* Sonar Radar View */}
        <div className="sm:col-span-5 bg-white border border-slate-200 rounded-2xl p-3.5 flex flex-col items-center justify-center relative overflow-hidden shadow-sm">
          <div className="text-[11px] font-hud text-slate-700 font-bold mb-2 flex items-center justify-between w-full px-1">
            <span className="flex items-center gap-1 text-slate-900">
              <Radio className="w-3.5 h-3.5 text-sky-600" />
              <span>120 kHz SONAR</span>
            </span>
            <span className="text-[8.5px] font-mono text-sky-800 bg-sky-50 px-1.5 py-0.5 rounded border border-sky-200 font-semibold">
              ACOUSTIC SIMULATION
            </span>
          </div>

          {/* Radar Circular Display - Subsea Dish */}
          <div className="relative w-32 h-32 rounded-full border-2 border-slate-700 bg-slate-950 flex items-center justify-center shadow-inner">
            <div className="absolute w-24 h-24 rounded-full border border-sky-500/20"></div>
            <div className="absolute w-14 h-14 rounded-full border border-sky-500/20"></div>
            <div className="absolute w-full h-px bg-sky-500/20"></div>
            <div className="absolute h-full w-px bg-sky-500/20"></div>

            {/* Sweeping beam */}
            <div className="absolute inset-0 rounded-full sonar-sweep overflow-hidden pointer-events-none">
              <div className="w-1/2 h-1/2 bg-gradient-to-br from-emerald-400/40 to-transparent origin-bottom-right"></div>
            </div>

            {/* Detected Blips */}
            {ghostNets > 0 && <div className="absolute top-7 left-9 w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></div>}
            {toxics > 0 && <div className="absolute bottom-8 right-7 w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></div>}
            {plastics > 0 && <div className="absolute top-14 right-8 w-2 h-2 rounded-full bg-amber-400"></div>}
            {marineLife > 0 && <div className="absolute bottom-9 left-10 w-2 h-2 rounded-full bg-emerald-400"></div>}
          </div>

          <div className="mt-2 text-[10px] font-mono text-slate-600 flex items-center gap-2">
            <span>PING: <strong className="text-sky-700">120.4 kHz</strong></span>
            <span>BEARING: <strong className="text-slate-900">142° SE</strong></span>
          </div>
          <div className="mt-1 text-[9px] font-mono text-slate-400 text-center">
            Acoustic spatial fallback when turbidity &gt; 60%
          </div>
        </div>

        {/* Marine Pollution Index & Metrics */}
        <div className="sm:col-span-7 bg-white border border-slate-200 rounded-2xl p-4 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-hud text-slate-800 font-bold">
              POLLUTION INDEX (MPI)
            </span>
            <span className={`px-2.5 py-0.5 rounded-full border text-xs font-hud font-bold ${mpiTheme.text} ${mpiTheme.bg} ${mpiTheme.border}`}>
              {mpiScore} / 100
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200 mb-2">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                mpiScore >= 70 ? 'bg-red-600' : mpiScore >= 40 ? 'bg-amber-500' : 'bg-emerald-600'
              }`}
              style={{ width: `${mpiScore}%` }}
            />
          </div>

          {/* MPI Mathematical Formula Badge */}
          <div className="text-[9.5px] font-mono text-slate-500 bg-slate-50 px-2 py-1 rounded-lg border border-slate-200 text-center mb-2.5">
            MPI = Σ(W<sub>i</sub> × T<sub>i</sub>) • Weighted: Toxics (45%), Nets (35%), Polymers (15%)
          </div>

          {/* 4 Counter Badges */}
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-2">
              <AlertOctagon className="w-4 h-4 text-red-600 shrink-0" />
              <div>
                <div className="text-[9px] text-slate-500 font-mono font-medium">GHOST NETS</div>
                <div className="text-sm font-hud font-bold text-red-700">{ghostNets}</div>
              </div>
            </div>

            <div className="p-2 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-2">
              <Trash2 className="w-4 h-4 text-amber-600 shrink-0" />
              <div>
                <div className="text-[9px] text-slate-500 font-mono font-medium">PLASTICS</div>
                <div className="text-sm font-hud font-bold text-amber-700">{plastics}</div>
              </div>
            </div>

            <div className="p-2 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-2">
              <Biohazard className="w-4 h-4 text-rose-600 shrink-0" />
              <div>
                <div className="text-[9px] text-slate-500 font-mono font-medium">TOXIC DRUM</div>
                <div className="text-sm font-hud font-bold text-rose-700">{toxics}</div>
              </div>
            </div>

            <div className="p-2 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-2">
              <Fish className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <div className="text-[9px] text-slate-500 font-mono font-medium">FAUNA</div>
                <div className="text-sm font-hud font-bold text-emerald-700">{marineLife}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gemini AI Natural Language Narrative Report */}
      <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-2">
        <div className="flex items-center gap-1.5 text-sky-700 font-hud text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-sky-600" />
          <span>AI OCEANOGRAPHIC MISSION BRIEFING</span>
        </div>
        <p className="text-xs text-slate-700 font-mono leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200">
          {currentScenario.narrativeReport}
        </p>
      </div>

      {/* Cumulative Environmental Impact Stats Panel */}
      <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-2.5 shadow-sm">
        <div className="flex items-center gap-1.5 text-xs font-hud text-slate-800 font-bold uppercase tracking-wider">
          <BarChart3 className="w-3.5 h-3.5 text-emerald-600" />
          <span>CUMULATIVE EXPEDITION METRICS</span>
        </div>

        <div className="grid grid-cols-4 gap-2 text-center font-mono">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="text-sm font-bold text-sky-700">{cumulativeStats.totalScans}</div>
            <div className="text-[9px] text-slate-500 font-semibold">SCANS</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="text-sm font-bold text-amber-700">{cumulativeStats.totalDebrisCount}</div>
            <div className="text-[9px] text-slate-500 font-semibold">DEBRIS</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="text-sm font-bold text-red-700">~{cumulativeStats.totalMassKg.toFixed(0)} kg</div>
            <div className="text-[9px] text-slate-500 font-semibold">MASS</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="text-sm font-bold text-emerald-700">{cumulativeStats.protectedSpeciesCount}</div>
            <div className="text-[9px] text-slate-500 font-semibold">SPECIES</div>
          </div>
        </div>
      </div>

      {/* Live Detection Event Log / Ticker */}
      <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-2 shadow-sm">
        <div className="flex items-center justify-between text-xs font-hud text-slate-800 font-bold uppercase tracking-wider">
          <span className="flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-sky-600" />
            <span>MISSION EVENT LOG</span>
          </span>
          <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
            <Clock className="w-3 h-3 text-sky-600" /> Live Ticker
          </span>
        </div>

        <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
          {eventLogs.map((log) => (
            <div
              key={log.id}
              className="flex items-center justify-between p-2 bg-slate-50 border border-slate-200 rounded-xl text-[11px] font-mono hover:bg-slate-100 transition"
            >
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${
                  log.threatLevel === 'critical' ? 'bg-red-500 animate-pulse' : 'bg-sky-600'
                }`} />
                <span className="text-slate-800 font-medium">{log.message}</span>
              </div>
              <span className="text-slate-400 text-[10px]">{log.timestamp}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
