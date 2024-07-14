import axios, { AxiosResponse } from 'axios';

interface User {
  _id: string;
  name: string;
  // додайте інші поля користувача за потреби
}

export const getUser = async (_id: string, token: string): Promise<AxiosResponse<User>> => {
  if (token) {
    try {
      return await axios.get<User>(`http://localhost:4000/api/users/find/${_id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (error) {
      throw error;
    }
  }
  throw new Error("Token is missing");
}