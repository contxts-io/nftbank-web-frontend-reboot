import instance from "@/utils/axiosInterceptor"
import axios from "axios";

export const signin = async (token: string) => {
  const postData = {
    idToken: token,
  }
  const result = await instance.post('/auth/signin', postData);
  console.log('signin', result);
  return result;
}