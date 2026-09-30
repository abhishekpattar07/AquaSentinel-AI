import pptxgen from "pptxgenjs";

const pptx = new pptxgen();
pptx.layout = "LAYOUT_16x9";
pptx.author = "Team Trinex Bytes";
pptx.company = "BITS Pilani Dubai Campus - NOVA 2026";
pptx.title = "AquaSentinel AI - NOVA 2026 Pitch Deck";

// Define Color Palette
const NAVY = "0A192F";
const CYAN = "00D2FF";
const TEAL = "0A4D68";
const WHITE = "FFFFFF";
const SLATE = "64748B";
const LIGHT_BG = "F8FAFC";
const DARK_TEXT = "0F172A";
const BORDER = "E2E8F0";

// Helper for Content Slides
function createContentSlide(title, category, subtitle) {
  let s = pptx.addSlide();
  s.background = { color: WHITE };
  s.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: 13.33, h: 1.1, fill: { color: NAVY } });
  s.addText(category.toUpperCase(), { x: 0.8, y: 0.15, w: 11, h: 0.3, fontSize: 11, color: CYAN, bold: true, fontFace: "Arial" });
  s.addText(title, { x: 0.8, y: 0.45, w: 11, h: 0.5, fontSize: 22, color: WHITE, bold: true, fontFace: "Arial" });
  if (subtitle) {
    s.addText(subtitle, { x: 0.8, y: 1.22, w: 11.5, h: 0.35, fontSize: 12.5, color: SLATE, italic: true });
  }
  return s;
}

// ============================================================
// SLIDE 1: Title Slide (with Artwork)
// ============================================================
{
  let s1 = pptx.addSlide();
  s1.background = { color: NAVY };

  s1.addText("NOVA 2026 | SUSTAINABLE & NEXT-GEN TECHNOLOGIES", {
    x: 0.8, y: 0.8, w: 7.2, h: 0.4,
    fontSize: 13, fontFace: "Arial", color: CYAN, bold: true
  });
  s1.addText("AQUASENTINEL AI", {
    x: 0.8, y: 1.3, w: 7.2, h: 1.1,
    fontSize: 42, fontFace: "Arial", color: WHITE, bold: true
  });
  s1.addText("Autonomous Underwater Marine Debris Tracking, Physics-Informed Spectral Dehazing & AUV Fleet Mission Dispatch", {
    x: 0.8, y: 2.5, w: 6.8, h: 0.9,
    fontSize: 17, fontFace: "Arial", color: "94A3B8"
  });

  s1.addShape(pptx.shapes.RECTANGLE, { x: 0.8, y: 3.8, w: 6.8, h: 0.9, fill: { color: "112240" }, line: { color: CYAN, width: 1 } });
  s1.addText("TARGET SDG: UN SDG 14 — Life Below Water & Ocean Protection", {
    x: 1.0, y: 3.95, w: 6.4, h: 0.6, fontSize: 12.5, color: WHITE, bold: true
  });

  s1.addShape(pptx.shapes.RECTANGLE, { x: 0.8, y: 5.0, w: 6.8, h: 1.6, fill: { color: "112240" }, line: { color: "38BDF8", width: 1 } });
  s1.addText("INTERNATIONAL GRAND FINALE SUBMISSION\nBITS Pilani Dubai Campus • Microsoft Tech Club\nTeam: Trinex Bytes • Track C: Sustainable Technologies", {
    x: 1.0, y: 5.2, w: 6.4, h: 1.2, fontSize: 12, color: WHITE, lineSpacing: 20
  });

  // Embed Title Illustration
  s1.addImage({
    path: "C:/Users/d/Downloads/New folder/Architecture_Option2_Clean_Light.jpg",
    x: 8.0, y: 1.2, w: 4.8, h: 5.4,
    sizing: { type: "contain" }
  });
}

