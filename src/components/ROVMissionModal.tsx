import React, { useState } from 'react';
import { X, Send, Anchor, ShieldAlert, Cpu, CheckCircle2, Download } from 'lucide-react';
import type { Scenario, BoundingBox } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  scenario: Scenario;
  bboxes: BoundingBox[];
}

export const ROVMissionModal: React.FC<Props> = ({
  isOpen,
  onClose,
  scenario,
  bboxes,
}) => {
  const [isDeployed, setIsDeployed] = useState(false);

  if (!isOpen) return null;

  const missionId = `AUV-EXPEDITION-${scenario.id.toUpperCase().slice(0, 4)}-${Math.floor(1000 + Math.random() * 9000)}`;
  const debrisItems = bboxes.filter(b => b.category !== 'marine_life');
  const totalWeightKg = debrisItems.reduce((acc, b) => acc + (b.estimatedWeightKg || 5), 0);

  // Recommended tool payload based on detected debris
  let payloadTool = 'Universal High-Torque Robotic Gripper';
  let recommendedAction = 'Routine oceanic survey and debris retrieval.';

  if (scenario.id === 'ghost_net') {
    payloadTool = 'Dual-Arm Hydraulic Rotary Net Shears & Winch';
    recommendedAction = 'Precision cutting of synthetic nylon gillnet without damaging underlying Porites brain coral substrate.';
  } else if (scenario.id === 'toxic_drum') {
    payloadTool = 'Heavy-Duty Hazardous Chemical Encapsulation Clamp';
    recommendedAction = 'Seal integrity assessment, leak containment spray, and crane hoist to surface research vessel.';
  } else if (scenario.id === 'plastics') {
    payloadTool = 'Centrifugal Venturi Microplastic Suction Collector';
    recommendedAction = 'Targeted seabed vacuuming of polyethylene polymers and beverage cans.';
  }

  const handleDeploy = () => {
    setIsDeployed(true);
    setTimeout(() => {
      // simulate completed deployment
    }, 2500);
  };

  const downloadBrief = () => {
    const briefData = {
      missionId,
      timestamp: new Date().toISOString(),
      location: scenario.location,
      gps: scenario.coordinates,
      targetDepthMeters: scenario.depthMeters,
      threatRating: scenario.expectedThreat,
      totalEstimatedDebrisKg: totalWeightKg,
      payloadConfig: payloadTool,
      operationalDirectives: recommendedAction,
      detectedHazards: debrisItems.map(d => ({
        label: d.label,
        confidence: d.confidence,
        threat: d.threatLevel,
      })),
    };

    const blob = new Blob([JSON.stringify(briefData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${missionId}-TELEMETRY.json`;
    a.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="relative w-full max-w-2xl bg-ocean-950 border border-ocean-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-ocean-800 bg-ocean-900">
          <div className="flex items-center gap-2">
            <Anchor className="w-5 h-5 text-cyan-400" />
            <div>
              <h3 className="font-hud text-base font-bold text-white">
                AUTONOMOUS AUV / ROV MISSION DISPATCH
              </h3>
              <p className="text-[11px] font-mono text-slate-400">
                Subsea Ecological Cleanup Telemetry Order
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-ocean-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4 font-mono text-xs text-slate-300">
          {/* Status Box */}
          <div className="p-3 bg-ocean-900/80 rounded-xl border border-ocean-800 flex items-center justify-between">
            <div>
              <span className="text-slate-400">MISSION DESIGNATION:</span>
              <div className="text-sm font-hud font-bold text-cyan-400">{missionId}</div>
            </div>
            <div className="text-right">
              <span className="text-slate-400">THREAT STATUS:</span>
              <div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  scenario.expectedThreat === 'critical' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {scenario.expectedThreat}
                </span>
              </div>
            </div>
          </div>

          {/* Coordinates & Physical Site Specs */}
          <div className="grid grid-cols-3 gap-2">
            <div className="p-3 bg-ocean-900/60 rounded-lg border border-ocean-800">
              <span className="text-[10px] text-slate-400">COORDINATES</span>
              <div className="text-xs font-bold text-white mt-0.5">{scenario.coordinates}</div>
            </div>
            <div className="p-3 bg-ocean-900/60 rounded-lg border border-ocean-800">
              <span className="text-[10px] text-slate-400">TARGET DEPTH</span>
              <div className="text-xs font-bold text-cyan-400 mt-0.5">{scenario.depthMeters} Meters</div>
            </div>
            <div className="p-3 bg-ocean-900/60 rounded-lg border border-ocean-800">
              <span className="text-[10px] text-slate-400">EST. DEBRIS MASS</span>
              <div className="text-xs font-bold text-yellow-400 mt-0.5">~{totalWeightKg.toFixed(1)} kg</div>
            </div>
          </div>

          {/* Robotic Payload Tooling */}
          <div className="p-3.5 bg-ocean-900/60 rounded-xl border border-ocean-800 space-y-2">
            <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
              <Cpu className="w-4 h-4" />
              <span>ROBOTIC MANIPULATOR PAYLOAD ASSIGNMENT</span>
            </div>
            <div className="p-2.5 bg-ocean-950 rounded border border-ocean-800 text-white font-semibold">
              {payloadTool}
            </div>
            <p className="text-[11px] text-slate-400">
              <strong>Directive:</strong> {recommendedAction}
            </p>
          </div>

          {/* Identified Debris Breakdown */}
          <div className="p-3.5 bg-ocean-900/60 rounded-xl border border-ocean-800 space-y-2">
            <div className="flex items-center gap-1.5 text-yellow-400 font-bold">
              <ShieldAlert className="w-4 h-4" />
              <span>CONFIRMED HAZARD TARGETS ({debrisItems.length})</span>
            </div>
            <div className="space-y-1">
              {debrisItems.map((d, i) => (
                <div key={i} className="flex items-center justify-between p-1.5 bg-ocean-950/70 rounded border border-ocean-800 text-[11px]">
                  <span className="text-white font-bold">{d.label}</span>
                  <span className="text-cyan-400">CONF: {Math.round(d.confidence * 100)}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-ocean-800 bg-ocean-900/90 backdrop-blur">
          <button
            onClick={downloadBrief}
            className="flex items-center gap-1.5 px-4 py-2 bg-ocean-800 hover:bg-ocean-700 text-slate-200 text-xs font-semibold rounded-lg transition cursor-pointer"
          >
            <Download className="w-4 h-4 text-cyan-400" /> Download Telemetry Brief (JSON)
          </button>

          <button
            disabled={isDeployed}
            onClick={handleDeploy}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-hud font-bold text-xs transition shadow-lg cursor-pointer ${
              isDeployed
                ? 'bg-emerald-600 text-white cursor-default'
                : 'bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 text-black shadow-emerald-500/20'
            }`}
          >
            {isDeployed ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>MISSION TRANSMITTED TO AUV FLEET</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>AUTHORIZE & TRANSMIT AUV ORDERS</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
