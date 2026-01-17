import { useResources } from "@/hooks/use-content";
import { Phone, MapPin, Globe, Loader2, HeartHandshake } from "lucide-react";

export default function Resources() {
  const { data: resources, isLoading } = useResources();

  return (
    <div className="min-h-screen pt-24 pb-20 bg-slate-50">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-600 mb-6">
            <HeartHandshake className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-display font-bold text-slate-900 mb-4">Layanan & Komunitas</h1>
          <p className="text-lg text-muted-foreground">
            Jangan ragu untuk mencari bantuan. Berikut adalah daftar layanan profesional dan komunitas pendukung yang siap membantu Anda.
          </p>
        </div>

        {/* Emergency Banner */}
        <div className="bg-red-600 rounded-3xl p-8 mb-12 text-white shadow-xl shadow-red-900/20 max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold mb-2">Butuh Bantuan Darurat?</h3>
            <p className="text-red-100">Jika Anda dalam situasi krisis atau berbahaya, segera hubungi layanan darurat 119.</p>
          </div>
          <a href="tel:119" className="px-8 py-3 bg-white text-red-600 font-bold rounded-xl hover:bg-red-50 transition-colors shadow-lg">
            Panggil 119
          </a>
        </div>

        {/* Resources Grid */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {resources?.map((resource) => (
              <div 
                key={resource.id}
                className={`p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg ${
                  resource.isEmergency 
                    ? "bg-red-50 border-red-200" 
                    : "bg-white border-slate-200 hover:border-primary/50"
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                    resource.isEmergency ? "bg-red-200 text-red-800" : "bg-secondary text-secondary-foreground"
                  }`}>
                    {resource.type}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-3">{resource.name}</h3>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  {resource.description}
                </p>

                <div className="space-y-3 pt-4 border-t border-slate-100/50">
                  <div className="flex items-start gap-3 text-sm">
                    <Phone className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span className="font-medium text-slate-700">{resource.contactInfo}</span>
                  </div>
                  
                  {resource.location && (
                    <div className="flex items-start gap-3 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      <span>{resource.location}</span>
                    </div>
                  )}

                  {!resource.isEmergency && resource.contactInfo.includes('http') && (
                    <div className="flex items-start gap-3 text-sm">
                      <Globe className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      <a href={resource.contactInfo} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline truncate">
                        Kunjungi Website
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
