import { Heart } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-white border-t border-border pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-primary fill-primary/20" />
              <span className="font-display font-bold text-xl text-foreground">
                Sehat<span className="text-primary">Jiwa</span>
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Platform edukasi kesehatan mental yang inklusif, akurat, dan ramah pengguna. 
              Membangun kesadaran dan resiliensi di era digital.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-foreground mb-4">Navigasi</h4>
            <ul className="space-y-2">
              {[
                { label: "Beranda", href: "/" },
                { label: "Artikel Edukasi", href: "/articles" },
                { label: "Video Edukasi", href: "/videos" },
                { label: "Tes Kesehatan Mental", href: "/test" },
                { label: "Layanan & Komunitas", href: "/resources" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Emergency */}
          <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
            <h4 className="font-bold text-red-700 mb-2 flex items-center gap-2">
              Butuh Bantuan Segera?
            </h4>
            <p className="text-red-600/80 text-sm mb-4">
              Jika Anda atau seseorang yang Anda kenal dalam bahaya, segera hubungi bantuan profesional.
            </p>
            <div className="space-y-2">
              <a href="tel:119" className="block w-full text-center bg-white border border-red-200 text-red-600 py-2 rounded-lg font-bold hover:bg-red-50 transition-colors">
                Panggilan Darurat 119
              </a>
              <Link href="/resources" className="block w-full text-center bg-red-600 text-white py-2 rounded-lg font-bold hover:bg-red-700 transition-colors shadow-sm">
                Lihat Hotline Lainnya
              </Link>
            </div>
          </div>

        </div>
        
        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} SehatJiwa. Dikembangkan oleh Pemuda Indonesia.</p>
        </div>
      </div>
    </footer>
  );
}
