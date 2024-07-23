"use client";

import { useState, useEffect } from "react";
import { getSongs } from "@/app/lib/data";
import SearchContent from "@/app/ui/search/search-content";
import { SearchPageSkeleton } from "../../ui/skeletons";
import { Song } from "@/app/lib/definitions";

interface SearchLoaderProps {
  title: string;
}

const SearchLoader = ({ title }: SearchLoaderProps) => {
  const [songs, setSongs] = useState<Song | null>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await getSongs(title);
        setSongs(response.length > 0 ? response[0] : null);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, [title]);

  if (loading) {
    return <SearchPageSkeleton />;
  }

  return <SearchContent songs={songs} />;
};

export default SearchLoader;
