import { useState } from "react";

function InternCard({
  intern,
  onDelete,
  onUpdate,
  isAdmin = false
}) {
  const [isEditing, setIsEditing] = useState(false);

  const [education, setEducation] = useState(intern.highestEducation || "");
  const [background, setBackground] = useState(intern.background || "");

  const [name, setName] = useState(intern.name);
  const [email, setEmail] = useState(intern.email);

  const handleSave = () => {
    const payload = isAdmin
      ? {
          name,
          email,
          highestEducation: education,
          background
        }
      : {
          highestEducation: education,
          background
        };

    onUpdate(intern.internId, payload);
    setIsEditing(false);
  };

  return (
    <div className="intern-card">

      {/* ===== BASIC DETAILS ===== */}
      <p><strong>Name:</strong> {intern.name}</p>
      <p><strong>Intern ID:</strong> {intern.internId}</p>
      <p><strong>Email:</strong> {intern.email}</p>

      <p>
        <strong>Wallet:</strong>{" "}
        {intern.wallet || "Not linked"}
      </p>

      {/* ===== EDUCATION ===== */}
      <p>
        <strong>Education:</strong>{" "}
        {isEditing ? (
          <input
            value={education}
            onChange={(e) => setEducation(e.target.value)}
          />
        ) : (
          intern.highestEducation || "—"
        )}
      </p>

      {/* ===== BACKGROUND ===== */}
      <p>
        <strong>Background:</strong>{" "}
        {isEditing ? (
          <select
            value={background}
            onChange={(e) => setBackground(e.target.value)}
          >
            <option value="student">Student</option>
            <option value="fresher">Fresher</option>
            <option value="working professional">
              Working Professional
            </option>
          </select>
        ) : (
          intern.background || "—"
        )}
      </p>

      {/* ===== ADMIN-ONLY EDIT FIELDS ===== */}
      {isAdmin && isEditing && (
        <>
          <p>
            <strong>Name:</strong>{" "}
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </p>

          <p>
            <strong>Email:</strong>{" "}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </p>
        </>
      )}

      {/* ===== ACTION BUTTONS ===== */}
      <div style={{ marginTop: "10px" }}>
        {!isEditing ? (
          <>
            <button
              className="editBtn"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>

            {isAdmin && (
              <button
                className="deleteBtn"
                onClick={() => onDelete(intern.internId)}
              >
                Delete
              </button>
            )}
          </>
        ) : (
          <>
            <button className="editBtn" onClick={handleSave}>
              Save
            </button>
            <button
              className="editBtn"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default InternCard;
