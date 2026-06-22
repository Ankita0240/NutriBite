import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { getRestaurant, getFoodsForRestaurant, categories } from "@/lib/data";
import { FoodCard } from "@/components/FoodCard";
import { Star, Clock, Bike, MapPin, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/restaurants/$id")({
  loader: ({ params }) => {
    const r = getRestaurant(params.id);
    if (!r) throw notFound();
    return { restaurant: r };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.restaurant.name} — NutriBite` },
      { name: "description", content: `${loaderData.restaurant.name} — ${loaderData.restaurant.cuisine}. Order healthy meals from this kitchen.` },
    ] : [],
  }),
  notFoundComponent: () => <div className="p-20 text-center">Restaurant not found.</div>,
  errorComponent: () => <div className="p-20 text-center">Could not load restaurant.</div>,
  component: RestaurantDetail,
});

function RestaurantDetail() {
  const { restaurant } = Route.useLoaderData();
  const items = getFoodsForRestaurant(restaurant.id);
  const [cat, setCat] = useState<string>("All");
  const cats = useMemo(() => ["All", ...categories.filter((c) => items.some((i) => i.category === c))], [items]);
  const filtered = cat === "All" ? items : items.filter((i) => i.category === cat);

  return (
    <div>
      <div className="relative h-56 sm:h-72">
        <img src={restaurant.banner} alt={restaurant.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <Link to="/restaurants" className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full glass px-3 py-1.5 text-sm font-semibold"><ArrowLeft className="h-4 w-4" /> Back</Link>
      </div>
      <div className="mx-auto max-w-7xl px-4">
        <div className="-mt-16 rounded-3xl bg-card p-6 shadow-glow">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-3xl font-black">{restaurant.name}</h1>
              <p className="text-muted-foreground">{restaurant.cuisine}</p>
            </div>
            <div className="inline-flex items-center gap-1 rounded-full bg-emerald-500 px-3 py-1.5 text-sm font-bold text-white"><Star className="h-4 w-4 fill-white" />{restaurant.rating}</div>
          </div>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1"><Clock className="h-4 w-4" /> {restaurant.deliveryTime} min</span>
            <span className="inline-flex items-center gap-1"><Bike className="h-4 w-4" /> ₹{restaurant.deliveryFee} delivery</span>
            <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" /> 2.3 km away</span>
          </div>
        </div>

        <div className="sticky top-16 z-30 -mx-4 mt-6 overflow-x-auto bg-background/80 px-4 py-3 backdrop-blur">
          <div className="flex gap-2">
            {cats.map((c) => (
              <button key={c} onClick={() => setCat(c)} className={`whitespace-nowrap rounded-full border px-4 py-1.5 text-sm font-medium transition ${cat === c ? "border-primary bg-primary text-white" : "border-border bg-card hover:bg-muted"}`}>{c}</button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 py-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((f) => <FoodCard key={f.id} f={f} />)}
        </div>
      </div>
    </div>
  );
}