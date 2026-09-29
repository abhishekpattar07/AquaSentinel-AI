import pptxgen from "pptxgenjs";

const pptx = new pptxgen();
pptx.layout = "LAYOUT_16x9";
pptx.author = "Team AquaSentinel";
pptx.company = "BITS Pilani Dubai Campus - NOVA 2026";
pptx.title = "AquaSentinel AI - NOVA 2026 Pitch Deck";

// Define Colors
const NAVY = "0A192F";
const CYAN = "00D2FF";
const TEAL = "0A4D68";
const WHITE = "FFFFFF";
const SLATE = "64748B";
const LIGHT_BG = "F8FAFC";
const DARK_TEXT = "0F172A";

// Slide 1: Title
let s1 = pptx.addSlide();
s1.background = { color: NAVY };
s1.addText("NOVA 2026 | SUSTAINABLE & NEXT-GEN TECHNOLOGIES", {
  x: 0.8, y: 0.8, w: 11.5, h: 0.5,
  fontSize: 14, fontFace: "Arial", color: CYAN, bold: true
});
s1.addText("AQUASENTINEL AI", {
  x: 0.8, y: 1.5, w: 11.5, h: 1.2,
  fontSize: 44, fontFace: "Arial", color: WHITE, bold: true
});
s1.addText("Autonomous Underwater Marine Debris Tracking, Physics-Informed Spectral De-hazing & AUV Fleet Mission Dispatch", {
  x: 0.8, y: 2.8, w: 10.5, h: 0.8,
  fontSize: 20, fontFace: "Arial", color: "94A3B8"
});
s1.addShape(pptx.shapes.RECTANGLE, { x: 0.8, y: 4.2, w: 4.2, h: 1.2, fill: { color: "112240" }, line: { color: CYAN, width: 1 } });
s1.addText("TARGET SDG: UN SDG 14\nLife Below Water & Ocean Protection", {
  x: 1.0, y: 4.4, w: 3.8, h: 0.8, fontSize: 13, color: WHITE, bold: true, align: "center"
});
s1.addShape(pptx.shapes.RECTANGLE, { x: 5.4, y: 4.2, w: 5.5, h: 1.2, fill: { color: "112240" }, line: { color: "38BDF8", width: 1 } });
s1.addText("GRAND FINALE QUALIFIER\nBITS Pilani Dubai Campus • Microsoft Tech Club", {
  x: 5.6, y: 4.4, w: 5.1, h: 0.8, fontSize: 13, color: WHITE, bold: true, align: "center"
});

// Helper for Content Slides
function createContentSlide(title, category, subtitle) {
  let s = pptx.addSlide();
  s.background = { color: WHITE };
  s.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: 13.33, h: 1.1, fill: { color: NAVY } });
  s.addText(category.toUpperCase(), { x: 0.8, y: 0.15, w: 11, h: 0.3, fontSize: 11, color: CYAN, bold: true, fontFace: "Arial" });
  s.addText(title, { x: 0.8, y: 0.45, w: 11, h: 0.5, fontSize: 22, color: WHITE, bold: true, fontFace: "Arial" });
  if (subtitle) {
    s.addText(subtitle, { x: 0.8, y: 1.25, w: 11.5, h: 0.4, fontSize: 13, color: SLATE, italic: true });
  }
  return s;
}

// Slide 2: Problem Statement
let s2 = createContentSlide("The Crisis: Oceans Choking in Murky Waters", "1. Problem Statement", "Submerged debris is devastating marine ecosystems, but optical physics blinds human inspection.");
s2.addShape(pptx.shapes.RECTANGLE, { x: 0.8, y: 1.8, w: 3.6, h: 4.8, fill: { color: LIGHT_BG }, line: { color: "E2E8F0" } });
s2.addText("640,000 TONS", { x: 1.0, y: 2.1, w: 3.2, h: 0.5, fontSize: 24, bold: true, color: "DC2626" });
s2.addText("Ghost Fishing Nets\n\nAbandoned synthetic nets drift continuously, strangling marine life, destroying delicate coral reefs, and trapping endangered sea turtles and dugongs.", { x: 1.0, y: 2.8, w: 3.2, h: 3.4, fontSize: 14, color: DARK_TEXT });

