"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus, ChevronRight, ArrowUpRight, Search, Camera, PenTool, QrCode, Download } from "lucide-react";
import { MEDIA_ASSETS } from "../../data/mediaAssets";

interface FlowStep {
  id: string;
  step: string;
  title: string;
  description: string;
}

const FLOW_STEPS: FlowStep[] = [
  {
    id: "step-1",
    step: "01",
    title: "Find Any Song on Spotify",
    description:
      "Live search through Spotify's entire catalog. Type any track title, artist name, or album to find the exact song that defines your memory. Zero sign-up required.",
  },
  {
    id: "step-2",
    step: "02",
    title: "Add & Frame Your Photo",
    description:
      "Upload a personal photo from that night, trip, or milestone. Use the intuitive cropper to pan, zoom, and frame it perfectly into the Polaroid window.",
  },
  {
    id: "step-3",
    step: "03",
    title: "Inscribe Note & Set Date",
    description:
      "Inscribe your custom memory note with full emoji support and automatic font fitting. Set the exact timeline date to freeze the memory in time.",
  },
  {
    id: "step-4",
    step: "04",
    title: "Auto-Generate Spotify Code",
    description:
      "Every card automatically generates the official black-and-white Spotify wave barcode. Scanning the code with any camera or the Spotify app instantly plays the song.",
  },
  {
    id: "step-5",
    step: "05",
    title: "Download Print-Ready Keepsake",
    description:
      "Export your completed card at 3x print resolution in seconds. 100% free, zero login, zero watermark. Ready for bedroom walls, framed gifts, or scrapbooking.",
  },
];

export default function ConnectShowcase() {
  const [activeId, setActiveId] = useState<string>("step-1");

  return (
    <section className="py-28 px-4 max-w-7xl mx-auto overflow-hidden select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
        {/* Left Column: Headline & Overlapping 3D Phone Mockups */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold tracking-widest text-[#CCFF00] uppercase">
              SIMPLE 4-STEP PROCESS
            </span>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-heading font-black tracking-tighter text-white leading-none">
              How It <br />
              <span className="text-[#CCFF00] flex items-center gap-2">
                <ChevronRight className="w-12 h-12 inline text-[#CEACFE]" /> Works.
              </span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed pt-2">
              No complicated design tools, no logins, and zero account setup. From finding your track to printing your card takes under two minutes.
            </p>
            <div className="pt-2">
              <a
                href="#search-section"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#121214] border border-[#222226] text-white font-heading font-bold text-sm hover:border-[#CCFF00] hover:text-[#CCFF00] transition"
              >
                <span>Start With A Song</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Overlapping 3D Phone Mockup: Live Moment Card Preview */}
          <div className="relative w-full max-w-sm h-[380px] sm:h-[420px] flex items-center justify-center pt-4">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#CEACFE]/20 blur-[100px] rounded-full pointer-events-none" />

            <motion.div
              animate={{
                y: [0, -8, 0],
                rotate: [-4, -2, -4],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="w-[230px] sm:w-[260px] h-[360px] sm:h-[400px] rounded-[38px] p-2.5 bg-[#18181B] border-[2px] border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.9)] z-20 flex flex-col justify-between"
            >
              <div className="w-full h-full rounded-[30px] bg-[#F8F7F4] text-black p-3 flex flex-col justify-between overflow-hidden shadow-inner">
                {/* Photo frame */}
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-zinc-200">
                  <img
                    src={MEDIA_ASSETS.flowPhones.phone1Image}
                    alt="Moment preview"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Personal Note */}
                <div className="rounded-xl bg-white p-2 border border-zinc-200/60 text-center">
                  <p className="font-hand text-[#3F6B3D] text-[11px] leading-tight font-semibold">
                    Look at the stars, look how they shine for you 💛
                  </p>
                </div>

                {/* Date & Track */}
                <div className="flex items-center justify-between text-[9px] font-mono px-1 text-zinc-600">
                  <span className="font-bold uppercase">03rd Oct 2023</span>
                  <span className="font-bold text-zinc-900 truncate max-w-[90px]">Coldplay • Yellow</span>
                </div>

                {/* Official Spotify Code Bar */}
                <div className="rounded-xl bg-black py-1 px-2.5 flex items-center justify-between">
                  <div className="w-3 h-3 rounded-full bg-[#1DB954] flex items-center justify-center">
                    <span className="text-[6px] text-black font-black">●</span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <div className="w-0.5 h-2 bg-white rounded-full animate-pulse" />
                    <div className="w-0.5 h-3.5 bg-white rounded-full" />
                    <div className="w-0.5 h-1.5 bg-white rounded-full" />
                    <div className="w-0.5 h-4 bg-white rounded-full" />
                    <div className="w-0.5 h-2.5 bg-white rounded-full" />
                    <div className="w-0.5 h-3 bg-white rounded-full" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Column: User Flow Accordion */}
        <div className="lg:col-span-7 space-y-3.5">
          {FLOW_STEPS.map((step) => {
            const isOpen = activeId === step.id;
            return (
              <div
                key={step.id}
                className={`rounded-[28px] border transition-all duration-300 overflow-hidden cursor-pointer ${
                  isOpen
                    ? "bg-[#CCFF00] text-black border-[#CCFF00] shadow-[0_10px_30px_rgba(204,255,0,0.3)]"
                    : "bg-[#121214] text-white border-[#27272A] hover:border-zinc-700"
                }`}
              >
                <button
                  onClick={() => setActiveId(isOpen ? "" : step.id)}
                  className="w-full p-5 sm:p-6 flex items-center justify-between text-left cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full ${
                        isOpen ? "bg-black text-[#CCFF00]" : "bg-[#1A1A1E] text-zinc-400"
                      }`}
                    >
                      {step.step}
                    </span>
                    <span className="font-heading font-extrabold text-lg sm:text-xl md:text-2xl tracking-tight">
                      {step.title}
                    </span>
                  </div>
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
                      className="px-5 sm:px-6 pb-6 text-black/90 font-medium text-sm sm:text-base leading-relaxed pl-16 sm:pl-20"
                    >
                      {step.description}
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
