"use client";

import React, { useState } from "react";
import {
  LayoutDashboard,
  Dna,
  FileCheck2,
  Mic,
  Rocket,
  TrendingUp,
  Bell,
  HelpCircle,
  ChevronDown,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  User,
  LogOut,
  Settings,
  X
} from "lucide-react";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  candidateName?: string;
  targetRole?: string;
}

export default function Navbar({
  activeTab,
  setActiveTab,
  candidateName = "Gokul",
  targetRole = "Data Analyst",
}: NavbarProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "twin", label: "Career Twin", icon: Dna, badge: "Live" },
    { id: "assessments", label: "Assessments", icon: FileCheck2, badge: "3" },
    { id: "interview", label: "Mock Interview", icon: Mic, badge: "AI" },
    { id: "path", label: "Job-Ready Path", icon: Rocket, badge: "+19%" },
    { id: "progress", label: "Progress", icon: TrendingUp },
  ];

  const notifications = [
    { id: 1, title: "Evidence Confidence Increased", desc: "SQL Assessment verified. Confidence bumped to 92%.", time: "10m ago" },
    { id: 2, title: "Critical Blocker Alert", desc: "Power BI required skill gap detected (48% vs 80% target).", time: "1h ago" },
    { id: 3, title: "AI Interview Feedback Ready", desc: "Speech clarity breakdown available for review.", time: "2h ago" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left: Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => setActiveTab("dashboard")}>
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-cyan-500 p-0.5 shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-black text-xl tracking-tight text-white">
                  SCORPIUS
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-indigo-900/60 text-indigo-300 border border-indigo-700/60">
                  v2.4
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-400 tracking-wide leading-none">
                AI Career Readiness Engine
              </p>
            </div>
          </div>

          {/* Center: Top Nav Items */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-all duration-200 ${
                    isActive
                      ? "bg-indigo-600/30 text-cyan-300 border border-indigo-500/50 font-bold shadow-xs"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/60 border border-transparent"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-cyan-400" : "text-slate-400"}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`ml-1 px-1.5 py-0.2 text-[9px] font-extrabold rounded-full uppercase ${
                        isActive ? "bg-indigo-500 text-white" : "bg-slate-800 text-slate-300"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right: Notification, Help, Profile */}
          <div className="flex items-center space-x-3">
            
            {/* Notification Button */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowHelp(false);
                  setShowProfileMenu(false);
                }}
                className="relative p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800 transition-colors"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-cyan-400 ring-2 ring-slate-900" />
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 py-3 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-4 pb-2 border-b border-slate-800 flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-200">Notifications</h4>
                    <span className="text-[10px] font-semibold text-cyan-400 bg-indigo-950 px-2 py-0.5 rounded-full border border-indigo-800">
                      3 New
                    </span>
                  </div>
                  <div className="divide-y divide-slate-800 max-h-64 overflow-y-auto">
                    {notifications.map((n) => (
                      <div key={n.id} className="p-3 hover:bg-slate-800/60 transition-colors cursor-pointer">
                        <div className="flex justify-between items-start">
                          <p className="text-xs font-bold text-slate-200">{n.title}</p>
                          <span className="text-[10px] text-slate-500">{n.time}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1 leading-snug">{n.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Help Button */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowHelp(!showHelp);
                  setShowNotifications(false);
                  setShowProfileMenu(false);
                }}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800 transition-colors"
                title="Help & Guide"
              >
                <HelpCircle className="w-4 h-4" />
              </button>

              {showHelp && (
                <div className="absolute right-0 mt-2 w-72 bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 p-4 z-50">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
                    <h4 className="text-xs font-bold text-slate-200 flex items-center space-x-1.5">
                      <HelpCircle className="w-4 h-4 text-cyan-400" />
                      <span>SCORPIUS Guide</span>
                    </h4>
                    <button onClick={() => setShowHelp(false)} className="text-slate-400 hover:text-slate-200">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    <strong>Evidence-Backed Twin Engine:</strong> Ingest resumes, certificates, taking practical mock tests and AI speech interviews to dynamically close skill blockers.
                  </p>
                </div>
              )}
            </div>

            <div className="h-6 w-px bg-slate-800" />

            {/* User Profile */}
            <button
              onClick={() => setActiveTab("twin")}
              className="flex items-center space-x-2.5 p-1.5 rounded-xl hover:bg-slate-800/80 transition-colors border border-slate-800"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 text-white font-bold flex items-center justify-center text-xs shadow-sm">
                {candidateName.charAt(0)}
              </div>
              <div className="text-left hidden lg:block">
                <p className="text-xs font-bold text-slate-200 leading-tight">{candidateName}</p>
                <p className="text-[10px] text-cyan-400 font-medium leading-tight">{targetRole}</p>
              </div>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
}