// ============================================================
// SLIDE 2: Problem Statement
// ============================================================
{
  let s2 = createContentSlide("The Crisis: Oceans Choking in Murky Waters", "1. Problem Statement", "Submerged debris is devastating marine ecosystems, but optical physics blinds human inspection.");

  s2.addShape(pptx.shapes.RECTANGLE, { x: 0.8, y: 1.8, w: 6.8, h: 1.45, fill: { color: LIGHT_BG }, line: { color: "FCA5A5" } });
  s2.addText("640,000 TONS / YEAR", { x: 1.0, y: 1.95, w: 3.0, h: 0.35, fontSize: 17, bold: true, color: "DC2626" });
  s2.addText("Ghost Fishing Nets: Abandoned synthetic nets drift for decades, silently killing marine megafauna and strangling vital coral reefs.", {
    x: 1.0, y: 2.35, w: 6.4, h: 0.8, fontSize: 12, color: DARK_TEXT
  });

  s2.addShape(pptx.shapes.RECTANGLE, { x: 0.8, y: 3.5, w: 6.8, h: 1.45, fill: { color: LIGHT_BG }, line: { color: "FDE68A" } });
  s2.addText("14 MILLION TONS", { x: 1.0, y: 3.65, w: 3.0, h: 0.35, fontSize: 17, bold: true, color: "D97706" });
  s2.addText("Seabed Microplastics: Plastics sink to benthic layers, fragmenting into toxic particles that poison food webs and coastal fisheries.", {
    x: 1.0, y: 4.05, w: 6.4, h: 0.8, fontSize: 12, color: DARK_TEXT
  });

  s2.addShape(pptx.shapes.RECTANGLE, { x: 0.8, y: 5.2, w: 6.8, h: 1.6, fill: { color: LIGHT_BG }, line: { color: "BAE6FD" } });
  s2.addText("THE OPTICAL ATTENUATION BARRIER", { x: 1.0, y: 5.35, w: 5.0, h: 0.35, fontSize: 16, bold: true, color: "0284C7" });
  s2.addText("Physical Light Extinction: Seawater absorbs red wavelengths within 5 meters. Murky turbidity and blue-green color casting blind standard AI models and human divers.", {
    x: 1.0, y: 5.75, w: 6.4, h: 0.95, fontSize: 12, color: DARK_TEXT
  });

  // Embed Coral & Net Photo
  s2.addImage({
    path: "C:/Users/d/Downloads/New folder/Extracted_Images_For_PPT/image1.png",
    x: 8.0, y: 1.8, w: 4.6, h: 5.0,
    sizing: { type: "contain" }
  });
}

// ============================================================
// SLIDE 3: Proposed Solution
// ============================================================
{
  let s3 = createContentSlide("The Solution: AquaSentinel AI Platform", "2. Proposed Solution", "An end-to-end autonomous perception, classification, and robotic dispatch platform.");

  s3.addShape(pptx.shapes.RECTANGLE, { x: 0.8, y: 1.8, w: 11.7, h: 1.4, fill: { color: "E0F2FE" }, line: { color: "38BDF8" } });
  s3.addText("Real-Time Underwater Vision Restorer & Robotic Telemetry Coordinator", {
    x: 1.1, y: 1.95, w: 11, h: 0.35, fontSize: 17, bold: true, color: "0369A1"
  });
  s3.addText("AquaSentinel bridges murky subsea feeds and cleanup robotics via instant physics-based spectral dehazing (compensating for red-light extinction), zero-shot neural hazard detection, and automated AUV dispatch.", {
    x: 1.1, y: 2.35, w: 11, h: 0.7, fontSize: 12.5, color: DARK_TEXT
  });

  const pCards = [
    { icon: "🎨", title: "Spectral Dehaze", desc: "Reconstructs lost red spectrum and natural RGB contrast using Beer-Lambert optical attenuation inversion." },
    { icon: "🚨", title: "Neural Detector", desc: "Isolates ghost nets, synthetic plastics, and corroded chemical barrels at >30 FPS on edge accelerators." },
    { icon: "📡", title: "120 kHz Sonar", desc: "Synthesizes acoustic chirps and radar sweeps for spatial orientation in turbid zero-visibility waters." },
    { icon: "🤖", title: "AUV Fleet Dispatch", desc: "Generates standardized JSON/ROS telemetry orders for autonomous robotic recovery missions." }
  ];
  pCards.forEach((c, idx) => {
    let x = 0.8 + idx * 3.0;
    s3.addShape(pptx.shapes.RECTANGLE, { x: x, y: 3.5, w: 2.7, h: 3.3, fill: { color: LIGHT_BG }, line: { color: "CBD5E1" } });
    s3.addText(c.icon, { x: x + 0.2, y: 3.7, w: 2.3, h: 0.4, fontSize: 24, align: "center" });
    s3.addText(c.title, { x: x + 0.2, y: 4.2, w: 2.3, h: 0.4, fontSize: 15, bold: true, color: TEAL, align: "center" });
    s3.addText(c.desc, { x: x + 0.2, y: 4.7, w: 2.3, h: 1.9, fontSize: 12, color: DARK_TEXT, align: "center" });
  });
}

