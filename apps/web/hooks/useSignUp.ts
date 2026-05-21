import { trpc } from "~/trpc/client";

export default function useSignUp() {
  const {
    mutateAsync: createUserWithEmailPasswordAsync,
    data,
    error,
    isPending: isLoading,
  } = trpc.auth.createUserWithEmailPassword.useMutation();

  return { createUserWithEmailPasswordAsync, data, error, isLoading };
}
