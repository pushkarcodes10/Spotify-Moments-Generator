"use client";

import React from "react";

export function HeadphoneSticker({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <div className={`relative inline-flex items-center justify-center filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.4)] ${className}`}>
      <svg viewBox="0 0 120 120" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Outer sticker die-cut white outline */}
        <path
          d="M20 70C20 42.3858 42.3858 20 70 20C97.6142 20 120 42.3858 120 70"
          stroke="white"
          strokeWidth="16"
          strokeLinecap="round"
          className="drop-shadow-md"
        />
        {/* Headband arch */}
        <path
          d="M26 70C26 45.6995 45.6995 26 70 26C94.3005 26 114 45.6995 114 70"
          stroke="#1F2937"
          strokeWidth="8"
          strokeLinecap="round"
        />
        {/* Metallic headband accent */}
        <path
          d="M38 48C46 36 57 30 70 30C83 30 94 36 102 48"
          stroke="#E5E7EB"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* Left Earcup */}
        <g transform="translate(14, 56)">
          <rect width="24" height="42" rx="12" fill="white" />
          <rect x="2" y="2" width="20" height="38" rx="10" fill="#8B5CF6" />
          <rect x="5" y="8" width="14" height="26" rx="7" fill="#111827" />
          <ellipse cx="12" cy="21" rx="4" ry="8" fill="#4C1D95" />
          <path d="M7 14C9 10 15 10 17 14" stroke="#A78BFA" strokeWidth="1.5" strokeLinecap="round" />
        </g>
        {/* Right Earcup */}
        <g transform="translate(102, 56)">
          <rect width="24" height="42" rx="12" fill="white" />
          <rect x="2" y="2" width="20" height="38" rx="10" fill="#8B5CF6" />
          <rect x="5" y="8" width="14" height="26" rx="7" fill="#111827" />
          <ellipse cx="12" cy="21" rx="4" ry="8" fill="#4C1D95" />
          <path d="M7 14C9 10 15 10 17 14" stroke="#A78BFA" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}

export function MicrophoneSticker({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <div className={`relative inline-flex items-center justify-center filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.4)] ${className}`}>
      <svg viewBox="0 0 100 130" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* White outline die-cut */}
        <rect x="30" y="8" width="40" height="66" rx="20" fill="white" />
        <path d="M18 46C18 72 32 84 50 84C68 84 82 72 82 46" stroke="white" strokeWidth="12" strokeLinecap="round" />
        <path d="M50 84V112" stroke="white" strokeWidth="14" strokeLinecap="round" />
        <path d="M28 116H72" stroke="white" strokeWidth="14" strokeLinecap="round" />

        {/* Vintage Mic Grille */}
        <rect x="34" y="12" width="32" height="58" rx="16" fill="#1E293B" />
        <rect x="38" y="16" width="24" height="50" rx="12" fill="#334155" />
        {/* Horizontal Grille slats */}
        <line x1="38" y1="26" x2="62" y2="26" stroke="#94A3B8" strokeWidth="2" />
        <line x1="38" y1="34" x2="62" y2="34" stroke="#94A3B8" strokeWidth="2" />
        <line x1="38" y1="42" x2="62" y2="42" stroke="#94A3B8" strokeWidth="2" />
        <line x1="38" y1="50" x2="62" y2="50" stroke="#94A3B8" strokeWidth="2" />
        <line x1="38" y1="58" x2="62" y2="58" stroke="#94A3B8" strokeWidth="2" />
        <line x1="50" y1="16" x2="50" y2="66" stroke="#CBD5E1" strokeWidth="2" />

        {/* Stand Cradle */}
        <path d="M24 46C24 66 35 76 50 76C65 76 76 66 76 46" stroke="#64748B" strokeWidth="6" strokeLinecap="round" />
        {/* Stem & Base */}
        <path d="M50 78V108" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
        <path d="M34 112H66" stroke="#334155" strokeWidth="6" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export function CassetteSticker({ className = "w-20 h-14" }: { className?: string }) {
  return (
    <div className={`relative inline-flex items-center justify-center filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.4)] ${className}`}>
      <svg viewBox="0 0 140 90" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Die-cut white border */}
        <rect x="4" y="4" width="132" height="82" rx="14" fill="white" />
        {/* Cassette Body */}
        <rect x="8" y="8" width="124" height="74" rx="10" fill="#18181B" />
        {/* Retro Label */}
        <rect x="18" y="16" width="104" height="46" rx="6" fill="#FDE047" />
        <rect x="18" y="16" width="104" height="12" rx="3" fill="#F97316" />
        <rect x="18" y="28" width="104" height="8" rx="2" fill="#EC4899" />
        {/* Spool window cutout */}
        <rect x="32" y="38" width="76" height="20" rx="10" fill="#09090B" stroke="#27272A" strokeWidth="2" />
        {/* Left Spool */}
        <circle cx="48" cy="48" r="7" fill="white" />
        <circle cx="48" cy="48" r="3" fill="#09090B" />
        {/* Right Spool */}
        <circle cx="92" cy="48" r="7" fill="white" />
        <circle cx="92" cy="48" r="3" fill="#09090B" />
        {/* Magnetic Tape bridge */}
        <rect x="58" y="46" width="24" height="4" fill="#78350F" />
        {/* Bottom Trapezoid screws */}
        <circle cx="16" cy="16" r="2.5" fill="#71717A" />
        <circle cx="124" cy="16" r="2.5" fill="#71717A" />
        <circle cx="16" cy="74" r="2.5" fill="#71717A" />
        <circle cx="124" cy="74" r="2.5" fill="#71717A" />
      </svg>
    </div>
  );
}

export function RockHandSticker({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <div className={`relative inline-flex items-center justify-center filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.4)] ${className}`}>
      <div className="w-full h-full rounded-2xl bg-white p-2.5 flex items-center justify-center transform rotate-6 border border-zinc-200">
        <span className="text-4xl sm:text-5xl select-none" role="img" aria-label="Rock on">
          🤘
        </span>
      </div>
    </div>
  );
}

export function SparkleStar({ className = "w-8 h-8", color = "#CCFF00" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={`${className} filter drop-shadow-[0_0_10px_${color}]`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20 0C20 11.0457 28.9543 20 40 20C28.9543 20 20 28.9543 20 40C20 28.9543 11.0457 20 0 20C11.0457 20 20 11.0457 20 0Z"
        fill={color}
      />
    </svg>
  );
}

export function SpotifyLogo({ className = "w-6 h-6", color = "#1DB954" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.503 17.31c-.217.355-.678.47-1.034.253-2.836-1.733-6.406-2.125-10.61-1.164-.407.094-.813-.16-.906-.566-.093-.408.16-.814.567-.907 4.604-1.053 8.55-.61 11.73 1.35.355.217.47.678.253 1.034zm1.47-3.267c-.273.444-.856.586-1.3.313-3.245-1.995-8.192-2.573-12.03-1.407-.5.152-1.032-.132-1.184-.632-.152-.5.132-1.033.632-1.185 4.385-1.331 9.83-.69 13.569 1.611.444.273.586.856.313 1.3zm.126-3.41c-3.89-2.31-10.307-2.522-14.024-1.393-.596.18-1.23-.158-1.411-.755-.18-.597.158-1.23.755-1.411 4.272-1.297 11.36-1.045 15.82 1.603.536.318.712 1.01.394 1.546-.318.536-1.01.712-1.534.41z" />
    </svg>
  );
}

