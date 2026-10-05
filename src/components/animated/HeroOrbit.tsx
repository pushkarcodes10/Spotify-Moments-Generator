"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Sparkles, QrCode, Music, Calendar, Camera } from "lucide-react";
import { MEDIA_ASSETS } from "@/data/mediaAssets";

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

  const cards = MEDIA_ASSETS.heroOrbit;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-6xl mx-auto flex flex-col items-center justify-center pt-6 pb-14 px-4 select-none perspective-1200"
    >
      {/* Background ambient lighting aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[820px] h-[340px] sm:h-[420px] bg-gradient-to-r from-[#CCFF00]/15 via-[#CEACFE]/25 to-transparent blur-[140px] rounded-full pointer-events-none -z-10" />

      {/* Main 3D Stage container */}
      <motion.div
        style={{
          rotateX: tiltX,
          rotateY: tiltY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full max-w-4xl h-[460px] sm:h-[540px] md:h-[620px] flex items-center justify-center"
      >
        {/* Glowing 3D Elliptical Orbit Rings */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ transform: "rotateX(72deg) rotateZ(-12deg)", transformStyle: "preserve-3d" }}
        >
          {/* Lime Green Outer Orbit Ring */}
          <div className="w-[620px] sm:w-[780px] md:w-[940px] h-[620px] sm:h-[780px] md:h-[940px] rounded-full border-[2.5px] border-[#CCFF00]/60 shadow-[0_0_80px_rgba(204,255,0,0.4),inset_0_0_50px_rgba(204,255,0,0.2)] animate-aura-pulse" />
          {/* Lilac Inner Orbit Ring */}
          <div className="absolute w-[560px] sm:w-[700px] md:w-[840px] h-[560px] sm:h-[700px] md:h-[840px] rounded-full border-[2px] border-[#CEACFE]/50 shadow-[0_0_90px_rgba(206,172,254,0.35)]" />
        </div>

        {/* Orbiting Moment Keepsake Cards mapped along the 3D Ellipse */}
        {cards.map((card, idx) => {
          const baseAngle = (idx * 2 * Math.PI) / cards.length;
          const currentAngle = baseAngle + rotation;
          const radiusX = 360; // horizontal radius in px
          const radiusY = 130; // vertical radius in px
          const x = Math.cos(currentAngle) * radiusX;
          const y = Math.sin(currentAngle) * radiusY;

          const depthScale = 0.8 + 0.3 * ((Math.sin(currentAngle) + 1) / 2);
          const depthOpacity = 0.5 + 0.5 * ((Math.sin(currentAngle) + 1) / 2);
          const zIndex = Math.round((Math.sin(currentAngle) + 1) * 30);

          return (
            <div
              key={card.id}
              className="absolute pointer-events-auto transition-transform duration-75 cursor-pointer group"
              style={{
                transform: `translate3d(${x}px, ${y}px, ${y}px) scale(${depthScale}) rotate(${Math.cos(currentAngle) * -12}deg)`,
                zIndex,
                opacity: depthOpacity,
              }}
            >
              {/* Polaroid Moment Keepsake Card */}
              <div className="relative w-28 sm:w-36 md:w-44 bg-[#F8F7F4] text-black rounded-2xl p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/40 group-hover:scale-110 group-hover:border-[#CCFF00] group-hover:shadow-[0_0_30px_rgba(204,255,0,0.4)] transition-all duration-300">
                {/* Photo frame */}
                <div className="relative aspect-square rounded-xl overflow-hidden bg-zinc-200">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[8px] font-mono font-bold text-[#CCFF00]">
                    SCANNABLE
                  </div>
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
          className="relative z-20 w-[240px] sm:w-[270px] md:w-[310px] h-[490px] sm:h-[540px] md:h-[580px] rounded-[44px] p-3 bg-[#1C1C1E] border-[3px] border-[#38383A] shadow-[0_30px_90px_rgba(0,0,0,0.9),0_0_50px_rgba(204,255,0,0.15)] flex flex-col justify-between overflow-hidden"
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
                  <span className="text-sm font-heading font-black text-white">Spotify</span>
                  <span className="text-sm font-heading font-black text-[#CCFF00]">Moments</span>
                </div>
                <div className="px-2 py-0.5 rounded-full bg-[#CCFF00]/10 border border-[#CCFF00]/30 text-[9px] font-mono font-bold text-[#CCFF00]">
                  3x PRINT
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

            {/* Main Polaroid Card Live Preview inside Phone */}
            <div className="my-auto py-1">
              <div className="bg-[#F8F7F4] text-black rounded-2xl p-3 shadow-xl border border-white/20 flex flex-col gap-2">
                {/* Photo window */}
                <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-zinc-200">
                  <img
                    src={MEDIA_ASSETS.heroPhone.momentCardImage}
                    alt="Moment Photo"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[8px] font-mono text-white flex items-center gap-1">
                    <Camera className="w-2.5 h-2.5 text-[#CCFF00]" />
                    <span>Framed Photo</span>
                  </div>
                </div>

                {/* Personal Note */}
                <div className="rounded-lg bg-white px-2.5 py-1.5 border border-zinc-100 text-center">
                  <p className="font-hand text-[#3F6B3D] text-[11px] leading-tight font-semibold">
                    That cold evening on the terrace when this played on repeat ✨🎶
                  </p>
                </div>

                {/* Date & Track Details */}
                <div className="flex items-center justify-between text-[9px] font-mono px-1 text-zinc-600">
                  <span className="flex items-center gap-1 font-bold">
                    <Calendar className="w-2.5 h-2.5 text-[#888]" />
                    25th April 2024
                  </span>
                  <span className="font-heading font-bold text-zinc-900 truncate max-w-[100px]">
                    Tum Se Hi • Pritam
                  </span>
                </div>

                {/* Authentic Spotify Scannable Code Bar */}
                <div className="rounded-xl bg-black py-1.5 px-3 flex items-center justify-between">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#1DB954] flex items-center justify-center">
                    <span className="text-[7px] text-black font-black">●</span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <div className="w-0.5 h-2 bg-white rounded-full animate-pulse" />
                    <div className="w-0.5 h-3.5 bg-white rounded-full" />
                    <div className="w-0.5 h-1.5 bg-white rounded-full" />
                    <div className="w-0.5 h-4 bg-white rounded-full" />
                    <div className="w-0.5 h-2.5 bg-white rounded-full" />
                    <div className="w-0.5 h-3 bg-white rounded-full" />
                    <div className="w-0.5 h-1.5 bg-white rounded-full" />
                    <div className="w-0.5 h-4 bg-white rounded-full" />
                    <div className="w-0.5 h-2 bg-white rounded-full" />
                  </div>
                </div>
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
