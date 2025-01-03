import { useState } from 'react';
import '../css/SignupForm.css';

const UserForm = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [mail, setMail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('Patient'); // Default role is 'Patient'
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [address, setAddress] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [affiliation, setAffiliation] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const User = {
      userId,
      password,
      firstName,
      lastName,
      birthDate,
      mail,
      phone,
      role, // Correct field name
    };
  
    // Add role-specific data
    if (role === 'Patient') {
      Object.assign(User, { gender, age, height, weight, address });
    } else if (role === 'Doctor') {
      Object.assign(User, { speciality, affiliation });
    }
  
    try {
      const response = await fetch('/signup', {
        method: 'POST',
        body: JSON.stringify(User),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = await response.json();
  
      if (!response.ok) throw new Error(json.error);
  
      setError(null);
      setUserId('');
      setPassword('');
      setFirstName('');
      setLastName('');
      setBirthDate('');
      setMail('');
      setPhone('');
      setGender('');
      setAge('');
      setHeight('');
      setWeight('');
      setAddress('');
      setSpeciality('');
      setAffiliation('');
      console.log('User signed up:', json);
    } catch (err) {
      setError(err.message);
    }
  };
  

  const renderSpecialFields = () => {
    if (role === 'Patient') {
      return (
        <div className="special-fields">
          <label>Gender:</label>
          <input
            type="text"
            onChange={(e) => setGender(e.target.value)}
            value={gender}
            placeholder="e.g., Male/Female"
          />

          <label>Age:</label>
          <input
            type="number"
            onChange={(e) => setAge(e.target.value)}
            value={age}
            placeholder="e.g., 30"
          />

          <label>Height (in cm):</label>
          <input
            type="number"
            onChange={(e) => setHeight(e.target.value)}
            value={height}
            placeholder="e.g., 170"
          />

          <label>Weight (in kg):</label>
          <input
            type="number"
            onChange={(e) => setWeight(e.target.value)}
            value={weight}
            placeholder="e.g., 70"
          />

          <label>Address:</label>
          <input
            type="text"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            placeholder="e.g., 123 Street, City"
          />
        </div>
      );
    } else if (role === 'Doctor') {
      return (
        <div className="special-fields">
          <label>Speciality:</label>
          <input
            type="text"
            onChange={(e) => setSpeciality(e.target.value)}
            value={speciality}
            placeholder="e.g., Cardiology"
          />

          <label>Affiliation:</label>
          <input
            type="text"
            onChange={(e) => setAffiliation(e.target.value)}
            value={affiliation}
            placeholder="e.g., ABC Hospital"
          />
        </div>
      );
    }
    return null; // No extra fields for staff
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>

      <label>User ID:</label>
      <input
        type="text"
        onChange={(e) => setUserId(e.target.value)}
        value={userId}
      />

      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <label>First Name:</label>
      <input
        type="text"
        onChange={(e) => setFirstName(e.target.value)}
        value={firstName}
      />

      <label>Last Name:</label>
      <input
        type="text"
        onChange={(e) => setLastName(e.target.value)}
        value={lastName}
      />

      <label>Date of Birth:</label>
      <input
        type="date"
        onChange={(e) => setBirthDate(e.target.value)}
        value={birthDate}
      />

      <label>Email:</label>
      <input
        type="email"
        onChange={(e) => setMail(e.target.value)}
        value={mail}
      />

      <label>Phone Number:</label>
      <input
        type="tel"
        onChange={(e) => setPhone(e.target.value)}
        value={phone}
      />

      <div className="role-buttons">
        <button
          type="button"
          className={role === 'Patient' ? 'active' : ''}
          onClick={() => setRole('Patient')}
        >
          Patient
        </button>
        <button
          type="button"
          className={role === 'Doctor' ? 'active' : ''}
          onClick={() => setRole('Doctor')}
        >
          Doctor
        </button>
        <button
          type="button"
          className={role === 'Staff' ? 'active' : ''}
          onClick={() => setRole('Staff')}
        >
          Staff
        </button>
      </div>

      {renderSpecialFields()}

      <button type="submit" className="submit-button">
        Sign Up
      </button>

      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default UserForm;
