import React from 'react';
import {
  Waves,
  Anchor,
  Eye,
  Radio,
  Send,
  Fish,
  ShieldAlert,
  Sparkles,
  ChevronRight,
  Globe,
  Award,
  Cpu,
  BarChart3,
  Presentation,
  Play,
} from 'lucide-react';

interface Props {
  onLaunchDemo: (scenarioIndex?: number) => void;
  onOpenPitchDeck: () => void;
}

export const LandingPage: React.FC<Props> = ({ onLaunchDemo, onOpenPitchDeck }) => {
  return (
    <div className="min-h-screen bg-[#020B14] text-slate-100 flex flex-col items-center overflow-x-hidden selection:bg-cyan-400 selection:text-black">
      {/* Animated Ocean Background Particles & Caustics */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/4 w-96 h-full bg-gradient-to-b from-cyan-500/[0.04] to-transparent rotate-12 ocean-pulse"></div>
        <div className="absolute top-0 right-1/3 w-72 h-full bg-gradient-to-b from-teal-500/[0.04] to-transparent -rotate-6 ocean-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-0 left-1/2 w-64 h-full bg-gradient-to-b from-blue-500/[0.03] to-transparent rotate-3 ocean-pulse" style={{ animationDelay: '0.8s' }}></div>

        {/* Floating micro-particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/20 rounded-full"
            style={{
              left: `${5 + (i * 4.7) % 90}%`,
              top: `${10 + (i * 7.3) % 80}%`,
              animation: `float-particle ${6 + (i % 4) * 2}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>

      {/* Top Nav Bar */}
      <nav className="w-full max-w-6xl px-6 py-4 flex items-center justify-between relative z-10 border-b border-ocean-800/40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-teal-500 text-black flex items-center justify-center shadow-lg shadow-cyan-500/20 font-bold">
            <Waves className="w-6 h-6" />
          </div>
          <div>
            <span className="font-hud text-sm font-black tracking-wider text-white">AQUASENTINEL</span>
            <span className="font-hud text-sm font-black text-cyan-400 ml-1">AI</span>
            <span className="ml-2 text-xs font-arabic text-teal-300 font-bold hidden sm:inline">بحر-سنتينل</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenPitchDeck}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-ocean-900/90 hover:bg-cyan-950 border border-ocean-700 hover:border-cyan-500/50 rounded-xl text-xs font-hud text-cyan-300 transition"
          >
            <Presentation className="w-3.5 h-3.5 text-cyan-400" />
            <span>PITCH DECK</span>
          </button>
          <span className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-ocean-900/80 border border-ocean-700 rounded-full text-[11px] text-slate-300 font-mono">
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            NOVA 2026 • BITS Pilani Dubai
          </span>
          <span className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-ocean-900/80 border border-ocean-700 rounded-full text-[11px] text-slate-300 font-mono">
            <Award className="w-3.5 h-3.5 text-emerald-400" />
            UN SDG 14 • Global Innovation
          </span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="w-full max-w-5xl px-6 pt-12 sm:pt-20 pb-10 flex flex-col items-center text-center relative z-10">
        {/* Subtitle Badge */}
        <div className="flex items-center gap-2 px-4 py-1.5 bg-cyan-500/10 border border-cyan-400/30 rounded-full mb-6 text-xs font-mono text-cyan-300">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Autonomous Underwater Debris & Anomaly Detection System</span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-hud tracking-tight leading-tight">
          <span className="text-white">See What the</span>
          <br />
          <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
            Ocean Hides
          </span>
        </h1>

        {/* Arabic Subtitle */}
        <p className="mt-4 text-lg sm:text-xl text-teal-300/90 font-arabic font-bold">
          بحر-سنتينل — نظام المراقبة البحرية والرصد البيئي الذكي
        </p>

        {/* Problem Statement */}
        <p className="mt-6 max-w-2xl text-base sm:text-lg text-slate-300 leading-relaxed">
          Every year, <strong className="text-red-400">640,000 tons</strong> of ghost fishing nets and{' '}
          <strong className="text-yellow-400">14 million tons</strong> of plastic debris sink to the ocean floor — invisible to human eyes.
          AquaSentinel AI cuts through murky underwater fog with <span className="text-cyan-300 font-semibold">physics-based dehazing</span>, detects hidden ecological hazards at 30 FPS, and dispatches autonomous robotic cleanup units.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={() => onLaunchDemo(0)}
            className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 text-black font-hud font-bold text-base sm:text-lg rounded-2xl shadow-xl shadow-cyan-400/25 transition-all transform hover:scale-105 active:scale-95"
          >
            <Eye className="w-6 h-6" />
            <span>LAUNCH LIVE DEMO</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onOpenPitchDeck}
            className="flex items-center gap-2.5 px-6 py-4 bg-ocean-900/80 hover:bg-ocean-800 border border-ocean-700 hover:border-cyan-400/40 text-slate-200 font-hud font-bold text-sm sm:text-base rounded-2xl transition-all"
          >
            <Presentation className="w-5 h-5 text-cyan-400" />
            <span>10-SLIDE PITCH DECK</span>
          </button>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 flex flex-wrap justify-center gap-3 text-[11px] font-mono text-slate-400">
          <span className="px-3 py-1.5 bg-ocean-900/60 border border-ocean-800 rounded-full">
            🌊 Global Ocean Conservation Action
          </span>
          <span className="px-3 py-1.5 bg-ocean-900/60 border border-ocean-800 rounded-full">
            🌍 UN SDG 14: Life Below Water
          </span>
          <span className="px-3 py-1.5 bg-ocean-900/60 border border-ocean-800 rounded-full">
            🇦🇪 Arabian Gulf & Dubai Marine MPAs
          </span>
        </div>
      </section>

      {/* Key Capabilities Grid */}
      <section className="w-full max-w-5xl px-6 py-14 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold font-hud text-white">
            Core <span className="text-cyan-400">Technological Pillars</span>
          </h2>
          <p className="mt-2 text-sm text-slate-400 max-w-xl mx-auto">
            End-to-end subsea intelligence: from optical murky ingestion to autonomous robotic intervention
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Feature 1 */}
          <div className="group p-5 bg-ocean-900/60 hover:bg-ocean-900/90 border border-ocean-800 hover:border-cyan-500/40 rounded-2xl transition-all duration-300">
            <div className="w-12 h-12 mb-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center group-hover:bg-cyan-500/20 transition">
              <Eye className="w-6 h-6 text-cyan-400" />
            </div>
            <h3 className="text-sm font-bold text-white font-hud mb-1">Spectral Dehazing</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Physics-informed red-channel restoration based on the Beer-Lambert attenuation model. Drag the interactive split-slider in real time.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="group p-5 bg-ocean-900/60 hover:bg-ocean-900/90 border border-ocean-800 hover:border-red-500/40 rounded-2xl transition-all duration-300">
            <div className="w-12 h-12 mb-3 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center group-hover:bg-red-500/20 transition">
              <ShieldAlert className="w-6 h-6 text-red-400" />
            </div>
            <h3 className="text-sm font-bold text-white font-hud mb-1">Multimodal Vision</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Gemini 1.5 Flash Vision API classifies ghost nets, toxic chemical drums, and protected marine fauna with confidence filters.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="group p-5 bg-ocean-900/60 hover:bg-ocean-900/90 border border-ocean-800 hover:border-emerald-500/40 rounded-2xl transition-all duration-300">
            <div className="w-12 h-12 mb-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center group-hover:bg-emerald-500/20 transition">
              <Send className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-sm font-bold text-white font-hud mb-1">AUV Robotic Dispatch</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Generates autonomous cleanup telemetry orders with GPS coordinates, depth layers, and robotic tool payload configurations.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="group p-5 bg-ocean-900/60 hover:bg-ocean-900/90 border border-ocean-800 hover:border-yellow-500/40 rounded-2xl transition-all duration-300">
            <div className="w-12 h-12 mb-3 rounded-xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center group-hover:bg-yellow-500/20 transition">
              <BarChart3 className="w-6 h-6 text-yellow-400" />
            </div>
            <h3 className="text-sm font-bold text-white font-hud mb-1">Acoustic Sonar & Audio</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              120 kHz circular radar sweep with Web Audio API synthesized sonar pings, critical alarms, and 1-click PDF/CSV export.
            </p>
          </div>
        </div>
      </section>

      {/* 3 Built-in Scenarios Direct Launcher */}
      <section className="w-full max-w-5xl px-6 py-12 relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-xl sm:text-2xl font-bold font-hud text-white">
            Pre-Loaded <span className="text-cyan-400">Mission Scenarios</span>
          </h2>
          <p className="mt-1 text-xs text-slate-400">Click any scenario below to launch the live Command Center directly into that mission</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* Scenario 1 */}
          <div className="p-5 bg-ocean-900/70 border border-red-500/30 rounded-2xl hover:border-red-400 transition flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="flex items-center gap-1.5 text-xs font-hud font-bold text-red-400">
                  <Anchor className="w-4 h-4" /> CRITICAL ENTANGLEMENT
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-red-950/80 rounded border border-red-800/40 text-red-300">16.4m</span>
              </div>
              <h3 className="text-base font-bold text-white mb-1 group-hover:text-cyan-300 transition">Coral Reef Ghost Net</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Dubai Coast, Arabian Gulf • ~42.5 kg nylon gillnet smothering endangered brain coral colonies.
              </p>
            </div>
            <button
              onClick={() => onLaunchDemo(0)}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 hover:border-red-400 text-red-200 font-hud text-xs font-bold rounded-xl transition"
            >
              <Play className="w-3.5 h-3.5" />
              <span>LAUNCH SCENARIO 01</span>
            </button>
          </div>

          {/* Scenario 2 */}
          <div className="p-5 bg-ocean-900/70 border border-yellow-500/30 rounded-2xl hover:border-yellow-400 transition flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="flex items-center gap-1.5 text-xs font-hud font-bold text-yellow-400">
                  <Fish className="w-4 h-4" /> PLASTIC ACCUMULATION
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-yellow-950/80 rounded border border-yellow-800/40 text-yellow-300">28.2m</span>
              </div>
              <h3 className="text-base font-bold text-white mb-1 group-hover:text-cyan-300 transition">Continental Shelf Plastics</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Indian Ocean Shelf • Concentrated cluster of PET bottles, polyethylene bags, and aluminum beverage cans.
              </p>
            </div>
            <button
              onClick={() => onLaunchDemo(1)}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/40 hover:border-yellow-400 text-yellow-200 font-hud text-xs font-bold rounded-xl transition"
            >
              <Play className="w-3.5 h-3.5" />
              <span>LAUNCH SCENARIO 02</span>
            </button>
          </div>

          {/* Scenario 3 */}
          <div className="p-5 bg-ocean-900/70 border border-red-500/30 rounded-2xl hover:border-red-400 transition flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="flex items-center gap-1.5 text-xs font-hud font-bold text-red-400">
                  <ShieldAlert className="w-4 h-4" /> INDUSTRIAL HAZMAT
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-red-950/80 rounded border border-red-800/40 text-red-300">11.8m</span>
              </div>
              <h3 className="text-base font-bold text-white mb-1 group-hover:text-cyan-300 transition">Harbor Toxic Drum</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Jebel Ali Terminal, Dubai • 55-gallon corroded chemical drum in immediate proximity to a protected sea turtle.
              </p>
            </div>
            <button
              onClick={() => onLaunchDemo(2)}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 hover:border-red-400 text-red-200 font-hud text-xs font-bold rounded-xl transition"
            >
              <Play className="w-3.5 h-3.5" />
              <span>LAUNCH SCENARIO 03</span>
            </button>
          </div>
        </div>
      </section>

      {/* Pipeline Architecture Visual */}
      <section className="w-full max-w-5xl px-6 py-10 relative z-10">
        <div className="p-6 bg-ocean-900/50 border border-ocean-800 rounded-2xl">
          <div className="flex items-center gap-2 mb-4 text-xs font-hud text-cyan-400 font-bold">
            <Cpu className="w-4 h-4" />
            <span>AUTONOMOUS SUBSEA INFERENCE PIPELINE</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-mono text-[11px]">
            <div className="p-3 bg-ocean-950 rounded-xl border border-ocean-800">
              <div className="text-cyan-400 font-bold mb-1 text-xs">1. OPTICAL FEED</div>
              <div className="text-slate-400">AUV / ROV camera feed or sample synthetic stream</div>
            </div>
            <div className="p-3 bg-ocean-950 rounded-xl border border-ocean-800">
              <div className="text-cyan-400 font-bold mb-1 text-xs">2. SPECTRAL DEHAZE</div>
              <div className="text-slate-400">Beer-Lambert red compensation & contrast boost</div>
            </div>
            <div className="p-3 bg-ocean-950 rounded-xl border border-ocean-800">
              <div className="text-cyan-400 font-bold mb-1 text-xs">3. GEMINI VISION</div>
              <div className="text-slate-400">Multi-class debris & marine fauna classification</div>
            </div>
            <div className="p-3 bg-ocean-950 rounded-xl border border-ocean-800">
              <div className="text-cyan-400 font-bold mb-1 text-xs">4. ROBOTIC DISPATCH</div>
              <div className="text-slate-400">Autonomous AUV cleanup telemetry orders</div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="w-full max-w-5xl px-6 py-12 relative z-10">
        <div className="p-8 bg-gradient-to-br from-cyan-950/40 to-ocean-900/60 border border-cyan-500/30 rounded-3xl text-center">
          <h2 className="text-2xl sm:text-3xl font-black font-hud text-white mb-3">
            Ready to Explore the Subsea Command Center?
          </h2>
          <p className="text-sm text-slate-400 max-w-lg mx-auto mb-6">
            Drag the before/after split dehazer, hear the 120 kHz sonar radar sweep, and dispatch autonomous cleanup orders.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => onLaunchDemo(0)}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 text-black font-hud font-bold text-base rounded-2xl shadow-xl shadow-cyan-400/25 transition-all transform hover:scale-105 active:scale-95"
            >
              <Radio className="w-5 h-5" />
              <span>ENTER COMMAND CENTER</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={onOpenPitchDeck}
              className="inline-flex items-center gap-2.5 px-6 py-4 bg-ocean-900/80 hover:bg-ocean-800 border border-ocean-700 text-slate-200 font-hud font-bold text-sm rounded-2xl transition"
            >
              <Presentation className="w-4 h-4 text-cyan-400" />
              <span>VIEW PITCH DECK</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full max-w-5xl px-6 py-6 border-t border-ocean-800/60 flex items-center justify-between text-[11px] text-slate-500 font-mono relative z-10">
        <span>© 2026 AquaSentinel AI • SubSea Vision</span>
        <span>NOVA 2026 Grand Finale • BITS Pilani Dubai Campus</span>
      </footer>

      {/* Inline Float Animation Keyframes */}
      <style>{`
        @keyframes float-particle {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.2; }
          50% { transform: translateY(-30px) translateX(10px); opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};
