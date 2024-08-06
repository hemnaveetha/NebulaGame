import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from './UserContext';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [confirm, setConfirm] = useState('');
  const [signupDetails, setSignupDetails] = useState({
    username: '',
    contact: '',
    email: '',
    password: '',
    confirmPassword:'',
  });
  const { setUser } = useContext(UserContext);

  const checkUserExists = async (email) => {
    try {
      const response = await axios.get('http://localhost:8080/get'); // Updated URL
      return response.data.some(user => user.email === email);
    } catch (error) {
      console.error('Error checking if user exists:', error);
      return false;
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const emailExists = await checkUserExists(signupDetails.email);
    if (emailExists) {
      alert('Email is already registered.');
      return;
    }

    if (confirm !== signupDetails.password) {
      alert('Password and Confirm Password are not the same.');
      return;
    }

    axios.post('http://localhost:8080/insert', signupDetails) // Updated URL
      .then((response) => {
        console.log('Signup successful:', response.data);
        setUser(response.data); // Set user details in context
        navigate('/home'); // Redirect to profile page after successful registration
      })
      .catch((error) => {
        console.error('Signup error:', error);
      });
  };

  const handleInputChange = (e) => {
    setSignupDetails({ ...signupDetails, [e.target.name]: e.target.value });
  };

  const handleConfirmPassword = (e) => {
    setConfirm(e.target.value);
  };

  return (
    <div className="register-container">
      <form onSubmit={handleRegister} className="register-form">
        <h2>REGISTER</h2>
        <div className="form-group">
          <input
            placeholder="username"
            type="text"
            name="username"
            value={signupDetails.username}
            onChange={handleInputChange}
            pattern="[a-zA-Z]*"
            required
          />
        </div>
        <div className="form-group">
          <input
            placeholder="mobile number"
            type="tel"
            name="contact"
            value={signupDetails.contact}
            onChange={handleInputChange}
            pattern="[0-9]{10}"
            required
          />
        </div>
        <div className="form-group">
          <input
            placeholder="e-mail"
            type="email"
            name="email"
            value={signupDetails.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            placeholder="password"
            type="password"
            name="password"
            value={signupDetails.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            placeholder="confirm password"
            type="password"
            name="confirmPassword"
            value={confirm}
            onChange={handleConfirmPassword}
            required
          />
        </div>
        <button type="submit" className="register-button">Register</button>
        <div className="login-link">
          <h6><b>Already have an account? </b><Link to="/">Login here</Link></h6>
        </div>
      </form>
    </div>
  );
};

export default Register;
