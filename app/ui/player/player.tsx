"use client";

import usePlayer from "@/hooks/usePlayer";
import PlayerContent from "./player-content";
import { useEffect, useState } from "react";
import { getSongById } from "@/app/lib/data";
import { Song } from "@/app/lib/definitions";

const Player = () => {
  const player = usePlayer();
  const [song, setSong] = useState<Song | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSong = async () => {
      setLoading(true);

      try {
        const response = await getSongById(player.activeId!);
        setSong(response);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    }

    fetchSong();
  }, [player.activeId]);

  if (!song || !player.activeId || loading) {
    return null;
  }

  return (
    <footer
      className="
        fixed
        bottom-0
        bg-black
        w-full
        py-2
        h-[80px]
        px-4
      "
    >
      <PlayerContent
        key={player.activeId}
        song={song}
      />
    </footer>
  );
}
 
export default Player;