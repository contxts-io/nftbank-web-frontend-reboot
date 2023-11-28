import { TSendEmailVerificationCode, TSignInUp, TVerifyEmailByVerificationCode, UpdateMeType, sendEmailVerificationCode, sign, updateMe, verifyEmailByVerificationCode } from "@/apis/auth";
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