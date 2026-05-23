import { formsTable } from "@repo/database/models/form";
import { db, eq } from "../../database/index";
import {
  createFormInput,
  CreateFormInput,
  deleteFormInput,
  DeleteFormInput,
  getAllFormsInput,
  GetAllFormsInput,
  getFormByIdInput,
  GetFormByIdInput,
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

    return form[0];
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
  public async addField() {}
  public async updateField() {}
  public async deleteField() {}
  public async reorderField() {}
}

export default FormService;
