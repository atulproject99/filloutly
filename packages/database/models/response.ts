import { jsonb, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { formsTable } from "./form";

export const responsesTable = pgTable("responses", {
  id: uuid("id").primaryKey().defaultRandom(),
  
  formId: uuid("form_id")
    .notNull()
    .references(() => formsTable.id, { onDelete: "cascade" }),
    
  answers: jsonb("answers").notNull(),
  
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
});
