// export default function TrackerPage() {
//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-semibold text-white mb-2">Job Tracker</h1>
//       <p className="text-slate-400">FE-005 — Kanban board coming soon.</p>
//     </div>
//   )
// }



"use client";

import KanbanBoard from "@/components/tracker/KanbanBoard";

export default function TrackerPage() {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <KanbanBoard />
    </div>
  );
}