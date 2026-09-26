"use client";

import React, { useState, useEffect } from "react";
import {
  Clock,
  Bookmark,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Brain,
  Sparkles,
  CheckSquare
} from "lucide-react";

interface MockTestInterfaceProps {
  onSubmitTest: () => void;
  onBackToAssessments: () => void;
}

export default function MockTestInterface({
  onSubmitTest,
  onBackToAssessments,
}: MockTestInterfaceProps) {
  // Current active question index (0 to 29)
  const [currentQIndex, setCurrentQIndex] = useState(11); // Question 12 (0-indexed: 11)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({
    0: 0, 1: 1, 2: 0, 3: 2, 4: 1, 5: 0, 6: 3, 7: 1, 8: 0, 9: 2, 10: 1, 11: 0, // Q12 is pre-selected Option 0 (A)
  });
  const [markedForReview, setMarkedForReview] = useState<Record<number, boolean>>({
    4: true, 9: true,
  });

  // Ticking timer state (32 mins 45 secs)
  const [secondsRemaining, setSecondsRemaining] = useState(1965); // 32:45

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const sampleQuestions = [
    {
      id: 12,
      text: "Which SQL query correctly identifies duplicate customer records?",
      codeBlock: "customers table schema:\n[ id (INT), email (VARCHAR), name (VARCHAR), created_at (TIMESTAMP) ]",
      options: [
        { id: 0, text: "SELECT email, COUNT(*) FROM customers GROUP BY email HAVING COUNT(*) > 1;" },
        { id: 1, text: "SELECT email, DISTINCT COUNT(*) FROM customers WHERE COUNT(*) > 1;" },
        { id: 2, text: "SELECT email FROM customers WHERE email = email GROUP BY email;" },
        { id: 3, text: "SELECT email, COUNT(email) FROM customers WHERE COUNT(email) > 1 GROUP BY email;" },
      ],
    },
  ];

  // Fallback structure for other 29 sample questions in grid
  const currentQuestion = sampleQuestions[0]; // Active demonstration Q12

  const handleSelectOption = (optId: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [currentQIndex]: optId }));
  };

  const toggleMarkForReview = () => {
    setMarkedForReview((prev) => ({ ...prev, [currentQIndex]: !prev[currentQIndex] }));
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Header Bar */}
      <div className="glass-card p-4 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/90 text-slate-100">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBackToAssessments}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Exit Assessment"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300 bg-indigo-950/80 border border-indigo-800 px-2 py-0.5 rounded">
                Technical Mock Test
              </span>
              <span className="text-xs font-semibold text-slate-400">• Data Analyst</span>
            </div>
            <h1 className="text-base font-black text-white">
              Assessment in Progress
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-right">
            <span className="text-xs font-bold text-slate-400 block">Progress</span>
            <span className="text-sm font-black text-white">
              Question {currentQIndex + 1} / 30
            </span>
          </div>

          <div className="px-3.5 py-1.5 rounded-xl bg-amber-950/80 text-amber-300 border border-amber-800 flex items-center space-x-2 font-mono font-bold text-sm">
            <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>{formatTimer(secondsRemaining)} remaining</span>
          </div>
        </div>
      </div>

      {/* 2. Main Question Workspace + Right Sidebar Navigation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Main Question Card (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="glass-card p-6 border border-slate-800 space-y-6 bg-slate-900/90 text-slate-100">
            
            {/* Question Title & Bookmark */}
            <div className="flex justify-between items-start border-b border-slate-800 pb-4">
              <div className="space-y-1">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                  Question {currentQIndex + 1}
                </span>
                <h2 className="text-lg font-black text-white leading-snug">
                  {currentQuestion.text}
                </h2>
              </div>

              <button
                onClick={toggleMarkForReview}
                className={`p-2.5 rounded-xl border text-xs font-bold flex items-center space-x-1.5 transition-all ${
                  markedForReview[currentQIndex]
                    ? "bg-amber-950/80 text-amber-300 border-amber-800 shadow-xs"
                    : "bg-slate-950/60 text-slate-400 border-slate-800 hover:bg-slate-800"
                }`}
              >
                <Bookmark className={`w-4 h-4 ${markedForReview[currentQIndex] ? "fill-amber-400 text-amber-400" : ""}`} />
                <span className="hidden sm:inline">
                  {markedForReview[currentQIndex] ? "Marked" : "Mark for Review"}
                </span>
              </button>
            </div>

            {/* Code Context Box */}
            {currentQuestion.codeBlock && (
              <div className="p-3.5 rounded-xl bg-slate-950 text-slate-200 font-mono text-xs border border-slate-800 leading-relaxed shadow-inner">
                <pre>{currentQuestion.codeBlock}</pre>
              </div>
            )}

            {/* Selectable Options List */}
            <div className="space-y-3 pt-2">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = selectedAnswers[currentQIndex] === option.id;
                const optionLabel = String.fromCharCode(65 + idx); // A, B, C, D

                return (
                  <div
                    key={option.id}
                    onClick={() => handleSelectOption(option.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start space-x-3.5 ${
                      isSelected
                        ? "bg-indigo-950/80 border-indigo-500 shadow-lg ring-1 ring-indigo-500/30 text-white"
                        : "bg-slate-950/60 border-slate-800 hover:bg-slate-800/80 text-slate-300"
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                        isSelected
                          ? "bg-indigo-600 text-white"
                          : "bg-slate-800 text-slate-300"
                      }`}
                    >
                      {optionLabel}
                    </div>

                    <div className="pt-0.5 space-y-1">
                      <p className={`text-xs font-mono font-medium ${isSelected ? "text-indigo-300 font-bold" : "text-slate-200"}`}>
                        {option.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Controls */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <button
                disabled={currentQIndex === 0}
                onClick={() => setCurrentQIndex((prev) => Math.max(0, prev - 1))}
                className="px-4 py-2.5 rounded-xl border border-slate-800 text-slate-300 hover:bg-slate-800 font-bold text-xs flex items-center space-x-2 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <button
                onClick={toggleMarkForReview}
                className="px-3.5 py-2.5 rounded-xl text-slate-400 hover:bg-slate-800 font-bold text-xs flex items-center space-x-1.5"
              >
                <Bookmark className={`w-4 h-4 ${markedForReview[currentQIndex] ? "fill-amber-400 text-amber-400" : ""}`} />
                <span>{markedForReview[currentQIndex] ? "Unmark" : "Mark for Review"}</span>
              </button>

              <button
                onClick={() => setCurrentQIndex((prev) => Math.min(29, prev + 1))}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center space-x-2 shadow-sm"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* Right Sidebar: Question Navigation Grid (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-card p-5 border border-slate-800 space-y-5 bg-slate-900/90 text-slate-100">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">
                Question Grid
              </h3>
              <span className="text-[11px] font-bold text-indigo-300 bg-indigo-950/80 px-2 py-0.5 rounded-full border border-indigo-800">
                {Object.keys(selectedAnswers).length} / 30 Answered
              </span>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-2 text-[10px] font-semibold text-slate-400">
              <div className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded bg-indigo-600" />
                <span>Answered</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded bg-slate-900 border-2 border-indigo-500" />
                <span>Current</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded bg-amber-950/80 border border-amber-700" />
                <span>Marked</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded bg-slate-950/60 border border-slate-800" />
                <span>Unanswered</span>
              </div>
            </div>

            {/* 30 Items Grid */}
            <div className="grid grid-cols-5 gap-2 pt-2">
              {Array.from({ length: 30 }).map((_, idx) => {
                const isCurrent = idx === currentQIndex;
                const isAnswered = selectedAnswers[idx] !== undefined;
                const isMarked = markedForReview[idx];

                let cellStyle = "bg-slate-950/60 text-slate-400 border-slate-800 hover:bg-slate-800";

                if (isCurrent) {
                  cellStyle = "bg-slate-900 text-white border-2 border-indigo-500 shadow-sm font-black scale-105";
                } else if (isMarked) {
                  cellStyle = "bg-amber-950/80 text-amber-300 border-amber-800 font-bold";
                } else if (isAnswered) {
                  cellStyle = "bg-indigo-600 text-white border-indigo-600 font-bold";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentQIndex(idx)}
                    className={`h-9 rounded-xl text-xs flex items-center justify-center transition-all border ${cellStyle}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Final Submit Button */}
            <div className="pt-4 border-t border-slate-800">
              <button
                onClick={onSubmitTest}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center justify-center space-x-2 shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.01]"
              >
                <CheckSquare className="w-4 h-4" />
                <span>Submit Test Now</span>
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
