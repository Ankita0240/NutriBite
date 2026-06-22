import { Heart, Plus } from "lucide-react";
import type { FoodItem } from "@/lib/types";
import { useApp } from "@/lib/store";
import { healthScore } from "@/lib/health";
import { HealthBadge } from "./HealthBadge";
import { toast } from "sonner";

export function FoodCard({ f }: { f: FoodItem }) {
  const { addToCart, favFoods, toggleFavFood } = useApp();
  const isFav = favFoods.includes(f.id);
  const score = healthScore(f);
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl bg-card shadow-soft transition hover:-translate-y-1 hover:shadow-glow">
      <div className="relative aspect-[5/4] overflow-hidden">
        <img src={f.image} alt={f.name} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
        <button
          onClick={() => toggleFavFood(f.id)}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full glass"
          aria-label="favorite"
        >
          <Heart className={`h-4 w-4 ${isFav ? "fill-primary text-primary" : ""}`} />
        </button>
        <div className="absolute left-3 top-3"><HealthBadge score={score} /></div>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-bold leading-tight">{f.name}</h4>
          <span className="shrink-0 font-bold text-primary">₹{f.price}</span>
        </div>
        <p className="line-clamp-2 text-xs text-muted-foreground">{f.description}</p>
        <div className="mt-1 grid grid-cols-4 gap-1 text-center text-[10px]">
          <div className="rounded-md bg-muted/60 py-1"><div className="text-xs font-bold text-primary">{f.calories}</div>kcal</div>
          <div className="rounded-md bg-muted/60 py-1"><div className="text-xs font-bold text-emerald-600">{f.protein}g</div>protein</div>
          <div className="rounded-md bg-muted/60 py-1"><div className="text-xs font-bold text-amber-600">{f.carbs}g</div>carbs</div>
          <div className="rounded-md bg-muted/60 py-1"><div className="text-xs font-bold text-rose-600">{f.fat}g</div>fat</div>
        </div>
        <button
          onClick={() => { addToCart(f.id); toast.success(`${f.name} added to cart`); }}
          className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-full gradient-primary px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:shadow-glow"
        >
          <Plus className="h-4 w-4" /> Add to cart
        </button>
      </div>
    </div>
  );
}