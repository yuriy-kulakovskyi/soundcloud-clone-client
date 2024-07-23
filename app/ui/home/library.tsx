"use client";

import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import useUploadModal from "@/hooks/useUploadModal";
import { useEffect, useState } from "react";
import { getSongsByUserId } from "@/app/lib/data";
import MediaItem from "@/app/ui/library/media-item";
import useOnPlay from "@/hooks/useOnPlay";
import { LibrarySongsSkeleton } from "../skeletons";

const Library = () => {
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const { user } = useUser();

  const [userSongs, setUserSongs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserSongs = async () => {
      try {
        const response = await getSongsByUserId(user?._id);
        setUserSongs(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchUserSongs();
    } else {
      setLoading(false);
    }
  }, [user]);

  const onPlay = useOnPlay(userSongs);

  const handleClick = () => {
    if (!user) {
      return authModal.onOpen("login");
    }

    return uploadModal.onOpen();
  };
  
  return (
    <div className="flex flex-col">
      <div className="
        flex 
        items-center
        justify-between
        px-5
        pt-4
      ">
        <div className="
          inline-flex
          items-center
          gap-x-2
        ">
          <TbPlaylist size={26} className="text-neutral-400" />
        
          <p className="
            text-neutral-400
            font-medium
            text-md
            "
          >
            Your library
          </p>
        </div>
        <AiOutlinePlus
          onClick={handleClick}
          size={20}
          className="
            text-neutral-400
            cursor-pointer
            hover:text-white
            transition
          "
        />
      </div>
      {loading ? (
        <LibrarySongsSkeleton />
      ) : (
        <ul className="
          flex
          flex-col
          gap-y-2
          mt-4
          px-3
        ">
          {userSongs && userSongs.map((item) => (
            <MediaItem
              onClick={(_id: string) => onPlay(_id)}
              key={item._id}
              data={item}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default Library;
