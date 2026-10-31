import { useState } from "react";
import "./Settings.css";

function Settings({
  onHomeClick,
  profile,
  setProfile
}) {
  const [editing, setEditing] = useState(false);

  const [name, setName] = useState(
    profile?.name || "Candidate"
  );

  const [role, setRole] = useState(
    profile?.role || "Student"
  );

  const handleSave = () => {
    setProfile({
      name: name,
      role: role
    });

    setEditing(false);

    alert("Profile updated successfully!");
  };

  return (
    <div className="settings-page">

      {/* HOME BUTTON */}
      <button
        className="home-button"
        onClick={onHomeClick}
      >
        ← Home
      </button>

      {/* HEADER */}
      <header className="settings-header">

        <div>
          <h1>Settings</h1>

          <p>
            Manage your Clevonix application settings.
          </p>
        </div>

        <div className="settings-logo">
          CLEVONIX
        </div>

      </header>

      <main className="settings-content">

        {/* PROFILE SETTINGS */}
        <section className="settings-card">

          <div className="settings-card-header">

            <div>
              <h2>Profile Settings</h2>

              <p>
                Manage your basic profile information.
              </p>
            </div>

            {!editing && (
              <button
                className="edit-profile-button"
                onClick={() => setEditing(true)}
              >
                ✏️ Edit Profile
              </button>
            )}

          </div>

          {editing ? (

            <div className="profile-edit-form">

              {/* NAME */}
              <label>Name</label>

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="Enter your name"
              />

              {/* ROLE */}
              <label>Role</label>

              <input
                type="text"
                value={role}
                onChange={(e) =>
                  setRole(e.target.value)
                }
                placeholder="Enter your role"
              />

              {/* ACTION BUTTONS */}
              <div className="profile-actions">

                <button
                  className="save-profile-button"
                  onClick={handleSave}
                >
                  ✓ Save Changes
                </button>

                <button
                  className="cancel-profile-button"
                  onClick={() => {
                    setName(profile?.name || "Candidate");
                    setRole(profile?.role || "Student");
                    setEditing(false);
                  }}
                >
                  Cancel
                </button>

              </div>

            </div>

          ) : (

            <div>

              <div className="setting-row">

                <div>
                  <strong>Name</strong>

                  <span>
                    {profile?.name || "Candidate"}
                  </span>
                </div>

              </div>

              <div className="setting-row">

                <div>
                  <strong>Role</strong>

                  <span>
                    {profile?.role || "Student"}
                  </span>
                </div>

              </div>

            </div>

          )}

        </section>

        {/* APPLICATION SETTINGS */}
        <section className="settings-card">

          <h2>Application Settings</h2>

          <p>
            Manage your interview preparation preferences.
          </p>

          <div className="setting-row">

            <div>
              <strong>Interview Mode</strong>

              <span>
                AI Interview Preparation
              </span>
            </div>

          </div>

          <div className="setting-row">

            <div>
              <strong>Difficulty</strong>

              <span>
                Easy → Medium → Hard
              </span>
            </div>

          </div>

        </section>

        {/* ABOUT */}
        <section className="settings-card">

          <h2>About Clevonix</h2>

          <p className="about-text">

            Clevonix is an AI-powered interview
            preparation platform designed to help
            students practice, improve and evaluate
            their interview performance.

          </p>

          <div className="version">
            Version 1.0
          </div>

        </section>

      </main>

    </div>
  );
}

export default Settings;