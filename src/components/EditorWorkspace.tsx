"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Cropper from "react-easy-crop";
import BlurText from "@/src/components/ui/BlurText";
import MomentCard from "@/src/components/MomentCard";
import getCroppedImg from "@/lib/cropImage";

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
      year: "numeric"
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
    <div className="bg-slate-950 min-h-screen flex flex-col items-center px-4 pt-8 pb-16 sm:pt-10 relative">
      <BlurText
        text="Personalize Your Moment"
        delay={200}
        animateBy="words"
        direction="top"
        className="text-[#E2E2E2] text-2xl sm:text-3xl md:text-4xl italic text-center"
      />
      <BlurText
        text="Design a memory that lasts forever."
        delay={200}
        animateBy="words"
        direction="top"
        className="text-[#BCCBB9] mt-2 text-base sm:text-lg text-center"
      />

      <div className="w-full max-w-6xl mx-auto mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center lg:items-start">
        
        <div className="lg:col-span-2 space-y-6 w-full order-2 lg:order-1">
          <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-3xl flex flex-col sm:flex-row items-center gap-5">
            {initialTrack.thumbnail ? (
              <img
                src={initialTrack.thumbnail}
                alt={initialTrack.name}
                className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-2xl shadow-2xl border border-zinc-800 shrink-0"
              />
            ) : (
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-600 shrink-0">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9 18V5l12-2v13" />
                  <circle cx="6" cy="18" r="3" />
                  <circle cx="18" cy="16" r="3" />
                </svg>
              </div>
            )}
            
            <div className="w-full min-w-0 text-center sm:text-left space-y-3">
              <div>
                <h2 className="text-lg font-bold text-white truncate">{initialTrack.name}</h2>
                <p className="text-zinc-400 text-sm truncate">{initialTrack.artist}</p>
              </div>
              <div className="bg-zinc-950 p-2 rounded-xl text-left font-mono text-[11px] text-zinc-400 truncate">
                <span className="text-zinc-600 block uppercase font-bold tracking-wider text-[9px]">Spotify URI</span>
                {initialTrack.uri}
              </div>
              <Link
                href="/"
                className="bg-[#53E076] text-[#003914] py-1 px-3 rounded-full text-xs font-bold tracking-wide uppercase inline-block hover:bg-[#42c564] transition"
              >
                ← Change Song
              </Link>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl flex flex-col gap-5">
            <h3 className="text-xl font-semibold text-green-400 italic">
              Customize Your Moment 😉
            </h3>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">Select & Position Image</label>
                {fileError && <span className="text-[10px] text-red-400 font-bold uppercase animate-pulse">{fileError}</span>}
              </div>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange}
                className="w-full text-sm text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:uppercase file:bg-zinc-800 file:text-white hover:file:bg-zinc-700 transition cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">Green Pill Custom Text</label>
              <input
                maxLength={60}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-white p-3 rounded-xl text-zinc-900 font-bold placeholder:text-zinc-400 text-base focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="Your Message..."
                type="text"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">Moment Timeline Date</label>
                {dateError && <span className="text-[10px] text-red-400 font-bold tracking-wide animate-pulse uppercase">Date Required *</span>}
              </div>
              <input
                value={rawDate}
                onChange={handleDateInputChange}
                required
                className={`w-full p-3 rounded-xl font-medium text-base outline-none transition bg-white text-zinc-900 focus:ring-2 ${
                  dateError ? "ring-2 ring-red-500 focus:ring-red-500" : "focus:ring-green-500"
                }`}
                type="date"
              />
            </div>

            <div className="w-full flex justify-center mt-2">
              <Link
                href={
                  rawDate
                    ? `/moment?trackId=${initialTrack.id}&name=${encodeURIComponent(initialTrack.name)}&artist=${encodeURIComponent(initialTrack.artist)}&uri=${encodeURIComponent(initialTrack.uri)}&message=${encodeURIComponent(message)}&date=${encodeURIComponent(displayDate)}&img=${encodeURIComponent(croppedImage || "")}`
                    : "#"
                }
                onClick={(e) => {
                  if (!rawDate) {
                    e.preventDefault();
                    setDateError(true);
                  }
                }}
                className={`py-3 px-6 rounded-full text-base font-black tracking-wide uppercase text-center transition shadow-lg w-full ${
                  rawDate 
                    ? "bg-[#53E076] text-[#003914] hover:scale-[1.02] shadow-green-500/10 cursor-pointer" 
                    : "bg-zinc-700 text-zinc-500 cursor-not-allowed opacity-50"
                }`}
              >
                Final Card... →
              </Link>
            </div>
          </div>
        </div>

        <div className="w-full flex items-center justify-center lg:sticky lg:top-10 bg-zinc-900/20 p-4 sm:p-6 border border-dashed border-zinc-800 rounded-[36px] order-1 lg:order-2">
          <MomentCard 
            imageUrl={croppedImage} 
            message={message} 
            momentDate={displayDate}
            trackName={initialTrack.name}
            artistName={initialTrack.artist}
            trackUri={initialTrack.uri}
          />
        </div>
      </div>

      {isCropping && imageSrc && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 w-full max-w-lg space-y-4 shadow-2xl">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Reposition Frame Image</h3>
            
            <div className="relative w-full aspect-4/3 bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-800">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={3 / 2.8}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block">Zoom Slider</label>
              <input
                type="range"
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-green-500"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setIsCropping(false)}
                className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white transition"
              >
                Cancel
              </button>
              <button
                onClick={handleApplyCrop}
                className="px-5 py-2.5 text-xs font-bold uppercase bg-green-500 text-black hover:bg-green-400 rounded-xl transition"
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