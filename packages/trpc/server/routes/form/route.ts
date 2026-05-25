import { formService } from "../../services";
import { authProcedure, publicProcedure, router } from "../../trpc";
import { generatePath } from "../../utils/path-generator";
import {
    createFormInputType,
    createFormOutputType,
    deleteFormInputType,
    deleteFormOutputType,
    getFormsInputType,
    getFormsOutputType,
    updateFormInputType,
    updateFormOutputType,
    addFieldInputType,
    addFieldOutputType,
    updateFieldInputType,
    updateFieldOutputType,
    deleteFieldInputType,
    deleteFieldOutputType,
    reorderFieldsInputType,
    reorderFieldsOutputType,
    getFormByIdInput,
    formOutputType,
    submitResponseOutputType,
    getResponsesOutputType,
    getAnalyticsOutputType,
} from "./model";
import { getPublicFormBySlugInput, submitResponseInput, getResponsesInput } from "@repo/services/form/model";

const TAGS = ["Form"];
const getPath = generatePath("/form");

export const formRouter = router({
  getPublicFormBySlug: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: getPath("/f/{slug}"),
        tags: TAGS,
      },
    })
    .input(getPublicFormBySlugInput)
    .output(formOutputType)
    .query(async ({ input }) => {
      const result = await formService.getPublicFormBySlug(input);
      return result as any;
    }),

  submitResponse: publicProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/submit"),
        tags: TAGS,
      },
    })
    .input(submitResponseInput)
    .output(submitResponseOutputType)
    .mutation(async ({ input }) => {
      const result = await formService.submitResponse(input);
      return result;
    }),

  getResponses: authProcedure
    .meta({
      openapi: {
        method: "GET",
        path: getPath("/{formId}/responses"),
        tags: TAGS,
      },
    })
    .input(getResponsesInput)
    .output(getResponsesOutputType)
    .query(async ({ input }) => {
      const responses = await formService.getResponses(input);
      return responses;
    }),

  createForm: authProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/create"),
        tags: TAGS,
      },
    })
    .input(createFormInputType)
    .output(createFormOutputType)
    .mutation(async ({ input, ctx }) => {
      const result = await formService.createForm({
        ...input,
        theme: input.theme as any,
        collectEmail: input.collectEmail ?? false,
        creatorId: ctx.user.id,
      });
      return result;
    }),

  updateForm: authProcedure
    .meta({
      openapi: {
        method: "PUT",
        path: getPath("/update"),
        tags: TAGS,
      },
    })
    .input(updateFormInputType)
    .output(updateFormOutputType)
    .mutation(async ({ input }) => {
      const result = await formService.updateForm({
        ...input,
        theme: input.theme as any,
        visibility: input.visibility as any,
        status: input.status as any,
      });
      return result;
    }),

  deleteForm: authProcedure
    .meta({
      openapi: {
        method: "DELETE",
        path: getPath("/delete"),
        tags: TAGS,
      },
    })
    .input(deleteFormInputType)
    .output(deleteFormOutputType)
    .mutation(async ({ input }) => {
      const result = await formService.deleteForm(input);
      return result;
    }),

  getForms: authProcedure
    .meta({
      openapi: {
        method: "GET",
        path: getPath("/all"),
        tags: TAGS,
      },
    })
    .input(getFormsInputType)
    .output(getFormsOutputType)
    .query(async ({ ctx }) => {
      const forms = await formService.getForms({ id: ctx.user.id });
      return forms;
    }),

  getFormById: authProcedure
    .meta({
      openapi: {
        method: "GET",
        path: getPath("/{id}"),
        tags: TAGS,
      },
    })
    .input(getFormByIdInput)
    .output(formOutputType)
    .query(async ({ input }) => {
      const form = await formService.getFormById(input);
      return form as any;
    }),

  addField: authProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/field"),
        tags: TAGS,
      },
    })
    .input(addFieldInputType)
    .output(addFieldOutputType)
    .mutation(async ({ input }) => {
      return await formService.addField(input as any);
    }),

  updateField: authProcedure
    .meta({
      openapi: {
        method: "PUT",
        path: getPath("/field"),
        tags: TAGS,
      },
    })
    .input(updateFieldInputType)
    .output(updateFieldOutputType)
    .mutation(async ({ input }) => {
      return await formService.updateField(input);
    }),

  deleteField: authProcedure
    .meta({
      openapi: {
        method: "DELETE",
        path: getPath("/field"),
        tags: TAGS,
      },
    })
    .input(deleteFieldInputType)
    .output(deleteFieldOutputType)
    .mutation(async ({ input }) => {
      return await formService.deleteField(input);
    }),

    reorderFields: authProcedure
    .meta({
      openapi: {
        method: "PUT",
        path: getPath("/field/reorder"),
        tags: TAGS,
      },
    })
    .input(reorderFieldsInputType)
    .output(reorderFieldsOutputType)
    .mutation(async ({ input }) => {
      return await formService.reorderFields(input);
    }),

  getAnalytics: authProcedure
    .meta({
      openapi: {
        method: "GET",
        path: getPath("/analytics"),
        tags: TAGS,
      },
    })
    .output(getAnalyticsOutputType)
    .query(async ({ ctx }) => {
      const result = await formService.getAnalytics({ userId: ctx.user.id });
      return result;
    }),
});
