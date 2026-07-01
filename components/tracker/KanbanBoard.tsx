"use client";

import { useState, useCallback } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { Plus, Search } from "lucide-react";

import { JobApplication, ApplicationStatus, AddApplicationForm } from "@/types/job-tracker";
import KanbanColumn from "./KanbanColumn";
import AddApplicationModal from "./AddApplicationModal";
import DetailPanel from "./DetailPanel";

// ─── Config ───────────────────────────────────────────────────────────────────

const COLUMNS: { id: ApplicationStatus; label: string; color: string }[] = [
  { id: "wishlist",  label: "Wishlist",   color: "#6c63ff" },
  { id: "applied",   label: "Applied",    color: "#22d3ee" },
  { id: "screening", label: "Screening",  color: "#f59e0b" },
  { id: "interview", label: "Interview",  color: "#a78bfa" },
  { id: "offer",     label: "Offer",      color: "#22c55e" },
  { id: "rejected",  label: "Rejected",   color: "#f87171" },
];

// ─── Mock data (swap with GET /api/jobs when backend is ready) ────────────────

const MOCK_APPLICATIONS: JobApplication[] = [
  {
    id: "1", user_id: "u1",
    company_name: "Google", role_title: "Senior Frontend Engineer",
    status: "interview", applied_date: "2025-06-01",
    jd_url: "https://careers.google.com",
    notes: "Referred by ex-colleague. Round 2 scheduled.",
    follow_up_date: "2025-06-20", color: "#6c63ff",
    created_at: "2025-06-01T00:00:00Z", updated_at: "2025-06-01T00:00:00Z",
  },
  {
    id: "2", user_id: "u1",
    company_name: "Stripe", role_title: "Product Engineer",
    status: "applied", applied_date: "2025-06-05",
    jd_url: "https://stripe.com/jobs", notes: "", color: "#22d3ee",
    created_at: "2025-06-05T00:00:00Z", updated_at: "2025-06-05T00:00:00Z",
  },
  {
    id: "3", user_id: "u1",
    company_name: "Vercel", role_title: "DX Engineer",
    status: "screening", applied_date: "2025-05-28",
    notes: "Phonscm-history-item:c%3A%5CUsers%5Cyashs%5Ccareeros-web?%7B%22repositoryId%22%3A%22scm0%22%2C%22historyItemId%22%3A%2292c18ff091b1ede8d1269889e818f6698a09234a%22%2C%22historyItemParentId%22%3A%22515a029dac50010da6b9a885c59defae8c9cc9cc%22%2C%22historyItemDisplayId%22%3A%2292c18ff%22%7De screen scheduled June 18.", color: "#f59e0b",
    created_at: "2025-05-28T00:00:00Z", updated_at: "2025-05-28T00:00:00Z",
  },
  {
    id: "4", user_id: "u1",
    company_name: "Linear", role_title: "Staff Engineer",
    status: "wishlist",
    jd_url: "https://linear.app/careers",
    notes: "Dream role — polish resume first.", color: "#a78bfa",
    created_at: "2025-06-10T00:00:00Z", updated_at: "2025-06-10T00:00:00Z",
  },
  {
    id: "5", user_id: "u1",
    company_name: "Notion", role_title: "Frontend Lead",
    status: "offer", applied_date: "2025-06-12",
    notes: "Offer received! Deadline June 25.", color: "#22c55e",
    created_at: "2025-06-12T00:00:00Z", updated_at: "2025-06-12T00:00:00Z",
  },
  {
    id: "6", user_id: "u1",
    company_name: "Figma", role_title: "Design Engineer",
    status: "rejected", applied_date: "2025-05-20",
    notes: "Rejected after take-home. Request feedback.", color: "#f87171",
    created_at: "2025-05-20T00:00:00Z", updated_at: "2025-05-20T00:00:00Z",
  },
  {
    id: "7", user_id: "u1",
    company_name: "Anthropic", role_title: "ML Engineer",
    status: "applied", applied_date: "2025-06-15",
    jd_url: "https://anthropic.com/careers", color: "#6c63ff",
    created_at: "2025-06-15T00:00:00Z", updated_at: "2025-06-15T00:00:00Z",
  },
  {
    id: "8", user_id: "u1",
    company_name: "Raycast", role_title: "Developer Advocate",
    status: "interview", applied_date: "2025-06-08",
    notes: "2nd round interview next week.",
    follow_up_date: "2025-06-22", color: "#f472b6",
    created_at: "2025-06-08T00:00:00Z", updated_at: "2025-06-08T00:00:00Z",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function KanbanBoard() {
  const [applications, setApplications] = useState<JobApplication[]>(MOCK_APPLICATIONS);
  const [showModal, setShowModal] = useState(false);
  const [selectedApp, setSelectedApp] = useState<JobApplication | null>(null);
  const [search, setSearch] = useState("");

  // ── Filter ──────────────────────────────────────────────────────────────────
  const filtered = search.trim()
    ? applications.filter(
        (a) =>
          a.company_name.toLowerCase().includes(search.toLowerCase()) ||
          a.role_title.toLowerCase().includes(search.toLowerCase()),
      )
    : applications;

  // Build column → cards map
  const columnMap = Object.fromEntries(
    COLUMNS.map((c) => [c.id, filtered.filter((a) => a.status === c.id)])
  ) as Record<ApplicationStatus, JobApplication[]>;

  // ── Drag & drop ─────────────────────────────────────────────────────────────
  const onDragEnd = useCallback(
    ({ source, destination, draggableId }: DropResult) => {
      if (!destination) return;
      if (
        source.droppableId === destination.droppableId &&
        source.index === destination.index
      ) return;

      const newStatus = destination.droppableId as ApplicationStatus;

      setApplications((prev) =>
        prev.map((a) =>
          a.id === draggableId
            ? { ...a, status: newStatus, updated_at: new Date().toISOString() }
            : a,
        ),
      );

      // Keep detail panel in sync
      setSelectedApp((prev) =>
        prev?.id === draggableId ? { ...prev, status: newStatus } : prev,
      );
    },
    [],
  );

  // ── Add new application ──────────────────────────────────────────────────────
  function handleAdd(form: AddApplicationForm) {
    const newApp: JobApplication = {
      id: `app-${Date.now()}`,
      user_id: "current-user",
      company_name: form.company_name.trim(),
      role_title: form.role_title.trim(),
      jd_url: form.jd_url || undefined,
      status: form.status,
      applied_date: form.applied_date || undefined,
      notes: form.notes || undefined,
      follow_up_date: form.follow_up_date || undefined,
      color: form.color,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setApplications((prev) => [...prev, newApp]);
    setShowModal(false);
  }

  // ── Stats ────────────────────────────────────────────────────────────────────
  const totalActive = applications.filter(
    (a) => !["wishlist", "offer", "rejected"].includes(a.status)
  ).length;

  return (
    <div className="flex flex-col h-full min-h-0">

      {/* ── Top bar ──────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-4 px-8 py-5 border-b border-[#1a1e2e]">
        <div>
          <h1 className="text-2xl font-semibold text-white mb-1">Job Tracker</h1>
          <p className="text-sm text-slate-400">
            Drag cards between columns to update application status.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-semibold text-white bg-gradient-to-r from-[#6c63ff] to-[#22d3ee] hover:opacity-90 transition-opacity flex-shrink-0"
        >
          <Plus size={15} />
          Add Application
        </button>
      </div>

      {/* ── Stats + Search ───────────────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-4 px-8 py-3 border-b border-[#1a1e2e]">
        <div className="flex items-center gap-3 flex-wrap">
          <Chip label="Total" value={applications.length} color="#94a3b8" />
          <Chip label="Active Pipeline" value={totalActive} color="#22d3ee" />
          <Chip
            label="Offers"
            value={applications.filter((a) => a.status === "offer").length}
            color="#22c55e"
          />
        </div>
        <div className="relative">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search…"
            className="bg-[#0c0e16] border border-[#1a1e2e] rounded-xl pl-8 pr-3.5 py-2 text-[12px] text-white placeholder-slate-600 outline-none focus:border-[#3d4580] transition-colors w-40"
          />
        </div>
      </div>

      {/* ── Board ────────────────────────────────────────────────────────── */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden">
        <div className="h-full px-8 py-5">
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex gap-4 h-full">
              {COLUMNS.map((col) => (
                <KanbanColumn
                  key={col.id}
                  id={col.id}
                  label={col.label}
                  color={col.color}
                  cards={columnMap[col.id] ?? []}
                  onCardClick={setSelectedApp}
                />
              ))}
            </div>
          </DragDropContext>
        </div>
      </div>

      {/* ── Modals ───────────────────────────────────────────────────────── */}
      {showModal && (
        <AddApplicationModal onClose={() => setShowModal(false)} onSubmit={handleAdd} />
      )}
      {selectedApp && (
        <DetailPanel app={selectedApp} onClose={() => setSelectedApp(null)} />
      )}
    </div>
  );
}

function Chip({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="flex items-center gap-2 bg-[#0c0e16] border border-[#1a1e2e] rounded-xl px-3.5 py-2 text-[12px]">
      <span className="font-bold text-white">{value}</span>
      <span className="text-slate-500">{label}</span>
    </div>
  );
}