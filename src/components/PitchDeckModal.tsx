import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Anchor, Waves, Cpu, ShieldAlert, Sparkles } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const PitchDeckModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!isOpen) return null;

  const slides = [
    {
      title: "AquaSentinel AI (SubSea Vision / بحر-سنتينل)",
      subtitle: "Autonomous Underwater Marine Debris & Ecological Anomaly Detection System",
      tag: "NOVA 2026 & SIH (Ministry of Earth Sciences)",
      content: (
        <div className="flex flex-col items-center justify-center text-center space-y-4 py-8">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-400 to-teal-500 text-black flex items-center justify-center text-4xl font-bold shadow-lg shadow-cyan-400/20">
            🌊
          </div>
          <h2 className="text-3xl font-extrabold text-white font-hud">AquaSentinel AI</h2>
          <p className="text-lg text-cyan-300 font-medium max-w-xl">
            Autonomous Underwater Debris Tracking, Physics-Based Spectral Dehazing, and AUV Fleet Mission Dispatch
          </p>
          <div className="flex flex-wrap gap-2 justify-center pt-2">
            <span className="px-3 py-1 bg-ocean-900 border border-ocean-700 rounded-full text-xs text-slate-300">Ministry of Earth Sciences (MoES) PS</span>
            <span className="px-3 py-1 bg-ocean-900 border border-ocean-700 rounded-full text-xs text-slate-300">BITS Pilani Dubai Grand Finale</span>
            <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-400/30 rounded-full text-xs text-cyan-400 font-bold">UN SDG 14: Life Below Water</span>
          </div>
        </div>
      ),
    },
    {
      title: "The Crisis: Our Oceans are Choking in the Dark",
      subtitle: "Ghost gear and toxic waste cause irreversible marine destruction",
      tag: "Slide 2: The Problem",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-6">
          <div className="bg-ocean-950 p-5 rounded-xl border border-red-500/30">
            <div className="text-red-400 text-2xl font-bold font-hud mb-2">640,000 Tons</div>
            <p className="text-slate-300 text-xs leading-relaxed">
              Of abandoned <strong>Ghost Fishing Nets</strong> drift through oceans annually, trapping and killing hundreds of thousands of endangered turtles, dolphins, and coral reefs.
            </p>
          </div>
          <div className="bg-ocean-950 p-5 rounded-xl border border-yellow-500/30">
            <div className="text-yellow-400 text-2xl font-bold font-hud mb-2">14 Million Tons</div>
            <p className="text-slate-300 text-xs leading-relaxed">
              Of plastic debris accumulate on continental seabeds, fragmenting into toxic microplastics that enter the human food chain.
            </p>
          </div>
          <div className="bg-ocean-950 p-5 rounded-xl border border-cyan-500/30">
            <div className="text-cyan-400 text-2xl font-bold font-hud mb-2">Optical Fog</div>
            <p className="text-slate-300 text-xs leading-relaxed">
              Underwater optical attenuation rapidly absorbs red light, creating a murky green-blue veil that blinds conventional cameras and human divers.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "The Solution: AquaSentinel AI",
      subtitle: "Autonomous perception engine for oceanic survey and robotic intervention",
      tag: "Slide 3: The Solution",
      content: (
        <div className="space-y-4 py-4 text-xs text-slate-300">
          <div className="p-4 bg-cyan-500/10 border border-cyan-400/30 rounded-xl">
            <h4 className="text-cyan-400 font-bold text-base font-hud mb-1">
              End-to-End Autonomous Underwater Video Analytics
            </h4>
            <p className="text-slate-300 text-xs">
              AquaSentinel combines real-time spectral color restoration (compensating for red-light loss) with deep learning classification to locate hazards and automatically dispatch autonomous cleanup missions.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
            <div className="bg-ocean-950 p-3 rounded-lg border border-ocean-800">
              <div className="text-xl mb-1">🎨</div>
              <div className="font-bold text-white">Spectral Dehaze</div>
              <div className="text-[10px] text-slate-400">Restores true RGB</div>
            </div>
            <div className="bg-ocean-950 p-3 rounded-lg border border-ocean-800">
              <div className="text-xl mb-1">🚨</div>
              <div className="font-bold text-white">Ghost Net Sentry</div>
              <div className="text-[10px] text-slate-400">Strangulation alert</div>
            </div>
            <div className="bg-ocean-950 p-3 rounded-lg border border-ocean-800">
              <div className="text-xl mb-1">📊</div>
              <div className="font-bold text-white">MPI Gauge</div>
              <div className="text-[10px] text-slate-400">Pollution density</div>
            </div>
            <div className="bg-ocean-950 p-3 rounded-lg border border-ocean-800">
              <div className="text-xl mb-1">🤖</div>
              <div className="font-bold text-white">AUV Dispatch</div>
              <div className="text-[10px] text-slate-400">Automated robotics</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "System Architecture & Processing Pipeline",
      subtitle: "Real-time edge ingestion to telemetry coordination",
      tag: "Slide 4: Architecture",
      content: (
        <div className="bg-ocean-950 p-4 rounded-xl border border-ocean-800 font-mono text-xs text-slate-300 space-y-3 py-4">
          <div className="flex items-center gap-2 text-cyan-400 font-bold">
            <Cpu className="w-4 h-4" /> Autonomous Processing Flow
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 pt-2 text-[11px]">
            <div className="p-3 bg-ocean-900 rounded border border-ocean-800">
              <div className="text-cyan-400 font-bold mb-1">1. Optical Ingestion</div>
              <div>AUV / ROV camera feed or multi-spectral sensor input</div>
            </div>
            <div className="p-3 bg-ocean-900 rounded border border-ocean-800">
              <div className="text-cyan-400 font-bold mb-1">2. Dehazing Engine</div>
              <div>Red-channel physical compensation & contrast boost</div>
            </div>
            <div className="p-3 bg-ocean-900 rounded border border-ocean-800">
              <div className="text-cyan-400 font-bold mb-1">3. Neural Detector</div>
              <div>Multi-class debris & protected marine fauna tagging</div>
            </div>
            <div className="p-3 bg-ocean-900 rounded border border-ocean-800">
              <div className="text-cyan-400 font-bold mb-1">4. Mission Dispatch</div>
              <div>Telemetry routing to autonomous manipulator robots</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Core Innovation & Technological Moat",
      subtitle: "Overcoming physical underwater optical barriers",
      tag: "Slide 5: Innovation",
      content: (
        <div className="space-y-3 py-4 text-xs text-slate-300">
          <div className="flex items-start gap-3 p-3 bg-ocean-950/80 rounded-lg border border-ocean-800">
            <Sparkles className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white text-sm">Physics-Informed Spectral Dehazing:</strong>
              <p className="text-slate-400 mt-1">Unlike generic image filters, our algorithm mathematically models selective light attenuation ($Beer-Lambert\ Law$) to dynamically reconstruct lost red-wavelength photons.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-ocean-950/80 rounded-lg border border-ocean-800">
            <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white text-sm">Ghost Net Entanglement Detection:</strong>
              <p className="text-slate-400 mt-1">Nylon nets blend into coral reefs. Our model isolates diamond-mesh lattice geometry even when heavily camouflaged by algae growth.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-ocean-950/80 rounded-lg border border-ocean-800">
            <Anchor className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white text-sm">Marine Life Co-Existence Guard:</strong>
              <p className="text-slate-400 mt-1">Automatically aborts aggressive robotic interventions if protected sea turtles or dugongs are detected within the operational perimeter.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Live Working Prototype — 8 Winning Features",
      subtitle: "Zero hardware required — runs in any browser, works offline",
      tag: "Slide 6: Live Demo",
      content: (
        <div className="grid grid-cols-2 gap-3 py-4 text-xs">
          <div className="bg-ocean-950 p-3.5 rounded-xl border border-ocean-800 space-y-2">
            <div className="text-cyan-400 font-bold font-hud">🌊 Optical Intelligence</div>
            <ul className="space-y-1 text-slate-300">
              <li>• <strong>Interactive Split-Slider</strong>: Drag to compare raw vs AI-restored in real time</li>
              <li>• <strong>3 HD Scenarios</strong>: Dubai Ghost Net, Indian Ocean Plastics, Jebel Ali Toxic Drum</li>
              <li>• <strong>120 kHz Sonar Radar</strong> with live sweep & target blips</li>
            </ul>
          </div>
          <div className="bg-ocean-950 p-3.5 rounded-xl border border-ocean-800 space-y-2">
            <div className="text-emerald-400 font-bold font-hud">⚡ AI Command & Control</div>
            <ul className="space-y-1 text-slate-300">
              <li>• <strong>Confidence Threshold Slider</strong> (50–95%)</li>
              <li>• <strong>Class Filter Chips</strong>: Nets / Plastics / Toxics / Fauna</li>
              <li>• <strong>AI Mission Briefing</strong>: Natural language threat summary</li>
            </ul>
          </div>
          <div className="bg-ocean-950 p-3.5 rounded-xl border border-ocean-800 space-y-2">
            <div className="text-yellow-400 font-bold font-hud">📊 Analytics & Export</div>
            <ul className="space-y-1 text-slate-300">
              <li>• <strong>Marine Pollution Index</strong> (0–100 dynamic gauge)</li>
              <li>• <strong>Cumulative Expedition Metrics</strong></li>
              <li>• <strong>1-Click PDF Report + CSV Export</strong></li>
            </ul>
          </div>
          <div className="bg-ocean-950 p-3.5 rounded-xl border border-ocean-800 space-y-2">
            <div className="text-red-400 font-bold font-hud">🔊 Immersive Experience</div>
            <ul className="space-y-1 text-slate-300">
              <li>• <strong>Sonar Ping Audio</strong> synthesized via Web Audio API</li>
              <li>• <strong>Critical Threat Alarm</strong> on ghost net / toxic detection</li>
              <li>• <strong>Mission Event Log</strong>: Live scrolling operation ticker</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: "Feasibility & Deployment Roadmap",
      subtitle: "Edge-ready for commercial ROVs, research ships, and ports",
      tag: "Slide 7: Feasibility",
      content: (
        <div className="space-y-3 py-4 text-xs text-slate-300">
          <p>AquaSentinel is architected for low-compute edge deployment aboard underwater vehicles:</p>
          <div className="grid grid-cols-3 gap-3 pt-2 text-center font-mono">
            <div className="p-3 bg-ocean-950 rounded-lg border border-ocean-800">
              <div className="text-xl font-bold text-cyan-400">&gt;30 FPS</div>
              <div className="text-[10px] text-slate-400">Real-Time Inference</div>
            </div>
            <div className="p-3 bg-ocean-950 rounded-lg border border-ocean-800">
              <div className="text-xl font-bold text-emerald-400">Edge-Ready</div>
              <div className="text-[10px] text-slate-400">NVIDIA Jetson / WebAssembly</div>
            </div>
            <div className="p-3 bg-ocean-950 rounded-lg border border-ocean-800">
              <div className="text-xl font-bold text-yellow-400">100%</div>
              <div className="text-[10px] text-slate-400">Offline Autonomous Mode</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Regional Dubai, UAE & Indian Ocean Impact",
      subtitle: "Aligning with MoES, Arabian Gulf Conservation, and UN SDG 14",
      tag: "Slide 8: Regional Impact",
      content: (
        <div className="space-y-3 py-4 text-xs text-slate-300">
          <div className="p-3 bg-cyan-950/60 border border-cyan-500/30 rounded-xl">
            <strong className="text-cyan-300">Arabian Gulf & Dubai Marine Environment:</strong>
            <p className="text-[11px] text-slate-300 mt-1">
              Supports the UAE’s Marine Protected Areas (MPAs), safeguarding Arabian Gulf coral reefs and the world’s second-largest dugong population.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-[11px]">
            <div className="p-3 bg-ocean-950 rounded-lg border border-ocean-800">
              <strong className="text-white">MoES 'Clean Sea' Charter (India)</strong>
              <p className="text-slate-400 mt-1">Directly addresses coastal plastic hotspots along the 7,500 km Indian coastline.</p>
            </div>
            <div className="p-3 bg-ocean-950 rounded-lg border border-ocean-800">
              <strong className="text-white">COP28 Ocean Action Continuity</strong>
              <p className="text-slate-400 mt-1">Advances global plastic treaty accountability through verified geo-tagged telemetry.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Product Roadmap & Commercial Milestones",
      subtitle: "From hackathon prototype to maritime deployment",
      tag: "Slide 9: Roadmap",
      content: (
        <div className="space-y-2.5 py-4 text-xs font-mono text-slate-300">
          <div className="p-2.5 bg-ocean-950 rounded-lg border-l-4 border-cyan-400">
            <strong className="text-cyan-400">Phase 1: NOVA 2026 Submission (Current)</strong>
            <div className="text-[11px] text-slate-400">Functional web simulation, spectral dehazing, multi-class debris detection, and AUV telemetry order generator.</div>
          </div>
          <div className="p-2.5 bg-ocean-950 rounded-lg border-l-4 border-emerald-400">
            <strong className="text-emerald-400">Phase 2: Dubai Finale Live Field Test (Nov 2026)</strong>
            <div className="text-[11px] text-slate-400">Demonstration on underwater drone footage with BITS Pilani Dubai ocean engineering faculty.</div>
          </div>
          <div className="p-2.5 bg-ocean-950 rounded-lg border-l-4 border-yellow-400">
            <strong className="text-yellow-400">Phase 3: Port & Naval Drone Swarm Integration (2027)</strong>
            <div className="text-[11px] text-slate-400">Autonomous multi-vehicle fleet coordination for 24/7 harbor defense and plastic recovery.</div>
          </div>
        </div>
      ),
    },
    {
      title: "Team & Final Conclusion",
      subtitle: "Protecting the blue heart of our planet with AI",
      tag: "Slide 10: Conclusion",
      content: (
        <div className="text-center py-6 space-y-4">
          <div className="inline-flex p-3 rounded-full bg-cyan-500/20 text-cyan-400 mb-1">
            <Waves className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-white font-hud">Invent the Infinite with AquaSentinel</h3>
          <p className="text-slate-400 text-xs max-w-lg mx-auto">
            A state-of-the-art environmental intelligence platform ready for the international grand jury at BITS Pilani Dubai.
          </p>
          <div className="p-3.5 bg-ocean-950 rounded-xl border border-ocean-800 inline-block text-left text-xs font-mono">
            <div>• <strong>Theme:</strong> Sustainable & Next-Gen Technologies / DeepTech</div>
            <div>• <strong>Organizer:</strong> KVGCE Sphere Hive × Microsoft Club, BITS Dubai</div>
            <div>• <strong>SIH Track:</strong> Ministry of Earth Sciences (MoES)</div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
      <div className="relative w-full max-w-4xl bg-ocean-950 border border-ocean-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-ocean-800 bg-ocean-900">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-400 font-hud text-xs font-bold border border-cyan-400/30">
              {slides[currentSlide].tag}
            </span>
            <span className="text-slate-400 text-xs font-mono">
              Slide {currentSlide + 1} of {slides.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-ocean-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Slide Body */}
        <div className="flex-1 p-6 sm:p-8 overflow-y-auto">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 font-hud">
            {slides[currentSlide].title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mb-4">
            {slides[currentSlide].subtitle}
          </p>

          <div className="mt-4">
            {slides[currentSlide].content}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-ocean-800 bg-ocean-900">
          <button
            disabled={currentSlide === 0}
            onClick={() => setCurrentSlide(c => Math.max(0, c - 1))}
            className="flex items-center gap-1 px-4 py-2 bg-ocean-800 hover:bg-ocean-700 disabled:opacity-30 disabled:cursor-not-allowed text-white text-xs font-semibold rounded-lg transition font-mono"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-2 rounded-full transition-all ${
                  i === currentSlide ? 'w-6 bg-cyan-400' : 'w-2 bg-ocean-800 hover:bg-slate-500'
                }`}
              />
            ))}
          </div>

          <button
            disabled={currentSlide === slides.length - 1}
            onClick={() => setCurrentSlide(c => Math.min(slides.length - 1, c + 1))}
            className="flex items-center gap-1 px-4 py-2 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-30 disabled:cursor-not-allowed text-black text-xs font-bold rounded-lg transition font-mono"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
