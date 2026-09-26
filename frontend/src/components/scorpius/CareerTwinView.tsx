"use client";

import React from "react";
import {
  Dna,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  Zap,
  Layers,
  HelpCircle,
  BarChart2,
  ShieldCheck,
  Award
} from "lucide-react";

interface CareerTwinViewProps {
  onNavigate: (tab: string) => void;
}

export default function CareerTwinView({ onNavigate }: CareerTwinViewProps) {
  const currentCapability = [
    { skill: "SQL", pct: 82, target: 85, icon: "🗄️", confidence: 91 },
    { skill: "Python", pct: 74, target: 80, icon: "🐍", confidence: 84 },
    { skill: "Power BI", pct: 48, target: 80, icon: "📊", isBlocker: true, confidence: 62 },
    { skill: "Statistics", pct: 79, target: 75, icon: "📈", confidence: 89 },
    { skill: "Communication", pct: 76, target: 70, icon: "🎙️", confidence: 88 },
  ];

  const evidenceHierarchy = [
    { level: 1, label: "Resume Claim", weight: "Weak Baseline", color: "bg-slate-200 text-slate-700" },
    { level: 2, label: "Project Portfolio", weight: "Demonstrated Code", color: "bg-indigo-100 text-indigo-800" },
    { level: 3, label: "Practical Assessment", weight: "Auto-Graded Test", color: "bg-purple-100 text-purple-800" },
    { level: 4, label: "Job Simulation", weight: "Verified Proof", color: "bg-emerald-100 text-emerald-800 font-extrabold" },
  ];

  return (
    <div className="space-y-6">
      
      {/* 1. Header & Overview */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-indigo-950/80 border border-indigo-800 text-indigo-400">
              <Dna className="w-5 h-5" />
            </span>
            <div>
              <h1 className="text-2xl font-black text-white tracking-tight">Career Readiness Twin</h1>
              <p className="text-xs text-slate-400 font-medium">
                A dynamic model of your demonstrated capability against your target role.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <span className="px-3 py-1.5 rounded-xl bg-indigo-950/80 border border-indigo-800 text-indigo-300 text-xs font-bold flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Twin Sync: Live</span>
          </span>
        </div>
      </div>

      {/* 2. Critical Blocker Callout Banner */}
      <div className="glass-card p-5 border border-rose-500/40 bg-gradient-to-r from-slate-950 via-rose-950/40 to-slate-900 text-slate-100 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start space-x-3.5">
            <div className="p-3 rounded-2xl bg-rose-600 text-white shadow-md shadow-rose-500/20">
              <ShieldAlert className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-black uppercase tracking-wider text-rose-300 bg-rose-950/80 border border-rose-800 px-2 py-0.5 rounded-md">
                  Critical Job Blocker
                </span>
                <span className="text-[11px] font-bold text-slate-400">Gap: 32%</span>
              </div>
              <h3 className="text-base font-extrabold text-white mt-1">
                Power BI — Required 80% | Current 48%
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Primary blocker preventing interview shortlisting for Data Analyst at Target Companies.
              </p>
            </div>
          </div>

          <div>
            <button
              onClick={() => onNavigate("path")}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-md shadow-rose-600/20 transition-all hover:scale-[1.02]"
            >
              <span>View Action Plan →</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Evidence Strength Hierarchy Callout */}
      <div className="glass-card p-6 border border-slate-800 bg-slate-900/90 space-y-4 text-slate-100">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-indigo-400" />
            <h2 className="text-base font-black text-white">Evidence Strength Hierarchy</h2>
          </div>
          <span className="text-xs font-bold text-indigo-300 bg-indigo-950/80 px-2.5 py-1 rounded-lg border border-indigo-800">
            SQL Evidence Confidence — 91%
          </span>
        </div>

        <p className="text-xs text-slate-400">
          SCORPIUS weighs evidence dynamically. Stronger proof types carry higher confidence in the Twin model.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-1">
          {evidenceHierarchy.map((eh) => (
            <div key={eh.level} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Level {eh.level}</span>
              <p className="text-xs font-black text-white">{eh.label}</p>
              <span className={`inline-block px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-200 border border-slate-700`}>
                {eh.weight}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Two Columns Side-by-Side Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Column: Current Candidate Capability */}
        <div className="glass-card p-6 border border-slate-800 space-y-4 bg-slate-900/90 text-slate-100">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-indigo-500" />
              <h2 className="text-base font-black text-white">Candidate Capability</h2>
            </div>
            <span className="text-xs font-bold text-slate-400 bg-slate-800 px-2.5 py-1 rounded-lg">
              Demonstrated Proof
            </span>
          </div>

          <div className="space-y-4 pt-1">
            {currentCapability.map((item) => (
              <div key={item.skill} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-extrabold text-white flex items-center space-x-2">
                    <span>{item.icon}</span>
                    <span>{item.skill}</span>
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-black text-white">{item.pct}%</span>
                    <span className="text-[10px] font-semibold text-slate-400">
                      (Conf: {item.confidence}%)
                    </span>
                    {item.isBlocker ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-950/80 text-rose-300 border border-rose-800">
                        Blocker
                      </span>
                    ) : item.pct >= item.target ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-800">
                        Met
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950/80 text-amber-300 border border-amber-800">
                        Near
                      </span>
                    )}
                  </div>
                </div>

                <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      item.isBlocker ? "bg-rose-500" : item.pct >= item.target ? "bg-emerald-500" : "bg-indigo-500"
                    }`}
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Target Role Requirements */}
        <div className="glass-card p-6 border border-slate-800 space-y-4 bg-slate-900/90 text-slate-100">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-cyan-400" />
              <h2 className="text-base font-black text-white">Target Role Requirement</h2>
            </div>
            <span className="text-xs font-bold text-cyan-300 bg-cyan-950/80 px-2.5 py-1 rounded-lg border border-cyan-800">
              Data Analyst Benchmark
            </span>
          </div>

          <div className="space-y-4 pt-1">
            {currentCapability.map((item) => {
              const gap = item.target - item.pct;
              return (
                <div key={item.skill} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-extrabold text-white flex items-center space-x-2">
                      <span>{item.icon}</span>
                      <span>{item.skill}</span>
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-black text-white">{item.target}%</span>
                      {gap > 0 ? (
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          gap > 15 ? "bg-rose-950/80 text-rose-300 border border-rose-800" : "bg-amber-950/80 text-amber-300 border border-amber-800"
                        }`}>
                          -{gap}% Gap
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-800">
                          +{Math.abs(gap)}% Exceeds
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-cyan-400 transition-all duration-700"
                      style={{ width: `${item.target}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
