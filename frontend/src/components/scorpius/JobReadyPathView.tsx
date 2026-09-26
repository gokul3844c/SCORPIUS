"use client";

import React, { useState } from "react";
import {
  Rocket,
  Clock,
  TrendingUp,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  PlayCircle,
  Zap,
  BarChart2,
  Brain,
  Mic
} from "lucide-react";

interface JobReadyPathViewProps {
  onNavigate: (tab: string) => void;
  onStartPath?: () => void;
}

export default function JobReadyPathView({ onNavigate, onStartPath }: JobReadyPathViewProps) {
  const [completedActions, setCompletedActions] = useState<Record<number, boolean>>({});

  const actions = [
    {
      id: 1,
      title: "Power BI Dashboard Project",
      boost: "+8% readiness",
      hours: "10 hours",
      category: "Critical Blocker Fix",
      icon: BarChart2,
      color: "border-l-rose-500 bg-rose-50/30",
      badge: "Highest ROI",
      desc: "Build an interactive e-commerce dashboard with DAX calculations and data modeling.",
    },
    {
      id: 2,
      title: "SQL Practical Assessment",
      boost: "+7% readiness",
      hours: "8 hours",
      category: "Technical Verification",
      icon: Brain,
      color: "border-l-indigo-600 bg-indigo-50/30",
      badge: "High Priority",
      desc: "Solve 15 real-world analytical query tasks involving window functions and CTEs.",
    },
    {
      id: 3,
      title: "AI Mock Interview",
      boost: "+4% readiness",
      hours: "3 hours",
      category: "Speech & Clarity",
      icon: Mic,
      color: "border-l-purple-600 bg-purple-50/30",
      badge: "Communication",
      desc: "Complete 2 behavioral & technical mock interview rounds with AI speech analysis.",
    },
    {
      id: 4,
      title: "Advanced Python Course",
      boost: "+1% readiness",
      hours: "30 hours",
      category: "Long-term Mastery",
      icon: Rocket,
      color: "border-l-slate-400 bg-slate-50/30",
      badge: "Optional",
      desc: "Deep dive into NumPy, Pandas, and SciPy optimization pipelines.",
    },
  ];

  const toggleAction = (id: number) => {
    setCompletedActions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-400">
              <Rocket className="w-5 h-5" />
            </span>
            <div>
              <h1 className="text-2xl font-black text-white tracking-tight">Minimum Job-Ready Path</h1>
              <p className="text-xs text-slate-400 font-medium">
                Shortest ROI learning sequence calculated by SCORPIUS counterfactual algorithms.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3 bg-slate-900/90 p-2.5 rounded-2xl border border-slate-800 shadow-xl">
          <span className="text-xs font-bold text-slate-400">Current Readiness:</span>
          <span className="text-lg font-black text-emerald-400">73%</span>
        </div>
      </div>

      {/* 2. HIGHLIGHT BANNER: Recommended Path & Projected Readiness */}
      <div className="glass-card p-6 border border-emerald-500/40 bg-gradient-to-r from-slate-950 via-indigo-950/90 to-slate-900 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Recommended Path Algorithm</span>
            </div>

            <h2 className="text-xl font-black tracking-tight text-white flex items-center space-x-3">
              <span>Power BI</span>
              <ArrowRight className="w-4 h-4 text-emerald-400" />
              <span>SQL</span>
              <ArrowRight className="w-4 h-4 text-emerald-400" />
              <span>Mock Interview</span>
            </h2>

            <p className="text-xs text-slate-300">
              Completing this 21-hour sequence eliminates your primary blocker and bumps target role suitability.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-900/60 backdrop-blur-md p-4 rounded-2xl border border-slate-800">
            <div className="text-center sm:text-left">
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest block">Projected Readiness</span>
              <div className="text-2xl font-black text-white flex items-center space-x-2">
                <span className="text-slate-400 line-through text-lg">73%</span>
                <ArrowRight className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400 text-3xl">92%</span>
              </div>
            </div>

            <button
              onClick={() => {
                if (onStartPath) onStartPath();
                else onNavigate("twin");
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-colors flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/20 whitespace-nowrap"
            >
              <span>Start Recommended Path →</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Recommended Actions List */}
      <div className="space-y-4">
        <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center space-x-2">
          <Zap className="w-4 h-4 text-indigo-400" />
          <span>Prioritized Action Steps</span>
        </h3>

        <div className="space-y-3">
          {actions.map((act) => {
            const Icon = act.icon;
            const isDone = completedActions[act.id];

            return (
              <div
                key={act.id}
                className={`glass-card p-5 border border-slate-800 border-l-4 ${act.color} transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isDone ? "opacity-50 bg-slate-950/40" : "bg-slate-900/90 text-slate-100"
                }`}
              >
                <div className="flex items-start space-x-4">
                  <button
                    onClick={() => toggleAction(act.id)}
                    className={`mt-1 w-6 h-6 rounded-lg flex items-center justify-center border transition-colors ${
                      isDone ? "bg-emerald-600 border-emerald-600 text-white" : "border-slate-700 hover:border-indigo-500"
                    }`}
                  >
                    {isDone && <CheckCircle2 className="w-4 h-4" />}
                  </button>

                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-black text-white">{act.id}. {act.title}</span>
                      <span className="px-2 py-0.5 rounded-full bg-indigo-950/80 text-indigo-300 text-[10px] font-bold border border-indigo-800">
                        {act.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">{act.desc}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 justify-between sm:justify-end border-t sm:border-t-0 border-slate-800 pt-2 sm:pt-0">
                  <div className="text-right">
                    <span className="text-xs font-black text-emerald-300 bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-800 block">
                      {act.boost}
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold mt-0.5 flex items-center justify-end space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{act.hours}</span>
                    </span>
                  </div>

                  <button
                    onClick={() => onNavigate(act.id === 1 ? "twin" : act.id === 3 ? "interview" : "assessments")}
                    className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center space-x-1.5 shrink-0"
                  >
                    <span>Execute</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
