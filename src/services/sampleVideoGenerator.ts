import type { Scenario } from '../types';

export const SCENARIOS: Scenario[] = [
  {
    id: 'ghost_net',
    title: 'Coral Reef Ghost Net Entanglement',
    location: 'Arabian Gulf Coral Sanctuary (Off Dubai Coast)',
    coordinates: '25.1824° N, 55.1532° E',
    depthMeters: 16.4,
    turbidityPct: 38,
    tempCelsius: 26.8,
    expectedThreat: 'critical',
    description: 'Abandoned commercial nylon gillnet snagged across sensitive brain coral formations. Poses acute strangulation hazard to marine megafauna.',
    sampleDetections: [
      {
        label: 'GHOST GILLNET #A-12',
        category: 'ghost_net',
        confidence: 0.96,
        threatLevel: 'critical',
        x: 0.22,
        y: 0.25,
        width: 0.52,
        height: 0.48,
        color: '#FF3366',
        estimatedWeightKg: 42.5,
      },
      {
        label: 'PORITES CORAL COLONY',
        category: 'marine_life',
        confidence: 0.91,
        threatLevel: 'low',
        x: 0.15,
        y: 0.62,
        width: 0.35,
        height: 0.32,
        color: '#00E699',
      },
      {
        label: 'DAMSELFISH SHOAL',
        category: 'marine_life',
        confidence: 0.88,
        threatLevel: 'low',
        x: 0.72,
        y: 0.18,
        width: 0.22,
        height: 0.24,
        color: '#00F0FF',
      },
    ],
    narrativeReport: "AquaSentinel autonomous vision detected an abandoned commercial nylon gillnet (#A-12, ~42.5 kg) snagged across sensitive Porites brain coral at 16.4m depth. A shoal of Damselfish is navigating the perimeter. Immediate dispatch of AUV-07 with hydraulic rotary net shears recommended to prevent coral die-off and entanglement of roaming marine megafauna.",
  },
  {
    id: 'plastics',
    title: 'Continental Shelf Plastic Accumulation',
    location: 'Indian Ocean Coastal Deposition Shelf',
    coordinates: '12.9716° N, 74.8219° E',
    depthMeters: 28.2,
    turbidityPct: 54,
    tempCelsius: 24.1,
    expectedThreat: 'moderate',
    description: 'High concentration of post-consumer non-biodegradable polymers and aluminum beverage cans resting on seabed sediment.',
    sampleDetections: [
      {
        label: 'PET PLASTIC BOTTLE',
        category: 'plastic',
        confidence: 0.94,
        threatLevel: 'moderate',
        x: 0.32,
        y: 0.44,
        width: 0.18,
        height: 0.22,
        color: '#FFB800',
        estimatedWeightKg: 0.25,
      },
      {
        label: 'POLYETHYLENE PACKAGING BAG',
        category: 'plastic',
        confidence: 0.89,
        threatLevel: 'moderate',
        x: 0.58,
        y: 0.35,
        width: 0.28,
        height: 0.36,
        color: '#FFB800',
        estimatedWeightKg: 0.18,
      },
      {
        label: 'ALUMINUM BEVERAGE CAN',
        category: 'metal_debris',
        confidence: 0.92,
        threatLevel: 'low',
        x: 0.14,
        y: 0.65,
        width: 0.16,
        height: 0.18,
        color: '#00F0FF',
        estimatedWeightKg: 0.15,
      },
    ],
    narrativeReport: "Optical analysis across the Indian Ocean coastal shelf reveals widespread benthic polymer litter: non-degraded PET bottles, high-density polyethylene film, and beverage cans. Turbidity is 54% due to sediment resuspension. Automated trajectory mapping indicates steady microplastic fragmentation under tidal current action.",
  },
  {
    id: 'toxic_drum',
    title: 'Industrial Harbor Chemical Drum Breach',
    location: 'Jebel Ali Marine Terminal Navigation Channel',
    coordinates: '24.9856° N, 55.0682° E',
    depthMeters: 11.8,
    turbidityPct: 72,
    tempCelsius: 29.2,
    expectedThreat: 'critical',
    description: 'Sunken 55-gallon industrial steel storage drum exhibiting corrosion with an endangered Green Sea Turtle swimming in proximity.',
    sampleDetections: [
      {
        label: '55-GAL TOXIC STEEL DRUM',
        category: 'toxic_drum',
        confidence: 0.98,
        threatLevel: 'critical',
        x: 0.38,
        y: 0.32,
        width: 0.42,
        height: 0.52,
        color: '#FF3366',
        estimatedWeightKg: 185.0,
      },
      {
        label: 'CHELONIA MYDAS (GREEN TURTLE)',
        category: 'marine_life',
        confidence: 0.95,
        threatLevel: 'low',
        x: 0.12,
        y: 0.16,
        width: 0.26,
        height: 0.28,
        color: '#00E699',
      },
    ],
    narrativeReport: "CRITICAL HAZARD: Sunken 55-gallon industrial chemical storage drum identified at 11.8m depth in Jebel Ali shipping channel, showing severe rust corrosion (~185 kg). An endangered Green Sea Turtle (Chelonia mydas) detected within 2.8m of the hazard zone. Port authority alert triggered; AUV heavy containment clamp deployed.",
  },
];

