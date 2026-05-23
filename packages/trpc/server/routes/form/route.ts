import { formService } from "../../services";
import { authProcedure, router } from "../../trpc";
import { generatePath } from "../../utils/path-generator";
import {
    createFormInputType,
    createFormOutputType,
    deleteFormInputType,
    deleteFormOutputType,
    getFormsInputType,
    getFormsOutputType,
} from "./model";

const TAGS = ["Form"];
const getPath = generatePath("/form");

export const formRouter = router({
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
});
