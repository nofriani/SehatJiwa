import { PlayCircle } from "lucide-react";
import type { Video } from "@shared/schema";
import { Link } from "wouter";

export function VideoCard({ video }: { video: Video }) {
  return (
    <Link href={`/videos/${video.id}`}>
      <div className="group relative bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-border">
        {/* Thumbnail */}
        <div className="aspect-video relative overflow-hidden bg-slate-100">
          <img 
            src={video.thumbnailUrl} 
            alt={video.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
            <div className="bg-white/20 backdrop-blur-md p-4 rounded-full border border-white/50 group-hover:scale-110 transition-transform duration-300">
              <PlayCircle className="w-8 h-8 text-white fill-white/20" />
            </div>
          </div>
        </div>
        
        {/* Info */}
        <div className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground text-[10px] font-bold uppercase tracking-wider">
              {video.category}
            </span>
          </div>
          <h3 className="font-bold text-lg text-slate-900 leading-tight mb-2 group-hover:text-primary transition-colors">
            {video.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {video.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
