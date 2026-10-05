"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, Loader2, X, Music, ArrowRight, Sparkles } from "lucide-react";

interface Track {
  id: string;
  name: string;
  artist: string;
  album: string;
  thumbnail: string;
  previewUrl: string | null;
  uri: string;
}

export default function SongSearch() {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const proceedToEditor = () => {
    if (!selectedTrack) return;

    const params = new URLSearchParams({
      trackId: selectedTrack.id,
      name: selectedTrack.name,
      artist: selectedTrack.artist,
      thumbnail: selectedTrack.thumbnail,
      uri: selectedTrack.uri,
    });

    router.push(`/editor?${params.toString()}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);

      try {
        const res = await fetch(
          `/api/users/spotify-search?q=${encodeURIComponent(searchTerm)}`
        );

        const data = await res.json();

        if (data.success) {
          setResults(data.tracks);
          setShowDropdown(true);
        } else {
          setResults([]);
        }
      } catch (error) {
        console.error("Search failed:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectedTrack = (track: Track) => {
    setSelectedTrack(track);
    setSearchTerm("");
    setResults([]);
    setShowDropdown(false);
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
      {/* Eyebrow badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#121214] border border-[#222226] text-xs font-bold text-[#CCFF00] tracking-wider uppercase mb-4 shadow-sm">
        <Sparkles className="w-3.5 h-3.5" />
        Choose Your Soundtrack
      </div>

      {/* Heading */}
      <h2 className="text-2xl sm:text-4xl md:text-5xl font-heading font-extrabold tracking-tight text-white text-center leading-tight mb-8">
        Search for Your <br className="hidden sm:inline" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-[#CCFF00]">
          Favourite Song
        </span>
      </h2>

      {/* Search Bar Input Container */}
      <div ref={dropdownRef} className="relative w-full max-w-xl">
        <form onSubmit={onSubmit} className="relative w-full">
          <div className="relative flex items-center w-full rounded-full bg-[#121214] border-2 border-[#222226] transition-all duration-300 focus-within:border-[#CCFF00] focus-within:shadow-[0_0_25px_rgba(204,255,0,0.2)]">
            <div className="pl-5 text-zinc-400">
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin text-[#CCFF00]" />
              ) : (
                <Search className="w-5 h-5 text-zinc-400" />
              )}
            </div>

            <input
              type="text"
              value={searchTerm}
              onChange={handleChange}
              placeholder="Search by song title, artist, or album..."
              className="w-full py-4 pl-3 pr-5 bg-transparent text-white placeholder-zinc-500 font-sans text-sm sm:text-base outline-none rounded-full"
            />

            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="pr-4 text-zinc-500 hover:text-white transition"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </form>

        {/* Search Results Dropdown */}
        {showDropdown && results.length > 0 && (
          <div className="absolute left-0 right-0 top-full mt-3 z-50 overflow-hidden rounded-3xl bg-[#121214] border border-[#222226] shadow-[0_20px_50px_rgba(0,0,0,0.9)] max-h-96 overflow-y-auto no-scrollbar backdrop-blur-xl">
            <div className="p-2 divide-y divide-[#222226]/60">
              {results.map((track) => (
                <button
                  key={track.id}
                  onClick={() => handleSelectedTrack(track)}
                  className="flex w-full items-center gap-4 p-3.5 text-left rounded-2xl transition-all duration-200 hover:bg-[#1A1A1E] group cursor-pointer"
                >
                  <div className="relative h-12 w-12 sm:h-14 sm:w-14 shrink-0 rounded-xl overflow-hidden bg-black border border-white/10 shadow-md">
                    {track.thumbnail ? (
                      <img
                        src={track.thumbnail}
                        alt={track.album}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-600">
                        <Music className="w-6 h-6" />
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm sm:text-base font-heading font-bold text-white group-hover:text-[#CCFF00] transition">
                      {track.name}
                    </p>
                    <p className="truncate text-xs sm:text-sm text-zinc-400 mt-0.5">
                      {track.artist}
                    </p>
                  </div>

                  <div className="opacity-0 group-hover:opacity-100 transition-opacity pr-2 text-[#CCFF00]">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Selected Track Preview & Confirmation */}
      {selectedTrack && (
        <div className="w-full max-w-xl mt-8 rounded-3xl bg-[#121214] border border-[#CCFF00]/40 p-5 sm:p-6 shadow-[0_15px_40px_rgba(204,255,0,0.15)] flex flex-col gap-5 animate-in fade-in zoom-in-95 duration-300">
          <div className="flex items-center gap-4">
            <div className="relative h-20 w-20 shrink-0 rounded-2xl overflow-hidden border border-white/10 shadow-md">
              <img
                src={selectedTrack.thumbnail}
                alt={selectedTrack.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="min-w-0 flex-1">
              <span className="inline-block rounded-full bg-[#CCFF00] px-2.5 py-0.5 text-[10px] font-heading font-black tracking-wider uppercase text-black mb-1">
                Selected Track
              </span>
              <h4 className="truncate font-heading font-bold text-lg sm:text-xl text-white">
                {selectedTrack.name}
              </h4>
              <p className="truncate text-sm text-zinc-400 font-medium">
                {selectedTrack.artist}
              </p>
            </div>

            <button
              onClick={() => setSelectedTrack(null)}
              className="p-2 rounded-full bg-[#1A1A1E] text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
              title="Change Track"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="pt-2 border-t border-[#222226]">
            <button
              onClick={proceedToEditor}
              className="w-full py-4 px-6 rounded-full bg-[#CCFF00] text-black font-heading font-black text-base tracking-wide flex items-center justify-center gap-2 hover:bg-[#B8F53E] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_10px_25px_rgba(204,255,0,0.3)] cursor-pointer uppercase"
            >
              <span>Confirm & Customize Moment</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}