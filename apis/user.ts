import { TUser } from "@/interfaces/user";
import instance from "@/utils/axiosInterceptor"
export const getUser = async<T = TUser>(nickname?:string) => {
  // const {data} = await instance.get<{data:T}>(nickname ? `/user?nickname=${nickname}` : `/auth/me`);
  const {data} = await instance.get<{data:T}>(`/user?nickname=${nickname}`);
  return data.data;
}