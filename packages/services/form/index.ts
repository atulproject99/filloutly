import { formsTable } from "@repo/database/models/form";
import { formFieldsTable } from "@repo/database/models/form_field";
import { db, eq } from "../../database/index";
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
  reorderFieldsInput,
  ReorderFieldsInput,
  updateFieldInput,
  UpdateFieldInput,
  updateFormInput,
  UpdateFormInput,
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
}

export default FormService;
