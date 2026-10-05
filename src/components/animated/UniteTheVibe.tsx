"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Plus, Sparkles } from "lucide-react";
import { CassetteSticker, MicrophoneSticker, RockHandSticker, SparkleStar } from "./RetroStickers";

export default function UniteTheVibe() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse parallax physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 45, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 45, damping: 20 });

  const moveX1 = useTransform(springX, [-0.5, 0.5], [-20, 20]);
  const moveY1 = useTransform(springY, [-0.5, 0.5], [-20, 20]);

  const moveX2 = useTransform(springX, [-0.5, 0.5], [25, -25]);
  const moveY2 = useTransform(springY, [-0.5, 0.5], [25, -25]);

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

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative py-32 px-4 bg-[#060608] overflow-hidden select-none"
    >
      {/* Background ambient nebula glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-r from-[#CCFF00]/15 via-[#CEACFE]/20 to-transparent blur-[140px] pointer-events-none rounded-full" />

      <div className="relative max-w-6xl mx-auto min-h-[640px] flex flex-col items-center justify-center text-center">
        {/* ================= FLOATING STICKERS & POLAROIDS ================= */}

        {/* 1. Top-Left: Neon Guitarist + Purple (+) Badge */}
        <motion.div
          style={{ x: moveX1, y: moveY1 }}
          animate={{
            y: [0, -12, 0],
            rotate: [-8, -6, -8],
          }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-2 sm:left-10 md:left-16 top-6 sm:top-10 z-20 group cursor-pointer"
        >
          <div className="relative w-28 sm:w-36 md:w-44 aspect-square rounded-2xl overflow-hidden p-1 bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl group-hover:scale-105 group-hover:border-[#CCFF00] transition-all">
            <img
              src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&auto=format&fit=crop&q=80"
              alt="Guitarist"
              className="w-full h-full object-cover rounded-xl"
            />
            {/* Floating Purple (+) Badge */}
            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#CEACFE] text-black flex items-center justify-center shadow-lg font-black transform group-hover:rotate-90 transition-transform">
              <Plus className="w-5 h-5 stroke-[3]" />
            </div>
          </div>
        </motion.div>

        {/* 2. Top-Center: DJ Console + Vintage Microphone Sticker */}
        <motion.div
          style={{ x: moveX2, y: moveY2 }}
          animate={{
            y: [0, 14, 0],
            rotate: [2, 0, 2],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 sm:top-2 left-1/2 -translate-x-1/2 z-10 group cursor-pointer"
        >
          <div className="relative w-32 sm:w-40 md:w-48 aspect-video rounded-2xl overflow-hidden p-1 bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl group-hover:scale-105 transition-all">
            <img
              src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&auto=format&fit=crop&q=80"
              alt="DJ Mixing"
              className="w-full h-full object-cover rounded-xl"
            />
            {/* Retro Microphone Sticker Overlap */}
            <div className="absolute -bottom-4 -right-4 transform rotate-12 group-hover:rotate-0 transition-transform">
              <MicrophoneSticker className="w-12 h-16 sm:w-14 sm:h-18" />
            </div>
          </div>
        </motion.div>

        {/* 3. Top-Right: Sunset Silhouette + Retro Cassette Tape */}
        <motion.div
          style={{ x: moveX1, y: moveY2 }}
          animate={{
            y: [0, -10, 0],
            rotate: [10, 8, 10],
          }}
          transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-2 sm:right-10 md:right-16 top-8 sm:top-12 z-20 group cursor-pointer"
        >
          <div className="relative w-28 sm:w-36 md:w-44 aspect-square rounded-2xl overflow-hidden p-1 bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl group-hover:scale-105 group-hover:border-[#CEACFE] transition-all">
            <img
              src="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&auto=format&fit=crop&q=80"
              alt="Sunset Silhouette"
              className="w-full h-full object-cover rounded-xl"
            />
            {/* Cassette Tape Sticker Overlap */}
            <div className="absolute -bottom-5 -left-5 transform -rotate-12 group-hover:rotate-0 transition-transform">
              <CassetteSticker className="w-20 h-14 sm:w-24 sm:h-16" />
            </div>
          </div>
        </motion.div>

        {/* 4. Bottom-Left: Rocker Girl + Rock Hand (🤘) + Sparkle Stars */}
        <motion.div
          style={{ x: moveX2, y: moveY1 }}
          animate={{
            y: [0, 12, 0],
            rotate: [-6, -4, -6],
          }}
          transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-4 sm:left-12 md:left-20 bottom-12 sm:bottom-16 z-20 group cursor-pointer"
        >
          <div className="relative w-28 sm:w-36 md:w-44 aspect-square rounded-2xl overflow-hidden p-1 bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl group-hover:scale-105 group-hover:border-[#CCFF00] transition-all">
            <img
              src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&auto=format&fit=crop&q=80"
              alt="Concert celebration"
              className="w-full h-full object-cover rounded-xl"
            />
            {/* Rock Hand Sticker Overlap */}
            <div className="absolute -bottom-6 -left-4 transform -rotate-12 group-hover:scale-110 transition-transform">
              <RockHandSticker className="w-14 h-14 sm:w-16 sm:h-16" />
            </div>
            {/* Sparkle Star */}
            <div className="absolute -top-4 -right-4 animate-pulse">
              <SparkleStar className="w-8 h-8" color="#38BDF8" />
            </div>
          </div>
        </motion.div>

        {/* 5. Bottom-Right: Red Neon Headphone Listener + Vinyl Sticker */}
        <motion.div
          style={{ x: moveX1, y: moveY1 }}
          animate={{
            y: [0, -14, 0],
            rotate: [6, 4, 6],
          }}
          transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-4 sm:right-12 md:right-20 bottom-12 sm:bottom-16 z-20 group cursor-pointer"
        >
          <div className="relative w-28 sm:w-36 md:w-44 aspect-square rounded-2xl overflow-hidden p-1 bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl group-hover:scale-105 group-hover:border-[#CEACFE] transition-all">
            <img
              src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&auto=format&fit=crop&q=80"
              alt="Festival crowd"
              className="w-full h-full object-cover rounded-xl"
            />
            {/* Mini Vinyl Disc Sticker Overlap */}
            <div className="absolute -bottom-4 -right-4 w-12 h-12 rounded-full bg-black border-2 border-white/40 flex items-center justify-center animate-spin">
              <div className="w-5 h-5 rounded-full bg-[#CEACFE] border border-black" />
            </div>
          </div>
        </motion.div>

        {/* ================= CENTER CONTENT ================= */}
        <div className="relative z-30 max-w-2xl mx-auto space-y-6 pt-16 pb-16">
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-5xl sm:text-7xl md:text-8xl font-heading font-black tracking-tight text-white uppercase leading-none"
          >
            Unite <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-[#CCFF00]">
              the Vibe
            </span>
          </motion.h2>

          <p className="text-sm sm:text-base md:text-lg text-zinc-300 font-medium max-w-lg mx-auto leading-relaxed">
            It&apos;s about meaningful connections, musical journeys, and genuine expression — principles that benefit both artists and listeners.
          </p>

          <div className="pt-4">
            <div className="inline-block p-4 sm:p-5 rounded-3xl bg-[#141417] border border-[#27272A] text-zinc-300 font-medium text-xs sm:text-sm max-w-md shadow-2xl">
              Through community-curated discovery, engaging features, and instant interaction options, SoundSphere cultivates genuine musical relationships.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
