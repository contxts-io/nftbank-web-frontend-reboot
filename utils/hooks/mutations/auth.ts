import { TSendEmailVerificationCode, TSignInUp, TVerifyEmailByVerificationCode, UpdateMeType, sendEmailVerificationCode, sign, signOut, updateMe, verifyEmailByVerificationCode } from "@/apis/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
export function useMutationSendVerificationCode() {
  return useMutation<any,AxiosError,TSendEmailVerificationCode>(
    (data) => sendEmailVerificationCode(data),
    {
      useErrorBoundary: false,
    },
  );
}
export function useMutationVerificationEmail() {
  return useMutation<any,AxiosError,TVerifyEmailByVerificationCode>(
    (data) => verifyEmailByVerificationCode(data),
    {
      useErrorBoundary: false,
    },
  );
}
export const useMutationSignOut = () => {
  const queryClient = useQueryClient();
  return useMutation(signOut, {
    onSuccess: () => {
      // queryClient.clear();
      queryClient.setQueryData(["me"], null);
      queryClient.setQueryData(["walletList"], []);
      document.cookie = `sign_in=SIGN_OUT`;
    },
    onError: (error: any) => {
      // TODO : error message
      // toast.error();
      throw error;
    },
  });
};
