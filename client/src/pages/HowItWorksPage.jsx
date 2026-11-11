import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AboutHero from "../components/about/AboutHero";
import InteractiveWorkflow from "../components/about/InteractiveWorkflow";
import ProblemAndChallenges from "../components/about/ProblemAndChallenges";
import ProposedSolutionSection from "../components/about/ProposedSolutionSection";
import SystemArchitectureSection from "../components/about/SystemArchitectureSection";
import OutputInspectorSection from "../components/about/OutputInspectorSection";
import ProjectObjectivesSection from "../components/about/ProjectObjectivesSection";
import AboutCTA from "../components/about/AboutCTA";
import { FONT } from "../constants/ui";

export default function HowItWorksPage() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("scroll-smooth");
    // Scroll to top when page loads (unless a hash is present)
    if (!window.location.hash) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
    return () => root.classList.remove("scroll-smooth");
  }, []);

  return (
    <div className={`${FONT.body} min-h-screen bg-white text-[#111111] antialiased`}>
      <Navbar />
      <main>
        <AboutHero />
        <InteractiveWorkflow />
        <ProblemAndChallenges />
        <ProposedSolutionSection />
        <SystemArchitectureSection />
        <OutputInspectorSection />
        <ProjectObjectivesSection />
        <AboutCTA />
      </main>
      <Footer />
    </div>
  );
}

