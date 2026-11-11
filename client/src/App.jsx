import { useEffect, useState } from "react";
import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage";
import PredictionPage from "./pages/PredictionPage";

export default function App() {
  const [pathname, setPathname] = useState(() => {
    if (typeof window !== "undefined") {
      return window.location.pathname;
    }
    return "/";
  });

  useEffect(() => {
    const handlePopState = () => {
      setPathname(window.location.pathname);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  if (pathname === "/about" || pathname === "/about/") {
    return <AboutPage />;
  }

  if (pathname === "/predict" || pathname === "/predict/") {
    return <PredictionPage />;
  }

  return <LandingPage />;
}
