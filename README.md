# 🪞 LifeMirror — Addiction Awareness & Healthcare Outreach Platform!

[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-API_v2-8E75FF?style=flat-square&logo=google&logoColor=white)](https://ai.google.dev/)

> **"Every habit has a story. And every story can have a different next chapter."**
> 
> LifeMirror is a healthcare outreach and reflection platform designed to help individuals reflect on behavioral and substance addictions (online betting, alcohol, smoking, smartphone overuse, gaming, etc.) and connect them confidentially with nearest accredited rehabilitation centers, psychiatrists, and 24/7 care helplines.

---

## 📑 Table of Contents

- [✨ Key Features](#-key-features)
- [🏗️ System Architecture & Tech Stack](#️-system-architecture--tech-stack)
- [📋 Prerequisites](#-prerequisites)
- [🚀 Quick Start (Local Setup)](#-quick-start-local-setup)
- [⚙️ Environment Configuration](#️-environment-configuration)
- [📂 Project Directory Structure](#-project-directory-structure)
- [📱 Core Workflows](#-core-workflows)
  - [1. WhatsApp Direct Outreach (`wa.me` Dispatcher)](#1-whatsapp-direct-outreach-wame-dispatcher)
  - [2. User Reflection Experience](#2-user-reflection-experience)
  - [3. Nearest Rehab Recommender & Registration](#3-nearest-rehab-recommender--registration)
  - [4. Admin Care Pipeline & Leads Analytics](#4-admin-care-pipeline--leads-analytics)
- [📜 Available NPM Scripts](#-available-npm-scripts)
- [🩺 Health Centers & Rehabs Database](#-health-centers--rehabs-database)
- [🔒 Confidentiality & Security](#-confidentiality--security)
- [❓ Troubleshooting & FAQ](#-troubleshooting--faq)
- [📄 License](#-license)

---

## ✨ Key Features!

- **⚡ 1-Click WhatsApp Direct Dispatcher (`wa.me`)**:
  - Dispatch personalized reflection messages with deep-linked video experiences directly to any phone number in one click.
  - Zero complex setup required for direct browser-to-WhatsApp dispatching.
  - Supports automated Meta WhatsApp Cloud API gateway integration for scalable enterprise campaigns.

- **🎥 Interactive Timeline Reflection Simulator**:
  - Category-matched cinematic videos for **Online Betting** (`betting.mp4`), **Alcohol** (`alcohol.mp4`), **Smoking** (`smoking.mp4`), **Smartphone Addiction** (`smartphone.mp4`), **Gaming** (`gaming.mp4`), and other behavioral dependencies.
  - Multi-chapter storytelling with visual mood progression, reflective prompts, and interactive scrubber.

- **🏥 Nearest Rehab & Clinical De-Addiction Recommender**:
  - Intelligent geospatial matching suggesting certified de-addiction hospitals and recovery sanctuaries based on participant city (**Hyderabad, Bengaluru, Mumbai, Delhi-NCR, Chennai, Pune, Visakhapatnam, Vijayawada, Kolkata, etc.**).
  - Displays distance in kilometers, doctor credentials (e.g. Chief Psychiatrists, Neurotherapists), NABH/Government licenses, treatment modalities (CBT, Medical Detox, 12-Step), ratings, and direct WhatsApp/call connections.

- **🤝 Confidential Care Intake & Priority Registration**:
  - 100% judgment-free, end-to-end encrypted intake registration.
  - Assigns unique Confidential Case IDs (e.g., `LM-REG-9812`) and logs participants into the clinical caseworker triage pipeline.

- **📊 Comprehensive Outreach & Leads Analytics Dashboard**:
  - Real-time conversion funnel tracking: Dispatches $\rightarrow$ Delivered $\rightarrow$ Opened $\rightarrow$ Completed Reflection $\rightarrow$ Support Registered.
  - Risk categorization (High / Moderate / Low) and direct CSV/JSON export.

---

## 🏗️ System Architecture & Tech Stack

| Layer | Technology / Library | Description |
| :--- | :--- | :--- |
| **Frontend Framework** | React 19 + TypeScript | High performance, type-safe reactive UI |
| **Styling & Design** | Tailwind CSS v4 | Utility-first, responsive dark-mode aesthetic |
| **Build & Dev Tool** | Vite 6 | Instant HMR and optimized production bundle |
| **Icons & Visuals** | Lucide React | Clean, modern feather-based icon set |
| **Animations & Confetti**| Motion (`motion/react`) & Canvas Confetti | Smooth transitions and celebration feedback |
| **QR Code Engine** | `qrcode.react` | Instant mobile scanning for on-device testing |
| **Backend & Proxy** | Express 4 + TypeScript | Optional server proxy for webhooks and APIs |
| **AI Intelligence** | Google Gemini API (`@google/genai`) | AI-assisted message personalization and analysis |

---

## 📋 Prerequisites

Before running the application locally, ensure you have the following installed on your machine:

1. **Node.js**: `v18.0.0` or higher (Recommended: `v20.x` LTS or `v22.x`)
   - Check version: `node -v`
2. **NPM**: `v9.0.0` or higher (bundled with Node.js)
   - Check version: `npm -v`
3. **Git**: Installed for version control
   - Check version: `git --version`
4. **Modern Web Browser**: Google Chrome, Mozilla Firefox, Microsoft Edge, or Safari.

---

## 🚀 Quick Start (Local Setup)

Follow these step-by-step instructions to get the application up and running on your local machine:

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/lifemirror.git
cd lifemirror
```

### 2. Install Project Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a local `.env` file from the provided `.env.example`:
```bash
cp .env.example .env
```
*(Optional: Open `.env` and configure your API keys if you want Gemini AI or Meta WhatsApp Cloud API integrations. The app functions completely out-of-the-box in local development mode without required external keys).*

### 4. Start the Local Development Server
```bash
npm run dev
```

### 5. Open the Application in your Browser
Once the dev server starts, navigate to:
```
http://localhost:3000
```
*(Or the specific port displayed in your terminal).*

---

## ⚙️ Environment Configuration

The application includes an `.env.example` file. Below is the reference configuration:

```ini
# ==============================================================================
# Google Gemini API Configuration (Optional)
# Required for automated AI personalization and generative reflection summaries.
# Get a free key at: https://aistudio.google.com/
# ==============================================================================
GEMINI_API_KEY=""

# ==============================================================================
# Application URL
# Used for generating live recipient experience links and deep links.
# In local development, defaults to http://localhost:3000
# ==============================================================================
APP_URL="http://localhost:3000"

# ==============================================================================
# Meta WhatsApp Cloud API (Optional - For automated backend push)
# If left blank, the app defaults to direct client-side WhatsApp (wa.me) dispatch.
# ==============================================================================
WHATSAPP_API_TOKEN=""
WHATSAPP_PHONE_NUMBER_ID=""
```

---

## 📂 Project Directory Structure

```text
├── index.html                    # HTML entry point with meta tags & fonts
├── metadata.json                 # Project configuration and capabilities
├── package.json                  # Dependencies, build scripts & versions
├── tsconfig.json                 # TypeScript compiler configuration
├── vite.config.ts                # Vite build and Tailwind plugin configuration
├── .env.example                  # Environment variables template
│
└── src/
    ├── main.tsx                  # React DOM rendering entry point
    ├── App.tsx                   # Main router and view switcher
    ├── index.css                 # Global Tailwind CSS imports & animations
    ├── types.ts                  # Shared TypeScript interfaces & types
    │
    ├── context/
    │   └── AppContext.tsx        # Global state management (leads, videos, registrations)
    │
    ├── data/
    │   ├── mockData.ts           # Curated video library, chapters & initial leads
    │   └── rehabCenters.ts       # Comprehensive database of verified rehab centers
    │
    ├── services/
    │   └── WhatsAppService.ts    # WhatsApp dispatcher (wa.me link builder & Cloud API)
    │
    └── components/
        ├── Navbar.tsx                     # Top navigation header
        ├── Sidebar.tsx                    # Side drawer navigation
        ├── Dashboard.tsx                  # Overview metrics, charts & quick actions
        ├── WhatsAppOutreachView.tsx       # Campaign manager & bulk outreach table
        ├── DirectWhatsAppDispatcherModal.tsx # 1-Click WhatsApp Direct Dispatcher (wa.me)
        ├── UserExperienceView.tsx         # Cinematic video player & reflection flow
        ├── SupportRegistrationModal.tsx   # Nearest rehab recommender & intake form
        ├── RegistrationsView.tsx          # Care pipeline & assigned rehab cases
        ├── LeadsView.tsx                  # Recipient leads tracking & risk matrix
        ├── VideoLibraryView.tsx           # Category video asset catalog
        ├── VideoPlayerModal.tsx           # Video preview modal
        ├── LeadDetailModal.tsx            # Deep-dive lead activity & logs modal
        ├── CategoriesView.tsx             # Addiction categories management
        ├── AnalyticsView.tsx              # Conversion charts & engagement metrics
        ├── SettingsView.tsx               # API credentials & source phone config
        └── ToastContainer.tsx             # Responsive notification toasts
```

---

## 📱 Core Workflows

### 1. WhatsApp Direct Outreach (`wa.me` Dispatcher)
1. Click **"🚀 Direct WhatsApp (1-Click)"** in the top navigation or WhatsApp Outreach view.
2. Enter the target recipient's phone number (e.g. `9014848294`).
3. Select the relevant habit category (e.g. `Online Betting`, `Alcohol`, `Smoking`).
4. Click **"HIT WHATSAPP MESSAGE NOW (1-CLICK SEND)"**.
5. The application opens WhatsApp with the exact personalized message and deep-link pre-filled:
   > *"Every habit has a story. And every story can have a different next chapter.*  
   > *🎥 Watch this short video: [Link]*  
   > *If you feel that a habit is starting to control your time, money, health, or relationships, you don't have to deal with it alone.*  
   > *🏥 Please register on the link above to find verified rehab centers near your location."*

### 2. User Reflection Experience
- The recipient opens the secure reflection link (`/?view=experience&cat=Online+Betting&phone=+919014848294`).
- They watch the timeline simulator depicting potential future trajectories and reflection prompts.
- At any point during or after the video, the user can click **"Register / Find Nearest Rehabs"**.

### 3. Nearest Rehab Recommender & Registration
1. **Step 1 (User Information & Location)**:
   - Participant enters their name/alias, contact phone, and selects their city (e.g., *Hyderabad, Bengaluru, Mumbai, Chennai, Visakhapatnam*, etc.).
2. **Step 2 (Suggested Nearest Rehabs)**:
   - System filters and ranks accredited de-addiction facilities by distance and category specialty.
   - Shows doctor profiles, NABH accreditation, and direct call/WhatsApp buttons for each center.
3. **Step 3 (Intake Confirmation)**:
   - Issues a confidential case tracking ID and connects the user to priority care.

### 4. Admin Care Pipeline & Leads Analytics
- Clinical caseworkers can switch to the **"Registrations"** or **"Leads"** tabs to view real-time intake cases, update follow-up statuses, and view assigned facilities.

---

## 📜 Available NPM Scripts

Inside the project directory, you can run:

```bash
# Start development server on port 3000 with host binding
npm run dev

# Run TypeScript typecheck without emitting output
npm run lint

# Build optimized production bundle to the /dist directory
npm run build

# Preview the local production build
npm run preview

# Clean up build artifacts and temporary files
npm run clean
```

---

## 🩺 Health Centers & Rehabs Database

The platform includes a built-in verified registry of top accredited rehab centers across India and Tele-Rehab networks in `/src/data/rehabCenters.ts`:

- **Hyderabad / Telangana**: Hope Trust India (Jubilee Hills), Asha Hospital (Banjara Hills), Phoenix Foundation (Gachibowli).
- **Bengaluru / Karnataka**: NIMHANS Centre for Addiction Medicine (CAM), Cadabam's Amitha.
- **Mumbai / Pune (Maharashtra)**: Veda Wellness Recovery (Bandra), Muktangan Mitra (Yerwada).
- **Delhi-NCR**: Tulasi Healthcare (Mehrauli), AIIMS National Drug Dependence Treatment Centre (NDDTC).
- **Chennai / Tamil Nadu**: TTK Hospital & De-Addiction Center (Adyar).
- **Andhra Pradesh**: Care & Cure Center (Visakhapatnam), Sanjeevani Neuro-Psychiatry (Vijayawada).
- **Kolkata / East India**: Antara Psychiatric Hospital (South 24 Parganas).
- **Virtual / Tele-Rehab**: LifeMirror 24/7 Virtual Clinical Tele-Rehab Network (Nationwide).

---

## 🔒 Confidentiality & Security

- **Zero-Judgment Ethics**: Designed strictly as an empathetic health initiative.
- **No Unsolicited PII Storage**: Participants can register anonymously with an alias.
- **End-to-End Encryption**: WhatsApp communications rely on WhatsApp's native protocol.
- **Role-Based Admin Access**: Clinical leads and intake records are restricted to verified caseworker views.

---

## ❓ Troubleshooting & FAQ

<details>
<summary><strong>Q: What if the port 3000 is already in use?</strong></summary>

You can specify a different port when running the dev server:
```bash
npx vite --port=3001
```
</details>

<details>
<summary><strong>Q: How do I test the mobile recipient view on my physical phone?</strong></summary>

1. Ensure your phone and computer are on the same Wi-Fi network.
2. In the app, click **"📱 Mobile QR / Test Gateway"** in the top navigation.
3. Scan the generated QR code with your smartphone camera.
</details>

<details>
<summary><strong>Q: Can I customize the video files and categories?</strong></summary>

Yes! Navigate to `/src/data/mockData.ts` to add or edit video filenames, category titles, narrative chapters, and reflection prompts.
</details>

---

## 📄 License

This project is licensed under the **MIT License** — feel free to use, customize, and deploy it for addiction awareness and healthcare initiatives.

---

<div align="center">
  <sub>Built with care for public health & recovery awareness. LifeMirror Healthcare Initiative.</sub>
</div>
!
