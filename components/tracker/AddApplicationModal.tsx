"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { AddApplicationForm, ApplicationStatus } from "@/types/job-tracker";

const COLUMNS: { id: ApplicationStatus; label: string }[] = [
  { id: "wishlist",  label: "Wishlist"  },
  { id: "applied",   label: "Applied"   },
  { id: "screening", label: "Screening" },
  { id: "interview", label: "Interview" },
  { id: "offer",     label: "Offer"     },
  { id: "rejected",  label: "Rejected"  },
];

const COLORS = [
  "#6c63ff", "#22d3ee", "#f59e0b", "#a78bfa",
  "#22c55e", "#f87171", "#f472b6", "#34d399",
];

const EMPTY: AddApplicationForm = {
  company_name: "",
  role_title: "",
  jd_url: "",
  status: "wishlist",
  applied_date: new Date().toISOString().split("T")[0],
  notes: "",
  follow_up_date: "",
  color: COLORS[0],
};

interface Props {
  onClose: () => void;
  onSubmit: (form: AddApplicationForm) => void;
}

export default function AddApplicationModal({ onClose, onSubmit }: Props) {
  const [form, setForm] = useState<AddApplicationForm>(EMPTY);
  const [errors, setErrors] = useState<{ company_name?: string; role_title?: string }>({});

  function set<K extends keyof AddApplicationForm>(key: K, val: AddApplicationForm[K]) {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function handleSubmit() {
    const errs: typeof errors = {};
    if (!form.company_name.trim()) errs.company_name = "Required";
    if (!form.role_title.trim())   errs.role_title   = "Required";
    if (Object.keys(errs).length) { setErrors(errs); return; }
    onSubmit(form);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-[460px] max-w-[95vw] max-h-[90vh] overflow-y-auto bg-[#0c0e16] border border-[#1e2235] rounded-2xl shadow-2xl shadow-black/60">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#1a1e2e]">
          <div>
            <h2 className="text-[15px] font-bold text-white">New Application</h2>
            <p className="text-[12px] text-slate-500 mt-0.5">Track a new job opportunity</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:text-white hover:bg-[#1a1e2e] transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Form */}
        <div className="px-6 py-5 flex flex-col gap-4">

          {/* Company */}
          <Field label="Company" required error={errors.company_name}>
            <input
              autoFocus
              value={form.company_name}
              onChange={(e) => set("company_name", e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              placeholder="e.g. Google"
              className={input(!!errors.company_name)}
            />
          </Field>

          {/* Role */}
          <Field label="Role Title" required error={errors.role_title}>
            <input
              value={form.role_title}
              onChange={(e) => set("role_title", e.target.value)}
              placeholder="e.g. Senior Frontend Engineer"
              className={input(!!errors.role_title)}
            />
          </Field>

          {/* JD URL */}
          <Field label="Job Description URL">
            <input
              value={form.jd_url}
              onChange={(e) => set("jd_url", e.target.value)}
              placeholder="https://careers.company.com/..."
              className={input(false)}
            />
          </Field>

          {/* Stage + Applied Date */}
          <div className="grid grid-cols-2 gap-3">
            <Field label="Stage">
              <select
                value={form.status}
                onChange={(e) => set("status", e.target.value as ApplicationStatus)}
                className={input(false) + " cursor-pointer"}
              >
                {COLUMNS.map((c) => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
            </Field>
            <Field label="Applied Date">
              <input
                type="date"
                value={form.applied_date}
                onChange={(e) => set("applied_date", e.target.value)}
                className={input(false)}
              />
            </Field>
          </div>

          {/* Follow-up */}
          <Field label="Follow-up Reminder">
            <input
              type="date"
              value={form.follow_up_date}
              onChange={(e) => set("follow_up_date", e.target.value)}
              className={input(false)}
            />
          </Field>

          {/* Notes */}
          <Field label="Notes">
            <textarea
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
              rows={3}
              placeholder="Referral, deadline, interview tips..."
              className={input(false) + " resize-none"}
            />
          </Field>

          {/* Color */}
          <Field label="Color Indicator">
            <div className="flex gap-2 flex-wrap mt-1">
              {COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => set("color", c)}
                  className={[
                    "w-6 h-6 rounded-full transition-transform hover:scale-110",
                    form.color === c
                      ? "ring-2 ring-offset-2 ring-offset-[#0c0e16] ring-white scale-110"
                      : "",
                  ].join(" ")}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </Field>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#1a1e2e]">
          <button
            onClick={onClose}
            className="px-4 py-2 text-[13px] font-medium text-slate-400 border border-[#1e2235] rounded-xl hover:text-white hover:border-[#2e3560] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-5 py-2 text-[13px] font-semibold text-white rounded-xl bg-gradient-to-r from-[#6c63ff] to-[#22d3ee] hover:opacity-90 transition-opacity"
          >
            Add Application
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-[11px] font-semibold uppercase tracking-[0.6px] text-slate-500 mb-1.5">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {children}
      {error && <p className="text-[11px] text-red-400 mt-1">{error}</p>}
    </div>
  );
}

function input(hasError: boolean) {
  return [
    "w-full bg-[#0f1117] border rounded-xl px-3.5 py-2.5 text-[13px] text-white",
    "placeholder-slate-600 outline-none transition-colors",
    hasError
      ? "border-red-500/60 focus:border-red-500"
      : "border-[#1e2235] focus:border-[#3d4580]",
  ].join(" ");
}