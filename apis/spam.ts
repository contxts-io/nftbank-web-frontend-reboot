import { TSpam } from "@/interfaces/spam";
import instance from "@/utils/axiosInterceptor";

export const insertSpamList = async (spamList: TSpam[]) => {
  const result = await instance.post<{ data: { data: string} }>('/spam', spamList);
  console.log('insertSpamList', result)
  return result;
}