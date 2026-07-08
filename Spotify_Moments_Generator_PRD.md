# Product Requirements Document — Spotify Moments Generator

**Version:** 1.0
**Owner:** Pushkar
**Last Updated:** July 2026

---

## 1. Overview

Spotify Moments Generator is a web app that lets a user search for any song on Spotify, personalize a "moment card" with a custom photo, a short message, and a date, and download/print a shareable card that includes a scannable Spotify code linking directly to that song.

**Core value prop:** turn a song + a memory into a physical/digital keepsake in under 2 minutes, no login required.

---

## 2. Goals

- Let users find any track on Spotify via fast, accurate search (not a static dropdown — live API-backed search)
- Let users personalize a card with an image, message, and date
- Auto-generate a track-specific Spotify scan code (the official wavy barcode) that actually opens the song when scanned
- Let users export the final card as a high-resolution, print-ready image
- Zero friction: no user accounts, no Spotify login required

## 3. Non-Goals

- No user accounts / saved history (v1)
- No social sharing / hosting of generated cards (v1) — export only
- No editing of existing/downloaded cards after export
- No support for private/local Spotify tracks not in the public catalog

---

## 4. User Flow

### Step 1 — Song Search (Landing Page)
1. User lands on home page, sees a search bar ("Search for a song...")
2. As user types, a debounced request hits Spotify's Search API and returns matching tracks
3. Dropdown shows: album art thumbnail, track name, artist name
4. User clicks a result to select it, sees a small confirmation preview (album art + track + artist + a "Confirm" button)
5. On confirm, app navigates to the Card Editor page, passing the selected track's data (id, name, artist, album art URL, Spotify track URI)

### Step 2 — Card Editor (Output Page)
1. Card preview renders live on screen, structured top to bottom:
   - **Custom Image** — empty state prompts upload; once uploaded, user can pan/zoom/reposition inside the frame
   - **Custom Message** — text input below the image, supports emojis, auto-shrinks font if text is long, has a max character limit to preserve card aesthetics
   - **Date** — required field; defaults to today's date on load; user can change it to any date (the "moment" date); cannot be left empty
   - **Spotify Scan Code** — auto-generated black strip containing the Spotify logo + the official scannable wave-barcode for the selected track; regenerates automatically if the user goes back and picks a different song
2. All edits update the live preview in real time
3. "Download" button exports the card as a high-resolution PNG suitable for both screen sharing and printing

---

## 5. Feature Breakdown

### 5.1 Song Search
| Requirement | Detail |
|---|---|
| Data source | Spotify Web API `/v1/search?type=track` |
| Auth | Client Credentials flow (server-side token, cached, refreshed before expiry) — no user login |
| Debounce | ~300ms after last keystroke |
| Min characters | 2 before triggering a search |
| Result fields shown | Track name, primary artist, album art thumbnail |
| Empty/no results state | "No songs found — try a different search" |
| Error state | Graceful fallback message if Spotify API fails or rate-limits |

### 5.2 Card Editor — Image
| Requirement | Detail |
|---|---|
| Upload | Standard file input, accepts JPG/PNG/WebP |
| Positioning | Pan and zoom within a fixed-aspect-ratio frame (crop library) |
| Max file size | Enforce a reasonable client-side limit (e.g. 10MB) with a friendly error if exceeded |
| Aspect ratio | Fixed square or card-appropriate ratio to match the frame in the design |

### 5.3 Card Editor — Message
| Requirement | Detail |
|---|---|
| Input type | Multi-line text area |
| Emoji support | Native emoji input supported by default (browser/OS emoji keyboard); optional in-app emoji picker button |
| Character limit | Defined max (e.g. 120 characters) enforced with a live counter |
| Auto-fit | Font size scales down gracefully as message length approaches the limit, so text never overflows the card |

