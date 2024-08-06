import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from './UserContext';

const Login = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loginDetails, setLoginDetails] = useState({
    email: '',
    password: ''
  });
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    axios.get('http://localhost:8080/get') // Updated URL
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error:', error));
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const foundUser = users.find(user => user.email === loginDetails.email && user.password === loginDetails.password);

    if (foundUser) {
      setUser(foundUser);
      navigate('/home');
    } else {
      alert('Account not found. Please register.');
      navigate('/register');
    }
  };

  const handleInputChange = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };

  const containerStyle = {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    overflow: 'hidden'
  };

  const videoStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: -1
  };

  const formStyle = {
    background: 'rgba(0, 0, 0, 0.7)', // Dark background with transparency
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
    width: '100%',
    maxWidth: '500px', // Increased width for a larger form
    textAlign: 'center'
  };

  const headingStyle = {
    marginBottom: '1.5rem', // Increased margin for better spacing
    fontSize: '2.5rem', // Larger heading size
    color: '#fff', // White color for the text
    textShadow: '0 0 5px #fff, 0 0 10px #ff0000, 0 0 15px #ff0000, 0 0 20px #ff0000, 0 0 25px #ff0000, 0 0 30px #ff0000, 0 0 35px #ff0000' // Tubelight effect
  };

  const inputStyle = {
    width: '100%',
    padding: '1rem', // Increased padding
    border: '2px solid #fff', // White border
    borderRadius: '8px', // Rounded corners
    fontSize: '1.2rem', // Larger font size
    color: '#333',
    backgroundColor: 'rgba(255, 255, 255, 0.2)' // Light background for input
  };

  const inputFocusStyle = {
    borderColor: '#ff007f' // Pink border on focus
  };

  const buttonStyle = {
    backgroundColor: '#ff007f', // Bright pink color
    color: '#fff',
    border: 'none',
    padding: '1rem 2rem', // Increased padding for larger button
    borderRadius: '8px', // Rounded corners
    fontSize: '1.2rem', // Larger font size
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  };

  const buttonHoverStyle = {
    backgroundColor: '#e60073' // Darker pink color on hover
  };

  const registerLinkStyle = {
    marginTop: '1.5rem' // Increased margin for spacing
  };

  const linkStyle = {
    color: '#ff007f', // Pink color
    textDecoration: 'none',
    fontWeight: 'bold'
  };

  const linkHoverStyle = {
    textDecoration: 'underline'
  };

  return (
    <div style={containerStyle}>
      <video autoPlay muted loop style={videoStyle}>
        <source src="https://v1.pinimg.com/videos/iht/720p/fe/46/aa/fe46aa926b043aecc4e50b0ad3869411.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <form onSubmit={handleLogin} style={formStyle}>
        <h2 style={headingStyle}>LOGIN</h2>
        <div className="form-group">
          <input 
            placeholder='e-mail'
            type="email" 
            name='email'
            value={loginDetails.email} 
            onChange={handleInputChange} 
            required 
            style={inputStyle}
            onFocus={(e) => e.target.style.borderColor = inputFocusStyle.borderColor}
            onBlur={(e) => e.target.style.borderColor = 'white'}
          />
        </div>
        <div className="form-group">
          <input 
            placeholder='password'
            type="password" 
            name='password'
            value={loginDetails.password} 
            onChange={handleInputChange} 
            required 
            style={inputStyle}
            onFocus={(e) => e.target.style.borderColor = inputFocusStyle.borderColor}
            onBlur={(e) => e.target.style.borderColor = 'white'}
          />
        </div>
        <button 
          type="submit" 
          style={buttonStyle}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
        >
          Login
        </button>
        <div style={registerLinkStyle}>
          <h6><b>New User? </b><Link to="/register" style={linkStyle} onMouseOver={(e) => e.currentTarget.style.textDecoration = linkHoverStyle.textDecoration} onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}>Register here</Link></h6>
        </div>
      </form>
    </div>
  );
};

export default Login;
