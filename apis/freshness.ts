import { BasicParam } from "@/interfaces/request";
import { DataFreshness } from "@/interfaces/utils";
import instance from "@/utils/axiosInterceptor";
import { jsonToQueryString } from "@/utils/common";

export const checkFreshnessAndUpdate = async<T = DataFreshness>(requestParam: BasicParam & {forceUpdate:boolean}): Promise<T> => {
  const query = jsonToQueryString(requestParam);
  const { data } = await instance.get<T>(`/inventory/checkFreshnessAndUpdate?${query}`);
  return data;
}