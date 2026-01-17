import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Clock, Tag } from "lucide-react";
import type { Article } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

export default function ArticleDetail() {
  const { id } = useParams();
  const [, setLocation] = useLocation();

  const { data: article, isLoading } = useQuery<Article>({
    queryKey: [`/api/articles/${id}`],
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-8 w-64 mb-6" />
        <Skeleton className="w-full h-64 md:h-96 rounded-lg mb-8" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Artikel tidak ditemukan</h1>
        <Button onClick={() => setLocation("/")}>Kembali ke Beranda</Button>
      </div>
    );
  }

  // Cast content to structured type
  const content = article.content as { paragraphs: string[]; points?: string[] };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Button
        variant="ghost"
        className="mb-6 hover-elevate"
        onClick={() => setLocation("/")}
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Kembali
      </Button>

      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
          <span className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
            <Tag className="h-3 w-3" />
            {article.category}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {new Date(article.createdAt || "").toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
          {article.title}
        </h1>
      </div>

      <div className="relative w-full h-64 md:h-[450px] mb-10 overflow-hidden rounded-2xl shadow-lg border">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          onError={(e) => {
             (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=1200&q=80";
          }}
        />
      </div>

      <Card className="border-none shadow-none bg-transparent">
        <CardContent className="p-0">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {content.paragraphs?.map((paragraph, index) => (
              <p key={index} className="text-muted-foreground leading-relaxed mb-6 text-lg">
                {paragraph}
              </p>
            ))}

            {content.points && content.points.length > 0 && (
              <div className="bg-muted/30 p-6 rounded-xl border border-muted-border mb-8">
                <h3 className="text-xl font-semibold mb-4 text-foreground">Poin Utama:</h3>
                <ul className="space-y-3">
                  {content.points.map((point, index) => (
                    <li key={index} className="flex items-start gap-3 text-muted-foreground">
                      <div className="mt-1.5 h-2 w-2 rounded-full bg-primary shrink-0" />
                      <span className="text-lg leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
