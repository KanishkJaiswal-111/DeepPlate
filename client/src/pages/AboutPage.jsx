import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AboutSection from "../components/about/AboutSection";
import { FONT } from "../constants/ui";

export default function AboutPage() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("scroll-smooth");
    return () => root.classList.remove("scroll-smooth");
  }, []);

  return (
    <div className={`${FONT.body} min-h-screen bg-white text-[#111111] antialiased`}>
      <Navbar />
      <main>
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
}
