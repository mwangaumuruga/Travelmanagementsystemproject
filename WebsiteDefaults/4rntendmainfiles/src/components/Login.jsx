import React, { useState } from 'react';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform authentication logic here
    // You can send the login or registration data to an API or handle it locally

    // Reset the form
    setUsername('');
    setPassword('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleFormToggle = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <div className="login-container">
      <h2 className="login-title">{isRegistering ? 'Register' : 'Login'} Page</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleInputChange}
          />
        </div>
        {isRegistering && (
          <div>
            {/* Additional form fields for registration */}
            <label htmlFor="email">Email:</label>
            <input type="text" id="email" name="email" onChange={handleInputChange} />
            {/* Add remaining form fields */}
          </div>
        )}
        <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
      </form>
      <p>
        {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
        <button onClick={handleFormToggle}>
          {isRegistering ? 'Login' : 'Register'}
        </button>
      </p>
    </div>
  );
}

export default Login;
