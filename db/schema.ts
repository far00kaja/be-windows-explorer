import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

export const menu = pgTable("menu", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  parentId: integer("parent_id"),
  status: boolean("status").default(true),
});

export const mDirectory = pgTable("m_directory", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  parent: integer("parent"),
  status: boolean("status").default(true),
  created_at: timestamp().defaultNow(),
  updated_at: timestamp().defaultNow(),
});
