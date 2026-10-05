"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

interface WaveBadge {
  id: number;
  label: string;
  theme: string;
  type: "symbol" | "text";
  content: string;
  color?: string;
}

const BADGES: WaveBadge[] = [
  { id: 1, label: "Tum Se Hi", theme: "Terrace Nights", type: "text", content: "🌙" },
  { id: 2, label: "Midnight City", theme: "Highway Drive", type: "text", content: "🚗" },
  { id: 3, label: "Yellow", theme: "First Dance", type: "text", content: "💛" },
  { id: 4, label: "Starboy", theme: "Concert Vibes", type: "symbol", content: "⚡", color: "#CCFF00" },
  { id: 5, label: "Spotify Moments", theme: "The Keepsake", type: "symbol", content: "/", color: "#CCFF00" },
  { id: 6, label: "Photograph", theme: "Road Trips", type: "text", content: "📷" },
  { id: 7, label: "Golden Hour", theme: "Summer Sunsets", type: "text", content: "✨" },
  { id: 8, label: "Vinyl Memory", theme: "Anniversary", type: "symbol", content: "💿", color: "#CEACFE" },
  { id: 9, label: "Night Changes", theme: "Graduations", type: "text", content: "🎓" },
  { id: 10, label: "Lover", theme: "First Date", type: "text", content: "💖" },
  { id: 11, label: "Retro Tape", theme: "Mixtape Nostalgia", type: "symbol", content: "📼", color: "#FDE047" },
  { id: 12, label: "Acoustic Soul", theme: "Campfires", type: "text", content: "🔥" },
];

export default function WaveDiscovery() {
  const [time, setTime] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => {
    let animId: number;
    const loop = () => {
      setTime(Date.now() / 1000);
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <section className="relative py-28 px-4 overflow-hidden border-t border-[#222226]/50 bg-[#070709] select-none">
      {/* Background glow orbs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#CCFF00]/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-[#CEACFE]/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#121214] border border-[#222226] text-xs font-bold text-[#CCFF00] uppercase tracking-wider"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Every Song Has A Story
        </motion.div>

        {/* Heading Reveal */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black tracking-tight text-white uppercase max-w-3xl mx-auto leading-none"
        >
          What was playing <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-[#CCFF00]">
            when it happened?
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm sm:text-base md:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed pt-2"
        >
          The first concert you went to together. The late-night drive where nobody spoke, just listened. The song that always brings you right back to that one summer.
        </motion.p>

        {/* Undulating Sine-Wave Floating Ribbon */}
        <div className="relative w-full py-16 overflow-hidden flex items-center justify-center">
          <div className="relative w-full max-w-5xl h-36 flex items-center justify-between px-2">
            {/* Connecting sine-wave guide curve */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" preserveAspectRatio="none">
              <path
                d="M 0,60 Q 250,110 500,60 T 1000,60"
                fill="none"
                stroke="#CCFF00"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
            </svg>

            {BADGES.map((b, idx) => {
              const freq = 1.6;
              const speed = 2.2;
              const phase = (idx / BADGES.length) * (Math.PI * 2.8);
              const yOffset = Math.sin(time * speed + phase) * 24;
              const rotOffset = Math.cos(time * speed + phase) * 8;

              const isHovered = hoveredIdx === idx;

              return (
                <div
                  key={b.id}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  style={{
                    transform: `translateY(${yOffset}px) rotate(${rotOffset}deg)`,
                  }}
                  className="relative transition-transform duration-75 flex flex-col items-center cursor-pointer group z-10"
                >
                  <div
                    className={`relative w-11 h-11 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full border-2 transition-all duration-300 shadow-lg flex items-center justify-center ${
                      isHovered
                        ? "scale-125 border-[#CCFF00] shadow-[0_0_25px_rgba(204,255,0,0.6)] z-30 bg-[#1C1C20]"
                        : "border-white/20 hover:border-[#CEACFE] bg-[#121214]"
                    }`}
                  >
                    <span
                      className="text-lg sm:text-2xl select-none"
                      style={{ color: b.color || "#FFFFFF" }}
                    >
                      {b.content}
                    </span>
                  </div>

                  {/* Tooltip on hover */}
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className="absolute -bottom-10 px-3 py-1 rounded-full bg-black/95 border border-[#CCFF00] text-white text-[10px] font-bold whitespace-nowrap shadow-xl z-40 flex items-center gap-1.5"
                    >
                      <span className="text-[#CCFF00]">●</span>
                      <span>{b.label}</span>
                      <span className="text-zinc-400 font-normal">({b.theme})</span>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Lilac Glowing Pill Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="pt-4"
        >
          <div className="inline-block p-4 sm:p-5 rounded-3xl bg-[#CEACFE] text-black font-heading font-extrabold text-sm sm:text-base max-w-xl shadow-[0_15px_35px_rgba(206,172,254,0.3)] hover:scale-105 transition-transform duration-300 cursor-pointer">
            Pick any track from Spotify, customize your moment card with your memory, and download a print-ready keepsake in under 2 minutes.
          </div>
        </motion.div>
      </div>
    </section>
  );
}
