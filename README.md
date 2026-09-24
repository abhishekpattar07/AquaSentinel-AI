# 🌊 AquaSentinel AI (SubSea Vision / بحر-سنتينل)
### Autonomous Underwater Marine Debris & Ecological Anomaly Detection System

> *"Seeing through the ocean's depths when human eyes cannot."*

An AI-powered underwater video analytics platform engineered to detect ghost fishing nets, plastic pollutants, and toxic industrial hazards in real time. Features physics-informed spectral ocean dehazing with an interactive before/after split-slider, 120 kHz acoustic sonar radar with audio synthesis, AI mission briefings, and an autonomous AUV/ROV robotic cleanup mission dispatcher.

---

## 🏆 Hackathon Alignment & Track Mapping

* **NOVA 2026 — International Grand Finale (BITS Pilani Dubai Campus)**
  * **Primary Track:** *Track C — Sustainable & Next-Generation Technologies*
  * **Secondary Tracks:** *Space & DeepTech (Robotics & Autonomous Systems)* • *AI for Humanity (UN SDG 14: Life Below Water)*
* **Smart India Hackathon (SIH)**:
  * **Ministry:** *Ministry of Earth Sciences (MoES)*
  * **Problem Statement:** *AI-Powered Automated Underwater Marine Debris and Anomaly Detection System*

---

## 🌟 Key Innovations & Features

### Spectral Dehazing with Interactive Split-Slider
Drag the divider across the video feed to compare raw murky underwater footage (left) against AI-restored, color-corrected video (right) in real time. Physics-informed red-channel compensation based on the Beer-Lambert Law of underwater light attenuation.

### Multi-Class Neural Object Detection
Real-time detection and classification of:
- 🚨 **Ghost Fishing Nets** (Critical entanglement hazard)
- 🧴 **Plastic Debris** (PET bottles, polyethylene bags, microplastics)
- 🛢️ **Toxic Chemical Drums** (Industrial hazmat)
- 🐢 **Protected Marine Fauna** (Sea turtles, coral colonies, fish shoals)

### Interactive AI Model Controls
- **Confidence Threshold Slider** (50% – 95%): Dynamically filter detections in real time
- **Category Filter Chips**: Toggle Ghost Nets, Plastics, Toxics, and Marine Life independently

### Acoustic Sonar Radar & Audio Synthesis
- 120 kHz sonar circular sweep with tactical target blips
- Web Audio API synthesized sonar pings and critical threat alarm chimes
- Toggle: `🔊 SONAR ON / MUTED`

### AI Oceanographic Mission Briefing
Natural language executive summary analyzing risks and recommending specific robotic cleanup directives per scenario.

### Autonomous AUV / ROV Mission Dispatch
Generates automated robotic cleanup telemetry orders with:
- Target GPS coordinates and depth
- Specialized tool payload assignment (rotary net shears, venturi vacuum, containment clamps)
- Downloadable JSON mission brief

### Environmental Analytics & Export Suite
- **Marine Pollution Index (MPI)**: Dynamic 0–100 gauge
- **Cumulative Expedition Metrics**: Total scans, debris mass, protected species count
- **Live Mission Event Log**: Timestamped scrolling operation ticker
- 📄 **1-Click Printable / PDF Survey Report**
- 📊 **1-Click CSV Telemetry Export**

### Interactive 10-Slide Pitch Deck
Built directly into the application modal for instant jury presentation.

---

## 🚀 Getting Started (Run Locally in 2 Steps)

### Prerequisites
* **Node.js** (v18+ recommended)
* **npm** (v9+ recommended)

### Installation
```bash
# 1. Clone or navigate to the project directory
cd aquasentinel

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```
Open **[http://localhost:5173/](http://localhost:5173/)** in your browser.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend Framework** | React 19 + TypeScript + Vite |
| **Styling & HUD** | Tailwind CSS + Orbitron (HUD Font) + Cairo (Arabic Typography) |
| **Iconography** | Lucide React |
| **Computer Vision Engine** | Gemini 1.5 Flash Multimodal Vision API |
| **Image Processing** | HTML5 Canvas Spectral Filter Pipeline (Real-Time Split Dehazing) |
| **Audio Engine** | Web Audio API (Sonar Ping + Threat Alert Synthesis) |
| **Telemetry & Radar** | Canvas 2D Vector Sonar Graphics (120 kHz Simulation) |

---

## 📁 Project Structure
```
aquasentinel/
├── index.html                        # Tailwind CDN, Orbitron/Cairo fonts, dark HUD theme
├── package.json                      # React 19, Vite, Lucide React
├── src/
│   ├── types.ts                      # BoundingBox, Scenario, EventLog, CumulativeStats
│   ├── App.tsx                       # Master controller (audio, filters, exports, state)
│   ├── services/
│   │   ├── geminiVision.ts           # Gemini 1.5 Flash multimodal detection + fallbacks
│   │   ├── dehazeFilter.ts           # Spectral dehazing + interactive split-slider engine
│   │   ├── sampleVideoGenerator.ts   # 3 HD underwater scenario canvas renderers
│   │   └── marineAudio.ts            # Web Audio API sonar pings + threat alarm synthesizer
│   └── components/
│       ├── VideoAnalyzer.tsx          # Split-slider canvas + bounding box overlays + controls
│       ├── MarineHUD.tsx             # Sonar radar, MPI, filters, event log, stats, exports
│       ├── ROVMissionModal.tsx       # AUV robotic mission dispatch telemetry orders
│       └── PitchDeckModal.tsx        # Interactive 10-slide NOVA 2026 pitch deck
└── README.md
```

---

## 📜 Open-Source Attributions & Compliance
*In strict accordance with the NOVA 2026 Rules & Guidelines regarding open-source libraries and APIs:*

* **React & React-DOM** — Facebook Open Source (MIT License)
* **Vite** — Evan You & Vite Contributors (MIT License)
* **Tailwind CSS** — Tailwind Labs Inc. (MIT License)
* **Lucide React** — Lucide Contributors (ISC License)
* **Google Generative AI** — Google Gemini API Services
* **Optical Attenuation Physics** — Based on classical underwater radiative transfer models (Beer-Lambert Law)

All project logic, canvas shaders, dehazing algorithms, audio synthesizers, scenario renderers, and user interfaces were **originally created and developed specifically for NOVA 2026**.

---

## 🌍 Social Impact & Regional Alignment
* **United Arab Emirates (Dubai / GCC)**: Directly supports Dubai's coastal marine sanctuaries, coral restoration initiatives, and COP28 Ocean Action continuity.
* **India (MoES)**: Addresses the critical need for automated survey across India's 7,500 km coastline under the *Clean Sea* national initiative.
* **United Nations Sustainable Development Goals**:
  * **UN SDG 14:** *Life Below Water*
  * **UN SDG 9:** *Industry, Innovation, and Infrastructure*

---

## 📄 License
This project is licensed under the **MIT License** — participants retain full ownership of intellectual property in accordance with NOVA 2026 guidelines.
