"use client";

import React, { useState } from "react";
import {
  TrendingUp,
  Sliders,
  ShieldCheck,
  Calendar,
  Sparkles,
  ArrowUpRight,
  RefreshCw,
  CheckCircle2
} from "lucide-react";

interface ProgressViewProps {
  onNavigate: (tab: string) => void;
}

export default function ProgressView({ onNavigate }: ProgressViewProps) {
  // Slider states for counterfactual simulator
  const [powerBiCompleted, setPowerBiCompleted] = useState(true);
  const [sqlAdvancedCompleted, setSqlAdvancedCompleted] = useState(true);
  const [interviewCompleted, setInterviewCompleted] = useState(true);

  // Dynamic counterfactual calculation
  const baseScore = 65;
  const powerBiAdd = powerBiCompleted ? 15 : 0;
  const sqlAdd = sqlAdvancedCompleted ? 7 : 0;
  const interviewAdd = interviewCompleted ? 4 : 0;
  const simulatedScore = baseScore + powerBiAdd + sqlAdd + interviewAdd;

  const timelineEvents = [
    {
      date: "Sep 26, 2026",
      title: "AI Mock Interview Completed",
      score: "81% Performance",
      type: "Speech & Communication",
      impact: "+4% Readiness Bump",
      status: "Verified",
    },
    {
      date: "Sep 24, 2026",
      title: "Data Analyst Technical Assessment",
      score: "78% Score",
      type: "Technical Evaluation",
      impact: "+6% Technical Readiness",
      status: "Verified",
    },
    {
      date: "Sep 20, 2026",
      title: "Baseline Resume & Proof Ingestion",
      score: "65% Initial Score",
      type: "Twin Ingestion",
      impact: "Baseline Established",
      status: "Verified",
    },
  ];

  return (
    <div className="space-y-6">
      
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-indigo-950/80 border border-indigo-800/60 text-indigo-400">
              <TrendingUp className="w-5 h-5" />
            </span>
            <div>
              <h1 className="text-2xl font-black text-white tracking-tight">Progress & Simulation</h1>
              <p className="text-xs text-slate-400 font-medium">
                Track historical evidence growth and run counterfactual &ldquo;What-If&rdquo; scenario simulations.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3 bg-slate-900/90 p-2.5 rounded-2xl border border-slate-800 shadow-xl">
          <span className="text-xs font-bold text-slate-400">Live Twin Score:</span>
          <span className="text-lg font-black text-emerald-400">81%</span>
        </div>
      </div>

      {/* 2. COUNTERFACTUAL SIMULATOR WIDGET */}
      <div className="glass-card p-6 border border-indigo-500/30 bg-gradient-to-r from-slate-900/90 via-indigo-950/40 to-slate-900/90 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-indigo-600 text-white shadow-xs">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">
                Interactive AI Sandbox
              </span>
              <h2 className="text-base font-black text-white">Counterfactual Scenario Simulator</h2>
            </div>
          </div>

          <div className="flex items-center space-x-2 bg-indigo-950/80 text-indigo-200 px-3.5 py-1.5 rounded-xl border border-indigo-800/80 font-bold text-xs">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>Simulated Projected Score: <strong className="text-white text-sm font-black">{simulatedScore}%</strong></span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Toggle 1: Power BI Project */}
          <div
            onClick={() => setPowerBiCompleted(!powerBiCompleted)}
            className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
              powerBiCompleted ? "bg-indigo-950/80 border-indigo-500 shadow-lg text-slate-100" : "bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700"
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="text-xs font-extrabold text-white">Complete Power BI Project</span>
              <input
                type="checkbox"
                checked={powerBiCompleted}
                onChange={() => {}}
                className="w-4 h-4 accent-indigo-500"
              />
            </div>
            <p className="text-[11px] text-slate-400">Eliminates 32% critical blocker gap.</p>
            <span className="inline-block text-xs font-bold text-emerald-400 bg-slate-900 px-2 py-0.5 rounded border border-emerald-500/30">
              +15% Impact
            </span>
          </div>

          {/* Toggle 2: SQL Advanced Assessment */}
          <div
            onClick={() => setSqlAdvancedCompleted(!sqlAdvancedCompleted)}
            className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
              sqlAdvancedCompleted ? "bg-indigo-950/80 border-indigo-500 shadow-lg text-slate-100" : "bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700"
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="text-xs font-extrabold text-white">SQL Practical Mastery</span>
              <input
                type="checkbox"
                checked={sqlAdvancedCompleted}
                onChange={() => {}}
                className="w-4 h-4 accent-indigo-500"
              />
            </div>
            <p className="text-[11px] text-slate-400">Raises SQL score from 82% to 92%.</p>
            <span className="inline-block text-xs font-bold text-emerald-400 bg-slate-900 px-2 py-0.5 rounded border border-emerald-500/30">
              +7% Impact
            </span>
          </div>

          {/* Toggle 3: AI Speech Interview */}
          <div
            onClick={() => setInterviewCompleted(!interviewCompleted)}
            className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
              interviewCompleted ? "bg-indigo-950/80 border-indigo-500 shadow-lg text-slate-100" : "bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700"
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="text-xs font-extrabold text-white">AI Speech Interview</span>
              <input
                type="checkbox"
                checked={interviewCompleted}
                onChange={() => {}}
                className="w-4 h-4 accent-indigo-500"
              />
            </div>
            <p className="text-[11px] text-slate-400">Improves communication confidence.</p>
            <span className="inline-block text-xs font-bold text-emerald-400 bg-slate-900 px-2 py-0.5 rounded border border-emerald-500/30">
              +4% Impact
            </span>
          </div>

        </div>
      </div>

      {/* 3. Verified Evidence Log Timeline */}
      <div className="glass-card p-6 border border-slate-800 bg-slate-900/80 space-y-4 text-slate-100">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="text-base font-black text-white">Verified Evidence Log</h2>
          <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-800/60 flex items-center space-x-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Cryptographic Proof Stamp</span>
          </span>
        </div>

        <div className="space-y-3 pt-1">
          {timelineEvents.map((evt, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-700 transition-all">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-bold text-slate-400 flex items-center space-x-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span>{evt.date}</span>
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-950/80 text-indigo-300 border border-indigo-800/50">
                    {evt.type}
                  </span>
                </div>
                <h3 className="text-sm font-extrabold text-white">{evt.title}</h3>
                <p className="text-xs text-slate-400">{evt.score}</p>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-800/60 inline-block">
                  {evt.impact}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
