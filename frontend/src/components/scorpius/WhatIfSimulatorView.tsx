"use client";

import React, { useState } from "react";
import {
  Sliders,
  Sparkles,
  TrendingUp,
  Clock,
  ArrowRight,
  CheckSquare,
  Square,
  BarChart2,
  Brain,
  Mic,
  Rocket
} from "lucide-react";

interface WhatIfSimulatorViewProps {
  onNavigate: (tab: string) => void;
}

export default function WhatIfSimulatorView({ onNavigate }: WhatIfSimulatorViewProps) {
  const [selectedItems, setSelectedItems] = useState<Record<number, boolean>>({
    1: true, // Power BI (+8%)
    2: true, // SQL (+7%)
    3: false, // Python (+1%)
    4: true, // AI Interview (+4%)
  });

  const options = [
    { id: 1, title: "Power BI Dashboard Project", gain: 8, hours: 10, category: "Blocker Fix", icon: BarChart2 },
    { id: 2, title: "SQL Practical Assessment", gain: 7, hours: 8, category: "Technical Mastery", icon: Brain },
    { id: 3, title: "Advanced Python Course", gain: 1, hours: 30, category: "Optional Skill", icon: Rocket },
    { id: 4, title: "AI Mock Interview", gain: 4, hours: 3, category: "Speech Clarity", icon: Mic },
  ];

  const toggleOption = (id: number) => {
    setSelectedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const initialReadiness = 73;
  const totalGain = options.reduce((acc, opt) => (selectedItems[opt.id] ? acc + opt.gain : acc), 0);
  const totalEffort = options.reduce((acc, opt) => (selectedItems[opt.id] ? acc + opt.hours : acc), 0);
  const projectedReadiness = initialReadiness + totalGain;

  return (
    <div className="space-y-6">
      
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-purple-950/80 border border-purple-800/60 text-purple-400">
              <Sliders className="w-5 h-5" />
            </span>
            <div>
              <h1 className="text-2xl font-black text-white tracking-tight">What-If Career Simulator</h1>
              <p className="text-xs text-slate-400 font-medium">
                Simulate potential learning decisions to calculate projected readiness impact before investing effort.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 bg-purple-950/80 px-3 py-1.5 rounded-xl border border-purple-800 text-purple-300 text-xs font-bold">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span>Counterfactual Engine Active</span>
        </div>
      </div>

      {/* 2. Simulation Projection Hero Banner */}
      <div className="glass-card p-6 border border-indigo-500/40 bg-gradient-to-r from-slate-950 via-indigo-950/90 to-slate-900 text-white shadow-xl space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest bg-cyan-950/80 px-2.5 py-1 rounded border border-cyan-800/60">
              Readiness Projection Engine
            </span>
            <h2 className="text-2xl font-black tracking-tight text-white">
              Target Role Readiness Projection
            </h2>
            <p className="text-xs text-slate-300">
              Selected actions yield a projected jump from <strong>{initialReadiness}%</strong> to <strong className="text-emerald-400">{projectedReadiness}%</strong> in <strong>{totalEffort} hours</strong>.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 bg-slate-900/60 backdrop-blur-md p-4 rounded-2xl border border-slate-800/80 text-center">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Current</span>
              <span className="text-xl font-black text-slate-300">{initialReadiness}%</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-cyan-400 uppercase block">Projected</span>
              <span className="text-2xl font-black text-emerald-400">{projectedReadiness}%</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Effort</span>
              <span className="text-xl font-black text-cyan-400">{totalEffort}h</span>
            </div>
          </div>
        </div>

        {/* Readiness Bar Projection Graphic */}
        <div className="space-y-2 pt-2 border-t border-slate-800/80">
          <div className="flex justify-between items-center text-xs font-bold">
            <span className="text-slate-300">Target Role Threshold (85%)</span>
            <span className="text-emerald-400">{projectedReadiness >= 85 ? "Target Exceeded!" : "Below Target"}</span>
          </div>
          <div className="w-full h-4 rounded-full bg-slate-950 relative overflow-hidden p-0.5 border border-slate-800">
            {/* Target threshold marker */}
            <div className="absolute top-0 bottom-0 left-[85%] w-0.5 bg-amber-400 z-20 shadow-glow" title="Target Role Threshold (85%)" />
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 transition-all duration-700"
              style={{ width: `${projectedReadiness}%` }}
            />
          </div>
        </div>
      </div>

      {/* 3. Action Selection Checkboxes */}
      <div className="space-y-4">
        <h2 className="text-sm font-black text-white uppercase tracking-wider">
          Select Learning & Evidence Improvements
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {options.map((opt) => {
            const isChecked = !!selectedItems[opt.id];
            const Icon = opt.icon;

            return (
              <div
                key={opt.id}
                onClick={() => toggleOption(opt.id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-start space-x-4 ${
                  isChecked
                    ? "bg-indigo-950/80 border-indigo-500/80 shadow-lg ring-1 ring-indigo-500/30 text-white"
                    : "bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300"
                }`}
              >
                <button className={`mt-1 text-indigo-400 transition-transform ${isChecked ? "scale-110" : ""}`}>
                  {isChecked ? <CheckSquare className="w-5 h-5 fill-indigo-500 text-white" /> : <Square className="w-5 h-5 text-slate-600" />}
                </button>

                <div className="space-y-1 flex-1">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-extrabold text-white flex items-center space-x-2">
                      <Icon className="w-4 h-4 text-indigo-400" />
                      <span>{opt.title}</span>
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 text-xs font-black">
                      +{opt.gain}%
                    </span>
                  </div>

                  <div className="flex items-center space-x-3 text-xs text-slate-400 pt-0.5">
                    <span>Category: {opt.category}</span>
                    <span>•</span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{opt.hours} hours</span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Apply CTA */}
      <div className="flex justify-end pt-2">
        <button
          onClick={() => onNavigate("path")}
          className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center space-x-2 shadow-lg shadow-emerald-600/20 transition-all hover:scale-[1.01]"
        >
          <span>Apply Recommended Path →</span>
        </button>
      </div>

    </div>
  );
}
