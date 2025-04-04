import React, { useState } from "react";
import "./UserProfile.css";

const UserProfile: React.FC = () => {
    const [editing, setEditing] = useState(false);
    const [first, setFirst] = useState("John");
    const [last, setLast] = useState("Doe");
    const [email, setEmail] = useState("john.doe@example.com");

    const handleSave = () => {
        setEditing(false);
        
    };

    return (
        <div className="border-top p-3">
            <div className="d-flex flex-column align-items-center mt-4">
                <div
                    className="rounded-circle bg-secondary mb-2"
                    style={{ width: "100px", height: "100px" }}
                >
                    <div className="d-flex align-items-center justify-content-center h-100 text-white">
                        <i className="bi bi-person-fill fs-4"></i>
                    </div>
                </div>
                    <h6 className="mb-1">{first}{last}</h6>
            </div>

            <div className="profileContainer mt-4">
                <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mt-3">Profile Information</h5>
                    <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => setEditing(!editing)}
                    >
                        {editing ? "Cancel" : "Edit"}
                    </button>
                </div>
                
                {editing ? (
                    <div className="row">
                        <div className="col-md-6">
                        <h6>First Name</h6>
                        <input
                            className="form-control mb-3"
                            value={first}
                            onChange={(e) => setFirst(e.target.value)}
                        />
                        </div>
                        <div className="col-md-6">
                        <h6>Last Name</h6>
                        <input
                            className="form-control mb-3"
                            value={last}
                            onChange={(e) => setLast(e.target.value)}
                        />
                        </div>
                    </div>
                    ) : (
                    <>
                        <div className="row">
                            <div className="col-md-6">
                                <h6>First Name</h6>
                                <p className="mb-3 text-muted">{first}</p>
                            </div>
                            <div className="col-md-6">
                                <h6>Last Name</h6>
                                <p className="mb-3 text-muted">{last}</p>
                            </div>
                        </div>
                    </>
                    )}

                <h5 className="mt-3">Contact Information</h5>

                <h6>Email </h6>
                {editing ? (
                    <input
                        className="form-control mb-3"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                ) : (
                    <p className="mb-3 text-muted">{email}</p>
                )}

                {editing && (
                    <button className="btn btn-success mt-3" onClick={handleSave}>
                        Save Changes
                    </button>
                )}
            </div>
        </div>
    )
};

export default UserProfile;

