"use client";

import React from "react";
import { motion } from "motion/react";
import { HeadphoneSticker, MicrophoneSticker, CassetteSticker } from "./RetroStickers";
import { MEDIA_ASSETS } from "../../data/mediaAssets";

export default function MusicCutoutMarquee() {
  const topOccasions = [
    { name: "ROAD TRIPS", rotate: -3 },
    { name: "FIRST DANCE", rotate: 2 },
    { name: "ANNIVERSARIES", rotate: -1 },
    { name: "CONCERTS", rotate: 3 },
  ];

  const bottomOccasions = [
    { name: "SUMMER NIGHTS", rotate: -4 },
    { name: "GRADUATIONS", rotate: 3 },
    { name: "TERRACE TALKS", rotate: -2 },
    { name: "CAMPFIRES", rotate: 2 },
    { name: "RAINY DAYS", rotate: -3 },
    { name: "FIRST DATE", rotate: 4 },
    { name: "LONG WALKS", rotate: -1 },
    { name: "MILESTONES", rotate: 2 },
  ];

  return (
    <section className="relative py-28 px-4 bg-black overflow-hidden flex flex-col items-center justify-center select-none">
      {/* Subtitle */}
      <div className="text-center mb-6">
        <span className="text-xs sm:text-sm font-mono font-bold tracking-widest text-[#CCFF00] uppercase">
          Capture Any Occasion In Time
        </span>
      </div>

      {/* Top Floating Occasion Badges Row */}
      <div className="w-full max-w-4xl flex items-center justify-around flex-wrap gap-3 mb-2 z-20">
        {topOccasions.map((o, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, (i % 2 === 0 ? -6 : 6), 0],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="px-6 py-2.5 rounded-full bg-white text-black font-heading font-black text-xs sm:text-sm tracking-wider uppercase shadow-xl hover:scale-110 hover:bg-[#CCFF00] transition cursor-pointer"
            style={{ transform: `rotate(${o.rotate}deg)` }}
          >
            {o.name}
          </motion.div>
        ))}
      </div>

      {/* Massive Cutout Typography "M O M E N T S" - Brought completely inside the screen */}
      <div className="relative w-full py-4 sm:py-6 flex items-center justify-center px-4">
        <div className="relative inline-block text-center">
          <h2
            className="font-heading font-black tracking-tight uppercase leading-none text-transparent bg-clip-text text-center select-none drop-shadow-2xl whitespace-nowrap px-6 sm:px-10"
            style={{
              fontSize: "clamp(2.2rem, 8.8vw, 10.5rem)",
              backgroundImage: `url('${MEDIA_ASSETS.momentsCutoutMask}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            MOMENTS
          </h2>

          {/* Floating stickers anchored directly to the typography */}
          <div className="absolute -left-2 sm:-left-4 md:-left-6 -bottom-3 sm:bottom-0 z-30 pointer-events-none transform -rotate-12">
            <MicrophoneSticker className="w-12 h-16 sm:w-16 sm:h-20 md:w-20 md:h-24" />
          </div>
          <div className="absolute -right-2 sm:-right-4 md:-right-6 -top-3 sm:top-0 z-30 pointer-events-none transform rotate-12">
            <HeadphoneSticker className="w-14 h-14 sm:w-18 sm:h-18 md:w-22 md:h-22" />
          </div>
        </div>
      </div>

      {/* Bottom Floating Occasion Badges Row */}
      <div className="w-full max-w-5xl flex items-center justify-center flex-wrap gap-2.5 mt-2 z-20">
        {bottomOccasions.map((o, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, (i % 2 === 0 ? 6 : -6), 0],
            }}
            transition={{
              duration: 3.5 + i * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="px-5 py-2 rounded-full bg-white text-black font-heading font-black text-[11px] sm:text-xs tracking-wider uppercase shadow-xl hover:scale-110 hover:bg-[#CEACFE] transition cursor-pointer"
            style={{ transform: `rotate(${o.rotate}deg)` }}
          >
            {o.name}
          </motion.div>
        ))}

        <div className="hidden sm:inline-block transform rotate-6">
          <CassetteSticker className="w-16 h-10" />
        </div>
      </div>
    </section>
  );
}