// ============================================================
// SLIDE 4: Technical Architecture (with Flowchart Image)
// ============================================================
{
  let s4 = createContentSlide("Technical Architecture & Data Pipeline", "3. Technical Architecture", "Modular edge-to-cloud pipeline engineered for sub-second real-time execution.");

  // Embed Architecture Flowchart
  s4.addImage({
    path: "C:/Users/d/Downloads/New folder/Architecture_Clean_Flowchart_Only.png",
    x: 0.8, y: 1.8, w: 11.7, h: 3.6,
    sizing: { type: "contain" }
  });

  // Explanatory Bottom Strip
  const archSteps = [
    { step: "1. Sensor Ingestion", desc: "1080p optical camera + 120 kHz sonar telemetry" },
    { step: "2. Spectral Dehaze", desc: "Beer-Lambert physical color compensation" },
    { step: "3. Neural Inference", desc: "Gemini Vision & YOLO edge bounding classification" },
    { step: "4. Mission Dispatch", desc: "ROS / MAVLink telemetry orders for AUV recovery" }
  ];
  archSteps.forEach((s, idx) => {
    let x = 0.8 + idx * 3.0;
    s4.addShape(pptx.shapes.RECTANGLE, { x: x, y: 5.6, w: 2.7, h: 1.3, fill: { color: LIGHT_BG }, line: { color: "38BDF8" } });
    s4.addText(s.step, { x: x + 0.15, y: 5.75, w: 2.4, h: 0.3, fontSize: 12, bold: true, color: "0284C7" });
    s4.addText(s.desc, { x: x + 0.15, y: 6.05, w: 2.4, h: 0.75, fontSize: 11, color: DARK_TEXT });
  });
}

// ============================================================
// SLIDE 5: Core Innovation (with Infographic)
// ============================================================
{
  let s5 = createContentSlide("Core Innovation & Technological Moat", "4. Innovation", "Three technological breakthroughs setting AquaSentinel apart from generic vision models.");

  const inno = [
    { title: "Physics-Informed Spectral De-Hazing", desc: "Unlike naive brightness filters that wash out detail, our algorithm models water's selective absorption coefficient mathematically, reconstructing lost red wavelengths and backscatter contrast without distorting fauna." },
    { title: "Lattice Geometry Net Entanglement Sentry", desc: "Ghost nets blend almost invisibly into reef structures. AquaSentinel uses custom structural lattice edge analysis to isolate synthetic diamond-mesh patterns even when obscured by organic algal bloom." },
    { title: "Marine Fauna Co-Existence Safety Guard", desc: "Autonomous environmental ethics: The system continuously scans for protected marine species (sea turtles, dugongs) and automatically injects mission-hold telemetry if wildlife breaches the operation perimeter." }
  ];

  inno.forEach((item, idx) => {
    let y = 1.8 + idx * 1.65;
    s5.addShape(pptx.shapes.RECTANGLE, { x: 0.8, y: y, w: 6.8, h: 1.45, fill: { color: LIGHT_BG }, line: { color: "93C5FD" } });
    s5.addText(item.title, { x: 1.0, y: y + 0.15, w: 6.4, h: 0.35, fontSize: 14.5, bold: true, color: "0369A1" });
    s5.addText(item.desc, { x: 1.0, y: y + 0.5, w: 6.4, h: 0.85, fontSize: 11.5, color: DARK_TEXT });
  });

  // Embed Innovation Infographic
  s5.addImage({
    path: "C:/Users/d/Downloads/New folder/Slide5_Tech_Stack_Infographic.jpg",
    x: 8.0, y: 1.8, w: 4.6, h: 5.0,
    sizing: { type: "contain" }
  });
}

