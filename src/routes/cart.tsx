import { createFileRoute, Link } from "@tanstack/react-router";
import { useApp } from "@/lib/store";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { NutritionStrip } from "@/components/NutritionBadge";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your Cart — NutriBite" }] }),
  component: CartPage,
});

function CartPage() {
  const { cartItems, cartTotal, cartNutrition, setQty, removeFromCart } = useApp();
  if (!cartItems.length) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-primary/10 text-primary"><ShoppingBag className="h-8 w-8" /></div>
        <h1 className="mt-4 text-2xl font-black">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">Add some healthy meals to get started.</p>
        <Link to="/meals" className="mt-6 inline-block rounded-full gradient-primary px-6 py-3 text-sm font-semibold text-white shadow-soft">Browse Meals</Link>
      </div>
    );
  }
  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 lg:grid-cols-[1fr_360px]">
      <div>
        <h1 className="text-3xl font-black">Your Cart</h1>
        <p className="mt-1 text-sm text-muted-foreground">{cartItems.length} item{cartItems.length > 1 ? "s" : ""}</p>
        <div className="mt-6 space-y-3">
          {cartItems.map(({ food, qty }) => food && (
            <div key={food.id} className="flex items-center gap-3 rounded-2xl bg-card p-3 shadow-soft">
              <img src={food.image} alt={food.name} className="h-20 w-20 shrink-0 rounded-xl object-cover" />
              <div className="min-w-0 flex-1">
                <h4 className="truncate font-semibold">{food.name}</h4>
                <p className="text-xs text-muted-foreground">{food.calories} kcal · {food.protein}g protein</p>
                <div className="mt-1 font-bold text-primary">₹{food.price * qty}</div>
              </div>
              <div className="flex shrink-0 items-center gap-1 rounded-full bg-muted p-1">
                <button onClick={() => setQty(food.id, qty - 1)} className="grid h-7 w-7 place-items-center rounded-full bg-card shadow-soft"><Minus className="h-3 w-3" /></button>
                <span className="w-6 text-center text-sm font-bold">{qty}</span>
                <button onClick={() => setQty(food.id, qty + 1)} className="grid h-7 w-7 place-items-center rounded-full bg-card shadow-soft"><Plus className="h-3 w-3" /></button>
              </div>
              <button onClick={() => removeFromCart(food.id)} className="grid h-9 w-9 place-items-center rounded-full text-muted-foreground hover:bg-muted hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
            </div>
          ))}
        </div>
      </div>
      <aside className="lg:sticky lg:top-20 lg:self-start">
        <div className="rounded-3xl bg-card p-6 shadow-glow">
          <h3 className="text-lg font-bold">Nutrition summary</h3>
          <p className="text-sm text-muted-foreground">Your cart contains <b className="text-foreground">{Math.round(cartNutrition.calories)} cal</b> and <b className="text-foreground">{Math.round(cartNutrition.protein)}g protein</b>.</p>
          <div className="mt-4"><NutritionStrip n={cartNutrition} /></div>
          <div className="my-4 h-px bg-border" />
          <div className="flex justify-between text-sm"><span className="text-muted-foreground">Subtotal</span><span className="font-semibold">₹{cartTotal}</span></div>
          <div className="flex justify-between text-sm"><span className="text-muted-foreground">Delivery</span><span className="font-semibold">₹29</span></div>
          <div className="mt-2 flex items-baseline justify-between"><span className="font-bold">Total</span><span className="text-2xl font-black text-primary">₹{cartTotal + 29}</span></div>
          <Link to="/checkout" className="mt-4 block rounded-full gradient-primary py-3 text-center text-sm font-semibold text-white shadow-soft hover:shadow-glow">Proceed to checkout</Link>
        </div>
      </aside>
    </div>
  );
}