"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { HeadphoneSticker, MicrophoneSticker } from "./RetroStickers";

export default function VinylFeatureCards() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section className="py-24 px-4 max-w-6xl mx-auto space-y-12 select-none">
      {/* CARD 1: For Listeners (Lime Green #B8F53E) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        onMouseEnter={() => setHoveredCard(1)}
        onMouseLeave={() => setHoveredCard(null)}
        className="relative rounded-[40px] bg-[#B8F53E] text-black p-8 sm:p-12 md:p-16 overflow-hidden shadow-2xl flex flex-col justify-between min-h-[460px] group cursor-pointer"
      >
        {/* Massive background watermark text */}
        <div className="absolute top-1/2 left-8 -translate-y-1/2 text-8xl sm:text-9xl md:text-[13rem] font-heading font-black text-black/5 pointer-events-none select-none tracking-tighter">
          Listeners
        </div>

        <div className="relative z-10 max-w-xl">
          <div className="flex items-center gap-4">
            <h3 className="text-4xl sm:text-6xl md:text-7xl font-heading font-black tracking-tight text-black leading-none">
              For Listeners
            </h3>
            {/* Floating 3D Headphones Sticker */}
            <motion.div
              animate={{
                y: [0, -8, 0],
                rotate: [0, 4, 0],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="transform group-hover:scale-110 transition-transform duration-300"
            >
              <HeadphoneSticker className="w-16 h-16 sm:w-20 sm:h-20" />
            </motion.div>
          </div>

          <p className="mt-6 text-black/85 font-medium text-base sm:text-xl max-w-lg leading-relaxed">
            Current discovery methods feel restrictive. Conventional algorithms suggest similar tracks and artists, depriving listeners of the excitement with uncovering unique voices.
          </p>
        </div>

        {/* Large Realistic Spinning Vinyl Record coming out from bottom slot */}
        <div className="relative self-center sm:self-end mt-8 sm:mt-0 z-20">
          <motion.div
            animate={{
              y: hoveredCard === 1 ? -30 : 0,
              scale: hoveredCard === 1 ? 1.05 : 1,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="w-72 sm:w-96 h-40 sm:h-52 overflow-hidden flex items-start justify-center"
          >
            {/* Spinning Vinyl Disc */}
            <div
              className={`w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-[#0d0d0e] border-[14px] border-[#18181b] shadow-[0_25px_60px_rgba(0,0,0,0.7)] flex items-center justify-center relative ${
                hoveredCard === 1 ? "animate-vinyl-spin-fast" : "animate-vinyl-spin"
              }`}
            >
              {/* Concentric sheen grooves */}
              <div className="absolute inset-4 rounded-full border border-white/10" />
              <div className="absolute inset-8 rounded-full border border-white/5" />
              <div className="absolute inset-12 rounded-full border border-white/10" />
              <div className="absolute inset-16 rounded-full border border-white/5" />
              <div className="absolute inset-20 rounded-full border border-white/10" />

              {/* Light reflection sheen gradient */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />

              {/* Center Vinyl Label */}
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-[#CCFF00] border-6 border-black flex flex-col items-center justify-center shadow-inner">
                <span className="font-heading font-black text-xs sm:text-sm text-black tracking-widest uppercase">
                  MUSIC
                </span>
                <div className="w-4 h-4 rounded-full bg-black my-1" />
                <span className="text-[8px] sm:text-[9px] font-mono font-bold text-black/70">
                  SIDE A • 33 RPM
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* CARD 2: For Artists (Lilac / Lavender #D4B8FF) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.15 }}
        onMouseEnter={() => setHoveredCard(2)}
        onMouseLeave={() => setHoveredCard(null)}
        className="relative rounded-[40px] bg-[#D4B8FF] text-black p-8 sm:p-12 md:p-16 overflow-hidden shadow-2xl flex flex-col justify-between min-h-[460px] group cursor-pointer"
      >
        {/* Massive background watermark text */}
        <div className="absolute top-1/2 left-8 -translate-y-1/2 text-8xl sm:text-9xl md:text-[13rem] font-heading font-black text-black/5 pointer-events-none select-none tracking-tighter">
          Artists
        </div>

        <div className="relative z-10 max-w-xl">
          <div className="flex items-center gap-4">
            <h3 className="text-4xl sm:text-6xl md:text-7xl font-heading font-black tracking-tight text-black leading-none">
              For Artists
            </h3>
            {/* Floating 3D Vintage Microphone Sticker */}
            <motion.div
              animate={{
                y: [0, -8, 0],
                rotate: [0, -4, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="transform group-hover:scale-110 transition-transform duration-300"
            >
              <MicrophoneSticker className="w-16 h-16 sm:w-20 sm:h-20" />
            </motion.div>
          </div>

          <p className="mt-6 text-black/85 font-medium text-base sm:text-xl max-w-lg leading-relaxed">
            Traditional platforms prioritize established names and commercial productions, leaving many talented independent artists in obscurity.
          </p>
        </div>

        {/* Large Realistic Spinning Vinyl Record */}
        <div className="relative self-center sm:self-end mt-8 sm:mt-0 z-20">
          <motion.div
            animate={{
              y: hoveredCard === 2 ? -30 : 0,
              scale: hoveredCard === 2 ? 1.05 : 1,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="w-72 sm:w-96 h-40 sm:h-52 overflow-hidden flex items-start justify-center"
          >
            {/* Spinning Vinyl Disc */}
            <div
              className={`w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-[#0d0d0e] border-[14px] border-[#18181b] shadow-[0_25px_60px_rgba(0,0,0,0.7)] flex items-center justify-center relative ${
                hoveredCard === 2 ? "animate-vinyl-spin-fast" : "animate-vinyl-spin"
              }`}
            >
              <div className="absolute inset-4 rounded-full border border-white/10" />
              <div className="absolute inset-8 rounded-full border border-white/5" />
              <div className="absolute inset-12 rounded-full border border-white/10" />
              <div className="absolute inset-16 rounded-full border border-white/5" />
              <div className="absolute inset-20 rounded-full border border-white/10" />

              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />

              {/* Center Vinyl Label with Lilac Accent */}
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-[#CEACFE] border-6 border-black flex flex-col items-center justify-center shadow-inner">
                <span className="font-heading font-black text-xs sm:text-sm text-black tracking-widest uppercase">
                  ARTIST
                </span>
                <div className="w-4 h-4 rounded-full bg-black my-1" />
                <span className="text-[8px] sm:text-[9px] font-mono font-bold text-black/70">
                  SIDE B • 45 RPM
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