s2.addShape(pptx.shapes.RECTANGLE, { x: 4.8, y: 1.8, w: 3.6, h: 4.8, fill: { color: LIGHT_BG }, line: { color: "E2E8F0" } });
s2.addText("14 MILLION TONS", { x: 5.0, y: 2.1, w: 3.2, h: 0.5, fontSize: 24, bold: true, color: "D97706" });
s2.addText("Seabed Microplastics\n\nPlastics sink and break down into micro-particles, contaminating benthic marine habitats and entering the global seafood food supply chain.", { x: 5.0, y: 2.8, w: 3.2, h: 3.4, fontSize: 14, color: DARK_TEXT });

s2.addShape(pptx.shapes.RECTANGLE, { x: 8.8, y: 1.8, w: 3.7, h: 4.8, fill: { color: LIGHT_BG }, line: { color: "E2E8F0" } });
s2.addText("OPTICAL FOG", { x: 9.0, y: 2.1, w: 3.3, h: 0.5, fontSize: 24, bold: true, color: "0284C7" });
s2.addText("Physical Attenuation Barrier\n\nWater absorbs red light within 5 meters. Murky scattering and greenish haze cause conventional computer vision algorithms to fail completely underwater.", { x: 9.0, y: 2.8, w: 3.3, h: 3.4, fontSize: 14, color: DARK_TEXT });

// Slide 3: Proposed Solution
let s3 = createContentSlide("The Solution: AquaSentinel AI Command Platform", "2. Proposed Solution", "An end-to-end autonomous perception, classification, and robotic dispatch platform.");
s3.addShape(pptx.shapes.RECTANGLE, { x: 0.8, y: 1.8, w: 11.7, h: 1.5, fill: { color: "E0F2FE" }, line: { color: "38BDF8" } });
s3.addText("Real-Time Underwater Vision Restorer & Robotic Telemetry Coordinator", { x: 1.1, y: 2.0, w: 11, h: 0.4, fontSize: 18, bold: true, color: "0369A1" });
s3.addText("AquaSentinel bridges the gap between murky subsea video feeds and autonomous cleanup robotics by performing instant physics-based color restoration, multi-modal object detection, and standardized AUV mission dispatch.", { x: 1.1, y: 2.5, w: 11, h: 0.6, fontSize: 13, color: DARK_TEXT });

const pCards = [
  { title: "Spectral Dehaze", desc: "Restores lost red spectrum & contrasts in real-time." },
  { title: "Neural Detector", desc: "Pinpoints ghost nets, plastics, and toxic barrels." },
  { title: "120 kHz Sonar", desc: "Acoustic chirp synthesis for spatial navigation." },
  { title: "AUV Fleet Dispatch", desc: "Generates JSON telemetry & PDF compliance orders." }
];
pCards.forEach((c, idx) => {
  let x = 0.8 + idx * 3.0;
  s3.addShape(pptx.shapes.RECTANGLE, { x: x, y: 3.6, w: 2.7, h: 3.0, fill: { color: LIGHT_BG }, line: { color: "CBD5E1" } });
  s3.addText(c.title, { x: x + 0.2, y: 3.9, w: 2.3, h: 0.4, fontSize: 15, bold: true, color: TEAL });
  s3.addText(c.desc, { x: x + 0.2, y: 4.5, w: 2.3, h: 1.8, fontSize: 13, color: DARK_TEXT });
});

