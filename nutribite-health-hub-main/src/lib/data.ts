import type { Restaurant, FoodItem } from "./types";

const img = (q: string, seed: number) =>
  `https://images.unsplash.com/photo-${q}?auto=format&fit=crop&w=800&q=70&sig=${seed}`;

// Curated Unsplash photo IDs (food/restaurants)
const FOOD_IMGS = [
  "1546069901-ba9599a7e63c", // bowl
  "1565958011703-44f9829ba187", // salad
  "1567620905732-2d1ec7ab7445", // pancakes
  "1490645935967-10de6ba17061", // smoothie bowl
  "1551782450-a2132b4ba21d", // burger
  "1540189549336-e6e99c3679fe", // salad2
  "1505253758473-96b7015fcd40", // soup
  "1606755962773-d324e0a13086", // bowl2
  "1512621776951-a57141f2eefd", // veggies
  "1604908176997-125f25cc6f3d", // wrap
  "1604152135912-04a022e23696", // grain bowl
  "1493770348161-369560ae357d", // breakfast
  "1473093295043-cdd812d0e601", // pizza
  "1432139509613-5c4255815697", // pasta
  "1559054663-e8d23213f55c", // sandwich
  "1517433367423-c7e5b0f35086", // dessert
  "1502741338009-cac2772e18bc", // tea
  "1565299624946-b28f40a0ae38", // pizza2
  "1546833999-b9f581a1996d", // bowl3
  "1559847844-5315695dadae", // bento
];

const REST_IMGS = [
  "1517248135467-4c7edcad34c4",
  "1555396273-367ea4eb4db5",
  "1559339352-11d035aa65de",
  "1466978913421-dad2ebd01d17",
  "1552566626-52f8b828add9",
];

export const restaurants: Restaurant[] = [
  { id: "r1", name: "Green Bowl Kitchen", cuisine: "Healthy Bowls", rating: 4.8, deliveryTime: 25, deliveryFee: 19, tags: ["high_protein", "high_fiber"], diet: ["vegetarian", "vegan"] },
  { id: "r2", name: "Protein Punch", cuisine: "Fitness Meals", rating: 4.7, deliveryTime: 30, deliveryFee: 29, tags: ["high_protein", "low_carb"], diet: ["non_veg", "eggitarian"] },
  { id: "r3", name: "Spice Garden", cuisine: "North Indian", rating: 4.5, deliveryTime: 35, deliveryFee: 39, tags: ["high_protein"], diet: ["vegetarian", "non_veg"] },
  { id: "r4", name: "Vegan Vibe", cuisine: "Vegan", rating: 4.6, deliveryTime: 28, deliveryFee: 25, tags: ["high_fiber", "low_fat"], diet: ["vegan"] },
  { id: "r5", name: "Diabetic Diner", cuisine: "Diabetic Friendly", rating: 4.4, deliveryTime: 32, deliveryFee: 29, tags: ["low_sugar", "high_fiber"], diet: ["vegetarian", "eggitarian"] },
  { id: "r6", name: "Lean & Green", cuisine: "Salads & Wraps", rating: 4.7, deliveryTime: 22, deliveryFee: 19, tags: ["low_carb", "high_fiber"], diet: ["vegetarian", "vegan"] },
  { id: "r7", name: "Tandoor Tales", cuisine: "Indian Grills", rating: 4.6, deliveryTime: 38, deliveryFee: 39, tags: ["high_protein", "low_fat"], diet: ["non_veg"] },
  { id: "r8", name: "Wholesome Wok", cuisine: "Asian", rating: 4.5, deliveryTime: 30, deliveryFee: 35, tags: ["high_protein"], diet: ["non_veg", "vegetarian"] },
  { id: "r9", name: "Oats & Co.", cuisine: "Breakfast", rating: 4.6, deliveryTime: 20, deliveryFee: 15, tags: ["high_fiber", "low_sugar"], diet: ["vegetarian", "vegan"] },
  { id: "r10", name: "Macro Meals", cuisine: "Meal Prep", rating: 4.8, deliveryTime: 35, deliveryFee: 35, tags: ["high_protein", "low_fat"], diet: ["non_veg", "eggitarian"] },
  { id: "r11", name: "Smoothie Society", cuisine: "Smoothies & Bowls", rating: 4.7, deliveryTime: 18, deliveryFee: 19, tags: ["high_fiber", "low_fat"], diet: ["vegetarian", "vegan"] },
  { id: "r12", name: "Sushi Source", cuisine: "Japanese", rating: 4.6, deliveryTime: 40, deliveryFee: 49, tags: ["high_protein", "low_fat"], diet: ["non_veg"] },
  { id: "r13", name: "The Quinoa Co.", cuisine: "Grain Bowls", rating: 4.5, deliveryTime: 28, deliveryFee: 25, tags: ["high_fiber", "high_protein"], diet: ["vegetarian", "vegan"] },
  { id: "r14", name: "Egg & Co.", cuisine: "Eggitarian", rating: 4.4, deliveryTime: 22, deliveryFee: 19, tags: ["high_protein", "low_carb"], diet: ["eggitarian"] },
  { id: "r15", name: "Coastal Catch", cuisine: "Seafood", rating: 4.6, deliveryTime: 36, deliveryFee: 45, tags: ["high_protein", "low_fat"], diet: ["non_veg"] },
  { id: "r16", name: "Millet Magic", cuisine: "Millet & Ancient Grains", rating: 4.5, deliveryTime: 30, deliveryFee: 25, tags: ["high_fiber", "low_sugar"], diet: ["vegetarian", "vegan"] },
  { id: "r17", name: "Keto Kitchen", cuisine: "Keto", rating: 4.6, deliveryTime: 32, deliveryFee: 39, tags: ["low_carb", "high_protein"], diet: ["non_veg", "eggitarian"] },
  { id: "r18", name: "Mediterranean Muse", cuisine: "Mediterranean", rating: 4.7, deliveryTime: 30, deliveryFee: 35, tags: ["high_fiber", "low_fat"], diet: ["vegetarian", "non_veg"] },
  { id: "r19", name: "South Spice", cuisine: "South Indian", rating: 4.5, deliveryTime: 26, deliveryFee: 19, tags: ["low_fat", "high_fiber"], diet: ["vegetarian"] },
  { id: "r20", name: "Sweet Balance", cuisine: "Healthy Desserts", rating: 4.4, deliveryTime: 24, deliveryFee: 25, tags: ["low_sugar", "high_fiber"], diet: ["vegetarian"] },
].map((r, i) => ({
  ...r,
  image: img(REST_IMGS[i % REST_IMGS.length], i),
  banner: img(REST_IMGS[(i + 2) % REST_IMGS.length], i + 100),
})) as Restaurant[];

