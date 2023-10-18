import { TSpam } from "@/interfaces/spam";
import instance from "@/utils/axiosInterceptor";

export const insertSpamList = async (spamList: TSpam[]) => {
  const result = await instance.post<{ data: { data: string} }>('/spam/bulk', spamList);
  console.log('insertSpamList', result)
  return result;
}
export const resetSpamList = async () => {
  const result = await instance.patch('/spam/reset');
  console.log('resetSpamList', result)
  return result;
}