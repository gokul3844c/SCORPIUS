"use client";

import React from "react";
import { Gauge, Cpu, Wrench, Award, TrendingUp, ArrowRight } from "lucide-react";

interface ReadinessGaugeProps {
  currentScore: number;
  projectedScore?: number | null;
  breakdown: {
    Technical?: number;
    Practical?: number;
    Certification?: number;
  };
}

export default function ReadinessGauge({
  currentScore,
  projectedScore,
  breakdown,
}: ReadinessGaugeProps) {
  const displayCurrent = Math.round(currentScore || 0);
  const displayProjected = projectedScore ? Math.round(projectedScore) : null;
  const isBoosted = displayProjected !== null && displayProjected !== displayCurrent;

  // Arc calculation for semi-circle gauge (0 to 180 degrees)
  const scoreForGauge = isBoosted ? displayProjected : displayCurrent;
  const strokeDasharray = 283; // Circumference for r=45
  const strokeDashoffset = strokeDasharray - (strokeDasharray * (scoreForGauge / 100));

  return (
    <div className="glass-card p-6 border border-slate-800 bg-slate-900/90 rounded-2xl shadow-xl flex flex-col justify-between">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
            <Gauge className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-100">Career Readiness Twin</h2>
            <p className="text-xs text-slate-400">AI-Verified Qualification Level</p>
          </div>
        </div>
        {isBoosted && (
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 animate-pulse flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> Simulated Projection
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        
        {/* Readiness Gauge Arc Display */}
        <div className="md:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-950/60 border border-slate-800 rounded-xl">
          <div className="relative w-44 h-44 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Background Circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                className="text-slate-800 stroke-current"
                strokeWidth="10"
                fill="transparent"
              />
              {/* Progress Arc */}
              <circle
                cx="50"
                cy="50"
                r="45"
                className={`transition-all duration-700 ease-out stroke-current ${
                  scoreForGauge >= 85
                    ? "text-emerald-500"
                    : scoreForGauge >= 70
                    ? "text-indigo-500"
                    : "text-amber-500"
                }`}
                strokeWidth="10"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              {isBoosted ? (
                <div className="flex items-center gap-1">
                  <span className="text-2xl font-bold text-slate-400 line-through opacity-70">
                    {displayCurrent}%
                  </span>
                  <ArrowRight className="w-4 h-4 text-emerald-400" />
                  <span className="text-4xl font-extrabold text-emerald-400">
                    {displayProjected}%
                  </span>
                </div>
              ) : (
                <span className="text-4xl font-extrabold text-slate-100">
                  {displayCurrent}%
                </span>
              )}
              <span className="text-xs font-medium text-slate-400 mt-1 uppercase tracking-wider">
                Readiness Score
              </span>
            </div>
          </div>
        </div>

        {/* 3 Domain Breakdown Cards (Technical, Practical, Certification) */}
        <div className="md:col-span-7 grid grid-cols-1 gap-3">
          
          {/* Technical Indicator */}
          <div className="p-3 bg-slate-950/40 border border-slate-800 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                <Cpu className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Technical Competency</p>
                <p className="text-sm font-bold text-slate-200">
                  Core Engineering & Logic
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-base font-bold text-blue-400">
                {Math.round(breakdown.Technical || 0)}%
              </span>
            </div>
          </div>

          {/* Practical Indicator */}
          <div className="p-3 bg-slate-950/40 border border-slate-800 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                <Wrench className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Practical Competency</p>
                <p className="text-sm font-bold text-slate-200">
                  GitHub & Hands-on Projects
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-base font-bold text-emerald-400">
                {Math.round(breakdown.Practical || 0)}%
              </span>
            </div>
          </div>

          {/* Certification Indicator */}
          <div className="p-3 bg-slate-950/40 border border-slate-800 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Certification Verified</p>
                <p className="text-sm font-bold text-slate-200">
                  Assessment & Accreditation
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-base font-bold text-purple-400">
                {Math.round(breakdown.Certification || 0)}%
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
