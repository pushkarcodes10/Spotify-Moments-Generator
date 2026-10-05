"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus } from "lucide-react";

interface ListeningItem {
  id: string;
  title: string;
  description: string;
  previewImage?: string;
}

const ITEMS: ListeningItem[] = [
  {
    id: "empowerment",
    title: "Artistic Empowerment",
    description:
      "Empowering independent creators with tools that put musical expression first. Artists retain creative ownership and cultivate genuine listeners who care about their sound and journey.",
    previewImage:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=80",
  },
  {
    id: "authentic",
    title: "Authentic Listener Experiences",
    description:
      "Break free from repetitive chart playlists. Encounter music that speaks directly to your mood, places you love, and memories you want to preserve forever.",
    previewImage:
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500&auto=format&fit=crop&q=80",
  },
  {
    id: "community",
    title: "A Vibrant, Supportive Community",
    description:
      "A collective space where discovering music is celebrated together. Share your Spotify Moments cards, exchange memories, and uncover hidden gems.",
    previewImage:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=80",
  },
  {
    id: "future",
    title: "A Future Where Music Takes Center Stage",
    description:
      "SoundSphere reimagines the potential of music platforms by creating an environment where authenticity, inclusivity, and interaction drive every experience.",
    previewImage:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop&q=80",
  },
];

export default function NotJustListening() {
  const [activeId, setActiveId] = useState<string>("future");

  return (
    <section className="py-24 px-4 max-w-5xl mx-auto select-none">
      <div className="text-center mb-12 space-y-2">
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-heading font-black tracking-tight text-white uppercase">
          Not Just{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#CEACFE] via-white to-[#CCFF00]">
            Listening
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
