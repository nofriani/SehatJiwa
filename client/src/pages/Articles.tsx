import { useArticles } from "@/hooks/use-content";
import { ArticleCard } from "@/components/ArticleCard";
import { Loader2, Search } from "lucide-react";
import { useState } from "react";

export default function Articles() {
  const { data: articles, isLoading } = useArticles();
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Anxiety", "Depression", "Wellness", "Self-Care"];
  
  const filteredArticles = filter === "All" 
    ? articles 
    : articles?.filter(a => a.category === filter);

  return (
    <div className="min-h-screen pt-24 pb-20 bg-slate-50">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <h1 className="text-4xl font-display font-bold text-slate-900 mb-4">Artikel Edukasi</h1>
          <p className="text-lg text-muted-foreground">
            Kumpulan tulisan komprehensif untuk memahami kesehatan mental, mengenali gejala, dan strategi coping yang efektif.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                filter === cat 
                  ? "bg-primary text-white shadow-md shadow-primary/25" 
                  : "bg-white text-slate-600 border border-slate-200 hover:border-primary/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
          </div>
        ) : filteredArticles?.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
            <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-700">Tidak ada artikel ditemukan</h3>
            <p className="text-muted-foreground">Coba pilih kategori lain.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles?.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