// ============================================================
// SLIDE 6: Live Working Prototype
// ============================================================
{
  let s6 = createContentSlide("Live Working Prototype — 8 Interactive Capabilities", "Prototype Demonstration", "Zero hardware setup required — fully responsive, edge-ready, and browser native.");

  const feats = [
    { title: "Interactive Split-Slider", desc: "Live comparison of raw murky feed vs physics-dehazed subsea imagery." },
    { title: "Confidence Thresholding", desc: "Adjustable 50%–95% threshold to eliminate false positives in real time." },
    { title: "120 kHz Sonar Radar", desc: "Acoustic sweep simulation with live blips and audio chirp synthesized via Web Audio API." },
    { title: "3 Real-World Scenarios", desc: "Dubai Coast Coral Net (-16.4m), Indian Ocean Plastics (-28.2m), Jebel Ali Toxic Drum (-11.8m)." },
    { title: "Marine Pollution Index", desc: "Dynamic MPI gauge (0–100) scoring environmental contamination levels." },
    { title: "Automated Report Export", desc: "1-Click PDF survey inspection certificates and JSON telemetry payload downloads." },
    { title: "Fauna Safeguard", desc: "Automatic safety abort when endangered Green Sea Turtles are detected near recovery tools." },
    { title: "Offline Autonomous Mode", desc: "Runs 100% locally in any browser with zero network or server dependencies." }
  ];

  feats.forEach((f, idx) => {
    let col = idx % 4;
    let row = Math.floor(idx / 4);
    let x = 0.8 + col * 3.0;
    let y = 1.8 + row * 2.5;

    s6.addShape(pptx.shapes.RECTANGLE, { x: x, y: y, w: 2.7, h: 2.25, fill: { color: LIGHT_BG }, line: { color: "CBD5E1" } });
    s6.addText(f.title, { x: x + 0.15, y: y + 0.2, w: 2.4, h: 0.35, fontSize: 13.5, bold: true, color: TEAL });
    s6.addText(f.desc, { x: x + 0.15, y: y + 0.6, w: 2.4, h: 1.5, fontSize: 11.5, color: DARK_TEXT });
  });
}

// ============================================================
// SLIDE 7: Feasibility & Tech Stack (with Diagram)
// ============================================================
{
  let s7 = createContentSlide("Edge Feasibility & Operational Specs", "Technical Feasibility", "Designed for deployment aboard compact micro-AUVs and research vessels.");

  s7.addShape(pptx.shapes.RECTANGLE, { x: 0.8, y: 1.8, w: 3.6, h: 1.3, fill: { color: LIGHT_BG }, line: { color: "BAE6FD" } });
  s7.addText(">30 FPS", { x: 1.0, y: 1.95, w: 3.2, h: 0.45, fontSize: 24, bold: true, color: "0284C7" });
  s7.addText("Real-Time Frame Latency: Sub-35ms pipeline ensures immediate collision avoidance and active hazard tracking.", {
    x: 1.0, y: 2.4, w: 3.2, h: 0.6, fontSize: 11, color: DARK_TEXT
  });

  s7.addShape(pptx.shapes.RECTANGLE, { x: 4.8, y: 1.8, w: 3.6, h: 1.3, fill: { color: LIGHT_BG }, line: { color: "A7F3D0" } });
  s7.addText("EDGE READY", { x: 5.0, y: 1.95, w: 3.2, h: 0.45, fontSize: 24, bold: true, color: "059669" });
  s7.addText("NVIDIA Jetson & WASM: Low-power compute profile maximizes AUV battery sortie duration during deep dives.", {
    x: 5.0, y: 2.4, w: 3.2, h: 0.6, fontSize: 11, color: DARK_TEXT
  });

  s7.addShape(pptx.shapes.RECTANGLE, { x: 8.8, y: 1.8, w: 3.7, h: 1.3, fill: { color: LIGHT_BG }, line: { color: "FDE68A" } });
  s7.addText("100% OFFLINE", { x: 9.0, y: 1.95, w: 3.3, h: 0.45, fontSize: 24, bold: true, color: "D97706" });
  s7.addText("Autonomous Disconnected Mode: Operates isolated from cloud connectivity via cached weights & acoustic relays.", {
    x: 9.0, y: 2.4, w: 3.3, h: 0.6, fontSize: 11, color: DARK_TEXT
  });

  // Embed Tech Stack Graphic
  s7.addImage({
    path: "C:/Users/d/Downloads/New folder/Professional_Tech_Stack_White.jpg",
    x: 0.8, y: 3.3, w: 11.7, h: 3.5,
    sizing: { type: "contain" }
  });
}

