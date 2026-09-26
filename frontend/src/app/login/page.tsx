"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import ThreeBackground from "@/components/ThreeBackground";
import TransitionOverlay from "@/components/TransitionOverlay";
import { Mail, Github, Linkedin, ShieldCheck, Sparkles, Brain, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isAuthenticating, setIsAuthenticating] = useState<string | null>(null);
  const [showRealOAuth, setShowRealOAuth] = useState(false);
  const [transitioning, setTransitioning] = useState<string | null>(null);

  // If user is already authenticated via real NextAuth, redirect immediately to dashboard
  useEffect(() => {
    if (status === "authenticated") {
      setTransitioning("SYNCHRONIZING SECURE SESSION...");
    }
  }, [status]);

  const handleSimulatedLogin = (provider: "Google" | "LinkedIn" | "GitHub") => {
    setIsAuthenticating(provider);
    setTimeout(() => {
      // Save simulated candidate user details in localStorage
      const mockUser = {
        name: provider === "Google" ? "Alex Morgan (Google)" : provider === "LinkedIn" ? "Jordan Lee (LinkedIn)" : "Taylor Reed (GitHub)",
        email: provider === "Google" ? "alex.morgan@gmail.com" : provider === "LinkedIn" ? "jordan.lee@linkedin.com" : "taylor.reed@github.com",
        provider,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${provider}`,
        roleTitle: provider === "Google" ? "Candidate Member" : provider === "LinkedIn" ? "Verified LinkedIn Professional" : "GitHub Verified Developer",
      };
      localStorage.setItem("scorpius_candidate_user", JSON.stringify(mockUser));
      setIsAuthenticating(null);
      setTransitioning(`SYNCING ${provider.toUpperCase()} PROFILE...`);
    }, 800);
  };

  const handleRealOAuthLogin = async (providerId: string) => {
    setIsAuthenticating(providerId);
    try {
      await signIn(providerId, { callbackUrl: "/?auth=signin" });
    } catch (err) {
      console.error("Real OAuth error:", err);
    } finally {
      setIsAuthenticating(null);
    }
  };

  if (transitioning) {
    return (
      <TransitionOverlay
        message={transitioning}
        onComplete={() => router.push("/?auth=signin")}
      />
    );
  }

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 overflow-hidden select-none">
      
      {/* 3D constellation animation background */}
      <ThreeBackground />

      {/* Login Container Box */}
      <div className="relative z-10 w-full max-w-md p-8 bg-slate-900/80 border border-slate-800/80 backdrop-blur-md rounded-3xl shadow-2xl space-y-6">
        
        {/* Brand/Team Logo Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-indigo-700 text-white shadow-xl shadow-indigo-500/20">
            <Brain className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white flex items-center justify-center gap-1.5">
              Career Readiness Twin
            </h2>
            <p className="text-xs text-indigo-400 font-bold tracking-wider uppercase flex items-center justify-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              Engineered by Team SCORPIUS
            </p>
          </div>
        </div>

        {/* Mode Selector */}
        <div className="grid grid-cols-2 p-1 bg-slate-950 rounded-xl border border-slate-800">
          <button
            onClick={() => setShowRealOAuth(false)}
            className={`py-2.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              !showRealOAuth
                ? "bg-slate-800 text-slate-100 shadow"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Simulated Login
          </button>
          <button
            onClick={() => setShowRealOAuth(true)}
            className={`py-2.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              showRealOAuth
                ? "bg-slate-800 text-slate-100 shadow"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Real OAuth Login
          </button>
        </div>

        {/* Mode Info Messages */}
        {showRealOAuth ? (
          <div className="p-3.5 bg-indigo-950/30 border border-indigo-500/20 text-indigo-300 rounded-xl text-xs flex gap-2">
            <AlertCircle className="w-4.5 h-4.5 shrink-0 mt-0.5" />
            <p>
              Connects directly to Gmail (Google), GitHub, or LinkedIn API portals using environment secrets configured in **`.env.local`**.
            </p>
          </div>
        ) : (
          <div className="p-3.5 bg-emerald-950/30 border border-emerald-500/20 text-emerald-300 rounded-xl text-xs flex gap-2">
            <AlertCircle className="w-4.5 h-4.5 shrink-0 mt-0.5" />
            <p>
              Simulates OAuth connection flows instantly without entering passwords or registering credentials.
            </p>
          </div>
        )}

        {/* Sign In Options List */}
        <div className="space-y-3.5">
          {/* Gmail / Google */}
          <button
            onClick={() => showRealOAuth ? handleRealOAuthLogin("google") : handleSimulatedLogin("Google")}
            disabled={!!isAuthenticating}
            className="w-full p-3.5 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-850 hover:border-indigo-500/50 text-slate-200 font-semibold flex items-center justify-center gap-3 transition-all cursor-pointer text-xs"
          >
            <Mail className="w-4.5 h-4.5 text-red-400" />
            <span>
              {isAuthenticating === "google" || isAuthenticating === "Google"
                ? "Connecting Google Portals..."
                : "Continue with Gmail (Google)"}
            </span>
          </button>

          {/* LinkedIn */}
          <button
            onClick={() => showRealOAuth ? handleRealOAuthLogin("linkedin") : handleSimulatedLogin("LinkedIn")}
            disabled={!!isAuthenticating}
            className="w-full p-3.5 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-850 hover:border-blue-500/50 text-slate-200 font-semibold flex items-center justify-center gap-3 transition-all cursor-pointer text-xs"
          >
            <Linkedin className="w-4.5 h-4.5 text-blue-400" />
            <span>
              {isAuthenticating === "linkedin" || isAuthenticating === "LinkedIn"
                ? "Connecting LinkedIn Portals..."
                : "Continue with LinkedIn Profile"}
            </span>
          </button>

          {/* GitHub */}
          <button
            onClick={() => showRealOAuth ? handleRealOAuthLogin("github") : handleSimulatedLogin("GitHub")}
            disabled={!!isAuthenticating}
            className="w-full p-3.5 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-850 hover:border-purple-500/50 text-slate-200 font-semibold flex items-center justify-center gap-3 transition-all cursor-pointer text-xs"
          >
            <Github className="w-4.5 h-4.5 text-purple-400" />
            <span>
              {isAuthenticating === "github" || isAuthenticating === "GitHub"
                ? "Connecting GitHub Developer Profile..."
                : "Continue with GitHub Profile"}
            </span>
          </button>
        </div>

        {/* Footer Brand info */}
        <div className="text-center text-[10px] text-slate-500 flex items-center justify-center gap-1 border-t border-slate-800/80 pt-4">
          <ShieldCheck className="w-4.5 h-4.5 text-emerald-400" />
          <span>Sync Twin Dashboard • Created by <strong>Team SCORPIUS</strong></span>
        </div>

      </div>
    </div>
  );
}
