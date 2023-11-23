import { AuthProvider } from "@/interfaces/constants";
import instance from "@/utils/axiosInterceptor"

// export const postUser = async <T = User, R = UserPostType>(body: R): Promise<T> => {
// 	const { data } = await axios.post<T, AxiosResponse<T>, R>(url, body, header);
// }

export const signIn = async (token: string) => {
  const postData = {
    idToken: token,
  }
  const result = await instance.post('/auth/signin', postData);
  console.log('signIn', result);
  return result;
}
export type TSignInUp = {
  token: string,
  provider: AuthProvider
}
export const sign = async (postData:TSignInUp) => {
  const result = await instance.post('/auth/sign', postData);
  console.log('sign', result);
  return result;
}
export const getMe = async () => {
  const result = await instance.get('/auth/me');
  console.log('me', result);
  return result;
}
export const signUp = async ({token,nickname}:{token:string,nickname:string}) => {
  const postData = {
    idToken: token,
    nickname: nickname,
  }
  const result = await instance.post('/auth/signup', postData);
  console.log('signUp', result);
  return result;
}