// ============================================================
// SLIDE 8: Regional & Global Impact (with Impact Charts)
// ============================================================
{
  let s8 = createContentSlide("Dubai, UAE & Global Environmental Impact", "5. Market & Social Impact", "Directly advancing Arabian Gulf conservation and international marine protection.");

  s8.addShape(pptx.shapes.RECTANGLE, { x: 0.8, y: 1.8, w: 6.8, h: 1.5, fill: { color: "ECFDF5" }, line: { color: "10B981" } });
  s8.addText("Arabian Gulf & Dubai Marine Environment Protection", {
    x: 1.0, y: 1.95, w: 6.4, h: 0.35, fontSize: 15, bold: true, color: "047857"
  });
  s8.addText("Supports UAE Marine Protected Areas (MPAs), safeguarding Arabian Gulf coral formations and the world's second-largest resident population of dugongs. Integrates with Dubai Harbor smart-port environmental monitoring.", {
    x: 1.0, y: 2.35, w: 6.4, h: 0.85, fontSize: 11.5, color: DARK_TEXT
  });

  s8.addShape(pptx.shapes.RECTANGLE, { x: 0.8, y: 3.5, w: 6.8, h: 1.5, fill: { color: LIGHT_BG }, line: { color: "CBD5E1" } });
  s8.addText("UN SDG 14: Life Below Water & Global Plastic Treaty", {
    x: 1.0, y: 3.65, w: 6.4, h: 0.35, fontSize: 14, bold: true, color: TEAL
  });
  s8.addText("Direct contribution to Target 14.1 (marine litter reduction). Generates verifiable, geo-tagged debris metrics providing audit-ready data for international environmental enforcement.", {
    x: 1.0, y: 4.05, w: 6.4, h: 0.85, fontSize: 11.5, color: DARK_TEXT
  });

  s8.addShape(pptx.shapes.RECTANGLE, { x: 0.8, y: 5.2, w: 6.8, h: 1.6, fill: { color: LIGHT_BG }, line: { color: "CBD5E1" } });
  s8.addText("Economic & Commercial Maritime Safety", {
    x: 1.0, y: 5.35, w: 6.4, h: 0.35, fontSize: 14, bold: true, color: TEAL
  });
  s8.addText("Reduces annual propeller entanglement damages ($1.2B maritime industry cost) and cuts commercial diver hazardous inspection risk by up to 80% through robotic pre-surveying.", {
    x: 1.0, y: 5.75, w: 6.4, h: 0.95, fontSize: 11.5, color: DARK_TEXT
  });

  // Embed Impact Chart Image
  s8.addImage({
    path: "C:/Users/d/Downloads/New folder/Slide7_Impact_Charts.png",
    x: 8.0, y: 1.8, w: 4.6, h: 5.0,
    sizing: { type: "contain" }
  });
}

