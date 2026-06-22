import ResumeUpload from "@/components/resume/ResumeUpload";

export default function ResumePage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white mb-1">Resume</h1>
        <p className="text-sm text-slate-400">
          Upload your resume to get an AI-powered ATS analysis, keyword gaps, and improvement suggestions.
        </p>
      </div>

      <ResumeUpload />
    </div>
  );
}