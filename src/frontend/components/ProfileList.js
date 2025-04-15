import React from "react";

function ProfileList({ profiles, onDelete }) {
  if (profiles.length === 0) {
    return <p>No profiles available.</p>;
  }

  return (
    <ul>
      {profiles.map((profile) => (
        <li key={profile.id}>
          <strong>{profile.name}</strong> - {profile.created_at}
          <button onClick={() => onDelete(profile.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default ProfileList;