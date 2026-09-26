"use client";

import React from "react";
import {
  Award,
  CheckCircle2,
  AlertCircle,
  Brain,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  BarChart2
} from "lucide-react";

interface MockInterviewResultViewProps {
  onNavigate: (tab: string) => void;
}

export default function MockInterviewResultView({ onNavigate }: MockInterviewResultViewProps) {
  const scores = [
    { label: "Technical Response", pct: 84, color: "bg-indigo-600" },
    { label: "Communication", pct: 76, color: "bg-purple-600" },
    { label: "Problem Solving", pct: 82, color: "bg-cyan-600" },
    { label: "Behavioral Response", pct: 79, color: "bg-blue-600" },
    { label: "Role Relevance", pct: 88, color: "bg-emerald-600" },
  ];

  const strengths = [
    "Strong technical explanation of SQL query optimization",
    "Good role relevance to Data Analyst expectations",
    "Clear problem-solving approach with quantifiable metrics",
  ];

  const improvements = [
    "Make answers more concise (reduce filler detail by ~15%)",
    "Provide stronger measurable outcomes in behavioral scenarios",
    "Structure STAR answers more explicitly",
  ];

  return (
    <div className="space-y-6">
      
      {/* 1. Header Banner & Overall Score */}
      <div className="glass-card p-6 border border-slate-800 bg-gradient-to-r from-slate-950 via-purple-950/40 to-slate-900 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl text-slate-100">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-purple-950/80 text-purple-300 border border-purple-800 text-xs font-bold">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>AI Speech & Content Evaluation Complete</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">Interview Performance</h1>
          <p className="text-xs text-slate-400 font-medium">
            Evaluated by SCORPIUS AI NLP Engine for Data Analyst competency.
          </p>
        </div>

        {/* Overall Badge */}
        <div className="flex items-center space-x-4 bg-slate-900 p-4 rounded-2xl border border-slate-800 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-purple-600 text-white flex flex-col items-center justify-center font-black text-2xl shadow-md">
            81%
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Overall Rating</span>
            <p className="text-sm font-extrabold text-white">Highly Competent</p>
            <span className="text-[11px] font-semibold text-emerald-400">+4% readiness bump</span>
          </div>
        </div>
      </div>

      {/* 2. Detailed Performance Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Metric Breakdown (6 cols) */}
        <div className="lg:col-span-6 glass-card p-6 border border-slate-800 bg-slate-900/90 text-slate-100 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-base font-black text-white">Performance Breakdown</h2>
            <span className="text-xs font-bold text-slate-400">5 Dimensions</span>
          </div>

          <div className="space-y-4 pt-1">
            {scores.map((s) => (
              <div key={s.label} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-extrabold text-white">{s.label}</span>
                  <span className="font-black text-white text-sm">{s.pct}%</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full ${s.color} rounded-full transition-all duration-700`}
                    style={{ width: `${s.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: AI Feedback Strengths & Improve (6 cols) */}
        <div className="lg:col-span-6 glass-card p-6 border border-slate-800 bg-slate-900/90 text-slate-100 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <Brain className="w-5 h-5 text-purple-400" />
              <h2 className="text-base font-black text-white">AI Feedback</h2>
            </div>
            <span className="text-[10px] font-bold text-purple-300 bg-purple-950/80 px-2.5 py-0.5 rounded-full border border-purple-800">
              SCORPIUS Speech NLP
            </span>
          </div>

          {/* Strengths */}
          <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-800/80 space-y-2">
            <h3 className="text-xs font-black uppercase text-emerald-300 flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Strengths</span>
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-300 font-medium">
              {strengths.map((str, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>{str}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Improve */}
          <div className="p-4 rounded-xl bg-purple-950/60 border border-purple-800/80 space-y-2">
            <h3 className="text-xs font-black uppercase text-purple-300 flex items-center space-x-1.5">
              <AlertCircle className="w-4 h-4 text-purple-400" />
              <span>Improve</span>
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-300 font-medium">
              {improvements.map((imp, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-purple-400 font-bold">•</span>
                  <span>{imp}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-2">
            <button
              onClick={() => onNavigate("twin")}
              className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs flex items-center justify-center space-x-2 shadow-md shadow-purple-600/20 transition-all hover:scale-[1.01]"
            >
              <span>Update Career Readiness Twin →</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