### 5.4 Card Editor — Date (New Feature)
| Requirement | Detail |
|---|---|
| Position on card | Between the message box and the Spotify scan strip |
| Default value | Today's date, pre-filled on page load |
| Required | Yes — cannot be cleared/left blank; if user clears it, revert to today's date or block download until a valid date is set |
| Format | Human-readable (e.g. "07 July 2026") |
| Editable | Yes, via a date picker — user can set any past or future date to mark their "moment" |

### 5.5 Spotify Scan Code
| Requirement | Detail |
|---|---|
| Source | Spotify's public scannable code image service, parameterized by the track's Spotify URI |
| Behavior | Unique per track; regenerates instantly if a different song is selected |
| Style | Matches Spotify's official black-background, white wave-bar aesthetic with the Spotify logo |
| Functionality | Scanning the code with a phone camera/Spotify app opens the exact selected track |

### 5.6 Export / Download
| Requirement | Detail |
|---|---|
| Method | Client-side DOM-to-image rendering of the card component |
| Output format | PNG |
| Resolution | Exported at a higher scale factor (e.g. 2x–3x) than on-screen size, so prints look sharp |
| Trigger | Single "Download" button, no extra steps or sign-up |
| File naming | Auto-named using track/artist (e.g. `moment-card-song-name.png`) |

---

## 6. Technical Architecture

### 6.1 Stack
- **Framework:** Next.js (single app — frontend + API routes, no separate backend server)
- **Styling:** Tailwind CSS, dark studio aesthetic
- **Image cropping:** `react-easy-crop`
- **Card export:** `html2canvas`
- **Spotify Auth:** Client Credentials flow, token fetched and cached server-side via a Next.js API route
- **Hosting consideration:** static-friendly, deployable on Vercel or similar

### 6.2 Data Flow
1. Browser → Next.js API route (`/api/spotify/search`) → Spotify API → results returned to client
2. Selected track data passed to editor page via route state/query params (no DB needed — fully stateless, in-memory for the session)
3. Scan code image URL constructed client-side using the track's Spotify URI, loaded directly from Spotify's public scannable-code image service
4. On download, `html2canvas` captures the rendered card DOM node → converts to PNG → triggers browser download

### 6.3 API Routes Needed
- `GET /api/spotify/token` — internal, fetches & caches app-level access token
- `GET /api/spotify/search?q=<query>` — proxies search requests to Spotify using the cached token

---

## 7. Edge Cases & Validation

- User tries to download without uploading an image → block with inline prompt, or allow a placeholder/default state (decide before build)
- User clears the date field → auto-revert to today's date, don't allow blank submission
- Message exceeds character limit → input stops accepting further characters, counter turns red near the limit
- Spotify API token expires mid-session → silently refresh and retry the request once
- Very long artist/track names → truncate gracefully in the search dropdown and on the card if displayed
- Slow network on image upload → show a loading state on the image frame

---

## 8. Success Criteria (v1)

- User can go from landing page to a downloaded, correctly rendered card in under 2 minutes
- Song search returns relevant results within ~1 second of typing
- Downloaded card renders correctly at print resolution (no blur, no cut-off text)
- Scan code on every generated card successfully opens the correct song when scanned
- Zero required sign-up/login at any point in the flow

---

## 9. Build Order

1. Next.js project setup + Tailwind configuration
2. Spotify token API route (Client Credentials, server-side, cached)
3. Search API route + search UI with live dropdown
4. Track data handoff from search page → editor page
5. Static card layout component (matches the reference design, no interactivity yet)
6. Image upload + crop/position integration
7. Message input with emoji support + auto-fit text logic
8. Date field with default-today + required validation
9. Spotify scan code embed (dynamic per selected track)
10. Export/download via `html2canvas`, tuned for print-quality output
11. Edge case handling + polish pass (loading states, error states, responsive layout)

---

## 10. Open Questions

- Should there be a placeholder/default card image if the user skips upload, or should download be blocked until an image is added?
- Fixed card aspect ratio — square, portrait, or match a real Spotify-code-card ratio exactly?
- Any branding/watermark on the exported card, or fully clean export?
