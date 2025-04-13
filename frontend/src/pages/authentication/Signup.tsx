import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface UserData {
  userId: string;
  firstName: string;
  lastName: string;
  token: string;
}

interface SignupProps {
  onSignupSuccess: (username: string, userData: UserData) => void;
}

const Signup: React.FC<SignupProps> = ({ onSignupSuccess }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validate password
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return;
    }

    try {
      const response = await fetch("http:travelinggenie/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, login, password }),
      });
      const data = await response.json();
      if (data.error) {
        setError(data.error);
        console.error("Error signing up:", data.error);
      } else {
        setSuccess(
          "Registration successful! Please check your email to verify your account."
        );

        // Create user data object
        const userData: UserData = {
          userId: data.userId,
          firstName: firstName,
          lastName: lastName,
          token: data.token,
        };

        // Store user data
        localStorage.setItem(
          "user",
          JSON.stringify({ username: login, ...userData })
        );
        onSignupSuccess(login, userData);

        // Clear form
        setFirstName("");
        setLastName("");
        setEmail("");
        setLogin("");
        setPassword("");

        // Redirect to login after 5 seconds
        setTimeout(() => navigate("/"), 5000);
      }
    } catch (error) {
      setError("An error occurred during signup.");
      console.error("Error signing up:", error);
    }
  };

  return (
    <div className="container mt-3">
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSignup}>
        <div className="mb-3 d-flex gap-3">
          <div className="flex-fill">
            <label htmlFor="firstName" className="form-label">
              First Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="flex-fill">
            <label htmlFor="lastName" className="form-label">
              Last Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
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
        <div className="mb-3 password-field-wrapper">
          <label htmlFor="password">
            Password:
            <span className="tooltip-icon" tabIndex={0}>
              ?
            </span>
            <div className="tooltip-text">
              Must be at least 8 characters
              <br />
              Include 1 uppercase, 1 lowercase,
              <br />1 number, and 1 special character.
            </div>
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
