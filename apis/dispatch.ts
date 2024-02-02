import instance from "@/utils/axiosInterceptor"
export type TDispatch = {
  message: string,
  taskId: string,
}
export const dispatchDailyNav = async<T = TDispatch>(walletAddress:string) => {
  // const {data} = await instance.get<{data:T}>(nickname ? `/user?nickname=${nickname}` : `/auth/me`);
  const result = await instance.get<T>(`dispatch/dailynav?walletAddress=${walletAddress}`);
  console.log('dispatchDailyNav result', result);
  return result.data;
}
export const dispatchPerformance = async<T = TDispatch>(walletAddress:string) => {
  // const {data} = await instance.get<{data:T}>(nickname ? `/user?nickname=${nickname}` : `/auth/me`);
  const result = await instance.get<T>(`dispatch/performance?walletAddress=${walletAddress}`);
  return result.data;
}