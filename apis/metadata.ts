import { Metadata } from "@/interfaces/metadata";
import instance from "@/utils/axiosInterceptor";

type Param = {
  networkId: string,
  assetContract: string,
  tokenId: number,
}
type Key = keyof Param;
export const getMetadata = async<T = Metadata>(param: Param): Promise<T> => {
  const query = Object.keys(param)
  .filter(function(key) {
      return param[key as Key] !== ""; // 값이 있는 속성만 필터링
  })
  .map(function(key) {
      return encodeURIComponent(key) + '=' + encodeURIComponent(param[key as Key]);
  })
  .join('&');
  const { data } = await instance.get<{data: T}>(`/metadata/token${query ? `?${query}` : ''}`);

  return data.data;
}