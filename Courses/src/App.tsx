import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Code2, Trophy, ChevronRight, CheckCircle2, Github, Lock, 
  Award, CreditCard, User, X, Play, Info, Terminal, Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { LESSONS } from './data';
import { Certificate } from './components/Certificate';

export default function App() {
  const [currentMainIndex, setCurrentMainIndex] = useState(0);
  const [currentSubIndex, setCurrentSubIndex] = useState(0);
  const [completedSubLessons, setCompletedSubLessons] = useState<string[]>([]);
  const [xp, setXp] = useState(0);
  const [userName, setUserName] = useState('');
  const [solution, setSolution] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'unpaid' | 'processing' | 'paid'>('unpaid');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showNameInput, setShowNameInput] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [outputPreview, setOutputPreview] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const currentMain = LESSONS[currentMainIndex];
  const currentSub = currentMain.subLessons[currentSubIndex];

  useEffect(() => {
    setSolution(currentSub.givenCode);
    setOutputPreview('');
    setValidationError(null);
  }, [currentSub]);

  const handleRunCode = () => {
    if (solution.includes(currentSub.validationKeyword)) {
      setOutputPreview(currentSub.expectedOutput);
      setValidationError(null);
    } else {
      setOutputPreview("Compilation Error: Solution does not meet the requirements.");
      setValidationError("Your code doesn't seem to solve the challenge correctly.");
    }
  };

  const handleSolutionSubmit = async () => {
    if (!solution.includes(currentSub.validationKeyword)) {
      setValidationError("Incorrect solution. Please follow the rules and use the required parts.");
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (!completedSubLessons.includes(currentSub.id)) {
      setCompletedSubLessons([...completedSubLessons, currentSub.id]);
      let earnedXp = currentSub.xp;
      if (githubUrl.startsWith('https://github.com')) earnedXp += 25;
      setXp(prev => prev + earnedXp);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#004d4d', '#ffffff']
      });
    }
    
    setIsSubmitting(false);
    setValidationError(null);
  };

  const handleNext = () => {
    if (currentSubIndex < currentMain.subLessons.length - 1) {
      setCurrentSubIndex(prev => prev + 1);
    } else if (currentMainIndex < LESSONS.length - 1) {
      setCurrentMainIndex(prev => prev + 1);
      setCurrentSubIndex(0);
    } else {
      setShowPaymentModal(true);
    }
  };

  const handlePesaPalPayment = () => {
    setPaymentStatus('processing');
    setTimeout(() => {
      setPaymentStatus('paid');
      setShowPaymentModal(false);
      setShowNameInput(true);
    }, 2000);
  };

  const isLastSubLesson = currentMainIndex === LESSONS.length - 1 && currentSubIndex === currentMain.subLessons.length - 1;

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="glass-3d sticky top-0 z-50 px-6 py-4 mx-4 mt-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-gold to-teal-light rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-teal-900 font-black text-xl">C</span>
          </div>
          <div>
            <h1 className="font-bold text-xl tracking-tight text-gold">CODEON Africa</h1>
            <p className="text-[10px] uppercase tracking-[0.2em] text-teal-light font-bold">C Mastery Platform</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-teal-dark/50 px-4 py-2 rounded-full border border-teal-light/20 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-gold" />
            <span className="font-mono font-bold text-gold">{xp} XP</span>
          </div>
          <button className="w-10 h-10 rounded-full bg-teal-light/20 border border-teal-light/30 flex items-center justify-center">
            <User className="w-5 h-5 text-teal-light" />
          </button>
        </div>
      </nav>

      <main className="flex-1 flex flex-col lg:flex-row gap-6 p-6">
        <aside className="lg:w-80 flex flex-col gap-4">
          <div className="glass-3d p-6 flex-1 overflow-y-auto max-h-[calc(100vh-200px)]">
            <h2 className="font-bold text-lg mb-6 flex items-center gap-2 text-gold">
              <BookOpen className="w-5 h-5" /> Course Map
            </h2>
            <div className="space-y-6">
              {LESSONS.map((main, mIdx) => (
                <div key={main.id} className="space-y-2">
                  <h3 className={`text-xs font-black uppercase tracking-widest ${mIdx === currentMainIndex ? 'text-gold' : 'text-teal-light/60'}`}>
                    {main.title}
                  </h3>
                  <div className="space-y-1">
                    {main.subLessons.map((sub, sIdx) => {
                      const isCompleted = completedSubLessons.includes(sub.id);
                      const isActive = mIdx === currentMainIndex && sIdx === currentSubIndex;
                      const isLocked = mIdx > currentMainIndex || (mIdx === currentMainIndex && sIdx > currentSubIndex && !completedSubLessons.includes(main.subLessons[sIdx-1]?.id));
                      return (
                        <button
                          key={sub.id}
                          disabled={isLocked && !isCompleted}
                          onClick={() => { setCurrentMainIndex(mIdx); setCurrentSubIndex(sIdx); }}
                          className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between group ${isActive ? 'bg-gold/10 border border-gold/30 text-gold' : isCompleted ? 'text-emerald-400' : isLocked ? 'opacity-40 cursor-not-allowed' : 'hover:bg-teal-light/10 text-slate-400'}`}
                        >
                          <span className="text-sm font-medium truncate pr-2">{sub.title}</span>
                          {isCompleted ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : isLocked ? <Lock className="w-3 h-3 shrink-0" /> : <ChevronRight className="w-4 h-4 shrink-0 opacity-0 group-hover:opacity-100" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <section className="flex-1 flex flex-col gap-6">
          <div className="glass-3d p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-gold/20 text-gold text-[10px] font-black uppercase tracking-widest rounded-full border border-gold/30">
                Sub-Lesson {currentSubIndex + 1} of {currentMain.subLessons.length}
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-white">{currentSub.title}</h2>
            </div>
            <p className="text-slate-300 mb-6 leading-relaxed">{currentSub.description}</p>
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="bg-teal-dark/30 p-4 rounded-2xl border border-teal-light/10">
                <h4 className="text-xs font-bold text-gold uppercase mb-2 flex items-center gap-2"><Info className="w-3 h-3" /> Given Code</h4>
                <p className="text-xs text-slate-400 leading-tight">{currentSub.codeExplanation.given}</p>
              </div>
              <div className="bg-teal-dark/30 p-4 rounded-2xl border border-teal-light/10">
                <h4 className="text-xs font-bold text-emerald-400 uppercase mb-2 flex items-center gap-2"><CheckCircle2 className="w-3 h-3" /> Rules</h4>
                <p className="text-xs text-slate-400 leading-tight">{currentSub.codeExplanation.rules}</p>
              </div>
              <div className="bg-teal-dark/30 p-4 rounded-2xl border border-teal-light/10">
                <h4 className="text-xs font-bold text-teal-light uppercase mb-2 flex items-center gap-2"><Code2 className="w-3 h-3" /> To Use</h4>
                <p className="text-xs text-slate-400 leading-tight">{currentSub.codeExplanation.toUse}</p>
              </div>
            </div>
            <div className="bg-teal-dark/50 p-6 rounded-2xl border border-teal-light/20 mb-8">
              <h3 className="font-bold text-emerald-400 mb-2 flex items-center gap-2"><Trophy className="w-5 h-5" /> The Challenge</h3>
              <p className="text-slate-200">{currentSub.challenge}</p>
            </div>
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                  <h3 className="font-bold text-sm text-slate-400 flex items-center gap-2"><Terminal className="w-4 h-4" /> Solution Lab</h3>
                  <button onClick={handleRunCode} className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"><Play className="w-3 h-3" /> Run Preview</button>
                </div>
                <div className="relative flex bg-teal-dark/40 rounded-2xl border border-teal-light/10 overflow-hidden code-editor-3d min-h-[350px]">
                  <div className="w-10 bg-black/20 border-r border-white/5 flex flex-col items-center py-4 text-[10px] text-teal-300/20 font-mono select-none">
                    {(solution || "").split('\n').map((_, i) => <div key={i} className="h-6 leading-6">{i + 1}</div>)}
                  </div>
                  <textarea
                    value={solution}
                    onChange={(e) => setSolution(e.target.value)}
                    className="flex-1 bg-transparent text-emerald-400 p-4 font-mono text-sm focus:outline-none resize-none leading-6"
                    spellCheck="false"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase px-2">GitHub Commit URL (Optional Bonus +25 XP)</label>
                  <div className="relative">
                    <Github className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input type="url" placeholder="https://github.com/..." value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} className="w-full bg-teal-dark/30 border border-teal-light/20 rounded-xl py-3 pl-12 pr-4 text-sm text-slate-300 focus:border-gold/50 outline-none" />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-bold text-sm text-slate-400 px-2">Output Preview</h3>
                <div className="output-preview h-[150px] overflow-auto">
                  {outputPreview ? <pre className="whitespace-pre-wrap">{outputPreview}</pre> : <span className="text-slate-600 italic">Run your code to see the output preview...</span>}
                </div>
                <div className="glass-3d p-6 bg-gold/5 border-gold/10">
                  <h3 className="text-xs font-black text-gold uppercase tracking-widest mb-4">Submission Control</h3>
                  {validationError && <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs mb-4">{validationError}</div>}
                  <div className="flex flex-col gap-3">
                    <button onClick={handleSolutionSubmit} disabled={isSubmitting || completedSubLessons.includes(currentSub.id)} className="btn-3d flex items-center justify-center gap-2">
                      {isSubmitting ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : completedSubLessons.includes(currentSub.id) ? <>Completed <CheckCircle2 className="w-5 h-5" /></> : <>Submit Solution <ChevronRight className="w-5 h-5" /></>}
                    </button>
                    <button onClick={handleNext} disabled={!completedSubLessons.includes(currentSub.id)} className="btn-gold-3d flex items-center justify-center gap-2 disabled:opacity-30">
                      {isLastSubLesson ? 'Claim Certificate' : 'Next Lesson'} <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="p-8 text-center border-t border-teal-light/10 mt-12">
        <p className="text-slate-600 text-xs mb-2">© {new Date().getFullYear()} CODEON Africa | codeondigital.com</p>
        <p className="text-[10px] text-teal-300/20 uppercase tracking-[0.4em] font-bold">Empowering African Systems Engineering</p>
      </footer>

      <AnimatePresence>
        {showPaymentModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-teal-dark/90 backdrop-blur-md flex items-center justify-center p-6">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="glass-3d max-w-md w-full p-8 text-center relative">
              <button onClick={() => setShowPaymentModal(false)} className="absolute top-6 right-6 text-slate-500 hover:text-white"><X className="w-6 h-6" /></button>
              <div className="w-20 h-20 bg-gold/20 rounded-3xl flex items-center justify-center mx-auto mb-6"><CreditCard className="w-10 h-10 text-gold" /></div>
              <h2 className="text-2xl font-bold text-white mb-2">Unlock Your Diploma</h2>
              <p className="text-slate-400 mb-8">To receive your world-class C Systems Engineering certificate, a processing fee of 25,000 UGX is required.</p>
              <button onClick={handlePesaPalPayment} disabled={paymentStatus === 'processing'} className="w-full btn-gold-3d">{paymentStatus === 'processing' ? 'Processing...' : 'Pay 25,000 UGX with PesaPal'}</button>
            </motion.div>
          </motion.div>
        )}
        {showNameInput && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-teal-dark/90 backdrop-blur-md flex items-center justify-center p-6">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="glass-3d max-w-md w-full p-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Final Step</h2>
              <p className="text-slate-400 mb-8">Enter your full legal name for your official diploma.</p>
              <input type="text" placeholder="Full Name" value={userName} onChange={(e) => setUserName(e.target.value)} className="w-full bg-teal-dark/30 border border-teal-light/20 rounded-2xl py-4 px-6 text-lg text-white text-center mb-6 outline-none focus:border-gold" />
              <button onClick={() => { if (userName.trim()) { setShowNameInput(false); setShowCertificate(true); } }} className="w-full btn-3d">Generate Diploma</button>
            </motion.div>
          </motion.div>
        )}
        {showCertificate && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 overflow-y-auto">
            <div className="max-w-5xl w-full py-12">
              <div className="flex justify-between items-center mb-8 px-4">
                <h2 className="text-gold font-bold text-xl">Your Official Diploma</h2>
                <div className="flex gap-4">
                  <button onClick={() => window.print()} className="btn-gold-3d py-2 px-6 text-sm">Print Diploma</button>
                  <button onClick={() => setShowCertificate(false)} className="bg-white/10 text-white p-2 rounded-xl"><X className="w-6 h-6" /></button>
                </div>
              </div>
              <div id="certificate-print">
                <Certificate userName={userName} completionDate={new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} verificationCode={`CDN-${Math.random().toString(36).substring(2, 10).toUpperCase()}`} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
