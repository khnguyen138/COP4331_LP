import React, { useState, useEffect, use } from "react";
import { Container, Form, Button, Modal, ProgressBar } from "react-bootstrap";
import "./UserProfile.css";

const UserProfile: React.FC = () => {
  const [editing, setEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [firstName, setFirst] = useState("");
  const [lastName, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [password] = useState("password");
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  {/* const confirmedTrips = 3;
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
  }; */}

  useEffect(() => {
    // get user data from the backend
    const getUserData = async () => {
      try {
        // get user id
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        console.log("Local user:", user);
        const userId = user.userId;

        // send to backend
        const response = await fetch("http://localhost:5000/api/get-user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        });

        const data = await response.json();
        if (response.ok) {
          setFirst(data.firstName);
          setLast(data.lastName);
          setEmail(data.email);
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getUserData();
  }
    , []);

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  const handlePassChange = async () => {
    try {
      // get user id
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const userId = user.userId;

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
        body: JSON.stringify({ userId, currentPassword: currentPass, password: newPass }),
      });

      // server response
      const data = await response.json();
      if (response.ok) {
        console.log("Passwords changed successfully!");
        handleModalToggle();
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("Error changing password:", error);
      alert("Failed to change password. Please try again.");
    }
  };

  const handleSave = async () => {
    try {
      // get user id
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const userId = user.userId;

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
      } else {
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
          <p className="text-muted mb-0">
            View and manage your account information
          </p>
        </div>
      </div>

      <div className="container mt-5 profile-layout">

        {/* <div className="left-panel">
          <img
            src={profileImage || "/default-avatar.png"}
            alt="Profile"
            className="rounded-circle"
            style={{ width: "120px", height: "120px", objectFit: "cover" }}
          />
          <h6 className="mt-3">
            {firstName} {lastName}
          </h6>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="form-control mt-2"
          />
        </div> */}

        <div className="right-panel">
          <h6 className="display-6 mb-3">
            {firstName} {lastName}
          </h6>
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
                {"*".repeat(password.length)}
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
            <Form.Label>Current Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter current password"
              value={currentPass}
              onChange={(e) => setCurrentPass(e.target.value)}
            />
          </Form.Group>
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
