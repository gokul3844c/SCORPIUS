"use client";

import React, { useState, useRef } from "react";
import {
  FileText,
  Upload,
  CheckCircle2,
  AlertTriangle,
  X,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ShieldAlert,
  Brain,
  Award,
  Briefcase,
  FileCheck,
  RefreshCw,
  Lock,
  Trash2,
  Edit2,
  Check
} from "lucide-react";

export interface UploadedDocData {
  fileName: string;
  fileSize: string;
  docType: string;
  pages: number;
  uploadTime: string;
  skills: { name: string; score: number; confidence: number; type: string }[];
  scores: {
    overall: number;
    technical: number;
    task: number;
    communication: number;
    interview: number;
    confidence: number;
  };
}

interface PdfUploadSectionProps {
  onTwinUpdated?: (newScore: number, newConfidence: number) => void;
  onNavigate?: (tab: string) => void;
  onUploadSuccess?: (doc: UploadedDocData) => void;
}

type StepType = "UPLOAD" | "PREVIEW" | "ANALYZING" | "REVIEW" | "SENSITIVE_WARNING" | "UNSUPPORTED_ERROR" | "SUCCESS";

export default function PdfUploadSection({ onTwinUpdated, onNavigate, onUploadSuccess }: PdfUploadSectionProps) {
  const [step, setStep] = useState<StepType>("UPLOAD");
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<{
    name: string;
    size: string;
    pages: number;
    fileObj?: File;
  } | null>(null);

  // Analysis Pipeline Progress State
  const [pipelineIndex, setPipelineIndex] = useState(0);

  // Extracted Evidence State
  const [docClassification, setDocClassification] = useState<{
    isCareerDoc: boolean;
    docType: string;
    badgeColor: string;
  }>({ isCareerDoc: true, docType: "Resume / CV", badgeColor: "bg-emerald-100 text-emerald-800" });

  const [extractedSkills, setExtractedSkills] = useState([
    { id: 1, name: "SQL", score: 86, confidence: 91, type: "Verified Evidence", source: "Resume + Code", selected: true },
    { id: 2, name: "Python", score: 82, confidence: 88, type: "Verified Evidence", source: "Resume + GitHub", selected: true },
    { id: 3, name: "Power BI", score: 76, confidence: 72, type: "Credential Evidence", source: "Certificate", selected: true },
    { id: 4, name: "Statistics", score: 84, confidence: 89, type: "Self-Declared Evidence", source: "Academic Record", selected: true },
    { id: 5, name: "Data Analysis", score: 85, confidence: 90, type: "Verified Evidence", source: "Project Artifact", selected: true },
  ]);

  const [extractedDetails, setExtractedDetails] = useState({
    name: "Gokul",
    title: "Data Analyst Candidate",
    education: "B.S. Computer Science & Data Analytics (2026)",
    projects: 3,
    certifications: 2,
    internships: 1,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const pipelineSteps = [
    "Upload",
    "PDF Validation",
    "Text Extraction",
    "Document Classification",
    "Information Extraction",
    "Skill Mapping",
    "Evidence Verification",
    "Career Twin Update",
  ];

  // Drag & Drop handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFile = (file: File) => {
    // 1. Validation check — MUST BE PDF ONLY
    const isPdf = file.name.toLowerCase().endsWith(".pdf") || file.type === "application/pdf";
    if (!isPdf) {
      setStep("UNSUPPORTED_ERROR");
      return;
    }

    // PDF Size check
    const fileSizeMb = (file.size / (1024 * 1024)).toFixed(1);

    // Check if filename contains sensitive words like "income", "bank", "financial", "bill"
    const lowerName = file.name.toLowerCase();
    const isSensitive = lowerName.includes("income") || lowerName.includes("bank") || lowerName.includes("financial") || lowerName.includes("bill") || lowerName.includes("tax");

    setSelectedFile({
      name: file.name,
      size: `${fileSizeMb} MB`,
      pages: Math.floor(Math.random() * 3) + 1,
      fileObj: file,
    });

    if (isSensitive) {
      setDocClassification({
        isCareerDoc: false,
        docType: "Income / Financial Document",
        badgeColor: "bg-rose-100 text-rose-800",
      });
      setStep("SENSITIVE_WARNING");
    } else if (lowerName.includes("cert") || lowerName.includes("course")) {
      setDocClassification({
        isCareerDoc: true,
        docType: "Certificate",
        badgeColor: "bg-purple-100 text-purple-800",
      });
      setStep("PREVIEW");
    } else {
      setDocClassification({
        isCareerDoc: true,
        docType: "Resume / CV",
        badgeColor: "bg-emerald-100 text-emerald-800",
      });
      setStep("PREVIEW");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const triggerAnalyze = () => {
    setStep("ANALYZING");
    setPipelineIndex(0);

    // Simulate animated pipeline step transitions
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      if (current < pipelineSteps.length) {
        setPipelineIndex(current);
      } else {
        clearInterval(interval);
        setStep("REVIEW");
      }
    }, 400);
  };

  const handleConfirmReview = () => {
    const uploadedData: UploadedDocData = {
      fileName: selectedFile?.name || "Gokul_Resume.pdf",
      fileSize: selectedFile?.size || "2.4 MB",
      docType: docClassification.docType,
      pages: selectedFile?.pages || 3,
      uploadTime: "Just now",
      skills: extractedSkills.map((s) => ({
        name: s.name,
        score: s.score,
        confidence: s.confidence,
        type: s.type,
      })),
      scores: {
        overall: 86,
        technical: 86,
        task: 82,
        communication: 78,
        interview: 83,
        confidence: 92,
      },
    };

    if (onTwinUpdated) {
      onTwinUpdated(86, 92);
    }
    if (onUploadSuccess) {
      onUploadSuccess(uploadedData);
    }
    setStep("SUCCESS");
  };

  const handleRemoveSkill = (id: number) => {
    setExtractedSkills((prev) => prev.filter((s) => s.id !== id));
  };

  const handleReset = () => {
    setStep("UPLOAD");
    setSelectedFile(null);
  };

  return (
    <div className="glass-card p-6 border border-indigo-500/40 bg-slate-900/90 text-slate-100 space-y-6 shadow-xl">
      
      {/* Step 1: Upload Card Header & Drag/Drop Area */}
      {step === "UPLOAD" && (
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="p-2 rounded-xl bg-indigo-950/80 border border-indigo-800 text-indigo-400">
                  <Upload className="w-5 h-5" />
                </span>
                <div>
                  <h2 className="text-lg font-black text-white">Build Your Evidence Profile</h2>
                  <p className="text-xs text-slate-400 font-medium">
                    Upload your career documents and let SCORPIUS analyze your verified skills and experience.
                  </p>
                </div>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-800 text-indigo-300 text-[11px] font-bold self-start sm:self-auto">
              PDF Only • Max 10MB
            </span>
          </div>

          {/* Drag and Drop Zone */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`p-8 rounded-2xl border-2 border-dashed text-center transition-all cursor-pointer space-y-3 ${
              dragActive
                ? "border-indigo-500 bg-indigo-950/80 scale-[1.01]"
                : "border-slate-800 bg-slate-950/60 hover:bg-slate-800/40 hover:border-indigo-500"
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />

            <div className="w-14 h-14 rounded-2xl bg-indigo-950/80 text-indigo-400 border border-indigo-800/60 mx-auto flex items-center justify-center shadow-xs">
              <FileText className="w-7 h-7" />
            </div>

            <div>
              <h3 className="text-sm font-black text-white">📄 Upload PDF</h3>
              <p className="text-xs font-semibold text-slate-400 mt-1">
                Drag & drop your PDF here or <span className="text-indigo-400 underline font-bold">Browse Files</span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 text-[11px] text-slate-400 font-medium">
              <span>Supported format: <strong className="text-slate-200">PDF only</strong></span>
              <span className="hidden sm:inline">•</span>
              <span>Maximum file size: <strong className="text-slate-200">10 MB</strong></span>
            </div>

            <div className="pt-2 inline-flex items-center space-x-1.5 text-[11px] font-semibold text-slate-300 bg-slate-950 px-3 py-1 rounded-full border border-slate-800 shadow-2xs">
              <Lock className="w-3.5 h-3.5 text-indigo-400" />
              <span>🔒 Your documents are securely processed and used only to build your career evidence profile.</span>
            </div>
          </div>
        </div>
      )}

      {/* Unsupported Format Error State */}
      {step === "UNSUPPORTED_ERROR" && (
        <div className="p-6 rounded-2xl bg-rose-950/60 border border-rose-800 space-y-4 text-center">
          <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white mx-auto flex items-center justify-center shadow-md">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-black text-white">Unsupported File Format</h3>
            <p className="text-xs text-rose-300 mt-1">
              SCORPIUS currently accepts PDF documents only (Resume, Certificates, Academic, Work Experience PDFs). Non-PDF files (JPG, PNG, DOCX, ZIP) are rejected.
            </p>
          </div>

          <button
            onClick={handleReset}
            className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-all"
          >
            Choose Another File
          </button>
        </div>
      )}

      {/* Sensitive / Unrelated Document Detection Warning */}
      {step === "SENSITIVE_WARNING" && (
        <div className="p-6 rounded-2xl bg-amber-950/60 border border-amber-800 space-y-4">
          <div className="flex items-start space-x-3">
            <div className="p-2.5 rounded-xl bg-amber-600 text-white shrink-0">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-black uppercase tracking-wider text-amber-300 bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
                Sensitive Document Detected
              </span>
              <h3 className="text-base font-black text-white">Document Not Relevant to Career Profile</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                This PDF appears to be an income/financial document or personal bill (<strong>{selectedFile?.name}</strong>). SCORPIUS does not require sensitive financial records for career-readiness analysis.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2 border-t border-amber-800/80">
            <button
              onClick={handleReset}
              className="w-full sm:w-auto px-4 py-2 rounded-xl border border-slate-800 text-slate-300 hover:bg-slate-800 font-bold text-xs"
            >
              Remove Document
            </button>
            <button
              onClick={handleReset}
              className="w-full sm:w-auto px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-sm"
            >
              Upload Career Document
            </button>
          </div>
        </div>
      )}

      {/* Step 2: File Preview Card */}
      {step === "PREVIEW" && selectedFile && (
        <div className="space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">File Validated</span>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-indigo-950 text-indigo-300 border border-indigo-800`}>
                {docClassification.docType}
              </span>
            </div>
            <button onClick={handleReset} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Preview Card */}
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
            <div className="flex items-center space-x-3.5">
              <div className="p-3 rounded-xl bg-indigo-600 text-white shadow-xs">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-black text-white">{selectedFile.name}</h4>
                <p className="text-xs text-slate-400 font-medium">
                  PDF • {selectedFile.size} • {selectedFile.pages} pages
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 font-semibold pt-1 border-t border-slate-800">
              <span className="flex items-center space-x-1.5 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>PDF format validated</span>
              </span>
              <span className="flex items-center space-x-1.5 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Text readable & unencrypted</span>
              </span>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-2">
            <button
              onClick={handleReset}
              className="px-4 py-2.5 rounded-xl border border-slate-800 text-slate-300 hover:bg-slate-800 font-bold text-xs"
            >
              Remove
            </button>
            <button
              onClick={triggerAnalyze}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-md shadow-indigo-600/20 flex items-center space-x-2 transition-all hover:scale-[1.01]"
            >
              <span>Analyze PDF →</span>
            </button>
          </div>
        </div>
      )}

      {/* Step 3: AI Analysis Processing Pipeline Screen */}
      {step === "ANALYZING" && (
        <div className="space-y-6 py-4">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white mx-auto flex items-center justify-center shadow-lg animate-bounce">
              <Brain className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-white">Analyzing Your Document</h3>
            <p className="text-xs text-slate-400 font-medium">
              SCORPIUS AI is extracting verified evidence signals from your PDF.
            </p>
          </div>

          {/* Pipeline Progress Visualizer */}
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {pipelineSteps.map((s, idx) => {
                const isCompleted = idx <= pipelineIndex;
                const isCurrent = idx === pipelineIndex;

                return (
                  <div
                    key={s}
                    className={`p-2.5 rounded-xl text-[11px] font-bold border flex items-center space-x-2 transition-all ${
                      isCurrent
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-xs scale-105"
                        : isCompleted
                        ? "bg-emerald-950/80 text-emerald-300 border-emerald-800"
                        : "bg-slate-900 text-slate-500 border-slate-800"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
                    ) : (
                      <span className="w-3.5 h-3.5 rounded-full border-2 border-slate-700 shrink-0" />
                    )}
                    <span className="truncate">{s}</span>
                  </div>
                );
              })}
            </div>

            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-indigo-500 rounded-full transition-all duration-300"
                style={{ width: `${((pipelineIndex + 1) / pipelineSteps.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 4: User Review Modal / Screen */}
      {step === "REVIEW" && (
        <div className="space-y-6">
          <div className="flex justify-between items-start border-b border-slate-800 pb-3">
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-800 text-[10px] font-bold">
                  Document Classification: {docClassification.docType}
                </span>
              </div>
              <h3 className="text-lg font-black text-white mt-1">Review Extracted Evidence</h3>
            </div>
            <span className="text-xs font-extrabold text-indigo-300 bg-indigo-950/80 px-3 py-1 rounded-lg border border-indigo-800">
              {extractedSkills.length} Skills Detected
            </span>
          </div>

          {/* Information Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Education</span>
              <p className="font-extrabold text-white truncate">{extractedDetails.education}</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Projects</span>
              <p className="font-extrabold text-white">{extractedDetails.projects} Projects Found</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Certifications</span>
              <p className="font-extrabold text-white">{extractedDetails.certifications} Certifications</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Internships</span>
              <p className="font-extrabold text-white">{extractedDetails.internships} Record</p>
            </div>
          </div>

          {/* Skills List with Confidence Ratings */}
          <div className="space-y-2">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">
              Detected Skills & Proper Score Ratings
            </h4>

            <div className="space-y-2">
              {extractedSkills.map((s) => (
                <div key={s.id} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center space-x-3">
                    <span className="font-extrabold text-white">{s.name}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800 text-[10px] font-extrabold">
                      Score: {s.score}%
                    </span>
                    <span className="px-2 py-0.5 rounded bg-indigo-950/80 text-indigo-300 border border-indigo-800 text-[10px] font-bold">
                      Confidence: {s.confidence}%
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-bold">
                      {s.type}
                    </span>
                  </div>

                  <button
                    onClick={() => handleRemoveSkill(s.id)}
                    className="p-1 rounded text-rose-400 hover:bg-rose-950/80"
                    title="Remove Skill"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800 flex justify-end space-x-3">
            <button
              onClick={handleReset}
              className="px-4 py-2.5 rounded-xl border border-slate-800 text-slate-300 hover:bg-slate-800 font-bold text-xs"
            >
              Re-upload
            </button>
            <button
              onClick={handleConfirmReview}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md shadow-emerald-600/20 flex items-center space-x-2 transition-all hover:scale-[1.01]"
            >
              <Check className="w-4 h-4" />
              <span>Confirm & Add Proper Scores to Career Twin</span>
            </button>
          </div>
        </div>
      )}

      {/* Step 5: Success Summary Card */}
      {step === "SUCCESS" && (
        <div className="p-6 rounded-2xl bg-emerald-950/60 border border-emerald-800 space-y-5">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-emerald-600 text-white shadow-xs">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-black uppercase text-emerald-300 tracking-wider">
                PDF Analysis Complete ✓
              </span>
              <h3 className="text-lg font-black text-white">
                Career Readiness Twin Updated with Proper Scores!
              </h3>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between items-center font-bold text-slate-200">
              <span>Overall Career Readiness Score:</span>
              <span className="text-emerald-400 font-black text-sm">81% → 86% (+5% Boost)</span>
            </div>
            <div className="flex justify-between items-center font-bold text-slate-200">
              <span>Evidence Confidence Rating:</span>
              <span className="text-emerald-400 font-black text-sm">89% → 92% (+3% Boost)</span>
            </div>

            <div className="pt-2 border-t border-slate-800 text-[11px] font-semibold text-slate-300 space-y-1">
              <p className="text-emerald-400 font-extrabold">+ SQL Verified Score: 86% (Conf: 91%)</p>
              <p className="text-emerald-400 font-extrabold">+ Python Verified Score: 82% (Conf: 88%)</p>
              <p className="text-emerald-400 font-extrabold">+ Power BI Verified Score: 76% (Conf: 72%)</p>
              <p className="text-emerald-400 font-extrabold">+ Statistics Verified Score: 84% (Conf: 89%)</p>
            </div>
          </div>

          <div className="flex justify-between items-center pt-1">
            <button
              onClick={handleReset}
              className="text-xs font-bold text-slate-400 hover:text-white hover:underline"
            >
              Upload Another PDF
            </button>

            <button
              onClick={() => onNavigate && onNavigate("twin")}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md shadow-emerald-600/20 flex items-center space-x-2"
            >
              <span>View Updated Career Twin →</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
