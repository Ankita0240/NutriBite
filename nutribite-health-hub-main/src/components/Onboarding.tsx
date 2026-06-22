import { useEffect, useState } from "react";
import { useApp } from "@/lib/store";
import type { Diet, Goal, Preference, UserPrefs } from "@/lib/types";
import { Sparkles, Check } from "lucide-react";

const goals: { id: Goal; label: string; emoji: string }[] = [
  { id: "weight_loss", label: "Weight Loss", emoji: "🔥" },
  { id: "weight_gain", label: "Weight Gain", emoji: "💪" },
  { id: "muscle_building", label: "Muscle Building", emoji: "🏋️" },
  { id: "healthy_lifestyle", label: "Healthy Lifestyle", emoji: "🌿" },
  { id: "diabetic", label: "Diabetic Management", emoji: "🩺" },
];
const diets: { id: Diet; label: string; emoji: string }[] = [
  { id: "vegetarian", label: "Vegetarian", emoji: "🥗" },
  { id: "vegan", label: "Vegan", emoji: "🌱" },
  { id: "non_veg", label: "Non Vegetarian", emoji: "🍗" },
  { id: "eggitarian", label: "Eggitarian", emoji: "🥚" },
];
const prefs: { id: Preference; label: string }[] = [
  { id: "high_protein", label: "High Protein" },
  { id: "low_carb", label: "Low Carb" },
  { id: "low_fat", label: "Low Fat" },
  { id: "low_sugar", label: "Low Sugar" },
  { id: "high_fiber", label: "High Fiber" },
];

export function Onboarding() {
  const { prefs: saved, setPrefs } = useApp();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState<Goal>("healthy_lifestyle");
  const [diet, setDiet] = useState<Diet>("vegetarian");
  const [pref, setPref] = useState<Preference[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem("nb_prefs")) setOpen(true);
  }, []);
  useEffect(() => { if (saved) setOpen(false); }, [saved]);

  if (!open) return null;

  const next = () => setStep((s) => s + 1);
  const finish = () => {
    const data: UserPrefs = { goal, diet, preferences: pref };
    setPrefs(data);
    setOpen(false);
  };
  const togglePref = (p: Preference) => setPref((arr) => arr.includes(p) ? arr.filter((x) => x !== p) : [...arr, p]);

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg overflow-hidden rounded-3xl bg-card shadow-glow">
        <div className="gradient-primary p-6 text-white">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold"><Sparkles className="h-3 w-3" /> Personalize NutriBite</div>
          <h2 className="mt-3 text-2xl font-black">Let's tune your meals to your goals</h2>
          <p className="text-sm opacity-90">Takes less than 30 seconds.</p>
          <div className="mt-4 flex gap-1.5">
            {[0,1,2].map((i) => <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= step ? "bg-white" : "bg-white/30"}`} />)}
          </div>
        </div>
        <div className="space-y-4 p-6">
          {step === 0 && (
            <>
              <h3 className="font-bold">What's your primary goal?</h3>
              <div className="grid grid-cols-2 gap-2">
                {goals.map((g) => (
                  <button key={g.id} onClick={() => setGoal(g.id)} className={`flex items-center gap-2 rounded-xl border p-3 text-left text-sm font-medium transition ${goal === g.id ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-muted"}`}>
                    <span className="text-xl">{g.emoji}</span>{g.label}
                  </button>
                ))}
              </div>
            </>
          )}
          {step === 1 && (
            <>
              <h3 className="font-bold">Preferred diet?</h3>
              <div className="grid grid-cols-2 gap-2">
                {diets.map((d) => (
                  <button key={d.id} onClick={() => setDiet(d.id)} className={`flex items-center gap-2 rounded-xl border p-3 text-left text-sm font-medium transition ${diet === d.id ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-muted"}`}>
                    <span className="text-xl">{d.emoji}</span>{d.label}
                  </button>
                ))}
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <h3 className="font-bold">Any food preferences?</h3>
              <p className="text-xs text-muted-foreground">Select all that apply.</p>
              <div className="flex flex-wrap gap-2">
                {prefs.map((p) => {
                  const active = pref.includes(p.id);
                  return (
                    <button key={p.id} onClick={() => togglePref(p.id)} className={`inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-sm font-medium transition ${active ? "border-primary bg-primary text-white" : "border-border hover:bg-muted"}`}>
                      {active && <Check className="h-3 w-3" />} {p.label}
                    </button>
                  );
                })}
              </div>
            </>
          )}
          <div className="flex justify-between pt-2">
            <button onClick={() => setOpen(false)} className="text-sm text-muted-foreground">Skip</button>
            {step < 2 ? (
              <button onClick={next} className="rounded-full gradient-primary px-5 py-2 text-sm font-semibold text-white shadow-soft">Continue</button>
            ) : (
              <button onClick={finish} className="rounded-full gradient-primary px-5 py-2 text-sm font-semibold text-white shadow-soft">Finish</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}