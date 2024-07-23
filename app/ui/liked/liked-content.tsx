"use client";

import { getLikedSongsByUserId } from "@/app/lib/data";
import { Song } from "@/app/lib/definitions";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MediaItem from "../library/media-item";
import LikeButton from "../search/like-button";
import useOnPlay from "@/hooks/useOnPlay";

const LikedContent = () => {
  const { user } = useUser();
  const [songs, setSongs] = useState<Song[]>([]);

  const router = useRouter();

  useEffect(() => {
    const fetchSongs = async () => {
      if (user) {
        try {
          const response = await getLikedSongsByUserId(user._id);
          setSongs(Array.isArray(response) ? response : [response]);
        } catch (err) {
          console.error(err);
        }
      } else {
        router.replace("/");
      }
    }

    fetchSongs();
  }, [user, router]);

  const onPlay = useOnPlay(songs);

  if (songs.length === 0) {
    return (
      <div className="
        flex flex-col
        gap-y-2
        w-full
        px-6
        text-neutral-400
      ">
        No liked songs.
      </div>
    )
  }

  return (
    <ul className="flex flex-col gap-y-2 w-full p-6">
      {songs.map((song) => (
        <li 
          key={song._id}
          className="
            flex
            items-center
            gap-x-4
            w-full
          "
        >
          <div className="flex-1">
            <MediaItem
              onClick={(_id: string) => onPlay(_id)}
              data={song}
            />
          </div>
          <LikeButton songId={song._id} />
        </li>
      ))}
    </ul>
  );
}
 
export default LikedContent;