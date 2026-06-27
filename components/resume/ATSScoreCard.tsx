"use client";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CategoryScore {
  name: string;
  score: number;
  explanation: string;
}

export interface Suggestion {
  text: string;
  priority: "high" | "medium" | "low";
}

export interface ATSResult {
  overall: number;
  categories: CategoryScore[];
  suggestions: Suggestion[];
}

interface ATSScoreCardProps {
  result?: ATSResult;
  isLoading?: boolean;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const RADIUS = 52;
const CIRC = 2 * Math.PI * RADIUS;   // 326.73
const ARC  = CIRC * (270 / 360);     // 245.04  (270-degree gauge)

function scoreColor(score: number): string {
  if (score <= 40) return "#EF4444"; // red-500
  if (score <= 70) return "#F59E0B"; // amber-500
  return "#22D3EE";                  // brand cyan
}

function scoreBadge(score: number): string {
  if (score <= 40) return "bg-red-500/10 border-red-500/20 text-red-400";
  if (score <= 70) return "bg-amber-500/10 border-amber-500/20 text-amber-400";
  return "bg-[#22D3EE]/10 border-[#22D3EE]/20 text-[#22D3EE]";
}

function scoreLabel(score: number): string {
  if (score <= 40) return "Needs work";
  if (score <= 70) return "Improving";
  return "Strong";
}

function priorityStyle(p: Suggestion["priority"]): string {
  if (p === "high")   return "bg-red-500/10 border-red-500/20 text-red-400";
  if (p === "medium") return "bg-amber-500/10 border-amber-500/20 text-amber-400";
  return "bg-[#22D3EE]/10 border-[#22D3EE]/20 text-[#22D3EE]";
}

function scoreContext(score: number): string {
  if (score >= 71)
    return "Your resume is well-optimised for ATS systems. Focus on the suggestions below to push it higher.";
  if (score >= 41)
    return "Your resume passes basic ATS checks. Addressing the improvements below will significantly boost your score.";
  return "Your resume needs substantial work to pass ATS filters. Prioritise the high-priority suggestions below.";
}

// ─── Circular gauge ───────────────────────────────────────────────────────────

function CircularGauge({ score }: { score: number }) {
  const color = scoreColor(score);
  const filled = ARC * (score / 100);
  const rotation = -225; // gap sits at bottom-centre

  return (
    <div className="relative flex items-center justify-center">
      <svg
        width={140}
        height={140}
        viewBox="0 0 120 120"
        role="img"
        aria-label={`ATS score: ${score} out of 100`}
      >
        {/* Track */}
        <circle
          cx={60} cy={60} r={RADIUS}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={8}
          strokeLinecap="round"
          strokeDasharray={`${ARC.toFixed(2)} ${(CIRC - ARC).toFixed(2)}`}
          transform={`rotate(${rotation} 60 60)`}
        />
        {/* Fill */}
        <circle
          cx={60} cy={60} r={RADIUS}
          fill="none"
          stroke={color}
          strokeWidth={8}
          strokeLinecap="round"
          strokeDasharray={`${filled.toFixed(2)} ${(CIRC - filled).toFixed(2)}`}
          transform={`rotate(${rotation} 60 60)`}
          style={{ transition: "stroke-dasharray 0.8s cubic-bezier(.4,0,.2,1), stroke 0.4s ease" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center leading-none pointer-events-none">
        <span className="text-3xl font-bold text-white tabular-nums">{score}</span>
        <span className="mt-1 text-[10px] uppercase tracking-widest font-semibold" style={{ color }}>
          {scoreLabel(score)}
        </span>
      </div>
    </div>
  );
}

// ─── Category bar ─────────────────────────────────────────────────────────────

function CategoryRow({ cat }: { cat: CategoryScore }) {
  const color = scoreColor(cat.score);
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-medium text-slate-300">{cat.name}</span>
        <span className="text-xs font-bold tabular-nums" style={{ color }}>{cat.score}</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-white/[0.06] overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${cat.score}%`, backgroundColor: color }}
        />
      </div>
      <p className="mt-1.5 text-[11px] text-slate-500 leading-snug">{cat.explanation}</p>
    </div>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function Skeleton() {
  return (
    <div
      className="space-y-5 w-full max-w-xl animate-pulse"
      aria-label="Analysing your resume…"
      aria-busy="true"
    >
      {/* Score card */}
      <div className="rounded-xl border border-white/[0.08] bg-[#0D1117] p-6">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="h-[140px] w-[140px] rounded-full bg-white/[0.06] shrink-0" />
          <div className="flex-1 w-full space-y-3">
            <div className="h-3 w-20 rounded bg-white/[0.06]" />
            <div className="h-7 w-24 rounded bg-white/[0.06]" />
            <div className="h-5 w-20 rounded-full bg-white/[0.06]" />
            <div className="h-3 w-full rounded bg-white/[0.04]" />
            <div className="h-3 w-4/5 rounded bg-white/[0.04]" />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="rounded-xl border border-white/[0.08] bg-[#0D1117] p-6 space-y-5">
        <div className="h-4 w-36 rounded bg-white/[0.06]" />
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="flex justify-between">
              <div className="h-3 w-32 rounded bg-white/[0.06]" />
              <div className="h-3 w-6 rounded bg-white/[0.06]" />
            </div>
            <div className="h-1.5 w-full rounded-full bg-white/[0.06]" />
            <div className="h-2.5 w-3/4 rounded bg-white/[0.04]" />
          </div>
        ))}
      </div>

      {/* Suggestions */}
      <div className="rounded-xl border border-white/[0.08] bg-[#0D1117] p-6 space-y-4">
        <div className="h-4 w-44 rounded bg-white/[0.06]" />
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="h-5 w-14 rounded-full bg-white/[0.06] shrink-0" />
            <div className="flex-1 h-3 rounded bg-white/[0.04]" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function ATSScoreCard({ result, isLoading = false }: ATSScoreCardProps) {
  if (isLoading) return <Skeleton />;
  if (!result)   return null;

  return (
    <div className="space-y-5 w-full max-w-xl">

      {/* Overall score */}
      <div className="rounded-xl border border-white/[0.08] bg-[#0D1117] p-6">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <CircularGauge score={result.overall} />
          <div className="flex-1 text-center sm:text-left">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500 mb-1">
              ATS Score
            </p>
            <p className="text-3xl font-bold text-white mb-2">
              {result.overall}
              <span className="text-base font-normal text-slate-500"> / 100</span>
            </p>
            <span
              className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold ${scoreBadge(result.overall)}`}
            >
              {scoreLabel(result.overall)}
            </span>
            <p className="mt-3 text-xs text-slate-400 leading-relaxed max-w-xs sm:max-w-none">
              {scoreContext(result.overall)}
            </p>
          </div>
        </div>
      </div>

      {/* Category breakdown */}
      <div className="rounded-xl border border-white/[0.08] bg-[#0D1117] p-6">
        <h2 className="text-sm font-semibold text-white mb-5">Category Breakdown</h2>
        <div className="space-y-5">
          {result.categories.map((cat) => (
            <CategoryRow key={cat.name} cat={cat} />
          ))}
        </div>
      </div>

      {/* Suggestions */}
      <div className="rounded-xl border border-white/[0.08] bg-[#0D1117] p-6">
        <h2 className="text-sm font-semibold text-white mb-4">Improvement Suggestions</h2>
        <ul className="space-y-3">
          {result.suggestions.map((s, i) => (
            <li
              key={i}
              className="flex items-start gap-3 pb-3 border-b border-white/[0.04] last:pb-0 last:border-0"
            >
              <span
                className={`inline-flex shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${priorityStyle(s.priority)}`}
              >
                {s.priority}
              </span>
              <p className="text-xs text-slate-300 leading-relaxed pt-px">{s.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}