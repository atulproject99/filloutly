import { trpc } from "~/trpc/client";

export default function useCreateForm() {
  const {
    mutateAsync: createFormAsync,
    data,
    error,
    isPending: isLoading,
  } = trpc.form.createForm.useMutation();

  return { createFormAsync, data, error, isLoading };
}
