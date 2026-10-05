"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus, ChevronRight, Music, Play, Sparkles } from "lucide-react";

interface AccordionItem {
  id: string;
  title: string;
  description: string;
}

const ITEMS: AccordionItem[] = [
  {
    id: "discovery",
    title: "Innovative Music Discovery",
    description:
      "SoundSphere is revolutionizing the way we find music by removing algorithmic barriers. Listeners can naturally explore sounds through our customizable interface, allowing them to discover fresh talent across all musical genres without the influence of trend suggestions or distracting unrelated content.",
  },
  {
    id: "advancement",
    title: "Artist Advancement",
    description:
      "Direct artist monetization and discovery pipelines that bypass middleman paywalls. Give emerging artists the stage they deserve with scannable keepsakes that build lasting real-world listener loyalty.",
  },
  {
    id: "participation",
    title: "Listener Participation",
    description:
      "Transform passive streaming into active memory keeping. Every song you love can be paired with your personal memories, printed in high-resolution, or shared across physical and digital spaces.",
  },
  {
    id: "ecosystem",
    title: "Musical Ecosystem",
    description:
      "A harmonious bridge between artists, listeners, and collectors. Sustainable discovery where real human connections and shared musical moments take priority over vanity metrics.",
  },
  {
    id: "openness",
    title: "Integrity and Openness",
    description:
      "No gated sign-ups, no invasive tracking, and no hidden subscriptions. Zero-friction tools built for music lovers who believe songs are the soundtrack to life's most precious memories.",
  },
];

