"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus, CheckCircle } from "lucide-react";
import { MEDIA_ASSETS } from "../../data/mediaAssets";

interface BenefitItem {
  id: string;
  title: string;
  description: string;
  previewImage?: string;
}

const ITEMS: BenefitItem[] = [
  {
    id: "frictionless",
    title: "Zero Sign-Up, 100% Frictionless",
    description:
      "No account to create, no email passwords, and no personal Spotify credentials required. Go from landing on the page to a finished keepsake in under 2 minutes.",
    previewImage: MEDIA_ASSETS.heroPhone.momentCardImage,
  },
  {
    id: "scannable",
    title: "Official Scannable Spotify Codes",
    description:
      "Every card embeds an authentic Spotify wave barcode. Anyone can point their phone camera or the Spotify app at the card to instantly begin playing the exact song.",
    previewImage: MEDIA_ASSETS.flowPhones.phone1Image,
  },
  {
    id: "print",
    title: "High-Resolution 3x Print Output",
    description:
      "Rendered with ultra-sharp canvas export suitable for physical wall art, bedroom photo walls, framed anniversary surprises, and keepsake scrapbooks.",
    previewImage: MEDIA_ASSETS.accordionPreview,
  },
  {
    id: "keepsake",
    title: "Personal Keepsakes That Last",
    description:
      "Transform fleeting digital audio into tangible physical keepsakes. Pair your favorite song with a personal photo, heartfelt message, and significant milestone date.",
    previewImage: MEDIA_ASSETS.floatingPolaroids.card3,
  },
];

export default function NotJustListening() {
  const [activeId, setActiveId] = useState<string>("frictionless");

  return (
    <section className="py-24 px-4 max-w-5xl mx-auto select-none">
      <div className="text-center mb-12 space-y-3">
        <span className="text-xs font-mono font-bold tracking-widest text-[#CCFF00] uppercase">
          DESIGNED FOR MEMORY KEEPERS
        </span>
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-heading font-black tracking-tight text-white uppercase">
          Why Spotify{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#CEACFE] via-white to-[#CCFF00]">
            Moments
          </span>
        </h2>
      </div>

      <div className="space-y-3.5">
        {ITEMS.map((item) => {
          const isOpen = activeId === item.id;
          return (
            <div
              key={item.id}
              className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? "bg-[#141417] border-[#27272A] shadow-2xl"
                  : "bg-[#101012] border-[#1C1C1F] hover:border-zinc-700"
              }`}
            >
              <button
                onClick={() => setActiveId(isOpen ? "" : item.id)}
                className="w-full p-5 sm:p-6 flex items-center justify-between text-left cursor-pointer"
              >
                <span className="font-heading font-extrabold text-lg sm:text-xl md:text-2xl text-white tracking-tight">
                  {item.title}
                </span>
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-transform ${
                    isOpen ? "bg-[#CCFF00] text-black" : "bg-[#1F1F23] text-white"
                  }`}
                >
                  {isOpen ? <Minus className="w-5 h-5 stroke-[2.5]" /> : <Plus className="w-5 h-5 stroke-[2.5]" />}
                </div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="px-5 sm:px-6 pb-6 pt-2 border-t border-white/5"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                      {/* Left: Thumbnail Preview Card */}
                      {item.previewImage && (
                        <div className="md:col-span-4 rounded-2xl overflow-hidden aspect-[4/3] bg-zinc-800 border border-white/10 shadow-lg">
                          <img
                            src={item.previewImage}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      {/* Right: Description Text */}
                      <div className={`${item.previewImage ? "md:col-span-8" : "md:col-span-12"}`}>
                        <p className="text-zinc-300 font-medium text-sm sm:text-base leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
