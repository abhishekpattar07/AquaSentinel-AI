import React, { useState, useEffect, useRef } from 'react';
import {
  Waves,
  Anchor,
  Eye,
  Radio,
  Fish,
  ShieldAlert,
  Sparkles,
  ChevronRight,
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

/**
 * 🌊 OceanHeroCanvas: Continuous 60fps living ocean caustics & particle simulation
 * Renders shimmering sunlight water rays, buoyant micro-bubbles, and reactive water ripples.
 */
const OceanHeroCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle system: 38 buoyant bubbles & glowing plankton
    const particles = Array.from({ length: 38 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 3 + 1,
      speedY: Math.random() * 0.7 + 0.3,
      speedX: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.45 + 0.25,
      wobbleSpeed: Math.random() * 0.02 + 0.01,
      wobbleOffset: Math.random() * Math.PI * 2,
    }));

    let mouseX = width / 2;
    let mouseY = height * 0.35;
    let targetX = mouseX;
    let targetY = mouseY;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    let time = 0;
    const render = () => {
      time += 0.018;
      mouseX += (targetX - mouseX) * 0.06;
      mouseY += (targetY - mouseY) * 0.06;

      ctx.clearRect(0, 0, width, height);

      // 1. Shimmering sunlight rays / water caustics
      for (let i = 0; i < 4; i++) {
        const rayAngle = -0.16 + Math.sin(time * 0.35 + i * 1.2) * 0.05;
        const rayX = width * (0.18 + i * 0.24) + Math.cos(time * 0.25 + i) * 35;
        const grad = ctx.createLinearGradient(
          rayX,
          0,
          rayX + Math.tan(rayAngle) * height,
          height
        );
        grad.addColorStop(0, 'rgba(14, 165, 233, 0.14)');
        grad.addColorStop(0.45, 'rgba(20, 184, 166, 0.07)');
        grad.addColorStop(1, 'rgba(248, 250, 252, 0)');

        ctx.save();
        ctx.fillStyle = grad;
        ctx.beginPath();
        const topW = 45 + i * 18;
        const botW = 150 + i * 40;
        ctx.moveTo(rayX - topW / 2, 0);
        ctx.lineTo(rayX + topW / 2, 0);
        ctx.lineTo(rayX + Math.tan(rayAngle) * height + botW / 2, height);
        ctx.lineTo(rayX + Math.tan(rayAngle) * height - botW / 2, height);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      // 2. Interactive fluid cursor wake
      const rippleGrad = ctx.createRadialGradient(
        mouseX,
        mouseY,
        0,
        mouseX,
        mouseY,
        260
      );
      rippleGrad.addColorStop(0, 'rgba(2, 132, 199, 0.09)');
      rippleGrad.addColorStop(0.6, 'rgba(13, 148, 136, 0.04)');
      rippleGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = rippleGrad;
      ctx.fillRect(0, 0, width, height);

      // 3. Floating buoyant bubbles
      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += Math.sin(time * p.wobbleSpeed * 60 + p.wobbleOffset) * 0.45 + p.speedX;

        if (p.y < -15) {
          p.y = height + 15;
          p.x = Math.random() * width;
        }
        if (p.x < -15) p.x = width + 15;
        if (p.x > width + 15) p.x = -15;

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(2, 132, 199, ${p.opacity * 0.55})`;
        ctx.fill();

        if (p.radius > 2) {
          ctx.beginPath();
          ctx.arc(p.x - p.radius * 0.3, p.y - p.radius * 0.3, p.radius * 0.35, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity * 0.9})`;
          ctx.fill();
        }
        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.9 }}
    />
  );
};

