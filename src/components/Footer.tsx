import { Instagram, Twitter, Facebook, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-gradient-to-br from-background via-secondary/40 to-background">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl gradient-primary text-white font-black shadow-soft">N</div>
            <span className="text-lg font-black">Nutri<span className="gradient-text">Bite</span></span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">Order food that matches your health goals. Nutrition-first delivery for a better you.</p>
        </div>
        <div>
          <h5 className="text-sm font-bold">About</h5>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>Our Story</li><li>How It Works</li><li>Nutrition Science</li><li>Partner Restaurants</li>
          </ul>
        </div>
        <div>
          <h5 className="text-sm font-bold">Features</h5>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>Health Score</li><li>Goal Recommendations</li><li>Nutrition Dashboard</li><li>Diet Filters</li>
          </ul>
        </div>
        <div>
          <h5 className="text-sm font-bold">Contact</h5>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>hello@nutribite.app</li><li>+91 98765 43210</li>
          </ul>
          <div className="mt-4 flex gap-3">
            {[Instagram, Twitter, Facebook, Linkedin].map((I, i) => (
              <a key={i} href="#" className="grid h-9 w-9 place-items-center rounded-full bg-card shadow-soft transition hover:bg-primary hover:text-white"><I className="h-4 w-4" /></a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} NutriBite. All rights reserved.</div>
    </footer>
  );
}