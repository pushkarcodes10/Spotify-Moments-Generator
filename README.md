# 🎵 Spotify Moments Generator

A premium, interactive web application that transforms your favorite songs and memories into custom, high-resolution Polaroid-style cards complete with official scannable Spotify Codes. No login, no registration, just pure memories in under two minutes.

---

## ✨ Features

- **Live Spotify Search**: Real-time debounced song search using the official Spotify Web API. Shows album art, track details, and artist names instantly.
- **Interactive Polaroid Editor**:
  - **Image Cropper**: Upload custom photos (JPEG/PNG/WebP) and position, zoom, and crop them perfectly with a smooth slider interface.
  - **Personalized Messages**: Add a handwriting-style message (featuring the *Caveat* font) with dynamic font-scaling to prevent text overflow.
  - **Date Picker**: Log a specific memory timeline date in a clean, human-readable format.
- **Dynamic Spotify Scannable Codes**: Automatically generates and embeds the official, scannable wavy barcode for the selected song. Scan with any Spotify-enabled camera to play the song instantly!
- **High-Resolution Exports**: Generates print-ready, high-fidelity PNG assets at 3x scale using client-side canvas rendering.
- **Zero Friction**: Completely stateless, server-cached token authorization, and no login or user accounts required.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Server Actions, and Route Handlers)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with a sleek, premium dark studio aesthetic
- **Animations**: [Motion](https://motion.dev/) & [GSAP](https://gsap.com/) for fluid transitions and micro-interactions
- **Image Editing**: `react-easy-crop` for intuitive cropping and zooming controls
- **Exporting**: `html2canvas-pro` for rendering DOM elements directly to clean PNG files
- **Icons**: Tabler Icons & Lucide React
- **Design primitives**: Shadcn UI & Base UI

---

## 📁 Repository Structure

```text
spotify-moments-generator/
├── lib/
│   ├── cropImage.ts           # Helper to handle image canvas cropping
│   └── utils.ts               # Tailind CSS utility merger
├── src/
│   ├── app/
│   │   ├── api/users/         # Server-side API endpoints
│   │   │   ├── scancode/      # Proxy endpoint for fetching Spotify codes safely
│   │   │   ├── spotify-search/ # Proxies search requests with app-level token
│   │   │   └── spotify-token/  # Handles token caching and Client Credentials flow
│   │   ├── editor/            # Page hosting the customization workspace
│   │   ├── moment/            # Page containing the final Polaroid card and download trigger
│   │   ├── globals.css        # Global CSS stylesheet & Tailwind setup
│   │   ├── layout.tsx         # Root layout configuration
│   │   └── page.tsx           # Home landing page with song search
│   ├── components/
│   │   ├── ui/                # Reusable UI component library (lamp, splittext, etc.)
│   │   ├── EditorWorkspace.tsx # Multi-step customization interface
│   │   ├── MomentCard.tsx     # The visual representation of the Polaroid card
│   │   └── SongSearch.tsx     # Live search input and results handler
│   └── hooks/
│       └── use-file-upload.ts # Utility helper for managing image file streams
```

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have **Node.js 18+** and **npm** installed on your system.

### 2. Get Spotify API Credentials
1. Visit the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard).
2. Log in and click **Create App**.
3. Set your App Name, Description, and Redirect URI (e.g., `http://localhost:3000/callback`).
4. Save the app to obtain your **Client ID** and **Client Secret**.

### 3. Setup Environment Variables
Create a `.env` file in the root of the project:

```env
SPOTIFY_CLIENT_ID=your_spotify_client_id_here
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret_here
```

### 4. Installation
Install all required node packages:
```bash
npm install
```

### 5. Running the Development Server
Run the project in development mode:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 6. Build for Production
To compile a optimized production build:
```bash
npm run build
npm run start
```

---

## 🧩 API Reference

#### Fetch Cached Spotify Access Token
```http
POST /api/users/spotify-token
```
Returns a cached client credentials access token, refreshing it if it is within 60 seconds of expiry.

#### Search Tracks
```http
GET /api/users/spotify-search?q={query}
```
Proxies a track search query to the Spotify Web API `/v1/search` endpoint and filters down to the top 5 tracks with album artwork, title, artists, preview url, and track URI.

#### Fetch Spotify Scan Code SVG
```http
GET /api/users/scancode?uri={spotify_track_uri}
```
Fetches the official barcode vector from `scannables.scdn.co` and serves it as a cached `image/svg+xml` response to avoid CORS issues during canvas generation.

---

## 🎨 Acknowledgements & Design Credits
- Polaroid cards concept inspired by vintage keepsake layouts.
- Dynamic scan-code capability courtesy of Spotify's public Scannable Code image endpoint.
- UI elements powered by the beautiful components from Shadcn UI and Base UI.
