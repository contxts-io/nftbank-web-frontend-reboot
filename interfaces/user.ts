import { TCurrency } from "./constants";

export type TUser = {
  id: string;
  nickname: string;
  image: string;
  config: {
    ghostmode: boolean;
    currency: TCurrency;
  }
}
export type TMe = TUser & {
  email: string;
  config: string;
}