import {
  integer,
  pgTable,
  varchar,
  timestamp,
  boolean,
  serial,
  date,
  text
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
  createdBy: integer("created_by")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  description: varchar("description", { length: 255 }).notNull(),
  duration: integer("duration"),
  deadline: date("deadline").notNull(),
  published: boolean("published").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const questionsTable = pgTable("questions", {
  id: serial("id").primaryKey(),
  examId: integer("exam_id")
    .notNull()
    .references(() => examsTable.id, { onDelete: "cascade" }),
  text: varchar("text", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const correctAnswersTable = pgTable("correct_answers", {
  id: serial("id").primaryKey(),
  questionId: integer("question_id")
    .notNull()
    .unique()
    .references(() => questionsTable.id, { onDelete: "cascade" }),
  answerText: text("answer_text").notNull(),
  keywords: text("keywords").array().notNull(), // Array of important keywords
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const examsRelations = relations(examsTable, ({ one, many }) => ({
  author: one(usersTable, {
    fields: [examsTable.createdBy], // The foreign key in examsTable
    references: [usersTable.id], // The referenced key in usersTable
  }),
  questions: many(questionsTable), // One Exam can have many Questions
}));

export const questionRelations = relations(questionsTable, ({ one }) => ({
  exam: one(examsTable, {
    fields: [questionsTable.examId],
    references: [examsTable.id],
  }),
  correctAnswer: one(correctAnswersTable, {
    fields: questionsTable.id,
    references: [correctAnswersTable.questionId],
  }),
}));

export const correctAnswersRelations = relations(
  correctAnswersTable,
  ({ one }) => ({
    question: one(questionsTable, {
      fields: [correctAnswersTable.questionId],
      references: [questionsTable.id],
    }),
  })
);
