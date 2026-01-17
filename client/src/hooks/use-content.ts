import { useQuery, useMutation } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

// Articles
export function useArticles() {
  return useQuery({
    queryKey: [api.articles.list.path],
    queryFn: async () => {
      const res = await fetch(api.articles.list.path);
      if (!res.ok) throw new Error("Failed to fetch articles");
      return api.articles.list.responses[200].parse(await res.json());
    },
  });
}

export function useArticle(id: number) {
  return useQuery({
    queryKey: [api.articles.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.articles.get.path, { id });
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch article");
      return api.articles.get.responses[200].parse(await res.json());
    },
    enabled: !!id,
  });
}

// Videos
export function useVideos() {
  return useQuery({
    queryKey: [api.videos.list.path],
    queryFn: async () => {
      const res = await fetch(api.videos.list.path);
      if (!res.ok) throw new Error("Failed to fetch videos");
      return api.videos.list.responses[200].parse(await res.json());
    },
  });
}

export function useVideo(id: number) {
  return useQuery({
    queryKey: [api.videos.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.videos.get.path, { id });
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch video");
      return api.videos.get.responses[200].parse(await res.json());
    },
    enabled: !!id,
  });
}

// Resources
export function useResources() {
  return useQuery({
    queryKey: [api.resources.list.path],
    queryFn: async () => {
      const res = await fetch(api.resources.list.path);
      if (!res.ok) throw new Error("Failed to fetch resources");
      return api.resources.list.responses[200].parse(await res.json());
    },
  });
}

// Test
export function useTestQuestions() {
  return useQuery({
    queryKey: [api.test.questions.path],
    queryFn: async () => {
      const res = await fetch(api.test.questions.path);
      if (!res.ok) throw new Error("Failed to fetch questions");
      return api.test.questions.responses[200].parse(await res.json());
    },
  });
}

export function useSubmitTest() {
  return useMutation({
    mutationFn: async (answers: { questionId: number; score: number }[]) => {
      const res = await fetch(api.test.submit.path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });
      if (!res.ok) throw new Error("Failed to submit test");
      return api.test.submit.responses[200].parse(await res.json());
    },
  });
}
