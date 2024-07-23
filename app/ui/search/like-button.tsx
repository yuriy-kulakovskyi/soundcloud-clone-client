"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { getLikedSongsByUserId } from "@/app/lib/data";
import { dislike, like } from "@/app/lib/actions";
import { toast } from "react-hot-toast";

interface LikeButtonProps {
  songId: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({
  songId
}) => {
  // hooks
  const router = useRouter();
  const authModal = useAuthModal();
  const { user } = useUser();

  const [isLiked, setIsLiked] = useState(false);
  
  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  useEffect(() => {
    if (!user?._id) {
      return
    }

    const fetchLikedSongs = async () => {
      try {
        const response = await getLikedSongsByUserId(user._id);        
        setIsLiked(Object.values(response).some((song) => song._id === songId));
      } catch (error) {
        console.error(error);
      }
    }

    fetchLikedSongs();
  });

  const handleLike = async () => {
    if (!user) {
      authModal.onOpen("login");
      return;
    }

    if (!isLiked) {  
      try {
        await like(user._id, songId);
        setIsLiked(true);
        toast.success("Liked");
      } catch (error) {
        toast.error("An error occurred");
        throw error;
      }
    } else {  
      try {
        await dislike(user._id, songId);
        setIsLiked(false);
        toast.success("Unliked");
      } catch (error) {
        toast.error("An error occurred");
        throw error;
      }
    }

    router.refresh();
  }
  

  return ( 
    <button
      onClick={handleLike}
      className="
        hover:opacity-75
        transition
      "
    >
      <Icon color={isLiked ? "rgb(249 115 22)" : 'white'} size={25} />
    </button>
  );
}
 
export default LikeButton;