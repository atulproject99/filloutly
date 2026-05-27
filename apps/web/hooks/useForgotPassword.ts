import { trpc } from "~/trpc/client";

export default function useForgotPassword() {
  const {
    mutateAsync: forgotPasswordAsync,
    data,
    error,
    isPending: isLoading,
  } = trpc.auth.forgotPassword.useMutation();

  return { forgotPasswordAsync, data, error, isLoading };
}
