"use client";

import React from "react";

interface MomentCardProps {
  imageUrl?: string | null;
  message?: string;
  momentDate?: string;
  trackName?: string;
  artistName?: string;
}

export default function MomentCard({
  imageUrl = null,
  message = "This song reminds me of that night on the terrace ✨🎶",
  momentDate = "25th April 2026",
  trackName = "Track Name",
  artistName = "Artist Name",
}: MomentCardProps) {
  return (
    <div className="font-ui w-full max-w-sm">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Inter:wght@400;500;600&display=swap');

        .font-hand {
          font-family: 'Caveat', cursive;
        }

        .font-ui {
          font-family: 'Inter', sans-serif;
        }
      `}</style>

      <div className="bg-[#F7F6F2] rounded-[28px] p-3 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] border border-black/5">
        <div className="relative rounded-[20px] overflow-hidden bg-[#E9E7DF] aspect-square flex items-center justify-center">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Moment"
              className="w-full h-full object-cover"
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

        <div className="mt-3 rounded-[16px] bg-white px-4 py-3 min-h-16 flex items-center justify-center text-center">
          <p className="font-hand text-2xl leading-snug text-[#3F6B3D]">
            {message}
          </p>
        </div>

        <div className="mt-2 text-center">
          <span className="text-lg tracking-wide text-[#9A9788]">
            {momentDate}
          </span>
        </div>

        <div className="mt-3 rounded-[16px] bg-black px-4 py-3 flex items-center gap-3">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="12" fill="#1DB954" />
            <path
              d="M6.5 9.5c3.5-1 7.5-.6 10 .9M7 12.3c3-.8 6.3-.5 8.6.8M7.5 15c2.4-.6 5-.4 6.9.7"
              stroke="black"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>

          <ScanBars />
        </div>
      </div>
    </div>
  );
}

function ScanBars() {
  const heights = [
    10, 18, 8, 22, 14, 20, 9, 16, 24, 11, 19, 8, 15, 21, 10, 17, 23, 9, 14,
    18, 12, 20, 8, 16,
  ];

  return (
    <div className="flex items-center gap-[2px] flex-1 h-6">
      {heights.map((h, i) => (
        <div
          key={i}
          className="w-[2px] bg-white rounded-full"
          style={{ height: `${h}px` }}
        />
      ))}
    </div>
  );
}