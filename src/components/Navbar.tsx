import { Link } from "@tanstack/react-router";
import { Home, Store, Salad, BarChart3, ShoppingBag, Heart } from "lucide-react";
import { useApp } from "@/lib/store";

const links = [
  { to: "/", label: "Home", icon: Home },
  { to: "/restaurants", label: "Restaurants", icon: Store },
  { to: "/meals", label: "Healthy Meals", icon: Salad },
  { to: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { to: "/favorites", label: "Favorites", icon: Heart },
] as const;

export function Navbar() {
  const { cart } = useApp();
  const count = cart.reduce((s, i) => s + i.qty, 0);
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border/60 glass">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl gradient-primary text-white font-black shadow-soft">N</div>
            <span className="text-lg font-black tracking-tight">Nutri<span className="gradient-text">Bite</span></span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                activeProps={{ className: "bg-primary/10 text-primary" }}
                className="rounded-full px-3 py-2 text-sm font-medium text-foreground/80 transition hover:bg-muted"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <Link to="/cart" className="relative inline-flex items-center gap-2 rounded-full gradient-primary px-3 py-2 text-sm font-semibold text-white shadow-soft md:px-4">
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">Cart</span>
            {count > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-white px-1 text-[10px] font-bold text-primary shadow">{count}</span>
            )}
          </Link>
        </div>
      </header>
      <nav className="fixed inset-x-2 bottom-2 z-40 grid grid-cols-5 gap-1 rounded-2xl glass p-1.5 shadow-glow md:hidden">
        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            activeOptions={{ exact: l.to === "/" }}
            activeProps={{ className: "bg-primary text-white" }}
            className="flex flex-col items-center gap-0.5 rounded-xl px-1 py-1.5 text-[10px] font-medium text-foreground/70"
          >
            <l.icon className="h-4 w-4" />
            {l.label.split(" ")[0]}
          </Link>
        ))}
      </nav>
    </>
  );
}