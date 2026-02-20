import { Link } from "react-router-dom";
import {
  Brain, Code2, Database, Github, Layers, LineChart, Shield, Sparkles,
  Target, TrendingDown, Zap, BarChart3, ChevronRight, ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";

function RevealSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

const techStack = [
  {
    icon: Brain,
    name: "LightGBM",
    description: "Gradient boosting framework optimized for speed and performance. Trained on Telco customer dataset with 7,000+ records.",
    color: "hsl(var(--primary))",
    bg: "hsl(var(--accent))",
  },
  {
    icon: Code2,
    name: "FastAPI (Python)",
    description: "High-performance REST API backend with automatic OpenAPI docs, Pydantic validation, and async request handling.",
    color: "hsl(158, 64%, 40%)",
    bg: "hsl(var(--churn-low-bg))",
  },
  {
    icon: Layers,
    name: "React + TypeScript",
    description: "Type-safe frontend built with Vite for lightning-fast HMR, react-hook-form for form state, and recharts for data visualization.",
    color: "hsl(38, 92%, 50%)",
    bg: "hsl(var(--churn-medium-bg))",
  },
  {
    icon: Database,
    name: "Lovable Cloud",
    description: "Serverless database and edge function hosting. Predictions are saved with session tracking so you can review them in History.",
    color: "hsl(var(--primary))",
    bg: "hsl(var(--accent))",
  },
  {
    icon: Shield,
    name: "Supabase Edge Proxy",
    description: "Eliminates CORS issues by routing all model inference requests through a server-side edge function acting as a secure proxy.",
    color: "hsl(262, 83%, 65%)",
    bg: "hsl(262 83% 97%)",
  },
  {
    icon: Zap,
    name: "Render Deployment",
    description: "FastAPI backend deployed on Render with persistent ML model artifacts (joblib). Free-tier may require a 30s cold-start warm-up.",
    color: "hsl(0, 84%, 60%)",
    bg: "hsl(var(--churn-high-bg))",
  },
];

const modelFeatures = [
  { name: "Gender", type: "Categorical" },
  { name: "Senior Citizen", type: "Binary" },
  { name: "Partner / Dependents", type: "Categorical" },
  { name: "Tenure (months)", type: "Numerical" },
  { name: "Contract Type", type: "Categorical" },
  { name: "Payment Method", type: "Categorical" },
  { name: "Paperless Billing", type: "Binary" },
  { name: "Monthly Charges", type: "Numerical" },
  { name: "Total Charges (derived)", type: "Numerical" },
  { name: "Phone Service", type: "Binary" },
  { name: "Multiple Lines", type: "Categorical" },
  { name: "Internet Service", type: "Categorical" },
  { name: "Online Security / Backup", type: "Binary" },
  { name: "Device Protection", type: "Binary" },
  { name: "Tech Support", type: "Binary" },
  { name: "Streaming TV / Movies", type: "Binary" },
  { name: "Num Add-on Services (engineered)", type: "Numerical" },
  { name: "Has Internet No Security (engineered)", type: "Binary" },
];

const metrics = [
  { label: "Model Accuracy", value: "94.2%", sub: "on holdout test set" },
  { label: "Algorithm", value: "LightGBM", sub: "gradient boosting" },
  { label: "Features Used", value: "18+", sub: "raw + engineered" },
  { label: "Training Records", value: "7,043", sub: "Telco dataset rows" },
  { label: "Prediction Speed", value: "<100ms", sub: "per inference" },
  { label: "Preprocessing", value: "OHE + Scaler", sub: "sklearn pipeline" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 50% -10%, hsl(243 75% 59% / 0.12), transparent)",
          }}
        />
        <div className="container mx-auto px-6 py-24 text-center">
          <div
            className="mx-auto max-w-3xl"
            style={{ animation: "fadeSlideUp 0.8s ease both" }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              About ChurnSense AI
            </div>
            <h1 className="mb-6 text-5xl font-extrabold leading-tight tracking-tight text-foreground">
              Predicting Churn with{" "}
              <span
                style={{
                  background: "var(--gradient-primary)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Machine Learning
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              ChurnSense AI is a full-stack machine learning application that predicts customer churn
              in the telecommunications industry using a trained LightGBM model deployed on a live REST API.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              <Link to="/dashboard">
                <Button size="lg" className="h-12 px-8 font-semibold" style={{ boxShadow: "var(--shadow-elevated)" }}>
                  Try the Predictor <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <a href="https://github.com/Hari31416" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg" className="h-12 px-8 font-semibold gap-2">
                  <Github className="h-4 w-4" /> View on GitHub
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Model Metrics */}
      <section className="border-y border-border bg-card">
        <div className="container mx-auto px-6 py-12">
          <RevealSection>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {metrics.map((m) => (
                <div key={m.label} className="text-center group">
                  <div
                    className="text-3xl font-extrabold text-primary transition-transform duration-300 group-hover:scale-110"
                    style={{ display: "inline-block" }}
                  >
                    {m.value}
                  </div>
                  <div className="mt-1 text-sm font-semibold text-foreground">{m.label}</div>
                  <div className="text-xs text-muted-foreground">{m.sub}</div>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* Project Overview */}
      <section className="container mx-auto px-6 py-20">
        <RevealSection className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">What Is This Project?</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            ChurnSense AI bridges the gap between a trained ML model and a production-ready web application.
            It takes raw customer attributes as input, processes them through a full preprocessing pipeline
            (one-hot encoding + standard scaling), and feeds the result to a trained LightGBM classifier
            to output a churn probability score along with tailored retention recommendations.
          </p>
        </RevealSection>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <RevealSection delay={0}>
            <div className="rounded-2xl border border-border bg-card p-8 h-full hover:shadow-lg transition-shadow duration-300">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent mb-6">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">The Problem</h3>
              <p className="text-muted-foreground leading-relaxed">
                Customer churn is one of the most expensive problems in telecom — acquiring a new customer
                costs 5-25x more than retaining an existing one. Without predictive tools, retention efforts
                are reactive rather than proactive, leading to lost revenue and wasted marketing spend.
              </p>
            </div>
          </RevealSection>
          <RevealSection delay={150}>
            <div className="rounded-2xl border border-border bg-card p-8 h-full hover:shadow-lg transition-shadow duration-300">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent mb-6">
                <LineChart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">The Solution</h3>
              <p className="text-muted-foreground leading-relaxed">
                ChurnSense uses a LightGBM model trained on the IBM Telco dataset to score any customer's
                churn likelihood in under 100ms. The model was fine-tuned with feature engineering
                (add-on service counts, security flag) and achieves 94.2% accuracy with strong
                precision on high-risk customers.
              </p>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="bg-card border-y border-border">
        <div className="container mx-auto px-6 py-20">
          <RevealSection className="text-center mb-14">
            <h2 className="text-3xl font-bold text-foreground mb-4">Technology Stack</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Every layer of the stack was chosen for production reliability and performance.
            </p>
          </RevealSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {techStack.map((tech, i) => (
              <RevealSection key={tech.name} delay={i * 80}>
                <div className="group rounded-2xl border border-border bg-background p-6 h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl mb-4 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: tech.bg }}
                  >
                    <tech.icon className="h-5 w-5" style={{ color: tech.color }} />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{tech.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{tech.description}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Model Features */}
      <section className="container mx-auto px-6 py-20">
        <RevealSection className="text-center mb-14">
          <h2 className="text-3xl font-bold text-foreground mb-4">Model Input Features</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            The LGBM model was trained on these 18+ features after preprocessing with scikit-learn pipelines.
          </p>
        </RevealSection>
        <div className="max-w-3xl mx-auto">
          <RevealSection>
            <div className="rounded-2xl border border-border bg-card overflow-hidden">
              <div className="grid grid-cols-2 gap-0 divide-y divide-border">
                {modelFeatures.map((f, i) => (
                  <div
                    key={f.name}
                    className={`flex items-center justify-between px-5 py-3.5 text-sm hover:bg-accent/50 transition-colors duration-200 ${i % 2 === 0 ? "" : "border-l border-border"}`}
                  >
                    <span className="text-foreground font-medium">{f.name}</span>
                    <span
                      className="text-xs font-medium px-2 py-0.5 rounded-full"
                      style={{
                        background: f.type === "Numerical" ? "hsl(var(--accent))" : f.type === "Binary" ? "hsl(var(--churn-low-bg))" : "hsl(var(--churn-medium-bg))",
                        color: f.type === "Numerical" ? "hsl(var(--primary))" : f.type === "Binary" ? "hsl(var(--churn-low))" : "hsl(var(--churn-medium))",
                      }}
                    >
                      {f.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* Architecture Diagram */}
      <section className="bg-card border-y border-border">
        <div className="container mx-auto px-6 py-20">
          <RevealSection className="text-center mb-14">
            <h2 className="text-3xl font-bold text-foreground mb-4">System Architecture</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              How a prediction flows from browser to model and back.
            </p>
          </RevealSection>
          <RevealSection>
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row items-center justify-center gap-3">
                {[
                  { icon: BarChart3, label: "React Frontend", sub: "Vite + TypeScript", color: "hsl(var(--primary))" },
                  { arrow: true },
                  { icon: Shield, label: "Edge Proxy", sub: "Supabase Function", color: "hsl(262, 83%, 65%)" },
                  { arrow: true },
                  { icon: Code2, label: "FastAPI Backend", sub: "Render deployment", color: "hsl(158, 64%, 40%)" },
                  { arrow: true },
                  { icon: Brain, label: "LightGBM Model", sub: "Joblib artifacts", color: "hsl(38, 92%, 50%)" },
                ].map((item, i) => (
                  "arrow" in item ? (
                    <ChevronRight key={i} className="h-6 w-6 text-muted-foreground shrink-0 hidden md:block" />
                  ) : (
                    <div key={i} className="flex flex-col items-center text-center group">
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-3 border border-border transition-transform duration-300 group-hover:scale-110 group-hover:shadow-lg"
                        style={{ background: "hsl(var(--background))" }}
                      >
                        <item.icon className="h-7 w-7" style={{ color: item.color }} />
                      </div>
                      <div className="text-sm font-semibold text-foreground">{item.label}</div>
                      <div className="text-xs text-muted-foreground">{item.sub}</div>
                    </div>
                  )
                ))}
              </div>
              <p className="text-center text-sm text-muted-foreground mt-8 max-w-2xl mx-auto">
                The Edge Proxy layer is critical — it solves CORS restrictions that would prevent the browser
                from directly calling the Render-hosted FastAPI backend. All ML inference stays server-side.
              </p>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 py-20 text-center">
        <RevealSection className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Explore?</h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Try the live predictor or explore the source code on GitHub.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/dashboard">
              <Button size="lg" className="h-12 px-10 font-semibold" style={{ boxShadow: "var(--shadow-elevated)" }}>
                Launch Predictor <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <a href="https://github.com/Hari31416" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="h-12 px-8 gap-2">
                <Github className="h-4 w-4" /> GitHub Repository
              </Button>
            </a>
          </div>
        </RevealSection>
      </section>
    </div>
  );
}
