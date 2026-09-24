/**
 * Underwater Spectral Dehazing & Color Restorer
 * Compensates for physical attenuation of Red wavelengths and turbid scattering in ocean water.
 * Supports split-slider side-by-side comparison rendering.
 */

export function applyOceanDehazing(
  sourceCanvas: HTMLCanvasElement,
  targetCanvas: HTMLCanvasElement,
  intensity: number = 0.85
): void {
  const ctx = targetCanvas.getContext('2d');
  if (!ctx) return;

  const w = sourceCanvas.width;
  const h = sourceCanvas.height;

  targetCanvas.width = w;
  targetCanvas.height = h;

  // Draw original frame
  ctx.drawImage(sourceCanvas, 0, 0, w, h);

  if (intensity <= 0) return;

  try {
    const imgData = ctx.getImageData(0, 0, w, h);
    processDehazePixels(imgData.data, intensity);
    ctx.putImageData(imgData, 0, 0);
  } catch (err) {
    console.warn('Dehazing filter fallback:', err);
  }
}

/**
 * Renders a side-by-side Before / After Split View on a single canvas
 * Left of splitRatio = Raw Murky Input
 * Right of splitRatio = Dehazed Color Restored
 */
export function applySplitDehazing(
  sourceCanvas: HTMLCanvasElement,
  targetCanvas: HTMLCanvasElement,
  splitRatio: number = 0.5, // 0.0 to 1.0
  intensity: number = 0.90
): void {
  const ctx = targetCanvas.getContext('2d');
  if (!ctx) return;

  const w = sourceCanvas.width;
  const h = sourceCanvas.height;

  targetCanvas.width = w;
  targetCanvas.height = h;

  // 1. Draw raw frame as base
  ctx.drawImage(sourceCanvas, 0, 0, w, h);

  const splitX = Math.max(0, Math.min(w, Math.round(w * splitRatio)));

  // 2. Process the right side (dehazed portion)
  if (splitX < w && intensity > 0) {
    try {
      const dehazeWidth = w - splitX;
      const imgData = ctx.getImageData(splitX, 0, dehazeWidth, h);
      processDehazePixels(imgData.data, intensity);
      ctx.putImageData(imgData, splitX, 0);
    } catch (err) {
      console.warn('Split dehaze fallback:', err);
    }
  }

  // 3. Draw tactical vertical dividing line
  ctx.save();
  ctx.strokeStyle = '#00F0FF';
  ctx.lineWidth = 2.5;
  ctx.shadowColor = '#00F0FF';
  ctx.shadowBlur = 8;

  ctx.beginPath();
  ctx.moveTo(splitX, 0);
  ctx.lineTo(splitX, h);
  ctx.stroke();

  // Draw slider handle circle in the center
  const midY = h / 2;
  ctx.fillStyle = '#00F0FF';
  ctx.beginPath();
  ctx.arc(splitX, midY, 14, 0, Math.PI * 2);
  ctx.fill();

  // Inner arrows in circle
  ctx.fillStyle = '#020B14';
  ctx.font = 'bold 12px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('◀▶', splitX, midY);

  // Tactical Text Badges on Left & Right
  ctx.shadowBlur = 0;
  ctx.font = 'bold 11px Orbitron, monospace';

  // Left Tag: RAW OPTICAL
  if (splitX > 80) {
    ctx.fillStyle = 'rgba(4, 21, 39, 0.85)';
    ctx.fillRect(10, 10, 110, 22);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 1;
    ctx.strokeRect(10, 10, 110, 22);
    ctx.fillStyle = '#94A3B8';
    ctx.fillText('RAW OPTICAL', 65, 22);
  }

  // Right Tag: AI RESTORED
  if (w - splitX > 110) {
    ctx.fillStyle = 'rgba(4, 21, 39, 0.85)';
    ctx.fillRect(w - 120, 10, 110, 22);
    ctx.strokeStyle = '#00F0FF';
    ctx.lineWidth = 1;
    ctx.strokeRect(w - 120, 10, 110, 22);
    ctx.fillStyle = '#00F0FF';
    ctx.fillText('AI RESTORED', w - 65, 22);
  }

  ctx.restore();
}

function processDehazePixels(d: Uint8ClampedArray, intensity: number): void {
  const len = d.length;
  const redBoost = 1.0 + (intensity * 1.45);
  const blueAttenuation = 1.0 - (intensity * 0.12);
  const contrastFactor = 1.0 + (intensity * 0.32);
  const intercept = 128 * (1 - contrastFactor);

  for (let i = 0; i < len; i += 4) {
    let r = d[i];
    let g = d[i + 1];
    let b = d[i + 2];

    // Compensate red channel loss
    const ambientLight = (g * 0.65 + b * 0.35);
    r = Math.min(255, r * redBoost + (ambientLight - r) * (intensity * 0.5));

    // Suppress green scatter
    g = Math.max(0, Math.min(255, g * 0.94 + r * 0.06));
    b = Math.min(255, b * blueAttenuation);

    // Dynamic contrast stretching
    r = Math.min(255, Math.max(0, r * contrastFactor + intercept));
    g = Math.min(255, Math.max(0, g * contrastFactor + intercept));
    b = Math.min(255, Math.max(0, b * contrastFactor + intercept));

    d[i] = r;
    d[i + 1] = g;
    d[i + 2] = b;
  }
}
