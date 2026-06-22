import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { foods } from "@/lib/data";
import { FoodCard } from "@/components/FoodCard";
import { recommendFoods } from "@/lib/health";
import { useApp } from "@/lib/store";
import { Search } from "lucide-react";
import type { Preference, Diet } from "@/lib/types";

export const Route = createFileRoute("/meals")({
  head: () => ({ meta: [{ title: "Healthy Meals — NutriBite" }, { name: "description", content: "Browse meals by nutrition: calories, protein, carbs, and more." }] }),
  component: MealsPage,
});

const tagFilters: { id: Preference; label: string }[] = [
  { id: "high_protein", label: "High Protein" },
  { id: "low_carb", label: "Low Carb" },
  { id: "low_fat", label: "Low Fat" },
  { id: "low_sugar", label: "Low Sugar" },
  { id: "high_fiber", label: "High Fiber" },
];
const dietFilters: { id: Diet; label: string }[] = [
  { id: "vegetarian", label: "Vegetarian" },
  { id: "vegan", label: "Vegan" },
  { id: "eggitarian", label: "Eggitarian" },
  { id: "non_veg", label: "Non Veg" },
];

function MealsPage() {
  const { prefs } = useApp();
  const [q, setQ] = useState("");
  const [tags, setTags] = useState<Preference[]>([]);
  const [diet, setDiet] = useState<Diet | "all">("all");
  const [sort, setSort] = useState<"recommended" | "low_cal" | "high_protein" | "low_sugar">("recommended");

  const list = useMemo(() => {
    let l = foods.filter((f) => {
      if (diet !== "all" && !f.diet.includes(diet)) return false;
      if (tags.length && !tags.every((t) => f.tags.includes(t))) return false;
      if (q.trim()) {
        const s = q.toLowerCase();
        if (!f.name.toLowerCase().includes(s) && !f.description.toLowerCase().includes(s) && !f.category.toLowerCase().includes(s)) return false;
      }
      return true;
    });
    if (sort === "low_cal") l = [...l].sort((a, b) => a.calories - b.calories);
    else if (sort === "high_protein") l = [...l].sort((a, b) => b.protein - a.protein);
    else if (sort === "low_sugar") l = [...l].sort((a, b) => a.sugar - b.sugar);
    else l = recommendFoods(l, prefs, l.length);
    return l;
  }, [q, tags, diet, sort, prefs]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-3xl font-black sm:text-4xl">Healthy Meals</h1>
      <p className="mt-1 text-muted-foreground">Search and filter by nutrition.</p>

      <div className="mt-6 flex items-center gap-2 rounded-full bg-card p-1.5 shadow-soft">
        <Search className="ml-3 h-4 w-4 text-muted-foreground" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name, cuisine, or nutrition..." className="flex-1 bg-transparent px-2 py-2 text-sm outline-none" />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {tagFilters.map((t) => {
          const on = tags.includes(t.id);
          return (
            <button key={t.id} onClick={() => setTags((a) => on ? a.filter((x) => x !== t.id) : [...a, t.id])}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${on ? "border-primary bg-primary text-white" : "border-border bg-card hover:bg-muted"}`}>
              {t.label}
            </button>
          );
        })}
        <div className="ml-auto flex gap-2">
          <select value={diet} onChange={(e) => setDiet(e.target.value as Diet | "all")} className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold">
            <option value="all">All Diets</option>
            {dietFilters.map((d) => <option key={d.id} value={d.id}>{d.label}</option>)}
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold">
            <option value="recommended">Recommended</option>
            <option value="low_cal">Lowest Calories</option>
            <option value="high_protein">Highest Protein</option>
            <option value="low_sugar">Lowest Sugar</option>
          </select>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {list.map((f) => <FoodCard key={f.id} f={f} />)}
      </div>
      {!list.length && <div className="mt-10 rounded-3xl bg-muted p-10 text-center text-muted-foreground">No meals match those filters.</div>}
    </div>
  );
}