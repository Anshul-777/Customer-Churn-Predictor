import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import Chatbot from "./components/Chatbot";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import HistoryPage from "./pages/HistoryPage";
import AboutPage from "./pages/AboutPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Initialize theme on load
function ThemeInit() {
  useEffect(() => {
    const theme = localStorage.getItem("churnsense-theme") || "light";
    const root = document.documentElement;
    root.classList.remove("light", "dark", "rainbow");
    if (theme === "dark") root.classList.add("dark");
    else if (theme === "rainbow") root.classList.add("rainbow");
  }, []);
  return null;
}

// Page transition wrapper
function AnimatedRoutes() {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState("enter");
  const prevPath = useRef(location.pathname);

  useEffect(() => {
    if (location.pathname !== prevPath.current) {
      setTransitionStage("exit");
      prevPath.current = location.pathname;
    }
  }, [location]);

  return (
    <div
      className={transitionStage === "enter" ? "animate-fade-slide-up" : ""}
      style={transitionStage === "exit" ? { opacity: 0, transform: "translateY(10px)", transition: "opacity 0.2s ease, transform 0.2s ease" } : {}}
      onTransitionEnd={() => {
        if (transitionStage === "exit") {
          setDisplayLocation(location);
          setTransitionStage("enter");
          window.scrollTo(0, 0);
        }
      }}
    >
      <Routes location={displayLocation}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeInit />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <AnimatedRoutes />
        <Chatbot />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
