import { useState, useRef } from 'react';
import { VideoAnalyzer } from './components/VideoAnalyzer';
import type { VideoAnalyzerRef } from './components/VideoAnalyzer';
import { MarineHUD } from './components/MarineHUD';
import { ROVMissionModal } from './components/ROVMissionModal';
import { PitchDeckModal } from './components/PitchDeckModal';
import { LandingPage } from './components/LandingPage';
import { SCENARIOS } from './services/sampleVideoGenerator';
import type { Scenario, BoundingBox, DebrisCategory, EventLog, CumulativeStats } from './types';
import { analyzeMarineFrame } from './services/geminiVision';
import { playSonarPing, playThreatAlert, playTacticalClick, setSoundEnabled } from './services/marineAudio';
import { Waves, Award, Home, Presentation } from 'lucide-react';

export function App() {
  const analyzerRef = useRef<VideoAnalyzerRef>(null);

  const [showDashboard, setShowDashboard] = useState(false);
  const [currentScenario, setCurrentScenario] = useState<Scenario>(SCENARIOS[0]);
  const [bboxes, setBboxes] = useState<BoundingBox[]>(SCENARIOS[0].sampleDetections);
  const [isScanning, setIsScanning] = useState(false);
  const [splitRatio, setSplitRatio] = useState<number>(0.5);
  const [confidenceThreshold, setConfidenceThreshold] = useState<number>(0.70);
  const [activeCategories, setActiveCategories] = useState<DebrisCategory[]>([
    'ghost_net',
    'plastic',
    'toxic_drum',
    'metal_debris',
    'marine_life',
  ]);
  const [soundActive, setSoundActive] = useState<boolean>(true);
  const [isROVModalOpen, setIsROVModalOpen] = useState(false);
  const [isPitchDeckOpen, setIsPitchDeckOpen] = useState(false);

  // Cumulative Metrics State
  const [cumulativeStats, setCumulativeStats] = useState<CumulativeStats>({
    totalScans: 1,
    totalDebrisCount: 2,
    totalMassKg: 42.5,
    protectedSpeciesCount: 2,
    averageMpi: 70,
  });

  // Event Logs State
  const [eventLogs, setEventLogs] = useState<EventLog[]>([
    {
      id: 'log-1',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      message: 'AUV-01 Telemetry established at 16.4m depth',
      type: 'info',
    },
    {
      id: 'log-2',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      message: '🚨 GHOST NET detected (#A-12, 42.5kg) — CRITICAL',
      type: 'alert',
      threatLevel: 'critical',
    },
  ]);

  // Audio Toggle
  const handleToggleSound = () => {
    const next = !soundActive;
    setSoundActive(next);
    setSoundEnabled(next);
    if (next) playTacticalClick();
  };

  // Scenario Switch
  const handleSelectScenario = (scenario: Scenario) => {
    playTacticalClick();
    setCurrentScenario(scenario);
    setBboxes(scenario.sampleDetections);

    // Add log entry
    const newLog: EventLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      message: `Navigated to ${scenario.title} (${scenario.depthMeters}m)`,
      type: 'info',
      threatLevel: scenario.expectedThreat,
    };
    setEventLogs(prev => [newLog, ...prev.slice(0, 15)]);

    if (scenario.expectedThreat === 'critical') {
      playThreatAlert();
    }
  };

  // Category Filter Toggle
  const handleToggleCategory = (cat: DebrisCategory) => {
    playTacticalClick();
    setActiveCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  // AI Frame Scan Trigger
  const handleTriggerScan = async () => {
    playSonarPing();
    setIsScanning(true);
    const frameBase64 = analyzerRef.current?.captureFrame();

    try {
      let detected: BoundingBox[] = [];
      if (frameBase64) {
        detected = await analyzeMarineFrame(frameBase64, currentScenario.id);
      } else {
        detected = currentScenario.sampleDetections;
      }
      setBboxes(detected);

      // Sound feedback on results
      const hasCritical = detected.some(d => d.threatLevel === 'critical');
      if (hasCritical) {
        setTimeout(playThreatAlert, 400);
      } else {
        setTimeout(playSonarPing, 400);
      }

      // Update Cumulative Stats
      const debrisItems = detected.filter(d => d.category !== 'marine_life');
      const bioItems = detected.filter(d => d.category === 'marine_life');
      const addedMass = debrisItems.reduce((acc, d) => acc + (d.estimatedWeightKg || 5), 0);

      setCumulativeStats(prev => ({
        totalScans: prev.totalScans + 1,
        totalDebrisCount: prev.totalDebrisCount + debrisItems.length,
        totalMassKg: prev.totalMassKg + addedMass,
        protectedSpeciesCount: prev.protectedSpeciesCount + bioItems.length,
        averageMpi: Math.min(100, Math.round((prev.averageMpi + (debrisItems.length * 25)) / 2)),
      }));

      // Add Scan Event Log
      const scanLog: EventLog = {
        id: `scan-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        message: `Optical Scan completed: ${detected.length} targets identified`,
        type: 'info',
      };
      setEventLogs(prev => [scanLog, ...prev.slice(0, 15)]);
    } catch (err) {
      console.warn('Scan error:', err);
      setBboxes(currentScenario.sampleDetections);
    } finally {
      setTimeout(() => setIsScanning(false), 700);
    }
  };

  // Export CSV Telemetry
  const handleExportCSV = () => {
    playTacticalClick();
    const rows = [
      ['Timestamp', 'Location', 'Depth_m', 'Turbidity_pct', 'Label', 'Category', 'Confidence', 'ThreatLevel', 'EstMass_kg'],
      ...bboxes.map(b => [
        new Date().toISOString(),
        currentScenario.location,
        currentScenario.depthMeters,
        currentScenario.turbidityPct,
        b.label,
        b.category,
        b.confidence,
        b.threatLevel,
        b.estimatedWeightKg || 0,
      ]),
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map(e => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `AQUASENTINEL_TELEMETRY_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export Printable Environmental Survey Report
  const handleExportReport = () => {
    playTacticalClick();
    const frameBase64 = analyzerRef.current?.captureFrame();

    // Compute live MPI Score for the report
    const ghostNets = bboxes.filter(b => b.category === 'ghost_net').length;
    const plastics = bboxes.filter(b => b.category === 'plastic' || b.category === 'metal_debris').length;
    const toxics = bboxes.filter(b => b.category === 'toxic_drum').length;
    const mpiScore = Math.min(100, Math.max(12, (ghostNets * 35) + (toxics * 45) + (plastics * 15)));

    const reportHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>AquaSentinel AI — Marine Survey Report</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 36px; color: #0f172a; line-height: 1.5; max-width: 900px; margin: 0 auto; }
          .header-bar { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #0284c7; padding-bottom: 12px; margin-bottom: 20px; }
          h1 { color: #0284c7; font-size: 24px; margin: 0 0 4px 0; }
          .team-tag { font-size: 13px; color: #0f172a; font-weight: 600; }
          .meta-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; background: #f8fafc; padding: 14px; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 20px; font-size: 13px; }
          .mpi-badge { background: ${mpiScore >= 70 ? '#fee2e2' : mpiScore >= 40 ? '#fef3c7' : '#d1fae5'}; color: ${mpiScore >= 70 ? '#991b1b' : mpiScore >= 40 ? '#92400e' : '#065f46'}; border: 1px solid ${mpiScore >= 70 ? '#f87171' : mpiScore >= 40 ? '#fcd34d' : '#6ee7b7'}; padding: 6px 12px; border-radius: 6px; font-weight: bold; display: inline-block; }
          .snapshot-box { margin: 20px 0; border: 1px solid #cbd5e1; border-radius: 8px; padding: 10px; background: #f8fafc; text-align: center; }
          .snapshot-box img { max-width: 100%; height: auto; border-radius: 6px; }
          .snapshot-caption { font-size: 11px; color: #64748b; margin-top: 6px; font-family: monospace; }
          table { width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 12px; }
          th, td { border: 1px solid #cbd5e1; padding: 8px 10px; text-align: left; }
          th { background: #f1f5f9; font-weight: 600; color: #334155; }
          .critical { color: #dc2626; font-weight: bold; }
          .footer { margin-top: 36px; font-size: 11px; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 10px; display: flex; justify-content: space-between; }
        </style>
      </head>
      <body>
        <div class="header-bar">
          <div>
            <h1>🌊 AquaSentinel AI — Environmental Survey & Telemetry Report</h1>
            <div class="team-tag">Project by Team Trinex Bytes • NOVA 2026 Grand Finale (Track C: Sustainable Tech)</div>
          </div>
          <div style="text-align: right;">
            <div class="mpi-badge">MPI SCORE: ${mpiScore} / 100</div>
          </div>
        </div>

        <div class="meta-grid">
          <div><strong>Survey Site:</strong> ${currentScenario.title}</div>
          <div><strong>Location:</strong> ${currentScenario.location}</div>
          <div><strong>GPS Coordinates:</strong> ${currentScenario.coordinates}</div>
          <div><strong>Operational Depth:</strong> -${currentScenario.depthMeters} m</div>
          <div><strong>Water Turbidity:</strong> ${currentScenario.turbidityPct}%</div>
          <div><strong>Report Timestamp:</strong> ${new Date().toLocaleString()}</div>
        </div>

        ${frameBase64 ? `
          <div class="snapshot-box">
            <img src="${frameBase64}" alt="Optical Survey Snapshot" />
            <div class="snapshot-caption">FIGURE 1: OPTICAL SURVEY SNAPSHOT — SPECTRAL DEHAZED & NEURAL ANNOTATED TELEMETRY FRAME</div>
          </div>
        ` : ''}

        <h3 style="margin-bottom: 6px; color: #0f172a;">AI Oceanographic Mission Briefing</h3>
        <p style="background: #f8fafc; padding: 12px; border-radius: 8px; border: 1px solid #e2e8f0; font-size: 12.5px; color: #334155; margin-top: 0;">
          ${currentScenario.narrativeReport}
        </p>

        <h3 style="margin-bottom: 6px; color: #0f172a;">Identified Debris & Marine Bio Targets (${bboxes.length} Detected)</h3>
        <table>
          <thead>
            <tr><th>Target Label</th><th>Category</th><th>Confidence</th><th>Threat Level</th><th>Est. Mass</th></tr>
          </thead>
          <tbody>
            ${bboxes.map(b => `
              <tr>
                <td><strong>${b.label}</strong></td>
                <td>${b.category}</td>
                <td>${Math.round(b.confidence * 100)}%</td>
                <td class="${b.threatLevel === 'critical' ? 'critical' : ''}">${b.threatLevel.toUpperCase()}</td>
                <td>${b.estimatedWeightKg ? `~${b.estimatedWeightKg} kg` : 'N/A'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div class="footer">
          <span>AquaSentinel AI • Team Trinex Bytes • BITS Pilani Dubai Campus × Microsoft Tech Club</span>
          <span>UN SDG 14: Life Below Water</span>
        </div>
      </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(reportHtml);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => printWindow.print(), 350);
    }
  };

  // Show Landing Page if dashboard hasn't been activated yet
  if (!showDashboard) {
    return (
      <>
        <LandingPage
          onLaunchDemo={(scenarioIdx?: number) => {
            if (typeof scenarioIdx === 'number' && SCENARIOS[scenarioIdx]) {
              setCurrentScenario(SCENARIOS[scenarioIdx]);
              setBboxes(SCENARIOS[scenarioIdx].sampleDetections);
            }
            setShowDashboard(true);
          }}
          onOpenPitchDeck={() => setIsPitchDeckOpen(true)}
        />
        <PitchDeckModal isOpen={isPitchDeckOpen} onClose={() => setIsPitchDeckOpen(false)} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col items-center selection:bg-sky-500 selection:text-white">
      {/* Top Banner & Header */}
      <header className="w-full max-w-6xl px-4 py-3 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-40 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 via-teal-500 to-emerald-500 text-white flex items-center justify-center font-bold text-xl shadow-md shadow-sky-500/20">
            <Waves className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-hud text-base sm:text-lg font-black tracking-wider text-slate-900">
                AQUASENTINEL <span className="text-sky-600">AI</span>
              </h1>
              <span className="text-xs font-arabic text-teal-800 font-bold px-2 py-0.5 bg-teal-50 rounded border border-teal-200">
                بحر-سنتينل
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-mono">
              Autonomous Underwater Debris & Anomaly Sentry • Team Trinex Bytes • NOVA 2026
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowDashboard(false)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl text-xs font-hud font-semibold text-slate-800 transition cursor-pointer shadow-sm"
            title="Return to Landing Page"
          >
            <Home className="w-3.5 h-3.5 text-sky-600" />
            <span className="hidden sm:inline">HOME</span>
          </button>
          <button
            onClick={() => setIsPitchDeckOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl text-xs font-hud font-semibold text-slate-800 transition cursor-pointer shadow-sm"
            title="Open Pitch Deck"
          >
            <Presentation className="w-3.5 h-3.5 text-sky-600" />
            <span className="hidden sm:inline">PITCH DECK</span>
          </button>
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-[11px] text-emerald-800 font-mono font-medium">
            <Award className="w-3.5 h-3.5 text-emerald-600" />
            <span>UN SDG 14: Life Below Water</span>
          </div>
        </div>
      </header>

      {/* Main Command Center Body */}
      <main className="w-full max-w-6xl p-4 sm:p-6 flex-1 flex flex-col gap-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Optical Video / Canvas Stream with Split Slider (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            <VideoAnalyzer
              ref={analyzerRef}
              currentScenario={currentScenario}
              bboxes={bboxes}
              isScanning={isScanning}
              splitRatio={splitRatio}
              onSplitRatioChange={setSplitRatio}
              confidenceThreshold={confidenceThreshold}
              activeCategories={activeCategories}
            />

            {/* Tactical Subsea Info Bar */}
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 flex items-center justify-between text-xs text-slate-600 font-mono shadow-sm">
              <span>🌊 Mission: <strong className="text-slate-900">{currentScenario.title}</strong></span>
              <span>⚡ Spectral Split: <strong className="text-sky-700">{Math.round(splitRatio * 100)}% (Raw ◀▶ AI Restored)</strong></span>
            </div>
          </div>

          {/* Right Column: Marine HUD & Telemetry (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <MarineHUD
              currentScenario={currentScenario}
              onSelectScenario={handleSelectScenario}
              bboxes={bboxes}
              isScanning={isScanning}
              onTriggerScan={handleTriggerScan}
              onOpenROVModal={() => setIsROVModalOpen(true)}
              onOpenPitchDeck={() => setIsPitchDeckOpen(true)}
              confidenceThreshold={confidenceThreshold}
              onConfidenceChange={setConfidenceThreshold}
              activeCategories={activeCategories}
              onToggleCategory={handleToggleCategory}
              soundEnabled={soundActive}
              onToggleSound={handleToggleSound}
              eventLogs={eventLogs}
              cumulativeStats={cumulativeStats}
              onExportCSV={handleExportCSV}
              onExportReport={handleExportReport}
            />
          </div>
        </div>
      </main>

      {/* Autonomous AUV / ROV Mission Dispatch Modal */}
      <ROVMissionModal
        isOpen={isROVModalOpen}
        onClose={() => setIsROVModalOpen(false)}
        scenario={currentScenario}
        bboxes={bboxes}
      />

      {/* 10-Slide Pitch Deck Presentation Modal */}
      <PitchDeckModal
        isOpen={isPitchDeckOpen}
        onClose={() => setIsPitchDeckOpen(false)}
      />
    </div>
  );
}

export default App;
