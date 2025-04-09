/*import React, { useState } from "react";
import "./UserProfile.css";
import { Container } from "react-bootstrap";

const UserProfile: React.FC = () => {
    const [editing, setEditing] = useState(false);
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [first, setFirst] = useState("John");
    const [last, setLast] = useState("Doe");
    const [email, setEmail] = useState("john.doe@example.com");
    const [password, setPassword] = useState("password");

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        setEditing(false);

    };

    return (
        <div className="border-top p-3">
            <div className="d-flex flex-column align-items-center mt-4">
                <div className="text-center mb-4">
                    <img
                        src={profileImage || "/default-avatar.png"} // fallback image
                        alt="Profile"
                        className="rounded-circle"
                        style={{ width: "120px", height: "120px", objectFit: "cover" }}
                    />
                </div>
                <h6 className="mb-1">{first} {last}</h6>
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

                {editing && (
                    <div className="mt-2">
                        <h6>Profile Picture</h6>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="form-control"
                        />
                    </div>
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

                <h5 className="mt-3">Password</h5>

                {editing ? (
                    <>
                        <input
                            type="password"
                            className="form-control mb-3"
                            placeholder="Enter new password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            className="form-control mb-3"
                            placeholder="Confirm new password"
                        />
                    </>
                ) : (
                    <p className="mb-3 text-muted">{'*'.repeat(password.length)}</p>
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

export default UserProfile; */

import React, { useState } from "react";
import { Container, Form, Button, Modal, ProgressBar } from "react-bootstrap";
import "./UserProfile.css";

const UserProfile: React.FC = () => {
    const [editing, setEditing] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [firstName, setFirst] = useState("John");
    const [lastName, setLast] = useState("Doe");
    const [email, setEmail] = useState("john.doe@example.com");
    const [password, setPassword] = useState("password");
    const [newPass, setNewPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");

    const confirmedTrips = 3;
    const upcomingTrips = 2;
    const totalTrips = 5;

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleModalToggle = () => {
        setShowModal(!showModal);
    };

    const handlePassChange = async () => {
        try {
            // get user id
            const user = JSON.parse(localStorage.getItem("user") || "{}");
            const userId = user.UserId;

            // check if passwords match before sending to backend
            if (newPass !== confirmPass) {
                alert("Passwords do not match!");
                return;
            }

            // send to backend
            const response = await fetch("http://localhost:5000/api/editUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId, password: newPass}),
            });

            // server response
            const data = await response.json();
            if (response.ok) {
                console.log("Passwords changed successfully!");
                handleModalToggle(); 
            }
            else {  
                console.error(data.error);
            }
        } catch (error) {   
            console.error("Error changing password:", error);
            alert("Failed to change password. Please try again.");
        } 
    }

    const handleSave = async () => {
        try {
            // get user id
            const user = JSON.parse(localStorage.getItem("user") || "{}");
            const userId = user.UserId;

            // send to backend
            const response = await fetch("http://localhost:5000/api/editUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId, firstName, lastName, email }),
            });

            // server response
            const data = await response.json();
            if (response.ok) {
                console.log("Profile updated successfully! With: ", data);
                setEditing(false); 
            }
            else {  
                console.error(data.error);
            }
        } catch (error) {   
            console.error("Error updating profile:", error);
            alert("Error updating profile. Please try again.");
        } 
    };

        return (
            <Container className="py-5">

                <div className="d-flex justify-content-between align-items-center mb-5">
                    <div>
                        <h2 className="h1 fw-bold mb-2">Profile</h2>
                        <p className="text-muted mb-0">View and manage your account information</p>
                    </div>
                </div>

                <div className="container mt-5 profile-layout">
                    <div className="left-panel">
                        <img
                            src={profileImage || "/default-avatar.png"}
                            alt="Profile"
                            className="rounded-circle"
                            style={{ width: "120px", height: "120px", objectFit: "cover" }}
                        />
                        <h6 className="mt-3">{firstName} {lastName}</h6>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="form-control mt-2"
                        />
                    </div>

                    <div className="right-panel">
                        {/* Stats Box */}
                        <div className="profile-box mb-4">
                            <h5 className="mb-2">User Statistics</h5>
                            <p className="mb-1">Confirmed Trips:</p>
                            <ProgressBar now={(confirmedTrips / totalTrips) * 100} label={`${confirmedTrips}`} className="mb-3" />

                            <p className="mb-1">Upcoming Trips:</p>
                            <ProgressBar variant="info" now={(upcomingTrips / totalTrips) * 100} label={`${upcomingTrips}`} />
                        </div>

                        {/* Personal Info */}
                        <div className="profile-box mb-4">
                            <div className="d-flex justify-content-between">
                                <h5 className="mb-1">Personal Information</h5>
                                <button
                                    className="btn btn-sm btn-outline-primary"
                                    onClick={() => setEditing(!editing)}
                                >
                                    {editing ? "Cancel" : "Edit"}
                                </button>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label>First Name</label>
                                    {editing ? (
                                        <input
                                            className="form-control"
                                            value={firstName}
                                            onChange={(e) => setFirst(e.target.value)}
                                        />
                                    ) : (
                                        <p>{firstName}</p>
                                    )}
                                </div>
                                <div className="col-md-6">
                                    <label>Last Name</label>
                                    {editing ? (
                                        <input
                                            className="form-control"
                                            value={lastName}
                                            onChange={(e) => setLast(e.target.value)}
                                        />
                                    ) : (
                                        <p>{lastName}</p>
                                    )}
                                </div>
                            </div>
                            <div className="mt-3">
                                <label>Email</label>
                                {editing ? (
                                    <input
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                ) : (
                                    <p>{email}</p>
                                )}
                            </div>

                            {editing && (
                                <button className="btn btn-success mt-3" onClick={handleSave}>
                                    Save Changes
                                </button>
                            )}

                            <div className="mt-3">
                                <label>Password</label>
                                <p>
                                    {'*'.repeat(password.length)}
                                    <Button variant="link" size="sm" onClick={handleModalToggle}>
                                        Change
                                    </Button>
                                </p>
                            </div>
                        </div>

                        {/* Sign Out */}
                        <div className="profile-box text-center">
                            <button className="btn btn-danger ">Log Out</button>
                        </div>
                    </div>
                </div>

                <Modal show={showModal} onHide={handleModalToggle}>
                    <Modal.Header closeButton>
                        <Modal.Title>Change Password</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Enter new password" 
                                value={newPass}
                                onChange={(e) => setNewPass(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Confirm New Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Confirm new password" 
                                value={confirmPass}
                                onChange={(e) => setConfirmPass(e.target.value)}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleModalToggle}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handlePassChange}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        );
    };

    export default UserProfile;


