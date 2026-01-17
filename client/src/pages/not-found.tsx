import { Link } from "wouter";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <div className="card w-full max-w-md p-8 bg-white shadow-xl rounded-2xl border border-gray-100 text-center">
        <div className="flex justify-center mb-6">
          <AlertCircle className="h-16 w-16 text-primary opacity-80" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-gray-600 mb-8 text-lg">
          Halaman yang Anda cari tidak ditemukan.
        </p>
        <Link href="/">
          <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-primary/20">
            Kembali ke Beranda
          </button>
        </Link>
      </div>
    </div>
  );
}
