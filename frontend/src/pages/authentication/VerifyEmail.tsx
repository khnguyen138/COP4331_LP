import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const VerifyEmail: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"verifying" | "success" | "error">(
    "verifying"
  );
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get("token");

      if (!token) {
        setStatus("error");
        setMessage("Invalid verification link");
        return;
      }

      try {
        const response = await fetch(
          `http://travelinggenie.com/api/verify-email/${token}`
        );
        const data = await response.json();

        if (response.ok) {
          setStatus("success");
          setMessage("Email verified successfully! You can now log in.");
          setTimeout(() => navigate("/login"), 3000);
        } else {
          setStatus("error");
          setMessage(data.error || "Verification failed");
        }
      } catch (error) {
        setStatus("error");
        setMessage("An error occurred during verification");
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body text-center">
              {status === "verifying" && (
                <>
                  <div
                    className="spinner-border text-primary mb-3"
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <h3>Verifying your email...</h3>
                </>
              )}

              {status === "success" && (
                <>
                  <div className="text-success mb-3">
                    <i
                      className="bi bi-check-circle-fill"
                      style={{ fontSize: "3rem" }}
                    ></i>
                  </div>
                  <h3 className="text-success">Success!</h3>
                </>
              )}

              {status === "error" && (
                <>
                  <div className="text-danger mb-3">
                    <i
                      className="bi bi-x-circle-fill"
                      style={{ fontSize: "3rem" }}
                    ></i>
                  </div>
                  <h3 className="text-danger">Error</h3>
                </>
              )}

              <p className="mt-3">{message}</p>

              {status === "error" && (
                <button
                  className="btn btn-primary mt-3"
                  onClick={() => navigate("/login")}
                >
                  Return to Login
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
