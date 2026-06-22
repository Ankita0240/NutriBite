import type { Nutrition } from "@/lib/types";

export function NutritionStrip({ n, compact = false }: { n: Nutrition; compact?: boolean }) {
  const items: { label: string; value: string; color: string }[] = [
    { label: "Cal", value: `${Math.round(n.calories)}`, color: "text-primary" },
    { label: "Protein", value: `${Math.round(n.protein)}g`, color: "text-emerald-600" },
    { label: "Carbs", value: `${Math.round(n.carbs)}g`, color: "text-amber-600" },
    { label: "Fat", value: `${Math.round(n.fat)}g`, color: "text-rose-600" },
  ];
  if (!compact) items.push(
    { label: "Fiber", value: `${Math.round(n.fiber)}g`, color: "text-teal-600" },
    { label: "Sugar", value: `${Math.round(n.sugar)}g`, color: "text-pink-600" },
  );
  return (
    <div className={`grid ${compact ? "grid-cols-4" : "grid-cols-3 sm:grid-cols-6"} gap-2`}>
      {items.map((i) => (
        <div key={i.label} className="rounded-xl bg-muted/60 px-2 py-1.5 text-center">
          <div className={`text-sm font-bold ${i.color}`}>{i.value}</div>
          <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{i.label}</div>
        </div>
      ))}
    </div>
  );
}