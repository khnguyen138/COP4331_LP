import React from "react";
import {
  ClipboardCheckIcon,
  UsersIcon,
  CalendarIcon,
  ThumbsUpIcon,
} from "lucide-react";

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      icon: <ClipboardCheckIcon size={40} />,
      title: "Enter Your Preferences",
      description:
        "Tell us about your travel style, interests, and any must-see places.",
    },
    {
      icon: <CalendarIcon size={40} />,
      title: "Get Your AI-Generated Itinerary",
      description:
        "Our AI creates a personalized day-by-day plan optimized for your group.",
    },
    {
      icon: <ThumbsUpIcon size={40} />,
      title: "Refine and Enjoy",
      description:
        "Make adjustments if needed, then enjoy your perfectly planned trip!",
    },
  ];
  return (
    <section className="section-container bg-white" id="how-it-works">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold">How It Works</h2>
          <p className="lead text-muted">
            Planning your dream trip is just a few steps away
          </p>
        </div>
        <div className="row justify-content-center text-center">
          {steps.map((step, index) => (
            <div key={index} className="col-md-6 col-lg-3 mb-4 d-flex justify-content-center">
              <div className="d-flex flex-column align-items-center">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: "80px",
                    height: "80px",
                    backgroundColor: "#bca598",
                    color: "#242e2e",
                  }}
                >
                  {step.icon}
                </div>
                <div className="text-center mt-3">
                  <h5 className="fw-bold">{step.title}</h5>
                  <p className="text-muted">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default HowItWorksSection;
