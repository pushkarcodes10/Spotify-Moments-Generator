"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import html2canvas from "html2canvas-pro";
import Link from "next/link";
import MomentCard from "@/src/components/MomentCard";
import {
  Download,
  ArrowLeft,
  Sparkles,
  Share2,
  CheckCircle,
  Loader2,
  RotateCcw,
} from "lucide-react";

function MomentPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isExporting, setIsExporting] = useState(false);
  const [hasExported, setHasExported] = useState(false);

  const trackId = searchParams.get("trackId");
  const name = searchParams.get("name") || "Track Name";
  const artist = searchParams.get("artist") || "Artist Name";
  const uri = searchParams.get("uri") || "";
  const message = searchParams.get("message") || "";
  const date = searchParams.get("date") || "";
  const imageUrl = searchParams.get("img") || null;

  useEffect(() => {
    if (!trackId) {
      router.replace("/");
    }
  }, [trackId, router]);

  const handleDownloadAsset = async () => {
    const element = document.getElementById("polaroid-capture-node");
    if (!element) return;

    setIsExporting(true);
    try {
      const canvas = await html2canvas(element, {
        scale: 3,
        useCORS: true,
        allowTaint: false,
        backgroundColor: null,
        logging: false,
      });

      const dataUrl = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      const cleanFileName = name.toLowerCase().replace(/[^a-z0-9]/g, "-");

      downloadLink.download = `moment-${cleanFileName}.png`;
      downloadLink.href = dataUrl;
      downloadLink.click();
      setHasExported(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsExporting(false);
    }
  };

  if (!trackId) return null;

  return (
    <div className="bg-[#050505] min-h-screen text-white selection:bg-[#CCFF00] selection:text-black flex flex-col justify-between relative overflow-hidden">
      {/* Background Ambient Glow & Grooves */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-r from-[#CCFF00]/10 via-[#CEACFE]/15 to-transparent blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 bg-vinyl-grooves opacity-30 pointer-events-none" />

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#050505]/80 border-b border-[#222226]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <Link
            href={`/editor?trackId=${trackId}&name=${encodeURIComponent(
              name
            )}&artist=${encodeURIComponent(artist)}&uri=${encodeURIComponent(
              uri
            )}&thumbnail=${encodeURIComponent(searchParams.get("thumbnail") || "")}`}
            className="flex items-center gap-2 text-sm font-heading font-bold text-zinc-400 hover:text-white transition group"
          >
            <div className="w-8 h-8 rounded-full bg-[#121214] border border-[#222226] flex items-center justify-center group-hover:border-[#CCFF00] transition">
              <ArrowLeft className="w-4 h-4 text-zinc-300 group-hover:text-[#CCFF00]" />
            </div>
            <span>Back to Editor</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#CCFF00] animate-pulse" />
            <span className="font-heading font-bold text-xs uppercase tracking-wider text-zinc-400">
              Export Ready
            </span>
          </div>
        </div>
      </header>

      {/* Center Stage Presentation */}
      <main className="relative z-10 max-w-xl mx-auto px-4 py-8 sm:py-12 w-full flex flex-col items-center">
        {/* Header Title */}
        <div className="text-center mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#121214] border border-[#222226] text-xs font-bold text-[#CCFF00] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Keepsake Generated
          </div>
          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight text-white uppercase">
            Your Sound <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-[#CCFF00]">
              Memory
            </span>
          </h1>
        </div>

        {/* Polaroid Card Stage */}
        <div className="w-full flex justify-center transform transition duration-500 hover:scale-[1.01]">
          <MomentCard
            imageUrl={imageUrl ? decodeURIComponent(imageUrl) : null}
            message={decodeURIComponent(message)}
            momentDate={decodeURIComponent(date)}
            trackName={decodeURIComponent(name)}
            artistName={decodeURIComponent(artist)}
            trackUri={decodeURIComponent(uri)}
          />
        </div>

        {/* Action Controls */}
        <div className="w-full max-w-sm flex flex-col gap-3.5 mt-8 px-2">
          <button
            disabled={isExporting}
            onClick={handleDownloadAsset}
            className={`w-full py-4 px-6 rounded-full font-heading font-black text-sm uppercase tracking-wider transition-all duration-300 shadow-xl flex items-center justify-center gap-2 cursor-pointer ${
              isExporting
                ? "bg-[#1A1A1E] text-zinc-500 cursor-wait animate-pulse"
                : hasExported
                ? "bg-[#B8F53E] text-black shadow-[0_0_25px_rgba(184,245,62,0.3)] hover:scale-[1.02]"
                : "bg-[#CCFF00] text-black hover:bg-[#B8F53E] hover:scale-[1.02] active:scale-[0.98] shadow-[0_10px_30px_rgba(204,255,0,0.3)]"
            }`}
          >
            {isExporting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-zinc-400" />
                <span>Rendering High-Res PNG...</span>
              </>
            ) : hasExported ? (
              <>
                <CheckCircle className="w-4 h-4 text-black" />
                <span>Download Again (Saved)</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Save High-Res Polaroid</span>
              </>
            )}
          </button>

          <Link
            href={`/editor?trackId=${trackId}&name=${encodeURIComponent(
              name
            )}&artist=${encodeURIComponent(artist)}&uri=${encodeURIComponent(
              uri
            )}&thumbnail=${encodeURIComponent(searchParams.get("thumbnail") || "")}`}
            className="w-full py-3.5 px-6 rounded-full text-xs font-heading font-bold text-center tracking-wider uppercase bg-[#121214] border border-[#222226] text-zinc-400 hover:text-white hover:border-[#CCFF00]/50 hover:bg-[#1A1A1E] transition flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Edit Card Details</span>
          </Link>

          <Link
            href="/"
            className="text-center text-xs font-heading font-semibold text-zinc-500 hover:text-[#CCFF00] transition py-1"
          >
            ← Create Another Moment
          </Link>
        </div>
      </main>

      {/* Footer copyright */}
      <footer className="py-6 border-t border-[#222226]/40 text-center text-xs text-zinc-600 relative z-10">
        <p>© Spotify Moments Generator • Scancode scans directly inside the Spotify app</p>
      </footer>
    </div>
  );
}

export default function MomentPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-[#050505] min-h-screen flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden text-white">
          <div className="flex items-center gap-3">
            <Loader2 className="w-5 h-5 animate-spin text-[#CCFF00]" />
            <span className="text-zinc-400 text-sm font-heading font-bold tracking-wide uppercase">
              Preparing Your Moment...
            </span>
          </div>
        </div>
      }
    >
      <MomentPageContent />
    </Suspense>
  );
}