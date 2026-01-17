import { 
  articles, videos, resources, testQuestions,
  type Article, type Video, type Resource, type TestQuestion 
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Articles
  getArticles(): Promise<Article[]>;
  getArticle(id: number): Promise<Article | undefined>;
  
  // Videos
  getVideos(): Promise<Video[]>;
  getVideo(id: number): Promise<Video | undefined>;

  // Resources
  getResources(): Promise<Resource[]>;

  // Test
  getTestQuestions(): Promise<TestQuestion[]>;

  // Seed Helpers (optional for prod, useful here)
  createArticle(article: any): Promise<Article>;
  createVideo(video: any): Promise<Video>;
  createResource(resource: any): Promise<Resource>;
  createTestQuestion(question: any): Promise<TestQuestion>;
}

export class DatabaseStorage implements IStorage {
  async getArticles(): Promise<Article[]> {
    return await db.select().from(articles);
  }

  async getArticle(id: number): Promise<Article | undefined> {
    const [article] = await db.select().from(articles).where(eq(articles.id, id));
    return article;
  }

  async getVideos(): Promise<Video[]> {
    return await db.select().from(videos);
  }

  async getVideo(id: number): Promise<Video | undefined> {
    const [video] = await db.select().from(videos).where(eq(videos.id, id));
    return video;
  }

  async getResources(): Promise<Resource[]> {
    return await db.select().from(resources);
  }

  async getTestQuestions(): Promise<TestQuestion[]> {
    return await db.select().from(testQuestions);
  }

  // Creation methods for seeding
  async createArticle(insertArticle: any): Promise<Article> {
    const [article] = await db.insert(articles).values(insertArticle).returning();
    return article;
  }

  async createVideo(insertVideo: any): Promise<Video> {
    const [video] = await db.insert(videos).values(insertVideo).returning();
    return video;
  }

  async createResource(insertResource: any): Promise<Resource> {
    const [resource] = await db.insert(resources).values(insertResource).returning();
    return resource;
  }

  async createTestQuestion(insertQuestion: any): Promise<TestQuestion> {
    const [question] = await db.insert(testQuestions).values(insertQuestion).returning();
    return question;
  }
}

export const storage = new DatabaseStorage();
