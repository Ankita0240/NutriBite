export type Goal = "weight_loss" | "weight_gain" | "muscle_building" | "healthy_lifestyle" | "diabetic";
export type Diet = "vegetarian" | "vegan" | "non_veg" | "eggitarian";
export type Preference = "high_protein" | "low_carb" | "low_fat" | "low_sugar" | "high_fiber";

export interface UserPrefs {
  goal: Goal;
  diet: Diet;
  preferences: Preference[];
}

export interface Nutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
}

export interface FoodItem extends Nutrition {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  diet: Diet[];
  tags: Preference[];
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: number;
  deliveryFee: number;
  image: string;
  banner: string;
  tags: Preference[];
  diet: Diet[];
}

export interface CartItem {
  foodId: string;
  qty: number;
}

export interface Order {
  id: string;
  items: { food: FoodItem; qty: number }[];
  total: number;
  nutrition: Nutrition;
  name: string;
  phone: string;
  address: string;
  createdAt: number;
  status: "received" | "preparing" | "ready" | "out_for_delivery" | "delivered";
}