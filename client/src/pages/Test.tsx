import { useTestQuestions, useSubmitTest } from "@/hooks/use-content";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ArrowRight, Check, RotateCcw } from "lucide-react";
import { Link } from "wouter";

export default function Test() {
  const { data: questions, isLoading } = useTestQuestions();
  const submitTest = useSubmitTest();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<{ questionId: number; score: number }[]>([]);
  const [result, setResult] = useState<any>(null);

  if (isLoading) return (
    <div className="min-h-screen pt-24 flex justify-center items-center">
      <Loader2 className="w-10 h-10 text-primary animate-spin" />
    </div>
  );

  const handleAnswer = async (score: number) => {
    if (!questions) return;
    
    const newAnswers = [...answers, { questionId: questions[currentStep].id, score }];
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(curr => curr + 1);
    } else {
      // Submit
      try {
        const res = await submitTest.mutateAsync(newAnswers);
        setResult(res);
      } catch (error) {
        console.error("Failed to submit test", error);
      }
    }
  };

  const restart = () => {
    setAnswers([]);
    setCurrentStep(0);
    setResult(null);
  };

  // Result View
  if (result) {
    return (
      <div className="min-h-screen pt-24 pb-20 bg-slate-50 flex items-center justify-center">
        <div className="container max-w-2xl px-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[2rem] p-8 md:p-12 shadow-xl border border-slate-100 text-center"
          >
            <div className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-6 ${
              result.level === 'high' ? 'bg-red-100 text-red-600' : 
              result.level === 'moderate' ? 'bg-orange-100 text-orange-600' :
              'bg-green-100 text-green-600'
            }`}>
              <Check className="w-10 h-10" />
            </div>
            
            <h2 className="text-3xl font-display font-bold mb-2">Hasil Tes Anda</h2>
            <p className="text-muted-foreground mb-8">Terima kasih telah melakukan pengecekan diri.</p>
            
            <div className="bg-slate-50 rounded-2xl p-6 mb-8 text-left">
              <h3 className="font-bold text-lg mb-2 text-slate-800">Interpretasi:</h3>
              <p className="text-slate-600 leading-relaxed">{result.interpretation}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Link href="/resources">
                <button className="w-full py-4 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
                  Lihat Rekomendasi Bantuan
                </button>
              </Link>
              <button 
                onClick={restart}
                className="w-full py-4 rounded-xl bg-white text-slate-600 font-bold border border-slate-200 hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" /> Ulangi Tes
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions?.[currentStep];

  return (
    <div className="min-h-screen pt-24 pb-20 bg-slate-50 flex flex-col">
      <div className="container max-w-3xl mx-auto px-4 flex-grow flex flex-col justify-center">
        
        {/* Progress */}
        <div className="mb-12">
          <div className="flex justify-between text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider">
            <span>Pertanyaan {currentStep + 1}</span>
            <span>dari {questions?.length}</span>
          </div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / (questions?.length || 1)) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          {currentQuestion && (
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-[2rem] p-8 md:p-12 shadow-xl border border-slate-100/50"
            >
              <span className="inline-block px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-bold uppercase mb-6">
                {currentQuestion.category}
              </span>
              
              <h2 className="text-2xl md:text-4xl font-display font-bold text-slate-900 mb-10 leading-tight">
                {currentQuestion.questionText}
              </h2>

              <div className="space-y-3">
                {currentQuestion.options.map((option: any, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(option.score)}
                    className="w-full text-left p-4 md:p-6 rounded-xl border-2 border-slate-100 hover:border-primary hover:bg-primary/5 transition-all duration-200 group flex justify-between items-center"
                  >
                    <span className="font-semibold text-slate-700 group-hover:text-primary text-lg">
                      {option.label}
                    </span>
                    <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-primary opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
