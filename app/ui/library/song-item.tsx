"use client";

import { getUserWithoutToken } from "@/app/lib/data";
import { Song } from "@/app/lib/definitions";
import { useEffect, useState } from "react";
import PlayButton from "./play-button";

interface SongItemProps {
  data: Song;
  onClick: (_id: string) => void;
};

const SongItem: React.FC<SongItemProps> = ({
  data,
  onClick
}) => {
  const [uploader, setUploader] = useState<any>(null);

  useEffect(() => {
    const fetchUploader = async () => {
      try {
        const uploader = await getUserWithoutToken(data.uploader);
        setUploader(uploader.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUploader();
  }, [data.uploader]);

  const imageUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}${data.image}`;

  return (
    <li
      onClick={() => onClick(data._id)}
      className="
        relative
        group
        flex
        flex-col
        items-center
        justify-center
        rounded-md
        overflow-hidden
        gap-x-4
        bg-neutral-400/5
        cursor-pointer
        hover:bg-neutral-400/10
        transition
        p-3
      "
    >
      <div
        className="
          relative
          aspect-square
          w-full
          h-full
          rounded-md
          overflow-hidden
        "
      >
        {data.image && (
          <img
            className="object-cover abolute w-full h-full"
            src={imageUrl}
            alt="Image"
          />
        )}
      </div>
      <div className="flex flex-col items-start w-full pt-4 gap-y-1">
        <p className="font-semibold truncate w-full">
          {data.title}
        </p>
        <p className="
          text-neutral-400
          text-sm
          pb-4
          w-full
          truncate
        ">
          By {data.author}
        </p>
        <p>
          {uploader && uploader.name}
        </p>
      </div>
      <div className="
        absolute
        bottom-24
        right-5
      ">
        <PlayButton />
      </div>
    </li>
  );
}

export default SongItem;