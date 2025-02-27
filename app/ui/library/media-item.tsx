"use client";

import { Song } from "@/app/lib/definitions";
import usePlayer from "@/hooks/usePlayer";
import SoundCloudLogo from "../soundcloud-logo";
import ImageWithFallback from "./image-fallback";

interface MediaItemProps {
  data: Song;
  onClick?: (id: string) => void;
}

const MediaItem: React.FC<MediaItemProps> = ({
  data,
  onClick
}) => {
  const player = usePlayer();
  const handleClick = () => {
    if (onClick) {
      return onClick(data._id);
    }

    return player.setId(data._id);
  }

  const imageUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}${data.image}`;
  
  return (
    <li
      onClick={handleClick}
      className="
        flex
        items-center
        gap-x-3
        cursor-pointer
        hover:bg-neutral-800/50
        w-full
        p-2
        rounded-md
      "
    >
      <div
        className="
          relative
          rounded-md
          min-h-[48px]
          min-w-[48px]
          overflow-hidden
        "
      >
        {data.image && (
          <ImageWithFallback
            imageUrl={imageUrl}
            fallbackUrl="/not-found.jpg"
            alt="Image"
          />
        )}
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden">
        <p className="text-white truncate">
          {data.title}
        </p>
        <p className="
          text-neutral-400
          text-sm
          truncate
        ">
          {data.author}
        </p>
      </div>
    </li>
  );
}

export default MediaItem;