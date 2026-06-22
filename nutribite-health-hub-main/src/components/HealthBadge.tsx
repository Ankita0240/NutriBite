import { healthLabel } from "@/lib/health";

const tones: Record<string, string> = {
  emerald: "bg-emerald-500/15 text-emerald-700 border-emerald-500/30",
  green: "bg-green-500/15 text-green-700 border-green-500/30",
  amber: "bg-amber-500/15 text-amber-700 border-amber-500/30",
  red: "bg-red-500/15 text-red-700 border-red-500/30",
};

export function HealthBadge({ score, size = "sm" }: { score: number; size?: "sm" | "md" }) {
  const { label, tone } = healthLabel(score);
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-semibold ${tones[tone]} ${size === "md" ? "text-sm" : "text-xs"}`}>
      <span className="font-bold">{score}</span>
      <span className="opacity-80">· {label}</span>
    </span>
  );
}