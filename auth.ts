// axios
import axios from 'axios';

export const signIn = async(email: string, password: string) => {
  try {
    return await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/login`, {
      email,
      password,
    });
  } catch (error) {
    throw error;
  }
}

export const signUp = async (data: FormData) => {
  return axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/register`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};