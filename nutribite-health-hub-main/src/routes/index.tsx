import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Search, Sparkles, TrendingUp } from "lucide-react";
import { restaurants, foods } from "@/lib/data";
import { recommendFoods } from "@/lib/health";
import { useApp } from "@/lib/store";
import { RestaurantCard } from "@/components/RestaurantCard";
import { FoodCard } from "@/components/FoodCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NutriBite — Order food that matches your health goals" },
      { name: "description", content: "Discover healthy meals by calories, protein, carbs and nutrition." },
      { property: "og:title", content: "NutriBite — Health-Aware Food Delivery" },
      { property: "og:description", content: "Discover healthy meals by calories, protein, carbs and nutrition." },
    ],
  }),
  component: Index,
});

const featureCards = [
  { title: "Weight Loss Meals", desc: "Low-cal, high satiety meals to fuel your cut.", grad: "from-rose-400 to-orange-400", emoji: "🔥" },
  { title: "High Protein Meals", desc: "30g+ protein per meal for muscle gains.", grad: "from-emerald-400 to-teal-400", emoji: "💪" },
  { title: "Low Carb Meals", desc: "Keto-friendly bowls without compromise.", grad: "from-amber-400 to-yellow-400", emoji: "🥑" },
  { title: "Vegetarian Meals", desc: "Wholesome plant-forward plates.", grad: "from-lime-400 to-emerald-400", emoji: "🥗" },
  { title: "Vegan Meals", desc: "100% plant-based, packed with nutrients.", grad: "from-green-400 to-teal-400", emoji: "🌱" },
  { title: "Diabetic Friendly", desc: "Low-sugar, high-fiber, gentle on glucose.", grad: "from-sky-400 to-indigo-400", emoji: "🩺" },
] as const;

function Index() {
  const { prefs } = useApp();
  const recs = recommendFoods(foods, prefs, 8);
  const trending = [...foods].sort((a, b) => b.protein - a.protein).slice(0, 8);
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 gradient-hero opacity-95" />
        <div className="absolute -right-32 -top-32 -z-10 h-96 w-96 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 -z-10 h-96 w-96 rounded-full bg-orange-300/30 blur-3xl" />
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
          <div className="text-white">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur"><Sparkles className="h-3 w-3" /> Nutrition-first delivery</div>
            <h1 className="mt-4 text-4xl font-black leading-[1.05] sm:text-5xl md:text-6xl">Order Food That Matches Your <span className="text-yellow-200">Health Goals</span></h1>
            <p className="mt-4 max-w-lg text-base opacity-90 md:text-lg">Discover meals based on calories, protein, carbs and nutrition — curated to your goal, not just your craving.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/meals" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-primary shadow-glow transition hover:scale-105">Explore Healthy Meals <ArrowRight className="h-4 w-4" /></Link>
              <Link to="/dashboard" className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20">Set My Goals</Link>
            </div>
            <div className="mt-8 flex items-center gap-2 rounded-full bg-white p-1.5 shadow-glow max-w-md">
              <Search className="ml-3 h-4 w-4 text-muted-foreground" />
              <input placeholder="Search 'high protein bowl'..." className="flex-1 bg-transparent px-2 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none" onKeyDown={(e) => { if (e.key === "Enter") window.location.href = `/meals?q=${encodeURIComponent((e.target as HTMLInputElement).value)}`; }} />
              <Link to="/meals" className="rounded-full gradient-primary px-4 py-2 text-xs font-bold text-white">Search</Link>
            </div>
          </div>
          <div className="relative hidden md:block">
            <div className="relative aspect-square rounded-[2.5rem] bg-white/10 p-4 backdrop-blur-xl shadow-glow">
              <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80" alt="Healthy bowl" className="h-full w-full rounded-3xl object-cover" />
              <div className="absolute -left-6 top-10 rounded-2xl bg-white p-3 shadow-glow">
                <div className="text-[10px] uppercase tracking-wide text-muted-foreground">Health Score</div>
                <div className="text-2xl font-black text-emerald-600">94</div>
              </div>
              <div className="absolute -bottom-4 -right-4 rounded-2xl bg-white p-3 shadow-glow">
                <div className="text-[10px] uppercase tracking-wide text-muted-foreground">Protein</div>
                <div className="text-2xl font-black text-primary">42g</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <Section title="Explore by goal" subtitle="Find meals tailored to how you want to feel.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featureCards.map((c) => (
            <Link key={c.title} to="/meals" className="group relative overflow-hidden rounded-3xl bg-card p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-glow">
              <div className={`absolute -right-6 -top-6 h-28 w-28 rounded-full bg-gradient-to-br ${c.grad} opacity-30 blur-2xl transition group-hover:opacity-60`} />
              <div className="text-3xl">{c.emoji}</div>
              <h3 className="mt-3 text-lg font-bold">{c.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
              <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">Explore <ArrowRight className="h-3 w-3" /></div>
            </Link>
          ))}
        </div>
      </Section>

      {/* Recommended */}
      <Section title="Recommended for you" subtitle={prefs ? `Curated for your ${prefs.goal.replace("_", " ")} goal.` : "Set your goals to personalize this list."}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {recs.slice(0, 4).map((f) => <FoodCard key={f.id} f={f} />)}
        </div>
      </Section>

      {/* Popular Restaurants */}
      <Section title="Popular restaurants" subtitle="Health-conscious kitchens near you." action={<Link to="/restaurants" className="text-sm font-semibold text-primary">See all →</Link>}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {restaurants.slice(0, 8).map((r) => <RestaurantCard key={r.id} r={r} />)}
        </div>
      </Section>

      {/* Trending */}
      <Section title={<><TrendingUp className="inline h-5 w-5 text-primary" /> Trending healthy foods</>} subtitle="What everyone's ordering right now.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trending.slice(0, 8).map((f) => <FoodCard key={f.id} f={f} />)}
        </div>
      </Section>
    </div>
  );
}

function Section({ title, subtitle, action, children }: { title: React.ReactNode; subtitle?: string; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-black sm:text-3xl">{title}</h2>
          {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}
