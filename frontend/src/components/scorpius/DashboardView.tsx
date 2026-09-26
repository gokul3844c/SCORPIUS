"use client";

import React, { useState } from "react";
import {
  TrendingUp,
  Building2,
  Target,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  ShieldAlert,
  Brain,
  Mic,
  Rocket,
  ChevronRight,
  CheckCircle2,
  Zap,
  BarChart3,
  Clock,
  AlertTriangle,
  Layers,
  FileText,
  Check,
  Award
} from "lucide-react";
import PdfUploadSection, { UploadedDocData } from "./PdfUploadSection";

interface DashboardViewProps {
  onNavigate: (tab: string) => void;
  candidateName?: string;
  readinessScore?: number;
}

export default function DashboardView({
  onNavigate,
  candidateName = "Gokul",
  readinessScore = 81,
}: DashboardViewProps) {
  const [selectedCompany, setSelectedCompany] = useState("Google");
  const [evidenceSignalsCount, setEvidenceSignalsCount] = useState(24);
  const [uploadedDoc, setUploadedDoc] = useState<UploadedDocData | null>(null);
  const [currentScore, setCurrentScore] = useState(readinessScore);

  const companies = [
    { id: "Google", name: "Google", logo: "🌐", roleTitle: "Data Analyst II", reqMatch: 86 },
    { id: "McKinsey", name: "McKinsey & Co.", logo: "💎", roleTitle: "Data & Insights Associate", reqMatch: 84 },
    { id: "TechCorp", name: "TechCorp Global", logo: "🚀", roleTitle: "Business Intelligence Analyst", reqMatch: 88 },
    { id: "Amazon", name: "Amazon", logo: "📦", roleTitle: "Data Analyst", reqMatch: 85 },
  ];

  const currentCompany = companies.find((c) => c.id === selectedCompany) || companies[0];

  const skillMetrics = [
    { label: "Technical Skills", pct: uploadedDoc ? uploadedDoc.scores.technical : 84, color: "bg-indigo-600", lightColor: "bg-indigo-100" },
    { label: "Task Readiness", pct: uploadedDoc ? uploadedDoc.scores.task : 78, color: "bg-cyan-600", lightColor: "bg-cyan-100" },
    { label: "Communication", pct: uploadedDoc ? uploadedDoc.scores.communication : 76, color: "bg-purple-600", lightColor: "bg-purple-100" },
    { label: "Interview Readiness", pct: uploadedDoc ? uploadedDoc.scores.interview : 81, color: "bg-blue-600", lightColor: "bg-blue-100" },
    { label: "Evidence Confidence", pct: uploadedDoc ? uploadedDoc.scores.confidence : 89, color: "bg-emerald-600", lightColor: "bg-emerald-100" },
  ];

  const handleUploadSuccess = (docData: UploadedDocData) => {
    setUploadedDoc(docData);
    setCurrentScore(docData.scores.overall);
    setEvidenceSignalsCount((prev) => prev + docData.skills.length);
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-900 p-6 rounded-3xl text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-1">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[11px] font-semibold text-cyan-300 border border-white/10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SCORPIUS Intelligence Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight pt-1">
            Good Morning, {candidateName} 👋
          </h1>
          <p className="text-slate-300 text-sm font-medium">
            Your career readiness journey is improving. You have <strong className="text-emerald-400 font-bold">{evidenceSignalsCount} Verified Evidence Signals</strong>.
          </p>
        </div>

        <div className="relative z-10 flex items-center space-x-3">
          <button
            onClick={() => onNavigate("twin")}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs transition-all shadow-lg shadow-indigo-600/30 flex items-center space-x-2 border border-indigo-400/30"
          >
            <span>View Career Twin</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Main Hero Grid (Career Readiness Score + Target Role Card) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Hero Card: Career Readiness Score (7 cols) */}
        <div className="lg:col-span-7 glass-card p-6 border border-slate-800 space-y-6 bg-slate-900/90 text-slate-100 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Overall Twin Assessment</span>
              <h2 className="text-lg font-black text-white">Career Readiness Score</h2>
            </div>
            
            <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 text-xs font-bold shadow-2xs">
              <TrendingUp className="w-4 h-4" />
              <span>{uploadedDoc ? "+5% boost from PDF document" : "+6% from previous assessment"}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
            
            {/* Score Radial Circle */}
            <div className="sm:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-950/60 rounded-2xl border border-slate-800/80 relative">
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="8" className="text-slate-800" fill="transparent" />
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeDasharray={263.89}
                    strokeDashoffset={263.89 * (1 - currentScore / 100)}
                    strokeLinecap="round"
                    className="text-indigo-500 transition-all duration-1000 ease-out"
                    fill="transparent"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-3xl font-black text-white tracking-tight">{currentScore}%</span>
                  <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">JOB READY</span>
                </div>
              </div>
              <div className="mt-3 text-center">
                <span className="inline-flex items-center space-x-1 text-[11px] font-bold text-slate-300 bg-slate-900 px-2.5 py-1 rounded-full border border-slate-800">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{skillMetrics[4].pct}% Evidence Confidence</span>
                </span>
              </div>
            </div>

            {/* Sub-Metric Skill Breakdown Bars */}
            <div className="sm:col-span-7 space-y-3">
              {skillMetrics.map((sm) => (
                <div key={sm.label} className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-300">{sm.label}</span>
                    <span className="font-extrabold text-white">{sm.pct}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className={`h-full ${sm.color} rounded-full transition-all duration-700 ease-out`}
                      style={{ width: `${sm.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Target Role Card (5 cols) */}
        <div className="lg:col-span-5 glass-card p-6 border border-slate-800 space-y-5 flex flex-col justify-between bg-slate-900/90 text-slate-100 shadow-xl">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-xl bg-indigo-950/80 border border-indigo-800/60 text-indigo-400">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Destination Role</h3>
                  <h2 className="text-base font-black text-white">Target Role & Match</h2>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-cyan-950/80 text-cyan-300 text-[10px] font-bold border border-cyan-800/60">
                Match: {currentCompany.reqMatch}%
              </span>
            </div>

            <div className="mt-4 space-y-4">
              
              {/* Target Role Box */}
              <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-medium text-slate-400">Target Role</span>
                  <p className="text-sm font-extrabold text-white">{currentCompany.roleTitle}</p>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-indigo-950/80 text-indigo-300 border border-indigo-800/60 text-xs font-bold">
                  Data Analyst
                </span>
              </div>

              {/* Target Company Selector */}
              <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-medium text-slate-400 flex items-center space-x-1">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    <span>Target Company</span>
                  </span>
                  <span className="text-[11px] font-bold text-indigo-400">
                    Match: {currentCompany.reqMatch}%
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {companies.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCompany(c.id)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all border ${
                        selectedCompany === c.id
                          ? "bg-indigo-950/80 text-indigo-300 border-indigo-500 shadow-sm ring-1 ring-indigo-500/20"
                          : "bg-slate-900/60 text-slate-400 border-slate-800 hover:bg-slate-800/80"
                      }`}
                    >
                      <span className="text-base">{c.logo}</span>
                      <span className="truncate">{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => onNavigate("twin")}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center space-x-2 transition-colors shadow-md"
            >
              <span>View Career Twin →</span>
            </button>
          </div>
        </div>

      </div>

      {/* 3. UPLOADED DOCUMENT EVIDENCE & CALIBRATED SCORES CARD */}
      {uploadedDoc && (
        <div className="glass-card p-6 border border-emerald-500/50 bg-gradient-to-r from-slate-950 via-emerald-950/40 to-slate-900 text-white space-y-5 shadow-xl animate-in fade-in zoom-in-95 duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-800/80 pb-4">
            <div className="flex items-center space-x-3.5">
              <div className="p-3 rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-600/20">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-800 text-[10px] font-black uppercase">
                    Uploaded Document Proof
                  </span>
                  <span className="text-[11px] font-bold text-slate-400">{uploadedDoc.uploadTime}</span>
                </div>
                <h3 className="text-base font-black text-white mt-0.5">{uploadedDoc.fileName}</h3>
                <p className="text-xs text-slate-400 font-medium">
                  {uploadedDoc.docType} • {uploadedDoc.fileSize} • {uploadedDoc.pages} pages
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 bg-slate-900 p-3 rounded-2xl border border-emerald-800 shadow-2xs">
              <div className="text-right">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Calibrated Score</span>
                <span className="text-xl font-black text-white">{uploadedDoc.scores.overall}%</span>
              </div>
              <span className="px-2.5 py-1 rounded-xl bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 text-xs font-black">
                +5% Boost
              </span>
            </div>
          </div>

          {/* Detected Skills Proper Scores Matrix */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider flex items-center justify-between">
              <span>Extracted Skills & Calibrated Score Ratings</span>
              <span className="text-emerald-400 font-bold">{uploadedDoc.skills.length} Skills Verified</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {uploadedDoc.skills.map((s, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5 shadow-2xs">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-extrabold text-white">{s.name}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 text-[10px] font-black">
                      Score: {s.score}%
                    </span>
                  </div>

                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${s.score}%` }} />
                  </div>

                  <div className="flex justify-between items-center text-[10px] text-slate-400 font-semibold pt-0.5">
                    <span>Confidence: {s.confidence}%</span>
                    <span className="text-indigo-400 font-bold">{s.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. PROMINENT PDF DOCUMENT UPLOAD & AI ANALYSIS SECTION */}
      <PdfUploadSection
        onNavigate={onNavigate}
        onUploadSuccess={handleUploadSuccess}
      />

      {/* 5. Critical Blocker + Recommended Next Action (2-col row) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Critical Blocker Card */}
        <div className="glass-card p-6 border border-rose-500/40 bg-gradient-to-r from-slate-950 via-rose-950/40 to-slate-900 space-y-4 text-slate-100 shadow-xl">
          <div className="flex items-center justify-between border-b border-rose-800/80 pb-3">
            <div className="flex items-center space-x-2">
              <ShieldAlert className="w-5 h-5 text-rose-400" />
              <h3 className="text-sm font-black text-rose-300 uppercase tracking-wider">
                Critical Job Blocker
              </h3>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-rose-950/80 text-rose-300 border border-rose-800">
              32% Gap
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-extrabold text-white text-sm">Skill: Power BI</span>
              <span className="font-bold text-slate-400">Current: 48% | Required: 80%</span>
            </div>

            <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
              <div className="h-full bg-rose-500 rounded-full" style={{ width: "48%" }} />
            </div>

            <p className="text-xs text-slate-400 pt-1">
              High importance for Data Analyst shortlisting. Prevents interview qualification.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => onNavigate("gaps-blockers")}
              className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-md shadow-rose-600/20 transition-all"
            >
              <span>Fix Blocker →</span>
            </button>
          </div>
        </div>

        {/* Recommended Next Action */}
        <div className="glass-card p-6 border border-emerald-500/40 bg-gradient-to-r from-slate-950 via-emerald-950/40 to-slate-900 space-y-4 text-slate-100 shadow-xl">
          <div className="flex items-center justify-between border-b border-emerald-800/80 pb-3">
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-emerald-400" />
              <h3 className="text-sm font-black text-emerald-300 uppercase tracking-wider">
                Highest-Impact Action
              </h3>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-950/80 text-emerald-300 border border-emerald-800">
              +8% Readiness
            </span>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-black text-white">Build a Power BI Sales Dashboard</h4>
            
            <div className="flex items-center space-x-4 text-xs text-slate-400">
              <span className="flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Effort: 10 hours</span>
              </span>
              <span className="flex items-center space-x-1 font-bold text-emerald-400">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+8% Improvement</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 pt-1">
              Hands-on project generating verified proof for Power BI data modeling.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => onNavigate("path")}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-md shadow-emerald-600/20 transition-all"
            >
              <span>Start Action →</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
