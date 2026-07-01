"use client";

import { Draggable } from "@hello-pangea/dnd";
import { Calendar, Bell, ExternalLink } from "lucide-react";
import { JobApplication } from "@/types/job-tracker";

interface Props {
  app: JobApplication;
  index: number;
  onClick: (app: JobApplication) => void;
}

function formatDate(dateStr?: string) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getFollowUpUrgency(date?: string): "overdue" | "soon" | null {
  if (!date) return null;
  const diff = new Date(date).getTime() - Date.now();
  const days = diff / (1000 * 60 * 60 * 24);
  if (days < 0) return "overdue";
  if (days <= 3) return "soon";
  return null;
}

export default function ApplicationCard({ app, index, onClick }: Props) {
  const urgency = getFollowUpUrgency(app.follow_up_date);
  const accent = app.color ?? "#6c63ff";

  return (
    <Draggable draggableId={app.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() => onClick(app)}
          className={[
            "group relative bg-[#0f1117] border border-[#1e2235] rounded-xl p-4",
            "cursor-pointer select-none transition-all duration-150",
            "hover:border-[#2e3560] hover:shadow-lg hover:shadow-black/30 hover:-translate-y-0.5",
            snapshot.isDragging
              ? "opacity-60 shadow-2xl rotate-1 scale-[1.02] border-[#3d4580]"
              : "",
          ].join(" ")}
        >
          {/* Left accent bar */}
          <div
            className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full"
            style={{ backgroundColor: accent }}
          />

          <div className="pl-3 flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-[13px] text-white leading-tight truncate">
                {app.company_name}
              </p>
              <p className="text-[12px] text-slate-400 mt-0.5 leading-snug line-clamp-2">
                {app.role_title || "Role not specified"}
              </p>
            </div>
            <div
              className="w-2.5 h-2.5 rounded-full flex-shrink-0 mt-0.5"
              style={{ backgroundColor: accent }}
            />
          </div>

          <div className="pl-3 mt-3 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1 text-[11px] text-slate-500">
              <Calendar size={11} />
              <span>{formatDate(app.applied_date)}</span>
            </div>
            <div className="flex items-center gap-2">
              {urgency && (
                <span
                  className={[
                    "flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-md font-medium",
                    urgency === "overdue"
                      ? "bg-red-500/15 text-red-400"
                      : "bg-amber-500/15 text-amber-400",
                  ].join(" ")}
                >
                  <Bell size={9} />
                  {urgency === "overdue" ? "Overdue" : "Soon"}
                </span>
              )}
              {app.jd_url && (
                <ExternalLink
                  size={11}
                  className="text-slate-600 group-hover:text-slate-400 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(app.jd_url, "_blank");
                  }}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}