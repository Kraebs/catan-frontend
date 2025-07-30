import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaCogs } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/navbar.css';

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Startseite', path: '/' },
    { name: 'Tabelle', path: '/tabelle' },
    { name: 'Spiel', path: '/spiel' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="navbar navbar-expand-lg sticky-top shadow-sm">
      <div className="container-fluid px-4">
        {/* Logo */}
        <Link className="navbar-brand" to="/">
          <img src="/header_bild.png" alt="Catan Logo" />
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span
            className="navbar-toggler-icon"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='white' stroke-width='2' stroke-linecap='round' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E\")",
            }}
          ></span>
        </button>

        <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
          {/* Navigation Items */}
          <ul className="navbar-nav gap-lg-3 gap-2 mt-3 mt-lg-0 text-center align-items-center">
            {navItems.map((item) => (
              <li className="nav-item" key={item.path}>
                <Link
                  to={item.path}
                  className={`nav-link ${
                    isActive(item.path) ? 'active-nav' : ''
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Admin Icon (separat ganz rechts) */}
          <div className="d-flex align-items-center mt-3 mt-lg-0 admin-icon-container">
            <Link
              to="/admin"
              className={`nav-link ${isActive('/admin') ? 'active-nav' : ''}`}
            >
              <FaCogs />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
