"use client";

import React, { useState } from "react";
import {
  Briefcase,
  Building2,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Target,
  Layers,
  BarChart3,
  Users,
  Code2
} from "lucide-react";

interface TargetJobsViewProps {
  onNavigate: (tab: string) => void;
}

export default function TargetJobsView({ onNavigate }: TargetJobsViewProps) {
  const [selectedJob, setSelectedJob] = useState("Data Analyst");

  const jobs = [
    {
      title: "Data Analyst",
      company: "Enterprise Benchmark",
      reqSkills: ["SQL", "Python", "Power BI", "Statistics"],
      responsibilities: [
        "Data Cleaning & Transformation",
        "Exploratory Data Analysis",
        "Interactive Dashboard Development",
        "Executive Reporting & Storytelling",
      ],
      behavioral: ["Communication & Presentation", "Analytical Problem Solving", "Cross-Functional Collaboration"],
      matchPct: 86,
    },
    {
      title: "Business Intelligence Analyst",
      company: "TechCorp Global",
      reqSkills: ["SQL", "Power BI", "Tableau", "ETL"],
      responsibilities: [
        "Automating SQL Data Pipelines",
        "Designing Executive KPIs",
        "A/B Test Evaluation",
      ],
      behavioral: ["Stakeholder Management", "Strategic Reasoning"],
      matchPct: 80,
    },
    {
      title: "Data Scientist",
      company: "AI Labs",
      reqSkills: ["Python", "SQL", "Machine Learning", "Statistics"],
      responsibilities: [
        "Predictive Modeling",
        "Statistical Hypothesis Testing",
        "Feature Engineering",
      ],
      behavioral: ["Research Curiosity", "Technical Writing"],
      matchPct: 74,
    },
  ];

  const activeJob = jobs.find((j) => j.title === selectedJob) || jobs[0];

  return (
    <div className="space-y-6">
      
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-indigo-950/80 border border-indigo-800 text-indigo-400">
              <Briefcase className="w-5 h-5" />
            </span>
            <div>
              <h1 className="text-2xl font-black text-white tracking-tight">Target Jobs Intelligence</h1>
              <p className="text-xs text-slate-400 font-medium">
                Live market role benchmarks evaluated against your Career Twin proof.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {jobs.map((j) => (
            <button
              key={j.title}
              onClick={() => setSelectedJob(j.title)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
                selectedJob === j.title
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                  : "bg-slate-950/60 text-slate-300 border-slate-800 hover:bg-slate-800"
              }`}
            >
              {j.title}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Active Job Detail Card */}
      <div className="glass-card p-6 border border-slate-800 bg-slate-900/90 text-slate-100 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Target Role Profile</span>
              <span className="px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800 text-[10px] font-bold">
                Match: {activeJob.matchPct}%
              </span>
            </div>
            <h2 className="text-xl font-black text-white mt-1">{activeJob.title}</h2>
          </div>

          <button
            onClick={() => onNavigate("twin")}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs flex items-center justify-center space-x-2 shadow-md shadow-indigo-600/20 transition-all"
          >
            <Target className="w-4 h-4" />
            <span>Analyze My Readiness →</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Required Skills */}
          <div className="space-y-3 p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center space-x-1.5">
              <Code2 className="w-4 h-4 text-indigo-400" />
              <span>Required Technical Skills</span>
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {activeJob.reqSkills.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1 rounded-lg bg-slate-900 text-slate-200 text-xs font-bold border border-slate-700 shadow-2xs"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Responsibilities */}
          <div className="space-y-3 p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center space-x-1.5">
              <BarChart3 className="w-4 h-4 text-cyan-400" />
              <span>Key Responsibilities</span>
            </h3>
            <ul className="space-y-1 text-xs text-slate-300 font-medium">
              {activeJob.responsibilities.map((r, idx) => (
                <li key={idx} className="flex items-start space-x-1.5">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Behavioral Requirements */}
          <div className="space-y-3 p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center space-x-1.5">
              <Users className="w-4 h-4 text-purple-400" />
              <span>Behavioral Expectations</span>
            </h3>
            <ul className="space-y-1 text-xs text-slate-300 font-medium">
              {activeJob.behavioral.map((b, idx) => (
                <li key={idx} className="flex items-start space-x-1.5">
                  <span className="text-purple-400 font-bold">•</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

    </div>
  );
}
