import { Link } from "react-router-dom";
import {
  ArrowRight, Brain, Database, TrendingDown, Zap, Users, ChevronRight,
  CheckCircle2, BarChart3, Globe, Shield, Cpu, Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import Footer from "@/components/Footer";

// Reusable animated reveal wrapper
function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "scale";
}) {
  const { ref, isVisible } = useScrollReveal();
  const transforms: Record<string, string> = {
    up: "translateY(40px)",
    left: "translateX(-40px)",
    right: "translateX(40px)",
    scale: "scale(0.92)",
  };
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "none" : transforms[direction],
        transition: `opacity 0.7s cubic-bezier(0.4,0,0.2,1) ${delay}ms, transform 0.7s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

const steps = [
  {
    icon: Users,
    step: "01",
    title: "Input Customer Data",
    desc: "Enter key demographics, account details, services, and usage patterns through our guided form.",
  },
  {
    icon: Brain,
    step: "02",
    title: "LGBM Model Analyzes",
    desc: "Our LightGBM model processes 18+ behavioral features with 94.2% accuracy in milliseconds.",
  },
  {
    icon: Zap,
    step: "03",
    title: "Get Retention Strategy",
    desc: "Receive a churn probability score and tailored, actionable recommendations to retain the customer.",
  },
];

const stats = [
  { value: "94.2%", label: "Model Accuracy" },
  { value: "18+", label: "Predictive Features" },
  { value: "<100ms", label: "Prediction Speed" },
  { value: "LGBM", label: "Algorithm" },
];

const features = [
  {
    icon: Cpu,
    title: "Live ML Inference",
    desc: "Real-time predictions from a trained LightGBM model deployed on Render, reachable via a secure edge proxy.",
  },
  {
    icon: Activity,
    title: "Churn Probability Gauge",
    desc: "Animated semicircle gauge shows the exact churn score with color-coded risk levels for instant interpretation.",
  },
  {
    icon: Shield,
    title: "Tailored Recommendations",
    desc: "The model generates retention strategies based on the specific customer profile — not generic advice.",
  },
  {
    icon: Database,
    title: "Prediction History",
    desc: "Every prediction can be saved and browsed in the History tab, with search, sort, and summary stats.",
  },
  {
    icon: Globe,
    title: "Feature Engineering",
    desc: "The backend computes engineered features like Num_Addon_Services and Has_Internet_No_Security automatically.",
  },
  {
    icon: BarChart3,
    title: "Session Tracking",
    desc: "Predictions are linked to your browser session so you can reload past customer profiles into the form.",
  },
];

const useCases = [
  { icon: CheckCircle2, text: "Identify at-risk customers before they cancel" },
  { icon: CheckCircle2, text: "Prioritize retention offers for highest-risk segments" },
  { icon: CheckCircle2, text: "Validate which service combinations drive churn" },
  { icon: CheckCircle2, text: "Compare customer profiles to understand churn drivers" },
  { icon: CheckCircle2, text: "Build a data-driven retention playbook" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated background blobs */}
        <div
          className="absolute inset-0 -z-10 overflow-hidden"
          aria-hidden
        >
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full opacity-20"
            style={{
              background: "radial-gradient(ellipse, hsl(243 75% 59%), transparent 70%)",
              animation: "pulseBlob 8s ease-in-out infinite",
            }}
          />
          <div
            className="absolute top-32 left-10 h-72 w-72 rounded-full opacity-10"
            style={{
              background: "radial-gradient(ellipse, hsl(262 83% 65%), transparent 70%)",
              animation: "pulseBlob 11s ease-in-out infinite 2s",
            }}
          />
          <div
            className="absolute top-20 right-10 h-48 w-48 rounded-full opacity-10"
            style={{
              background: "radial-gradient(ellipse, hsl(158 64% 40%), transparent 70%)",
              animation: "pulseBlob 9s ease-in-out infinite 1s",
            }}
          />
        </div>

        <div className="container mx-auto px-6 py-28 text-center">
          <div
            className="mx-auto max-w-3xl"
            style={{ animation: "fadeSlideUp 0.9s cubic-bezier(0.4,0,0.2,1) both" }}
          >
            <div
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground"
              style={{ animation: "fadeSlideUp 0.9s cubic-bezier(0.4,0,0.2,1) 0.1s both" }}
            >
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              Powered by LightGBM Machine Learning
            </div>

            <h1
              className="mb-6 text-5xl font-extrabold leading-tight tracking-tight text-foreground md:text-6xl"
              style={{ animation: "fadeSlideUp 0.9s cubic-bezier(0.4,0,0.2,1) 0.2s both" }}
            >
              Stop Customer Churn{" "}
              <span
                style={{
                  background: "var(--gradient-primary)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Before It Happens
              </span>
            </h1>

            <p
              className="mb-10 text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto"
              style={{ animation: "fadeSlideUp 0.9s cubic-bezier(0.4,0,0.2,1) 0.3s both" }}
            >
              Predict which telecom customers are at risk of leaving with clinical precision.
              Input customer data, get an instant churn probability score, and receive targeted
              retention strategies — all powered by a live LGBM model.
            </p>

            <div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              style={{ animation: "fadeSlideUp 0.9s cubic-bezier(0.4,0,0.2,1) 0.4s both" }}
            >
              <Link to="/dashboard">
                <Button
                  size="lg"
                  className="h-12 px-8 text-base font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
                  style={{ boxShadow: "var(--shadow-elevated)" }}
                >
                  Launch Predictor
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="h-12 px-8 text-base hover:scale-105 transition-transform duration-200">
                  How It Works
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Mock dashboard preview */}
          <Reveal
            className="mt-20 mx-auto max-w-4xl"
            direction="scale"
            delay={200}
          >
            <div
              className="rounded-2xl border border-border bg-card shadow-2xl overflow-hidden hover:shadow-[0_25px_60px_-15px_hsl(243_75%_59%/0.25)] transition-shadow duration-500"
            >
              {/* Browser chrome */}
              <div className="flex items-center gap-2 border-b border-border px-4 py-3 bg-secondary/50">
                <span className="h-3 w-3 rounded-full bg-red-400 transition-transform hover:scale-125" />
                <span className="h-3 w-3 rounded-full bg-yellow-400 transition-transform hover:scale-125" />
                <span className="h-3 w-3 rounded-full bg-green-400 transition-transform hover:scale-125" />
                <span className="ml-3 text-xs text-muted-foreground font-mono">churnsense.ai/dashboard</span>
              </div>
              <div className="grid grid-cols-5 divide-x divide-border min-h-[220px]">
                {/* Left: Form preview */}
                <div className="col-span-3 p-6 space-y-3">
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Customer Profile</div>
                  {[
                    { label: "Contract Type", value: "Month-to-month", risk: true },
                    { label: "Tenure", value: "8 months", risk: true },
                    { label: "Internet Service", value: "Fiber optic", risk: false },
                    { label: "Tech Support", value: "No", risk: true },
                    { label: "Monthly Charges", value: "$89.50", risk: false },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between text-sm py-1.5 border-b border-border/50 group">
                      <span className="text-muted-foreground">{row.label}</span>
                      <span className={`font-medium transition-colors duration-200 ${row.risk ? "text-churn-high" : "text-foreground"}`}>
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
                {/* Right: Prediction preview */}
                <div className="col-span-2 p-6 flex flex-col items-center justify-center bg-secondary/20 gap-3">
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Churn Score</div>
                  <div
                    className="text-5xl font-extrabold tabular-nums"
                    style={{ color: "hsl(0, 84%, 60%)", animation: "countUp 1.5s ease both 0.8s" }}
                  >
                    78%
                  </div>
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full border text-sm px-3 py-1 font-medium animate-pulse"
                    style={{
                      background: "hsl(0, 84%, 95%)",
                      color: "hsl(0, 84%, 60%)",
                      borderColor: "hsl(0 84% 60% / 0.3)",
                    }}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                    High Risk
                  </span>
                  <p className="text-xs text-muted-foreground text-center">Offer contract upgrade immediately</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-border bg-card">
        <div className="container mx-auto px-6 py-10">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 80}>
                <div className="text-center group cursor-default">
                  <div className="text-3xl font-extrabold text-primary transition-transform duration-300 group-hover:scale-110 inline-block">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground font-medium">{stat.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-6 py-24">
        <Reveal className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">How It Works</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Three simple steps from raw customer data to a clear, actionable retention strategy.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-16 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          {steps.map((step, i) => (
            <Reveal key={i} delay={i * 120} direction="up">
              <div className="group relative flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300">
                <div className="relative mb-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent border border-primary/20 shadow-sm transition-shadow duration-300 group-hover:shadow-lg">
                    <step.icon className="h-7 w-7 text-primary transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-card border-y border-border">
        <div className="container mx-auto px-6 py-24">
          <Reveal className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Everything You Need</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              A complete churn intelligence suite — from model inference to history tracking.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 80} direction={i % 2 === 0 ? "left" : "right"}>
                <div className="group p-6 rounded-2xl border border-border bg-background hover:bg-accent/40 hover:border-primary/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent mb-4 transition-transform duration-300 group-hover:scale-110">
                    <f.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="container mx-auto px-6 py-24">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-14 items-center">
          <Reveal className="flex-1" direction="left">
            <h2 className="text-3xl font-bold text-foreground mb-4">Use Cases</h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Whether you're a data scientist validating a model or a business analyst building retention
              strategies, ChurnSense gives you fast, reliable answers.
            </p>
            <ul className="space-y-3">
              {useCases.map((uc, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm text-muted-foreground group"
                  style={{
                    animation: `fadeSlideUp 0.5s ease ${i * 80}ms both`,
                  }}
                >
                  <uc.icon className="h-4 w-4 text-churn-low shrink-0 mt-0.5 transition-transform duration-200 group-hover:scale-125" />
                  <span className="group-hover:text-foreground transition-colors duration-200">{uc.text}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="flex-1" direction="right">
            <div className="rounded-2xl border border-border bg-card p-8 space-y-5 hover:shadow-xl transition-shadow duration-500">
              <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Sample Churn Drivers</div>
              {[
                { label: "Month-to-month contract", impact: 92, color: "hsl(var(--churn-high))" },
                { label: "Fiber optic + no security", impact: 78, color: "hsl(var(--churn-high))" },
                { label: "Tenure < 12 months", impact: 71, color: "hsl(var(--churn-medium))" },
                { label: "High monthly charges", impact: 65, color: "hsl(var(--churn-medium))" },
                { label: "Electronic check payment", impact: 54, color: "hsl(var(--churn-medium))" },
                { label: "No tech support", impact: 48, color: "hsl(38, 92%, 50%)" },
              ].map((item, i) => (
                <div key={item.label} className="space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground font-medium">{item.label}</span>
                    <span className="font-bold tabular-nums" style={{ color: item.color }}>{item.impact}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: `${item.impact}%`,
                        background: item.color,
                        transitionDelay: `${i * 100}ms`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-card">
        <div className="container mx-auto px-6 py-20 text-center">
          <Reveal className="mx-auto max-w-2xl">
            <div className="flex justify-center mb-6">
              <div
                className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-lg hover:scale-110 transition-transform duration-300"
                style={{ boxShadow: "var(--shadow-elevated)" }}
              >
                <TrendingDown className="h-8 w-8 text-primary-foreground" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Predict Churn?</h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Start analyzing your first customer right now — no signup required.
            </p>
            <Link to="/dashboard">
              <Button
                size="lg"
                className="h-12 px-10 text-base font-semibold hover:scale-105 transition-transform duration-200"
                style={{ boxShadow: "var(--shadow-elevated)" }}
              >
                Launch Predictor
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
