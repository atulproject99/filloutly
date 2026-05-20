import { trpc } from "~/trpc/client";

export default function useVerifyEmail() {
  const {
    mutateAsync: verifyEmailAsync,
    data,
    error,
    isPending: isLoading,
  } = trpc.auth.verifyEmail.useMutation();

  return [verifyEmailAsync, data, error, isLoading];
}
