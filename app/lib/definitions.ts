export interface Song {
  _id: string;
  title: string;
  author: string;
  song: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  uploader: string;
  duration: number;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
}