export const LandingPage: React.FC<Props> = ({ onLaunchDemo, onOpenPitchDeck }) => {
  const [introState, setIntroState] = useState<'intro' | 'intro-play' | 'done'>('intro');

  const triggerEntrance = () => {
    setIntroState('intro');
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIntroState('intro-play');
      });
    });
    setTimeout(() => {
      setIntroState('done');
    }, 2200);
  };

  useEffect(() => {
    triggerEntrance();
  }, []);

  const introClass = introState === 'intro' ? 'intro' : introState === 'intro-play' ? 'intro intro-play' : '';

  return (
    <div className={`min-h-screen bg-slate-50 text-slate-900 flex flex-col items-center overflow-x-hidden selection:bg-sky-500 selection:text-white relative ${introClass}`}>
      {/* 🌊 Living Interactive Ocean Background Canvas */}
      <OceanHeroCanvas />

      {/* Subtle Ambient Ocean Gradient Mesh */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-full bg-gradient-to-b from-sky-200/[0.25] to-transparent rotate-12 blur-3xl"></div>
        <div className="absolute top-0 right-1/4 w-[500px] h-full bg-gradient-to-b from-teal-100/[0.25] to-transparent -rotate-12 blur-3xl"></div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-blue-100/[0.15] to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Clean Floating Navbar (No academic clutter) */}
      <header className="hero-nav sticky top-4 z-50 w-full max-w-6xl px-4 sm:px-6" style={{ animationDelay: '0.08s' }}>
        <nav className="bg-white/90 backdrop-blur-md rounded-2xl px-5 py-3.5 flex items-center justify-between shadow-sm border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 via-teal-500 to-emerald-500 text-white flex items-center justify-center shadow-md shadow-sky-500/20 font-bold">
              <Waves className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-hud text-base font-black tracking-wider text-slate-900">AQUASENTINEL</span>
                <span className="font-hud text-base font-black text-sky-600">AI</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-200 font-semibold ml-1">v2.4</span>
              </div>
              <p className="text-[11px] font-arabic text-teal-700 font-bold hidden sm:block">
                بحر-سنتينل • منصة المراقبة البحرية الذكية
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <span className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-mono font-medium">
              <Award className="w-3.5 h-3.5 text-emerald-600" />
              UN SDG 14: Life Below Water
            </span>

            <button
              onClick={onOpenPitchDeck}
              className="flex items-center gap-2 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 rounded-xl text-xs font-hud font-bold transition shadow-sm cursor-pointer"
              title="Review 10-Slide Pitch Deck"
            >
              <Presentation className="w-3.5 h-3.5 text-sky-600" />
              <span>PITCH DECK</span>
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="w-full max-w-5xl px-6 pt-12 sm:pt-20 pb-4 flex flex-col items-center text-center relative z-10">
        {/* Industry / Global Mission Badge Pill */}
        <div
          className="hero-pill inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200/90 text-xs font-mono text-slate-700 mb-6 shadow-xs hover:border-slate-300 transition-all cursor-default"
          style={{ animationDelay: '0.22s' }}
        >
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 font-semibold text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            UN SDG 14
          </span>
          <span className="text-slate-600 font-medium">Autonomous Subsea Telemetry & AI Cleanup • Team Trinex Bytes</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        </div>

        {/* Main Title - Masked Line-by-Line Reveal */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-hud tracking-tight leading-[1.12] max-w-4xl text-slate-950">
          <span className="ln">
            <span className="ln-i" style={{ animationDelay: '0.34s' }}>
              See What the Ocean Hides
            </span>
          </span>
          <span className="ln mt-1 sm:mt-2">
            <span
              className="ln-i bg-gradient-to-r from-sky-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent"
              style={{ animationDelay: '0.48s' }}
            >
              Autonomous Subsea AI
            </span>
          </span>
        </h1>

        {/* Problem Statement Lead */}
        <p
          className="hero-sub mt-6 max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed font-sans"
          style={{ animationDelay: '0.72s' }}
        >
          Every year, <strong className="text-red-600 font-semibold">640,000 tons</strong> of ghost fishing nets and{' '}
          <strong className="text-amber-600 font-semibold">14 million tons</strong> of plastics sink into murky waters, invisible to human cameras. 
          AquaSentinel cuts through optical attenuation with <span className="text-sky-700 font-semibold">physics-based spectral dehazing</span>, detects marine hazards at 30 FPS, and dispatches automated AUV cleanup missions.
        </p>

        {/* Call to Actions */}
        <div
          className="hero-cta mt-8 flex flex-col sm:flex-row items-center gap-4"
          style={{ animationDelay: '0.90s' }}
        >
          <button
            onClick={() => onLaunchDemo(0)}
            className="group flex items-center gap-3 px-8 py-4 bg-sky-600 hover:bg-sky-500 text-white font-hud font-bold text-base sm:text-lg rounded-2xl shadow-lg shadow-sky-600/25 transition-all transform hover:scale-[1.02] active:scale-95 cursor-pointer"
          >
            <Eye className="w-6 h-6 text-white" />
            <span>LAUNCH LIVE DEMO</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
          </button>

          <button
            onClick={onOpenPitchDeck}
            className="flex items-center gap-2.5 px-6 py-4 bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-hud font-bold text-sm sm:text-base rounded-2xl transition-all cursor-pointer shadow-sm hover:shadow"
          >
            <Presentation className="w-5 h-5 text-sky-600" />
            <span>10-SLIDE PITCH DECK</span>
          </button>
        </div>

        {/* Key Metrics Counter Strip */}
        <div
          className="hero-metrics mt-12 w-full grid grid-cols-2 md:grid-cols-4 gap-4 font-mono"
          style={{ animationDelay: '1.05s' }}
        >
          <div className="bg-white border border-slate-200 p-5 rounded-2xl text-center shadow-sm">
            <div className="text-3xl font-hud font-black text-sky-600">99.4%</div>
            <div className="text-xs text-slate-500 uppercase tracking-wider mt-1 font-semibold">Model Precision</div>
          </div>
          <div className="bg-white border border-slate-200 p-5 rounded-2xl text-center shadow-sm">
            <div className="text-3xl font-hud font-black text-emerald-600">&gt;30 FPS</div>
            <div className="text-xs text-slate-500 uppercase tracking-wider mt-1 font-semibold">Edge Inference</div>
          </div>
          <div className="bg-white border border-slate-200 p-5 rounded-2xl text-center shadow-sm">
            <div className="text-3xl font-hud font-black text-amber-600">120 kHz</div>
            <div className="text-xs text-slate-500 uppercase tracking-wider mt-1 font-semibold">Sonar Frequency</div>
          </div>
          <div className="bg-white border border-slate-200 p-5 rounded-2xl text-center shadow-sm">
            <div className="text-3xl font-hud font-black text-teal-600">100%</div>
            <div className="text-xs text-slate-500 uppercase tracking-wider mt-1 font-semibold">Autonomous Offline</div>
          </div>
        </div>
      </section>

      {/* 🌊 Elegant Flowing Ocean Waves & Gentle Bubbles Section */}
      <div className="w-full overflow-hidden relative leading-none py-4 pointer-events-none select-none z-10">
        {/* Rising aquatic bubbles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(14)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full border border-sky-300/40 bg-sky-200/25 bubble-float"
              style={{
                width: `${7 + (i * 3) % 15}px`,
                height: `${7 + (i * 3) % 15}px`,
                left: `${5 + (i * 7.1) % 90}%`,
                bottom: '0px',
                animationDelay: `${i * 0.45}s`,
                animationDuration: `${5.5 + (i % 3) * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Wave Layer 1 (Back Deep Oceanic Wave) */}
        <svg className="w-[200%] h-12 text-sky-200/35 wave-layer-1 fill-current" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0 C150,80 350,-40 500,45 C650,130 900,10 1200,50 L1200,120 L0,120 Z"></path>
        </svg>

        {/* Wave Layer 2 (Mid Sea-Foam Wave) */}
        <svg className="w-[200%] h-14 -mt-8 text-teal-200/30 wave-layer-2 fill-current" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,40 C200,-20 400,80 600,30 C800,-20 1000,70 1200,20 L1200,120 L0,120 Z"></path>
        </svg>

        {/* Wave Layer 3 (Front Gentle Ripple) */}
        <svg className="w-[200%] h-16 -mt-10 text-sky-100/60 wave-layer-3 fill-current" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,20 C300,90 600,-30 900,50 C1050,90 1150,40 1200,30 L1200,120 L0,120 Z"></path>
        </svg>
      </div>

      {/* Bento Grid Showcase */}
      <section className="w-full max-w-6xl px-6 py-12 relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-hud text-sky-700 font-bold mb-2 uppercase tracking-wide">
            <Sparkles className="w-4 h-4 text-sky-600" /> CORE SUBSYSTEM ARCHITECTURE
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-hud text-slate-900">
            Engineered for <span className="bg-gradient-to-r from-sky-600 to-teal-600 bg-clip-text text-transparent">Extreme Subsea Conditions</span>
          </h2>
          <p className="mt-2 text-sm text-slate-500 max-w-xl mx-auto">
            Combining optical physics restoration, neural hazard classification, and acoustic telemetry coordination.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Bento Card 1: Large 2-Column De-Hazing Showcase */}
          <div className="md:col-span-2 bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-6 sm:p-8 rounded-3xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-mono font-bold border border-sky-200">
                  PHYSICS-INFORMED AI
                </span>
                <span className="text-xs font-mono text-slate-500">Beer-Lambert Attenuation</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-hud text-slate-900 mb-2">
                Real-Time Spectral De-Hazing
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed max-w-xl">
                Underwater optical scattering absorbs red light within 5 meters. Our algorithm compensates for wavelength attenuation mathematically, restoring crisp true-color RGB imagery with interactive split-slider control.
              </p>
            </div>

            <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-100 border border-sky-200 flex items-center justify-center text-sky-700">
                  <Eye className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-hud font-bold text-slate-900">Interactive Comparison Slider</div>
                  <div className="text-[11px] text-slate-500 font-mono">Instant side-by-side verification</div>
                </div>
              </div>
              <button
                onClick={() => onLaunchDemo(0)}
                className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-hud text-xs font-bold rounded-xl transition cursor-pointer shadow-sm"
              >
                TRY SLIDER
              </button>
            </div>
          </div>

          {/* Bento Card 2: 120 kHz Sonar Radar */}
          <div className="bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-6 sm:p-8 rounded-3xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-mono font-bold border border-amber-200">
                  ACOUSTIC TELEMETRY
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping"></span>
              </div>
              <h3 className="text-xl font-bold font-hud text-slate-900 mb-2">
                120 kHz Sonar Radar
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Optical feeds blind past 30 meters. AquaSentinel features synthesized 120 kHz spatial acoustic sweeps with adaptive sonar telemetry, enabling long-range obstacle avoidance.
              </p>
            </div>

            <div className="mt-6 flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <Radio className="w-5 h-5" />
              </div>
              <div className="text-xs font-mono text-slate-700">
                <span className="text-amber-700 font-bold">120.4 kHz</span> Carrier Sweep
              </div>
            </div>
          </div>

          {/* Bento Card 3: Multimodal Vision & Hazard Detection */}
          <div className="bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-6 sm:p-8 rounded-3xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-mono font-bold border border-red-200">
                  NEURAL SENTRY
                </span>
                <span className="text-xs font-mono text-slate-500">Zero-Shot Vision</span>
              </div>
              <h3 className="text-xl font-bold font-hud text-slate-900 mb-2">
                Hazard Classification
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Gemini Vision models categorize nylon ghost nets, microplastics, submerged chemical barrels, and protected marine fauna with confidence score gating.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-1.5 font-mono text-[10px]">
              <span className="px-2.5 py-1 rounded-lg bg-red-50 border border-red-200 text-red-700 font-semibold">Ghost Nets</span>
              <span className="px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 font-semibold">Plastics</span>
              <span className="px-2.5 py-1 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 font-semibold">Hazmat</span>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 font-semibold">Protected Fauna</span>
            </div>
          </div>

          {/* Bento Card 4: Large 2-Column Robotic Mission Dispatch */}
          <div className="md:col-span-2 bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-6 sm:p-8 rounded-3xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-mono font-bold border border-emerald-200">
                  AUTONOMOUS FLEET
                </span>
                <span className="text-xs font-mono text-slate-500">ROS / MAVLink Compatible</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-hud text-slate-900 mb-2">
                Robotic AUV Mission Dispatch & Telemetry
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed max-w-xl">
                One-click dispatch creates verifiable mission orders with GPS coordinates, depth contours, robotic arm manipulator payloads, and downloadable PDF compliance inspection certificates.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3 font-mono text-center text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-sky-700 font-bold">Standard JSON</div>
                <div className="text-[10px] text-slate-500">AUV Telemetry Orders</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-emerald-700 font-bold">1-Click PDF</div>
                <div className="text-[10px] text-slate-500">Compliance Audit Certs</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-amber-700 font-bold">CSV Export</div>
                <div className="text-[10px] text-slate-500">Scientific GIS Logs</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Pre-Loaded Scenarios */}
      <section className="w-full max-w-6xl px-6 py-12 relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-hud text-sky-700 font-bold mb-2 uppercase tracking-wide">
            <Compass className="w-4 h-4 text-sky-600" /> LIVE OPERATION THEATERS
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-hud text-slate-900">
            Pre-Loaded <span className="text-sky-600">Field Scenarios</span>
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Launch directly into real-world environmental hotspots to test the perception pipeline live.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Scenario 1 */}
          <div className="bg-white border border-red-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="flex items-center gap-1.5 text-xs font-hud font-bold text-red-600">
                  <Anchor className="w-4 h-4" /> CRITICAL ENTANGLEMENT
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 bg-red-50 rounded border border-red-200 text-red-700 font-semibold">-16.4m</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-sky-600 transition">Dubai Coral Reef Ghost Net</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Arabian Gulf • 42.5 kg synthetic nylon gillnet smothering endangered brain coral colonies. High urgency rating.
              </p>
              <div className="text-[10px] font-mono text-slate-400 mb-4">
                GPS: 25.2048° N, 55.2708° E
              </div>
            </div>
            <button
              onClick={() => onLaunchDemo(0)}
              className="w-full flex items-center justify-center gap-2 py-3 bg-red-600 hover:bg-red-500 text-white font-hud text-xs font-bold rounded-xl transition cursor-pointer shadow-sm"
            >
              <Play className="w-3.5 h-3.5" />
              <span>LAUNCH SCENARIO 01</span>
            </button>
          </div>

          {/* Scenario 2 */}
          <div className="bg-white border border-amber-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="flex items-center gap-1.5 text-xs font-hud font-bold text-amber-700">
                  <Fish className="w-4 h-4" /> PLASTIC DENSITY
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 bg-amber-50 rounded border border-amber-200 text-amber-800 font-semibold">-28.2m</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-sky-600 transition">Continental Shelf Plastics</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Indian Ocean Shelf • Dense cluster of PET bottles, degraded polymers, and aluminum drink cans.
              </p>
              <div className="text-[10px] font-mono text-slate-400 mb-4">
                GPS: 09.9312° N, 76.2673° E
              </div>
            </div>
            <button
              onClick={() => onLaunchDemo(1)}
              className="w-full flex items-center justify-center gap-2 py-3 bg-amber-600 hover:bg-amber-500 text-white font-hud text-xs font-bold rounded-xl transition cursor-pointer shadow-sm"
            >
              <Play className="w-3.5 h-3.5" />
              <span>LAUNCH SCENARIO 02</span>
            </button>
          </div>

          {/* Scenario 3 */}
          <div className="bg-white border border-slate-300 p-6 rounded-2xl shadow-sm hover:shadow-md transition flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="flex items-center gap-1.5 text-xs font-hud font-bold text-rose-700">
                  <ShieldAlert className="w-4 h-4" /> INDUSTRIAL HAZMAT
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 bg-rose-50 rounded border border-rose-200 text-rose-700 font-semibold">-11.8m</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-sky-600 transition">Jebel Ali Toxic Canister</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Dubai Harbor • Corroded industrial chemical barrel in immediate proximity to a protected resident sea turtle.
              </p>
              <div className="text-[10px] font-mono text-slate-400 mb-4">
                GPS: 25.0112° N, 55.0610° E
              </div>
            </div>
            <button
              onClick={() => onLaunchDemo(2)}
              className="w-full flex items-center justify-center gap-2 py-3 bg-slate-800 hover:bg-slate-700 text-white font-hud text-xs font-bold rounded-xl transition cursor-pointer shadow-sm"
            >
              <Play className="w-3.5 h-3.5" />
              <span>LAUNCH SCENARIO 03</span>
            </button>
          </div>
        </div>
      </section>

      {/* Architecture Visual */}
      <section className="w-full max-w-5xl px-6 py-8 relative z-10">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4 text-xs font-hud text-sky-700 font-bold uppercase tracking-wider">
            <Cpu className="w-4 h-4 text-sky-600" />
            <span>AUTONOMOUS SUBSEA PIPELINE ARCHITECTURE</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-mono text-[11px]">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="text-sky-700 font-bold mb-1 text-xs">1. OPTICAL FEED</div>
              <div className="text-slate-500">AUV / ROV camera feed or multi-spectral sensor input</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="text-teal-700 font-bold mb-1 text-xs">2. SPECTRAL DEHAZE</div>
              <div className="text-slate-500">Beer-Lambert red compensation & contrast boost</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="text-sky-700 font-bold mb-1 text-xs">3. GEMINI VISION</div>
              <div className="text-slate-500">Multi-class debris & protected fauna classification</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="text-emerald-700 font-bold mb-1 text-xs">4. ROBOTIC DISPATCH</div>
              <div className="text-slate-500">Autonomous AUV cleanup telemetry orders</div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="w-full max-w-5xl px-6 py-10 relative z-10">
        <div className="p-8 sm:p-12 bg-gradient-to-br from-sky-50 via-teal-50/40 to-white border border-sky-200 rounded-3xl text-center shadow-sm relative overflow-hidden">
          <h2 className="text-2xl sm:text-4xl font-black font-hud text-slate-900 mb-3">
            Ready to Take Command?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto mb-8 font-sans">
            Test real-time dehazing, trigger acoustic 120 kHz sonar pings, and generate automated AUV robotic cleanup orders.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => onLaunchDemo(0)}
              className="inline-flex items-center gap-3 px-8 py-4 bg-sky-600 hover:bg-sky-500 text-white font-hud font-bold text-base rounded-2xl shadow-lg shadow-sky-600/25 transition-all transform hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              <Radio className="w-5 h-5 text-white" />
              <span>ENTER COMMAND CENTER</span>
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={onOpenPitchDeck}
              className="inline-flex items-center gap-2.5 px-6 py-4 bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-hud font-bold text-sm rounded-2xl transition cursor-pointer shadow-sm"
            >
              <Presentation className="w-4 h-4 text-sky-600" />
              <span>VIEW PITCH DECK</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full max-w-5xl px-6 py-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 font-mono relative z-10">
        <div className="flex items-center gap-2">
          <span>© 2026 AquaSentinel AI</span>
          <span>•</span>
          <span className="text-slate-700 font-semibold">Team Trinex Bytes</span>
          <span>•</span>
          <span className="text-sky-700 font-semibold">SubSea Vision Engine</span>
        </div>
        <div>NOVA 2026 Grand Finale (BITS Pilani Dubai) • UN SDG 14: Life Below Water</div>
      </footer>
    </div>
  );
};
