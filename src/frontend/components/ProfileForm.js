import React, { useState } from "react";

function ProfileForm({ onProfileCreated }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setMessage("Profile name cannot be empty.");
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/v2/create?name=${name}`);
      if (!response.ok) {
        throw new Error("Failed to create profile");
      }
      setMessage("Profile created successfully!");
      onProfileCreated();
    } catch (error) {
      setMessage("Error creating profile. Please try again.");
      console.error("Error creating profile:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Profile Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Create Profile</button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default ProfileForm;