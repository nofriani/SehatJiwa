import { pgTable, text, serial, integer, jsonb, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===

export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: jsonb("content").notNull(), // Structured content: { paragraphs: string[], points: string[] }
  summary: text("summary").notNull(),
  category: text("category").notNull(),
  imageUrl: text("image_url").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const videos = pgTable("videos", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  videoUrl: text("video_url").notNull(),
  thumbnailUrl: text("thumbnail_url").notNull(),
  category: text("category").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const resources = pgTable("resources", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  description: text("description").notNull(),
  contactInfo: text("contact_info").notNull(),
  location: text("location"),
  isEmergency: boolean("is_emergency").default(false),
});

export const testQuestions = pgTable("test_questions", {
  id: serial("id").primaryKey(),
  questionText: text("question_text").notNull(),
  category: text("category").notNull(),
  options: jsonb("options").notNull(),
});

// === SCHEMAS ===

export const insertArticleSchema = createInsertSchema(articles).omit({ id: true, createdAt: true });
export const insertVideoSchema = createInsertSchema(videos).omit({ id: true, createdAt: true });
export const insertResourceSchema = createInsertSchema(resources).omit({ id: true });
export const insertTestQuestionSchema = createInsertSchema(testQuestions).omit({ id: true });

// === EXPLICIT TYPES ===

export type Article = typeof articles.$inferSelect;
export type Video = typeof videos.$inferSelect;
export type Resource = typeof resources.$inferSelect;
export type TestQuestion = typeof testQuestions.$inferSelect;

export type TestOption = {
  label: string;
  score: number;
};

export type ArticleContent = {
  paragraphs: string[];
  points?: string[];
};

// Response types
export type ArticleResponse = Article; // Keep it simple, frontend will cast
export type VideoResponse = Video;
export type ResourceResponse = Resource;
export type TestQuestionResponse = Omit<TestQuestion, 'options'> & { options: TestOption[] };

// Request types
export type CalculateScoreRequest = {
  answers: { questionId: number; score: number }[];
};

export type TestResultResponse = {
  score: number;
  interpretation: string;
  level: 'low' | 'moderate' | 'high';
};