const categories = ["Breakfast", "Lunch", "Dinner", "Snacks", "Protein Meals", "Healthy Meals"] as const;

const baseFoods: Omit<FoodItem, "id" | "restaurantId" | "image">[] = [
  { name: "Grilled Chicken Quinoa Bowl", description: "Lean grilled chicken, quinoa, roasted veggies, tahini.", price: 329, calories: 520, protein: 42, carbs: 48, fat: 14, fiber: 9, sugar: 4, category: "Protein Meals", diet: ["non_veg"], tags: ["high_protein", "high_fiber"] },
  { name: "Avocado Power Salad", description: "Mixed greens, avocado, chickpeas, seeds, lemon vinaigrette.", price: 279, calories: 380, protein: 14, carbs: 28, fat: 22, fiber: 12, sugar: 5, category: "Healthy Meals", diet: ["vegetarian", "vegan"], tags: ["high_fiber", "low_carb"] },
  { name: "Paneer Tikka Bowl", description: "Smoky tandoori paneer with brown rice and salad.", price: 309, calories: 560, protein: 32, carbs: 52, fat: 22, fiber: 7, sugar: 6, category: "Lunch", diet: ["vegetarian"], tags: ["high_protein"] },
  { name: "Egg White Omelette", description: "Fluffy egg whites, spinach, peppers, multigrain toast.", price: 199, calories: 290, protein: 28, carbs: 18, fat: 9, fiber: 4, sugar: 3, category: "Breakfast", diet: ["eggitarian"], tags: ["high_protein", "low_fat"] },
  { name: "Vegan Buddha Bowl", description: "Brown rice, tofu, kale, sweet potato, miso dressing.", price: 299, calories: 460, protein: 22, carbs: 56, fat: 14, fiber: 11, sugar: 6, category: "Healthy Meals", diet: ["vegan", "vegetarian"], tags: ["high_fiber", "high_protein"] },
  { name: "Oats Berry Parfait", description: "Steel-cut oats, mixed berries, almond butter.", price: 189, calories: 320, protein: 12, carbs: 44, fat: 10, fiber: 8, sugar: 12, category: "Breakfast", diet: ["vegetarian", "vegan"], tags: ["high_fiber"] },
  { name: "Grilled Fish & Greens", description: "Pan-seared basa, sautéed greens, lemon butter.", price: 379, calories: 410, protein: 38, carbs: 12, fat: 22, fiber: 4, sugar: 2, category: "Dinner", diet: ["non_veg"], tags: ["high_protein", "low_carb"] },
  { name: "Masala Quinoa Khichdi", description: "Quinoa, moong dal, light spices, ghee.", price: 249, calories: 420, protein: 18, carbs: 58, fat: 9, fiber: 8, sugar: 3, category: "Lunch", diet: ["vegetarian"], tags: ["high_fiber", "low_fat"] },
  { name: "Greek Yogurt Bowl", description: "Greek yogurt, honey, walnuts, chia seeds.", price: 219, calories: 310, protein: 20, carbs: 32, fat: 11, fiber: 5, sugar: 18, category: "Snacks", diet: ["vegetarian"], tags: ["high_protein"] },
  { name: "Chicken Caesar Wrap", description: "Whole-wheat wrap, grilled chicken, romaine, light caesar.", price: 289, calories: 480, protein: 34, carbs: 42, fat: 18, fiber: 6, sugar: 4, category: "Lunch", diet: ["non_veg"], tags: ["high_protein"] },
  { name: "Diabetic Millet Khichdi", description: "Foxtail millet, mixed lentils, gentle spices.", price: 239, calories: 360, protein: 16, carbs: 50, fat: 8, fiber: 10, sugar: 2, category: "Lunch", diet: ["vegetarian", "vegan"], tags: ["low_sugar", "high_fiber"] },
  { name: "Sprout Salad", description: "Mixed sprouts, onion, tomato, lemon, chaat masala.", price: 169, calories: 220, protein: 14, carbs: 28, fat: 4, fiber: 9, sugar: 6, category: "Snacks", diet: ["vegetarian", "vegan"], tags: ["high_fiber", "low_fat"] },
  { name: "Keto Chicken Plate", description: "Buttered chicken, broccoli, almond flour roti.", price: 399, calories: 540, protein: 40, carbs: 10, fat: 36, fiber: 6, sugar: 2, category: "Dinner", diet: ["non_veg"], tags: ["low_carb", "high_protein"] },
  { name: "Mediterranean Hummus Plate", description: "Hummus, falafel, olives, pita, salad.", price: 309, calories: 520, protein: 18, carbs: 56, fat: 22, fiber: 11, sugar: 5, category: "Lunch", diet: ["vegetarian", "vegan"], tags: ["high_fiber"] },
  { name: "Idli Sambar", description: "Steamed rice cakes, lentil sambar, coconut chutney.", price: 159, calories: 310, protein: 11, carbs: 56, fat: 5, fiber: 6, sugar: 4, category: "Breakfast", diet: ["vegetarian"], tags: ["low_fat"] },
  { name: "Tofu Stir Fry", description: "Crispy tofu, bell peppers, soy-ginger sauce, brown rice.", price: 279, calories: 430, protein: 24, carbs: 48, fat: 14, fiber: 7, sugar: 6, category: "Dinner", diet: ["vegan", "vegetarian"], tags: ["high_protein"] },
  { name: "Salmon Sushi Set", description: "Salmon nigiri, avocado roll, edamame.", price: 549, calories: 480, protein: 32, carbs: 50, fat: 14, fiber: 4, sugar: 3, category: "Dinner", diet: ["non_veg"], tags: ["high_protein", "low_fat"] },
  { name: "Smoothie Bowl", description: "Acai, banana, granola, coconut, berries.", price: 269, calories: 360, protein: 9, carbs: 62, fat: 9, fiber: 9, sugar: 24, category: "Breakfast", diet: ["vegetarian", "vegan"], tags: ["high_fiber"] },
  { name: "Protein Pancakes", description: "Oat-whey pancakes, almond butter, banana.", price: 249, calories: 420, protein: 28, carbs: 44, fat: 12, fiber: 6, sugar: 14, category: "Breakfast", diet: ["vegetarian", "eggitarian"], tags: ["high_protein"] },
  { name: "Veggie Poha", description: "Light flattened rice with peas, peanuts, lemon.", price: 139, calories: 290, protein: 7, carbs: 50, fat: 7, fiber: 4, sugar: 3, category: "Breakfast", diet: ["vegetarian", "vegan"], tags: ["low_fat"] },
];

