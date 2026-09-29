import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Anchor, Waves, Cpu, ShieldAlert, Sparkles, Keyboard } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const PitchDeckModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        setCurrentSlide(c => Math.min(9, c + 1));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrentSlide(c => Math.max(0, c - 1));
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const slides = [
    {
      title: "AquaSentinel AI (SubSea Vision / بحر-سنتينل)",
      subtitle: "Autonomous Underwater Marine Debris & Ecological Anomaly Detection System",
      tag: "Global Innovation • Track C: Sustainable Technologies",
      content: (
        <div className="flex flex-col items-center justify-center text-center space-y-4 py-8">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-sky-500 to-teal-500 text-white flex items-center justify-center text-4xl font-bold shadow-md shadow-sky-500/20">
            🌊
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 font-hud">AquaSentinel AI</h2>
          <p className="text-base text-slate-600 font-medium max-w-xl">
            Autonomous Underwater Debris Tracking, Physics-Based Spectral Dehazing, and AUV Fleet Mission Dispatch
          </p>
          <div className="flex flex-wrap gap-2 justify-center pt-2">
            <span className="px-3 py-1 bg-slate-100 border border-slate-200 rounded-full text-xs text-slate-700 font-medium">Global Innovation & DeepTech</span>
            <span className="px-3 py-1 bg-slate-100 border border-slate-200 rounded-full text-xs text-slate-700 font-medium">BITS Pilani Dubai Grand Finale</span>
            <span className="px-3 py-1 bg-sky-50 border border-sky-200 rounded-full text-xs text-sky-800 font-bold">UN SDG 14: Life Below Water</span>
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
          <div className="bg-slate-50 p-5 rounded-2xl border border-red-200">
            <div className="text-red-600 text-2xl font-bold font-hud mb-2">640,000 Tons</div>
            <p className="text-slate-600 text-xs leading-relaxed">
              Of abandoned <strong>Ghost Fishing Nets</strong> drift through oceans annually, trapping and killing hundreds of thousands of endangered turtles, dolphins, and coral reefs.
            </p>
          </div>
          <div className="bg-slate-50 p-5 rounded-2xl border border-amber-200">
            <div className="text-amber-700 text-2xl font-bold font-hud mb-2">14 Million Tons</div>
            <p className="text-slate-600 text-xs leading-relaxed">
              Of plastic debris accumulate on continental seabeds, fragmenting into toxic microplastics that enter the human food chain.
            </p>
          </div>
          <div className="bg-slate-50 p-5 rounded-2xl border border-sky-200">
            <div className="text-sky-700 text-2xl font-bold font-hud mb-2">Optical Fog</div>
            <p className="text-slate-600 text-xs leading-relaxed">
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
        <div className="space-y-4 py-4 text-xs text-slate-700">
          <div className="p-4 bg-sky-50 border border-sky-200 rounded-2xl">
            <h4 className="text-sky-900 font-bold text-base font-hud mb-1">
              End-to-End Autonomous Underwater Video Analytics
            </h4>
            <p className="text-slate-600 text-xs">
              AquaSentinel combines real-time spectral color restoration (compensating for red-light loss) with deep learning classification to locate hazards and automatically dispatch autonomous cleanup missions.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="text-xl mb-1">🎨</div>
              <div className="font-bold text-slate-900">Spectral Dehaze</div>
              <div className="text-[10px] text-slate-500">Restores true RGB</div>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="text-xl mb-1">🚨</div>
              <div className="font-bold text-slate-900">Ghost Net Sentry</div>
              <div className="text-[10px] text-slate-500">Strangulation alert</div>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="text-xl mb-1">📊</div>
              <div className="font-bold text-slate-900">MPI Gauge</div>
              <div className="text-[10px] text-slate-500">Pollution density</div>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="text-xl mb-1">🤖</div>
              <div className="font-bold text-slate-900">AUV Dispatch</div>
              <div className="text-[10px] text-slate-500">Automated robotics</div>
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
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 font-mono text-xs text-slate-700 space-y-3 py-4">
          <div className="flex items-center gap-2 text-sky-700 font-bold">
            <Cpu className="w-4 h-4" /> Autonomous Processing Flow
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2.5 pt-2 text-[11px]">
            <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-sm">
              <div className="text-sky-700 font-bold mb-1">1. Optical Ingestion</div>
              <div>AUV / ROV camera feed or multi-spectral sensor input</div>
            </div>
            <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-sm">
              <div className="text-sky-700 font-bold mb-1">2. Dehazing Engine</div>
              <div>Red-channel physical compensation & contrast boost</div>
            </div>
            <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-sm">
              <div className="text-sky-700 font-bold mb-1">3. Neural Detector</div>
              <div>Multi-class debris & protected marine fauna tagging</div>
            </div>
            <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-sm">
              <div className="text-sky-700 font-bold mb-1">4. Mission Dispatch</div>
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
        <div className="space-y-3 py-4 text-xs text-slate-700">
          <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <Sparkles className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 text-sm">Physics-Informed Spectral Dehazing:</strong>
              <p className="text-slate-600 mt-1">Unlike generic image filters, our algorithm mathematically models selective light attenuation ($Beer-Lambert\ Law$) to dynamically reconstruct lost red-wavelength photons.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <ShieldAlert className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 text-sm">Ghost Net Entanglement Detection:</strong>
              <p className="text-slate-600 mt-1">Nylon nets blend into coral reefs. Our model isolates diamond-mesh lattice geometry even when heavily camouflaged by algae growth.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <Anchor className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 text-sm">Marine Life Co-Existence Guard:</strong>
              <p className="text-slate-600 mt-1">Automatically aborts aggressive robotic interventions if protected sea turtles or dugongs are detected within the operational perimeter.</p>
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
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="text-sky-700 font-bold font-hud">🌊 Optical Intelligence</div>
            <ul className="space-y-1 text-slate-600">
              <li>• <strong>Interactive Split-Slider</strong>: Real-time side-by-side comparison</li>
              <li>• <strong>3 Realistic Scenarios</strong>: Dubai Coast, Indian Ocean, Jebel Ali</li>
              <li>• <strong>120 kHz Sonar Radar</strong> with live sweep blips</li>
            </ul>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="text-emerald-700 font-bold font-hud">⚡ AI Command & Control</div>
            <ul className="space-y-1 text-slate-600">
              <li>• <strong>Confidence Threshold Slider</strong> (50–95%)</li>
              <li>• <strong>Class Filter Chips</strong>: Nets / Plastics / Toxics / Fauna</li>
              <li>• <strong>AI Mission Briefing</strong>: Natural language threat summary</li>
            </ul>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="text-amber-700 font-bold font-hud">📊 Analytics & Export</div>
            <ul className="space-y-1 text-slate-600">
              <li>• <strong>Marine Pollution Index</strong> (0–100 dynamic gauge)</li>
              <li>• <strong>Cumulative Expedition Metrics</strong></li>
              <li>• <strong>1-Click PDF Report + CSV Export</strong></li>
            </ul>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="text-red-700 font-bold font-hud">🔊 Immersive Experience</div>
            <ul className="space-y-1 text-slate-600">
              <li>• <strong>Sonar Ping Audio</strong> synthesized via Web Audio API</li>
              <li>• <strong>Critical Threat Alarm</strong> on severe hazards</li>
              <li>• <strong>Mission Event Log</strong>: Real-time scrolling event ticker</li>
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
        <div className="space-y-3 py-4 text-xs text-slate-700">
          <p>AquaSentinel is architected for low-compute edge deployment aboard underwater vehicles:</p>
          <div className="grid grid-cols-3 gap-3 pt-2 text-center font-mono">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="text-2xl font-bold text-sky-700">&gt;30 FPS</div>
              <div className="text-xs text-slate-500 mt-1">Real-Time Inference</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="text-2xl font-bold text-emerald-700">Edge-Ready</div>
              <div className="text-xs text-slate-500 mt-1">NVIDIA Jetson / WASM</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="text-2xl font-bold text-amber-700">100%</div>
              <div className="text-xs text-slate-500 mt-1">Offline Autonomous Mode</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Regional Dubai, UAE & Global Ocean Impact",
      subtitle: "Aligning with Arabian Gulf Conservation, International Treaties, and UN SDG 14",
      tag: "Slide 8: Regional Impact",
      content: (
        <div className="space-y-3 py-4 text-xs text-slate-700">
          <div className="p-4 bg-sky-50 border border-sky-200 rounded-xl">
            <strong className="text-sky-900">Arabian Gulf & Dubai Marine Environment:</strong>
            <p className="text-xs text-slate-600 mt-1">
              Supports the UAE’s Marine Protected Areas (MPAs), safeguarding Arabian Gulf coral reefs and the world’s second-largest dugong population.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <strong className="text-slate-900">Global Coastal Protection Action</strong>
              <p className="text-slate-600 mt-1">Directly addresses coastal plastic hotspots and vulnerable river delta outflows globally.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <strong className="text-slate-900">COP28 Ocean Action Continuity</strong>
              <p className="text-slate-600 mt-1">Advances global plastic treaty accountability through verified geo-tagged telemetry.</p>
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
        <div className="space-y-2.5 py-4 text-xs font-mono text-slate-700">
          <div className="p-3 bg-slate-50 rounded-xl border-l-4 border-sky-600">
            <strong className="text-sky-800">Phase 1: NOVA 2026 Submission (Current)</strong>
            <div className="text-slate-600 mt-0.5">Functional web simulation, spectral dehazing, multi-class debris detection, and AUV telemetry order generator.</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border-l-4 border-emerald-600">
            <strong className="text-emerald-800">Phase 2: Dubai Finale Live Field Test (Nov 2026)</strong>
            <div className="text-slate-600 mt-0.5">Demonstration on underwater drone footage with BITS Pilani Dubai ocean engineering faculty.</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border-l-4 border-amber-600">
            <strong className="text-amber-800">Phase 3: Port & Naval Drone Swarm Integration (2027)</strong>
            <div className="text-slate-600 mt-0.5">Autonomous multi-vehicle fleet coordination for 24/7 harbor defense and plastic recovery.</div>
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
          <div className="inline-flex p-3 rounded-full bg-sky-100 text-sky-700 mb-1">
            <Waves className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 font-hud">Invent the Infinite with AquaSentinel</h3>
          <p className="text-slate-600 text-xs max-w-lg mx-auto">
            A state-of-the-art environmental intelligence platform ready for the international grand jury at BITS Pilani Dubai.
          </p>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 inline-block text-left text-xs font-mono text-slate-700">
            <div>• <strong>Theme:</strong> Sustainable & Next-Gen Technologies / DeepTech</div>
            <div>• <strong>Organizer:</strong> KVGCE Sphere Hive × Microsoft Club, BITS Dubai</div>
            <div>• <strong>Global Goal:</strong> UN SDG 14: Life Below Water</div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Progress Bar */}
        <div className="w-full h-1 bg-slate-100 overflow-hidden">
          <div
            className="h-full bg-sky-600 transition-all duration-300"
            style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/80">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-sky-100 text-sky-800 font-hud text-xs font-bold border border-sky-200">
              {slides[currentSlide].tag}
            </span>
            <span className="text-slate-500 text-xs font-mono">
              Slide {currentSlide + 1} of {slides.length}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:flex items-center gap-1 text-[11px] font-mono text-slate-500">
              <Keyboard className="w-3.5 h-3.5 text-sky-600" />
              <span>Use ← / → keys</span>
            </span>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-200 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Slide Body */}
        <div className="flex-1 p-6 sm:p-8 overflow-y-auto">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1 font-hud">
            {slides[currentSlide].title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mb-4">
            {slides[currentSlide].subtitle}
          </p>

          <div className="mt-4">
            {slides[currentSlide].content}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between px-6 py-3.5 border-t border-slate-200 bg-slate-50">
          <button
            disabled={currentSlide === 0}
            onClick={() => setCurrentSlide(c => Math.max(0, c - 1))}
            className="flex items-center gap-1 px-4 py-2 bg-slate-200 hover:bg-slate-300 disabled:opacity-40 disabled:cursor-not-allowed text-slate-800 text-xs font-semibold rounded-xl transition font-mono cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  i === currentSlide ? 'w-6 bg-sky-600' : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>

          <button
            disabled={currentSlide === slides.length - 1}
            onClick={() => setCurrentSlide(c => Math.min(slides.length - 1, c + 1))}
            className="flex items-center gap-1 px-4 py-2 bg-sky-600 hover:bg-sky-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold rounded-xl transition font-mono cursor-pointer shadow-sm"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
