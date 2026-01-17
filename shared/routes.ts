import { z } from 'zod';
import { articles, videos, resources, testQuestions, insertArticleSchema, insertVideoSchema, insertResourceSchema, insertTestQuestionSchema } from './schema';

export const errorSchemas = {
  notFound: z.object({
    message: z.string(),
  }),
  validation: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  articles: {
    list: {
      method: 'GET' as const,
      path: '/api/articles',
      responses: {
        200: z.array(z.custom<typeof articles.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/articles/:id',
      responses: {
        200: z.custom<typeof articles.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
  },
  videos: {
    list: {
      method: 'GET' as const,
      path: '/api/videos',
      responses: {
        200: z.array(z.custom<typeof videos.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/videos/:id',
      responses: {
        200: z.custom<typeof videos.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
  },
  resources: {
    list: {
      method: 'GET' as const,
      path: '/api/resources',
      responses: {
        200: z.array(z.custom<typeof resources.$inferSelect>()),
      },
    },
  },
  test: {
    questions: {
      method: 'GET' as const,
      path: '/api/test/questions',
      responses: {
        200: z.array(z.custom<typeof testQuestions.$inferSelect>()),
      },
    },
    submit: {
      method: 'POST' as const,
      path: '/api/test/submit',
      input: z.object({
        answers: z.array(z.object({
          questionId: z.number(),
          score: z.number(),
        })),
      }),
      responses: {
        200: z.object({
          score: z.number(),
          interpretation: z.string(),
          level: z.enum(['low', 'moderate', 'high']),
        }),
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
