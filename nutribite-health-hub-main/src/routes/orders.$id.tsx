import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { useApp } from "@/lib/store";
import { Check, ChefHat, Package, Bike, Home } from "lucide-react";
import type { Order } from "@/lib/types";

export const Route = createFileRoute("/orders/$id")({
  head: () => ({ meta: [{ title: "Order Tracking — NutriBite" }] }),
  errorComponent: () => <div className="p-20 text-center">Could not load order.</div>,
  notFoundComponent: () => <div className="p-20 text-center">Order not found.</div>,
  component: OrderTrack,
});

const steps: { id: Order["status"]; label: string; icon: typeof Check }[] = [
  { id: "received", label: "Order Received", icon: Check },
  { id: "preparing", label: "Preparing", icon: ChefHat },
  { id: "ready", label: "Ready", icon: Package },
  { id: "out_for_delivery", label: "Out for Delivery", icon: Bike },
  { id: "delivered", label: "Delivered", icon: Home },
];

function OrderTrack() {
  const { id } = Route.useParams();
  const { orders, updateOrderStatus } = useApp();
  const order = orders.find((o) => o.id === id);

  useEffect(() => {
    if (!order) return;
    const idx = steps.findIndex((s) => s.id === order.status);
    if (idx >= steps.length - 1) return;
    const t = setTimeout(() => updateOrderStatus(order.id, steps[idx + 1].id), 4500);
    return () => clearTimeout(t);
  }, [order, updateOrderStatus]);

  if (!order) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <h1 className="text-xl font-bold">Loading order…</h1>
        <p className="mt-2 text-sm text-muted-foreground">If this persists, your order may not exist yet.</p>
        <Link to="/" className="mt-4 inline-block text-sm font-semibold text-primary">← Back home</Link>
      </div>
    );
  }
  const activeIdx = steps.findIndex((s) => s.id === order.status);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="rounded-3xl gradient-primary p-6 text-white shadow-glow">
        <div className="text-xs font-semibold opacity-90">Order #{order.id.slice(-6).toUpperCase()}</div>
        <h1 className="mt-1 text-2xl font-black">{steps[activeIdx].label}</h1>
        <p className="text-sm opacity-90">Delivering to {order.address}</p>
      </div>

      <div className="mt-8 rounded-3xl bg-card p-6 shadow-soft">
        <ol className="space-y-6">
          {steps.map((s, i) => {
            const done = i <= activeIdx;
            const current = i === activeIdx;
            const Icon = s.icon;
            return (
              <li key={s.id} className="relative flex items-start gap-4">
                {i < steps.length - 1 && <span className={`absolute left-5 top-10 h-12 w-0.5 ${done ? "bg-primary" : "bg-border"}`} />}
                <div className={`relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full transition ${done ? "gradient-primary text-white shadow-soft" : "bg-muted text-muted-foreground"} ${current ? "animate-pulse" : ""}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="pt-1">
                  <div className={`font-semibold ${done ? "text-foreground" : "text-muted-foreground"}`}>{s.label}</div>
                  {current && <div className="text-xs text-primary">In progress...</div>}
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="mt-6 rounded-3xl bg-card p-6 shadow-soft">
        <h3 className="font-bold">Items ({order.items.length})</h3>
        <div className="mt-3 space-y-2 text-sm">
          {order.items.map(({ food, qty }) => (
            <div key={food.id} className="flex justify-between"><span>{qty}× {food.name}</span><span className="font-semibold">₹{food.price * qty}</span></div>
          ))}
        </div>
        <div className="mt-4 flex justify-between border-t border-border pt-3 font-bold"><span>Total</span><span className="text-primary">₹{order.total}</span></div>
      </div>

      <Link to="/" className="mt-6 block text-center text-sm font-semibold text-primary">← Back to home</Link>
    </div>
  );
}