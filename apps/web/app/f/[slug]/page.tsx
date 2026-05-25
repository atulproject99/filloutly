import PublicForm from "./PublicForm";

export default async function PublicFormPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  return <PublicForm slug={resolvedParams.slug} />;
}
