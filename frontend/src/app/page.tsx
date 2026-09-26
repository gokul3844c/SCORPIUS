"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ThreeBackground from "@/components/ThreeBackground";
import AuthModal from "@/components/AuthModal";
import UploadSection from "@/components/UploadSection";
import ReadinessGauge from "@/components/ReadinessGauge";
import JobBlockersTable from "@/components/JobBlockersTable";
import MinimumPathWidget from "@/components/MinimumPathWidget";
import CounterfactualSimulator from "@/components/CounterfactualSimulator";
import ResourceSuggestions from "@/components/ResourceSuggestions";
import TransitionOverlay from "@/components/TransitionOverlay";
import AIChatbot from "@/components/AIChatbot";
import { Brain, RefreshCw, Sparkles, Rocket } from "lucide-react";

// SCORPIUS Modules
import Navbar from "@/components/scorpius/Navbar";
import Sidebar from "@/components/scorpius/Sidebar";
import ContinuousReadinessLoop from "@/components/scorpius/ContinuousReadinessLoop";
import CareerTwinView from "@/components/scorpius/CareerTwinView";
import EvidenceIntelligenceView from "@/components/scorpius/EvidenceIntelligenceView";
import TargetJobsView from "@/components/scorpius/TargetJobsView";
import AssessmentsView from "@/components/scorpius/AssessmentsView";
import MockTestInterface from "@/components/scorpius/MockTestInterface";
import MockTestResultView from "@/components/scorpius/MockTestResultView";
import MockInterviewView from "@/components/scorpius/MockInterviewView";
import MockInterviewResultView from "@/components/scorpius/MockInterviewResultView";
import GapsBlockersView from "@/components/scorpius/GapsBlockersView";
import WhatIfSimulatorView from "@/components/scorpius/WhatIfSimulatorView";
import JobReadyPathView from "@/components/scorpius/JobReadyPathView";
import ProgressView from "@/components/scorpius/ProgressView";
import SettingsView from "@/components/scorpius/SettingsView";

const INITIAL_ROLES = [
  { role_id: "data_analyst_intern", role_name: "Data Analyst Intern", description: "Analyzes datasets, builds dashboards, and queries relational databases." },
  { role_id: "data_scientist", role_name: "Data Scientist", description: "Builds predictive models, applies machine learning, and extracts insights from complex data." },
  { role_id: "web_developer", role_name: "Web Developer", description: "Creates responsive, accessible websites using HTML, CSS, JavaScript, and modern tools." },
  { role_id: "full_stack_developer", role_name: "Full Stack Developer", description: "Architects end-to-end web applications combining modern frontend UIs with robust backend APIs." },
  { role_id: "data_engineer", role_name: "Data Engineer", description: "Builds scalable data pipelines, data warehouses, and big data streaming architecture." },
  { role_id: "frontend_dev_intern", role_name: "Frontend Developer Intern", description: "Develops responsive web UIs using React, Next.js, and TypeScript." },
  { role_id: "aiml_intern", role_name: "AI/ML Engineer Intern", description: "Trains machine learning models, works with PyTorch/TensorFlow, and builds pipelines." },
];

function DashboardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Navigation tab state
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);

  // Original state & backend API synchronization
  const [userProfile, setUserProfile] = useState<any>(null);
  const [roles, setRoles] = useState(INITIAL_ROLES);
  const [selectedRole, setSelectedRole] = useState("data_analyst_intern");
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [simulatedData, setSimulatedData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTransition, setActiveTransition] = useState<string | null>(null);

  useEffect(() => {
    const authType = searchParams.get("auth");
    if (authType === "signin") {
      setActiveTransition("SYNCING TWIN SCORECARD...");
      const timer = setTimeout(() => {
        router.replace("/");
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  useEffect(() => {
    const storedUser = localStorage.getItem("scorpius_candidate_user");
    if (storedUser) {
      setUserProfile(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    fetch("http://localhost:8000/api/roles")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setRoles(data);
        }
      })
      .catch((err) => console.warn("Using preset roles fallback:", err));
  }, []);

  const fetchAnalysis = async (roleId: string) => {
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role_id: roleId }),
      });
      if (res.ok) {
        const data = await res.json();
        setAnalysisData({
          overall_readiness_pct: data.analysis.overall_readiness_pct,
          breakdown: data.analysis.breakdown,
          confidence_scores: data.confidence_scores,
          all_skills: data.analysis.all_skills,
          job_blockers: data.analysis.job_blockers,
          minimum_path: data.minimum_path,
        });
      }
    } catch (err) {
      console.warn("Backend API offline:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalysis(selectedRole);
  }, [selectedRole]);

  const handleRoleChange = (newRole: string) => {
    setSelectedRole(newRole);
    setSimulatedData(null);
  };

  const handleResumeUploaded = (uploadResult: any) => {
    if (uploadResult.analysis) {
      setAnalysisData({
        overall_readiness_pct: uploadResult.analysis.overall_readiness_pct,
        breakdown: uploadResult.analysis.breakdown,
        confidence_scores: uploadResult.confidence_scores,
        all_skills: uploadResult.analysis.all_skills,
        job_blockers: uploadResult.analysis.job_blockers,
        minimum_path: uploadResult.minimum_path,
      });
    }
  };

  const handleLogoutClear = () => {
    localStorage.removeItem("scorpius_candidate_user");
    setUserProfile(null);
  };

  const currentReadinessScore = analysisData?.overall_readiness_pct || 63.5;
  const projectedReadinessScore = simulatedData ? simulatedData.projected_readiness_pct : null;
  const currentBreakdown = simulatedData ? simulatedData.simulated_breakdown : (analysisData?.breakdown || { Technical: 65, Practical: 60, Certification: 64 });
  const activeSkillsList = simulatedData ? simulatedData.simulated_all_skills : (analysisData?.all_skills || []);
  const activeMinPath = simulatedData ? simulatedData.simulated_minimum_path : (analysisData?.minimum_path || null);
  const blockerSkills = (analysisData?.job_blockers || []);

  const getLoopStage = (): "PROOF" | "GAP" | "ACTION" | "REASSESS" => {
    switch (activeTab) {
      case "twin":
      case "gaps-blockers":
        return "GAP";
      case "assessments":
      case "mock-test":
      case "mock-test-result":
      case "interview":
      case "interview-result":
        return "REASSESS";
      case "what-if":
      case "path":
        return "ACTION";
      case "evidence":
      case "target-jobs":
      case "progress":
      case "dashboard":
      default:
        return "PROOF";
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      
      {/* 1. 3D Canvas Background */}
      <ThreeBackground />

      {/* 2. Transition Overlay */}
      {activeTransition && (
        <TransitionOverlay
          message={activeTransition}
          onComplete={() => setActiveTransition(null)}
        />
      )}

      {/* 3. Persistent Top Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        candidateName={userProfile?.name || "Gokul"}
        targetRole={roles.find((r) => r.role_id === selectedRole)?.role_name || "Data Analyst"}
      />

      {/* 4. Main Content Area with Collapsible Sidebar */}
      <div className="relative z-10 flex max-w-7xl w-full mx-auto">
        
        {/* Collapsible Left Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
        />

        {/* Main Content Workspace */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 min-w-0">
          
          {/* Continuous Readiness Loop Banner */}
          <ContinuousReadinessLoop
            currentStage={getLoopStage()}
            onStageClick={(targetTab) => setActiveTab(targetTab)}
          />

          {/* VIEW 1: DASHBOARD (Original 3D Dark Twin Dashboard) */}
          {activeTab === "dashboard" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              
              {/* Header Bar */}
              <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div>
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
                      <Brain className="w-7 h-7" />
                    </div>
                    <div>
                      <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                        Career Readiness Twin
                      </h1>
                      <p className="text-xs sm:text-sm text-slate-400 font-medium">
                        AI-Powered Skill Confidence Scoring & Job Blocker Diagnostics
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <AuthModal
                    user={userProfile}
                    onLogout={handleLogoutClear}
                  />
                </div>
              </header>

              {/* Target Role Selector Bar */}
              <div className="glass-card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Select Target Role:
                  </span>
                  <select
                    value={selectedRole}
                    onChange={(e) => handleRoleChange(e.target.value)}
                    className="bg-slate-950 text-slate-100 font-bold text-xs px-3 py-2 rounded-xl border border-slate-700 focus:outline-none focus:border-indigo-500"
                  >
                    {roles.map((r) => (
                      <option key={r.role_id} value={r.role_id}>
                        {r.role_name}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={() => fetchAnalysis(selectedRole)}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center space-x-2 transition-all shadow-md shadow-indigo-600/20"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
                  <span>Refresh Twin Scorecard</span>
                </button>
              </div>

              {/* Upload Resume Section */}
              <UploadSection
                roles={roles}
                selectedRole={selectedRole}
                onRoleChange={handleRoleChange}
                onResumeUploaded={handleResumeUploaded}
              />

              {/* Readiness Gauge Hero Component */}
              <ReadinessGauge
                currentScore={currentReadinessScore}
                projectedScore={projectedReadinessScore}
                breakdown={currentBreakdown}
              />

              {/* Job Blockers Table & Minimum Path Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-7">
                  <JobBlockersTable skills={blockerSkills} />
                </div>
                <div className="lg:col-span-5">
                  <MinimumPathWidget pathData={activeMinPath} />
                </div>
              </div>

              {/* Counterfactual Scenario Simulator */}
              <CounterfactualSimulator
                selectedRole={selectedRole}
                candidateSkills={{}}
                onSimulationUpdate={(simData) => setSimulatedData(simData)}
              />

              {/* Learning Resource Recommendations */}
              <ResourceSuggestions
                selectedRole={selectedRole}
                blockerSkills={blockerSkills}
              />

            </div>
          )}

          {/* VIEW 2: CAREER TWIN */}
          {activeTab === "twin" && (
            <CareerTwinView onNavigate={(tab) => setActiveTab(tab)} />
          )}

          {/* VIEW 3: EVIDENCE INTELLIGENCE */}
          {activeTab === "evidence" && (
            <EvidenceIntelligenceView onNavigate={(tab) => setActiveTab(tab)} />
          )}

          {/* VIEW 4: TARGET JOBS */}
          {activeTab === "target-jobs" && (
            <TargetJobsView onNavigate={(tab) => setActiveTab(tab)} />
          )}

          {/* VIEW 5: ASSESSMENTS HUB */}
          {activeTab === "assessments" && (
            <AssessmentsView
              onNavigate={(tab) => setActiveTab(tab)}
              onStartTest={() => setActiveTab("mock-test")}
              onStartInterview={() => setActiveTab("interview")}
            />
          )}

          {/* VIEW 6: MOCK TEST EXAM */}
          {activeTab === "mock-test" && (
            <MockTestInterface
              onSubmitTest={() => setActiveTab("mock-test-result")}
              onBackToAssessments={() => setActiveTab("assessments")}
            />
          )}

          {/* VIEW 7: MOCK TEST RESULT */}
          {activeTab === "mock-test-result" && (
            <MockTestResultView onNavigate={(tab) => setActiveTab(tab)} />
          )}

          {/* VIEW 8: MOCK INTERVIEW */}
          {activeTab === "interview" && (
            <MockInterviewView onCompleteInterview={() => setActiveTab("interview-result")} />
          )}

          {/* VIEW 9: MOCK INTERVIEW RESULT */}
          {activeTab === "interview-result" && (
            <MockInterviewResultView onNavigate={(tab) => setActiveTab(tab)} />
          )}

          {/* VIEW 10: GAPS & BLOCKERS */}
          {activeTab === "gaps-blockers" && (
            <GapsBlockersView onNavigate={(tab) => setActiveTab(tab)} />
          )}

          {/* VIEW 11: WHAT-IF SIMULATOR */}
          {activeTab === "what-if" && (
            <WhatIfSimulatorView onNavigate={(tab) => setActiveTab(tab)} />
          )}

          {/* VIEW 12: JOB-READY PATH */}
          {activeTab === "path" && (
            <JobReadyPathView onNavigate={(tab) => setActiveTab(tab)} />
          )}

          {/* VIEW 13: PROGRESS */}
          {activeTab === "progress" && (
            <ProgressView onNavigate={(tab) => setActiveTab(tab)} />
          )}

          {/* VIEW 14: SETTINGS */}
          {activeTab === "settings" && (
            <SettingsView onNavigate={(tab) => setActiveTab(tab)} />
          )}

        </main>
      </div>

      {/* AI Chatbot Assistant */}
      <AIChatbot
        selectedRole={selectedRole}
        readinessPct={currentReadinessScore}
      />

    </div>
  );
}

export default function Dashboard() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center text-xs">Loading SCORPIUS...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
