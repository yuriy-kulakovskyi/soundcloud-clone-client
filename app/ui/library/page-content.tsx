"use client";

import { Song } from "@/app/lib/definitions";
import SongItem from "./song-item";
import useOnPlay from "@/hooks/useOnPlay";
import { useEffect, useState } from "react";
import { PageContentSkeleton } from "../skeletons";

interface PageContentProps {
  songs: Song[];
}

const PageContent: React.FC<PageContentProps> = ({
  songs
}) => {
  const onPlay = useOnPlay(songs);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <PageContentSkeleton />;
  }

  if (songs.length === 0) {
    return (
      <div className="mt-4 text-neutral-400">
        No songs available.
      </div>
    );
  }

  if (songs.length === 0) {
    return (
      <div
        className="mt-4 text-neutral-400"
      >
        No songs available.
      </div>
    )
  }

  return (
    <ul
      className="
    grid
    grid-cols-2
    sm:grid-cols-3
    md:grid-cols-3
    lg:grid-cols-4
    xl:grid-cols-5
    2xl:grid-cols-8
    gap-4
    mt-4
  "
    >
      {songs.map((item) => (
        <SongItem
          key={item._id}
          onClick={(_id: string) => onPlay(_id)}
          data={item}
        />
      ))}
    </ul>
  );
}

export default PageContent;