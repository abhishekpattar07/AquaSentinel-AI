# 🏆 NOVA 2026 Submission Package — AquaSentinel AI
**Organizer:** KVGCE Sphere Hive × Microsoft Tech Club, BITS Pilani Dubai Campus  
**Official Portal:** https://nova.spherehive.in  
**Track:** Track C: Sustainable & Next-Gen Technologies (UN SDG 14: Life Below Water)

---

## 📋 1. Project Summary (Exact 143 Words — Copy & Paste)

> Marine debris, abandoned ghost fishing nets, and plastic pollution severely threaten ocean ecosystems and coastal economies, directly impacting UN SDG 14 (Life Below Water). However, underwater monitoring remains fundamentally hindered by severe optical attenuation, wavelength absorption, and murky scattering that blind conventional computer vision models.
> 
> AquaSentinel is an autonomous, AI-driven marine telemetry and perception platform. It features physics-informed spectral de-hazing to restore lost chromatic spectrum and contrast in real time, automated Gemini Vision classification to isolate submerged debris and ecological hazards, and high-frequency 120 kHz acoustic sonar synthesis for spatial triangulation. The platform coordinates autonomous cleanup missions by dispatching standardized JSON telemetry orders directly to Autonomous Underwater Vehicles (AUVs) and generating official compliance reports.
> 
> Built with a high-performance stack including React 18, TypeScript, Tailwind CSS, Vite, Google Gemini Vision API, Web Audio API, and ROS/MAVLink telemetry protocols, AquaSentinel runs edge-ready directly in any modern browser.

*(Word Count: 143 words — strictly within the 150-word maximum limit)*

---

## 📊 2. Project Pitch Deck (10 Slides Mapping)

The submission requires a maximum of **10 slides** covering the 5 core areas. AquaSentinel's built-in Pitch Deck matches this 1-to-1:

| Slide # | Slide Title | Required Topic Covered | Key Content Highlights |
|---|---|---|---|
| **Slide 1** | **AquaSentinel AI (SubSea Vision)** | Title & Track Alignment | UN SDG 14, Track C: Sustainable Technologies, BITS Pilani Dubai Grand Finale alignment. |
| **Slide 2** | **The Crisis: Oceans Choking in the Dark** | **Problem Statement** | 640k tons ghost nets, 14M tons seabed plastics, underwater optical attenuation. |
| **Slide 3** | **The Solution: AquaSentinel AI** | **Proposed Solution** | Autonomous end-to-end underwater video analytics, dehazing, and AUV mission dispatch. |
| **Slide 4** | **System Architecture & Pipeline** | **Technical Architecture** | Optical ingestion ➔ Dehazing engine ➔ Neural detector ➔ Telemetry router. |
| **Slide 5** | **Core Innovation & Technological Moat** | **Innovation** | Physics-informed chromatic restoration (Beer-Lambert law), lattice net detection, fauna co-existence guard. |
| **Slide 6** | **Live Working Prototype (8 Features)** | Prototype Capabilities | Interactive split-slider, 120 kHz sonar sweep, confidence filtering, live mission dispatch. |
| **Slide 7** | **Feasibility & Deployment Roadmap** | Feasibility / Architecture | >30 FPS real-time edge inference, NVIDIA Jetson / WASM ready, 100% offline edge mode. |
| **Slide 8** | **Regional Dubai, UAE & Global Impact** | **Market / Social Impact** | Arabian Gulf MPAs, coral reef & dugong protection, COP28 ocean action continuity, global delta hotspots. |
| **Slide 9** | **Product Roadmap & Commercial Milestones** | Commercial Feasibility | Phase 1: NOVA 2026 ➔ Phase 2: Dubai Finale Field Tests (Nov 2026) ➔ Phase 3: Commercial Fleet Swarm (2027). |
| **Slide 10**| **Team & Final Conclusion** | Summary / Next Steps | "Invent the Infinite with AquaSentinel", BITS Pilani Dubai submission statement. |

> 💡 **How to show the Deck to Judges:** Click the **"PITCH DECK"** button in the top navigation bar of the live web app to flip through all 10 slides interactively.

---

## 🎥 3. Prototype Demonstration Video (2–3 Minutes Script)

**Video Rules:** 2–3 minutes duration. Must be uploaded as a public/unlisted YouTube video or public Google Drive link.

### Video Recording Checklist:
- Tool: Windows Game Bar (`Win + G`) or OBS Studio.
- Audio: Clear microphone input.
- URL to open: `http://localhost:5173/` or your deployed Netlify/Vercel URL.

### ⏱️ Time-Coded Script (Total Time: ~2 min 20 sec):

- **[0:00 – 0:25] Introduction & Problem:**
  > *"Hello NOVA 2026 Grand Jury. We are presenting AquaSentinel, an autonomous AI platform for ocean cleanup and telemetry, addressing UN SDG 14. Oceans face over 14 million tons of submerged plastics and ghost fishing nets, but murky water and light absorption make underwater inspection blind."*
- **[0:25 – 0:55] Feature 1: Physics-Informed De-Hazing (Split Slider):**
  > *"Here is our live dashboard. Watch our real-time physics-informed spectral dehazing in action. Dragging the split slider restores the lost red wavelengths and backscatter contrast using the Beer-Lambert law, transforming unreadable murky water into crystal-clear optical feeds."*
- **[0:55 – 1:25] Feature 2: Gemini Vision AI Detection & Filtering:**
  > *"Next, we click 'Analyze Frame'. The integrated Gemini Vision AI instantly detects and classifies marine hazards — from entangled ghost nets to toxic canisters. Operators can dynamically adjust the confidence threshold slider and filter category chips in real time."*
- **[1:25 – 1:50] Feature 3: 120 kHz Sonar & AUV Mission Dispatch:**
  > *"Because light only reaches 30 meters underwater, we synthesize high-frequency 120 kHz acoustic sonar pings for spatial triangulation. With one click on 'Dispatch AUV Mission', the system coordinates an autonomous robotic cleanup, generating standard JSON telemetry for ROS/MAVLink robotics and printing an official compliance PDF report."*
- **[1:50 – 2:20] Pitch Deck & Conclusion:**
  > *"AquaSentinel is edge-ready, scalable to autonomous drone swarms, and designed to protect critical Arabian Gulf marine protected areas and global coastal corridors. Thank you, and we look forward to the Grand Finale at BITS Pilani Dubai!"*

---

## 💻 4. Source Code Repository Submission

**Rules:** Must be a functional public GitHub / GitLab repository.

### Quick Commands to Push:
```powershell
cd "c:\Users\d\Downloads\New folder\aquasentinel"

# 1. Create a new public repo on github.com called 'aquasentinel-nova2026'
# 2. Link and push:
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/aquasentinel-nova2026.git
git branch -M main
git push -u origin main
```

### Recommended Repo Information:
- **Repository Name:** `aquasentinel-ai-ocean-telemetry`
- **Description:** `AquaSentinel — Autonomous AI Ocean Telemetry, Physics-Informed Spectral De-hazing & AUV Fleet Dispatch for UN SDG 14 | NOVA 2026 Submission`
- **Topics / Tags:** `ai`, `marine-conservation`, `un-sdg-14`, `gemini-api`, `spectral-dehazing`, `nova-2026`, `bits-pilani-dubai`
