import { trpc } from "~/trpc/client";

export default function useSignIn() {
  const {
    mutateAsync: signInUserWithEmailPasswordAsync,
    data,
    error,
    isPending: isLoading,
  } = trpc.auth.signUserWithEmailPassword.useMutation();

  return { signInUserWithEmailPasswordAsync, data, error, isLoading };
}
