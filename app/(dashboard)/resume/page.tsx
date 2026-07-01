
"use client";

import { useState } from "react";
import ResumeUpload from "@/components/resume/ResumeUpload";
import ATSScoreCard, { type ATSResult } from "@/components/resume/ATSScoreCard";

// ─── Mock result (swap with real API call in FE-005 / backend integration) ───

const MOCK_RESULT: ATSResult = {
  overall: 74,
  categories: [
    {
      name: "Keyword Match",
      score: 68,
      explanation: "Several role-specific keywords are missing. Add more industry terms from the job description.",
    },
    {
      name: "Section Completeness",
      score: 85,
      explanation: "All major sections are present. Consider adding a concise professional summary.",
    },
    {
      name: "Action Verbs",
      score: 72,
      explanation: "Good use of action verbs in most bullet points. A few bullets start with weak phrasing.",
    },
    {
      name: "Quantification",
      score: 58,
      explanation: "Only 3 of 11 bullets include measurable impact. Add numbers, percentages, or scale.",
    },
    {
      name: "Formatting",
      score: 91,
      explanation: "Clean, ATS-friendly formatting with consistent fonts and clear section hierarchy.",
    },
  ],
  suggestions: [
    {
      priority: "high",
      text: 'Add metrics to your experience bullets — e.g. "Reduced load time by 40%" instead of "Improved performance".',
    },
    {
      priority: "high",
      text: "Include role-specific keywords such as 'TypeScript', 'CI/CD', and 'REST API' which appear in most target job descriptions.",
    },
    {
      priority: "medium",
      text: "Add a 2–3 sentence professional summary at the top that mirrors the target role's language.",
    },
    {
      priority: "medium",
      text: 'Replace weak openers like "Responsible for" and "Helped with" with strong action verbs like "Engineered" or "Spearheaded".',
    },
    {
      priority: "low",
      text: "Consider adding a skills section grouped by category (Languages, Frameworks, Tools) for faster ATS parsing.",
    },
  ],
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ResumePage() {
  const [analysisState, setAnalysisState] = useState<
    "idle" | "loading" | "done"
  >("idle");
  const [result, setResult] = useState<ATSResult | undefined>(undefined);

  function handleUploadComplete(_file: File) {
    // Trigger analysis: show skeleton for 2.5 s, then reveal result.
    // Replace the setTimeout with a real POST /api/ats/analyze call when
    // the backend is ready (FE-005 / backend integration sprint).
    setAnalysisState("loading");
    setTimeout(() => {
      setResult(MOCK_RESULT);
      setAnalysisState("done");
    }, 2500);
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white mb-1">Resume</h1>
        <p className="text-sm text-slate-400">
          Upload your resume to get an AI-powered ATS analysis, keyword gaps,
          and improvement suggestions.
        </p>
      </div>

      {/* Upload — always visible until analysis is done */}
      {analysisState === "idle" && (
        <ResumeUpload onUploadComplete={handleUploadComplete} />
      )}

      {/* ATS result card — skeleton while loading, real card when done */}
      {analysisState !== "idle" && (
        <ATSScoreCard
          result={result}
          isLoading={analysisState === "loading"}
        />
      )}
    </div>
  );
}