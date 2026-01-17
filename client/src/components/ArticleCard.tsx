import { Link } from "wouter";
import { ArrowRight, Clock } from "lucide-react";
import type { Article } from "@shared/schema";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link href={`/articles/${article.id}`}>
      <div className="group h-full bg-card rounded-2xl overflow-hidden border border-border/50 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 cursor-pointer flex flex-col">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
          <img 
            src={article.imageUrl} 
            alt={article.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4 z-20">
            <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm uppercase tracking-wider">
              {article.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-slate-800 group-hover:text-primary transition-colors mb-2 line-clamp-2">
            {article.title}
          </h3>
          <p className="text-muted-foreground line-clamp-3 mb-4 flex-grow text-sm leading-relaxed">
            {article.summary}
          </p>
          
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock className="w-3 h-3 mr-1" />
              <span>5 menit baca</span>
            </div>
            <span className="text-primary font-semibold text-sm flex items-center group-hover:translate-x-1 transition-transform">
              Baca Selengkapnya <ArrowRight className="w-4 h-4 ml-1" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
