import { toast } from "sonner";
import { trpc } from "~/trpc/client";

export default function useFormBuilder(formId: string) {
  const utils = trpc.useUtils();

  const invalidate = () => utils.form.getFormById.invalidate({ id: formId });

  const addFieldMutation = trpc.form.addField.useMutation({
    onSuccess: () => {
      invalidate();
      toast.success("Field added");
    },
    onError: (err) => toast.error(err.message || "Failed to add field"),
  });

  const deleteFieldMutation = trpc.form.deleteField.useMutation({
    onSuccess: () => {
      invalidate();
      toast.success("Field deleted");
    },
  });

  const reorderFieldsMutation = trpc.form.reorderFields.useMutation({
    onSuccess: () => invalidate(),
  });

  const updateFieldMutation = trpc.form.updateField.useMutation({
    onSuccess: () => invalidate(),
    onError: (err) => toast.error(err.message || "Failed to update field"),
  });

  const updateFormMutation = trpc.form.updateForm.useMutation({
    onSuccess: () => {
      invalidate();
      toast.success("Form updated");
    },
    onError: (err) => toast.error(err.message || "Failed to update form"),
  });

  return {
    addFieldMutation,
    deleteFieldMutation,
    reorderFieldsMutation,
    updateFieldMutation,
    updateFormMutation,
  };
}
