import {
  integer,
  pgTable,
  varchar,
  timestamp,
  boolean,
  date,
  text,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const usersTable = pgTable("users", {
  id: integer("id").primaryKey().notNull().generatedAlwaysAsIdentity({ startWith: 1000 }),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  scjId: integer("scj_id").notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  roleId: integer("role_id").notNull(),
  isAdmin: boolean("is_admin").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const examsTable = pgTable("exams", {
  id: integer("id").primaryKey().notNull().generatedAlwaysAsIdentity({ startWith: 1000 }),
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
  id: integer("id").primaryKey().notNull().generatedAlwaysAsIdentity({ startWith: 1000 }),
  examId: integer("exam_id")
    .notNull()
    .references(() => examsTable.id, { onDelete: "cascade" }),
  text: varchar("text", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const correctAnswersTable = pgTable("correct_answers", {
  id: integer("id").primaryKey().notNull().generatedAlwaysAsIdentity({ startWith: 2222 }),
  questionId: integer("question_id")
    .notNull()
    .unique()
    .references(() => questionsTable.id, { onDelete: "cascade" }),
  answerText: text("answer_text").notNull(),
  keywords: text("keywords").array().notNull(), // Array of important keywords
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const examAttemptsTable = pgTable("exam_attempts", {
  id: integer("id").primaryKey().notNull().generatedAlwaysAsIdentity({ startWith: 3333 }),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  examId: integer("exam_id")
    .notNull()
    .references(() => examsTable.id, { onDelete: "cascade" }),
  startedAt: timestamp("started_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
  completedAt: timestamp("completed_at"),
  score: integer("score"),
  status: varchar("status", { length: 50 }).default("Pending"),
});

export const rolesTable = pgTable("roles", {
  id: integer("id").primaryKey().notNull().generatedAlwaysAsIdentity({ startWith: 4444 }),
  name: text("name").unique().notNull(), 
  createdAt: timestamp("created_at").defaultNow(),
});

export const userRolesTable = pgTable("user_roles", {
  id: integer("id").primaryKey().notNull().generatedAlwaysAsIdentity({ startWith: 5555 }),
  userId: integer("user_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
  roleId: integer("role_id").notNull().references(() => rolesTable.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow(),
});

export const usersRelations = relations(usersTable, ({ many }) => ({
  exams: many(examsTable), // A user can have many exams
  attemptedExams: many(examAttemptsTable),
  userRoles: many(userRolesTable), // A user can have multiple roles
}));

export const rolesRelations = relations(rolesTable, ({ many }) => ({
  userRoles: many(userRolesTable), // A role can belong to multiple users
}));

export const userRolesRelations = relations(userRolesTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [userRolesTable.userId], // Foreign key in userRolesTable
    references: [usersTable.id], // Primary key in usersTable
  }),
  role: one(rolesTable, {
    fields: [userRolesTable.roleId], // Foreign key in userRolesTable
    references: [rolesTable.id], // Primary key in rolesTable
  }),
}));

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
    fields: [questionsTable.id],
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

export const attemptedAnswersTable = pgTable("attempted_answers", {
  id: integer("id").primaryKey().notNull().generatedAlwaysAsIdentity({ startWith: 6666 }),
  attemptExamId: integer("attempted_exam_id")
    .notNull()
    .references(() => examAttemptsTable.id, { onDelete: "cascade" }), // Links to an exam attempt
  questionId: integer("question_id")
    .notNull()
    .references(() => questionsTable.id, { onDelete: "cascade" }), // Links to a specific question
  answerText: text("answer_text").notNull(), // The student's answer
  marksAwarded: integer("marks_awarded").default(0), // Marks awarded after evaluation
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const examAttemptsRelations = relations(
  examAttemptsTable,
  ({ one, many }) => ({
    user: one(usersTable, {
      fields: [examAttemptsTable.userId],
      references: [usersTable.id],
    }),
    exam: one(examsTable, {
      fields: [examAttemptsTable.examId],
      references: [examsTable.id],
    }),
    attemptedAnswers: many(attemptedAnswersTable),
  })
);

export const attemptedAnswersRelations = relations(attemptedAnswersTable, ({ one }) => ({
  attempt: one(examAttemptsTable, { fields: [attemptedAnswersTable.attemptExamId], references: [examAttemptsTable.id] }),
  question: one(questionsTable, { fields: [attemptedAnswersTable.questionId], references: [questionsTable.id] }),
}));