"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Cropper from "react-easy-crop";
import MomentCard from "@/src/components/MomentCard";
import getCroppedImg from "@/lib/cropImage";
import {
  ArrowLeft,
  ArrowRight,
  Upload,
  Calendar,
  Sparkles,
  Crop,
  Music2,
  CheckCircle2,
} from "lucide-react";

interface TrackData {
  id: string;
  name: string;
  artist: string;
  thumbnail: string | null;
  uri: string;
}

export default function EditorWorkspace({ initialTrack }: { initialTrack: TrackData }) {
  const [message, setMessage] = useState("THE SOUNDTRACK TO OUR SUMMER");
  const [rawDate, setRawDate] = useState("");
  const [displayDate, setDisplayDate] = useState("");

  const [dateError, setDateError] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [isCropping, setIsCropping] = useState(false);

  const formatDateString = (dateVal: string) => {
    if (!dateVal) return "";
    const dateObj = new Date(dateVal);
    return dateObj.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const formattedToday = `${yyyy}-${mm}-${dd}`;

    setRawDate(formattedToday);
    setDisplayDate(formatDateString(formattedToday));
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileError(null);

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setFileError("Please upload a valid image file (PNG/JPEG).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setFileError("Image size must be smaller than 5MB.");
      return;
    }

    setImageSrc(URL.createObjectURL(file));
    setIsCropping(true);
  };

  const onCropComplete = useCallback((_: any, currentCroppedAreaPixels: any) => {
    setCroppedAreaPixels(currentCroppedAreaPixels);
  }, []);

  const handleApplyCrop = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    try {
      const result = await getCroppedImg(imageSrc, croppedAreaPixels);
      setCroppedImage(result);
      setIsCropping(false);
    } catch (err) {
      console.error(err);
      setFileError("Failed to crop image. Try another file.");
    }
  };

  const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.value;
    setRawDate(selected);
    if (!selected) {
      setDateError(true);
      setDisplayDate("Select Date");
      return;
    }
    setDateError(false);
    setDisplayDate(formatDateString(selected));
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white selection:bg-[#CCFF00] selection:text-black">
      {/* Top Studio Navbar */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#050505]/80 border-b border-[#222226]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-heading font-bold text-zinc-400 hover:text-white transition group"
          >
            <div className="w-8 h-8 rounded-full bg-[#121214] border border-[#222226] flex items-center justify-center group-hover:border-[#CCFF00] transition">
              <ArrowLeft className="w-4 h-4 text-zinc-300 group-hover:text-[#CCFF00]" />
            </div>
            <span>Back to Discovery</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#CCFF00] animate-pulse" />
            <span className="font-heading font-bold text-xs uppercase tracking-wider text-zinc-400">
              Moment Studio
            </span>
          </div>
        </div>
      </header>

      {/* Main Studio Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        {/* Studio Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#121214] border border-[#222226] text-xs font-bold text-[#CCFF00] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Customization Suite
          </div>
          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight text-white uppercase">
            Personalize Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-[#CCFF00]">
              Moment
            </span>
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base">
            Turn your Spotify soundtrack into a physical-aesthetic digital keepsake.
          </p>
        </div>

        {/* Studio Workspace 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Form Controls (7 cols) */}
          <div className="lg:col-span-7 space-y-6 order-2 lg:order-1">
            {/* Selected Track Capsule */}
            <div className="rounded-3xl bg-[#121214] border border-[#222226] p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-5 shadow-xl">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shrink-0 border border-white/10 shadow-lg bg-black">
                {initialTrack.thumbnail ? (
                  <img
                    src={initialTrack.thumbnail}
                    alt={initialTrack.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-600">
                    <Music2 className="w-8 h-8" />
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1 text-center sm:text-left space-y-2 w-full">
                <span className="inline-block rounded-full bg-[#1A1A1E] border border-[#27272A] px-2.5 py-0.5 text-[10px] font-mono uppercase text-[#CEACFE]">
                  Active Track
                </span>
                <h3 className="truncate font-heading font-bold text-lg sm:text-xl text-white">
                  {initialTrack.name}
                </h3>
                <p className="truncate text-sm text-zinc-400">{initialTrack.artist}</p>

                <div className="pt-1 flex items-center justify-center sm:justify-start gap-3">
                  <Link
                    href="/"
                    className="text-xs font-heading font-bold text-[#CCFF00] hover:underline flex items-center gap-1"
                  >
                    <span>Change Song</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Customization Controls Form */}
            <div className="rounded-3xl bg-[#121214] border border-[#222226] p-6 sm:p-8 space-y-6 shadow-xl">
              <h2 className="text-xl font-heading font-black tracking-tight text-white flex items-center gap-2">
                <span>Configure Card Details</span>
              </h2>

              {/* Photo Upload & Crop */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-heading font-bold uppercase tracking-wider text-zinc-300">
                    1. Upload Photo
                  </label>
                  {croppedImage && (
                    <button
                      onClick={() => setIsCropping(true)}
                      className="text-xs font-bold text-[#CCFF00] hover:underline flex items-center gap-1"
                    >
                      <Crop className="w-3.5 h-3.5" />
                      Adjust Crop
                    </button>
                  )}
                </div>

                <label className="flex flex-col items-center justify-center w-full h-32 rounded-2xl border-2 border-dashed border-[#222226] hover:border-[#CCFF00]/50 bg-[#0A0A0C] hover:bg-[#121214] transition-all cursor-pointer p-4 group">
                  <div className="flex flex-col items-center justify-center space-y-2 text-center">
                    <div className="w-10 h-10 rounded-full bg-[#1A1A1E] group-hover:bg-[#CCFF00] group-hover:text-black text-zinc-400 flex items-center justify-center transition">
                      <Upload className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-heading font-semibold text-zinc-300">
                      {croppedImage ? "Change uploaded photo" : "Click to select or drag & drop"}
                    </p>
                    <p className="text-[10px] text-zinc-500 uppercase">PNG, JPG up to 5MB</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>

                {fileError && (
                  <p className="text-xs text-red-400 font-semibold animate-pulse">{fileError}</p>
                )}
              </div>

              {/* Caption Message */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-heading font-bold uppercase tracking-wider text-zinc-300">
                    2. Handwriting Message
                  </label>
                  <span className="text-[10px] font-mono text-zinc-500">
                    {message.length}/60 chars
                  </span>
                </div>
                <input
                  type="text"
                  maxLength={60}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="A night under the stars..."
                  className="w-full py-3.5 px-4 rounded-xl bg-[#0A0A0C] border border-[#222226] text-white placeholder-zinc-600 font-sans text-sm focus:border-[#CCFF00] focus:ring-1 focus:ring-[#CCFF00] outline-none transition"
                />
              </div>

              {/* Date Input */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-heading font-bold uppercase tracking-wider text-zinc-300">
                    3. Moment Date
                  </label>
                  {dateError && (
                    <span className="text-[10px] text-red-400 font-bold uppercase">
                      Date required *
                    </span>
                  )}
                </div>
                <div className="relative">
                  <input
                    type="date"
                    value={rawDate}
                    onChange={handleDateInputChange}
                    className={`w-full py-3.5 px-4 rounded-xl bg-[#0A0A0C] border text-white font-sans text-sm outline-none transition ${
                      dateError ? "border-red-500" : "border-[#222226] focus:border-[#CCFF00]"
                    }`}
                  />
                </div>
              </div>

              {/* Proceed Button */}
              <div className="pt-4 border-t border-[#222226]">
                <Link
                  href={
                    rawDate
                      ? `/moment?trackId=${initialTrack.id}&name=${encodeURIComponent(
                          initialTrack.name
                        )}&artist=${encodeURIComponent(
                          initialTrack.artist
                        )}&uri=${encodeURIComponent(
                          initialTrack.uri
                        )}&message=${encodeURIComponent(
                          message
                        )}&date=${encodeURIComponent(displayDate)}&img=${encodeURIComponent(
                          croppedImage || ""
                        )}`
                      : "#"
                  }
                  onClick={(e) => {
                    if (!rawDate) {
                      e.preventDefault();
                      setDateError(true);
                    }
                  }}
                  className={`w-full py-4 px-6 rounded-full font-heading font-black text-base uppercase tracking-wide flex items-center justify-center gap-2 transition-all duration-300 shadow-xl cursor-pointer ${
                    rawDate
                      ? "bg-[#CCFF00] text-black hover:bg-[#B8F53E] hover:scale-[1.02] active:scale-[0.98] shadow-[0_10px_25px_rgba(204,255,0,0.25)]"
                      : "bg-[#1A1A1E] text-zinc-600 cursor-not-allowed"
                  }`}
                >
                  <span>Preview & Export Moment</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Polaroid Live Preview (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center lg:sticky lg:top-28 order-1 lg:order-2">
            <div className="w-full max-w-md rounded-[36px] bg-[#121214] border border-[#222226] p-6 sm:p-8 flex flex-col items-center shadow-2xl relative">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A1A1E] border border-[#27272A] text-[10px] font-mono uppercase text-[#CEACFE] mb-6">
                <CheckCircle2 className="w-3 h-3 text-[#CCFF00]" />
                Live Card Preview
              </div>

              <div className="w-full flex justify-center">
                <MomentCard
                  imageUrl={croppedImage}
                  message={message}
                  momentDate={displayDate}
                  trackName={initialTrack.name}
                  artistName={initialTrack.artist}
                  trackUri={initialTrack.uri}
                />
              </div>

              <p className="mt-4 text-xs font-medium text-zinc-500 text-center">
                All fonts, handwriting text, and Spotify scancode are rendered dynamically.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Image Crop Modal */}
      {isCropping && imageSrc && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4">
          <div className="bg-[#121214] border border-[#222226] rounded-3xl p-6 w-full max-w-lg space-y-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-heading font-bold text-white uppercase tracking-wider">
                Position & Frame Photo
              </h3>
              <span className="text-xs text-zinc-400">1:1 Square</span>
            </div>

            <div className="relative w-full aspect-square bg-black rounded-2xl overflow-hidden border border-[#222226]">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block">
                Zoom Level
              </label>
              <input
                type="range"
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-full h-1.5 bg-[#1A1A1E] rounded-lg appearance-none cursor-pointer accent-[#CCFF00]"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setIsCropping(false)}
                className="px-5 py-2.5 rounded-full text-xs font-heading font-bold text-zinc-400 hover:text-white transition"
              >
                Cancel
              </button>
              <button
                onClick={handleApplyCrop}
                className="px-6 py-2.5 rounded-full text-xs font-heading font-black uppercase bg-[#CCFF00] text-black hover:bg-[#B8F53E] transition shadow-[0_0_20px_rgba(204,255,0,0.3)]"
              >
                Apply Crop
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}