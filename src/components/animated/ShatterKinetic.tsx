"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export default function ShatterKinetic() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax horizontal shifts for each block
  const x1 = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const x2 = useTransform(scrollYProgress, [0, 1], [90, -90]);
  const x3 = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const x4 = useTransform(scrollYProgress, [0, 1], [80, -80]);

  // Color panel wipe transforms
  const panelLimeX = useTransform(scrollYProgress, [0.1, 0.6], ["-100%", "0%"]);
  const panelLilacX = useTransform(scrollYProgress, [0.3, 0.8], ["100%", "0%"]);

  return (
    <section
      ref={containerRef}
      className="relative py-28 px-4 bg-black overflow-hidden flex flex-col items-center justify-center min-h-[550px] select-none"
    >
      {/* Background kinetic color accent slabs */}
      <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
        <motion.div
          style={{ x: panelLimeX }}
          className="absolute -top-20 left-0 w-3/4 h-56 bg-[#CCFF00] -skew-y-3 blur-3xl"
        />
        <motion.div
          style={{ x: panelLilacX }}
          className="absolute -bottom-20 right-0 w-3/4 h-56 bg-[#CEACFE] skew-y-3 blur-3xl"
        />
      </div>

      <div className="w-full max-w-5xl space-y-3 relative z-10">
        {/* Row 1: "Shattering" */}
        <motion.div
          style={{ x: x1 }}
          className="flex justify-center md:justify-start"
        >
          <div className="bg-[#121214] py-3 sm:py-4 px-8 sm:px-12 rounded-3xl border border-[#27272A] shadow-2xl transform -rotate-1 inline-block">
            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-black text-white tracking-tight uppercase leading-none">
              Shattering
            </h2>
          </div>
        </motion.div>

        {/* Row 2: "Traditional" (Masked with concert crowd photo) */}
        <motion.div
          style={{ x: x2 }}
          className="flex justify-center md:justify-center"
        >
          <div className="bg-[#18181B] py-3 sm:py-4 px-8 sm:px-12 rounded-3xl border border-white/10 shadow-2xl transform rotate-1 inline-block">
            <h2
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-black tracking-tight uppercase leading-none text-transparent bg-clip-text"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&auto=format&fit=crop&q=80')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              Traditional
            </h2>
          </div>
        </motion.div>

        {/* Row 3: "Discovery" (Masked with electric stage imagery) */}
        <motion.div
          style={{ x: x3 }}
          className="flex justify-center md:justify-end"
        >
          <div className="bg-[#121214] py-3 sm:py-4 px-8 sm:px-12 rounded-3xl border border-[#27272A] shadow-2xl transform -rotate-2 inline-block">
            <h2
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-black tracking-tight uppercase leading-none text-transparent bg-clip-text"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&auto=format&fit=crop&q=80')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              Discovery
            </h2>
          </div>
        </motion.div>

        {/* Row 4: "Limitations" */}
        <motion.div
          style={{ x: x4 }}
          className="flex justify-center md:justify-center"
        >
          <div className="bg-gradient-to-r from-[#CCFF00] via-[#B8F53E] to-[#CCFF00] py-3 sm:py-4 px-8 sm:px-12 rounded-3xl shadow-[0_10px_40px_rgba(204,255,0,0.35)] transform rotate-1 inline-block">
            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-black text-black tracking-tight uppercase leading-none">
              Limitations
            </h2>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
