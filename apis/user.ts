import { TUser } from "@/interfaces/user";
import instance from "@/utils/axiosInterceptor"
export const getUser = async<T = TUser>(nickname?:string) => {
  const {data} = await instance.get<{data:T}>(nickname ? `/user?u=${nickname}` : `/auth/me`);
  return data.data;
}