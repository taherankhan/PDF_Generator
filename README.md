# 📄 MD-PDF-Generator (Markdown to PDF Converter)

[![React Version](https://img.shields.io/badge/react-v18.2.0-blue.svg?logo=react)](https://reactjs.org/)
[![Vite Version](https://img.shields.io/badge/vite-v6.4.2-64748b.svg?logo=vite)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/typescript-v5.3.3-3178c6.svg?logo=typescript)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**MD-PDF-Generator** is a highly optimized, professional, and entirely client-side web application designed to write, preview, and convert Markdown documents into beautiful, production-ready PDF files. 

Built with **React**, **TypeScript**, and **Vite**, it combines a clean, user-friendly live editor interface with advanced multi-theme document compilers and page-break optimizing PDF renderers.

---

## 🌟 Key Features

### 1. Live Markdown Editor with Document Analytics
* **Split-Screen Workspace:** Interactive real-time rendering. Write markdown on the left, see it styled instantly on the right.
* **Smart Insertion & Editing:** Integrated monospaced editor pane supporting standard hotkeys.
* **Document Analytics:** Real-time counter reporting character counts, word counts, and line counts.
* **Focus Modes:** Instantly toggle either the Editor or the Preview pane into fullscreen to maximize screen real estate.
* **Frontmatter-Aware Compiler:** Automatically parses and strips YAML frontmatter, making it fully compatible with files imported from Obsidian, Jekyll, Hugo, or Gatsby.

### 2. Six Custom-Curated Document Themes
Easily select typography, spacing, and styling targeted for various use-cases:
* **Professional:** Clean, modern corporate layout using the *Inter* font family and crisp blue accents.
* **Academic:** Formal document format utilizing serif typography (*Merriweather* / *Georgia*), tailored line spacing (`1.8`), and traditional black margins.
* **Minimal:** A sleek, high-whitespace grayscale style utilizing *Helvetica Neue* for minimalists.
* **Creative:** Bold, modern design utilizing the *Poppins* font family, orange/red accents, and warm highlighted sections.
* **Dark:** Eye-strain-reducing dark mode workspace featuring *Roboto*, dark-gray backdrops, and soft green/blue highlights.
* **Resume (CV):** Highly optimized layout tailored specifically for CVs. Uses tight grid spacing (`1.4` line-height), standard `11pt Calibri` body text, elegant *Georgia* section headers, and compact margins to fit details onto single pages.

### 3. Smart PDF Generation & Layout Optimization
* **A4 Standard Conformity:** Outputs documents formatted precisely for international standard A4 dimensions (210mm x 297mm).
* **Smart Page Breaks:** Features custom CSS rule-avoidance injection (`page-break-inside: avoid` and `break-inside: avoid` for `h1`-`h6`, `pre`, `code`, `table`, list elements, and `blockquote`) preventing content from being split awkwardly across page seams.
* **Syntax Highlighting Preservation:** Syntax highlighted code blocks styled via PrismJS (using the premium *Tomorrow* theme) are fully rendered and preserved in the final PDF.
* **Cross-Origin Image Resolution:** Automatically parses all external image paths (`<img>`) in the Markdown. Attempts to fetch them, convert them to local Base64 Data URLs, and injects them to prevent blank spaces/tainted canvas blocks. Runs an automated fallback proxy (`allorigins`) for strict CORS-protected assets.

### 4. 100% Client-Side Privacy-Centric Sharing
* **Zero Backend Storage:** Share your markdown files without storing a single byte on external databases.
* **LZString Hash Compression:** Compresses both your Markdown text and chosen theme configurations into a highly compressed, URI-safe string that is appended directly to the URL hash fragment (`#d=...`).
* **Maximum Security:** Because the data payload resides in the URL hash, it is never transmitted to the hosting web server during network hops, guaranteeing full data ownership and client-side privacy.

---

## 🛠️ Technological Stack

* **Core Framework:** React 18.2.0 & TypeScript 5.3.3
* **Build Engine:** Vite 6.4.2
* **Styling & Icons:** SASS (SCSS), Bootstrap 5.3.3 (`react-bootstrap`), & Bootstrap Icons
* **Markdown Compiler:** `marked` (with GFM line-breaks activated)
* **PDF Synthesis:** `jspdf` & `html2canvas`
* **Syntax Highlighting:** `prismjs` & `prism-themes` (Tomorrow CSS)
* **URL Compression:** `lz-string`
* **Animations:** GSAP (GreenSock Animation Platform) for the percentage-loader splash screen
* **State Management:** React Query 3.38.0
* **Form & Validation Handler:** Formik & Yup
* **Routing:** React Router DOM 6
* **Analytics Tracker:** React GA4 (Google Analytics)

---

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js (v18.x or higher) and npm/yarn installed on your machine.

### Installation
Clone the repository and install the required dependencies:
```bash
git clone https://github.com/taherankhan/PDF_Generator.git
cd PDF_Generator
npm install
```

### Run Development Server
Spin up the Vite local development server with hot module replacement (HMR):
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production
Compile the optimized static build of the application:
```bash
npm run build
```
This command outputs static client assets in the `/dist` directory.

### Preview Production Build Locally
You can preview the compiled static build using Vite:
```bash
npm run preview
```

### Running Server Mode
The project includes a lightweight Node/Express production hosting server in [server.js](file:///d:/git_projects/PDF_Generator/server.js). You can run this file to host the production-compiled `dist` folder:
```bash
node server.js
```
The application will serve from [http://localhost:3026](http://localhost:3026).

---

## 📂 Directory Structure

The key structure of the application is organized as follows:

```text
PDF_Generator/
├── public/                  # Static assets (Favicons, webmanifests, loading styles)
├── src/
│   ├── admin/               # SCSS themes, global helper components, and i18n
│   │   ├── assets/          # SASS styling sheets
│   │   └── i18n/            # Language translation providers
│   ├── api/                 # Axios configurations and endpoint services
│   ├── app/                 # Routing, Views and Pages
│   │   ├── modules/
│   │   │   ├── editor/      # Main workspace, input/preview panels, and export engines
│   │   │   └── landing/     # App entry portal & landing layout
│   │   └── routing/         # React Router navigation maps
│   ├── services/            # Core business logic
│   │   ├── AnalyticsService.ts    # GA4 trackers (event, pages, downloads)
│   │   ├── markdownParser.ts      # Marked.js config & frontmatter removal
│   │   ├── pdfGenerator.ts        # jsPDF/html2canvas sandbox rendering rules
│   │   └── shareLinkService.ts    # LZString URL hash encoders/decoders
│   ├── themes/              # Custom design sheets (Academic, Resume, Creative, etc.)
│   ├── main.tsx             # Application mount entrypoint
│   └── vite-env.d.ts        # TypeScript declarations
├── server.js                # Express static server for host environments
├── vite.config.ts           # Vite plugin settings
├── tsconfig.json            # TypeScript configuration
└── package.json             # Package scripts & dependency list
```

---

## ⚙️ Environment Variables

To activate Google Analytics tracking, configure a `.env` file in the root directory:

```env
VITE_GA_MEASUREMENT_ID=your-google-analytics-id
```

If this variable is not provided, the analytics service automatically runs in development logging mode without throwing errors.

---

## ⚖️ License

Distributed under the MIT License. See `LICENSE` for more information.
