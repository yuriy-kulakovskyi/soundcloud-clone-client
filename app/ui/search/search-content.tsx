"use client";

import { Song } from "@/app/lib/definitions";
import MediaItem from "@/app/ui/library/media-item";
import LikeButton from "./like-button";
import useOnPlay from "@/hooks/useOnPlay";

interface SearchContentProps {
  songs: Song[];
}

const SearchContent: React.FC<SearchContentProps> = ({
  songs
}) => {
  const onPlay = useOnPlay(songs);

  if (songs.length === 0) {
    return (
      <div
        className="
          flex 
          flex-col
          gap-y-2
          w-full
          px-6
          text-neutral-400
        "
      >
        No songs found.
      </div>
    )
  }

  return ( 
    <div className="flex flex-col gap-y-2 w-full px-6">
      {songs.map((song) => (
        <div
          key={song._id}
          className="
            flex
            items-center
            gap-x-4
            w-full
          "
        >
          <ul className="flex-1">
            <MediaItem
              onClick={(_id: string) => onPlay(_id)}
              data={song}
            />
          </ul>
          <LikeButton songId={song._id} />
        </div>
      ))}
    </div>
  );
}
 
export default SearchContent;