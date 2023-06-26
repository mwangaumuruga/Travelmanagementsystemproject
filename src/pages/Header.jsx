import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <div className="header-container">
      <Link to="/" className="header-link">Home</Link>
      <Link to="/about" className="header-link">About</Link>
      <Link to="/login" className="header-link">Login</Link>
      <Link to="/contacts" className="header-link">Contacts</Link>
      <hr />
    </div>
  );
}

export default Header;