// Expand to 100+ foods by distributing across restaurants
export const foods: FoodItem[] = [];
restaurants.forEach((r, ri) => {
  // each restaurant gets 5-6 items
  const count = 5 + (ri % 2);
  for (let i = 0; i < count; i++) {
    const idx = (ri * 3 + i) % baseFoods.length;
    const b = baseFoods[idx];
    // filter to restaurant's diet compatibility — keep at least one
    if (!b.diet.some((d) => r.diet.includes(d))) continue;
    foods.push({
      ...b,
      id: `f-${r.id}-${i}`,
      restaurantId: r.id,
      image: img(FOOD_IMGS[(ri * 3 + i) % FOOD_IMGS.length], ri * 10 + i),
      // slight price variation
      price: Math.round(b.price * (0.9 + ((ri + i) % 5) * 0.05)),
    });
  }
});

// Ensure at least 100 items
while (foods.length < 100) {
  const r = restaurants[foods.length % restaurants.length];
  const b = baseFoods[foods.length % baseFoods.length];
  if (!b.diet.some((d) => r.diet.includes(d))) {
    foods.push({
      ...b,
      id: `f-extra-${foods.length}`,
      restaurantId: r.id,
      image: img(FOOD_IMGS[foods.length % FOOD_IMGS.length], foods.length + 500),
    });
  } else {
    foods.push({
      ...b,
      id: `f-extra-${foods.length}`,
      restaurantId: r.id,
      image: img(FOOD_IMGS[foods.length % FOOD_IMGS.length], foods.length + 500),
    });
  }
}

export { categories };

export const getRestaurant = (id: string) => restaurants.find((r) => r.id === id);
export const getFood = (id: string) => foods.find((f) => f.id === id);
export const getFoodsForRestaurant = (id: string) => foods.filter((f) => f.restaurantId === id);