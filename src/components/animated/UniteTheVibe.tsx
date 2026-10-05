"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Plus } from "lucide-react";
import { CassetteSticker, MicrophoneSticker, RockHandSticker, SparkleStar } from "./RetroStickers";
import { MEDIA_ASSETS } from "../../data/mediaAssets";

export default function UniteTheVibe() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse parallax physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 45, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 45, damping: 20 });

  const moveX1 = useTransform(springX, [-0.5, 0.5], [-14, 14]);
  const moveY1 = useTransform(springY, [-0.5, 0.5], [-14, 14]);

  const moveX2 = useTransform(springX, [-0.5, 0.5], [16, -16]);
  const moveY2 = useTransform(springY, [-0.5, 0.5], [16, -16]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const p = MEDIA_ASSETS.floatingPolaroids;

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative py-20 sm:py-28 px-4 bg-[#060608] overflow-hidden select-none"
    >
      {/* Background ambient nebula glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[380px] bg-gradient-to-r from-[#CCFF00]/15 via-[#CEACFE]/20 to-transparent blur-[140px] pointer-events-none rounded-full" />

      <div className="relative max-w-6xl mx-auto min-h-[720px] sm:min-h-[760px] md:min-h-[800px] flex flex-col items-center justify-center text-center">
        {/* ================= 5 FLOATING POLAROID CARDS & RETRO STICKERS ================= */}

        {/* 1. Top-Left: Terrace Jam Card + Purple (+) Badge */}
        <motion.div
          style={{ x: moveX1, y: moveY1 }}
          animate={{
            y: [0, -8, 0],
            rotate: [-8, -6, -8],
          }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-2 sm:left-8 md:left-14 lg:left-20 top-8 sm:top-12 z-20 group cursor-pointer"
        >
          <div className="relative w-24 sm:w-28 md:w-36 bg-[#F8F7F4] text-black rounded-2xl p-2 shadow-2xl border border-white/20 group-hover:scale-105 group-hover:border-[#CCFF00] transition-all">
            <div className="aspect-square rounded-xl overflow-hidden bg-zinc-200">
              <img
                src={p.card1}
                alt="Moment 1"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-1.5 px-1 text-left">
              <p className="text-[9px] font-heading font-bold text-zinc-900 truncate">Tum Se Hi</p>
              <p className="text-[7px] text-zinc-500 font-mono">25th Apr 2024</p>
            </div>
            {/* Floating Purple (+) Badge */}
            <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#CEACFE] text-black flex items-center justify-center shadow-lg font-black transform group-hover:rotate-90 transition-transform">
              <Plus className="w-4 h-4 stroke-[3]" />
            </div>
          </div>
        </motion.div>

        {/* 2. Top-Center: Anniversary Card + Vintage Microphone Sticker */}
        <motion.div
          style={{ x: moveX2, y: moveY2 }}
          animate={{
            y: [0, 8, 0],
            rotate: [2, 0, 2],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-2 sm:top-4 left-1/2 -translate-x-1/2 z-20 group cursor-pointer"
        >
          <div className="relative w-28 sm:w-32 md:w-40 bg-[#F8F7F4] text-black rounded-2xl p-2 shadow-2xl border border-white/20 group-hover:scale-105 transition-all">
            <div className="aspect-video rounded-xl overflow-hidden bg-zinc-200">
              <img
                src={p.card2}
                alt="Moment 2"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-1.5 px-1 text-center">
              <p className="text-[9px] font-heading font-bold text-zinc-900 truncate">Coldplay • Yellow</p>
            </div>
            {/* Retro Microphone Sticker Overlap */}
            <div className="absolute -bottom-3 -right-3 transform rotate-12 group-hover:rotate-0 transition-transform">
              <MicrophoneSticker className="w-10 h-14 sm:w-11 sm:h-15" />
            </div>
          </div>
        </motion.div>

        {/* 3. Top-Right: Road Trip Card + Retro Cassette Tape */}
        <motion.div
          style={{ x: moveX1, y: moveY2 }}
          animate={{
            y: [0, -7, 0],
            rotate: [10, 8, 10],
          }}
          transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-2 sm:right-8 md:right-14 lg:right-20 top-8 sm:top-12 z-20 group cursor-pointer"
        >
          <div className="relative w-24 sm:w-28 md:w-36 bg-[#F8F7F4] text-black rounded-2xl p-2 shadow-2xl border border-white/20 group-hover:scale-105 group-hover:border-[#CEACFE] transition-all">
            <div className="aspect-square rounded-xl overflow-hidden bg-zinc-200">
              <img
                src={p.card3}
                alt="Moment 3"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-1.5 px-1 text-left">
              <p className="text-[9px] font-heading font-bold text-zinc-900 truncate">Midnight City</p>
              <p className="text-[7px] text-zinc-500 font-mono">14th Jul 2025</p>
            </div>
            {/* Cassette Tape Sticker Overlap */}
            <div className="absolute -bottom-4 -left-4 transform -rotate-12 group-hover:rotate-0 transition-transform">
              <CassetteSticker className="w-14 h-10 sm:w-18 sm:h-12" />
            </div>
          </div>
        </motion.div>

        {/* 4. Bottom-Left: Summer Night Card + Rock Hand (🤘) + Sparkle Stars */}
        <motion.div
          style={{ x: moveX2, y: moveY1 }}
          animate={{
            y: [0, 8, 0],
            rotate: [-6, -4, -6],
          }}
          transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-2 sm:left-8 md:left-14 lg:left-20 bottom-8 sm:bottom-12 z-20 group cursor-pointer"
        >
          <div className="relative w-24 sm:w-28 md:w-36 bg-[#F8F7F4] text-black rounded-2xl p-2 shadow-2xl border border-white/20 group-hover:scale-105 group-hover:border-[#CCFF00] transition-all">
            <div className="aspect-square rounded-xl overflow-hidden bg-zinc-200">
              <img
                src={p.card4}
                alt="Moment 4"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-1.5 px-1 text-left">
              <p className="text-[9px] font-heading font-bold text-zinc-900 truncate">Anniversary</p>
              <p className="text-[7px] text-zinc-500 font-mono">03rd Oct 2023</p>
            </div>
            {/* Rock Hand Sticker Overlap */}
            <div className="absolute -bottom-4 -left-3 transform -rotate-12 group-hover:scale-110 transition-transform">
              <RockHandSticker className="w-11 h-11 sm:w-13 sm:h-13" />
            </div>
            {/* Sparkle Star */}
            <div className="absolute -top-3 -right-3 animate-pulse">
              <SparkleStar className="w-6 h-6 sm:w-7 sm:h-7" color="#CCFF00" />
            </div>
          </div>
        </motion.div>

        {/* 5. Bottom-Right: Concert Encore Card + Mini Vinyl Badge */}
        <motion.div
          style={{ x: moveX1, y: moveY1 }}
          animate={{
            y: [0, -8, 0],
            rotate: [6, 4, 6],
          }}
          transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-2 sm:right-8 md:right-14 lg:right-20 bottom-8 sm:bottom-12 z-20 group cursor-pointer"
        >
          <div className="relative w-24 sm:w-28 md:w-36 bg-[#F8F7F4] text-black rounded-2xl p-2 shadow-2xl border border-white/20 group-hover:scale-105 group-hover:border-[#CEACFE] transition-all">
            <div className="aspect-square rounded-xl overflow-hidden bg-zinc-200">
              <img
                src={p.card5}
                alt="Moment 5"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-1.5 px-1 text-left">
              <p className="text-[9px] font-heading font-bold text-zinc-900 truncate">Starboy</p>
              <p className="text-[7px] text-zinc-500 font-mono">18th Aug 2024</p>
            </div>
            {/* Mini Vinyl Disc Sticker Overlap */}
            <div className="absolute -bottom-3 -right-3 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black border-2 border-white/40 flex items-center justify-center animate-spin">
              <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#CCFF00] border border-black" />
            </div>
          </div>
        </motion.div>

        {/* ================= CENTER CONTENT ================= */}
        <div className="relative z-10 max-w-xl mx-auto space-y-4 pt-32 sm:pt-36 md:pt-40 pb-12 px-4">
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl md:text-6xl font-heading font-black tracking-tight text-white uppercase leading-none"
          >
            Freeze <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-[#CCFF00]">
              the Moment
            </span>
          </motion.h2>

          <p className="text-sm sm:text-base text-zinc-300 font-medium max-w-md mx-auto leading-relaxed pt-1">
            A song isn&apos;t just audio — it&apos;s where you were, who you were with, and how it felt. Pair any Spotify track with your memory to create a tangible keepsake.
          </p>

          <div className="pt-2">
            <div className="inline-block p-3.5 sm:p-4 rounded-2xl bg-[#141417] border border-[#27272A] text-zinc-300 font-medium text-xs sm:text-sm max-w-md shadow-2xl">
              From choosing your favorite track to downloading your print-ready Polaroid card takes under two minutes. 100% free with no login required.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
