import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useApp } from "@/lib/store";
import { NutritionStrip } from "@/components/NutritionBadge";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — NutriBite" }] }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { cartItems, cartTotal, cartNutrition, clearCart, addOrder } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", phone: "", address: "" });

  if (!cartItems.length) {
    return <div className="mx-auto max-w-md px-4 py-20 text-center"><h1 className="text-xl font-bold">Your cart is empty.</h1></div>;
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address) {
      toast.error("Please fill in all fields.");
      return;
    }
    const id = `ord_${Date.now()}`;
    addOrder({
      id,
      items: cartItems.map((c) => ({ food: c.food!, qty: c.qty })),
      total: cartTotal + 29,
      nutrition: cartNutrition,
      name: form.name, phone: form.phone, address: form.address,
      createdAt: Date.now(),
      status: "received",
    });
    clearCart();
    toast.success("Order placed! Tracking now...");
    navigate({ to: "/orders/$id", params: { id } });
  };

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 lg:grid-cols-[1fr_360px]">
      <form onSubmit={onSubmit} className="space-y-4">
        <h1 className="text-3xl font-black">Checkout</h1>
        <div className="rounded-3xl bg-card p-6 shadow-soft">
          <h3 className="text-lg font-bold">Delivery details</h3>
          <div className="mt-4 grid gap-3">
            <Field label="Full name"><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="nb-input" placeholder="Jane Doe" /></Field>
            <Field label="Phone number"><input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="nb-input" placeholder="+91 98765 43210" /></Field>
            <Field label="Delivery address"><textarea value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} rows={3} className="nb-input" placeholder="Flat 4B, Lotus Apartments, MG Road..." /></Field>
          </div>
        </div>
        <button type="submit" className="w-full rounded-full gradient-primary py-3 text-sm font-semibold text-white shadow-soft hover:shadow-glow">Place order · ₹{cartTotal + 29}</button>
        <style>{`.nb-input { width:100%; border-radius: 0.75rem; background: var(--color-muted); padding: 0.75rem 1rem; font-size: 0.875rem; outline: none; border: 1px solid transparent; } .nb-input:focus { border-color: var(--color-primary); background: var(--color-card); }`}</style>
      </form>
      <aside>
        <div className="rounded-3xl bg-card p-6 shadow-glow">
          <h3 className="text-lg font-bold">Order summary</h3>
          <div className="mt-3 space-y-2 text-sm">
            {cartItems.map(({ food, qty }) => food && (
              <div key={food.id} className="flex justify-between gap-2"><span className="truncate">{qty}× {food.name}</span><span className="font-semibold">₹{food.price * qty}</span></div>
            ))}
          </div>
          <div className="my-4 h-px bg-border" />
          <div className="flex justify-between text-sm"><span className="text-muted-foreground">Subtotal</span><span>₹{cartTotal}</span></div>
          <div className="flex justify-between text-sm"><span className="text-muted-foreground">Delivery</span><span>₹29</span></div>
          <div className="mt-2 flex items-baseline justify-between"><span className="font-bold">Total</span><span className="text-2xl font-black text-primary">₹{cartTotal + 29}</span></div>
          <div className="mt-5">
            <h4 className="mb-2 text-sm font-bold">Nutrition</h4>
            <NutritionStrip n={cartNutrition} compact />
          </div>
        </div>
      </aside>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="mb-1 block text-xs font-semibold text-muted-foreground">{label}</span>{children}</label>;
}