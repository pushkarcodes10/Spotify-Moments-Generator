"use client";

import React from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Sparkles } from "lucide-react";

export default function DualBenefitCards() {
  return (
    <section className="py-24 px-4 max-w-6xl mx-auto select-none">
      <div className="text-center mb-8">
        <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
          FOUNDED ON CREATIVE INTEGRITY AND VISION
        </span>
      </div>

      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {/* Card 1: Excellence for Artists (Lilac #D4B8FF) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-[40px] bg-[#D4B8FF] text-black p-8 sm:p-12 overflow-hidden shadow-2xl flex flex-col justify-between min-h-[420px] group cursor-pointer"
        >
          <div>
            <h3 className="text-3xl sm:text-5xl font-heading font-black tracking-tight leading-tight">
              Excellence <br />
              for Artists
            </h3>
            <p className="mt-4 text-black/80 font-medium text-sm sm:text-base max-w-sm">
              Dedicated spotlight for independent talent. Distribute scannable moments that turn occasional streamers into lifelong supporters.
            </p>
          </div>

          {/* Angled Phone Mockup sliding up */}
          <div className="relative self-center sm:self-end mt-6 transform translate-y-6 group-hover:translate-y-2 group-hover:scale-105 transition-all duration-500">
            <div className="w-56 sm:w-64 h-64 sm:h-72 rounded-t-[36px] bg-[#18181B] border-[3px] border-black/30 p-2 shadow-2xl -rotate-6">
              <div className="w-full h-full rounded-t-[28px] bg-[#0E0E10] p-3 text-white">
                <span className="text-[10px] font-bold text-[#CEACFE]">Quick Access</span>
                <div className="grid grid-cols-2 gap-1.5 mt-2">
                  <div className="p-2 rounded-lg bg-zinc-800 text-[9px] font-bold">Tracks</div>
                  <div className="p-2 rounded-lg bg-[#CEACFE] text-black text-[9px] font-bold">Analytics</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Card 2: Accessible for Listeners (Lime #B8F53E) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-[40px] bg-[#B8F53E] text-black p-8 sm:p-12 overflow-hidden shadow-2xl flex flex-col justify-between min-h-[420px] group cursor-pointer"
        >
          <div>
            <h3 className="text-3xl sm:text-5xl font-heading font-black tracking-tight leading-tight">
              Accessible <br />
              for Listeners
            </h3>
            <p className="mt-4 text-black/80 font-medium text-sm sm:text-base max-w-sm">
              Zero login, zero barriers. Search any song across millions of tracks and freeze your memory into a physical Polaroid keepsake in seconds.
            </p>
          </div>

          {/* Angled Phone Mockup sliding up */}
          <div className="relative self-center sm:self-end mt-6 transform translate-y-6 group-hover:translate-y-2 group-hover:scale-105 transition-all duration-500">
            <div className="w-56 sm:w-64 h-64 sm:h-72 rounded-t-[36px] bg-[#18181B] border-[3px] border-black/30 p-2 shadow-2xl rotate-6">
              <div className="w-full h-full rounded-t-[28px] bg-[#0E0E10] p-3 text-white">
                <span className="text-[10px] font-bold text-[#CCFF00]">Artists for you</span>
                <div className="flex items-center gap-2 mt-2 p-1.5 rounded-lg bg-zinc-800">
                  <div className="w-6 h-6 rounded-full bg-[#CCFF00]" />
                  <span className="text-[9px] font-bold text-white">Coldplay</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Floating Center Pill Button */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 hidden md:block">
          <a
            href="#search-section"
            className="px-8 py-3.5 rounded-full bg-black text-[#CCFF00] border-2 border-[#CCFF00] font-heading font-extrabold text-sm shadow-[0_0_35px_rgba(0,0,0,0.9)] hover:scale-110 hover:bg-[#CCFF00] hover:text-black transition-all active:scale-95 whitespace-nowrap flex items-center gap-2"
          >
            <span>Create a Moment</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
