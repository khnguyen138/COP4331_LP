import React, { useState } from "react";
import { Search, Filter, MapPin, Calendar, Clock, Users } from "lucide-react";
import Explore from "../../../../components/Explore";
import "./ExploreSection.css";

const ExploreSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  
  const filters = [
    { id: "all", label: "All Itineraries" },
    { id: "adventure", label: "Adventure" },
    { id: "culture", label: "Culture" },
    { id: "relaxation", label: "Relaxation" },
    { id: "food", label: "Food & Dining" },
  ];

  return (
    <div className="container py-4">
      {/* Header Section */}
      <div className="mb-5">
        <h1 className="h2 mb-3">Explore Itineraries</h1>
        <p className="text-muted">
          Discover curated travel plans from around the world
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="row mb-4">
        <div className="search-filter flex-md-row">
          <div className="flex-grow-1">
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">
                <Search size={20} className="text-muted" />
              </span>
              <input
                type="text"
                className="form-control border-start-0"
                placeholder="Search itineraries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="filter-buttons justify-content-md-start">
            {filters.map((filter) => (
              <button
                key={filter.id}
                className={`btn ${selectedFilter === filter.id
                  ? "btn-primary"
                  : "btn-outline-secondary"
                  }`}
                onClick={() => setSelectedFilter(filter.id)}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Itineraries Grid */}
      <Explore/>
    </div>
  );
};

export default ExploreSection;
