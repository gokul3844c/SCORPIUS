"use client";

import React from "react";
import {
  LayoutDashboard,
  Dna,
  FileCheck2,
  Mic,
  Rocket,
  TrendingUp,
  Briefcase,
  FolderCheck,
  AlertTriangle,
  Sliders,
  Settings,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Sparkles
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

export default function Sidebar({
  activeTab,
  setActiveTab,
  isCollapsed,
  setIsCollapsed,
}: SidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "twin", label: "Career Twin", icon: Dna, badge: "Live" },
    { id: "evidence", label: "Evidence Intelligence", icon: FolderCheck, badge: "91%" },
    { id: "target-jobs", label: "Target Jobs", icon: Briefcase },
    { id: "assessments", label: "Assessments", icon: FileCheck2 },
    { id: "interview", label: "Mock Interview", icon: Mic, badge: "AI" },
    { id: "gaps-blockers", label: "Skill Gaps & Blockers", icon: AlertTriangle, alert: true },
    { id: "what-if", label: "What-If Simulator", icon: Sliders, badge: "AI" },
    { id: "path", label: "Job-Ready Path", icon: Rocket, badge: "+19%" },
    { id: "progress", label: "Progress", icon: TrendingUp },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside
      className={`sticky top-16 h-[calc(100vh-4rem)] bg-slate-900/90 backdrop-blur-md border-r border-slate-800/80 transition-all duration-300 z-40 flex flex-col justify-between select-none text-slate-100 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="p-3 space-y-4">
        
        {/* Toggle */}
        <div className="flex items-center justify-between px-2 py-1 border-b border-slate-800">
          {!isCollapsed && (
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
              SCORPIUS Modules
            </span>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors mx-auto"
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Menu */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center ${
                  isCollapsed ? "justify-center px-2" : "justify-between px-3"
                } py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                  isActive
                    ? "bg-indigo-600/30 text-cyan-300 border border-indigo-500/50 font-bold shadow-xs"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/60 border border-transparent"
                }`}
                title={isCollapsed ? item.label : undefined}
              >
                <div className="flex items-center space-x-3 truncate">
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      isActive ? "text-cyan-400" : item.alert ? "text-rose-400" : "text-slate-400"
                    }`}
                  />
                  {!isCollapsed && <span className="truncate">{item.label}</span>}
                </div>

                {!isCollapsed && item.badge && (
                  <span
                    className={`px-1.5 py-0.2 text-[9px] font-extrabold rounded-full uppercase shrink-0 ${
                      isActive ? "bg-indigo-500 text-white" : "bg-slate-800 text-slate-300 border border-slate-700"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
                {!isCollapsed && item.alert && (
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping shrink-0" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {!isCollapsed && (
        <div className="p-3 m-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-white space-y-1">
          <div className="flex items-center space-x-1.5 text-cyan-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Twin Engine Active</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-tight">
            Syncing across all 11 intelligence modules.
          </p>
        </div>
      )}
    </aside>
  );
}
