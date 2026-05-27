import { formsTable } from "@repo/database/models/form";
import { formFieldsTable } from "@repo/database/models/form_field";
import { responsesTable } from "@repo/database/models/response";
import { db, desc, eq } from "../../database/index";
import {
  createFieldInput,
  CreateFieldInput,
  createFormInput,
  CreateFormInput,
  deleteFieldInput,
  DeleteFieldInput,
  deleteFormInput,
  DeleteFormInput,
  getAllFormsInput,
  GetAllFormsInput,
  getFormByIdInput,
  GetFormByIdInput,
  getPublicFormBySlugInput,
  GetPublicFormBySlugInput,
  getResponsesInput,
  GetResponsesInput,
  reorderFieldsInput,
  ReorderFieldsInput,
  submitResponseInput,
  SubmitResponseInput,
  updateFieldInput,
  UpdateFieldInput,
  updateFormInput,
  UpdateFormInput,
  getAnalyticsInput,
  GetAnalyticsInput,
} from "./model";

class FormService {
  /// Form se related
  public async createForm(payload: CreateFormInput) {
    const { title, description, slug, theme, collectEmail, creatorId } =
      await createFormInput.parseAsync(payload);

    // If slug is provided, check if it already exists
    if (slug) {
      const existingForm = await db.select().from(formsTable).where(eq(formsTable.slug, slug));
      if (existingForm && existingForm.length > 0) {
        throw new Error("Form with this slug already exists");
      }
    }

    const newForm = await db
      .insert(formsTable)
      .values({
        title,
        description,
        slug,
        theme,
        collectEmail,
        creatorId,
      })
      .returning({ id: formsTable.id, slug: formsTable.slug });

    if (!newForm || newForm.length === 0 || !newForm[0]?.id) {
      throw new Error("Something went wrong while creating the form");
    }

    return {
      message: "Form created successfully",
      id: newForm[0].id,
      slug: newForm[0].slug,
    };
  }

  public async updateForm(payload: UpdateFormInput) {
    const { formId, ...updateData } = await updateFormInput.parseAsync(payload);

    if (updateData.slug) {
      const existingForm = await db
        .select()
        .from(formsTable)
        .where(eq(formsTable.slug, updateData.slug));
      if (existingForm && existingForm.length > 0 && existingForm[0]?.id !== formId) {
        throw new Error("Form with this slug already exists");
      }
    }

    const updatedForm = await db
      .update(formsTable)
      .set(updateData)
      .where(eq(formsTable.id, formId))
      .returning({ id: formsTable.id });

    if (!updatedForm || updatedForm.length === 0 || !updatedForm[0]?.id) {
      throw new Error("Form not found or could not be updated");
    }

    return {
      message: "Form updated successfully",
      id: updatedForm[0].id,
    };
  }
  public async deleteForm(payload: DeleteFormInput) {
    const { id } = await deleteFormInput.parseAsync(payload);

    const deletedForm = await db
      .delete(formsTable)
      .where(eq(formsTable.id, id))
      .returning({ id: formsTable.id });

    if (!deletedForm || deletedForm.length === 0 || !deletedForm[0]?.id) {
      throw new Error("Form not found or could not be deleted");
    }

    return {
      message: "Form deleted successfully",
      id: deletedForm[0].id,
    };
  }

  public async getFormById(payload: GetFormByIdInput) {
    const { id } = await getFormByIdInput.parseAsync(payload);

    const form = await db.select().from(formsTable).where(eq(formsTable.id, id));

    if (!form || form.length === 0) {
      throw new Error("Form not found");
    }

    const fields = await db.select().from(formFieldsTable).where(eq(formFieldsTable.formId, id));

    fields.sort((a, b) => a.order - b.order);

    return {
      ...form[0],
      fields,
    };
  }

  public async getForms(payload?: GetAllFormsInput) {
    if (payload) {
      const { id: creatorId } = await getAllFormsInput.parseAsync(payload);
      if (creatorId) {
        return await db.select().from(formsTable).where(eq(formsTable.creatorId, creatorId));
      }
    }

    return await db.select().from(formsTable);
  }

  /// Field se related
  public async addField(payload: CreateFieldInput) {
    const data = await createFieldInput.parseAsync(payload);

    // Determine order: get max order for this form
    const existingFields = await db
      .select({ order: formFieldsTable.order })
      .from(formFieldsTable)
      .where(eq(formFieldsTable.formId, data.formId));

    const maxOrder =
      existingFields.length > 0 ? Math.max(...existingFields.map((f) => f.order)) : 0;

    const newOrder = maxOrder + 1;

    const labelKey = `${data.type}_${Date.now()}`;

    const newField = await db
      .insert(formFieldsTable)
      .values({
        formId: data.formId,
        type: data.type as any,
        label: data.label,
        labelKey,
        placeholder: data.placeholder,
        helperText: data.helperText,
        required: data.required,
        options: data.options,
        validations: data.validations,
        order: newOrder,
      })
      .returning();

    if (!newField || newField.length === 0) {
      throw new Error("Something went wrong while adding the field");
    }

    return {
      message: "Field added successfully",
      field: newField[0],
    };
  }

