"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Sparkles, QrCode, Music } from "lucide-react";
import { MEDIA_ASSETS } from "../../data/mediaAssets";
import { SpotifyLogo } from "./RetroStickers";

export default function HeroOrbit() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0);

  // Mouse tilt physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  const tiltX = useTransform(springY, [-0.5, 0.5], [12, -12]);
  const tiltY = useTransform(springX, [-0.5, 0.5], [-14, 14]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Continuous orbital rotation loop
  useEffect(() => {
    let animId: number;
    let prev = performance.now();

    const loop = (now: number) => {
      const dt = (now - prev) / 1000;
      prev = now;
      // 0.3 radians per second
      setRotation((r) => r + dt * 0.35);
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  const [dimensions, setDimensions] = useState({ radiusX: 340, radiusY: 120 });

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 480) {
        setDimensions({ radiusX: 130, radiusY: 55 });
      } else if (w < 640) {
        setDimensions({ radiusX: 160, radiusY: 68 });
      } else if (w < 768) {
        setDimensions({ radiusX: 210, radiusY: 85 });
      } else if (w < 1024) {
        setDimensions({ radiusX: 265, radiusY: 105 });
      } else {
        setDimensions({ radiusX: 340, radiusY: 125 });
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cards = MEDIA_ASSETS.heroOrbit;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-6xl mx-auto flex flex-col items-center justify-center pt-6 pb-14 px-2 sm:px-4 select-none perspective-1200 overflow-hidden"
    >
      {/* Background ambient lighting aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] md:w-[820px] h-[250px] sm:h-[340px] md:h-[420px] bg-gradient-to-r from-[#CCFF00]/15 via-[#CEACFE]/25 to-transparent blur-[140px] rounded-full pointer-events-none -z-10" />

      {/* Main 3D Stage container */}
      <motion.div
        style={{
          rotateX: tiltX,
          rotateY: tiltY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full max-w-4xl h-[420px] sm:h-[500px] md:h-[580px] flex items-center justify-center overflow-visible"
      >
        {/* Glowing 3D Elliptical Orbit Rings */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ transform: "rotateX(72deg) rotateZ(-12deg)", transformStyle: "preserve-3d" }}
        >
          {/* Lime Green Outer Orbit Ring */}
          <div className="w-[320px] sm:w-[540px] md:w-[740px] lg:w-[880px] h-[320px] sm:h-[540px] md:h-[740px] lg:h-[880px] rounded-full border-[2.5px] border-[#CCFF00]/60 shadow-[0_0_60px_rgba(204,255,0,0.35),inset_0_0_40px_rgba(204,255,0,0.15)] animate-aura-pulse" />
          {/* Lilac Inner Orbit Ring */}
          <div className="absolute w-[280px] sm:w-[480px] md:w-[660px] lg:w-[780px] h-[280px] sm:h-[480px] md:h-[660px] lg:h-[780px] rounded-full border-[2px] border-[#CEACFE]/50 shadow-[0_0_70px_rgba(206,172,254,0.3)]" />
        </div>

        {/* Orbiting Moment Keepsake Cards mapped along the 3D Ellipse */}
        {cards.map((card: { id: string; title: string; artist: string; image: string }, idx: number) => {
          const baseAngle = (idx * 2 * Math.PI) / cards.length;
          const currentAngle = baseAngle + rotation;
          const radiusX = dimensions.radiusX;
          const radiusY = dimensions.radiusY;
          const x = Math.round(Math.cos(currentAngle) * radiusX * 100) / 100;
          const y = Math.round(Math.sin(currentAngle) * radiusY * 100) / 100;

          const depthScale = Math.round((0.75 + 0.3 * ((Math.sin(currentAngle) + 1) / 2)) * 1000) / 1000;
          const depthOpacity = Math.round((0.5 + 0.5 * ((Math.sin(currentAngle) + 1) / 2)) * 1000) / 1000;
          const zIndex = Math.round((Math.sin(currentAngle) + 1) * 30);
          const rotDeg = Math.round(Math.cos(currentAngle) * -12 * 100) / 100;

          return (
            <div
              key={card.id}
              suppressHydrationWarning
              className="absolute pointer-events-auto transition-transform duration-75 cursor-pointer group"
              style={{
                transform: `translate3d(${x}px, ${y}px, ${y}px) scale(${depthScale}) rotate(${rotDeg}deg)`,
                zIndex,
                opacity: depthOpacity,
              }}
            >
              {/* Polaroid Moment Keepsake Card */}
              <div className="relative w-24 sm:w-32 md:w-40 bg-[#F8F7F4] text-black rounded-2xl p-2 sm:p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/40 group-hover:scale-110 group-hover:border-[#CCFF00] group-hover:shadow-[0_0_30px_rgba(204,255,0,0.4)] transition-all duration-300">
                {/* Photo frame */}
                <div className="relative aspect-square rounded-xl overflow-hidden bg-zinc-200">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Caption / Note */}
                <div className="mt-2 px-1">
                  <p className="text-[10px] font-heading font-extrabold text-zinc-900 truncate">
                    {card.title}
                  </p>
                  <p className="text-[8px] text-zinc-500 font-mono truncate">
                    {card.artist}
                  </p>
                </div>

                {/* Mini Spotify Wave Barcode Strip */}
                <div className="mt-1.5 rounded-lg bg-black py-1 px-1.5 flex items-center justify-between">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#1DB954] flex items-center justify-center">
                    <span className="text-[6px] text-black font-black">●</span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <div className="w-0.5 h-1.5 bg-white rounded-full" />
                    <div className="w-0.5 h-2.5 bg-white rounded-full" />
                    <div className="w-0.5 h-1 bg-white rounded-full" />
                    <div className="w-0.5 h-3 bg-white rounded-full" />
                    <div className="w-0.5 h-2 bg-white rounded-full" />
                    <div className="w-0.5 h-2.5 bg-white rounded-full" />
                    <div className="w-0.5 h-1 bg-white rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Central Phone Mockup: Spotify Moments Generator App Experience */}
        <div
          className="relative z-20 w-[220px] sm:w-[260px] md:w-[290px] h-[450px] sm:h-[510px] md:h-[560px] rounded-[44px] p-3 bg-[#1C1C1E] border-[3px] border-[#38383A] shadow-[0_30px_90px_rgba(0,0,0,0.9),0_0_50px_rgba(204,255,0,0.15)] flex flex-col justify-between overflow-hidden"
          style={{ transform: "translateZ(30px)" }}
        >
          {/* Phone Screen Glass */}
          <div className="w-full h-full rounded-[36px] bg-[#0A0A0C] border border-[#27272A] overflow-hidden flex flex-col justify-between text-white p-3.5 relative">
            {/* Dynamic Island / Speaker cutout */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-5 rounded-full bg-black flex items-center justify-between px-2.5 z-30 shadow-md">
              <div className="w-2.5 h-2.5 rounded-full bg-[#111] border border-[#222]" />
              <div className="w-2 h-2 rounded-full bg-[#052e16] flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-[#10b981] animate-ping" />
              </div>
            </div>

            {/* Top Status Bar */}
            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 pt-1 px-1">
              <span>9:41</span>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px]">5G</span>
                <div className="w-4 h-2 rounded-sm border border-zinc-400 p-0.5 flex items-center">
                  <div className="w-2.5 h-full bg-[#CCFF00] rounded-xs" />
                </div>
              </div>
            </div>

            {/* App Header & Title */}
            <div className="pt-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <SpotifyLogo className="w-4 h-4" color="#1DB954" />
                  <span className="text-sm font-heading font-black text-white">Spotify</span>
                  <span className="text-sm font-heading font-black text-[#CCFF00]">Moments</span>
                </div>
              </div>

              {/* Progress Flow Pills (Song -> Photo -> Note -> Code) */}
              <div className="grid grid-cols-4 gap-1 text-[8px] font-bold text-center">
                <div className="py-1 rounded-md bg-[#CCFF00] text-black">1. Song</div>
                <div className="py-1 rounded-md bg-[#222226] text-zinc-300">2. Photo</div>
                <div className="py-1 rounded-md bg-[#222226] text-zinc-300">3. Note</div>
                <div className="py-1 rounded-md bg-[#222226] text-zinc-300">4. Code</div>
              </div>
            </div>

            {/* Main Card Live Preview inside Phone - Clean display of user's image */}
            <div className="my-auto py-1 flex items-center justify-center">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 max-h-[310px] flex items-center justify-center">
                <img
                  src={MEDIA_ASSETS.heroPhone.momentCardImage}
                  alt="Spotify Moment Card"
                  className="w-auto h-auto max-h-[300px] max-w-full object-contain rounded-xl"
                />
              </div>
            </div>

            {/* Bottom action trigger */}
            <div className="pt-2">
              <a
                href="#search-section"
                className="w-full py-2.5 rounded-xl bg-[#CCFF00] text-black font-heading font-black text-xs uppercase tracking-wide flex items-center justify-center gap-1.5 shadow-[0_0_20px_rgba(204,255,0,0.3)]"
              >
                <span>Search Your Song</span>
              </a>
            </div>

            {/* Home indicator bar */}
            <div className="w-24 h-1 bg-white/40 rounded-full mx-auto mt-2" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
