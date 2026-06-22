"use client";

import { useCallback, useState } from "react";
import { useDropzone, type FileRejection } from "react-dropzone";
import { FileText, UploadCloud, X, AlertCircle, CheckCircle2, RefreshCw } from "lucide-react";

// ─── constants ──────────────────────────────────────────────────────────────

const MAX_SIZE = 10 * 1024 * 1024; // 10 MB

const ACCEPTED = {
  "application/pdf": [".pdf"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
};

// ─── helpers ────────────────────────────────────────────────────────────────

function fmtSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function ext(name: string) {
  const parts = name.split(".");
  return parts.length > 1 ? parts[parts.length - 1].toUpperCase() : "";
}

// ─── types ──────────────────────────────────────────────────────────────────

type Status = "idle" | "uploading" | "success" | "error";

interface Selected {
  file: File;
  status: Status;
  progress: number;
  error?: string;
}

// ─── props ───────────────────────────────────────────────────────────────────

interface ResumeUploadProps {
  onUploadComplete?: (file: File) => void;
  uploadFn?: (file: File, onProgress: (p: number) => void) => Promise<void>;
}

// ─── component ───────────────────────────────────────────────────────────────

export default function ResumeUpload({ onUploadComplete, uploadFn }: ResumeUploadProps) {
  const [selected, setSelected] = useState<Selected | null>(null);
  const [dropError, setDropError] = useState<string | null>(null);

  /** Swap this for a real fetch/axios call in the actual integration */
  const simulateUpload = useCallback(
    (file: File, onProgress: (p: number) => void) =>
      new Promise<void>((resolve) => {
        let p = 0;
        const iv = setInterval(() => {
          p = Math.min(100, p + Math.floor(Math.random() * 18) + 8);
          onProgress(p);
          if (p >= 100) { clearInterval(iv); resolve(); }
        }, 180);
      }),
    []
  );

  const startUpload = useCallback(
    async (file: File) => {
      setSelected({ file, status: "uploading", progress: 0 });
      try {
        const fn = uploadFn ?? simulateUpload;
        await fn(file, (p) => setSelected((prev) => prev ? { ...prev, progress: p } : prev));
        setSelected((prev) => prev ? { ...prev, status: "success", progress: 100 } : prev);
        onUploadComplete?.(file);
      } catch (err) {
        setSelected((prev) =>
          prev ? { ...prev, status: "error", error: err instanceof Error ? err.message : "Upload failed. Please try again." } : prev
        );
      }
    },
    [onUploadComplete, simulateUpload, uploadFn]
  );

  const onDrop = useCallback(
    (accepted: File[], rejections: FileRejection[]) => {
      setDropError(null);
      if (rejections.length > 0) {
        const codes = rejections[0].errors.map((e) => e.code);
        if (codes.includes("file-too-large"))
          setDropError(`File is too large. Maximum size is 10 MB.`);
        else if (codes.includes("file-invalid-type"))
          setDropError(`Only PDF and DOCX files are supported.`);
        else
          setDropError("This file could not be accepted. Please try another.");
        return;
      }
      const file = accepted[0];
      if (file) startUpload(file);
    },
    [startUpload]
  );

  const { getRootProps, getInputProps, isDragActive, isFocused } = useDropzone({
    onDrop,
    accept: ACCEPTED,
    maxSize: MAX_SIZE,
    multiple: false,
    disabled: selected?.status === "uploading",
  });

  const reset = () => { setSelected(null); setDropError(null); };
  const retry = () => { if (selected) startUpload(selected.file); };

  return (
    <div className="w-full max-w-xl">
      {/* ── Drop zone (shown when no file selected) ── */}
      {!selected && (
        <div
          {...getRootProps()}
          className={[
            "relative flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed px-8 py-12 text-center cursor-pointer outline-none transition-all duration-200",
            isDragActive
              ? "border-[#22D3EE]/60 bg-[#22D3EE]/[0.06]"
              : "border-white/[0.10] bg-[#0D1117] hover:border-[#22D3EE]/40 hover:bg-[#22D3EE]/[0.03]",
            isFocused ? "ring-2 ring-[#22D3EE]/50 ring-offset-2 ring-offset-[#070B14]" : "",
          ].join(" ")}
          role="button"
          tabIndex={0}
          aria-label="Upload your resume. Accepts PDF or DOCX files up to 10 MB."
        >
          <input {...getInputProps()} aria-label="Resume file input" />

          {/* Icon */}
          <div className={[
            "flex h-14 w-14 items-center justify-center rounded-full border transition-colors",
            isDragActive
              ? "border-[#22D3EE]/40 bg-[#22D3EE]/10 text-[#22D3EE]"
              : "border-white/[0.08] bg-white/[0.04] text-slate-400",
          ].join(" ")}>
            <UploadCloud className="h-6 w-6" aria-hidden="true" />
          </div>

          {/* Text */}
          <div>
            <p className="text-sm font-medium text-white">
              {isDragActive ? "Drop your resume here" : "Drag & drop your resume"}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              or{" "}
              <span className="text-[#22D3EE] underline underline-offset-2 cursor-pointer">
                browse files
              </span>
            </p>
          </div>

          {/* Accepted formats badge */}
          <div className="flex gap-2 mt-1">
            {["PDF", "DOCX"].map((fmt) => (
              <span
                key={fmt}
                className="rounded-md border border-white/[0.08] bg-white/[0.04] px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-slate-400"
              >
                {fmt}
              </span>
            ))}
            <span className="rounded-md border border-white/[0.08] bg-white/[0.04] px-2.5 py-0.5 text-[10px] font-medium text-slate-400">
              Max 10 MB
            </span>
          </div>
        </div>
      )}

      {/* ── Validation error ── */}
      {dropError && (
        <div
          role="alert"
          className="mt-3 flex items-start gap-2.5 rounded-lg border border-red-500/20 bg-red-500/[0.08] px-4 py-3 text-sm text-red-400"
        >
          <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" />
          <span>{dropError}</span>
        </div>
      )}

      {/* ── File card (shown when a file is selected) ── */}
      {selected && (
        <div className="rounded-xl border border-white/[0.08] bg-[#0D1117] p-5">
          <div className="flex items-start gap-4">
            {/* File icon */}
            <div className={[
              "flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border text-sm font-bold",
              selected.status === "error"
                ? "border-red-500/20 bg-red-500/10 text-red-400"
                : "border-[#22D3EE]/20 bg-[#22D3EE]/10 text-[#22D3EE]",
            ].join(" ")} aria-hidden="true">
              <FileText className="h-5 w-5" />
            </div>

            <div className="min-w-0 flex-1">
              {/* File name + remove */}
              <div className="flex items-start justify-between gap-3">
                <p className="truncate text-sm font-medium text-white leading-snug">
                  {selected.file.name}
                </p>
                {selected.status !== "uploading" && (
                  <button
                    type="button"
                    onClick={reset}
                    aria-label="Remove file"
                    className="shrink-0 rounded-md p-1 text-slate-500 hover:bg-white/[0.06] hover:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#22D3EE]/50 transition"
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                )}
              </div>

              {/* Meta */}
              <p className="mt-0.5 text-xs text-slate-500">
                {ext(selected.file.name)} · {fmtSize(selected.file.size)}
              </p>

              {/* ── Progress bar ── */}
              {selected.status === "uploading" && (
                <div className="mt-3 space-y-1.5">
                  <div
                    role="progressbar"
                    aria-valuenow={selected.progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`Uploading: ${selected.progress}%`}
                    className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]"
                  >
                    <div
                      className="h-full rounded-full bg-[#22D3EE] transition-all duration-200"
                      style={{ width: `${selected.progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-500">
                    Uploading… <span className="text-[#22D3EE]">{selected.progress}%</span>
                  </p>
                </div>
              )}

              {/* ── Success ── */}
              {selected.status === "success" && (
                <div className="mt-2.5 flex items-center gap-1.5 text-xs font-medium text-emerald-400">
                  <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                  Uploaded successfully
                </div>
              )}

              {/* ── Error ── */}
              {selected.status === "error" && (
                <div className="mt-2.5 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs text-red-400">
                    <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                    {selected.error}
                  </div>
                  <button
                    type="button"
                    onClick={retry}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#22D3EE] hover:underline underline-offset-2 focus:outline-none focus:ring-2 focus:ring-[#22D3EE]/50 rounded"
                  >
                    <RefreshCw className="h-3 w-3" aria-hidden="true" />
                    Retry upload
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Bottom CTA after success */}
          {selected.status === "success" && (
            <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-4">
              <p className="text-xs text-slate-500">Ready to analyze your resume</p>
              <button
                type="button"
                className="rounded-lg bg-[#22D3EE]/10 border border-[#22D3EE]/20 px-4 py-1.5 text-xs font-semibold text-[#22D3EE] hover:bg-[#22D3EE]/20 transition focus:outline-none focus:ring-2 focus:ring-[#22D3EE]/50"
              >
                Analyze →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}