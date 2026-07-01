"use client";

import { Droppable } from "@hello-pangea/dnd";
import { JobApplication, ApplicationStatus } from "@/types/job-tracker";
import ApplicationCard from "./ApplicationCard";

interface Props {
  id: ApplicationStatus;
  label: string;
  color: string;
  cards: JobApplication[];
  onCardClick: (app: JobApplication) => void;
}

export default function KanbanColumn({ id, label, color, cards, onCardClick }: Props) {
  return (
    <div className="flex flex-col w-[260px] flex-shrink-0 bg-[#0c0e16] border border-[#1a1e2e] rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2.5 px-4 py-3.5 border-b border-[#1a1e2e]">
        <div
          className="w-2.5 h-2.5 rounded-full flex-shrink-0"
          style={{ backgroundColor: color }}
        />
        <span className="text-[11px] font-bold uppercase tracking-[0.8px] text-slate-400 flex-1">
          {label}
        </span>
        <span
          className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
          style={{ backgroundColor: `${color}1a`, color }}
        >
          {cards.length}
        </span>
      </div>

      {/* Droppable */}
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={[
              "flex-1 flex flex-col gap-2.5 p-3 min-h-[120px] transition-colors duration-150",
              snapshot.isDraggingOver ? "bg-[#12182a]" : "",
            ].join(" ")}
          >
            {cards.length === 0 && !snapshot.isDraggingOver && (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-[11px] text-slate-600 text-center leading-relaxed border border-dashed border-[#1e2438] rounded-xl px-4 py-6">
                  No applications yet.<br />Drop a card here.
                </p>
              </div>
            )}

            {cards.map((app, i) => (
              <ApplicationCard
                key={app.id}
                app={app}
                index={i}
                onClick={onCardClick}
              />
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}