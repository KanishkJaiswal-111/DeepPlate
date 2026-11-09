import AboutHero from "./AboutHero";
import InteractiveWorkflow from "./InteractiveWorkflow";
import ProblemAndChallenges from "./ProblemAndChallenges";
import ProposedSolutionSection from "./ProposedSolutionSection";
import SystemArchitectureSection from "./SystemArchitectureSection";
import OutputInspectorSection from "./OutputInspectorSection";
import ProjectObjectivesSection from "./ProjectObjectivesSection";
import AboutCTA from "./AboutCTA";

export default function AboutSection() {
  return (
    <div id="about" className="scroll-mt-16">
      <AboutHero />
      <InteractiveWorkflow />
      <ProblemAndChallenges />
      <ProposedSolutionSection />
      <SystemArchitectureSection />
      <OutputInspectorSection />
      <ProjectObjectivesSection />
      <AboutCTA />
    </div>
  );
}

