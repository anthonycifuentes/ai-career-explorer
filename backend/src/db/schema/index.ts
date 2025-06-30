// src/db/schema/courses.ts
import { pgTable, text, varchar, numeric } from "drizzle-orm/pg-core";

export const courses = pgTable("courses", {
  id: varchar("id", { length: 36 }).primaryKey(), // UUID string
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  level: text("level", {
    enum: ["beginner", "intermediate", "advanced"],
  }).notNull(),
  duration: text("duration").notNull(), // e.g. "4 weeks", "10h", etc.
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  instructor: text("instructor").notNull(),
  tags: text("tags").array().notNull(), // PostgreSQL `text[]`
});
