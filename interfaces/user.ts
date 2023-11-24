export type TUser = {
  id: string;
  nickname: string;
  image: string;
}
export type TMe = TUser & {
  email: string;
  config: string;
  walletAddress: string;
}