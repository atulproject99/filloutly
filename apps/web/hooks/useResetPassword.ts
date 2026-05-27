import { trpc } from "~/trpc/client";

export default function useResetPassword() {
  const {
    mutateAsync: resetPasswordAsync,
    data,
    error,
    isPending: isLoading,
  } = trpc.auth.resetPassword.useMutation();

  return { resetPasswordAsync, data, error, isLoading };
}