  public async updateField(payload: UpdateFieldInput) {
    const { fieldId, ...updateData } = await updateFieldInput.parseAsync(payload);

    const updatedField = await db
      .update(formFieldsTable)
      .set(updateData)
      .where(eq(formFieldsTable.id, fieldId))
      .returning();

    if (!updatedField || updatedField.length === 0) {
      throw new Error("Field not found or could not be updated");
    }

    return {
      message: "Field updated successfully",
      field: updatedField[0],
    };
  }

  public async deleteField(payload: DeleteFieldInput) {
    const { fieldId } = await deleteFieldInput.parseAsync(payload);

    const deletedField = await db
      .delete(formFieldsTable)
      .where(eq(formFieldsTable.id, fieldId))
      .returning({ id: formFieldsTable.id });

    if (!deletedField || deletedField.length === 0) {
      throw new Error("Field not found or could not be deleted");
    }

    return {
      message: "Field deleted successfully",
      id: deletedField[0]?.id as string,
    };
  }

  public async reorderFields(payload: ReorderFieldsInput) {
    const { formId, fieldIds } = await reorderFieldsInput.parseAsync(payload);

    await db.transaction(async (tx) => {
      for (let i = 0; i < fieldIds.length; i++) {
        const id = fieldIds[i];
        if (id) {
          await tx
            .update(formFieldsTable)
            .set({ order: i + 1 })
            .where(eq(formFieldsTable.id, id));
        }
      }
    });

    return {
      message: "Fields reordered successfully",
    };
  }

  /// Responses
  public async getPublicFormBySlug(payload: GetPublicFormBySlugInput) {
    const { slug } = await getPublicFormBySlugInput.parseAsync(payload);

    const form = await db.select().from(formsTable).where(eq(formsTable.slug, slug));

    if (!form || form.length === 0) {
      throw new Error("Form not found");
    }

    if (form[0]!.status !== "published") {
      throw new Error("This form is not published yet.");
    }

    const fields = await db
      .select()
      .from(formFieldsTable)
      .where(eq(formFieldsTable.formId, form[0]!.id));
    fields.sort((a, b) => a.order - b.order);

    return {
      ...form[0],
      fields,
    };
  }

  public async submitResponse(payload: SubmitResponseInput) {
    const { formId, answers } = await submitResponseInput.parseAsync(payload);

    // Make sure form exists and is published
    const form = await db.select().from(formsTable).where(eq(formsTable.id, formId));
    if (!form || form.length === 0 || form[0]!.status !== "published") {
      throw new Error("Form is not available for submissions.");
    }

    const newResponse = await db
      .insert(responsesTable)
      .values({
        formId,
        answers,
      })
      .returning();

    if (!newResponse || newResponse.length === 0 || !newResponse[0]?.id) {
      throw new Error("Failed to submit response.");
    }

    return {
      message: "Response submitted successfully!",
      responseId: newResponse[0].id,
    };
  }

  public async getResponses(payload: GetResponsesInput) {
    const { formId } = await getResponsesInput.parseAsync(payload);
    const responses = await db
      .select()
      .from(responsesTable)
      .where(eq(responsesTable.formId, formId))
      .orderBy(desc(responsesTable.submittedAt));

    return responses;
  }

  public async getAnalytics(payload: GetAnalyticsInput) {
    const { userId } = await getAnalyticsInput.parseAsync(payload);
    
    // Get all forms for this user
    const forms = await db.select().from(formsTable).where(eq(formsTable.creatorId, userId));
    const totalForms = forms.length;
    const publishedForms = forms.filter((f) => f.status === "published").length;
    const draftForms = forms.filter((f) => f.status === "draft").length;

    // Get all responses for these forms
    const formIds = forms.map((f) => f.id);
    let totalResponses = 0;
    let recentResponses: any[] = [];

    if (formIds.length > 0) {
      // In Drizzle, using `inArray` is better, but doing it sequentially or using multiple queries is also fine
      // We will loop or use a simple query if possible, but let's just fetch responses for all user forms
      const responses = await db.select().from(responsesTable); // Need to filter properly
      const userResponses = responses.filter((r) => formIds.includes(r.formId));
      
      totalResponses = userResponses.length;
      recentResponses = userResponses
        .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
        .slice(0, 10);
    }

    return {
      totalForms,
      publishedForms,
      draftForms,
      totalResponses,
      recentResponses,
    };
  }
}

export default FormService;
