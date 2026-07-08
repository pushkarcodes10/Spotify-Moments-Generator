"use client";

import { useState, useEffect, useRef } from "react";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setLoading(true);

      try {
        const response = await fetch(
          `/api/users/spotify-search?q=${encodeURIComponent(searchTerm)}`,
        );

        const data = await response.json();

        if (data.success) {
          setResults(data.tracks);
          setShowDropdown(true);
        } else {
          setResults([]);
        }
      } catch (error) {
        console.error("Frontend search fetch failed:", error);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    useEffect(() => {
        function HandleClickOutside(event: MouseEvent) {
            if(dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false)
            }
        }
        document.addEventListener("mousedown", HandleClickOutside)
        return () => document.removeEventListener("mousedown", HandleClickOutside)
    }, [])

    const handleSelectedTrack = (track: Track) => {
        setSelectedTrack(track);
        setSearchTerm("")
        setResults([])
        setShowDropdown(false)
    }

    return(
        <div>
            
        </div>
    )

}
