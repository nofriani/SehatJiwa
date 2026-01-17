import { useVideos } from "@/hooks/use-content";
import { VideoCard } from "@/components/VideoCard";
import { Loader2, Play } from "lucide-react";

export default function Videos() {
  const { data: videos, isLoading } = useVideos();

  return (
    <div className="min-h-screen pt-24 pb-20 bg-slate-900 text-slate-50">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary/20 text-primary mb-6">
            <Play className="w-6 h-6 fill-current" />
          </div>
          <h1 className="text-4xl font-display font-bold text-white mb-4">Video Edukasi</h1>
          <p className="text-lg text-slate-400">
            Pelajari konsep kesehatan mental melalui konten visual yang menarik dan mudah dipahami.
          </p>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos?.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
