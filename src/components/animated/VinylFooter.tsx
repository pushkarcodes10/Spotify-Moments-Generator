"use client";

import React from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Music, QrCode } from "lucide-react";
import { SpotifyLogo } from "./RetroStickers";

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
        {/* Glowing Spotify Apex Badge */}
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            boxShadow: [
              "0 0 30px rgba(29,185,84,0.4)",
              "0 0 60px rgba(29,185,84,0.7)",
              "0 0 30px rgba(29,185,84,0.4)",
            ],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-16 h-16 rounded-full bg-[#1DB954] text-black flex items-center justify-center mx-auto cursor-pointer shadow-lg"
        >
          <SpotifyLogo className="w-10 h-10" color="#000000" />
        </motion.div>

        {/* Headline */}
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-heading font-black tracking-tight text-white uppercase max-w-3xl mx-auto leading-tight">
          Turn Any Song <br />
          Into A Memory
        </h2>

        <p className="text-zinc-400 max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
          Search Spotify, frame your photo, inscribe your note, and take home a printable keepsake with a real Spotify scannable code. Under 2 minutes, no login needed.
        </p>

        {/* CTA Button */}
        <div>
          <a
            href="#search-section"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#CCFF00] text-black font-heading font-black text-sm uppercase tracking-wider hover:bg-[#B8F53E] hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(204,255,0,0.35)]"
          >
            <span>Start With A Song</span>
            <ArrowUpRight className="w-4 h-4 stroke-[3]" />
          </a>
        </div>

        {/* Navigation Links */}
        <div className="pt-8 flex flex-wrap justify-center gap-8 sm:gap-12 text-sm font-semibold text-zinc-400">
          <a href="#search-section" className="hover:text-white transition">Search Songs</a>
          <a href="#search-section" className="hover:text-white transition">Create Moment</a>
          <a href="#search-section" className="hover:text-white transition">Scannable Codes</a>
          <a href="https://spotify.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Powered by Spotify API</a>
        </div>

        {/* Bottom Floating Card Preview */}
        <div className="pt-10 flex justify-center">
          <div className="relative w-52 sm:w-60 h-32 rounded-t-3xl bg-[#141417] border-t-2 border-x-2 border-white/10 p-2.5 shadow-2xl overflow-hidden flex flex-col justify-between">
            <div className="w-16 h-1 bg-white/20 rounded-full mx-auto" />
            <div className="p-2 rounded-xl bg-black/70 flex items-center justify-between border border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#CCFF00] flex items-center justify-center">
                  <Music className="w-4 h-4 text-black" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-bold text-white">Spotify Moments</p>
                  <p className="text-[8px] text-zinc-400">3x Print Keepsake</p>
                </div>
              </div>
              <QrCode className="w-4 h-4 text-[#CCFF00]" />
            </div>
          </div>
        </div>

        {/* Copyright and notes */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© 2026 Spotify Moments Generator. All product names, logos, and brands are property of their respective owners.</p>
          <p className="text-zinc-500">Official Spotify wave barcodes open directly in Spotify.</p>
        </div>
      </div>
    </footer>
  );
}
