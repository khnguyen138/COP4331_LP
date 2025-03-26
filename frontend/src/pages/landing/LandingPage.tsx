import React, { useState } from "react";
import HeroSection from "./HeroSection";
import SmartPlanningSection from "./SmartPlanning";
import HowItWorksSection from "./HowItWorksSection";

interface LandingPageProps {
  onLogin: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  return (
    <div>
      <HeroSection onLogin={onLogin} />
      <SmartPlanningSection />
      <HowItWorksSection />
    </div>
  );
};

export default LandingPage;
