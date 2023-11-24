import { TSignInUp, UpdateMeType, sign, updateMe } from "@/apis/auth";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useMutationSignInUp() {
  return useMutation<any,AxiosError,TSignInUp>(
    (data) => sign(data),
    {
      useErrorBoundary: false,
    },
  );
}
export function useMutationUpdateMe() {
  return useMutation<any,AxiosError,UpdateMeType>(
    (data) => updateMe(data),
    {
      useErrorBoundary: false,
    },
  );
}