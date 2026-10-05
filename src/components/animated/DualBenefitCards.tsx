"use client";

import React from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Sparkles, QrCode, CheckCircle } from "lucide-react";

export default function DualBenefitCards() {
  return (
    <section className="py-24 px-4 max-w-6xl mx-auto select-none">
      <div className="text-center mb-8">
        <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
          BUILT FOR SPEED AND QUALITY
        </span>
      </div>

      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {/* Card 1: Zero Friction (Lilac #D4B8FF) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-[40px] bg-[#D4B8FF] text-black p-8 sm:p-12 overflow-hidden shadow-2xl flex flex-col justify-between min-h-[420px] group cursor-pointer"
        >
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider bg-black/10 px-3 py-1 rounded-full">
              ZERO FRICTION
            </span>
            <h3 className="text-3xl sm:text-5xl font-heading font-black tracking-tight leading-tight mt-4">
              No Login. <br />
              Under 2 Minutes.
            </h3>
            <p className="mt-4 text-black/80 font-medium text-sm sm:text-base max-w-sm">
              You never have to sign up, link an email, or connect a personal Spotify account. Simply search Spotify, customize, and export.
            </p>
          </div>

          {/* Angled Phone Mockup sliding up */}
          <div className="relative self-center sm:self-end mt-6 transform translate-y-6 group-hover:translate-y-2 group-hover:scale-105 transition-all duration-500">
            <div className="w-56 sm:w-64 h-64 sm:h-72 rounded-t-[36px] bg-[#18181B] border-[3px] border-black/30 p-2 shadow-2xl -rotate-6">
              <div className="w-full h-full rounded-t-[28px] bg-[#0E0E10] p-3 text-white flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-[#CEACFE]">Instant Editor</span>
                  <div className="mt-2 p-2 rounded-xl bg-zinc-800/80 border border-white/10 text-[9px] space-y-1">
                    <p className="text-zinc-400">Step 1: Track Selected</p>
                    <p className="text-[#CCFF00] font-bold">Step 2: Add Photo & Note</p>
                  </div>
                </div>
                <div className="w-16 h-1 bg-white/20 rounded-full mx-auto" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Card 2: 3x Print Output (Lime #B8F53E) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-[40px] bg-[#B8F53E] text-black p-8 sm:p-12 overflow-hidden shadow-2xl flex flex-col justify-between min-h-[420px] group cursor-pointer"
        >
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider bg-black/10 px-3 py-1 rounded-full">
              PRINT & FRAME
            </span>
            <h3 className="text-3xl sm:text-5xl font-heading font-black tracking-tight leading-tight mt-4">
              High-Resolution <br />
              3x PNG Output.
            </h3>
            <p className="mt-4 text-black/80 font-medium text-sm sm:text-base max-w-sm">
              Rendered with crisp text, accurate fonts, and official Spotify wave barcodes calibrated for both smartphone screens and physical wall prints.
            </p>
          </div>

          {/* Angled Phone Mockup sliding up */}
          <div className="relative self-center sm:self-end mt-6 transform translate-y-6 group-hover:translate-y-2 group-hover:scale-105 transition-all duration-500">
            <div className="w-56 sm:w-64 h-64 sm:h-72 rounded-t-[36px] bg-[#18181B] border-[3px] border-black/30 p-2 shadow-2xl rotate-6">
              <div className="w-full h-full rounded-t-[28px] bg-[#0E0E10] p-3 text-white flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-[#CCFF00]">Print Quality 3x</span>
                  <div className="mt-2 p-2 rounded-xl bg-zinc-800/80 border border-white/10 flex items-center justify-between">
                    <span className="text-[9px] font-mono text-zinc-300">Ready to Print</span>
                    <QrCode className="w-4 h-4 text-[#CCFF00]" />
                  </div>
                </div>
                <div className="w-16 h-1 bg-white/20 rounded-full mx-auto" />
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
            <span>Create Your Card</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
