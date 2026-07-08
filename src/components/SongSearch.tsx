"use client";

import { useState, useEffect, useRef } from "react";
import SplitText from "@/src/components/ui/SplitText";
import { PlaceholdersAndVanishInput } from "@/src/components/ui/placeholders-and-vanish-input";

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
  const placeholders = [
    "Search for a song...",
    "Tum Se Hi",
    "Anirudh Ravichander",
    "I think they call this love",
    "Arijit Singh",
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

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
    <main className="min-h-screen w-full overflow-x-hidden bg-slate-950 px-4 sm:px-6 lg:px-8">

      {/* Heading */}
      <div className="flex justify-center">
        <SplitText
          text="Search for Your Favourite Song"
          className="
            mt-5
            p-4
            text-center
            text-3xl
            sm:text-4xl
            md:text-6xl
            font-extrabold
            italic
            tracking-tight
            text-white
          "
          delay={50}
          duration={1.25}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
        />
      </div>


      {/* Search */}
      <div
        ref={dropdownRef}
        className="
          relative
          mt-8
          flex
          w-full
          justify-center
        "
      >
        <div className="w-full max-w-md">
          <PlaceholdersAndVanishInput
            placeholders={placeholders}
            onChange={handleChange}
            onSubmit={onSubmit}
          />


          {/* Dropdown */}
          {showDropdown && results.length > 0 && (
            <div
              className="
                absolute
                left-0
                right-0
                top-20
                z-50
                overflow-hidden
                rounded-lg
                bg-slate-900
                shadow-xl
              "
            >
              {results.map((track) => (
                <button
                  key={track.id}
                  onClick={() => handleSelectedTrack(track)}
                  className="
                    flex
                    w-full
                    items-center
                    gap-3
                    p-3
                    text-left
                    transition
                    hover:bg-[#004118]
                  "
                >
                  <img
                    src={track.thumbnail}
                    alt={track.album}
                    className="
                      h-10
                      w-10
                      sm:h-12
                      sm:w-12
                      shrink-0
                      rounded-md
                      object-cover
                    "
                  />

                  <div className="min-w-0">
                    <p className="truncate text-sm sm:text-base font-semibold text-white">
                      {track.name}
                    </p>

                    <p className="truncate text-xs sm:text-sm text-slate-400">
                      {track.artist}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>


      {/* Selected Song */}
      {selectedTrack && (
        <div
          className="
            mx-auto
            mt-10
            flex
            w-full
            max-w-md
            flex-col
            gap-4
            rounded-xl
            bg-slate-900
            p-4
            sm:flex-row
            sm:items-center
          "
        >
          <img
            src={selectedTrack.thumbnail}
            alt={selectedTrack.name}
            className="
              h-20
              w-20
              mx-auto
              rounded-lg
              object-cover
              sm:mx-0
            "
          />


          <div className="min-w-0 flex-1 text-center sm:text-left">
            <span
              className="
                inline-block
                rounded-full
                bg-green-500/10
                px-2
                py-0.5
                text-[10px]
                font-bold
                uppercase
                text-green-400
              "
            >
              Selected Song
            </span>


            <h3 className="mt-1 truncate font-semibold text-white">
              {selectedTrack.name}
            </h3>

            <p className="truncate text-sm text-zinc-400">
              {selectedTrack.artist}
            </p>
          </div>


          <button
            onClick={() => setSelectedTrack(null)}
            className="
              mx-auto
              rounded-full
              bg-zinc-800
              p-2
              text-zinc-400
              transition
              hover:bg-zinc-700
              hover:text-white
              sm:mx-0
            "
            title="Remove"
          >
            ✕
          </button>

        </div>
      )}

    </main>
  );
}