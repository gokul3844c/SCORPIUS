"use client";

import React from "react";
import {
  CheckCircle2,
  TrendingUp,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Brain,
  Zap,
  Award,
  AlertCircle
} from "lucide-react";

interface MockTestResultViewProps {
  onNavigate: (tab: string) => void;
}

export default function MockTestResultView({ onNavigate }: MockTestResultViewProps) {
  const scoreBreakdown = [
    { skill: "SQL", pct: 86, color: "bg-emerald-500", status: "Strong" },
    { skill: "Python", pct: 74, color: "bg-indigo-600", status: "Moderate" },
    { skill: "Statistics", pct: 81, color: "bg-emerald-500", status: "Strong" },
    { skill: "Data Analysis", pct: 72, color: "bg-amber-500", status: "Needs Work" },
  ];

  const strongAreas = ["SQL querying logic & duplicate removal", "Statistical reasoning & distribution analysis"];
  const improvementAreas = ["Python data manipulation with Pandas", "Data visualization best practices with Power BI"];

  return (
    <div className="space-y-6">
      
      {/* 1. Header & Overall Score Badge */}
      <div className="glass-card p-6 border border-slate-800 bg-gradient-to-r from-slate-950 via-indigo-950/40 to-slate-900 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl text-slate-100">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-800 text-xs font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Assessment Completed Successfully</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">Technical Assessment Result</h1>
          <p className="text-xs text-slate-400 font-medium">
            Evaluation auto-graded and verified against Data Analyst industry standards.
          </p>
        </div>

        {/* Score Badge */}
        <div className="flex items-center space-x-4 bg-slate-900 p-4 rounded-2xl border border-slate-800 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex flex-col items-center justify-center font-black text-2xl shadow-md">
            78%
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Passed Standard</span>
            <p className="text-sm font-extrabold text-white">Data Analyst Level 2</p>
            <span className="text-[11px] font-semibold text-emerald-400">+6% above baseline</span>
          </div>
        </div>
      </div>

      {/* 2. Evidence Added Callout Box */}
      <div className="p-4 rounded-2xl bg-indigo-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md border border-indigo-800">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-400/30">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800">
              Evidence Added to Career Twin
            </span>
            <p className="text-sm font-black text-white mt-1">
              Technical Readiness Updated: <span className="text-slate-400 line-through">84%</span> → <strong className="text-emerald-400 text-base">86%</strong>
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigate("twin")}
          className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs transition-colors whitespace-nowrap flex items-center space-x-2"
        >
          <span>View Updated Career Twin →</span>
        </button>
      </div>

      {/* 3. Skill Breakdown & AI Analysis Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Skill Breakdown (6 cols) */}
        <div className="lg:col-span-6 glass-card p-6 border border-slate-800 bg-slate-900/90 text-slate-100 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-base font-black text-white">Skill Breakdown</h2>
            <span className="text-xs font-bold text-slate-400">4 Topics Evaluated</span>
          </div>

          <div className="space-y-4 pt-1">
            {scoreBreakdown.map((sb) => (
              <div key={sb.skill} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-extrabold text-white">{sb.skill}</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-black text-white text-sm">{sb.pct}%</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      sb.pct >= 80 ? "bg-emerald-950/80 text-emerald-300 border border-emerald-800" : "bg-amber-950/80 text-amber-300 border border-amber-800"
                    }`}>
                      {sb.status}
                    </span>
                  </div>
                </div>

                <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full ${sb.color} rounded-full transition-all duration-700`}
                    style={{ width: `${sb.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: AI Analysis Strong vs Improvement (6 cols) */}
        <div className="lg:col-span-6 glass-card p-6 border border-slate-800 bg-slate-900/90 text-slate-100 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <Brain className="w-5 h-5 text-indigo-400" />
              <h2 className="text-base font-black text-white">AI Analysis</h2>
            </div>
            <span className="text-[10px] font-bold text-indigo-300 bg-indigo-950/80 px-2.5 py-0.5 rounded-full border border-indigo-800">
              SCORPIUS Feedback
            </span>
          </div>

          {/* Strong Areas */}
          <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-800/80 space-y-2">
            <h3 className="text-xs font-black uppercase text-emerald-300 flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Strong Areas</span>
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-300 font-medium">
              {strongAreas.map((sa, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>{sa}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Improvement Areas */}
          <div className="p-4 rounded-xl bg-amber-950/60 border border-amber-800/80 space-y-2">
            <h3 className="text-xs font-black uppercase text-amber-300 flex items-center space-x-1.5">
              <AlertCircle className="w-4 h-4 text-amber-400" />
              <span>Improvement Areas</span>
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-300 font-medium">
              {improvementAreas.map((ia, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>{ia}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-2">
            <button
              onClick={() => onNavigate("interview")}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center space-x-2 transition-colors"
            >
              <span>Next Step: Take AI Mock Interview</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
