import { trpc } from "~/trpc/client";

export default function useUpdateForm() {
  const {
    mutateAsync: updateFormAsync,
    data,
    error,
    isPending: isLoading,
  } = trpc.form.updateForm.useMutation();

  return { updateFormAsync, data, error, isLoading };
}
