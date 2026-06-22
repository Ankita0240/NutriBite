import { Link } from "@tanstack/react-router";
import { Star, Clock, Bike, Heart } from "lucide-react";
import type { Restaurant } from "@/lib/types";
import { foods } from "@/lib/data";
import { healthScore } from "@/lib/health";
import { useApp } from "@/lib/store";

export function RestaurantCard({ r }: { r: Restaurant }) {
  const { favRest, toggleFavRest } = useApp();
  const items = foods.filter((f) => f.restaurantId === r.id);
  const avgCal = items.length ? Math.round(items.reduce((s, f) => s + f.calories, 0) / items.length) : 0;
  const avgScore = items.length ? Math.round(items.reduce((s, f) => s + healthScore(f), 0) / items.length) : 0;
  const isFav = favRest.includes(r.id);
  return (
    <Link to="/restaurants/$id" params={{ id: r.id }} className="group block overflow-hidden rounded-3xl bg-card shadow-soft transition hover:-translate-y-1 hover:shadow-glow">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={r.image} alt={r.name} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
        <button
          onClick={(e) => { e.preventDefault(); toggleFavRest(r.id); }}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full glass"
          aria-label="favorite"
        >
          <Heart className={`h-4 w-4 ${isFav ? "fill-primary text-primary" : "text-foreground"}`} />
        </button>
        <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-xs font-bold text-foreground shadow-soft">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
          Health {avgScore}
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
          <div>
            <h3 className="text-lg font-bold leading-tight">{r.name}</h3>
            <p className="text-xs opacity-90">{r.cuisine}</p>
          </div>
          <div className="inline-flex items-center gap-1 rounded-full bg-emerald-500 px-2 py-1 text-xs font-bold">
            <Star className="h-3 w-3 fill-white" /> {r.rating}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-2 p-4 text-sm">
        <span className="inline-flex items-center gap-1 text-muted-foreground"><Clock className="h-4 w-4" />{r.deliveryTime} min</span>
        <span className="inline-flex items-center gap-1 text-muted-foreground"><Bike className="h-4 w-4" />₹{r.deliveryFee}</span>
        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">~{avgCal} kcal</span>
      </div>
    </Link>
  );
}