// Slide 4: Technical Architecture
let s4 = createContentSlide("Technical Architecture & Data Pipeline", "3. Technical Architecture", "Modular edge-to-cloud pipeline engineered for sub-second real-time execution.");
const archBoxes = [
  { step: "1. Ingestion", title: "Subsea Optical & Sonar", desc: "AUV/ROV camera stream, 120 kHz acoustic telemetry pings." },
  { step: "2. Preprocessing", title: "Spectral Dehazing Engine", desc: "Physics-guided Beer-Lambert attenuation restoration algorithm." },
  { step: "3. AI Inference", title: "Gemini Vision Multi-Modal", desc: "Bounding box isolation, confidence scoring & classification." },
  { step: "4. Coordination", title: "AUV Telemetry Dispatch", desc: "Standard JSON telemetry formatted for ROS & MAVLink control." }
];
archBoxes.forEach((b, idx) => {
  let x = 0.8 + idx * 3.0;
  s4.addShape(pptx.shapes.RECTANGLE, { x: x, y: 2.0, w: 2.7, h: 4.6, fill: { color: NAVY } });
  s4.addText(b.step, { x: x + 0.2, y: 2.3, w: 2.3, h: 0.3, fontSize: 12, color: CYAN, bold: true });
  s4.addText(b.title, { x: x + 0.2, y: 2.8, w: 2.3, h: 0.8, fontSize: 16, color: WHITE, bold: true });
  s4.addText(b.desc, { x: x + 0.2, y: 3.8, w: 2.3, h: 2.4, fontSize: 13, color: "94A3B8" });
});

// Slide 5: Core Innovation
let s5 = createContentSlide("Core Technological Innovation & Moat", "4. Innovation", "Three technological breakthroughs setting AquaSentinel apart from generic vision models.");
const inno = [
  { title: "Physics-Informed Spectral De-Hazing", desc: "Unlike naive brightness filters that wash out details, our algorithm models water's selective absorption coefficient mathematically, reconstructing lost red wavelengths and backscatter contrast without distorting underlying fauna." },
  { title: "Lattice Geometry Net Entanglement Sentry", desc: "Ghost nets blend almost invisibly into reef structures. AquaSentinel uses custom structural lattice edge analysis to isolate synthetic diamond-mesh patterns even when obscured by organic algal bloom." },
  { title: "Marine Fauna Co-Existence Safety Guard", desc: "Autonomous environmental ethics: The system continuously scans for protected marine species (sea turtles, dugongs) and automatically injects mission-hold telemetry if wildlife breaches the operation perimeter." }
];
inno.forEach((item, idx) => {
  let y = 1.9 + idx * 1.6;
  s5.addShape(pptx.shapes.RECTANGLE, { x: 0.8, y: y, w: 11.7, h: 1.4, fill: { color: LIGHT_BG }, line: { color: "93C5FD" } });
  s5.addText(item.title, { x: 1.1, y: y + 0.15, w: 11.1, h: 0.4, fontSize: 16, bold: true, color: "0369A1" });
  s5.addText(item.desc, { x: 1.1, y: y + 0.55, w: 11.1, h: 0.75, fontSize: 12.5, color: DARK_TEXT });
});

// Slide 6: Prototype Features
let s6 = createContentSlide("Live Working Prototype Demonstration", "Prototype Highlights", "Zero hardware setup required — fully responsive, edge-ready, and browser native.");
const feats = [
  { title: "Interactive Split Slider", desc: "Live comparison of raw vs restored subsea imagery." },
  { title: "Confidence Thresholding", desc: "Adjustable 50%-95% threshold to eliminate false positives." },
  { title: "120 kHz Sonar Radar", desc: "Acoustic sweep simulation with live blips and audio chirp." },
  { title: "Automated Report Export", desc: "1-Click PDF inspection certificates and CSV telemetry data." }
];
feats.forEach((f, idx) => {
  let x = idx % 2 === 0 ? 0.8 : 6.8;
  let y = idx < 2 ? 1.9 : 4.3;
  s6.addShape(pptx.shapes.RECTANGLE, { x: x, y: y, w: 5.7, h: 2.1, fill: { color: LIGHT_BG }, line: { color: "CBD5E1" } });
  s6.addText(f.title, { x: x + 0.3, y: y + 0.2, w: 5.1, h: 0.4, fontSize: 16, bold: true, color: TEAL });
  s6.addText(f.desc, { x: x + 0.3, y: y + 0.7, w: 5.1, h: 1.1, fontSize: 13, color: DARK_TEXT });
});

