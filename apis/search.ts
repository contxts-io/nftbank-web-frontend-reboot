import { SearchUserResponse } from "@/interfaces/user";
import instance from "@/utils/axiosInterceptor";
export const getSearchUser = async<T = SearchUserResponse>(q:string) => {
  // const query = jsonToQueryString(searchParam);
  const {data} = await instance.get<{data: T}>(`/search?q=${q}`);
  return data.data;
}
