import { trpc } from "~/trpc/client";

export default function useResendEmail() {
  const {
    mutateAsync: resendEmailAsync,
    data,
    error,
    isPending: isLoading,
  } = trpc.auth.resendOtpEmail.useMutation();

  return { resendEmailAsync, data, error, isLoading };
}
