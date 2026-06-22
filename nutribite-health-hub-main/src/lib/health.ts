import type { FoodItem, Nutrition, UserPrefs, Goal } from "./types";

export function healthScore(f: Nutrition): number {
  let score = 70;
  // Positive
  if (f.protein >= 25) score += 12;
  else if (f.protein >= 15) score += 6;
  if (f.fiber >= 8) score += 10;
  else if (f.fiber >= 5) score += 5;
  if (f.sugar <= 5) score += 8;
  else if (f.sugar <= 10) score += 3;
  if (f.calories >= 300 && f.calories <= 550) score += 5;
  // Negative
  if (f.calories > 600) score -= 10;
  if (f.fat > 25) score -= 8;
  if (f.sugar > 15) score -= 12;
  return Math.max(20, Math.min(100, score));
}

export function healthLabel(score: number) {
  if (score >= 90) return { label: "Excellent", tone: "emerald" };
  if (score >= 75) return { label: "Good", tone: "green" };
  if (score >= 60) return { label: "Moderate", tone: "amber" };
  return { label: "Less Healthy", tone: "red" };
}

export function goalScore(food: FoodItem, goal: Goal): number {
  switch (goal) {
    case "weight_loss":
      return -food.calories * 0.3 + food.protein * 2 - food.sugar * 1.5 + food.fiber * 1.5;
    case "weight_gain":
      return food.calories * 0.4 + food.protein * 1.5;
    case "muscle_building":
      return food.protein * 4 - food.sugar * 0.5;
    case "diabetic":
      return -food.sugar * 4 + food.fiber * 3 - food.carbs * 0.4;
    case "healthy_lifestyle":
    default:
      return healthScore(food);
  }
}

export function recommendFoods(foods: FoodItem[], prefs: UserPrefs | null, limit = 8): FoodItem[] {
  if (!prefs) return [...foods].sort((a, b) => healthScore(b) - healthScore(a)).slice(0, limit);
  let pool = foods.filter((f) => {
    if (prefs.diet === "vegan") return f.diet.includes("vegan");
    if (prefs.diet === "vegetarian") return f.diet.includes("vegetarian") || f.diet.includes("vegan");
    if (prefs.diet === "eggitarian") return f.diet.includes("vegetarian") || f.diet.includes("vegan") || f.diet.includes("eggitarian");
    return true; // non_veg sees all
  });
  if (pool.length < 4) pool = foods;
  return [...pool].sort((a, b) => goalScore(b, prefs.goal) - goalScore(a, prefs.goal)).slice(0, limit);
}

export function sumNutrition(items: { food: FoodItem; qty: number }[]): Nutrition {
  return items.reduce<Nutrition>(
    (acc, { food, qty }) => ({
      calories: acc.calories + food.calories * qty,
      protein: acc.protein + food.protein * qty,
      carbs: acc.carbs + food.carbs * qty,
      fat: acc.fat + food.fat * qty,
      fiber: acc.fiber + food.fiber * qty,
      sugar: acc.sugar + food.sugar * qty,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sugar: 0 },
  );
}