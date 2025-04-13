import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface UserData {
  userId: string;
  firstName: string;
  lastName: string;
  token: string;
}

interface LoginProps {
  onLoginSuccess: (username: string, userData: UserData) => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("https://travelinggenie.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, password }),
      });
      const data = await response.json();

      if (response.ok) {
        console.log("Login successful:", data);
        const userData: UserData = {
          userId: data.userId,
          firstName: data.firstName,
          lastName: data.lastName,
          token: data.token,
        };
        localStorage.setItem(
          "user",
          JSON.stringify({ username: login, ...userData })
        );
        onLoginSuccess(login, userData);
        navigate("/Dashboard");
      } else {
        if (data.needsVerification) {
          setError(
            "Please verify your email before logging in. Check your inbox for the verification link."
          );
        } else {
          setError(data.error);
        }
        console.error("Error logging in:", data.error);
      }
    } catch (error) {
      setError("An error occurred during login.");
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="container mt-3">
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="login" className="form-label">
            Login:
          </label>
          <input
            type="text"
            className="form-control"
            id="login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="text-end">
            <button
              type="button"
              className="btn btn-link"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password?
            </button>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
