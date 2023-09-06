import instance from "@/utils/axiosInterceptor"
import axios from "axios";

export const signIn = async (token: string) => {
  const postData = {
    idToken: token,
  }
  const result = await instance.post('/auth/signin', postData);
  console.log('signIn', result);
  return result;
}
export const getMe = async () => {
  const result = await instance.get('/user');
  console.log('me', result);
  return result;
}