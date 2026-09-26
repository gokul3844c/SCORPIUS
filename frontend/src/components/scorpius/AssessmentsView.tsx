"use client";

import React from "react";
import {
  Brain,
  Briefcase,
  Mic,
  Clock,
  HelpCircle,
  Sparkles,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Code2
} from "lucide-react";

interface AssessmentsViewProps {
  onNavigate: (tab: string) => void;
  onStartTest: () => void;
  onStartInterview: () => void;
}

export default function AssessmentsView({
  onNavigate,
  onStartTest,
  onStartInterview,
}: AssessmentsViewProps) {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Evaluation Hub</span>
          <h1 className="text-2xl font-black text-white tracking-tight">Assessments</h1>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            Test your real job readiness through practical evaluation & evidence gathering.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-indigo-950/80 px-3 py-1.5 rounded-xl border border-indigo-800 text-indigo-300 text-xs font-bold">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span>Scores auto-sync to Career Twin</span>
        </div>
      </div>

      {/* Three Large Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Technical Mock Test */}
        <div className="glass-card p-6 border border-slate-800 bg-slate-900/90 text-slate-100 flex flex-col justify-between space-y-6 hover:border-indigo-500/60 transition-all shadow-xl">
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div className="p-3 rounded-2xl bg-indigo-950/80 text-indigo-400 border border-indigo-800 shadow-xs">
                <Brain className="w-6 h-6" />
              </div>
              <span className="px-2.5 py-1 rounded-full bg-indigo-950/80 text-indigo-300 border border-indigo-800 text-[10px] font-extrabold uppercase">
                Intermediate
              </span>
            </div>

            <div>
              <h2 className="text-lg font-black text-white">Data Analyst Technical Assessment</h2>
              <p className="text-xs text-slate-400 mt-1">
                Rigorous multi-topic test evaluating query logic, statistics, and data cleaning.
              </p>
            </div>

            <div className="flex items-center space-x-4 text-xs font-bold text-slate-300 pt-1 border-t border-slate-800">
              <span className="flex items-center space-x-1">
                <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
                <span>30 Questions</span>
              </span>
              <span className="flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5 text-indigo-400" />
                <span>45 Minutes</span>
              </span>
            </div>

            {/* Topics Covered */}
            <div className="space-y-1.5 pt-2">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Topics Covered</p>
              <div className="flex flex-wrap gap-1.5">
                {["SQL", "Python", "Statistics", "Data Analysis"].map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-lg bg-slate-950/60 text-slate-200 text-[11px] font-bold border border-slate-800"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800">
            <button
              onClick={onStartTest}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-md shadow-indigo-600/20 transition-all hover:scale-[1.01]"
            >
              <span>Start Test →</span>
            </button>
          </div>
        </div>

        {/* Card 2: Practical Job Simulation */}
        <div className="glass-card p-6 border border-slate-800 bg-slate-900/90 text-slate-100 flex flex-col justify-between space-y-6 hover:border-cyan-500/60 transition-all shadow-xl">
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div className="p-3 rounded-2xl bg-cyan-950/80 text-cyan-400 border border-cyan-800 shadow-xs">
                <Briefcase className="w-6 h-6" />
              </div>
              <span className="px-2.5 py-1 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-800 text-[10px] font-extrabold uppercase">
                Workplace Simulation
              </span>
            </div>

            <div>
              <h2 className="text-lg font-black text-white">Data Cleaning & Analysis Task</h2>
              <p className="text-xs text-slate-400 mt-1">
                Complete a realistic workplace data task in a live sandbox environment.
              </p>
            </div>

            <div className="flex items-center space-x-4 text-xs font-bold text-slate-300 pt-1 border-t border-slate-800">
              <span className="flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>60 Minutes</span>
              </span>
              <span className="flex items-center space-x-1 text-cyan-300">
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Hands-on Code</span>
              </span>
            </div>

            {/* Evaluates */}
            <div className="space-y-1.5 pt-2">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Evaluates</p>
              <div className="grid grid-cols-2 gap-1.5">
                {["Problem Solving", "Technical Execution", "Task Completion", "Accuracy"].map((e) => (
                  <span
                    key={e}
                    className="px-2.5 py-1 rounded-lg bg-slate-950/60 text-slate-200 text-[10px] font-bold border border-slate-800 truncate"
                  >
                    • {e}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800">
            <button
              onClick={onStartTest}
              className="w-full py-3 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-md shadow-cyan-600/20 transition-all hover:scale-[1.01]"
            >
              <span>Start Simulation →</span>
            </button>
          </div>
        </div>

        {/* Card 3: Communication Assessment */}
        <div className="glass-card p-6 border border-slate-800 bg-slate-900/90 text-slate-100 flex flex-col justify-between space-y-6 hover:border-purple-500/60 transition-all shadow-xl">
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div className="p-3 rounded-2xl bg-purple-950/80 text-purple-400 border border-purple-800 shadow-xs">
                <Mic className="w-6 h-6" />
              </div>
              <span className="px-2.5 py-1 rounded-full bg-purple-950/80 text-purple-300 border border-purple-800 text-[10px] font-extrabold uppercase">
                AI Speech Evaluation
              </span>
            </div>

            <div>
              <h2 className="text-lg font-black text-white">Technical Explanation Test</h2>
              <p className="text-xs text-slate-400 mt-1">
                Explain a technical concept clearly as if speaking to a real engineering team.
              </p>
            </div>

            <div className="flex items-center space-x-4 text-xs font-bold text-slate-300 pt-1 border-t border-slate-800">
              <span className="flex items-center space-x-1 text-purple-300">
                <Mic className="w-3.5 h-3.5" />
                <span>Voice Audio & AI NLP</span>
              </span>
            </div>

            {/* Evaluates */}
            <div className="space-y-1.5 pt-2">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Evaluates</p>
              <div className="grid grid-cols-2 gap-1.5">
                {["Clarity", "Structure", "Relevance", "Technical Explanation"].map((e) => (
                  <span
                    key={e}
                    className="px-2.5 py-1 rounded-lg bg-slate-950/60 text-slate-200 text-[10px] font-bold border border-slate-800 truncate"
                  >
                    • {e}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800">
            <button
              onClick={onStartInterview}
              className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-md shadow-purple-600/20 transition-all hover:scale-[1.01]"
            >
              <span>Start Assessment →</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
