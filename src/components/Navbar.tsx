import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { BarChart3 } from "lucide-react";
import { useState, useEffect } from "react";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Predictor", path: "/dashboard" },
  { label: "History", path: "/history" },
  { label: "About", path: "/about" },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        scrolled
          ? "border-border bg-card/95 backdrop-blur shadow-sm supports-[backdrop-filter]:bg-card/80"
          : "border-transparent bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/60"
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <Link
          to="/"
          className="flex items-center gap-2.5 font-bold text-lg group"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary transition-transform duration-300 group-hover:scale-110">
            <BarChart3 className="h-4.5 w-4.5 text-primary-foreground" size={18} />
          </div>
          <span className="text-foreground">ChurnSense</span>
          <span className="text-xs font-medium bg-accent text-accent-foreground px-1.5 py-0.5 rounded-md ml-1">AI</span>
        </Link>

        <nav className="flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105",
                pathname === link.path
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
