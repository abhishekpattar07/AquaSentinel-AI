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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-sky-100 rounded-xl text-sky-700">
              <Anchor className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-hud text-base font-bold text-slate-900">
                AUTONOMOUS AUV / ROV MISSION DISPATCH
              </h3>
              <p className="text-[11px] font-mono text-slate-500">
                Subsea Ecological Cleanup Telemetry Order
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-200 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4 font-mono text-xs text-slate-700">
          {/* Status Box */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between shadow-sm">
            <div>
              <span className="text-slate-500 text-[11px]">MISSION DESIGNATION:</span>
              <div className="text-sm font-hud font-bold text-sky-700">{missionId}</div>
            </div>
            <div className="text-right">
              <span className="text-slate-500 text-[11px]">THREAT STATUS:</span>
              <div>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                  scenario.expectedThreat === 'critical' ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-amber-100 text-amber-800 border border-amber-200'
                }`}>
                  {scenario.expectedThreat}
                </span>
              </div>
            </div>
          </div>

          {/* Coordinates & Physical Site Specs */}
          <div className="grid grid-cols-3 gap-2.5">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-500">COORDINATES</span>
              <div className="text-xs font-bold text-slate-900 mt-0.5">{scenario.coordinates}</div>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-500">TARGET DEPTH</span>
              <div className="text-xs font-bold text-sky-700 mt-0.5">{scenario.depthMeters} Meters</div>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-500">EST. DEBRIS MASS</span>
              <div className="text-xs font-bold text-amber-700 mt-0.5">~{totalWeightKg.toFixed(1)} kg</div>
            </div>
          </div>

          {/* Robotic Payload Tooling */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex items-center gap-1.5 text-sky-800 font-bold">
              <Cpu className="w-4 h-4 text-sky-600" />
              <span>ROBOTIC MANIPULATOR PAYLOAD ASSIGNMENT</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200 text-slate-900 font-semibold shadow-sm">
              {payloadTool}
            </div>
            <p className="text-[11px] text-slate-600">
              <strong>Directive:</strong> {recommendedAction}
            </p>
          </div>

          {/* Identified Debris Breakdown */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex items-center gap-1.5 text-slate-800 font-bold">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <span>CONFIRMED HAZARD TARGETS ({debrisItems.length})</span>
            </div>
            <div className="space-y-1.5">
              {debrisItems.map((d, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200 text-[11px] shadow-sm">
                  <span className="text-slate-900 font-bold">{d.label}</span>
                  <span className="text-sky-700 font-semibold">CONF: {Math.round(d.confidence * 100)}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 bg-slate-50">
          <button
            onClick={downloadBrief}
            className="flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 text-xs font-semibold rounded-xl transition cursor-pointer shadow-sm"
          >
            <Download className="w-4 h-4 text-sky-600" /> Download Telemetry Brief (JSON)
          </button>

          <button
            disabled={isDeployed}
            onClick={handleDeploy}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-hud font-bold text-xs transition shadow-sm cursor-pointer ${
              isDeployed
                ? 'bg-emerald-600 text-white cursor-default'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20'
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
