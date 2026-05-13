import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Code2, 
  Trophy, 
  ChevronRight, 
  CheckCircle2, 
  Github, 
  Lock, 
  Award,
  CreditCard,
  User,
  X,
  Play,
  Info,
  Terminal,
  ArrowLeft,
  Sparkles,
  ExternalLink,
  Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import ReactMarkdown from 'react-markdown';
import { MasteryCertificate } from './components/MasteryCertificate';

interface SubLesson {
  id: string;
  title: string;
  description: string;
  content: string;
  givenCode?: string;
  codeExplanation?: {
    given: string;
    rules: string;
    toUse: string;
  };
  challenge?: string;
  expectedOutput?: string;
  validationKeyword?: string;
  xp: number;
  hideEditor?: boolean;
}

interface MainLesson {
  id: string;
  title: string;
  subLessons: SubLesson[];
}

interface MasteryAppProps {
  lessons: MainLesson[];
  courseTitle: string;
  courseSubtitle: string;
  courseId: string;
  language: string;
}

export default function MasteryApp({ lessons, courseTitle, courseSubtitle, courseId, language }: MasteryAppProps) {
  const [currentMainIndex, setCurrentMainIndex] = useState(0);
  const [currentSubIndex, setCurrentSubIndex] = useState(0);
  const [completedSubLessons, setCompletedSubLessons] = useState<string[]>([]);
  const [xp, setXp] = useState(0);
  const [userName, setUserName] = useState('');
  const [solution, setSolution] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [githubBonusAwarded, setGithubBonusAwarded] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'unpaid' | 'processing' | 'paid'>('unpaid');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showNameInput, setShowNameInput] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [certificateData, setCertificateData] = useState<{ name: string; date: string; code: string; hasGithubBonus: boolean } | null>(null);
  const [outputPreview, setOutputPreview] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const currentMain = lessons[currentMainIndex];
  const currentSub = currentMain.subLessons[currentSubIndex];

  useEffect(() => {
    setSolution(currentSub.givenCode || '');
    setOutputPreview('');
    setValidationError(null);
  }, [currentSub]);

  const handleRunCode = () => {
    const isValid = !currentSub.validationKeyword || solution.includes(currentSub.validationKeyword);
    
    if (isValid) {
      setOutputPreview(currentSub.expectedOutput || 'Success!');
      setValidationError(null);
    } else {
      setOutputPreview(`Syntax Error: Solution does not meet the requirements.`);
      setValidationError("Your code doesn't seem to solve the challenge correctly.");
    }
  };

  const handleSolutionSubmit = async () => {
    if (!currentSub.hideEditor) {
      const isRunOnlyChallenge = currentSub.challenge?.toLowerCase().includes("run it");
      
      if (!isRunOnlyChallenge && currentSub.givenCode && solution.trim() === currentSub.givenCode.trim()) {
        setValidationError("Please complete the assignment before submitting. You haven't changed the starter code.");
        return;
      }
      
      if (currentSub.validationKeyword && !solution.includes(currentSub.validationKeyword)) {
        setValidationError("Incorrect solution. Please follow the rules and use the required parts.");
        return;
      }

      if (isRunOnlyChallenge && !outputPreview) {
        setValidationError("Please run the code first to see the output before submitting.");
        return;
      }
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (!completedSubLessons.includes(currentSub.id)) {
      setCompletedSubLessons([...completedSubLessons, currentSub.id]);
      let earnedXp = currentSub.xp;
      if (githubUrl.startsWith('https://github.com')) {
        earnedXp += 25;
        setGithubBonusAwarded([...githubBonusAwarded, currentSub.id]);
      }
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

  const handleGithubBonusSubmit = () => {
    if (githubUrl.startsWith('https://github.com') && !githubBonusAwarded.includes(currentSub.id)) {
      setXp(prev => prev + 25);
      setGithubBonusAwarded([...githubBonusAwarded, currentSub.id]);
      confetti({
        particleCount: 50,
        spread: 50,
        origin: { y: 0.8 },
        colors: ['#D4AF37', '#ffffff']
      });
    } else if (!githubUrl.startsWith('https://github.com')) {
      setValidationError("Please provide a valid GitHub repository URL (starts with https://github.com).");
    }
  };

  const canGoToNext = completedSubLessons.includes(currentSub.id);

  const handleNext = () => {
    if (!canGoToNext) {
      setValidationError("Please complete the assignment before proceeding.");
      return;
    }
    
    if (currentSubIndex < currentMain.subLessons.length - 1) {
      setCurrentSubIndex(prev => prev + 1);
    } else if (currentMainIndex < lessons.length - 1) {
      setCurrentMainIndex(prev => prev + 1);
      setCurrentSubIndex(0);
    } else {
      setShowPaymentModal(true);
    }
  };

  const handleCertificateClaim = () => {
    if (userName.trim()) {
      const code = `CDN-${courseId}-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
      const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      setCertificateData({ 
        name: userName, 
        date, 
        code,
        hasGithubBonus: githubBonusAwarded.length > 0
      });
      setShowNameInput(false);
      setShowCertificate(true);
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#D4AF37', '#ffffff', '#004d4d']
      });
    }
  };

  const handlePesaPalPayment = () => {
    setPaymentStatus('processing');
    // Simulate redirect to PesaPal
    const pesapalUrl = `https://www.pesapal.com/checkout?amount=25000&currency=UGX&description=Certification+Fee&reference=${courseId}-${Date.now()}`;
    
    // For this demo, we simulate the payment flow with a "Redirecting" state
    setTimeout(() => {
      setPaymentStatus('paid');
      setShowPaymentModal(false);
      setShowNameInput(true);
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#004d4d', '#ffffff']
      });
    }, 3000);
  };

  const isLastSubLesson = currentMainIndex === lessons.length - 1 && currentSubIndex === currentMain.subLessons.length - 1;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="glass-3d sticky top-0 z-50 px-6 py-4 mx-4 mt-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-gold to-teal-light rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-teal-900 font-black text-xl">{courseTitle[0]}</span>
            </div>
            <div>
              <h1 className="font-bold text-xl tracking-tight text-gold">CODEON Africa</h1>
              <p className="text-[10px] uppercase tracking-[0.2em] text-teal-light font-bold">{courseTitle} Mastery</p>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-6 pl-6 border-l border-teal-light/20">
            <a href="index.html" className="text-sm font-bold text-slate-300 hover:text-gold transition-colors flex items-center gap-2">
              <BookOpen className="w-4 h-4" /> Home
            </a>
            <a href="articles.html" className="text-sm font-bold text-slate-300 hover:text-gold transition-colors flex items-center gap-2">
              <Info className="w-4 h-4" /> Articles
            </a>
            <a href="community-codeon.html" className="text-sm font-bold text-slate-300 hover:text-gold transition-colors flex items-center gap-2">
              <User className="w-4 h-4" /> Community
            </a>
            <a href="github.html" className="text-sm font-bold text-slate-300 hover:text-gold transition-colors flex items-center gap-2">
              <Github className="w-4 h-4" /> GitHub
            </a>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="md:hidden group relative">
            <button className="p-2 text-slate-300 hover:text-gold">
              <div className="w-6 h-0.5 bg-current mb-1"></div>
              <div className="w-6 h-0.5 bg-current mb-1"></div>
              <div className="w-6 h-0.5 bg-current"></div>
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-teal-dark border border-teal-light/20 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all p-2 z-[60]">
              <a href="index.html" className="block p-3 hover:bg-teal-light/10 rounded-lg text-sm font-bold">Home</a>
              <a href="articles.html" className="block p-3 hover:bg-teal-light/10 rounded-lg text-sm font-bold">Articles</a>
              <a href="community-codeon.html" className="block p-3 hover:bg-teal-light/10 rounded-lg text-sm font-bold">Community</a>
              <a href="github.html" className="block p-3 hover:bg-teal-light/10 rounded-lg text-sm font-bold">GitHub</a>
            </div>
          </div>
          <div className="bg-teal-dark/50 px-4 py-2 rounded-full border border-teal-light/20 flex items-center gap-2 relative group">
            <Trophy className="w-4 h-4 text-gold" />
            <span className="font-mono font-bold text-gold">{xp} XP</span>
            {githubBonusAwarded.length > 0 && (
              <div className="flex items-center gap-1 ml-1 pl-2 border-l border-teal-light/20">
                <Github className="w-3 h-3 text-teal-light" />
                <span className="text-[8px] font-bold text-teal-light">+{githubBonusAwarded.length * 25}</span>
              </div>
            )}
            <div className="absolute top-full right-0 mt-2 p-2 bg-teal-dark border border-teal-light/20 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all text-[10px] text-slate-300 whitespace-nowrap z-[60]">
              {githubBonusAwarded.length > 0 ? (
                <span>Includes {githubBonusAwarded.length * 25} XP from GitHub integration</span>
              ) : (
                <span>Complete lessons to earn XP!</span>
              )}
            </div>
          </div>
          <button className="w-10 h-10 rounded-full bg-teal-light/20 border border-teal-light/30 flex items-center justify-center hover:bg-teal-light/30 transition-all">
            <User className="w-5 h-5 text-teal-light" />
          </button>
        </div>
      </nav>

      <main className="flex-1 flex flex-col lg:flex-row gap-6 p-6">
        {/* Sidebar */}
        <aside className="lg:w-80 flex flex-col gap-4">
          <div className="glass-3d p-6 flex-1 overflow-y-auto max-h-[calc(100vh-200px)]">
            <h2 className="font-bold text-lg mb-6 flex items-center gap-2 text-gold">
              <BookOpen className="w-5 h-5" />
              Course Map
            </h2>
            <div className="space-y-6">
              {lessons.map((main, mIdx) => (
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
                          onClick={() => {
                            setCurrentMainIndex(mIdx);
                            setCurrentSubIndex(sIdx);
                          }}
                          className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between group ${
                            isActive ? 'bg-gold/10 border border-gold/30 text-gold' : 
                            isCompleted ? 'text-emerald-400' : 
                            isLocked ? 'opacity-40 cursor-not-allowed' : 'hover:bg-teal-light/10 text-slate-400'
                          }`}
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

        {/* Content */}
        <section className="flex-1 flex flex-col gap-6">
          <div className="glass-3d p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-gold/20 text-gold text-[10px] font-black uppercase tracking-widest rounded-full border border-gold/30">
                Sub-Lesson {currentSubIndex + 1} of {currentMain.subLessons.length}
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-white">{currentSub.title}</h2>
            </div>
            
            <div className="text-slate-300 mb-6 leading-relaxed prose prose-invert prose-sm max-w-none prose-a:text-gold prose-a:no-underline hover:prose-a:underline">
              <ReactMarkdown>{currentSub.content}</ReactMarkdown>
            </div>
            
            {!currentSub.hideEditor && currentSub.codeExplanation && (
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="bg-teal-dark/30 p-4 rounded-2xl border border-teal-light/10">
                  <h4 className="text-xs font-bold text-gold uppercase mb-2 flex items-center gap-2">
                    <Info className="w-3 h-3" /> Given Code
                  </h4>
                  <p className="text-xs text-slate-400 leading-tight">{currentSub.codeExplanation.given}</p>
                </div>
                <div className="bg-teal-dark/30 p-4 rounded-2xl border border-teal-light/10">
                  <h4 className="text-xs font-bold text-emerald-400 uppercase mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-3 h-3" /> Rules
                  </h4>
                  <p className="text-xs text-slate-400 leading-tight">{currentSub.codeExplanation.rules}</p>
                </div>
                <div className="bg-teal-dark/30 p-4 rounded-2xl border border-teal-light/10">
                  <h4 className="text-xs font-bold text-teal-light uppercase mb-2 flex items-center gap-2">
                    <Code2 className="w-3 h-3" /> To Use
                  </h4>
                  <p className="text-xs text-slate-400 leading-tight">{currentSub.codeExplanation.toUse}</p>
                </div>
              </div>
            )}

            {!currentSub.hideEditor && currentSub.challenge && (
              <div className="bg-teal-dark/50 p-6 rounded-2xl border border-teal-light/20 mb-8">
                <h3 className="font-bold text-emerald-400 mb-2 flex items-center gap-2">
                  <Trophy className="w-5 h-5" /> The Challenge
                </h3>
                <p className="text-slate-200">{currentSub.challenge}</p>
              </div>
            )}

            {!currentSub.hideEditor ? (
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between px-2">
                    <h3 className="font-bold text-sm text-slate-400 flex items-center gap-2">
                      <Terminal className="w-4 h-4" /> {language} Lab
                    </h3>
                    <button 
                      onClick={handleRunCode}
                      className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors"
                    >
                      <Play className="w-3 h-3" /> Run Preview
                    </button>
                  </div>
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-gold/20 to-teal-500/20 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                    <div className="relative flex bg-teal-dark/40 rounded-2xl border border-teal-light/10 overflow-hidden code-editor-3d min-h-[350px]">
                      <div className="w-10 bg-black/20 border-r border-white/5 flex flex-col items-center py-4 text-[10px] text-teal-300/20 font-mono select-none">
                        {(solution || "").split('\n').map((_, i) => (
                          <div key={i} className="h-6 leading-6">{i + 1}</div>
                        ))}
                      </div>
                      <textarea
                        value={solution}
                        onChange={(e) => setSolution(e.target.value)}
                        className="flex-1 bg-transparent text-emerald-400 p-4 font-mono text-sm focus:outline-none resize-none leading-6"
                        spellCheck="false"
                        placeholder={`# Write your ${language} solution here...`}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold text-sm text-slate-400 px-2">Output Preview</h3>
                  <div className="output-preview h-[150px] overflow-auto">
                    {outputPreview ? (
                      <pre className="whitespace-pre-wrap">{outputPreview}</pre>
                    ) : (
                      <span className="text-slate-600 italic">Run your code to see the output preview...</span>
                    )}
                  </div>

                  <div className="glass-3d p-6 bg-gold/5 border-gold/10">
                    <h3 className="text-xs font-black text-gold uppercase tracking-widest mb-4">Submission Control</h3>
                    {validationError && (
                      <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs mb-4">
                        {validationError}
                      </div>
                    )}
                    <div className="flex flex-col gap-3">
                      <button
                        onClick={handleSolutionSubmit}
                        disabled={isSubmitting || completedSubLessons.includes(currentSub.id)}
                        className="btn-3d flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : completedSubLessons.includes(currentSub.id) ? (
                          <>Completed <CheckCircle2 className="w-5 h-5" /></>
                        ) : (
                          <>Submit Solution <ChevronRight className="w-5 h-5" /></>
                        )}
                      </button>

                      {completedSubLessons.includes(currentSub.id) && !githubBonusAwarded.includes(currentSub.id) && (
                        <motion.div 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-4 bg-teal-dark/30 rounded-xl border border-gold/20"
                        >
                          <div className="flex items-center gap-2 mb-3">
                            <Sparkles className="w-4 h-4 text-gold" />
                            <h4 className="text-xs font-bold text-gold uppercase">Bonus XP Opportunity</h4>
                          </div>
                          <p className="text-[10px] text-slate-400 mb-3">
                            Share your solution on GitHub to earn an additional <span className="text-gold font-bold">25 XP</span>!
                          </p>
                          <div className="flex gap-2">
                            <div className="relative flex-1">
                              <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                              <input 
                                type="text"
                                placeholder="https://github.com/..."
                                value={githubUrl}
                                onChange={(e) => setGithubUrl(e.target.value)}
                                className="w-full bg-black/20 border border-teal-light/20 rounded-lg py-2 pl-9 pr-3 text-xs text-white focus:outline-none focus:border-gold/50 transition-all"
                              />
                            </div>
                            <button 
                              onClick={handleGithubBonusSubmit}
                              className="px-3 py-2 bg-gold text-teal-900 text-[10px] font-bold rounded-lg hover:bg-gold/80 transition-all flex items-center gap-1"
                            >
                              Claim <Award className="w-3 h-3" />
                            </button>
                          </div>
                        </motion.div>
                      )}

                      {githubBonusAwarded.includes(currentSub.id) && (
                        <motion.div 
                          initial={{ scale: 0.95 }}
                          animate={{ scale: 1 }}
                          className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center gap-3"
                        >
                          <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                            <Github className="w-4 h-4 text-emerald-400" />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">GitHub Bonus Awarded</p>
                            <p className="text-[10px] text-emerald-400/60">+25 XP Integrated</p>
                          </div>
                        </motion.div>
                      )}
                      
                      <button
                        onClick={handleNext}
                        disabled={!canGoToNext}
                        className="btn-gold-3d flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        {isLastSubLesson ? 'Claim Certificate' : 'Next Lesson'} <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mb-6">
                  <BookOpen className="w-10 h-10 text-gold" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Theory Mastery</h3>
                <p className="text-slate-400 max-w-md mb-8">
                  This lesson focuses on foundational concepts. Read the content above carefully to master the theory.
                </p>
                <div className="flex flex-col gap-3 w-full max-w-xs">
                  <button
                    onClick={handleSolutionSubmit}
                    disabled={isSubmitting || completedSubLessons.includes(currentSub.id)}
                    className="btn-3d flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : completedSubLessons.includes(currentSub.id) ? (
                      <>Completed <CheckCircle2 className="w-5 h-5" /></>
                    ) : (
                      <>Mark as Mastered <CheckCircle2 className="w-5 h-5" /></>
                    )}
                  </button>

                  {completedSubLessons.includes(currentSub.id) && !githubBonusAwarded.includes(currentSub.id) && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-teal-dark/30 rounded-xl border border-gold/20 w-full text-left"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="w-4 h-4 text-gold" />
                        <h4 className="text-xs font-bold text-gold uppercase">Bonus XP Opportunity</h4>
                      </div>
                      <p className="text-[10px] text-slate-400 mb-3">
                        Share your thoughts or code on GitHub for <span className="text-gold font-bold">+25 XP</span>!
                      </p>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                          <input 
                            type="text"
                            placeholder="https://github.com/..."
                            value={githubUrl}
                            onChange={(e) => setGithubUrl(e.target.value)}
                            className="w-full bg-black/20 border border-teal-light/20 rounded-lg py-2 pl-9 pr-3 text-xs text-white focus:outline-none focus:border-gold/50 transition-all"
                          />
                        </div>
                        <button 
                          onClick={handleGithubBonusSubmit}
                          className="px-3 py-2 bg-gold text-teal-900 text-[10px] font-bold rounded-lg hover:bg-gold/80 transition-all flex items-center gap-1"
                        >
                          Claim <Award className="w-3 h-3" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {githubBonusAwarded.includes(currentSub.id) && (
                    <motion.div 
                      initial={{ scale: 0.95 }}
                      animate={{ scale: 1 }}
                      className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center gap-3 w-full text-left"
                    >
                      <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                        <Github className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">GitHub Bonus Awarded</p>
                        <p className="text-[10px] text-emerald-400/60">+25 XP Integrated</p>
                      </div>
                    </motion.div>
                  )}
                  
                  <button
                    onClick={handleNext}
                    disabled={!canGoToNext}
                    className="btn-gold-3d flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    {isLastSubLesson ? 'Claim Certificate' : 'Next Lesson'} <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Modals */}
      <AnimatePresence>
        {showPaymentModal && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-teal-dark/90 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="glass-3d max-w-md w-full p-8 text-center relative"
            >
              <button onClick={() => setShowPaymentModal(false)} className="absolute top-6 right-6 text-slate-500 hover:text-white">
                <X className="w-6 h-6" />
              </button>
              <div className="w-20 h-20 bg-gold/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <CreditCard className="w-10 h-10 text-gold" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Unlock Your Diploma</h2>
              <p className="text-slate-400 mb-8 leading-relaxed">
                To receive your world-class Ivy League-standard {courseTitle} certificate, a processing fee of 25,000 UGX is required via PesaPal. 
                <br/><span className="text-xs italic text-slate-500 mt-2 block">Secure payment powered by PesaPal Africa.</span>
              </p>
              <div className="bg-teal-dark/50 p-4 rounded-2xl mb-8 border border-teal-light/20">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-400">Certification Fee</span>
                  <span className="text-white font-bold">25,000 UGX</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">Gateway</span>
                  <span className="text-teal-light font-bold">PesaPal Africa</span>
                </div>
              </div>
              <button 
                onClick={handlePesaPalPayment}
                disabled={paymentStatus === 'processing'}
                className="w-full btn-gold-3d flex items-center justify-center gap-2"
              >
                {paymentStatus === 'processing' ? 'Processing Payment...' : 'Pay with PesaPal'}
              </button>
            </motion.div>
          </motion.div>
        )}

        {showNameInput && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-teal-dark/90 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="glass-3d max-w-md w-full p-8 text-center"
            >
              <div className="w-20 h-20 bg-emerald-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <User className="w-10 h-10 text-emerald-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Final Step</h2>
              <p className="text-slate-400 mb-8">Please enter your full legal name as it should appear on your official diploma.</p>
              <input
                type="text"
                placeholder="Full Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full bg-teal-dark/30 border border-teal-light/20 rounded-2xl py-4 px-6 text-lg text-white text-center focus:border-gold outline-none mb-6 transition-all"
              />
              <button 
                onClick={handleCertificateClaim}
                disabled={!userName.trim()}
                className="w-full btn-gold-3d"
              >
                Claim My Diploma
              </button>
            </motion.div>
          </motion.div>
        )}

        {showCertificate && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 overflow-y-auto"
          >
            <div className="max-w-5xl w-full py-12">
              <div className="flex justify-between items-center mb-8 px-4">
                <h2 className="text-gold font-bold text-xl">Your Official Diploma</h2>
                <div className="flex gap-4">
                  <button 
                    onClick={() => window.print()}
                    className="btn-gold-3d py-2 px-6 text-sm flex items-center gap-2"
                  >
                    <Trophy className="w-4 h-4" /> Print / Download PDF
                  </button>
                  <button 
                    onClick={() => setShowCertificate(false)}
                    className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-xl transition-all"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              <div className="certificate-container">
                {certificateData && (
                  <MasteryCertificate 
                    userName={certificateData.name} 
                    completionDate={certificateData.date}
                    verificationCode={certificateData.code}
                    courseTitle={courseTitle}
                    courseSubtitle={courseSubtitle}
                    hasGithubBonus={certificateData.hasGithubBonus}
                  />
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
               }
