"use client";

import React from "react";
import { motion } from "motion/react";
import { HeadphoneSticker, MicrophoneSticker, CassetteSticker } from "./RetroStickers";

export default function MusicCutoutMarquee() {
  const topGenres = [
    { name: "ROCK", rotate: -3 },
    { name: "CLASSICAL", rotate: 2 },
    { name: "FOLK", rotate: -1 },
    { name: "INDIE", rotate: 3 },
  ];

  const bottomGenres = [
    { name: "HIP HOP", rotate: -4 },
    { name: "POP", rotate: 3 },
    { name: "CLASSICAL", rotate: -2 },
    { name: "JAZZ", rotate: 2 },
    { name: "BLUES", rotate: -3 },
    { name: "REGGAE", rotate: 4 },
    { name: "FOLK", rotate: -1 },
    { name: "COUNTRY", rotate: 2 },
  ];

  return (
    <section className="relative py-28 px-4 bg-black overflow-hidden flex flex-col items-center justify-center select-none">
      {/* Subtitle */}
      <div className="text-center mb-6">
        <span className="text-xs sm:text-sm font-mono font-bold tracking-widest text-zinc-400 uppercase">
          Taking Control of How you Experience
        </span>
      </div>

      {/* Top Floating Genre Badges Row */}
      <div className="w-full max-w-4xl flex items-center justify-around flex-wrap gap-3 mb-2 z-20">
        {topGenres.map((g, i) => (
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
            style={{ transform: `rotate(${g.rotate}deg)` }}
          >
            {g.name}
          </motion.div>
        ))}
      </div>

      {/* Massive Cutout Typography "M U S I C" */}
      <div className="relative w-full max-w-6xl py-4 flex items-center justify-center">
        <h2
          className="text-7xl sm:text-9xl md:text-[14rem] lg:text-[18rem] font-heading font-black tracking-tighter uppercase leading-none text-transparent bg-clip-text text-center select-none drop-shadow-2xl"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1600&auto=format&fit=crop&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          MUSIC
        </h2>

        {/* Floating stickers layered on the typography */}
        <div className="absolute left-8 sm:left-24 bottom-6 z-30 pointer-events-none transform -rotate-12">
          <MicrophoneSticker className="w-14 h-18 sm:w-20 sm:h-24" />
        </div>
        <div className="absolute right-8 sm:right-24 top-6 z-30 pointer-events-none transform rotate-12">
          <HeadphoneSticker className="w-16 h-16 sm:w-24 sm:h-24" />
        </div>
      </div>

      {/* Bottom Floating Genre Badges Row */}
      <div className="w-full max-w-5xl flex items-center justify-center flex-wrap gap-2.5 mt-2 z-20">
        {bottomGenres.map((g, i) => (
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
            style={{ transform: `rotate(${g.rotate}deg)` }}
          >
            {g.name}
          </motion.div>
        ))}

        <div className="hidden sm:inline-block transform rotate-6">
          <CassetteSticker className="w-16 h-10" />
        </div>
      </div>
    </section>
  );
}
