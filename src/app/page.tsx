"use client";

import React, { useEffect } from "react";
import { motion } from "motion/react";
import SongSearch from "../components/SongSearch";
import HeroOrbit from "../components/animated/HeroOrbit";
import WaveDiscovery from "../components/animated/WaveDiscovery";
import ShatterKinetic from "../components/animated/ShatterKinetic";
import VinylFeatureCards from "../components/animated/VinylFeatureCards";
import ConnectShowcase from "../components/animated/ConnectShowcase";
import UniteTheVibe from "../components/animated/UniteTheVibe";
import NotJustListening from "../components/animated/NotJustListening";
import MusicCutoutMarquee from "../components/animated/MusicCutoutMarquee";
import DualBenefitCards from "../components/animated/DualBenefitCards";
import VinylFooter from "../components/animated/VinylFooter";
import { Sparkles, ArrowUpRight, Music } from "lucide-react";

export default function Home() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050505] text-white selection:bg-[#CCFF00] selection:text-black overflow-x-hidden">
      {/* 1. TOP NAVBAR */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#050505]/80 border-b border-[#222226]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#121214] border border-[#222226] flex items-center justify-center shadow-inner">
              <span className="font-heading font-black text-[#CCFF00] text-xl tracking-tighter">/</span>
            </div>
            <div>
              <span className="font-heading font-extrabold text-xl sm:text-2xl tracking-tight text-white flex items-center">
                Spotify<span className="text-[#CCFF00] ml-1">Moments</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#search-section"
              className="px-6 py-2.5 rounded-full bg-[#CCFF00] text-black font-heading font-bold text-sm tracking-wide transition-all duration-300 hover:bg-[#B8F53E] hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(204,255,0,0.3)] flex items-center gap-1.5"
            >
              <span>Join waitlist</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION WITH 3D ORBIT */}
      <section className="relative pt-12 pb-16 md:pt-16 md:pb-24 flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mx-auto space-y-4 mb-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#121214] border border-[#222226] text-xs font-bold text-[#CCFF00] tracking-wider uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            A Song + A Memory → A Keepsake
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-black tracking-tight text-white leading-none uppercase max-w-4xl mx-auto">
            Your Music. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-[#CCFF00]">
              Your People. One App.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-[#9CA3AF] font-medium leading-relaxed pt-2">
            Picture a world where musicians find their audience, listeners discover hidden gems, and your favorite songs transform into print-ready Polaroid keepsakes with official scannable Spotify codes.
          </p>
        </motion.div>

        {/* 3D Elliptical Orbit with Phone and Orbiting Cards */}
        <HeroOrbit />
      </section>

      {/* 3. PRIMARY INTERACTIVE SONG SEARCH SECTION */}
      <section id="search-section" className="relative py-16 px-4 max-w-5xl mx-auto scroll-mt-24">
        <SongSearch />
      </section>

      {/* 4. THE FUTURE OF MUSIC DISCOVERY (SINE-WAVE BADGES) */}
      <WaveDiscovery />

      {/* 5. SHATTERING TRADITIONAL DISCOVERY LIMITATIONS (KINETIC TYPOGRAPHY) */}
      <ShatterKinetic />

      {/* 6. FOR LISTENERS & FOR ARTISTS (SPINNING VINYL RECORDS) */}
      <VinylFeatureCards />

      {/* 7. CONNECT. CREATE. TRANSFORM. (3D DUAL PHONE MOCKUPS & ACCORDION) */}
      <ConnectShowcase />

      {/* 8. UNITE THE VIBE (FLOATING 3D POLAROIDS & RETRO STICKERS) */}
      <UniteTheVibe />

      {/* 9. NOT JUST LISTENING (FEATURE REVEAL ACCORDION) */}
      <NotJustListening />

      {/* 10. TAKING CONTROL OF HOW YOU EXPERIENCE MUSIC (MASKED MUSIC + GENRES) */}
      <MusicCutoutMarquee />

      {/* 11. DUAL BENEFIT CARDS (EXCELLENCE FOR ARTISTS & ACCESSIBLE FOR LISTENERS) */}
      <DualBenefitCards />

      {/* 12. CONCENTRIC GROOVES FOOTER */}
      <VinylFooter />
    </div>
  );
}