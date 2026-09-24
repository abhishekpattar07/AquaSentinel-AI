import React from 'react';
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
  Volume2,
  VolumeX,
  FileText,
  Table,
  Filter,
  Activity,
  Sparkles,
  BarChart3,
  Clock
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
    if (mpiScore >= 70) return 'text-red-400 border-red-500/40 bg-red-950/40';
    if (mpiScore >= 40) return 'text-yellow-400 border-yellow-500/40 bg-yellow-950/40';
    return 'text-emerald-400 border-emerald-500/40 bg-emerald-950/40';
  };

  const categoriesList: { id: DebrisCategory; label: string; icon: React.ReactNode; color: string }[] = [
    { id: 'ghost_net', label: 'Ghost Nets', icon: <AlertOctagon className="w-3.5 h-3.5" />, color: '#FF3366' },
    { id: 'plastic', label: 'Plastics', icon: <Trash2 className="w-3.5 h-3.5" />, color: '#FFB800' },
    { id: 'toxic_drum', label: 'Toxics', icon: <Biohazard className="w-3.5 h-3.5" />, color: '#FF3366' },
    { id: 'marine_life', label: 'Fauna', icon: <Fish className="w-3.5 h-3.5" />, color: '#00E699' },
  ];

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Top Action Bar: Pitch Deck, Sound Toggle, Export, Dispatch */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenPitchDeck}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 border border-cyan-400/40 rounded-xl text-xs font-bold font-hud text-cyan-300 transition shadow-lg shadow-cyan-500/10"
          >
            <Presentation className="w-3.5 h-3.5 text-cyan-400" />
            <span>PITCH DECK</span>
          </button>

          <button
            onClick={onToggleSound}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl border text-xs font-mono transition ${
              soundEnabled
                ? 'bg-cyan-950/80 border-cyan-400 text-cyan-300'
                : 'bg-ocean-900 border-ocean-700 text-slate-400'
            }`}
            title="Toggle Sonar Audio Feedback"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-cyan-400" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span>{soundEnabled ? 'SONAR ON' : 'MUTED'}</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onExportReport}
            className="p-1.5 bg-ocean-900 hover:bg-ocean-800 border border-ocean-700 rounded-lg text-slate-300 hover:text-white transition"
            title="Print / Export Environmental Survey Report"
          >
            <FileText className="w-4 h-4 text-cyan-400" />
          </button>

          <button
            onClick={onExportCSV}
            className="p-1.5 bg-ocean-900 hover:bg-ocean-800 border border-ocean-700 rounded-lg text-slate-300 hover:text-white transition"
            title="Export CSV Telemetry"
          >
            <Table className="w-4 h-4 text-emerald-400" />
          </button>

          <button
            onClick={onOpenROVModal}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 hover:from-emerald-500/30 border border-emerald-400/40 rounded-xl text-xs font-bold font-hud text-emerald-300 transition shadow-lg"
          >
            <Send className="w-3.5 h-3.5 text-emerald-400" />
            <span>DISPATCH AUV</span>
          </button>
        </div>
      </div>

      {/* Scenario Selector Tabs */}
      <div className="bg-ocean-900/90 border border-ocean-800 rounded-2xl p-3 shadow-xl">
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
                className={`p-2.5 rounded-xl border text-left transition flex flex-col justify-between min-h-[64px] ${
                  isSelected
                    ? 'bg-cyan-950/60 border-cyan-400 text-white shadow-md shadow-cyan-500/20'
                    : 'bg-ocean-950/60 border-ocean-800/80 text-slate-400 hover:border-ocean-700 hover:text-slate-200'
                }`}
              >
                <div className="text-xs font-bold leading-snug line-clamp-1">
                  {s.title}
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mt-1">
                  <span>{s.depthMeters}m</span>
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
        className={`w-full py-3.5 px-6 rounded-2xl font-hud font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all transform active:scale-95 shadow-xl ${
          isScanning
            ? 'bg-cyan-600 text-black animate-pulse cursor-wait'
            : 'bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 text-black shadow-cyan-400/20'
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
      <div className="p-3 bg-ocean-900/80 border border-ocean-800 rounded-2xl space-y-2.5 shadow-lg">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="flex items-center gap-1 text-slate-300">
            <Filter className="w-3.5 h-3.5 text-cyan-400" />
            <span>Confidence Threshold:</span>
          </span>
          <span className="font-bold text-cyan-300">{Math.round(confidenceThreshold * 100)}%</span>
        </div>

        <input
          type="range"
          min="0.50"
          max="0.95"
          step="0.05"
          value={confidenceThreshold}
          onChange={(e) => onConfidenceChange(parseFloat(e.target.value))}
          className="w-full h-1.5 bg-ocean-950 rounded-lg appearance-none cursor-pointer accent-cyan-400"
        />

        {/* Class Filter Chips */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {categoriesList.map(cat => {
            const isActive = activeCategories.includes(cat.id);
            return (
              <button
                key={cat.id}
                onClick={() => onToggleCategory(cat.id)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-mono transition border ${
                  isActive
                    ? 'bg-ocean-950 text-white border-cyan-400/80 shadow-sm'
                    : 'bg-ocean-950/40 text-slate-500 border-ocean-800 line-through opacity-60'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sonar Radar & Marine Pollution Index (MPI) Container */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
        {/* Sonar Radar View */}
        <div className="sm:col-span-5 bg-ocean-900/90 border border-ocean-800 rounded-2xl p-3 flex flex-col items-center justify-center relative overflow-hidden shadow-xl">
          <div className="text-[11px] font-hud text-slate-400 font-bold mb-2 flex items-center gap-1">
            <Radio className="w-3.5 h-3.5 text-cyan-400" />
            <span>120 kHz SONAR</span>
          </div>

          {/* Radar Circular Display */}
          <div className="relative w-32 h-32 rounded-full border border-cyan-500/30 bg-ocean-950 flex items-center justify-center">
            <div className="absolute w-20 h-20 rounded-full border border-cyan-500/20"></div>
            <div className="absolute w-10 h-10 rounded-full border border-cyan-500/20"></div>
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
            <span>PING: <strong className="text-cyan-400">120 kHz</strong></span>
            <span>RANGE: <strong className="text-white">50m</strong></span>
          </div>
        </div>

        {/* Marine Pollution Index & Metrics */}
        <div className="sm:col-span-7 bg-ocean-900/90 border border-ocean-800 rounded-2xl p-3 flex flex-col justify-between shadow-xl">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-hud text-slate-400 font-bold">
              MARINE POLLUTION INDEX (MPI)
            </span>
            <span className={`px-2 py-0.5 rounded-full border text-xs font-hud font-bold ${getMpiColor()}`}>
              {mpiScore} / 100
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-ocean-950 rounded-full overflow-hidden border border-ocean-800 mb-2">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                mpiScore >= 70 ? 'bg-red-500' : mpiScore >= 40 ? 'bg-yellow-400' : 'bg-emerald-400'
              }`}
              style={{ width: `${mpiScore}%` }}
            />
          </div>

          {/* 4 Counter Badges */}
          <div className="grid grid-cols-2 gap-1.5">
            <div className="p-1.5 bg-ocean-950/80 rounded-lg border border-red-500/20 flex items-center gap-2">
              <AlertOctagon className="w-3.5 h-3.5 text-red-400" />
              <div>
                <div className="text-[9px] text-slate-400 font-mono">GHOST NETS</div>
                <div className="text-xs font-hud font-bold text-red-400">{ghostNets}</div>
              </div>
            </div>

            <div className="p-1.5 bg-ocean-950/80 rounded-lg border border-yellow-500/20 flex items-center gap-2">
              <Trash2 className="w-3.5 h-3.5 text-yellow-400" />
              <div>
                <div className="text-[9px] text-slate-400 font-mono">PLASTICS</div>
                <div className="text-xs font-hud font-bold text-yellow-400">{plastics}</div>
              </div>
            </div>

            <div className="p-1.5 bg-ocean-950/80 rounded-lg border border-red-500/20 flex items-center gap-2">
              <Biohazard className="w-3.5 h-3.5 text-red-400" />
              <div>
                <div className="text-[9px] text-slate-400 font-mono">CHEMICAL/TOXIC</div>
                <div className="text-xs font-hud font-bold text-red-400">{toxics}</div>
              </div>
            </div>

            <div className="p-1.5 bg-ocean-950/80 rounded-lg border border-emerald-500/20 flex items-center gap-2">
              <Fish className="w-3.5 h-3.5 text-emerald-400" />
              <div>
                <div className="text-[9px] text-slate-400 font-mono">PROTECTED BIO</div>
                <div className="text-xs font-hud font-bold text-emerald-400">{marineLife}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gemini AI Natural Language Narrative Report */}
      <div className="p-3 bg-gradient-to-br from-cyan-950/40 to-ocean-900 border border-cyan-500/30 rounded-2xl shadow-xl space-y-1.5">
        <div className="flex items-center gap-1.5 text-cyan-400 font-hud text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI OCEANOGRAPHIC MISSION BRIEFING</span>
        </div>
        <p className="text-xs text-slate-300 font-mono leading-relaxed bg-ocean-950/80 p-2.5 rounded-xl border border-ocean-800">
          {currentScenario.narrativeReport}
        </p>
      </div>

      {/* Cumulative Environmental Impact Stats Panel */}
      <div className="p-3 bg-ocean-900/80 border border-ocean-800 rounded-2xl space-y-2 shadow-xl">
        <div className="flex items-center gap-1.5 text-xs font-hud text-slate-300 font-bold">
          <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
          <span>CUMULATIVE EXPEDITION METRICS</span>
        </div>

        <div className="grid grid-cols-4 gap-2 text-center font-mono">
          <div className="p-2 bg-ocean-950 rounded-lg border border-ocean-800">
            <div className="text-xs font-bold text-cyan-300">{cumulativeStats.totalScans}</div>
            <div className="text-[9px] text-slate-400">SCANS</div>
          </div>
          <div className="p-2 bg-ocean-950 rounded-lg border border-ocean-800">
            <div className="text-xs font-bold text-yellow-300">{cumulativeStats.totalDebrisCount}</div>
            <div className="text-[9px] text-slate-400">DEBRIS</div>
          </div>
          <div className="p-2 bg-ocean-950 rounded-lg border border-ocean-800">
            <div className="text-xs font-bold text-red-400">~{cumulativeStats.totalMassKg.toFixed(0)} kg</div>
            <div className="text-[9px] text-slate-400">MASS</div>
          </div>
          <div className="p-2 bg-ocean-950 rounded-lg border border-ocean-800">
            <div className="text-xs font-bold text-emerald-400">{cumulativeStats.protectedSpeciesCount}</div>
            <div className="text-[9px] text-slate-400">SPECIES</div>
          </div>
        </div>
      </div>

      {/* Live Detection Event Log / Ticker */}
      <div className="p-3 bg-ocean-900/90 border border-ocean-800 rounded-2xl space-y-2 shadow-xl">
        <div className="flex items-center justify-between text-xs font-hud text-slate-300 font-bold">
          <span className="flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span>MISSION EVENT LOG</span>
          </span>
          <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
            <Clock className="w-3 h-3" /> Live
          </span>
        </div>

        <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
          {eventLogs.map((log) => (
            <div
              key={log.id}
              className="flex items-center justify-between p-1.5 bg-ocean-950/70 border border-ocean-800 rounded-lg text-[11px] font-mono"
            >
              <div className="flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full ${
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
