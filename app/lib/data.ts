// axios
import axios, { AxiosResponse } from "axios";

// definitions
import { Song, User } from "./definitions";

import { unstable_noStore as noStore  } from 'next/cache';

export const getUser = async (_id: string, token: string): Promise<AxiosResponse<User>> => {
  noStore();
  
  if (token) {
    try {
      return await axios.get<User>(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/find/${_id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (error) {
      throw error;
    }
  }
  throw new Error("Token is missing");
};

export const getUserWithoutToken = async (_id: string): Promise<AxiosResponse<User>> => {
  noStore();

  try {
    return await axios.get<User>(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/get/${_id}`);
  } catch (error) {
    throw error;
  }

}

export const getSongs = async (query?: string): Promise<Song[]> => {
  noStore();

  try {
    const response = await axios.get<Song[]>(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/songs?search=${encodeURIComponent(query || "")}`);
    return response.data;
  } catch (error) {
    throw error;
  } 
}

export const getSongsByUserId = async (userId: string): Promise<Song[]> => {
  noStore();

  try {
    const response = await axios.get<Song[]>(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/songs/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getLikedSongsByUserId = async (userId: string): Promise<Song> => {
  noStore();

  try {
    const response = await axios.get<Song>(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${userId}/likedSongs/`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getSongById = async (songId: string): Promise<Song> => {
  noStore();

  try {
    const response = await axios.get<Song>(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/songs/get/${songId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}