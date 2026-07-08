import type { Metadata } from "next";
import {
  Manrope,
  Space_Grotesk,
  Irish_Grover,
  Permanent_Marker,
  Zeyada,
} from "next/font/google";
import "./globals.css";

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
  title: "Spotify Moments",
  description: "Your music memories",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`
          ${manrope.variable}
          ${spaceGrotesk.variable}
          ${irishGrover.variable}
          ${permanentMarker.variable}
          ${zeyada.variable}
        `}
      >
        {children}
      </body>
    </html>
  );
}