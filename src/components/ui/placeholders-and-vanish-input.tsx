"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function PlaceholdersAndVanishInput({
  placeholders,
  onChange,
  onSubmit,
}: {
  placeholders: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const [value, setValue] = useState("");
  const [animating, setAnimating] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const newDataRef = useRef<any[]>([]);

  const startAnimation = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
    }, 3000);
  }, [placeholders.length]);

  useEffect(() => {
    startAnimation();

    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        startAnimation();
      } else {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [startAnimation]);

  const draw = useCallback(() => {
    if (!inputRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 800;

    ctx.clearRect(0, 0, 800, 800);

    const styles = getComputedStyle(inputRef.current);
    const fontSize = parseFloat(styles.fontSize);

    ctx.font = `${fontSize * 2}px ${styles.fontFamily}`;
    ctx.fillStyle = "#ffffff";
    ctx.fillText(value, 16, 40);

    const imageData = ctx.getImageData(0, 0, 800, 800);
    const pixels = imageData.data;

    const data: any[] = [];

    for (let y = 0; y < 800; y++) {
      const row = y * 800 * 4;

      for (let x = 0; x < 800; x++) {
        const index = row + x * 4;

        if (
          pixels[index] ||
          pixels[index + 1] ||
          pixels[index + 2]
        ) {
          data.push({
            x,
            y,
            r: 1,
            color: `rgba(${pixels[index]},${pixels[index + 1]},${pixels[index + 2]},${pixels[index + 3]})`,
          });
        }
      }
    }

    newDataRef.current = data;
  }, [value]);

  useEffect(() => {
    draw();
  }, [draw]);

  const animate = (start: number) => {
    const frame = (pos: number) => {
      requestAnimationFrame(() => {
        const next = [];

        for (const particle of newDataRef.current) {
          if (particle.x < pos) {
            next.push(particle);
            continue;
          }

          if (particle.r <= 0) continue;

          particle.x += Math.random() > 0.5 ? 1 : -1;
          particle.y += Math.random() > 0.5 ? 1 : -1;
          particle.r -= Math.random() * 0.05;

          next.push(particle);
        }

        newDataRef.current = next;

        const ctx = canvasRef.current?.getContext("2d");

        if (ctx) {
          ctx.clearRect(0, 0, 800, 800);

          next.forEach((particle) => {
            if (particle.x > pos) {
              ctx.beginPath();
              ctx.rect(particle.x, particle.y, particle.r, particle.r);
              ctx.fillStyle = particle.color;
              ctx.fill();
            }
          });
        }

        if (next.length) {
          frame(pos - 8);
        } else {
          setValue("");
          setAnimating(false);
        }
      });
    };

    frame(start);
  };

  const vanishAndSubmit = () => {
    if (!value) return;

    setAnimating(true);
    draw();

    const maxX = newDataRef.current.reduce(
      (max, item) => Math.max(max, item.x),
      0
    );

    animate(maxX);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    vanishAndSubmit();
    onSubmit(e);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative mx-auto h-12 w-full max-w-xl overflow-hidden rounded-full bg-[#121212] border border-[#2a2a2a] shadow-lg"
    >
      <canvas
        ref={canvasRef}
        className={cn(
          "pointer-events-none absolute left-2 top-[20%] origin-top-left scale-50 pr-20",
          animating ? "opacity-100" : "opacity-0",
        )}
      />

      <input
        ref={inputRef}
        value={value}
        type="text"
        onChange={(e) => {
          if (animating) return;
          setValue(e.target.value);
          onChange(e);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !animating) {
            vanishAndSubmit();
          }
        }}
        className={cn(
          "relative z-20 h-full w-full bg-transparent pl-5 pr-20 text-sm text-white placeholder:text-neutral-500 focus:outline-none sm:text-base",
          animating && "text-transparent",
        )}
      />

      <button
        type="submit"
        disabled={!value}
        className="absolute right-2 top-1/2 z-30 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black transition hover:rotate-90 disabled:opacity-40"
      >
        <motion.svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          animate={{ rotate: value ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.path
            d="M6 6L18 18"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <motion.path
            d="M18 6L6 18"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </motion.svg>
      </button>

      <div className="pointer-events-none absolute inset-0 flex items-center">
        <AnimatePresence mode="wait">
          {!value && (
            <motion.p
              key={currentPlaceholder}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 0.5, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="w-[calc(100%-5rem)] truncate pl-5 text-sm text-neutral-500 sm:text-base"
            >
              {placeholders[currentPlaceholder]}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}