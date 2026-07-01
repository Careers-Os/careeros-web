"use client";

import { X, Calendar, Bell, ExternalLink, StickyNote, Tag } from "lucide-react";
import { JobApplication } from "@/types/job-tracker";

const COL_META: Record<string, { label: string; color: string }> = {
  wishlist:  { label: "Wishlist",   color: "#6c63ff" },
  applied:   { label: "Applied",    color: "#22d3ee" },
  screening: { label: "Screening",  color: "#f59e0b" },
  interview: { label: "Interview",  color: "#a78bfa" },
  offer:     { label: "Offer",      color: "#22c55e" },
  rejected:  { label: "Rejected",   color: "#f87171" },
};

function formatDate(d?: string) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-IN", {
    month: "short", day: "numeric", year: "numeric",
  });
}

interface Props {
  app: JobApplication;
  onClose: () => void;
}

export default function DetailPanel({ app, onClose }: Props) {
  const meta = COL_META[app.status];

  return (
    <>
      {/* Mobile backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/20 lg:hidden"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed right-0 top-0 bottom-0 z-50 w-[340px] bg-[#0c0e16] border-l border-[#1a1e2e] shadow-2xl shadow-black/40 overflow-y-auto flex flex-col">

        {/* Header */}
        <div className="flex items-start justify-between gap-3 px-6 pt-6 pb-4 border-b border-[#1a1e2e]">
          <div className="flex-1 min-w-0">
            <h2 className="text-[18px] font-bold text-white leading-tight truncate">
              {app.company_name}
            </h2>
            <p className="text-[13px] text-slate-400 mt-0.5 line-clamp-2">
              {app.role_title || "Role not specified"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-lg text-slate-500 hover:text-white hover:bg-[#1a1e2e] transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Status badge */}
        <div className="px-6 py-4">
          <span
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[12px] font-semibold border"
            style={{
              backgroundColor: `${meta.color}18`,
              color: meta.color,
              borderColor: `${meta.color}40`,
            }}
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: meta.color }} />
            {meta.label}
          </span>
        </div>

        <div className="px-6 flex flex-col gap-5 pb-8">
          <Divider />

          <Row icon={<Calendar size={14} className="text-slate-500" />} label="Applied">
            {formatDate(app.applied_date)}
          </Row>

          {app.follow_up_date && (
            <Row icon={<Bell size={14} className="text-slate-500" />} label="Follow-up Reminder">
              {formatDate(app.follow_up_date)}
            </Row>
          )}

          {app.jd_url && (
            <Row icon={<ExternalLink size={14} className="text-slate-500" />} label="Job Description">
              <a
                href={app.jd_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors break-all"
              >
                {app.jd_url.replace(/^https?:\/\//, "").slice(0, 45)}
                {app.jd_url.length > 48 ? "…" : ""}
              </a>
            </Row>
          )}

          <Row icon={<Tag size={14} className="text-slate-500" />} label="Color">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: app.color ?? "#6c63ff" }} />
          </Row>

          {app.notes && (
            <>
              <Divider />
              <Row icon={<StickyNote size={14} className="text-slate-500" />} label="Notes">
                <span className="whitespace-pre-wrap leading-relaxed">{app.notes}</span>
              </Row>
            </>
          )}

          <Divider />
          <p className="text-[11px] text-slate-600 leading-relaxed">
            Drag the card between columns to update its stage.
          </p>
        </div>
      </div>
    </>
  );
}

function Divider() {
  return <div className="h-px bg-[#1a1e2e]" />;
}

function Row({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3 items-start">
      <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">{icon}</div>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.5px] text-slate-500 mb-1">
          {label}
        </p>
        <p className="text-[13px] text-slate-300">{children}</p>
      </div>
    </div>
  );
}