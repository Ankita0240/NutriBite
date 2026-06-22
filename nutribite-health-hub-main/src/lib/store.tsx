import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { CartItem, Order, UserPrefs } from "./types";
import { foods, getFood } from "./data";
import { sumNutrition } from "./health";

const LS = {
  prefs: "nb_prefs",
  cart: "nb_cart",
  favFoods: "nb_fav_foods",
  favRest: "nb_fav_rest",
  orders: "nb_orders",
};

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const v = localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
}
function write<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

interface AppState {
  prefs: UserPrefs | null;
  setPrefs: (p: UserPrefs | null) => void;
  cart: CartItem[];
  addToCart: (foodId: string, qty?: number) => void;
  removeFromCart: (foodId: string) => void;
  setQty: (foodId: string, qty: number) => void;
  clearCart: () => void;
  cartItems: { food: ReturnType<typeof getFood>; qty: number }[];
  cartTotal: number;
  cartNutrition: ReturnType<typeof sumNutrition>;
  favFoods: string[];
  favRest: string[];
  toggleFavFood: (id: string) => void;
  toggleFavRest: (id: string) => void;
  orders: Order[];
  addOrder: (o: Order) => void;
  updateOrderStatus: (id: string, status: Order["status"]) => void;
}

const Ctx = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [prefs, setPrefsState] = useState<UserPrefs | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favFoods, setFavFoods] = useState<string[]>([]);
  const [favRest, setFavRest] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setPrefsState(read<UserPrefs | null>(LS.prefs, null));
    setCart(read<CartItem[]>(LS.cart, []));
    setFavFoods(read<string[]>(LS.favFoods, []));
    setFavRest(read<string[]>(LS.favRest, []));
    setOrders(read<Order[]>(LS.orders, []));
    setHydrated(true);
  }, []);

  useEffect(() => { if (hydrated) write(LS.prefs, prefs); }, [prefs, hydrated]);
  useEffect(() => { if (hydrated) write(LS.cart, cart); }, [cart, hydrated]);
  useEffect(() => { if (hydrated) write(LS.favFoods, favFoods); }, [favFoods, hydrated]);
  useEffect(() => { if (hydrated) write(LS.favRest, favRest); }, [favRest, hydrated]);
  useEffect(() => { if (hydrated) write(LS.orders, orders); }, [orders, hydrated]);

  const setPrefs = useCallback((p: UserPrefs | null) => setPrefsState(p), []);

  const addToCart = useCallback((foodId: string, qty = 1) => {
    setCart((c) => {
      const found = c.find((i) => i.foodId === foodId);
      if (found) return c.map((i) => i.foodId === foodId ? { ...i, qty: i.qty + qty } : i);
      return [...c, { foodId, qty }];
    });
  }, []);
  const removeFromCart = useCallback((foodId: string) => {
    setCart((c) => c.filter((i) => i.foodId !== foodId));
  }, []);
  const setQty = useCallback((foodId: string, qty: number) => {
    if (qty <= 0) return setCart((c) => c.filter((i) => i.foodId !== foodId));
    setCart((c) => c.map((i) => i.foodId === foodId ? { ...i, qty } : i));
  }, []);
  const clearCart = useCallback(() => setCart([]), []);

  const cartItems = useMemo(
    () => cart.map((c) => ({ food: getFood(c.foodId), qty: c.qty })).filter((c) => c.food),
    [cart],
  );
  const cartTotal = useMemo(
    () => cartItems.reduce((s, i) => s + (i.food?.price ?? 0) * i.qty, 0),
    [cartItems],
  );
  const cartNutrition = useMemo(
    () => sumNutrition(cartItems as { food: NonNullable<typeof cartItems[0]["food"]>; qty: number }[]),
    [cartItems],
  );

  const toggleFavFood = useCallback((id: string) => {
    setFavFoods((f) => f.includes(id) ? f.filter((x) => x !== id) : [...f, id]);
  }, []);
  const toggleFavRest = useCallback((id: string) => {
    setFavRest((f) => f.includes(id) ? f.filter((x) => x !== id) : [...f, id]);
  }, []);

  const addOrder = useCallback((o: Order) => setOrders((os) => [o, ...os]), []);
  const updateOrderStatus = useCallback((id: string, status: Order["status"]) => {
    setOrders((os) => os.map((o) => o.id === id ? { ...o, status } : o));
  }, []);

  // Silence unused-import warning
  void foods;

  const value: AppState = {
    prefs, setPrefs,
    cart, addToCart, removeFromCart, setQty, clearCart,
    cartItems, cartTotal, cartNutrition,
    favFoods, favRest, toggleFavFood, toggleFavRest,
    orders, addOrder, updateOrderStatus,
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useApp() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useApp must be used within AppProvider");
  return v;
}