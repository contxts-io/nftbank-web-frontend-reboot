import { AuthProvider, TCurrency } from "@/interfaces/constants";
import { TMe } from "@/interfaces/user";
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
export const getMe = async<T = TMe> () => {
  const result = await instance.get<{data:T}>('/auth/me');
  return result;
}
export type UpdateMeType = {
  nickname?: string,
  currency?: TCurrency,
}
export const updateMe = async<T = TMe> (postData:UpdateMeType) => {
  const result = await instance.put<{data:T}>('/auth/me',postData);
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
export const signOut = async () => {
  const result = await instance.post('/auth/signout');
  console.log('signOut', result);
  return result;
}