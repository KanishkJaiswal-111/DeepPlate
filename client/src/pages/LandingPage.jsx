import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Showcase from "../components/Showcase";
import Footer from "../components/Footer";
import { FONT } from "../constants/ui";

export default function LandingPage() {
  // Smooth scrolling for the in-page anchors (Tailwind's `scroll-smooth` on <html>).
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("scroll-smooth");
    return () => root.classList.remove("scroll-smooth");
  }, []);

  return (
    <div className={`${FONT.body} min-h-screen bg-white text-[#111111] antialiased`}>
      <Navbar />
      <main>
        <Hero />
        <Showcase />
      </main>
      <Footer />
    </div>
  );
}