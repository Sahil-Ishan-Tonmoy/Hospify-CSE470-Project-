import { useState } from "react";
import moment from "moment";

const UserDetails = ({ User, updateUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({ ...User });
  const [profilePicture, setProfilePicture] = useState(User.profilePicture || "");

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // Toggle edit mode
  const toggleEdit = () => setIsEditing(!isEditing);

  // Handle profile picture upload
  const handlePictureUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfilePicture(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Handle profile picture removal
  const removePicture = () => {
    setProfilePicture("");
  };

 // Save updated data
  const handleSave = () => {
    updateUser({ ...userData, profilePicture });
    setIsEditing(false);
  };
  return (
    <div className="user-details" style={styles.card}>
      <h2 style={styles.heading}>User Profile</h2>
      {/* Profile Picture */}
      <div style={styles.profilePictureContainer}>
        {profilePicture ? (
          <img src={profilePicture} alt="Profile" style={styles.profilePicture} />
        ) : (
          <div style={styles.placeholder}>No Profile Picture</div>
        )}
        {isEditing && (
          <div style={styles.pictureControls}>
            <input type="file" onChange={handlePictureUpload} style={styles.fileInput} />
            <button onClick={removePicture} style={styles.removePictureButton}>
              Remove Picture
            </button>
          </div>
        )}
      </div>

      {/* Common Fields */}
      <div style={styles.detailRow}>
        <p><strong>User ID:</strong></p>
        <span>{userData.userId}</span>
      </div>

      <div style={styles.detailRow}>
        <p><strong>Name:</strong></p>
        {isEditing ? (
          <>
            <input
              type="text"
              name="firstName"
              value={userData.firstName}
              onChange={handleChange}
              style={styles.input}
              placeholder="First Name"
            />
            <input
              type="text"
              name="lastName"
              value={userData.lastName}
              onChange={handleChange}
              style={styles.input}
              placeholder="Last Name"
            />
          </>
        ) : (
          <span>{userData.firstName} {userData.lastName}</span>
        )}
      </div>

      <div style={styles.detailRow}>
        <p><strong>Date of Birth:</strong></p>
        {isEditing ? (
          <input
            type="date"
            name="birthDate"
            value={moment(userData.birthDate).format("YYYY-MM-DD")}
            onChange={handleChange}
            style={styles.input}
          />
        ) : (
          <span>{moment(userData.birthDate).format("YYYY-MM-DD")}</span>
        )}
      </div>

      <div style={styles.detailRow}>
        <p><strong>Email:</strong></p>
        {isEditing ? (
          <input
            type="email"
            name="mail"
            value={userData.mail}
            onChange={handleChange}
            style={styles.input}
          />
        ) : (
          <span>{userData.mail}</span>
        )}
      </div>

      <div style={styles.detailRow}>
        <p><strong>Phone:</strong></p>
        {isEditing ? (
          <input
            type="text"
            name="phone"
            value={userData.phone}
            onChange={handleChange}
            style={styles.input}
          />
        ) : (
          <span>{userData.phone}</span>
        )}
      </div>

      <div style={styles.detailRow}>
        <p><strong>Role:</strong></p>
        <span>{userData.role}</span>
      </div>

      {/* Role-Specific Fields */}
      {userData.role === "Doctor" && (
        <div>
          <div style={styles.detailRow}>
            <p><strong>Speciality:</strong></p>
            {isEditing ? (
              <input
                type="text"
                name="speciality"
                value={userData.speciality || ""}
                onChange={handleChange}
                style={styles.input}
              />
            ) : (
              <span>{userData.speciality}</span>
            )}
          </div>
          <div style={styles.detailRow}>
            <p><strong>Affiliation:</strong></p>
            {isEditing ? (
              <input
                type="text"
                name="affiliation"
                value={userData.affiliation || ""}
                onChange={handleChange}
                style={styles.input}
              />
            ) : (
              <span>{userData.affiliation}</span>
            )}
          </div>
        </div>
      )}

      {userData.role === "Patient" && (
        <div>
          <div style={styles.detailRow}>
            <p><strong>Gender:</strong></p>
            {isEditing ? (
              <select
                name="gender"
                value={userData.gender || ""}
                onChange={handleChange}
                style={styles.input}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            ) : (
              <span>{userData.gender}</span>
            )}
          </div>
          <div style={styles.detailRow}>
            <p><strong>Age:</strong></p>
            {isEditing ? (
              <input
                type="number"
                name="age"
                value={userData.age || ""}
                onChange={handleChange}
                style={styles.input}
              />
            ) : (
              <span>{userData.age}</span>
            )}
          </div>
        </div>
      )}

      {userData.role === "Staff" && (
        <div>
          <div style={styles.detailRow}>
            <p><strong>Position:</strong></p>
            {isEditing ? (
              <input
                type="text"
                name="position"
                value={userData.position || ""}
                onChange={handleChange}
                style={styles.input}
              />
            ) : (
              <span>{userData.position}</span>
            )}
          </div>
        </div>
      )}

      {/* Edit and Save Buttons */}
      <div style={styles.buttonContainer}>
        <button onClick={toggleEdit} style={styles.button}>
          {isEditing ? "Cancel" : "Edit"}
        </button>
        {isEditing && (
          <button onClick={handleSave} style={styles.saveButton}>
            Save
          </button>
        )}
      </div>
    </div>
  );
};

const styles = {
    card: {
      border: "1px solid #ddd",
      padding: "25px",
      borderRadius: "15px",
      width: "90%",
      maxWidth: "700px",
      margin: "20px auto",
      backgroundColor: "#f9f9f9",
      boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
      fontFamily: "'Arial', sans-serif",
    },
    heading: {
      textAlign: "center",
      marginBottom: "20px",
      fontSize: "1.8rem",
      fontWeight: "bold",
      color: "#333",
      textTransform: "uppercase",
    },
    detailRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      margin: "15px 0",
      fontSize: "1rem",
      color: "#555",
      paddingBottom: "8px",
      borderBottom: "1px solid #eee",
      position: "relative",
    },
    input: {
      width: "65%",
      padding: "10px",
      fontSize: "1rem",
      border: "1px solid #ccc",
      borderRadius: "8px",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "flex-end",
      marginTop: "20px",
    },
    button: {
      display: "block",
      margin: "20px auto 0",
      padding: "12px 25px",
      fontSize: "1rem",
      cursor: "pointer",
      backgroundColor: "#007BFF",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      transition: "background-color 0.3s, transform 0.2s",
      textAlign: "center",
    },
    buttonHover: {
      backgroundColor: "#0056b3",
      transform: "scale(1.05)",
    },
    saveButton: {
      padding: "12px 20px",
      fontSize: "1rem",
      cursor: "pointer",
      backgroundColor: "#28a745",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      transition: "background-color 0.3s",
    },
    profilePictureContainer: {
      textAlign: "center",
      marginBottom: "20px",
    },
    profilePicture: {
      width: "120px",
      height: "120px",
      borderRadius: "50%",
      objectFit: "cover",
      border: "3px solid #ddd",
      boxShadow: "0 3px 8px rgba(0, 0, 0, 0.1)",
    },
    placeholder: {
      width: "160px",
      height: "160px",
      lineHeight: "120px",
      border: "2px dashed #ccc",
      borderRadius: "50%",
      textAlign: "center",
      color: "#aaa",
    },
    pictureControls: {
      marginTop: "15px",
    },
    addSkillButton: {
      padding: "10px 15px",
      backgroundColor: "#007BFF",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      marginTop: "10px",
      transition: "background-color 0.3s",
    },
    removeSkillButton: {
      padding: "10px",
      marginLeft: "10px",
      backgroundColor: "#d9534f",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    removePictureButton: {
      backgroundColor: "#d9534f",
      color: "#fff",
      border: "none",
      padding: "8px 15px",
      cursor: "pointer",
      borderRadius: "8px",
      marginTop: "10px",
      transition: "background-color 0.3s",
    },
    label: {
      fontWeight: "bold",
      color: "#333",
      fontSize: "1rem",
    },
    value: {
      color: "#555",
      fontSize: "1rem",
      textAlign: "right",
    },
  };
  
  
  

export default UserDetails;
