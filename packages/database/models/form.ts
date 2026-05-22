import { boolean, pgEnum, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const formStatusEnum = pgEnum("form_status", ["draft", "published", "archived"]);

export const formVisibilityEnum = pgEnum("form_visibility", ["public", "unlisted"]);

export const formsTable = pgTable("forms", {
  id: uuid("id").primaryKey().defaultRandom(),

  title: varchar("title", {
    length: 100,
  }).notNull(),

  description: text("description"),

  slug: varchar("slug", {
    length: 120,
  }).unique(),

  theme: varchar("theme", {
    length: 50,
  }).default("apple-glass"),

  status: formStatusEnum().default("draft").notNull(),

  visibility: formVisibilityEnum().default("unlisted").notNull(),

  collectEmail: boolean("collect_email").default(false),

  allowMultipleResponses: boolean("allow_multiple_responses").default(false),

  creatorId: uuid("creator_id").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),

  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});
