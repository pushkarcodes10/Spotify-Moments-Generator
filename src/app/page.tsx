"use client"

import React, {useEffect} from "react";
import { motion } from "motion/react";
import { LampContainer } from "@/src/components/ui/lamp";
import SongSearch from "../components/SongSearch";

export default function Home() {

  useEffect(() => {
  window.scrollTo({
    top: 0,
    behavior: "instant", 
  });
}, []);

  return (
    <main className="relative min-h-screen overflow-hidden flex justify-center flex-col items-center">
      <LampContainer>
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-8 bg-linear-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl italic"
        >
          Spotify Moments Generator <br />
          <p className="text-3xl mt-8">
            Choose a song to generate your spotify moment
          </p>
        </motion.h1>
      </LampContainer>

      {/* <div className=" absolute text-4xl italic from-slate-300 to-slate-500 text-white flex items-end mb-75">
        <h4>Scroll</h4>
      </div> */}

      <SongSearch />
    </main>
  );
}