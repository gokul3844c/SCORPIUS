"use client";

import React from "react";
import {
  AlertTriangle,
  ShieldAlert,
  AlertCircle,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Zap,
  Info
} from "lucide-react";

interface GapsBlockersViewProps {
  onNavigate: (tab: string) => void;
}

export default function GapsBlockersView({ onNavigate }: GapsBlockersViewProps) {
  const gaps = [
    {
      skill: "Communication",
      current: 66,
      required: 70,
      diff: 4,
      status: "Minor Gap",
      severity: "minor",
      impact: "Can be quickly improved through AI Mock Interview speech exercises.",
    },
    {
      skill: "Python Manipulation",
      current: 74,
      required: 80,
      diff: 6,
      status: "Minor Gap",
      severity: "minor",
      impact: "Slight gap in Pandas vectorization tasks.",
    },
    {
      skill: "Power BI",
      current: 48,
      required: 80,
      diff: 32,
      status: "Critical Blocker",
      severity: "critical",
      impact: "This skill has high importance for the target Data Analyst role. Prevents resume shortlisting.",
    },
  ];

  const criticalBlockers = gaps.filter((g) => g.severity === "critical");
  const minorGaps = gaps.filter((g) => g.severity === "minor");

  return (
    <div className="space-y-6">
      
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-400">
              <AlertTriangle className="w-5 h-5" />
            </span>
            <div>
              <h1 className="text-2xl font-black text-white tracking-tight">Skill Gaps & Critical Blockers</h1>
              <p className="text-xs text-slate-400 font-medium">
                Deterministic gap evaluation isolating non-negotiable job blockers from minor improvement areas.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => onNavigate("path")}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center space-x-2 shadow-md shadow-indigo-600/20 transition-all"
        >
          <span>View Recommended Action Path →</span>
        </button>
      </div>

      {/* 2. Critical Blocker Section */}
      <div className="space-y-4">
        <h2 className="text-sm font-black text-rose-400 uppercase tracking-wider flex items-center space-x-2">
          <ShieldAlert className="w-4 h-4 text-rose-400" />
          <span>Critical Job Blockers ({criticalBlockers.length})</span>
        </h2>

        <div className="space-y-3">
          {criticalBlockers.map((b) => (
            <div
              key={b.skill}
              className="glass-card p-6 border border-rose-500/40 bg-gradient-to-r from-slate-950 via-rose-950/40 to-slate-900 space-y-4 text-slate-100 shadow-xl"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-rose-800/80 pb-3">
                <div className="flex items-center space-x-3">
                  <span className="px-3 py-1 rounded-xl bg-rose-600 text-white text-xs font-black uppercase shadow-xs">
                    {b.status}
                  </span>
                  <h3 className="text-lg font-black text-white">{b.skill}</h3>
                </div>

                <span className="text-xs font-extrabold text-rose-300 bg-rose-950/80 px-3 py-1 rounded-lg border border-rose-800">
                  Difference: -{b.diff}%
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Current Capability</span>
                  <p className="text-base font-black text-white">{b.current}%</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Required Target</span>
                  <p className="text-base font-black text-white">{b.required}%</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Shortfall</span>
                  <p className="text-base font-black text-rose-400">-{b.diff}% Gap</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-800 text-xs text-rose-300 flex items-start space-x-2">
                <Info className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <p className="font-semibold">{b.impact}</p>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => onNavigate("path")}
                  className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs flex items-center space-x-2 shadow-md shadow-rose-600/20"
                >
                  <span>View Recommended Action →</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Minor Improvement Areas Section */}
      <div className="space-y-4 pt-4">
        <h2 className="text-sm font-black text-amber-400 uppercase tracking-wider flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 text-amber-400" />
          <span>Minor Improvement Areas ({minorGaps.length})</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {minorGaps.map((g) => (
            <div key={g.skill} className="glass-card p-5 border border-amber-500/40 bg-slate-900/90 text-slate-100 space-y-3">
              <div className="flex justify-between items-center border-b border-amber-800/80 pb-2">
                <h3 className="text-sm font-extrabold text-white">{g.skill}</h3>
                <span className="px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-800 text-[10px] font-bold">
                  {g.status} (-{g.diff}%)
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Current: {g.current}% | Required: {g.required}%
              </p>
              <p className="text-[11px] text-slate-400">{g.impact}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
