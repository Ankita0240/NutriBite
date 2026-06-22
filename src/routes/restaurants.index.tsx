import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { restaurants, foods } from "@/lib/data";
import { RestaurantCard } from "@/components/RestaurantCard";
import type { Preference } from "@/lib/types";
import { Filter } from "lucide-react";

export const Route = createFileRoute("/restaurants/")({
  head: () => ({ meta: [{ title: "Restaurants — NutriBite" }, { name: "description", content: "Browse health-conscious restaurants near you." }] }),
  component: RestaurantsPage,
});

const filters: { id: Preference | "vegetarian" | "vegan" | "diabetic"; label: string }[] = [
  { id: "vegetarian", label: "Vegetarian" },
  { id: "vegan", label: "Vegan" },
  { id: "high_protein", label: "High Protein" },
  { id: "low_carb", label: "Low Carb" },
  { id: "low_fat", label: "Low Fat" },
  { id: "diabetic", label: "Diabetic Friendly" },
];

type SortKey = "rated" | "calories" | "protein" | "fast";

function RestaurantsPage() {
  const [active, setActive] = useState<string[]>([]);
  const [sort, setSort] = useState<SortKey>("rated");

  const list = useMemo(() => {
    let l = restaurants.filter((r) => {
      if (!active.length) return true;
      return active.every((a) => {
        if (a === "vegetarian") return r.diet.includes("vegetarian");
        if (a === "vegan") return r.diet.includes("vegan");
        if (a === "diabetic") return r.tags.includes("low_sugar") || r.tags.includes("high_fiber");
        return r.tags.includes(a as Preference);
      });
    });
    const restFoods = (id: string) => foods.filter((f) => f.restaurantId === id);
    if (sort === "rated") l = [...l].sort((a, b) => b.rating - a.rating);
    if (sort === "fast") l = [...l].sort((a, b) => a.deliveryTime - b.deliveryTime);
    if (sort === "calories") l = [...l].sort((a, b) => {
      const ca = restFoods(a.id).reduce((s, f) => s + f.calories, 0) / Math.max(1, restFoods(a.id).length);
      const cb = restFoods(b.id).reduce((s, f) => s + f.calories, 0) / Math.max(1, restFoods(b.id).length);
      return ca - cb;
    });
    if (sort === "protein") l = [...l].sort((a, b) => {
      const ca = restFoods(a.id).reduce((s, f) => s + f.protein, 0) / Math.max(1, restFoods(a.id).length);
      const cb = restFoods(b.id).reduce((s, f) => s + f.protein, 0) / Math.max(1, restFoods(b.id).length);
      return cb - ca;
    });
    return l;
  }, [active, sort]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-black sm:text-4xl">Restaurants</h1>
        <p className="mt-1 text-muted-foreground">{list.length} kitchens curated for healthy eating.</p>
      </div>
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1 text-sm font-semibold"><Filter className="h-4 w-4" /> Filter</span>
        {filters.map((f) => {
          const on = active.includes(f.id);
          return (
            <button key={f.id} onClick={() => setActive((a) => on ? a.filter((x) => x !== f.id) : [...a, f.id])}
              className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${on ? "border-primary bg-primary text-white" : "border-border hover:bg-muted"}`}>
              {f.label}
            </button>
          );
        })}
        <div className="ml-auto">
          <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)} className="rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium">
            <option value="rated">Highest Rated</option>
            <option value="calories">Lowest Calories</option>
            <option value="protein">Highest Protein</option>
            <option value="fast">Fastest Delivery</option>
          </select>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {list.map((r) => <RestaurantCard key={r.id} r={r} />)}
      </div>
      {!list.length && <div className="rounded-3xl bg-muted p-10 text-center text-muted-foreground">No restaurants match those filters.</div>}
    </div>
  );
}