// Slide 7: Feasibility & Deployment
let s7 = createContentSlide("Edge Feasibility & Operational Specs", "Technical Feasibility", "Designed for deployment aboard compact micro-AUVs and research vessels.");
s7.addShape(pptx.shapes.RECTANGLE, { x: 0.8, y: 2.0, w: 3.6, h: 4.5, fill: { color: LIGHT_BG }, line: { color: "CBD5E1" } });
s7.addText(">30 FPS", { x: 1.0, y: 2.3, w: 3.2, h: 0.6, fontSize: 32, bold: true, color: "0284C7" });
s7.addText("Real-Time Inference\n\nOptimized pipeline delivers sub-35ms frame latency, ensuring immediate collision avoidance and debris tracking.", { x: 1.0, y: 3.2, w: 3.2, h: 3.0, fontSize: 14, color: DARK_TEXT });

s7.addShape(pptx.shapes.RECTANGLE, { x: 4.8, y: 2.0, w: 3.6, h: 4.5, fill: { color: LIGHT_BG }, line: { color: "CBD5E1" } });
s7.addText("EDGE READY", { x: 5.0, y: 2.3, w: 3.2, h: 0.6, fontSize: 32, bold: true, color: "059669" });
s7.addText("NVIDIA Jetson & WASM\n\nCompiled for edge microcomputers with minimal power consumption, maximizing AUV battery runtime during long sorties.", { x: 5.0, y: 3.2, w: 3.2, h: 3.0, fontSize: 14, color: DARK_TEXT });

s7.addShape(pptx.shapes.RECTANGLE, { x: 8.8, y: 2.0, w: 3.7, h: 4.5, fill: { color: LIGHT_BG }, line: { color: "CBD5E1" } });
s7.addText("100% OFFLINE", { x: 9.0, y: 2.3, w: 3.3, h: 0.6, fontSize: 32, bold: true, color: "D97706" });
s7.addText("Subsea Mission Mode\n\nFunctions fully disconnected from cellular/cloud networks using local onboard cached weights and acoustic relay.", { x: 9.0, y: 3.2, w: 3.3, h: 3.0, fontSize: 14, color: DARK_TEXT });

// Slide 8: Regional & Global Impact
let s8 = createContentSlide("Dubai, UAE & Global Environmental Impact", "5. Market & Social Impact", "Directly advancing Arabian Gulf conservation and international marine protection.");
s8.addShape(pptx.shapes.RECTANGLE, { x: 0.8, y: 1.9, w: 11.7, h: 2.0, fill: { color: "ECFDF5" }, line: { color: "10B981" } });
s8.addText("Arabian Gulf & Dubai Marine Environment Protection", { x: 1.1, y: 2.1, w: 11, h: 0.4, fontSize: 18, bold: true, color: "047857" });
s8.addText("Supports UAE Marine Protected Areas (MPAs), safeguarding delicate Arabian Gulf coral formations and the world's second-largest resident population of dugongs. Directly integrates with Dubai Harbor smart-port environmental monitoring initiatives.", { x: 1.1, y: 2.6, w: 11, h: 1.1, fontSize: 13, color: DARK_TEXT });

s8.addShape(pptx.shapes.RECTANGLE, { x: 0.8, y: 4.2, w: 5.7, h: 2.4, fill: { color: LIGHT_BG }, line: { color: "CBD5E1" } });
s8.addText("UN SDG 14: Life Below Water", { x: 1.1, y: 4.4, w: 5.1, h: 0.4, fontSize: 16, bold: true, color: TEAL });
s8.addText("Measurable progress on Target 14.1 (marine litter reduction). Verifiable, geo-tagged debris metrics provide audit-ready proof for global plastic treaties.", { x: 1.1, y: 4.9, w: 5.1, h: 1.5, fontSize: 13, color: DARK_TEXT });

