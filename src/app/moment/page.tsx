"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import html2canvas from "html2canvas-pro";
import Link from "next/link";
import MomentCard from "@/src/components/MomentCard";

function MomentPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isExporting, setIsExporting] = useState(false);

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
    } catch (error) {
      console.error(error);
    } finally {
      setIsExporting(false);
    }
  };

  if (!trackId) return null;

  return (
    <div className="bg-slate-950 min-h-screen flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(29,185,84,0.08),transparent_60%)] pointer-events-none" />

      <div className="w-full max-w-sm flex flex-col items-center space-y-6 z-10">
        <div className="w-full transform transition duration-500 hover:scale-[1.01]">
          <MomentCard
            imageUrl={imageUrl ? decodeURIComponent(imageUrl) : null}
            message={decodeURIComponent(message)}
            momentDate={decodeURIComponent(date)}
            trackName={decodeURIComponent(name)}
            artistName={decodeURIComponent(artist)}
            trackUri={decodeURIComponent(uri)}
          />
        </div>

        <div className="w-full flex flex-col gap-3 px-4">
          <button
            disabled={isExporting}
            onClick={handleDownloadAsset}
            className={`w-full py-3.5 px-6 rounded-2xl text-base font-black tracking-wide uppercase transition shadow-2xl active:scale-95 ${
              isExporting
                ? "bg-zinc-800 text-zinc-500 cursor-wait animate-pulse"
                : "bg-[#53E076] text-[#003914] hover:bg-[#42c564] hover:shadow-green-500/20 shadow-lg cursor-pointer"
            }`}
          >
            {isExporting ? "Generating PNG Asset..." : "Export to Gallery 💾"}
          </button>

          <Link
            href={`/editor?trackId=${trackId}&name=${name}&artist=${artist}&uri=${uri}&thumbnail=${encodeURIComponent(searchParams.get("thumbnail") || "")}`}
            className="w-full py-3 px-6 rounded-2xl text-sm font-bold text-center tracking-wide uppercase bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
          >
            ← Back to Editor
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function MomentPage() {
  return (
    <Suspense fallback={
      <div className="bg-slate-950 min-h-screen flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(29,185,84,0.08),transparent_60%)] pointer-events-none" />
        <div className="text-zinc-400 text-sm font-bold tracking-wide uppercase animate-pulse">
          Loading Moment...
        </div>
      </div>
    }>
      <MomentPageContent />
    </Suspense>
  );
}