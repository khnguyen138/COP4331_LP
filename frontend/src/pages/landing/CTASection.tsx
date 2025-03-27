import React from "react";
import styles from "./CTASection.module.css";

interface CTASectionProps {
  onLogin: () => void;
}

const CTASection: React.FC<CTASectionProps> = ({ onLogin }) => {
  return (
    <section className={styles.ctaContainer} aria-labelledby="cta-heading">
      <div className={styles.ctaContent}>
        <h2 id="cta-heading" className={styles.heading}>
          Ready to Start Your Next Adventure?
        </h2>
        <p className={styles.subheading}>
          Plan your dream trip in minutes, not hours. Join thousands of happy
          travelers today.
        </p>
        <button
          onClick={onLogin}
          className={styles.ctaButton}
          aria-label="Start planning your trip"
        >
          Start Planning Your Trip
        </button>
      </div>
    </section>
  );
};

export default CTASection;