/**
 * Animated underwater canvas renderer for the selected scenario
 */
export function renderUnderwaterFrame(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  scenarioId: string,
  time: number
): void {
  // Clear
  ctx.clearRect(0, 0, width, height);

  // 1. Water gradient background (murky depth)
  let topColor = '#04223A';
  let botColor = '#021220';
  if (scenarioId === 'toxic_drum') {
    topColor = '#052D26'; // murky greenish harbor
    botColor = '#021B16';
  } else if (scenarioId === 'plastics') {
    topColor = '#042B46';
    botColor = '#021727';
  }

  const grad = ctx.createLinearGradient(0, 0, 0, height);
  grad.addColorStop(0, topColor);
  grad.addColorStop(1, botColor);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // 2. Sunlight water caustics effect
  ctx.save();
  ctx.fillStyle = 'rgba(0, 240, 255, 0.04)';
  for (let i = 0; i < 6; i++) {
    const angle = (time * 0.4 + i * 1.1);
    const xPos = (width * 0.15 * i) + Math.sin(angle) * 30;
    ctx.beginPath();
    ctx.moveTo(xPos, 0);
    ctx.lineTo(xPos + 60, height);
    ctx.lineTo(xPos + 120, height);
    ctx.lineTo(xPos + 20, 0);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();

  // 3. Seabed terrain / Reef
  ctx.fillStyle = '#0F2633';
  ctx.beginPath();
  ctx.moveTo(0, height * 0.78);
  ctx.bezierCurveTo(
    width * 0.25, height * 0.72 + Math.sin(time * 0.5) * 5,
    width * 0.65, height * 0.85,
    width, height * 0.75
  );
  ctx.lineTo(width, height);
  ctx.lineTo(0, height);
  ctx.closePath();
  ctx.fill();

  // 4. Scenario-specific animated objects
  if (scenarioId === 'ghost_net') {
    // Coral mound
    ctx.fillStyle = '#662244';
    ctx.beginPath();
    ctx.arc(width * 0.32, height * 0.75, width * 0.18, Math.PI, 0);
    ctx.fill();

    // Swaying tangled Ghost Net
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 120, 160, 0.75)';
    ctx.lineWidth = 1.8;
    const netX = width * 0.26;
    const netY = height * 0.35 + Math.sin(time * 0.8) * 8;
    const netW = width * 0.44;
    const netH = height * 0.38;

    // Grid lines of net
    for (let gx = 0; gx < netW; gx += 16) {
      ctx.beginPath();
      ctx.moveTo(netX + gx, netY + Math.sin(time + gx * 0.1) * 6);
      ctx.lineTo(netX + gx + 15, netY + netH + Math.sin(time + gx * 0.05) * 4);
      ctx.stroke();
    }
    for (let gy = 0; gy < netH; gy += 16) {
      ctx.beginPath();
      ctx.moveTo(netX, netY + gy + Math.sin(time + gy * 0.1) * 5);
      ctx.lineTo(netX + netW, netY + gy + 12);
      ctx.stroke();
    }
    ctx.restore();

    // Small swimming fish
    const fishX = (width * 0.75) + Math.cos(time * 1.2) * 40;
    const fishY = (height * 0.28) + Math.sin(time * 1.5) * 15;
    drawFish(ctx, fishX, fishY, '#00F0FF', 14);
  } else if (scenarioId === 'plastics') {
    // Plastic Bottle
    const bX = width * 0.38 + Math.sin(time * 0.6) * 4;
    const bY = height * 0.52 + Math.cos(time * 0.8) * 3;
    ctx.fillStyle = 'rgba(180, 240, 255, 0.65)';
    ctx.fillRect(bX, bY, 34, 18);
    ctx.fillStyle = '#0088FF';
    ctx.fillRect(bX + 34, bY + 4, 8, 10); // cap

    // Plastic bag floating
    const bagX = width * 0.68 + Math.cos(time * 0.5) * 12;
    const bagY = height * 0.42 + Math.sin(time * 0.7) * 8;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.beginPath();
    ctx.ellipse(bagX, bagY, 40, 26, Math.sin(time * 0.4) * 0.2, 0, Math.PI * 2);
    ctx.fill();

    // Metal can
    ctx.fillStyle = '#99BBCC';
    ctx.fillRect(width * 0.18, height * 0.72, 22, 14);
  } else if (scenarioId === 'toxic_drum') {
    // Submerged rusted chemical drum
    const dX = width * 0.44;
    const dY = height * 0.46;
    ctx.fillStyle = '#8B3A2B'; // rust color
    ctx.fillRect(dX, dY, 80, 110);
    ctx.fillStyle = '#5A2218';
    ctx.fillRect(dX + 10, dY + 30, 60, 15);
    ctx.fillRect(dX + 10, dY + 70, 60, 15);

    // Hazard skull symbol
    ctx.fillStyle = '#FFDD00';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText('☣ TOXIC', dX + 10, dY + 60);

    // Sea Turtle swimming
    const tX = width * 0.22 + Math.sin(time * 0.6) * 20;
    const tY = height * 0.24 + Math.cos(time * 0.7) * 12;
    drawTurtle(ctx, tX, tY, time);
  }

  // Floating micro-particulates / plankton
  ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
  for (let p = 0; p < 25; p++) {
    const px = (Math.sin(time * 0.2 + p * 43) * 0.5 + 0.5) * width;
    const py = (Math.cos(time * 0.15 + p * 29) * 0.5 + 0.5) * height;
    ctx.fillRect(px, py, 1.5, 1.5);
  }
}

function drawFish(ctx: CanvasRenderingContext2D, x: number, y: number, color: string, size: number): void {
  ctx.save();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.ellipse(x, y, size, size * 0.5, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(x + size, y);
  ctx.lineTo(x + size + 8, y - 6);
  ctx.lineTo(x + size + 8, y + 6);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawTurtle(ctx: CanvasRenderingContext2D, x: number, y: number, time: number): void {
  ctx.save();
  ctx.fillStyle = '#228B22'; // Shell
  ctx.beginPath();
  ctx.ellipse(x, y, 35, 24, 0.2, 0, Math.PI * 2);
  ctx.fill();

  // Head
  ctx.fillStyle = '#2E8B57';
  ctx.beginPath();
  ctx.arc(x - 38, y - 6, 10, 0, Math.PI * 2);
  ctx.fill();

  // Flippers
  const flipperWiggle = Math.sin(time * 2.5) * 8;
  ctx.beginPath();
  ctx.ellipse(x - 15, y - 24 + flipperWiggle, 20, 7, -0.4, 0, Math.PI * 2);
  ctx.ellipse(x - 15, y + 24 - flipperWiggle, 20, 7, 0.4, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}
