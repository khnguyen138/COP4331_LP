import React, { useState } from "react";

const AIPlannerSection: React.FC = () => {
  const [message, setMessage] = useState("");

  const suggestedPrompts = [
    "Plan a 3-day trip to NYC",
    "Beach vacation on a budget",
    "Romantic getaway in Europe",
    "Adventure trip in Asia",
  ];

  return (
    <section className="py-5">
      <div className="container">
        <div className="mb-4">
          <h2 className="fw-bold display-6 mb-2">AI Trip Planner</h2>
          <p className="text-muted mb-4">
            Start planning your perfect trip with AI assistance
          </p>
        </div>
      </div>

      {/* Chat Display Area */}
      {/* <div className="bg-gray-900/50 rounded-lg p-4 mb-4 h-[400px] overflow-y-auto">
        <div className="flex items-center justify-center h-full text-gray-400">
          Start planning your perfect trip with AI assistance
        </div>
      </div> */}

      {/* Suggested Prompts */}
      <div className="flex gap-3 flex-wrap mb-4">
        {suggestedPrompts.map((prompt) => (
          <button
            key={prompt}
            className="bg-gray-700/50 px-4 py-2 rounded-full text-sm hover:bg-gray-600 transition-colors text-gray-200"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Area */}
      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Describe your dream trip..."
          className="flex-1 bg-gray-900/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity">
          Send
        </button>
      </div>
    </section>
  );
};

export default AIPlannerSection;
