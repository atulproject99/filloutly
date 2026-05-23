import { trpc } from "~/trpc/client";

export default function useDeleteForm() {
  const {
    mutateAsync: deleteFormAsync,
    data,
    error,
    isPending: isLoading,
  } = trpc.form.deleteForm.useMutation();

  return { deleteFormAsync, data, error, isLoading };
}
