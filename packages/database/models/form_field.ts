import {
    boolean,
    doublePrecision,
    jsonb,
    pgEnum,
    pgTable,
    text,
    timestamp,
    uuid,
    varchar,
} from "drizzle-orm/pg-core";

export const fieldTypeEnum = pgEnum("field_type", [
  "short_text",
  "long_text",
  "email",
  "number",
  "single_select",
  "multi_select",
  "dropdown",
  "checkbox",
  "rating",
  "date",
]);

export const formFieldsTable = pgTable("form_fields", {
  id: uuid("id").primaryKey().defaultRandom(),

  formId: uuid("form_id").notNull(),

  type: fieldTypeEnum().notNull(),

  label: varchar("label", {
    length: 255,
  }).notNull(),
  labelKey: varchar("label_key", {
    length: 120,
  }).notNull(),
  placeholder: varchar("placeholder", {
    length: 255,
  }),

  helperText: text("helper_text"),

  required: boolean("required").default(false),

  order: doublePrecision("order").notNull(),

  options: jsonb("options"),

  validations: jsonb("validations"),

  defaultValue: text("default_value"),

  createdAt: timestamp("created_at").defaultNow().notNull(),

  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});
