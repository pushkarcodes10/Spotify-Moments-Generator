"use client";

import React from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Music } from "lucide-react";

export default function VinylFooter() {
  return (
    <footer className="relative pt-36 pb-20 px-4 bg-black overflow-hidden text-center select-none border-t border-white/10">
      {/* Concentric Vinyl Groove Arcs in Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[600px] pointer-events-none -z-0">
        <svg viewBox="0 0 1100 600" className="w-full h-full opacity-35" fill="none">
          <ellipse cx="550" cy="80" rx="200" ry="120" stroke="white" strokeWidth="1" strokeDasharray="3 3" />
          <ellipse cx="550" cy="80" rx="320" ry="200" stroke="#CCFF00" strokeWidth="1" opacity="0.4" />
          <ellipse cx="550" cy="80" rx="440" ry="280" stroke="white" strokeWidth="1" opacity="0.2" />
          <ellipse cx="550" cy="80" rx="560" ry="360" stroke="#CEACFE" strokeWidth="1" opacity="0.3" />
          <ellipse cx="550" cy="80" rx="680" ry="440" stroke="white" strokeWidth="1" opacity="0.15" />
          <ellipse cx="550" cy="80" rx="800" ry="520" stroke="white" strokeWidth="1" opacity="0.1" />
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto space-y-8">
        {/* Glowing Lime Apex Badge */}
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            boxShadow: [
              "0 0 30px rgba(204,255,0,0.4)",
              "0 0 60px rgba(204,255,0,0.7)",
              "0 0 30px rgba(204,255,0,0.4)",
            ],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-16 h-16 rounded-full bg-[#CCFF00] text-black flex items-center justify-center font-heading font-black text-3xl mx-auto cursor-pointer"
        >
          /
        </motion.div>

        {/* Headline */}
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-heading font-black tracking-tight text-white uppercase max-w-3xl mx-auto leading-tight">
          For Those Who <br />
          Breathe Music
        </h2>

        {/* CTA Button */}
        <div>
          <a
            href="#search-section"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#18181B] border border-white/20 text-white font-heading font-bold text-sm uppercase tracking-wider hover:bg-[#CCFF00] hover:text-black hover:scale-105 transition-all duration-300 shadow-xl"
          >
            <span>Start With A Song</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Navigation Links */}
        <div className="pt-8 flex flex-wrap justify-center gap-8 sm:gap-12 text-sm font-semibold text-zinc-400">
          <a href="#search-section" className="hover:text-white transition">About</a>
          <a href="#search-section" className="hover:text-white transition">For creators</a>
          <a href="#search-section" className="hover:text-white transition">For listeners</a>
          <a href="#search-section" className="hover:text-white transition">Contact us</a>
        </div>

        {/* Bottom Floating Phone Mockup & Fan Preview */}
        <div className="pt-10 flex justify-center">
          <div className="relative w-48 sm:w-56 h-36 rounded-t-3xl bg-[#141417] border-t-2 border-x-2 border-white/10 p-2 shadow-2xl overflow-hidden flex flex-col justify-between">
            <div className="w-16 h-1 bg-white/20 rounded-full mx-auto" />
            <div className="p-2 rounded-xl bg-black/60 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#CCFF00] flex items-center justify-center">
                <Music className="w-4 h-4 text-black" />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-bold text-white">Coldplay</p>
                <p className="text-[8px] text-zinc-400">Yellow</p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright and social */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© 2026 Spotify Moments Generator. All product names, logos, and brands are property of their respective owners.</p>
          <div className="flex gap-4">
            <span className="hover:text-white cursor-pointer transition">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition">Copyright Infringement</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