// ============================================================
// SLIDE 9: Roadmap (with Infographic)
// ============================================================
{
  let s9 = createContentSlide("Product Roadmap & Commercial Milestones", "Milestones", "A clear path from engineering prototype to maritime fleet integration.");

  const phases = [
    { phase: "PHASE 1: CURRENT (Q3 2026)", title: "NOVA 2026 Submission", desc: "Interactive browser command dashboard, Gemini Vision classification, 120 kHz sonar chirp, and AUV telemetry order generator." },
    { phase: "PHASE 2: NOV 2026", title: "Dubai Finale Field Test", desc: "Live in-water trial with BITS Pilani Dubai ocean engineering faculty using low-cost tethered ROV hardware." },
    { phase: "PHASE 3: 2027", title: "Autonomous Drone Swarm", desc: "Multi-vehicle acoustic swarm coordination for automated 24/7 port perimeter defense and debris recovery." }
  ];

  phases.forEach((p, idx) => {
    let y = 1.8 + idx * 1.65;
    s9.addShape(pptx.shapes.RECTANGLE, { x: 0.8, y: y, w: 6.8, h: 1.45, fill: { color: LIGHT_BG }, line: { color: "38BDF8" } });
    s9.addText(p.phase, { x: 1.0, y: y + 0.15, w: 3.5, h: 0.3, fontSize: 11.5, color: "0284C7", bold: true });
    s9.addText(p.title, { x: 1.0, y: y + 0.45, w: 6.4, h: 0.35, fontSize: 14.5, bold: true, color: DARK_TEXT });
    s9.addText(p.desc, { x: 1.0, y: y + 0.8, w: 6.4, h: 0.55, fontSize: 11.5, color: SLATE });
  });

  // Embed Roadmap Infographic
  s9.addImage({
    path: "C:/Users/d/Downloads/New folder/Slide7_Impact_Infographic.jpg",
    x: 8.0, y: 1.8, w: 4.6, h: 5.0,
    sizing: { type: "contain" }
  });
}

// ============================================================
// SLIDE 10: Conclusion Slide
// ============================================================
{
  let s10 = pptx.addSlide();
  s10.background = { color: NAVY };
  s10.addText("INVENT THE INFINITE", { x: 0.8, y: 1.4, w: 11.5, h: 0.5, fontSize: 18, color: CYAN, bold: true, align: "center" });
  s10.addText("AquaSentinel AI", { x: 0.8, y: 2.0, w: 11.5, h: 1.1, fontSize: 44, color: WHITE, bold: true, align: "center" });
  s10.addText("Protecting the Blue Heart of Our Planet with Autonomous Intelligence", { x: 0.8, y: 3.2, w: 11.5, h: 0.5, fontSize: 19, color: "94A3B8", italic: true, align: "center" });

  s10.addShape(pptx.shapes.RECTANGLE, { x: 2.2, y: 4.2, w: 8.9, h: 2.0, fill: { color: "112240" }, line: { color: CYAN, width: 1 } });
  s10.addText("SUBMISSION FOR NOVA 2026\nOrganized by KVGCE Sphere Hive × Microsoft Tech Club\nInternational Grand Finale: BITS Pilani Dubai Campus\nTeam: Trinex Bytes • Track C: Sustainable Technologies\nContact: microsofttechclub@dubai.bits-pilani.ac.in", {
    x: 2.4, y: 4.4, w: 8.5, h: 1.6, fontSize: 13, color: WHITE, align: "center", lineSpacing: 22
  });
}

// Save to disk (both root and public directory for instant download)
const outputPath1 = "C:/Users/d/Downloads/New folder/AquaSentinel_NOVA2026_PitchDeck.pptx";
const outputPath2 = "C:/Users/d/Downloads/New folder/aquasentinel/public/AquaSentinel_NOVA2026_PitchDeck.pptx";

pptx.writeFile({ fileName: outputPath1 }).then(() => {
  return pptx.writeFile({ fileName: outputPath2 });
}).then(() => {
  console.log("PPTX successfully generated and synchronized to public folder!");
}).catch(err => {
  console.error("Error creating PPTX:", err);
});
