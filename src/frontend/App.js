import React, { useState, useEffect } from "react";
import ProfileList from "./components/ProfileList";
import ProfileForm from "./components/ProfileForm";

function App() {
  const [profiles, setProfiles] = useState([]);

  const fetchProfiles = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/profiles`);
    const data = await response.json();
    setProfiles(data);
  };

  const deleteProfile = async (profileId) => {
    await fetch(`${process.env.REACT_APP_API_URL}/delete?profile_id=${profileId}`, { method: "GET" });
    fetchProfiles();
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  return (
    <div>
      <h1>Fake Fingerprint Tool</h1>
      <ProfileForm onProfileCreated={fetchProfiles} />
      <ProfileList profiles={profiles} onDelete={deleteProfile} />
    </div>
  );
}

export default App;