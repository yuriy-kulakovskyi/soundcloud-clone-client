import { Song } from "@/app/lib/definitions";

import usePlayer from "./usePlayer";
import useAuthModal from "./useAuthModal";
import { useUser } from "./useUser";

const useOnPlay = (songs: Song[]) => {
  const player = usePlayer();
  const authModal = useAuthModal();
  const { user } = useUser();

  const onPlay = (songId: string) => {
    if (!user) {
      return authModal.onOpen("login");
    }

    player.setId(songId);
    player.setIds(songs.map((song) => song._id));
  }

  return onPlay;
}

export default useOnPlay;