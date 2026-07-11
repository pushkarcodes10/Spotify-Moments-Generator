"use client";

import React, { useState } from "react";

interface MomentCardProps {
  imageUrl?: string | null;
  message?: string;
  momentDate?: string;
  trackName?: string;
  artistName?: string;
  trackUri?: string;
}

export default function MomentCard({
  imageUrl = null,
  message = "This song reminds me of that night on the terrace ✨🎶",
  momentDate = "25th April 2026",
  trackName = "Track Name",
  artistName = "Artist Name",
  trackUri = "spotify:track:4pt7CsXjaI2vvs6v6g6u8N",
}: MomentCardProps) {
  const [scanCodeFailed, setScanCodeFailed] = useState(false);

  const getFontSizeClass = (text: string) => {
    const length = text.length;
    if (length > 45) return "text-sm sm:text-xs leading-tight";
    if (length > 30) return "text-base sm:text-sm leading-snug";
    if (length > 20) return "text-xl sm:text-lg";
    return "text-2xl sm:text-xl";
  };

  const scanCodeUrl = `/api/users/scancode?uri=${encodeURIComponent(trackUri)}`;

  return (
    <div id="polaroid-capture-node" className="font-ui w-full max-w-sm select-none p-4 bg-transparent">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Inter:wght@400;500;600&display=swap');

        .font-hand {
          font-family: 'Caveat', cursive;
        }

        .font-ui {
          font-family: 'Inter', sans-serif;
        }
      `}</style>

      <div className="bg-[#F7F6F2] rounded-[28px] p-4 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] border border-black/5 flex flex-col gap-3">
        <div className="relative rounded-[20px] overflow-hidden bg-[#E9E7DF] aspect-square flex items-center justify-center">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Moment"
              className="w-full h-full object-cover"
              crossOrigin="anonymous"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-[#9A9788]">
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <rect x="3" y="3" width="18" height="18" rx="3" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
              <span className="font-hand text-2xl text-[#5C7A5A]">
                Your photo goes here
              </span>
            </div>
          )}
        </div>

        <div className="rounded-[16px] bg-white px-4 py-3 min-h-19 h-19 flex items-center justify-center text-center overflow-hidden border border-zinc-100">
          <p className={`font-hand text-[#3F6B3D] transition-all duration-200 wrap-break-word w-full ${getFontSizeClass(message)}`}>
            {message}
          </p>
        </div>

        <div className="text-center py-0.5">
          <span className="text-sm font-semibold tracking-wide text-[#9A9788] uppercase font-mono">
            {momentDate}
          </span>
        </div>

        <div className="rounded-[16px] bg-black p-3 flex items-center justify-center shadow-md h-14 overflow-hidden">
          {!scanCodeFailed ? (
            <img
              src={scanCodeUrl}
              alt="Spotify Scan Code"
              className="h-full w-auto object-contain max-w-full"
              onError={() => setScanCodeFailed(true)}
            />
          ) : (
            <span className="text-white/50 text-xs">Scan code unavailable</span>
          )}
        </div>
      </div>
    </div>
  );
}