export default function ConnectShowcase() {
  const [activeId, setActiveId] = useState<string>("discovery");

  return (
    <section className="py-28 px-4 max-w-7xl mx-auto overflow-hidden select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Headline & Overlapping 3D Phone Mockups */}
        <div className="lg:col-span-6 flex flex-col justify-center space-y-8">
          {/* Bold Header */}
          <div className="space-y-1">
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-heading font-black tracking-tight text-white leading-none">
              Connect. <br />
              <span className="text-[#CEACFE] flex items-center gap-2">
                <ChevronRight className="w-10 h-10 md:w-14 md:h-14 inline text-[#CCFF00]" />
                Create.
              </span>
              Transform.
            </h2>
          </div>

          {/* Overlapping Dual 3D Phone Mockups */}
          <div className="relative w-full max-w-md h-[400px] sm:h-[450px] flex items-center justify-center pt-4">
            {/* Ambient Purple Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#CEACFE]/20 blur-[100px] rounded-full pointer-events-none" />

            {/* Phone 1: Background Tilted Phone ("Quick Access" screen) */}
            <motion.div
              animate={{
                y: [0, -6, 0],
                rotate: [8, 10, 8],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute right-2 sm:right-6 top-4 w-[190px] sm:w-[220px] h-[370px] sm:h-[420px] rounded-[36px] p-2.5 bg-[#1C1C1E] border-[2px] border-[#38383A] shadow-2xl z-10 opacity-90"
            >
              <div className="w-full h-full rounded-[28px] bg-[#121214] border border-[#27272A] p-3 text-white flex flex-col justify-between overflow-hidden">
                <div className="flex items-center justify-between text-[9px] font-mono text-zinc-400">
                  <span>9:41</span>
                  <div className="w-3 h-1.5 rounded-xs border border-zinc-400" />
                </div>
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-heading font-bold text-white">Quick Access</span>
                  <div className="grid grid-cols-2 gap-1 text-[8px] font-bold">
                    <div className="p-2 rounded-lg bg-[#27272A] text-zinc-200">Weekly Mix</div>
                    <div className="p-2 rounded-lg bg-[#CEACFE]/20 text-[#CEACFE]">Road Trip</div>
                    <div className="p-2 rounded-lg bg-[#CCFF00]/20 text-[#CCFF00]">Terrace Jam</div>
                    <div className="p-2 rounded-lg bg-[#27272A] text-zinc-200">Late Night</div>
                  </div>
                </div>
                <div className="space-y-1.5 pt-2">
                  <span className="text-[9px] font-bold text-zinc-400">Latest Songs</span>
                  <div className="p-1.5 rounded-lg bg-[#18181B] flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-[#CCFF00]" />
                    <span className="text-[9px] font-bold text-white truncate">Neon Dreams</span>
                  </div>
                  <div className="p-1.5 rounded-lg bg-[#18181B] flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-[#CEACFE]" />
                    <span className="text-[9px] font-bold text-white truncate">Voyager</span>
                  </div>
                </div>
                <div className="w-16 h-1 bg-white/30 rounded-full mx-auto" />
              </div>
            </motion.div>

            {/* Phone 2: Foreground Tilted Phone ("Discover" screen) */}
            <motion.div
              animate={{
                y: [0, 8, 0],
                rotate: [-6, -4, -6],
              }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-2 sm:left-6 top-8 w-[210px] sm:w-[240px] h-[390px] sm:h-[440px] rounded-[38px] p-2.5 bg-[#18181B] border-[2px] border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.9)] z-20"
            >
              <div className="w-full h-full rounded-[30px] bg-[#09090B] border border-[#27272A] p-3 text-white flex flex-col justify-between overflow-hidden">
                <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
                  <span>9:41</span>
                  <div className="w-3.5 h-2 rounded-xs border border-zinc-400" />
                </div>
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-heading font-extrabold text-white">Discover</span>
                    <Sparkles className="w-3.5 h-3.5 text-[#CCFF00]" />
                  </div>
                  <div className="flex gap-1 text-[8px] font-bold">
                    <span className="px-2 py-0.5 rounded-full bg-[#CCFF00] text-black">All</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#18181B] text-zinc-400">Artists</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#18181B] text-zinc-400">Songs</span>
                  </div>
                </div>
                {/* Album Card Preview */}
                <div className="relative rounded-xl overflow-hidden aspect-video bg-zinc-800">
                  <img
                    src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&auto=format&fit=crop&q=80"
                    alt="Album"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-end p-2">
                    <span className="text-[10px] font-bold text-white">Yellow • Coldplay</span>
                  </div>
                </div>
                {/* Equalizer bar */}
                <div className="p-2 rounded-xl bg-[#141417] flex items-center justify-between">
                  <span className="text-[9px] font-mono text-[#CCFF00]">Playing Now</span>
                  <div className="flex gap-0.5">
                    <div className="w-0.5 h-2.5 bg-[#CCFF00] animate-pulse" />
                    <div className="w-0.5 h-3.5 bg-[#CCFF00]" />
                    <div className="w-0.5 h-1.5 bg-[#CCFF00]" />
                    <div className="w-0.5 h-3 bg-[#CCFF00]" />
                  </div>
                </div>
                <div className="w-20 h-1 bg-white/30 rounded-full mx-auto" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Column: Interactive Feature Accordion */}
        <div className="lg:col-span-6 space-y-3.5">
          {ITEMS.map((item) => {
            const isOpen = activeId === item.id;
            return (
              <div
                key={item.id}
                className={`rounded-[28px] border transition-all duration-300 overflow-hidden cursor-pointer ${
                  isOpen
                    ? "bg-[#CCFF00] text-black border-[#CCFF00] shadow-[0_10px_30px_rgba(204,255,0,0.3)]"
                    : "bg-[#121214] text-white border-[#27272A] hover:border-zinc-700"
                }`}
              >
                <button
                  onClick={() => setActiveId(isOpen ? "" : item.id)}
                  className="w-full p-5 sm:p-6 flex items-center justify-between text-left cursor-pointer"
                >
                  <span className="font-heading font-extrabold text-lg sm:text-xl md:text-2xl tracking-tight">
                    {item.title}
                  </span>
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform ${
                      isOpen ? "bg-black text-[#CCFF00]" : "bg-[#1E1E22] text-white"
                    }`}
                  >
                    {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="px-5 sm:px-6 pb-6 text-black/90 font-medium text-sm sm:text-base leading-relaxed"
                    >
                      {item.description}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
