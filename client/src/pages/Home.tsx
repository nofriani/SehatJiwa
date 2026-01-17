import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, Shield, Heart } from "lucide-react";
import { useArticles, useVideos } from "@/hooks/use-content";
import { ArticleCard } from "@/components/ArticleCard";
import { VideoCard } from "@/components/VideoCard";

export default function Home() {
  const { data: articles, isLoading: articlesLoading } = useArticles();
  const { data: videos, isLoading: videosLoading } = useVideos();

  // Get featured items (first 3)
  const featuredArticles = articles?.slice(0, 3);
  const featuredVideos = videos?.slice(0, 3);

  return (
    <div className="min-h-screen">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent rounded-l-full blur-3xl opacity-60" />
          <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-accent/5 to-transparent rounded-r-full blur-3xl opacity-60" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
              #SehatJiwaUntukSemua
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-slate-900 mb-6 leading-tight">
              Kesehatan Mental Dimulai dari <span className="text-primary relative inline-block">
                Kesadaran
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-accent opacity-50" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 text-balance">
              Media edukasi digital yang akurat, inklusif, dan bersahabat untuk membantu Anda mengenali diri dan merawat jiwa.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/test">
                <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-primary text-white font-bold text-lg shadow-xl shadow-primary/30 hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                  Cek Kesehatan Mental
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <Link href="/articles">
                <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-slate-700 font-bold text-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                  Pelajari Lebih Lanjut
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Terpercaya & Akurat",
                desc: "Konten disusun berbasis bukti ilmiah dan dikurasi oleh ahli."
              },
              {
                icon: Heart,
                title: "Inklusif & Ramah",
                desc: "Dirancang untuk semua kalangan dengan bahasa yang mudah dipahami."
              },
              {
                icon: CheckCircle2,
                title: "Aksi Nyata",
                desc: "Strategi praktis untuk pengelolaan stres dan emosi sehari-hari."
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 rounded-3xl bg-secondary/30 border border-secondary text-center hover:bg-secondary/50 transition-colors"
              >
                <div className="w-16 h-16 mx-auto bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 text-primary">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Content */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-display font-bold text-slate-900 mb-2">Artikel Pilihan</h2>
              <p className="text-muted-foreground">Wawasan terbaru seputar kesehatan mental</p>
            </div>
            <Link href="/articles" className="hidden sm:flex items-center text-primary font-semibold hover:underline">
              Lihat Semua <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          {articlesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-96 rounded-2xl bg-slate-200 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredArticles?.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}
          
          <div className="mt-8 text-center sm:hidden">
            <Link href="/articles" className="inline-flex items-center text-primary font-semibold">
              Lihat Semua <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Videos Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-display font-bold text-slate-900 mb-2">Video Edukasi</h2>
              <p className="text-muted-foreground">Belajar visual lebih mudah dan menyenangkan</p>
            </div>
            <Link href="/videos" className="hidden sm:flex items-center text-primary font-semibold hover:underline">
              Lihat Semua <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          {videosLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-64 rounded-2xl bg-slate-200 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredVideos?.map(video => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto bg-white rounded-[2rem] p-12 shadow-xl border border-primary/10">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Jangan Hadapi Sendirian</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Temukan layanan profesional dan komunitas yang siap mendukung perjalanan kesehatan mental Anda.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/resources">
                <button className="px-8 py-3 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20">
                  Cari Bantuan Profesional
                </button>
              </Link>
              <Link href="/test">
                <button className="px-8 py-3 rounded-xl bg-white text-primary font-bold border-2 border-primary/20 hover:border-primary hover:bg-primary/5 transition-colors">
                  Cek Kondisi Saya
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
