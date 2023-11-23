import { TSignInUp, sign } from "@/apis/auth";
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