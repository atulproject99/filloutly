"use client";

import { format } from "date-fns";
import { motion } from "framer-motion";
import { Plus, MoreHorizontal, Edit, Globe, Archive, Trash2 } from "lucide-react";
import { useState } from "react";
import slugify from "slugify";
import { toast } from "sonner";
import useCreateForm from "~/hooks/useCreateForm";
import useUpdateForm from "~/hooks/useUpdateForm";
import useDeleteForm from "~/hooks/useDeleteForm";
import { trpc } from "~/trpc/client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Textarea } from "~/components/ui/textarea";

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters")
    .regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  description: z.string(),
  theme: z.string().default("apple-glass").optional(),
});

const editFormSchema = formSchema.extend({
  status: z.enum(["draft", "published", "archived"]),
  visibility: z.enum(["public", "unlisted"]),
});

type FormValues = z.infer<typeof formSchema>;
type EditFormValues = z.infer<typeof editFormSchema>;

export default function MyFormsPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingForm, setEditingForm] = useState<any>(null);

  const utils = trpc.useUtils();
  const { data: forms, isLoading } = trpc.form.getForms.useQuery();
  const { createFormAsync, isLoading: isCreating } = useCreateForm();
  const { updateFormAsync, isLoading: isUpdating } = useUpdateForm();
  const { deleteFormAsync } = useDeleteForm();

  const handleUpdateStatus = async (formId: string, status: "draft" | "published" | "archived") => {
    try {
      await updateFormAsync({ formId, status });
      toast.success(`Form status updated to ${status}`);
      utils.form.getForms.invalidate();
    } catch (error: any) {
      toast.error(error.message || "Failed to update status");
    }
  };

  const handleDelete = async (formId: string) => {
    try {
      await deleteFormAsync({ id: formId });
      toast.success("Form deleted");
      utils.form.getForms.invalidate();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete form");
    }
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      theme: "apple-glass",
    },
  });

  const editForm = useForm<EditFormValues>({
    resolver: zodResolver(editFormSchema),
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      theme: "apple-glass",
      status: "draft",
      visibility: "unlisted",
    },
  });

  const onSubmit = async (data: FormValues) => {
    const finalSlug = slugify(data.slug, { lower: true, strict: true });

    try {
      await createFormAsync({
        title: data.title,
        description: data.description || "",
        slug: finalSlug,
        theme: data.theme as any,
      });
      toast.success("Form created successfully!");
      setIsCreateOpen(false);
      form.reset();
      utils.form.getForms.invalidate();
    } catch (error: any) {
      toast.error(error.message || "Failed to create form");
    }
  };

  const onEditSubmit = async (data: EditFormValues) => {
    if (!editingForm) return;
    const finalSlug = slugify(data.slug, { lower: true, strict: true });

    try {
      await updateFormAsync({
        formId: editingForm.id,
        title: data.title,
        description: data.description || "",
        slug: finalSlug,
        theme: data.theme as any,
        status: data.status,
        visibility: data.visibility,
      });
      toast.success("Form updated successfully!");
      setEditingForm(null);
      utils.form.getForms.invalidate();
    } catch (error: any) {
      toast.error(error.message || "Failed to update form");
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsCreateOpen(open);
    if (!open) form.reset();
  };

  const openEditDialog = (formToEdit: any) => {
    setEditingForm(formToEdit);
    editForm.reset({
      title: formToEdit.title,
      slug: formToEdit.slug || "",
      description: formToEdit.description || "",
      theme: formToEdit.theme || "apple-glass",
      status: formToEdit.status,
      visibility: formToEdit.visibility,
    });
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center justify-between">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold tracking-tight"
        >
          My Forms
        </motion.h2>

        <Dialog open={isCreateOpen} onOpenChange={handleOpenChange}>
          <DialogTrigger asChild>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Button className="bg-red-600 hover:bg-red-700 text-white rounded-xl">
                <Plus className="w-4 h-4 mr-2" />
                Create Form
              </Button>
            </motion.div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] glass-panel border-white/10 bg-black/80 text-white">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <DialogHeader>
                  <DialogTitle>Create New Form</DialogTitle>
                  <DialogDescription className="text-white/60">
                    Fill in the details below to create a new awesome form.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-4 items-center gap-4 space-y-0">
                        <FormLabel className="text-right">Title</FormLabel>
                        <div className="col-span-3">
                          <FormControl>
                            <Input
                              placeholder="e.g. Feedback Survey"
                              className="bg-white/5 border-white/10 focus-visible:ring-red-500"
                              {...field}
                              onChange={(e) => {
                                field.onChange(e);
                                form.setValue(
                                  "slug",
                                  slugify(e.target.value, { lower: true, strict: true }),
                                  { shouldValidate: true },
                                );
                              }}
                            />
                          </FormControl>
                          <FormMessage className="mt-1" />
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-4 items-start gap-4 space-y-0 mt-2">
                        <FormLabel className="text-right mt-3">Slug</FormLabel>
                        <div className="col-span-3">
                          <FormControl>
                            <Input
                              placeholder="e.g. feedback-survey"
                              className="bg-white/5 border-white/10 focus-visible:ring-red-500"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription className="text-[10px] text-white/40 mt-1">
                            This will be the unique URL for your form. It is auto-generated from the title, but you
                            can customize it.
                          </FormDescription>
                          <FormMessage className="mt-1" />
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-4 items-center gap-4 space-y-0">
                        <FormLabel className="text-right">Description</FormLabel>
                        <div className="col-span-3">
                          <FormControl>
                            <Textarea
                              placeholder="Optional description"
                              className="bg-white/5 border-white/10 focus-visible:ring-red-500"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="mt-1" />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    disabled={isCreating}
                    className="bg-red-600 hover:bg-red-700 text-white rounded-xl"
                  >
                    {isCreating ? "Creating..." : "Save changes"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        {/* Edit Form Dialog */}
        <Dialog open={!!editingForm} onOpenChange={(open) => !open && setEditingForm(null)}>
          <DialogContent className="sm:max-w-[425px] glass-panel border-white/10 bg-black/80 text-white max-h-[90vh] overflow-y-auto">
            <Form {...editForm}>
              <form onSubmit={editForm.handleSubmit(onEditSubmit)}>
                <DialogHeader>
                  <DialogTitle>Edit Form</DialogTitle>
                  <DialogDescription className="text-white/60">
                    Update your form details and settings.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <FormField
                    control={editForm.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-4 items-center gap-4 space-y-0">
                        <FormLabel className="text-right">Title</FormLabel>
                        <div className="col-span-3">
                          <FormControl>
                            <Input
                              placeholder="e.g. Feedback Survey"
                              className="bg-white/5 border-white/10 focus-visible:ring-red-500"
                              {...field}
                              onChange={(e) => {
                                field.onChange(e);
                                if (editingForm?.status === "draft") {
                                  editForm.setValue(
                                    "slug",
                                    slugify(e.target.value, { lower: true, strict: true }),
                                    { shouldValidate: true },
                                  );
                                }
                              }}
                            />
                          </FormControl>
                          <FormMessage className="mt-1" />
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={editForm.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-4 items-start gap-4 space-y-0 mt-2">
                        <FormLabel className="text-right mt-3">Slug</FormLabel>
                        <div className="col-span-3">
                          <FormControl>
                            <Input
                              placeholder="e.g. feedback-survey"
                              className="bg-white/5 border-white/10 focus-visible:ring-red-500 disabled:opacity-50"
                              disabled={editingForm?.status !== "draft"}
                              {...field}
                            />
                          </FormControl>
                          <FormDescription className="text-[10px] text-white/40 mt-1">
                            {editingForm?.status === "draft" 
                              ? "This will be the unique URL for your form."
                              : "You cannot change the slug after a form is published or archived to prevent broken links."}
                          </FormDescription>
                          <FormMessage className="mt-1" />
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={editForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-4 items-center gap-4 space-y-0">
                        <FormLabel className="text-right">Description</FormLabel>
                        <div className="col-span-3">
                          <FormControl>
                            <Textarea
                              placeholder="Optional description"
                              className="bg-white/5 border-white/10 focus-visible:ring-red-500"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="mt-1" />
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={editForm.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-4 items-center gap-4 space-y-0">
                        <FormLabel className="text-right">Status</FormLabel>
                        <div className="col-span-3">
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-white/5 border-white/10 focus:ring-red-500">
                                <SelectValue placeholder="Select a status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-black/90 border-white/10 text-white">
                              <SelectItem value="draft">Draft</SelectItem>
                              <SelectItem value="published">Published</SelectItem>
                              <SelectItem value="archived">Archived</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage className="mt-1" />
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={editForm.control}
                    name="visibility"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-4 items-center gap-4 space-y-0">
                        <FormLabel className="text-right">Visibility</FormLabel>
                        <div className="col-span-3">
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-white/5 border-white/10 focus:ring-red-500">
                                <SelectValue placeholder="Select visibility" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-black/90 border-white/10 text-white">
                              <SelectItem value="public">Public</SelectItem>
                              <SelectItem value="unlisted">Unlisted</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage className="mt-1" />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    disabled={isUpdating}
                    className="bg-red-600 hover:bg-red-700 text-white rounded-xl"
                  >
                    {isUpdating ? "Updating..." : "Save changes"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="glass-panel border-white/5 rounded-2xl overflow-hidden bg-black/20">
        <Table>
          <TableHeader className="border-white/5 bg-white/5">
            <TableRow className="border-white/5 hover:bg-transparent">
              <TableHead className="text-white/60">Title</TableHead>
              <TableHead className="text-white/60">Slug</TableHead>
              <TableHead className="text-white/60">Status</TableHead>
              <TableHead className="text-white/60">Created</TableHead>
              <TableHead className="text-right w-24"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow className="border-white/5">
                <TableCell colSpan={5} className="h-24 text-center text-white/40">
                  Loading forms...
                </TableCell>
              </TableRow>
            ) : forms?.length === 0 ? (
              <TableRow className="border-white/5">
                <TableCell colSpan={5} className="h-24 text-center text-white/40">
                  No forms found. Create one to get started!
                </TableCell>
              </TableRow>
            ) : (
              forms?.map((form) => (
                <TableRow
                  key={form.id}
                  className="border-white/5 hover:bg-white/5 transition-colors"
                >
                  <TableCell className="font-medium">{form.title}</TableCell>
                  <TableCell className="text-white/60">/{form.slug}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize bg-white/10 text-white/80">
                      {form.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-white/60">
                    {form.createdAt ? format(new Date(form.createdAt), "MMM d, yyyy") : "Unknown"}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white">
                          Actions
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="glass-panel border-white/10 bg-black/90 text-white">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem className="cursor-pointer hover:bg-white/10 focus:bg-white/10" onClick={() => openEditDialog(form)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Form
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-white/10" />
                        {form.status !== "published" && (
                          <DropdownMenuItem className="cursor-pointer hover:bg-white/10 focus:bg-white/10" onClick={() => handleUpdateStatus(form.id, "published")}>
                            <Globe className="mr-2 h-4 w-4 text-green-400" />
                            Publish
                          </DropdownMenuItem>
                        )}
                        {form.status !== "archived" && (
                          <DropdownMenuItem className="cursor-pointer hover:bg-white/10 focus:bg-white/10" onClick={() => handleUpdateStatus(form.id, "archived")}>
                            <Archive className="mr-2 h-4 w-4 text-orange-400" />
                            Archive
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator className="bg-white/10" />
                        <DropdownMenuItem className="cursor-pointer text-red-400 hover:text-red-300 hover:bg-red-400/10 focus:bg-red-400/10 focus:text-red-300" onClick={() => handleDelete(form.id)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
