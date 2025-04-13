import React, { useState } from "react";
import styles from "./CTASection.module.css";
import LoginSignup from "../authentication/LoginSignup";

interface CTASectionProps {
  onLogin: () => void;
}

const CTASection: React.FC<CTASectionProps> = ({ onLogin }) => {
  const [showLoginSignup, setShowLoginSignup] = useState(false);

  const handleLoginSuccess = () => {
    setShowLoginSignup(false);
    onLogin();
  };

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
          onClick={() => setShowLoginSignup(true)}
          className={styles.ctaButton}
          aria-label="Start planning your trip"
        >
          Start Planning Your Trip
        </button>
      </div>

      {showLoginSignup && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowLoginSignup(false)}
                ></button>
              </div>
              <div className="modal-body">
                <LoginSignup onLoginSuccess={handleLoginSuccess} />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CTASection;
