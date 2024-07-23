import axios from 'axios';

export const uploadSong = async (data: FormData) => {
  try {
    return await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/songs/add`, data);
  } catch (error) {
    throw error;
  }
}

export const like = async (userId: string, songId: string) => {
  try {
    return await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${userId}/like/${songId}`);
  } catch (error) {
    throw error;
  }
}

export const dislike = async (userId: string, songId: string) => {
  try {
    return await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${userId}/dislike/${songId}`);
  } catch (error) {
    throw error;
  }
}