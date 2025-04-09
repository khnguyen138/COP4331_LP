import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch(
        "http://localhost:5001/api/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage("Password reset instructions have been sent to your email.");
        setTimeout(() => navigate("/login"), 3000);
      } else {
        setStatus("error");
        setMessage(data.error || "Failed to send reset instructions");
      }
    } catch (error) {
      setStatus("error");
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Reset Password</h2>

              {status === "success" && (
                <div className="alert alert-success text-center">
                  {message}
                  <div className="mt-3">
                    <button
                      className="btn btn-primary"
                      onClick={() => navigate("/login")}
                    >
                      Return to Login
                    </button>
                  </div>
                </div>
              )}

              {status !== "success" && (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  {status === "error" && (
                    <div className="alert alert-danger">{message}</div>
                  )}

                  <div className="d-grid gap-2">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={status === "loading"}
                    >
                      {status === "loading"
                        ? "Sending..."
                        : "Send Reset Instructions"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
