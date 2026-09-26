"use client";

import React from "react";
import { ArrowRight, ShieldCheck, AlertCircle, PlayCircle, RefreshCw, Sparkles } from "lucide-react";

interface ContinuousReadinessLoopProps {
  currentStage?: "PROOF" | "GAP" | "ACTION" | "REASSESS";
  onStageClick?: (stage: string) => void;
}

export default function ContinuousReadinessLoop({
  currentStage = "GAP",
  onStageClick,
}: ContinuousReadinessLoopProps) {
  const steps = [
    {
      id: "PROOF",
      label: "1. PROOF",
      sub: "Evidence Gathering",
      icon: ShieldCheck,
      textColor: "text-indigo-400",
      borderColor: "border-indigo-500/50",
      bgColor: "bg-indigo-950/60",
      tabTarget: "twin",
    },
    {
      id: "GAP",
      label: "2. GAP",
      sub: "Blocker Analysis",
      icon: AlertCircle,
      textColor: "text-rose-400",
      borderColor: "border-rose-500/50",
      bgColor: "bg-rose-950/60",
      tabTarget: "twin",
    },
    {
      id: "ACTION",
      label: "3. ACTION",
      sub: "Minimum Path",
      icon: PlayCircle,
      textColor: "text-emerald-400",
      borderColor: "border-emerald-500/50",
      bgColor: "bg-emerald-950/60",
      tabTarget: "path",
    },
    {
      id: "REASSESS",
      label: "4. REASSESS",
      sub: "Mock & Simulation",
      icon: RefreshCw,
      textColor: "text-purple-400",
      borderColor: "border-purple-500/50",
      bgColor: "bg-purple-950/60",
      tabTarget: "assessments",
    },
  ];

  return (
    <div className="glass-card p-4 mb-6 border border-slate-800 bg-slate-900/80 text-slate-100">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-indigo-600 text-white shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-extrabold tracking-wide uppercase text-slate-200 flex items-center space-x-2">
              <span>Continuous Readiness Loop</span>
              <span className="text-[10px] font-bold text-cyan-300 bg-indigo-950/80 px-2 py-0.5 rounded-full lowercase border border-indigo-800">
                live architecture
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Evidence → Career Twin → Gap → Blocker → Assessment → Interview → Action → Reassessment
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-[11px] font-semibold text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>Active Phase:</span>
          <span className="px-2 py-0.5 rounded-md bg-indigo-600 text-white font-bold text-[10px] uppercase">
            {currentStage}
          </span>
        </div>
      </div>

      {/* Steps Flow Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 pt-1">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isActive = currentStage === step.id;
          return (
            <React.Fragment key={step.id + idx}>
              <div
                onClick={() => onStageClick && onStageClick(step.tabTarget)}
                className={`group relative p-2.5 rounded-xl border transition-all cursor-pointer ${
                  isActive
                    ? `${step.bgColor} ${step.borderColor} shadow-xs ring-1 ring-indigo-500/30 scale-[1.02]`
                    : "bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-800/40"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                      isActive ? `${step.bgColor} ${step.textColor}` : "bg-slate-800 text-slate-400 group-hover:bg-slate-700"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className={`text-xs font-extrabold tracking-tight ${isActive ? step.textColor : "text-slate-200"}`}>
                      {step.label}
                    </p>
                    <p className="text-[10px] text-slate-400 font-medium leading-none">{step.sub}</p>
                  </div>
                </div>

                {idx < steps.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute -right-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-600 z-10" />
                )}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
