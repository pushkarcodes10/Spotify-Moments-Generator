import type { Metadata } from "next";
import {
  Syne,
  Plus_Jakarta_Sans,
  Manrope,
  Space_Grotesk,
  Irish_Grover,
  Permanent_Marker,
  Zeyada,
} from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["500", "600", "700", "800"],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700", "800"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  weight: ["300", "400", "500", "600", "700"],
});

const irishGrover = Irish_Grover({
  subsets: ["latin"],
  variable: "--font-irish",
  weight: "400",
});

const permanentMarker = Permanent_Marker({
  subsets: ["latin"],
  variable: "--font-marker",
  weight: "400",
});

const zeyada = Zeyada({
  subsets: ["latin"],
  variable: "--font-zeyada",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Spotify Moments Generator | Turn Songs Into Keepsakes",
  description:
    "Turn a song + a memory into a physical or digital keepsake in under 2 minutes. Search Spotify, add your photo, personal message, and date with an official Spotify scan code. No login required.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`
          ${syne.variable}
          ${plusJakarta.variable}
          ${manrope.variable}
          ${spaceGrotesk.variable}
          ${irishGrover.variable}
          ${permanentMarker.variable}
          ${zeyada.variable}
          bg-[#050505] text-white antialiased min-h-screen selection:bg-[#CCFF00] selection:text-black
        `}
      >
        {children}
      </body>
    </html>
  );
}