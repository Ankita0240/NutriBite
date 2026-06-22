import { createFileRoute, Link } from "@tanstack/react-router";
import { foods, restaurants } from "@/lib/data";
import { useApp } from "@/lib/store";
import { FoodCard } from "@/components/FoodCard";
import { RestaurantCard } from "@/components/RestaurantCard";
import { Heart } from "lucide-react";

export const Route = createFileRoute("/favorites")({
  head: () => ({ meta: [{ title: "Favorites — NutriBite" }] }),
  component: FavoritesPage,
});

function FavoritesPage() {
  const { favFoods, favRest } = useApp();
  const foodList = foods.filter((f) => favFoods.includes(f.id));
  const restList = restaurants.filter((r) => favRest.includes(r.id));
  const empty = !foodList.length && !restList.length;
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-3xl font-black sm:text-4xl">Your Favorites</h1>
      <p className="mt-1 text-muted-foreground">Saved meals and restaurants.</p>

      {empty && (
        <div className="mt-10 rounded-3xl bg-muted p-12 text-center">
          <Heart className="mx-auto h-10 w-10 text-primary" />
          <h3 className="mt-3 text-lg font-bold">Nothing here yet</h3>
          <p className="text-sm text-muted-foreground">Tap the heart on any food or restaurant to save it.</p>
          <Link to="/meals" className="mt-4 inline-block rounded-full gradient-primary px-5 py-2 text-sm font-semibold text-white shadow-soft">Browse Meals</Link>
        </div>
      )}

      {restList.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-4 text-xl font-bold">Restaurants</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {restList.map((r) => <RestaurantCard key={r.id} r={r} />)}
          </div>
        </section>
      )}
      {foodList.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-4 text-xl font-bold">Meals</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {foodList.map((f) => <FoodCard key={f.id} f={f} />)}
          </div>
        </section>
      )}
    </div>
  );
}