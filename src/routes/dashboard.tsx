import { createFileRoute, Link } from "@tanstack/react-router";
import { useApp } from "@/lib/store";
import { foods } from "@/lib/data";
import { sumNutrition } from "@/lib/health";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend } from "recharts";
import { Flame, Beef, Wheat, Droplet } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Nutrition Dashboard — NutriBite" }] }),
  component: Dashboard,
});

function Dashboard() {
  const { orders, prefs, favFoods, setPrefs } = useApp();
  const today = new Date(); today.setHours(0,0,0,0);
  const todays = orders.filter((o) => o.createdAt >= today.getTime());
  const daily = sumNutrition(todays.flatMap((o) => o.items));

  const week: { day: string; calories: number; protein: number; carbs: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(); d.setHours(0,0,0,0); d.setDate(d.getDate() - i);
    const dayMs = d.getTime();
    const nextMs = dayMs + 86400000;
    const dOrders = orders.filter((o) => o.createdAt >= dayMs && o.createdAt < nextMs);
    const n = sumNutrition(dOrders.flatMap((o) => o.items));
    week.push({ day: d.toLocaleDateString("en", { weekday: "short" }), calories: Math.round(n.calories), protein: Math.round(n.protein), carbs: Math.round(n.carbs) });
  }

  const goalTargets = { calories: prefs?.goal === "weight_loss" ? 1600 : prefs?.goal === "weight_gain" ? 2800 : 2000, protein: prefs?.goal === "muscle_building" ? 140 : 90, fiber: 30, sugar: 40 };

  const macroData = [
    { name: "Protein", value: Math.round(daily.protein * 4), color: "#10b981" },
    { name: "Carbs", value: Math.round(daily.carbs * 4), color: "#f59e0b" },
    { name: "Fat", value: Math.round(daily.fat * 9), color: "#ef4444" },
  ];

  const favList = foods.filter((f) => favFoods.includes(f.id)).slice(0, 4);
  const recent = orders.slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-black sm:text-4xl">Nutrition Dashboard</h1>
          <p className="mt-1 text-muted-foreground">Track your daily intake and progress.</p>
        </div>
        <button onClick={() => { setPrefs(null); if (typeof window !== "undefined") { localStorage.removeItem("nb_prefs"); location.reload(); } }} className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold hover:bg-muted">Reset preferences</button>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat icon={Flame} label="Calories" value={Math.round(daily.calories)} unit="kcal" target={goalTargets.calories} color="text-primary" bg="bg-primary/10" />
        <Stat icon={Beef} label="Protein" value={Math.round(daily.protein)} unit="g" target={goalTargets.protein} color="text-emerald-600" bg="bg-emerald-500/10" />
        <Stat icon={Wheat} label="Fiber" value={Math.round(daily.fiber)} unit="g" target={goalTargets.fiber} color="text-amber-600" bg="bg-amber-500/10" />
        <Stat icon={Droplet} label="Sugar" value={Math.round(daily.sugar)} unit="g" target={goalTargets.sugar} color="text-pink-600" bg="bg-pink-500/10" reverse />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="rounded-3xl bg-card p-6 shadow-soft lg:col-span-2">
          <h3 className="font-bold">Weekly Calories & Protein</h3>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={week}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="day" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
                <Bar dataKey="calories" fill="oklch(0.605 0.224 25.5)" radius={[8,8,0,0]} />
                <Bar dataKey="protein" fill="oklch(0.65 0.18 160)" radius={[8,8,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-3xl bg-card p-6 shadow-soft">
          <h3 className="font-bold">Today's Macros</h3>
          {daily.calories === 0 ? (
            <p className="mt-10 text-center text-sm text-muted-foreground">No meals today yet.</p>
          ) : (
            <div className="mt-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={macroData} dataKey="value" innerRadius={50} outerRadius={80} paddingAngle={3}>
                    {macroData.map((d) => <Cell key={d.name} fill={d.color} />)}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl bg-card p-6 shadow-soft">
          <h3 className="font-bold">Recent orders</h3>
          {!recent.length ? (
            <p className="mt-4 text-sm text-muted-foreground">No orders yet. <Link to="/meals" className="font-semibold text-primary">Order something healthy →</Link></p>
          ) : (
            <ul className="mt-4 space-y-3">
              {recent.map((o) => (
                <li key={o.id} className="flex items-center justify-between rounded-2xl bg-muted/60 p-3">
                  <div>
                    <div className="text-sm font-semibold">#{o.id.slice(-6).toUpperCase()}</div>
                    <div className="text-xs text-muted-foreground">{o.items.length} items · {Math.round(o.nutrition.calories)} kcal</div>
                  </div>
                  <Link to="/orders/$id" params={{ id: o.id }} className="rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-white">Track</Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="rounded-3xl bg-card p-6 shadow-soft">
          <h3 className="font-bold">Favorite foods</h3>
          {!favList.length ? (
            <p className="mt-4 text-sm text-muted-foreground">No favorites yet.</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {favList.map((f) => (
                <li key={f.id} className="flex items-center gap-3">
                  <img src={f.image} alt="" className="h-12 w-12 rounded-xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold">{f.name}</div>
                    <div className="text-xs text-muted-foreground">{f.calories} kcal · {f.protein}g protein</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function Stat({ icon: Icon, label, value, unit, target, color, bg, reverse }: { icon: typeof Flame; label: string; value: number; unit: string; target: number; color: string; bg: string; reverse?: boolean }) {
  const pct = Math.min(100, Math.round((value / target) * 100));
  const ok = reverse ? value <= target : value >= target * 0.5;
  return (
    <div className="rounded-3xl bg-card p-5 shadow-soft">
      <div className="flex items-center justify-between">
        <div className={`grid h-10 w-10 place-items-center rounded-xl ${bg} ${color}`}><Icon className="h-5 w-5" /></div>
        <span className="text-xs text-muted-foreground">{reverse ? "Max" : "Goal"} {target}{unit}</span>
      </div>
      <div className="mt-4 flex items-baseline gap-1">
        <span className={`text-3xl font-black ${color}`}>{value}</span>
        <span className="text-sm text-muted-foreground">{unit}</span>
      </div>
      <div className="mt-1 text-xs text-muted-foreground">{label}</div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
        <div className={`h-full rounded-full ${ok ? "gradient-primary" : "bg-amber-400"}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}