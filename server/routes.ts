import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // Articles
  app.get(api.articles.list.path, async (req, res) => {
    const articles = await storage.getArticles();
    res.json(articles);
  });

  app.get(api.articles.get.path, async (req, res) => {
    const article = await storage.getArticle(Number(req.params.id));
    if (!article) return res.status(404).json({ message: "Article not found" });
    res.json(article);
  });

  // Videos
  app.get(api.videos.list.path, async (req, res) => {
    const videos = await storage.getVideos();
    // LIMIT TO EXACTLY 2
    res.json(videos.slice(0, 2));
  });

  app.get(api.videos.get.path, async (req, res) => {
    const video = await storage.getVideo(Number(req.params.id));
    if (!video) return res.status(404).json({ message: "Video not found" });
    res.json(video);
  });

  // Resources
  app.get(api.resources.list.path, async (req, res) => {
    const resources = await storage.getResources();
    res.json(resources);
  });

  // Test
  app.get(api.test.questions.path, async (req, res) => {
    const questions = await storage.getTestQuestions();
    res.json(questions);
  });

  app.post(api.test.submit.path, async (req, res) => {
    try {
      const { answers } = api.test.submit.input.parse(req.body);
      const totalScore = answers.reduce((acc, curr) => acc + curr.score, 0);
      let level: 'low' | 'moderate' | 'high' = 'low';
      let interpretation = "Kondisi mental Anda tampak stabil. Terus jaga kesehatan jiwa Anda!";

      if (totalScore >= 30) {
        level = 'high';
        interpretation = "Anda mungkin mengalami tingkat stres atau tekanan yang tinggi. Disarankan untuk berkonsultasi dengan profesional.";
      } else if (totalScore >= 15) {
        level = 'moderate';
        interpretation = "Anda mengalami tekanan sedang. Luangkan waktu untuk istirahat dan kelola stres.";
      }

      res.json({ score: totalScore, interpretation, level });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input" });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingArticles = await storage.getArticles();
  if (existingArticles.length > 0) return;

  console.log("Seeding database...");

  // Articles with high-quality reliable images
  await storage.createArticle({
    title: "Mengenal Kecemasan (Anxiety)",
    summary: "Apa itu kecemasan dan bagaimana cara mengenalinya? Pelajari tanda-tanda awal dan perbedaannya dengan rasa takut biasa.",
    content: {
      paragraphs: [
        "Kecemasan adalah respon alami tubuh terhadap stres. Ini adalah perasaan takut atau khawatir tentang apa yang akan datang. Misalnya, hari pertama sekolah atau wawancara kerja dapat menyebabkan kebanyakan orang merasa takut dan gugup.",
        "Namun, jika perasaan cemas Anda ekstrem, berlangsung lebih dari enam bulan, dan mengganggu hidup Anda, Anda mungkin memiliki gangguan kecemasan. Penting untuk mengenali gejala-gejala ini sedini mungkin agar Anda bisa mendapatkan dukungan yang tepat."
      ],
      points: [
        "Merasa gugup, gelisah, atau tegang secara terus-menerus.",
        "Rasa bahaya yang akan datang, panik, atau malapetaka.",
        "Detak jantung meningkat dan napas menjadi cepat.",
        "Gemetar atau merasa lemas dan lelah.",
        "Sulit berkonsentrasi pada hal lain selain kekhawatiran saat ini."
      ]
    },
    category: "Edukasi",
    imageUrl: "https://images.unsplash.com/photo-1474418397713-7ede21d46114?auto=format&fit=crop&w=1200&q=80"
  });

  await storage.createArticle({
    title: "Pentingnya Tidur untuk Kesehatan Mental",
    summary: "Tidur yang cukup bukan hanya untuk fisik, tapi juga fondasi utama kesehatan mental yang baik.",
    content: {
      paragraphs: [
        "Tidur dan kesehatan mental berhubungan erat. Kualitas tidur yang buruk dapat memperburuk kondisi kesehatan mental Anda, sementara tidur yang baik dapat membantu menjaga keseimbangan emosional.",
        "Penelitian menunjukkan bahwa orang yang kurang tidur lebih rentan terhadap stres dan perubahan suasana hati yang drastis. Tidur memberikan waktu bagi otak untuk memproses informasi dan memulihkan energi emosional."
      ],
      points: [
        "Membantu mengatur suasana hati dan stabilitas emosi.",
        "Meningkatkan fungsi kognitif, fokus, dan konsentrasi.",
        "Mengurangi risiko jangka panjang depresi dan kecemasan.",
        "Memberikan waktu bagi otak untuk proses detoksifikasi alami.",
        "Mendukung sistem kekebalan tubuh yang berdampak pada kesehatan jiwa."
      ]
    },
    category: "Wellness",
    imageUrl: "https://images.unsplash.com/photo-1511295742364-917e7bb11ddf?auto=format&fit=crop&w=1200&q=80"
  });

  await storage.createArticle({
    title: "Strategi Praktis Mengelola Stres",
    summary: "Berbagai teknik sederhana yang bisa Anda terapkan setiap hari untuk meredakan tekanan mental.",
    content: {
      paragraphs: [
        "Stres adalah bagian dari kehidupan yang tidak bisa dihindari, tetapi kita bisa belajar cara mengatasinya agar tidak berdampak buruk pada kesehatan jangka panjang.",
        "Teknik pengelolaan stres tidak harus rumit. Seringkali, tindakan kecil yang dilakukan secara konsisten dapat membawa perubahan besar pada cara kita merasakan tekanan sehari-hari."
      ],
      points: [
        "Latihan pernapasan dalam: Ambil napas melalui hidung, tahan, dan buang perlahan.",
        "Menulis jurnal: Tuangkan perasaan dan pikiran Anda ke dalam tulisan secara rutin.",
        "Berjalan kaki di alam: Udara segar dan aktivitas fisik ringan membantu menjernihkan pikiran.",
        "Batasi penggunaan media sosial: Hindari paparan informasi negatif yang berlebihan.",
        "Berbicara dengan orang terpercaya: Jangan memendam beban mental sendirian."
      ]
    },
    category: "Tips",
    imageUrl: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=1200&q=80"
  });

  // EXACTLY 2 Videos
  await storage.createVideo({
    title: "Apa itu Kesehatan Mental?",
    description: "Penjelasan sederhana tentang pentingnya kesehatan mental dalam kehidupan kita.",
    videoUrl: "https://www.youtube.com/embed/3QIfkeA6HBY",
    thumbnailUrl: "https://images.unsplash.com/photo-1527137342181-19aab11a8ee1?auto=format&fit=crop&w=800&q=80",
    category: "Edukasi"
  });

  await storage.createVideo({
    title: "Meditasi 5 Menit",
    description: "Panduan meditasi singkat untuk menenangkan pikiran.",
    videoUrl: "https://www.youtube.com/embed/inpok4MKVLM",
    thumbnailUrl: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80",
    category: "Relaksasi"
  });

  // Resources
  await storage.createResource({
    name: "Layanan Konsultasi Psikologi SehatJiwa",
    type: "Konseling",
    description: "Layanan konseling profesional dengan psikolog klinis berlisensi.",
    contactInfo: "0812-3456-7890 (WhatsApp)",
    location: "Jakarta",
    isEmergency: false
  });

  await storage.createResource({
    name: "Hotline Pencegahan Bunuh Diri (LISA)",
    type: "Hotline",
    description: "Layanan darurat 24 jam untuk pencegahan bunuh diri dan krisis kesehatan mental.",
    contactInfo: "119",
    location: "Nasional",
    isEmergency: true
  });

  console.log("Database seeded successfully.");
}
