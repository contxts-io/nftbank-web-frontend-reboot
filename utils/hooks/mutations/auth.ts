import { TSendEmailVerificationCode, TSignInUp, TVerifyEmailByVerificationCode, UpdateMeType, sendEmailVerificationCode, sign, signOut, updateMe, verifyEmailByVerificationCode } from "@/apis/auth";
import { userStatusAtom } from "@/store/account";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";

export function useMutationSignInUp() {
  const [userStatus, setUserStatus] = useAtom(userStatusAtom);
  return useMutation<any,AxiosError,TSignInUp>(
    (data) => sign(data),
    {
      useErrorBoundary: false,
      onSuccess: () => {
        // queryClient.clear();
        setUserStatus('SIGN_IN');
        console.log('sign in success ');
        // document.cookie = `sign_in=SIGN_IN`;
      },
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
  const router = useRouter();
  const [userStatus, setUserStatus] = useAtom(userStatusAtom);
  return useMutation(signOut, {
    onSuccess: () => {
      queryClient.clear();
      // queryClient.setQueryData(["me"], null);
      // queryClient.setQueryData(["walletList"], []);
        setUserStatus('SIGN_OUT');
      document.cookie = `sign_in=SIGN_OUT`;
      router.push('/auth/signin');
    },
    onError: (error: any) => {
      // TODO : error message
      // toast.error();
      throw error;
    },
  });
};
