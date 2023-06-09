import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import profileImage from "../assets/images/profile.png";
import { GiClockwiseRotation } from "react-icons/gi";
import "./ProfileCard.css";

const ProfileCard = ({ profile, setProfile }) => {
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(
    location.pathname === "/edit-profile"
  );
  const [formData, setFormData] = useState(profile);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLocalSave = () => {
    setProfile(formData);
    setIsEditing(false);
    localStorage.setItem("userProfile", JSON.stringify(formData));
    navigate("/");
  };

  const onEditClick = () => {
    setIsEditing(true);
    navigate("/edit-profile");
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    navigate("/");
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("userProfile");
    if (savedUser) {
      setProfile(JSON.parse(savedUser));
    }
  }, []);

  return (
    <div className={`profile-card ${isEditing ? "editing" : ""}`}>
      <div className="card-header">
        <h1>{isEditing ? "Edit Profile" : "Profile Card"}</h1>
        {!isEditing && (
          <GiClockwiseRotation
            size={24}
            className="edit-button"
            onClick={onEditClick}
          />
        )}
      </div>
      <div className="card-body">
        <div className="profile-image">
          <img src={profileImage} alt="Profile" />
        </div>
        {isEditing ? (
          <form>
            <input
              className="input"
              type="text"
              id="name"
              name="name"
              placeholder="Enter your first name"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              className="input"
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={handleChange}
            />
            <input
              className="input"
              type="text"
              id="office"
              name="office"
              placeholder="Enter your office"
              value={formData.office}
              onChange={handleChange}
            />
            <div className="edit-buttons-container">
              <button type="button" onClick={handleCancelEdit}>
                Cancel
              </button>
              <button type="button" onClick={handleLocalSave}>
                Save
              </button>
            </div>
          </form>
        ) : (
          <div className="card-description">
            <p>Name: {profile.name}</p>
            <p>Last Name: {profile.lastName}</p>
            <p>Office: {profile.office}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
