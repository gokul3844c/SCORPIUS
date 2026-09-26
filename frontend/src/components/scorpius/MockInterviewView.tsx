"use client";

import React, { useState } from "react";
import {
  Mic,
  MicOff,
  Sparkles,
  Bot,
  Brain,
  Volume2,
  CheckCircle2,
  ArrowRight,
  Info,
  RotateCcw,
  SkipForward,
  MessageSquare,
  ShieldCheck
} from "lucide-react";

interface MockInterviewViewProps {
  onCompleteInterview: () => void;
}

export default function MockInterviewView({ onCompleteInterview }: MockInterviewViewProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [candidateResponse, setCandidateResponse] = useState(
    "In my recent project, I queried customer e-commerce logs using SQL window functions (ROW_NUMBER) to partition by customer email and isolate duplicate transaction records. After deduplicating, we saw a 14% improvement in revenue reporting accuracy."
  );
  const [hasAnswered, setHasAnswered] = useState(false);
  const [showFollowUp, setShowFollowUp] = useState(false);
  const [followUpAnswered, setFollowUpAnswered] = useState(false);

  const communicationMetrics = [
    { label: "Clarity", pct: 82, color: "bg-indigo-600" },
    { label: "Structure", pct: 78, color: "bg-cyan-600" },
    { label: "Relevance", pct: 91, color: "bg-emerald-600" },
    { label: "Technical Explanation", pct: 75, color: "bg-purple-600" },
    { label: "Conciseness", pct: 69, color: "bg-amber-600" },
  ];

  const handleToggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
    } else {
      setIsRecording(false);
      setHasAnswered(true);
      setShowFollowUp(true);
    }
  };

  const handleFinishFollowUp = () => {
    setFollowUpAnswered(true);
    setShowFollowUp(false);
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Top Header */}
      <div className="glass-card p-5 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/90 text-slate-100">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-400">
              <Mic className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold text-purple-300 uppercase tracking-wider">
              Real-time Speech Evaluation
            </span>
          </div>
          <h1 className="text-xl font-black text-white mt-1">AI Mock Interview</h1>
        </div>

        <div className="flex items-center space-x-3 text-xs font-bold">
          <div className="px-3 py-1.5 rounded-xl bg-slate-950/60 text-slate-300 border border-slate-800">
            Target Role: <strong className="text-indigo-300">Data Analyst</strong>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-purple-950/80 text-purple-300 border border-purple-800">
            Interview Type: <strong>HR + Technical + Behavioral</strong>
          </div>
        </div>
      </div>

      {/* 2. Main Interview Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: AI Avatar & Progress (3 cols) */}
        <div className="glass-card lg:col-span-3 p-5 border border-slate-800 flex flex-col justify-between items-center text-center space-y-6 bg-slate-900/90 text-slate-100">
          <div className="space-y-4 w-full">
            
            {/* AI Avatar */}
            <div className="relative mx-auto w-24 h-24 rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-cyan-500 p-1 shadow-xl">
              <div className="w-full h-full bg-slate-950 rounded-[20px] flex flex-col items-center justify-center relative overflow-hidden">
                <Bot className="w-10 h-10 text-cyan-400 animate-bounce" />
                <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest mt-1">AI 3.0</span>
              </div>
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full ring-2 ring-slate-900" />
            </div>

            <div>
              <h3 className="text-sm font-black text-white">SCORPIUS AI Interviewer</h3>
              <p className="text-[11px] text-slate-400 font-medium">Adaptive NLP Engine</p>
            </div>

            {/* Progress Pill */}
            <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Progress</span>
              <p className="text-sm font-black text-indigo-300">Question 4 / 10</p>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden mt-1">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: "40%" }} />
              </div>
            </div>
          </div>

          <div className="w-full pt-4 border-t border-slate-800">
            <span className="text-[10px] text-slate-400 font-semibold block">Session ID: SC-892-AI</span>
          </div>
        </div>

        {/* Center Column: Question & Speech Interface (5 cols) */}
        <div className="glass-card lg:col-span-5 p-6 border border-slate-800 space-y-6 flex flex-col justify-between bg-slate-900/90 text-slate-100">
          
          <div className="space-y-5">
            {/* Question Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-950 to-slate-950 text-white shadow-md space-y-2 relative overflow-hidden border border-indigo-800/60">
              <div className="flex justify-between items-center text-[10px] font-bold text-cyan-300 uppercase tracking-wider">
                <span className="flex items-center space-x-1">
                  <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>AI Prompt</span>
                </span>
                <span>Technical & Scenario</span>
              </div>
              <blockquote className="text-sm font-extrabold leading-relaxed text-slate-100 pt-1">
                &ldquo;Tell me about a project where you used SQL to solve a real-world problem.&rdquo;
              </blockquote>
            </div>

            {/* Waveform visualizer while candidate speaks */}
            <div className={`p-4 rounded-2xl border transition-all ${
              isRecording ? "bg-purple-950/80 border-purple-800 ring-1 ring-purple-500/30" : "bg-slate-950/60 border-slate-800"
            }`}>
              <div className="flex justify-between items-center mb-2 text-xs font-bold text-slate-300">
                <span className="flex items-center space-x-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${isRecording ? "bg-rose-500 animate-ping" : "bg-slate-500"}`} />
                  <span>{isRecording ? "Recording Live Speech..." : "Candidate Microphone Status"}</span>
                </span>
                <span className="text-[11px] font-mono text-slate-400">{isRecording ? "00:42" : "Ready"}</span>
              </div>

              {/* Waveform graphic */}
              <div className="h-12 flex items-center justify-center space-x-1.5 py-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i) => (
                  <div
                    key={i}
                    className={`w-1.5 rounded-full transition-all duration-300 ${
                      isRecording
                        ? "bg-purple-500 animate-pulse"
                        : "bg-slate-700 h-2"
                    }`}
                    style={{
                      height: isRecording ? `${Math.sin(i * 0.8) * 16 + 22}px` : "8px",
                      animationDelay: `${i * 0.08}s`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Candidate Response Transcript */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex justify-between">
                <span>Spoken Transcript / Text Answer</span>
                <span className="text-indigo-400 font-normal lowercase">editable transcript</span>
              </label>
              <textarea
                value={candidateResponse}
                onChange={(e) => setCandidateResponse(e.target.value)}
                rows={3}
                className="w-full p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs font-medium text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none"
              />
            </div>
          </div>

          {/* Record Button & Actions */}
          <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleToggleRecording}
              className={`w-full py-3.5 rounded-xl font-extrabold text-xs flex items-center justify-center space-x-2.5 shadow-md transition-all ${
                isRecording
                  ? "bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/20"
                  : "bg-purple-600 hover:bg-purple-700 text-white shadow-purple-600/20"
              }`}
            >
              {isRecording ? (
                <>
                  <MicOff className="w-4 h-4 animate-bounce" />
                  <span>⏹ Stop & Submit Answer</span>
                </>
              ) : (
                <>
                  <Mic className="w-4 h-4" />
                  <span>🎙 Start Answer</span>
                </>
              )}
            </button>

            {hasAnswered && (
              <button
                onClick={onCompleteInterview}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-sm whitespace-nowrap"
              >
                <span>Finish Session →</span>
              </button>
            )}
          </div>

        </div>

        {/* Right Column: Live Communication Analysis (4 cols) */}
        <div className="glass-card lg:col-span-4 p-5 border border-slate-800 space-y-5 flex flex-col justify-between bg-slate-900/90 text-slate-100">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-xs font-extrabold text-white uppercase tracking-wider">
                Communication Analysis
              </h2>
              <span className="text-[10px] font-bold text-purple-300 bg-purple-950/80 px-2 py-0.5 rounded-full border border-purple-800">
                Live NLP
              </span>
            </div>

            <div className="space-y-3.5 pt-3">
              {communicationMetrics.map((cm) => (
                <div key={cm.label} className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-extrabold text-slate-300">{cm.label}</span>
                    <span className="font-black text-white">{cm.pct}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className={`h-full ${cm.color} rounded-full transition-all duration-500`}
                      style={{ width: `${cm.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Accent & Pronunciation Disclaimer Note */}
            <div className="mt-5 p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start space-x-2 text-[11px] text-slate-400">
              <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <p className="leading-snug">
                <strong>Fairness Guarantee:</strong> Accent and regional pronunciation are <em>NOT</em> evaluated as negative factors. Scoring focuses strictly on technical clarity and content structure.
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 text-center">
            <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800 inline-flex items-center space-x-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>Bias-Free NLP Verified</span>
            </span>
          </div>
        </div>

      </div>

      {/* 3. ADAPTIVE FOLLOW-UP SECTION / MODAL */}
      {showFollowUp && (
        <div className="glass-card p-6 border border-purple-500/40 bg-gradient-to-r from-slate-950 via-purple-950/40 to-slate-900 text-slate-100 shadow-xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="p-2 rounded-xl bg-purple-600 text-white shadow-xs">
                <Sparkles className="w-4 h-4" />
              </span>
              <div>
                <span className="text-xs font-black uppercase text-purple-300 tracking-wider">
                  AI Adaptive Follow-Up
                </span>
                <p className="text-[11px] text-slate-400 font-medium">
                  Dynamically generated based on your previous response details.
                </p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-purple-950/80 text-purple-300 border border-purple-800 text-[10px] font-bold">
              Follow-Up #1
            </span>
          </div>

          <blockquote className="text-base font-extrabold text-white p-4 rounded-xl bg-slate-950/60 border border-slate-800 shadow-xs">
            &ldquo;How did you validate the accuracy of the results?&rdquo;
          </blockquote>

          <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
            <button
              onClick={handleFinishFollowUp}
              className="px-4 py-2 rounded-xl border border-slate-800 text-slate-300 hover:bg-slate-800 font-bold text-xs flex items-center space-x-1.5"
            >
              <SkipForward className="w-4 h-4" />
              <span>⏭ Skip Question</span>
            </button>

            <button
              onClick={handleFinishFollowUp}
              className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center space-x-2 shadow-md shadow-purple-600/20"
            >
              <Mic className="w-4 h-4" />
              <span>🎙 Answer Follow-Up</span>
            </button>
          </div>
        </div>
      )}

      {/* Button to jump to Interview Results directly for review */}
      <div className="flex justify-end pt-2">
        <button
          onClick={onCompleteInterview}
          className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs flex items-center space-x-2 shadow-md"
        >
          <span>View Interview Evaluation Results →</span>
        </button>
      </div>

    </div>
  );
}
