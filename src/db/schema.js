import {
  integer,
  pgTable,
  varchar,
  timestamp,
  boolean,
  serial,
  date,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  scjId: integer("scj_id").notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  roleId: integer("role_id").notNull(),
  isAdmin: boolean("is_admin").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const usersRelations = relations(usersTable, ({ many }) => ({
  exams: many(examsTable), // A user can have many exams
}));

export const examsTable = pgTable("exams", {
  id: serial("id").primaryKey(),
  createdBy: integer("created_by").notNull(), // Foreign key to usersTable
  title: varchar("title", { length: 255 }).notNull(),
  description: varchar("description", { length: 255 }).notNull(),
  duration: integer("duration"),
  deadline: date("deadline").notNull(),
  published: boolean("published").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const examsRelations = relations(examsTable, ({ one }) => ({
  author: one(usersTable, {
    fields: [examsTable.createdBy], // The foreign key in examsTable
    references: [usersTable.id], // The referenced key in usersTable
  }),
}));


