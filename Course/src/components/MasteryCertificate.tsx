import React, { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Award, ShieldCheck, Globe, Star, CheckCircle, Download } from 'lucide-react';
import html2canvas from 'html2canvas';

interface CertificateProps {
  userName: string;
  completionDate: string;
  verificationCode: string;
  courseTitle: string;
  courseSubtitle: string;
  masteryLevel?: string;
  skills?: string[];
  hasGithubBonus?: boolean;
}

export const MasteryCertificate: React.FC<CertificateProps> = ({ 
  userName, completionDate, verificationCode, courseTitle, courseSubtitle,
  masteryLevel = "High Distinction",
  skills = ["Technical Proficiency", "Problem Solving", "Practical Application", "Engineering Excellence"],
  hasGithubBonus = false
}) => {
  const certificateRef = useRef<HTMLDivElement>(null);
  const downloadCertificate = async () => {
    if (!certificateRef.current) return;
    const canvas = await html2canvas(certificateRef.current, { scale: 2, useCORS: true, backgroundColor: '#fdfcf0' });
    const link = document.createElement('a');
    link.href = canvas.toDataURL("image/png");
    link.download = `Certificate_${userName.replace(/\s+/g, '_')}.png`;
    link.click();
  };

  return (
    <div className="w-full flex flex-col items-center py-8 px-4 gap-6">
      <div ref={certificateRef} className="relative w-full max-w-[1123px] aspect-[1.414/1] bg-[#fdfcf0] text-[#1a2a3a] p-6 md:p-12 flex flex-col items-center justify-between border-[10px] md:border-[20px] border-[#1a2a3a] shadow-2xl overflow-hidden" style={{ backgroundImage: 'radial-gradient(#d4af37 0.5px, transparent 0.5px)', backgroundSize: '20px 20px' }}>
        <div className="absolute inset-1.5 md:inset-3 border-2 md:border-4 border-[#d4af37] pointer-events-none" />
        <div className="absolute inset-3 md:inset-6 border border-[#1a2a3a] pointer-events-none" />
        <div className="text-center space-y-1 z-10">
          <h1 className="font-sans text-[10px] md:text-sm uppercase tracking-[0.3em] text-[#d4af37] font-bold">Codeon Africa</h1>
          <h2 className="font-serif text-xl md:text-4xl text-[#1a2a3a] font-bold">Certificate of Completion</h2>
          <p className="text-[8px] md:text-xs text-slate-500 font-bold uppercase">{courseSubtitle}</p>
        </div>
        <div className="text-center space-y-4 z-10">
          <p className="text-[10px] md:text-sm italic font-serif text-slate-600">This is to certify that</p>
          <h3 className="text-2xl md:text-5xl font-serif text-[#1a2a3a] italic font-bold">{userName || "Distinguished Scholar"}</h3>
          <p className="text-[10px] md:text-sm text-slate-700">has successfully completed the <span className="font-bold">{courseTitle}</span> course with <span className="font-bold text-[#d4af37]">{masteryLevel}</span>.</p>
        </div>
        <div className="w-full flex justify-between items-end z-10 px-10 pb-4">
          <div className="text-left"><p className="font-signature text-2xl md:text-4xl border-b border-slate-400">Kafeero Mirembe Mercy</p><p className="font-bold uppercase text-[8px] md:text-[12px]">Founder & CEO</p></div>
          <div className="flex flex-col items-center"><QRCodeSVG value={`https://codeondigital.com/verify/${verificationCode}`} size={60} /><p className="text-[6px] md:text-[10px] text-slate-500 font-mono mt-1">REF: {verificationCode}</p></div>
          <div className="text-right"><p className="text-[10px] md:text-sm font-bold">Official Record</p><p className="text-[10px] md:text-sm">Conferred: {completionDate}</p></div>
        </div>
      </div>
      <button onClick={downloadCertificate} className="btn-gold-3d flex items-center gap-2"><Download className="w-5 h-5" /> Download Certificate (PNG)</button>
    </div>
  );
};
