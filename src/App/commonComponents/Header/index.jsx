import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <nav className="navbar is-dark" role="navigation" aria-label="main navigation">
      <div className="container">
        <div className="navbar-brand">
          <a className="navbar-item" href="https://www.geektrust.in/">
            <img
              src="https://geektrust.sgp1.cdn.digitaloceanspaces.com/assets/images/logo-geektrust-hub-green.png"
              width="112"
              height="28"
              alt="Logo"
            />
          </a>
        </div>
        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <Link className="button is-primary" to="/">
                  Reset
                </Link>
                <a className="button is-light" href="https://www.geektrust.in">
                  Geek Trust Home
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
