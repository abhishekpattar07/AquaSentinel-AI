import React from 'react';
import {
  Waves,
  Anchor,
  Eye,
  Radio,
  Fish,
  ShieldAlert,
  Sparkles,
  ChevronRight,
  Globe,
  Award,
  Cpu,
  Presentation,
  Play,
  Compass,
} from 'lucide-react';

interface Props {
  onLaunchDemo: (scenarioIndex?: number) => void;
  onOpenPitchDeck: () => void;
}

export const LandingPage: React.FC<Props> = ({ onLaunchDemo, onOpenPitchDeck }) => {
  return (
    <div className="min-h-screen bg-[#020B14] text-slate-100 flex flex-col items-center overflow-x-hidden selection:bg-cyan-400 selection:text-black">
      {/* Ambient Ocean Caustics & Glowing Micro-Particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-full bg-gradient-to-b from-cyan-500/[0.07] to-transparent rotate-12 ocean-pulse blur-3xl"></div>
        <div className="absolute top-0 right-1/4 w-[400px] h-full bg-gradient-to-b from-teal-500/[0.06] to-transparent -rotate-12 ocean-pulse blur-3xl" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-blue-600/[0.05] to-transparent rounded-full blur-3xl"></div>

        {/* Floating micro-particles */}
        {[...Array(24)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
            style={{
              left: `${4 + (i * 4.2) % 92}%`,
              top: `${8 + (i * 6.7) % 84}%`,
              animation: `float-particle ${7 + (i % 4) * 2}s ease-in-out infinite`,
              animationDelay: `${i * 0.25}s`,
            }}
          />
        ))}
      </div>

      {/* Floating Glass Navbar */}
      <header className="sticky top-4 z-50 w-full max-w-6xl px-4 sm:px-6">
        <nav className="glass-card rounded-2xl px-5 py-3.5 flex items-center justify-between shadow-2xl shadow-black/60 border border-cyan-400/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 via-teal-400 to-emerald-400 text-black flex items-center justify-center shadow-lg shadow-cyan-400/30 font-bold">
              <Waves className="w-5 h-5 text-black" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-hud text-sm font-black tracking-wider text-white">AQUASENTINEL</span>
                <span className="font-hud text-sm font-black text-cyan-400">AI</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 font-semibold ml-1">v2.4</span>
              </div>
              <p className="text-[11px] font-arabic text-teal-300/80 font-bold hidden sm:block">
                بحر-سنتينل • الذكاء الاصطناعي للمراقبة البحرية
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenPitchDeck}
              className="flex items-center gap-2 px-3.5 py-1.5 bg-gradient-to-r from-cyan-500/15 to-teal-500/15 hover:from-cyan-500/25 hover:to-teal-500/25 border border-cyan-400/40 hover:border-cyan-400 rounded-xl text-xs font-hud font-bold text-cyan-300 transition shadow-sm cursor-pointer"
            >
              <Presentation className="w-3.5 h-3.5 text-cyan-400" />
              <span>PITCH DECK</span>
            </button>

            <span className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-ocean-900/80 border border-ocean-700/80 rounded-xl text-xs text-slate-300 font-mono">
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              NOVA 2026 • BITS Pilani Dubai
            </span>

            <span className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-emerald-950/40 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 font-mono">
              <Award className="w-3.5 h-3.5 text-emerald-400" />
              UN SDG 14
            </span>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="w-full max-w-5xl px-6 pt-10 sm:pt-16 pb-8 flex flex-col items-center text-center relative z-10">
        {/* Track Identifier Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-400/30 text-xs font-mono text-cyan-300 mb-6 shadow-inner backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>NOVA 2026 Grand Finale Track • Sustainable & DeepTech AI</span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-hud tracking-tight leading-[1.1] max-w-4xl">
          <span className="text-white">See What the Ocean Hides</span>
          <br />
          <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent drop-shadow-sm">
            Autonomous Subsea AI
          </span>
        </h1>

        {/* Problem Statement Lead */}
        <p className="mt-6 max-w-2xl text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
          Every year, <strong className="text-red-400 font-semibold">640,000 tons</strong> of ghost fishing nets and{' '}
          <strong className="text-yellow-400 font-semibold">14 million tons</strong> of plastics sink into murky waters, invisible to cameras. 
          AquaSentinel cuts through optical attenuation with <span className="text-cyan-300 font-medium">physics-based dehazing</span>, detects marine hazards at 30 FPS, and dispatches automated AUV cleanup missions.
        </p>

        {/* Call to Actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={() => onLaunchDemo(0)}
            className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-black font-hud font-black text-base sm:text-lg rounded-2xl shadow-xl shadow-cyan-500/25 transition-all transform hover:scale-[1.03] active:scale-95 cursor-pointer"
          >
            <Eye className="w-6 h-6 text-black" />
            <span>LAUNCH LIVE DEMO</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
          </button>

          <button
            onClick={onOpenPitchDeck}
            className="flex items-center gap-2.5 px-6 py-4 bg-ocean-900/90 hover:bg-ocean-800/90 border border-ocean-700/80 hover:border-cyan-400/40 text-slate-200 font-hud font-bold text-sm sm:text-base rounded-2xl transition-all cursor-pointer backdrop-blur-md"
          >
            <Presentation className="w-5 h-5 text-cyan-400" />
            <span>10-SLIDE PITCH DECK</span>
          </button>
        </div>

        {/* Key Metrics Counter Strip */}
        <div className="mt-12 w-full grid grid-cols-2 md:grid-cols-4 gap-3 font-mono">
          <div className="glass-card p-4 rounded-xl text-center">
            <div className="text-2xl sm:text-3xl font-hud font-bold text-cyan-400">99.4%</div>
            <div className="text-[11px] text-slate-400 uppercase tracking-wider mt-1">Model Precision</div>
          </div>
          <div className="glass-card p-4 rounded-xl text-center">
            <div className="text-2xl sm:text-3xl font-hud font-bold text-emerald-400">&gt;30 FPS</div>
            <div className="text-[11px] text-slate-400 uppercase tracking-wider mt-1">Edge Inference</div>
          </div>
          <div className="glass-card p-4 rounded-xl text-center">
            <div className="text-2xl sm:text-3xl font-hud font-bold text-yellow-400">120 kHz</div>
            <div className="text-[11px] text-slate-400 uppercase tracking-wider mt-1">Sonar Frequency</div>
          </div>
          <div className="glass-card p-4 rounded-xl text-center">
            <div className="text-2xl sm:text-3xl font-hud font-bold text-teal-300">100%</div>
            <div className="text-[11px] text-slate-400 uppercase tracking-wider mt-1">Autonomous Offline</div>
          </div>
        </div>
      </section>

      {/* Bento Grid Showcase */}
      <section className="w-full max-w-6xl px-6 py-12 relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-hud text-cyan-400 font-bold mb-2">
            <Sparkles className="w-4 h-4" /> BENTO GRID SHOWCASE
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-hud text-white">
            Engineered for <span className="bg-gradient-to-r from-cyan-400 to-teal-300 bg-clip-text text-transparent">Extreme Subsea Conditions</span>
          </h2>
          <p className="mt-2 text-sm text-slate-400 max-w-xl mx-auto">
            Combining optical physics restoration, neural hazard isolation, and acoustic telemetry coordination.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Bento Card 1: Large 2-Column De-Hazing Showcase */}
          <div className="md:col-span-2 glass-card glass-card-hover p-6 sm:p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-mono font-bold border border-cyan-400/30">
                  PHYSICS-INFORMED AI
                </span>
                <span className="text-xs font-mono text-slate-400">Beer-Lambert Attenuation</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-hud text-white mb-2">
                Real-Time Spectral De-Hazing
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
                Underwater optical scattering absorbs red light within 5 meters. Our algorithm compensates for wavelength attenuation mathematically, restoring crisp true-color RGB imagery with interactive split-slider control.
              </p>
            </div>

            <div className="mt-6 p-4 rounded-2xl bg-ocean-950/80 border border-ocean-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400">
                  <Eye className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-hud font-bold text-white">Interactive Comparison Slider</div>
                  <div className="text-[11px] text-slate-400 font-mono">Instant side-by-side verification</div>
                </div>
              </div>
              <button
                onClick={() => onLaunchDemo(0)}
                className="px-4 py-2 bg-cyan-400 hover:bg-cyan-300 text-black font-hud text-xs font-bold rounded-xl transition cursor-pointer"
              >
                TRY SLIDER
              </button>
            </div>
          </div>

          {/* Bento Card 2: 120 kHz Sonar Radar */}
          <div className="glass-card glass-card-hover p-6 sm:p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-yellow-500/10 rounded-full blur-2xl pointer-events-none"></div>
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-300 text-xs font-mono font-bold border border-yellow-400/30">
                  ACOUSTIC TELEMETRY
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-ping"></span>
              </div>
              <h3 className="text-xl font-bold font-hud text-white mb-2">
                120 kHz Sonar Radar
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Optical feeds blind past 30 meters. AquaSentinel synthesizes spatial acoustic chirp pings via Web Audio API, enabling long-range obstacle avoidance.
              </p>
            </div>

            <div className="mt-6 flex items-center gap-3 p-3.5 rounded-2xl bg-ocean-950/80 border border-ocean-800">
              <div className="w-9 h-9 rounded-xl bg-yellow-500/20 text-yellow-400 flex items-center justify-center">
                <Radio className="w-5 h-5" />
              </div>
              <div className="text-xs font-mono text-slate-300">
                <span className="text-yellow-400 font-bold">120.4 kHz</span> Carrier Sweep
              </div>
            </div>
          </div>

          {/* Bento Card 3: Multimodal Vision & Hazard Detection */}
          <div className="glass-card glass-card-hover p-6 sm:p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-300 text-xs font-mono font-bold border border-red-400/30">
                  NEURAL SENTRY
                </span>
                <span className="text-xs font-mono text-slate-400">Zero-Shot Vision</span>
              </div>
              <h3 className="text-xl font-bold font-hud text-white mb-2">
                Hazard Classification
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Gemini Vision models categorize nylon ghost nets, microplastics, submerged chemical barrels, and protected marine fauna with confidence score gating.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-1.5 font-mono text-[10px]">
              <span className="px-2.5 py-1 rounded-lg bg-red-950/60 border border-red-500/40 text-red-300">Ghost Nets</span>
              <span className="px-2.5 py-1 rounded-lg bg-yellow-950/60 border border-yellow-500/40 text-yellow-300">Plastics</span>
              <span className="px-2.5 py-1 rounded-lg bg-red-950/60 border border-red-500/40 text-red-300">Hazmat</span>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300">Protected Fauna</span>
            </div>
          </div>

          {/* Bento Card 4: Large 2-Column Robotic Mission Dispatch */}
          <div className="md:col-span-2 glass-card glass-card-hover p-6 sm:p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold border border-emerald-400/30">
                  AUTONOMOUS FLEET
                </span>
                <span className="text-xs font-mono text-slate-400">ROS / MAVLink Compatible</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-hud text-white mb-2">
                Robotic AUV Mission Dispatch & Telemetry
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
                One-click dispatch creates verifiable mission orders with GPS coordinates, depth contours, robotic arm manipulator payloads, and downloadable PDF compliance inspection certificates.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3 font-mono text-center text-xs">
              <div className="p-3 rounded-xl bg-ocean-950/80 border border-ocean-800">
                <div className="text-cyan-400 font-bold">Standard JSON</div>
                <div className="text-[10px] text-slate-400">AUV Telemetry Orders</div>
              </div>
              <div className="p-3 rounded-xl bg-ocean-950/80 border border-ocean-800">
                <div className="text-emerald-400 font-bold">1-Click PDF</div>
                <div className="text-[10px] text-slate-400">Compliance Audit Certs</div>
              </div>
              <div className="p-3 rounded-xl bg-ocean-950/80 border border-ocean-800">
                <div className="text-yellow-400 font-bold">CSV Export</div>
                <div className="text-[10px] text-slate-400">Scientific GIS Logs</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Pre-Loaded Scenarios */}
      <section className="w-full max-w-6xl px-6 py-12 relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-hud text-cyan-400 font-bold mb-2">
            <Compass className="w-4 h-4" /> LIVE OPERATION THEATERS
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-hud text-white">
            Pre-Loaded <span className="text-cyan-400">Field Scenarios</span>
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            Launch directly into real-world environmental hotspots to test the perception pipeline live.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Scenario 1 */}
          <div className="glass-card glass-card-hover p-6 rounded-2xl border-red-500/30 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="flex items-center gap-1.5 text-xs font-hud font-bold text-red-400">
                  <Anchor className="w-4 h-4" /> CRITICAL ENTANGLEMENT
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 bg-red-950/80 rounded border border-red-800/40 text-red-300 font-semibold">-16.4m</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-300 transition">Dubai Coral Reef Ghost Net</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Arabian Gulf • 42.5 kg synthetic nylon gillnet smothering endangered brain coral colonies. High urgency rating.
              </p>
              <div className="text-[10px] font-mono text-slate-400 mb-4">
                GPS: 25.2048° N, 55.2708° E
              </div>
            </div>
            <button
              onClick={() => onLaunchDemo(0)}
              className="w-full flex items-center justify-center gap-2 py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 hover:border-red-400 text-red-200 font-hud text-xs font-bold rounded-xl transition cursor-pointer"
            >
              <Play className="w-3.5 h-3.5" />
              <span>LAUNCH SCENARIO 01</span>
            </button>
          </div>

          {/* Scenario 2 */}
          <div className="glass-card glass-card-hover p-6 rounded-2xl border-yellow-500/30 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="flex items-center gap-1.5 text-xs font-hud font-bold text-yellow-400">
                  <Fish className="w-4 h-4" /> PLASTIC DENSITY
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 bg-yellow-950/80 rounded border border-yellow-800/40 text-yellow-300 font-semibold">-28.2m</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-300 transition">Continental Shelf Plastics</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Indian Ocean Shelf • Dense cluster of PET bottles, degraded polymers, and aluminum drink cans.
              </p>
              <div className="text-[10px] font-mono text-slate-400 mb-4">
                GPS: 09.9312° N, 76.2673° E
              </div>
            </div>
            <button
              onClick={() => onLaunchDemo(1)}
              className="w-full flex items-center justify-center gap-2 py-3 bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/50 hover:border-yellow-400 text-yellow-200 font-hud text-xs font-bold rounded-xl transition cursor-pointer"
            >
              <Play className="w-3.5 h-3.5" />
              <span>LAUNCH SCENARIO 02</span>
            </button>
          </div>

          {/* Scenario 3 */}
          <div className="glass-card glass-card-hover p-6 rounded-2xl border-red-500/30 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="flex items-center gap-1.5 text-xs font-hud font-bold text-red-400">
                  <ShieldAlert className="w-4 h-4" /> INDUSTRIAL HAZMAT
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 bg-red-950/80 rounded border border-red-800/40 text-red-300 font-semibold">-11.8m</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-300 transition">Jebel Ali Toxic Canister</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Dubai Harbor • Corroded industrial chemical barrel in immediate proximity to a protected resident sea turtle.
              </p>
              <div className="text-[10px] font-mono text-slate-400 mb-4">
                GPS: 25.0112° N, 55.0610° E
              </div>
            </div>
            <button
              onClick={() => onLaunchDemo(2)}
              className="w-full flex items-center justify-center gap-2 py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 hover:border-red-400 text-red-200 font-hud text-xs font-bold rounded-xl transition cursor-pointer"
            >
              <Play className="w-3.5 h-3.5" />
              <span>LAUNCH SCENARIO 03</span>
            </button>
          </div>
        </div>
      </section>

      {/* Architecture Visual */}
      <section className="w-full max-w-5xl px-6 py-8 relative z-10">
        <div className="glass-card p-6 rounded-2xl border border-cyan-400/20">
          <div className="flex items-center gap-2 mb-4 text-xs font-hud text-cyan-400 font-bold">
            <Cpu className="w-4 h-4" />
            <span>AUTONOMOUS SUBSEA PIPELINE ARCHITECTURE</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-mono text-[11px]">
            <div className="p-3.5 bg-ocean-950/90 rounded-xl border border-ocean-800">
              <div className="text-cyan-400 font-bold mb-1 text-xs">1. OPTICAL FEED</div>
              <div className="text-slate-400">AUV / ROV camera feed or multi-spectral sensor input</div>
            </div>
            <div className="p-3.5 bg-ocean-950/90 rounded-xl border border-ocean-800">
              <div className="text-cyan-400 font-bold mb-1 text-xs">2. SPECTRAL DEHAZE</div>
              <div className="text-slate-400">Beer-Lambert red compensation & contrast boost</div>
            </div>
            <div className="p-3.5 bg-ocean-950/90 rounded-xl border border-ocean-800">
              <div className="text-cyan-400 font-bold mb-1 text-xs">3. GEMINI VISION</div>
              <div className="text-slate-400">Multi-class debris & protected fauna classification</div>
            </div>
            <div className="p-3.5 bg-ocean-950/90 rounded-xl border border-ocean-800">
              <div className="text-cyan-400 font-bold mb-1 text-xs">4. ROBOTIC DISPATCH</div>
              <div className="text-slate-400">Autonomous AUV cleanup telemetry orders</div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="w-full max-w-5xl px-6 py-10 relative z-10">
        <div className="p-8 sm:p-12 bg-gradient-to-br from-cyan-950/50 via-ocean-900/80 to-ocean-950/90 border border-cyan-400/30 rounded-3xl text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none"></div>
          <h2 className="text-2xl sm:text-4xl font-black font-hud text-white mb-3">
            Ready to Take Command?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-lg mx-auto mb-8 font-sans">
            Test real-time dehazing, trigger acoustic 120 kHz sonar pings, and generate automated AUV robotic cleanup orders.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => onLaunchDemo(0)}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 text-black font-hud font-bold text-base rounded-2xl shadow-xl shadow-cyan-400/25 transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Radio className="w-5 h-5" />
              <span>ENTER COMMAND CENTER</span>
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={onOpenPitchDeck}
              className="inline-flex items-center gap-2.5 px-6 py-4 bg-ocean-900/90 hover:bg-ocean-800/90 border border-ocean-700/80 text-slate-200 font-hud font-bold text-sm rounded-2xl transition cursor-pointer"
            >
              <Presentation className="w-4 h-4 text-cyan-400" />
              <span>VIEW PITCH DECK</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full max-w-5xl px-6 py-6 border-t border-ocean-800/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 font-mono relative z-10">
        <div className="flex items-center gap-2">
          <span>© 2026 AquaSentinel AI</span>
          <span>•</span>
          <span className="text-cyan-400/80">SubSea Vision Engine</span>
        </div>
        <div>NOVA 2026 Grand Finale • BITS Pilani Dubai Campus</div>
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