s8.addShape(pptx.shapes.RECTANGLE, { x: 6.8, y: 4.2, w: 5.7, h: 2.4, fill: { color: LIGHT_BG }, line: { color: "CBD5E1" } });
s8.addText("Economic & Harbor Value", { x: 7.1, y: 4.4, w: 5.1, h: 0.4, fontSize: 16, bold: true, color: TEAL });
s8.addText("Reduces annual propeller entanglement damages ($1.2B maritime industry cost) and cuts commercial diver inspection risk by up to 80%.", { x: 7.1, y: 4.9, w: 5.1, h: 1.5, fontSize: 13, color: DARK_TEXT });

// Slide 9: Roadmap
let s9 = createContentSlide("Product Roadmap & Commercial Milestones", "Milestones", "A clear path from hackathon prototype to maritime fleet integration.");
const phases = [
  { phase: "PHASE 1: CURRENT", title: "NOVA 2026 Submission", desc: "Interactive browser command dashboard, Gemini Vision classification, 120 kHz sonar chirp, and AUV telemetry order generator." },
  { phase: "PHASE 2: NOV 2026", title: "Dubai Finale Field Test", desc: "Live in-water trial with BITS Pilani Dubai ocean engineering faculty using low-cost tethered ROV hardware." },
  { phase: "PHASE 3: 2027", title: "Autonomous Drone Swarm", desc: "Multi-vehicle acoustic swarm coordination for automated 24/7 port perimeter defense and debris recovery." }
];
phases.forEach((p, idx) => {
  let y = 1.9 + idx * 1.6;
  s9.addShape(pptx.shapes.RECTANGLE, { x: 0.8, y: y, w: 11.7, h: 1.4, fill: { color: LIGHT_BG }, line: { color: "38BDF8" } });
  s9.addText(p.phase, { x: 1.1, y: y + 0.15, w: 3.5, h: 0.3, fontSize: 12, color: "0284C7", bold: true });
  s9.addText(p.title, { x: 1.1, y: y + 0.45, w: 11.1, h: 0.4, fontSize: 16, bold: true, color: DARK_TEXT });
  s9.addText(p.desc, { x: 1.1, y: y + 0.85, w: 11.1, h: 0.45, fontSize: 12.5, color: SLATE });
});

// Slide 10: Conclusion
let s10 = pptx.addSlide();
s10.background = { color: NAVY };
s10.addText("INVENT THE INFINITE", { x: 0.8, y: 1.5, w: 11.5, h: 0.6, fontSize: 18, color: CYAN, bold: true, align: "center" });
s10.addText("AquaSentinel AI", { x: 0.8, y: 2.2, w: 11.5, h: 1.2, fontSize: 44, color: WHITE, bold: true, align: "center" });
s10.addText("Protecting the Blue Heart of Our Planet with Autonomous Intelligence", { x: 0.8, y: 3.5, w: 11.5, h: 0.6, fontSize: 20, color: "94A3B8", italic: true, align: "center" });

s10.addShape(pptx.shapes.RECTANGLE, { x: 2.5, y: 4.6, w: 8.3, h: 1.6, fill: { color: "112240" }, line: { color: CYAN, width: 1 } });
s10.addText("SUBMISSION FOR NOVA 2026\nOrganized by KVGCE Sphere Hive × Microsoft Tech Club\nInternational Grand Finale: BITS Pilani Dubai Campus\nTeam: AquaSentinel • Contact: microsofttechclub@dubai.bits-pilani.ac.in", {
  x: 2.7, y: 4.8, w: 7.9, h: 1.2, fontSize: 13, color: WHITE, align: "center"
});

// Save to disk
const outputPath = "C:/Users/d/Downloads/New folder/AquaSentinel_NOVA2026_PitchDeck.pptx";
pptx.writeFile({ fileName: outputPath }).then(fileName => {
  console.log(`PPTX successfully created at: ${fileName}`);
}).catch(err => {
  console.error("Error creating PPTX:", err);
});
