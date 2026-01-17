import { useVideo } from "@/hooks/use-content";
import { Link, useRoute } from "wouter";
import { ArrowLeft, Loader2 } from "lucide-react";

export default function VideoDetail() {
  const [, params] = useRoute("/videos/:id");
  const id = parseInt(params?.id || "0");
  const { data: video, isLoading, error } = useVideo(id);

  if (isLoading) return (
    <div className="min-h-screen pt-24 flex justify-center items-center bg-slate-900">
      <Loader2 className="w-8 h-8 text-primary animate-spin" />
    </div>
  );

  if (error || !video) return (
    <div className="min-h-screen pt-24 flex flex-col items-center justify-center text-center px-4 bg-slate-900 text-white">
      <h2 className="text-2xl font-bold mb-4">Video Tidak Ditemukan</h2>
      <Link href="/videos" className="text-primary hover:underline font-semibold">
        Kembali ke Galeri Video
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-900 text-white pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-5xl">
        
        <Link href="/videos" className="inline-flex items-center text-slate-400 hover:text-primary mb-8 font-medium transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali ke Video
        </Link>

        <div className="bg-black rounded-2xl overflow-hidden shadow-2xl border border-slate-800 aspect-video mb-8">
          <iframe 
            src={video.videoUrl} 
            title={video.title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          />
        </div>

        <div className="max-w-3xl">
          <div className="flex gap-2 mb-4">
            <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-bold uppercase tracking-wider">
              {video.category}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-6">{video.title}</h1>
          <div className="prose prose-invert prose-lg text-slate-300">
            <p>{video.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
