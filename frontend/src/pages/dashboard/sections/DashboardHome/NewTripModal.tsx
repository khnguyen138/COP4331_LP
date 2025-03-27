import React, { useState } from "react";
import { X as CloseIcon } from "lucide-react";
interface NewTripModalProps {
  onClose: () => void;
}
const NewTripModal: React.FC<NewTripModalProps> = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onClose();
    }
  };
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl w-full max-w-2xl shadow-2xl">
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white">Create New Trip</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <CloseIcon size={24} />
          </button>
        </div>
        <div className="p-6">
          {/* Progress indicator */}
          <div className="flex justify-between mb-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= i ? "bg-purple-600" : "bg-gray-700"
                  } transition-colors`}
                >
                  <span className="text-white font-medium">{i}</span>
                </div>
                <span className="text-xs mt-2 text-gray-400">
                  {i === 1 ? "Basics" : i === 2 ? "Details" : "Preferences"}
                </span>
              </div>
            ))}
          </div>
          {/* Step 1: Basic trip information */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="destination"
                  className="block text-gray-300 mb-2"
                >
                  Where do you want to go?
                </label>
                <input
                  type="text"
                  id="destination"
                  placeholder="e.g., Tokyo, Japan"
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="start-date"
                    className="block text-gray-300 mb-2"
                  >
                    Start Date
                  </label>
                  <input
                    type="date"
                    id="start-date"
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="end-date"
                    className="block text-gray-300 mb-2"
                  >
                    End Date
                  </label>
                  <input
                    type="date"
                    id="end-date"
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="trip-name" className="block text-gray-300 mb-2">
                  Trip Name
                </label>
                <input
                  type="text"
                  id="trip-name"
                  placeholder="e.g., Summer Vacation 2023"
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          )}
          {/* Step 2: Trip details */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label htmlFor="travelers" className="block text-gray-300 mb-2">
                  Number of Travelers
                </label>
                <select
                  id="travelers"
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="1">1 (Just me)</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5+">5+</option>
                </select>
              </div>
              <div>
                <label htmlFor="budget" className="block text-gray-300 mb-2">
                  Budget Range
                </label>
                <select
                  id="budget"
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="budget">Budget-friendly</option>
                  <option value="moderate">Moderate</option>
                  <option value="luxury">Luxury</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-300 mb-2">
                  Invite Friends
                </label>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter email address"
                    className="flex-grow bg-gray-700 text-white rounded-l-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 rounded-r-lg transition-colors">
                    Invite
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* Step 3: Trip preferences */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-3">
                  What are you interested in?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "Cultural Sites",
                    "Beaches",
                    "Food & Dining",
                    "Shopping",
                    "Museums",
                    "Outdoor Activities",
                    "Nightlife",
                    "Relaxation",
                  ].map((interest) => (
                    <div key={interest} className="flex items-center">
                      <input
                        type="checkbox"
                        id={interest.toLowerCase().replace(/\s+/g, "-")}
                        className="w-4 h-4 accent-purple-600"
                      />
                      <label
                        htmlFor={interest.toLowerCase().replace(/\s+/g, "-")}
                        className="ml-2 text-gray-300"
                      >
                        {interest}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor="pace" className="block text-gray-300 mb-2">
                  Travel Pace
                </label>
                <select
                  id="pace"
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="relaxed">
                    Relaxed - I want plenty of downtime
                  </option>
                  <option value="balanced">
                    Balanced - Mix of activities and rest
                  </option>
                  <option value="active">
                    Active - Pack in as much as possible
                  </option>
                </select>
              </div>
              <div>
                <label htmlFor="notes" className="block text-gray-300 mb-2">
                  Special Requests or Notes
                </label>
                <textarea
                  id="notes"
                  rows={3}
                  placeholder="Any dietary restrictions, accessibility needs, or special interests?"
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-between p-6 border-t border-gray-700">
          <button
            onClick={step === 1 ? onClose : handleBack}
            className="text-gray-300 hover:text-white px-4 py-2 rounded-lg transition-colors"
          >
            {step === 1 ? "Cancel" : "Back"}
          </button>
          <button
            onClick={handleNext}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            {step === 3 ? "Create Trip" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default NewTripModal;
