import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const emailVerificationTable = pgTable("email-verifications", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).notNull(),
  otp: varchar("otp", {
    length: 6,
  }).notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
