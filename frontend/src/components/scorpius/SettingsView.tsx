"use client";

import React, { useState } from "react";
import {
  Settings,
  User,
  ShieldCheck,
  Bell,
  Sliders,
  Target,
  Sparkles,
  Save,
  CheckCircle2
} from "lucide-react";

interface SettingsViewProps {
  onNavigate: (tab: string) => void;
}

export default function SettingsView({ onNavigate }: SettingsViewProps) {
  const [targetRole, setTargetRole] = useState("Data Analyst");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
              <Settings className="w-5 h-5" />
            </span>
            <div>
              <h1 className="text-2xl font-black text-white tracking-tight">Platform Settings</h1>
              <p className="text-xs text-slate-400 font-medium">
                Configure your SCORPIUS Career Twin profile, target role benchmarks, and AI preferences.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center space-x-2 shadow-md shadow-indigo-600/20 transition-all"
        >
          {saved ? <CheckCircle2 className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
          <span>{saved ? "Settings Saved!" : "Save Preferences"}</span>
        </button>
      </div>

      {/* 2. Preferences Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Candidate Profile */}
        <div className="glass-card p-6 border border-slate-800 bg-slate-900/90 text-slate-100 space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
            <User className="w-5 h-5 text-indigo-400" />
            <h2 className="text-base font-black text-white">Candidate Twin Identity</h2>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="font-extrabold text-slate-300 block mb-1">Full Name</label>
              <input
                type="text"
                defaultValue="Gokul"
                className="w-full p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-white font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div>
              <label className="font-extrabold text-slate-300 block mb-1">Target Role Benchmark</label>
              <select
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-white font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              >
                <option value="Data Analyst" className="bg-slate-900 text-white">Data Analyst</option>
                <option value="Software Developer" className="bg-slate-900 text-white">Software Developer</option>
                <option value="Data Scientist" className="bg-slate-900 text-white">Data Scientist</option>
                <option value="Business Analyst" className="bg-slate-900 text-white">Business Analyst</option>
                <option value="AI/ML Engineer" className="bg-slate-900 text-white">AI/ML Engineer</option>
              </select>
            </div>
          </div>
        </div>

        {/* AI & Assessment Preferences */}
        <div className="glass-card p-6 border border-slate-800 bg-slate-900/90 text-slate-100 space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <h2 className="text-base font-black text-white">AI Speech & NLP Preferences</h2>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <div>
                <p className="font-extrabold text-white">Accent Bias-Free Guarantee</p>
                <p className="text-[11px] text-slate-400">Excludes accent/pronunciation from evaluation</p>
              </div>
              <input type="checkbox" defaultChecked disabled className="w-4 h-4 accent-indigo-500" />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <div>
                <p className="font-extrabold text-white">Auto-Sync Evidence to Twin</p>
                <p className="text-[11px] text-slate-400">Automatically bumps Twin scores after test completion</p>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-indigo-500" />
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
