import React, { useState } from "react";

const TripPlanner = () => {
  const [prompt, setPrompt] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    setSuggestion("");

    try {
      const response = await fetch("/api/generate-trip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuggestion(data.suggestion);
      } else {
        setError(data.error || "An error occurred.");
      }
    } catch (err) {
      setError("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Trip Planner</h1>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your trip preferences (e.g., Outdoor activities in Turin, Italy)"
        rows="5"
        cols="50"
      />
      <br />
      <button onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating..." : "Generate Trip Plan"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {suggestion && (
        <div>
          <h2>Suggested Trip Plan:</h2>
          <p>{suggestion}</p>
        </div>
      )}
    </div>
  );
};

export default TripPlanner;