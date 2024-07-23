// axios
import axios from 'axios';

export const signIn = async(email: string, password: string) => {
  try {
    return await axios.post('http://localhost:4000/api/users/login', {
      email,
      password,
    });
  } catch (error) {
    throw error;
  }
}

export const signUp = async (data: FormData) => {
  return axios.post('http://localhost:4000/api/users/register', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};