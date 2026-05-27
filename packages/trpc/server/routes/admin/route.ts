import { authProcedure, router } from "../../trpc";
import { generatePath } from "../../utils/path-generator";
import {
  getPlatformStatsOutputType,
  getUsersOutputType,
  getGlobalFormsOutputType,
} from "./model";
import { db, desc, eq, count, ne } from "@repo/database";
import { usersTable } from "@repo/database/models/user";
import { formsTable } from "@repo/database/models/form";
import { responsesTable } from "@repo/database/models/response";

const TAGS = ["Admin"];
const getPath = generatePath("/admin");

export const adminRouter = router({
  getPlatformStats: authProcedure
    .meta({
      openapi: {
        method: "GET",
        path: getPath("/stats"),
        tags: TAGS,
      },
    })
    .output(getPlatformStatsOutputType)
    .query(async () => {
      const [usersCount] = await db.select({ value: count() }).from(usersTable);
      const [formsCount] = await db.select({ value: count() }).from(formsTable);
      const [responsesCount] = await db.select({ value: count() }).from(responsesTable);

      return {
        totalUsers: usersCount?.value || 0,
        totalForms: formsCount?.value || 0,
        totalResponses: responsesCount?.value || 0,
      };
    }),

  getUsers: authProcedure
    .meta({
      openapi: {
        method: "GET",
        path: getPath("/users"),
        tags: TAGS,
      },
    })
    .output(getUsersOutputType)
    .query(async () => {
      const users = await db
        .select()
        .from(usersTable)
        .where(ne(usersTable.role, "admin"))
        .orderBy(desc(usersTable.createdAt));
      return users.map((u) => ({
        id: u.id,
        email: u.email,
        fullName: u.fullName,
        role: u.role,
        createdAt: u.createdAt,
      }));
    }),

  getGlobalForms: authProcedure
    .meta({
      openapi: {
        method: "GET",
        path: getPath("/forms"),
        tags: TAGS,
      },
    })
    .output(getGlobalFormsOutputType)
    .query(async () => {
      const forms = await db
        .select({
          id: formsTable.id,
          title: formsTable.title,
          status: formsTable.status,
          createdAt: formsTable.createdAt,
          creatorEmail: usersTable.email,
        })
        .from(formsTable)
        .innerJoin(usersTable, eq(formsTable.creatorId, usersTable.id))
        .orderBy(desc(formsTable.createdAt));

      // We need response counts for each form
      // A quick approach for an admin dashboard is to fetch counts per form, or query all and group.
      // Since this is a simple dashboard, we'll do an aggregate or a subquery. 
      // To keep it simple, we'll fetch all responses grouped by formId.
      const responseCounts = await db
        .select({
          formId: responsesTable.formId,
          count: count(),
        })
        .from(responsesTable)
        .groupBy(responsesTable.formId);

      const countMap = new Map(responseCounts.map((r) => [r.formId, r.count]));

      return forms.map((f) => ({
        id: f.id,
        title: f.title,
        status: f.status,
        creatorEmail: f.creatorEmail,
        createdAt: f.createdAt,
        responses: countMap.get(f.id) || 0,
      }));
    }),
});
