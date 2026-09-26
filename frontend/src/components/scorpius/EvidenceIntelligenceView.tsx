"use client";

import React, { useState } from "react";
import {
  FolderCheck,
  Upload,
  Github,
  Award,
  CheckCircle2,
  ShieldCheck,
  FileText,
  Code,
  Mic,
  PlusCircle,
  ExternalLink,
  Sparkles,
  FileCheck,
  RefreshCw,
  Eye,
  GraduationCap,
  Briefcase
} from "lucide-react";
import PdfUploadSection from "./PdfUploadSection";

interface EvidenceIntelligenceViewProps {
  onNavigate: (tab: string) => void;
}

export default function EvidenceIntelligenceView({ onNavigate }: EvidenceIntelligenceViewProps) {
  const [showUpload, setShowUpload] = useState(false);

  const documentLibrary = [
    {
      id: 1,
      fileName: "Gokul_Resume.pdf",
      docType: "Resume / CV",
      pages: 3,
      uploadDate: "Sep 26, 2026",
      status: "✓ Analyzed",
      evidenceSignals: 12,
      confidence: "88%",
      icon: FileText,
      color: "bg-emerald-100 text-emerald-800 border-emerald-200",
    },
    {
      id: 2,
      fileName: "PowerBI_Certificate.pdf",
      docType: "Certificate",
      pages: 1,
      uploadDate: "Sep 22, 2026",
      status: "✓ Analyzed",
      evidenceSignals: 3,
      confidence: "94%",
      icon: Award,
      color: "bg-purple-100 text-purple-800 border-purple-200",
    },
    {
      id: 3,
      fileName: "Degree_Certificate.pdf",
      docType: "Academic Document",
      pages: 2,
      uploadDate: "Sep 20, 2026",
      status: "✓ Analyzed",
      evidenceSignals: 4,
      confidence: "96%",
      icon: GraduationCap,
      color: "bg-indigo-100 text-indigo-800 border-indigo-200",
    },
    {
      id: 4,
      fileName: "Internship_Experience.pdf",
      docType: "Work Experience",
      pages: 1,
      uploadDate: "Sep 18, 2026",
      status: "✓ Analyzed",
      evidenceSignals: 5,
      confidence: "92%",
      icon: Briefcase,
      color: "bg-cyan-100 text-cyan-800 border-cyan-200",
    },
  ];

  const evidenceItems = [
    {
      id: 1,
      skill: "SQL",
      proficiency: 82,
      confidence: 91,
      sources: ["SQL E-commerce Project", "Technical Assessment #12", "GitHub: sql-analytics-repo"],
      status: "Verified Evidence",
      verifiedAt: "Sep 24, 2026",
    },
    {
      id: 2,
      skill: "Python",
      proficiency: 74,
      confidence: 84,
      sources: ["Pandas Data Cleaning Script", "GitHub: python-data-pipeline"],
      status: "Verified Evidence",
      verifiedAt: "Sep 20, 2026",
    },
    {
      id: 3,
      skill: "Statistics",
      proficiency: 79,
      confidence: 89,
      sources: ["Statistical Reasoning Assessment", "Academic Transcripts"],
      status: "Verified Evidence",
      verifiedAt: "Sep 22, 2026",
    },
    {
      id: 4,
      skill: "Power BI",
      proficiency: 48,
      confidence: 62,
      sources: ["Resume Claim"],
      status: "Unverified Claim (Gap)",
      verifiedAt: "Pending Project Proof",
    },
  ];

  return (
    <div className="space-y-6">
      
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-indigo-950/80 border border-indigo-800 text-indigo-400">
              <FolderCheck className="w-5 h-5" />
            </span>
            <div>
              <h1 className="text-2xl font-black text-white tracking-tight">Evidence Intelligence</h1>
              <p className="text-xs text-slate-400 font-medium">
                Document library & empirical proof repository feeding candidate confidence ratings in the Career Twin.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowUpload(!showUpload)}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center space-x-2 shadow-md shadow-indigo-600/20 transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{showUpload ? "Hide Upload Section" : "Upload PDF Document"}</span>
        </button>
      </div>

      {/* Upload Toggle Box */}
      {showUpload && (
        <PdfUploadSection
          onNavigate={onNavigate}
        />
      )}

      {/* 2. Document Library Cards (Section 15 Specification) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-black text-white uppercase tracking-wider">
            My Evidence Documents ({documentLibrary.length})
          </h2>
          <span className="text-xs font-semibold text-slate-400">Supported Format: PDF Only</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {documentLibrary.map((doc) => {
            const Icon = doc.icon;
            return (
              <div key={doc.id} className="glass-card p-5 border border-slate-800 bg-slate-900/90 text-slate-100 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div className="p-2.5 rounded-xl bg-slate-800 text-indigo-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-200 border border-slate-700`}>
                      {doc.docType}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-black text-white truncate">{doc.fileName}</h3>
                    <p className="text-[11px] text-slate-400 font-medium">{doc.pages} pages • Uploaded {doc.uploadDate}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between items-center text-emerald-400 font-extrabold">
                    <span>{doc.status}</span>
                    <span className="text-indigo-300 font-bold">{doc.evidenceSignals} signals</span>
                  </div>

                  <div className="flex items-center space-x-2 pt-1">
                    <button className="flex-1 py-1.5 rounded-lg border border-slate-800 hover:bg-slate-800 font-bold text-[11px] text-slate-300 flex items-center justify-center space-x-1">
                      <Eye className="w-3 h-3" />
                      <span>View</span>
                    </button>
                    <button className="flex-1 py-1.5 rounded-lg bg-indigo-950/80 hover:bg-indigo-900 font-bold text-[11px] text-indigo-300 border border-indigo-800 flex items-center justify-center space-x-1">
                      <RefreshCw className="w-3 h-3" />
                      <span>Re-analyze</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Verified Skills & Evidence Sources Registry */}
      <div className="space-y-4 pt-2">
        <h2 className="text-sm font-extrabold text-white uppercase tracking-wider">
          Verified Evidence Registry
        </h2>

        <div className="space-y-3">
          {evidenceItems.map((item) => (
            <div
              key={item.id}
              className="glass-card p-5 border border-slate-800 bg-slate-900/90 text-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <h3 className="text-base font-black text-white">{item.skill}</h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-950/80 text-indigo-300 text-xs font-bold border border-indigo-800">
                    Proficiency: {item.proficiency}%
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 text-xs font-bold border border-emerald-800 flex items-center space-x-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Evidence Conf: {item.confidence}%</span>
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Proof Sources:</span>
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {item.sources.map((s, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-slate-950/60 text-slate-300 text-[11px] font-medium border border-slate-800"
                      >
                        • {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className={`px-3 py-1 rounded-xl text-xs font-extrabold inline-block ${
                  item.status.includes("Verified")
                    ? "bg-emerald-950/80 text-emerald-300 border border-emerald-800"
                    : "bg-amber-950/80 text-amber-300 border border-amber-800"
                }`}>
                  {item.status}
                </span>
                <span className="text-[10px] font-semibold text-slate-400 block mt-1">
                  {item.verifiedAt}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
