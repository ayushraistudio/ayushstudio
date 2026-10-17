import React, { useState } from "react";
import { Link } from "react-router-dom"; // ✅ React Router Link
import "./Navbar.css";
import resumePdf from '../assets/resume/Ayush_Rai_Resume.pdf';
import { FaMoon, FaSun, FaBars } from "react-icons/fa";

const Navbar = ({ theme, toggleTheme }) => {
  const [open, setOpen] = useState(false);

  const handleLinkClick = () => setOpen(false); // close menu on link click (mobile fix)

  return (
    <header>
      <div className="container">
        <div className="brand">
          <div className="dot">AR</div>
          <div>Ayush Rai</div>
        </div>

        <button
          className="hamburger"
          onClick={() => setOpen(!open)}
          aria-label="Toggle Menu"
          aria-expanded={open}
        >
          <FaBars />
        </button>

        <nav className={open ? "show" : ""}>
          <ul>
            <li>
              <Link to="/" onClick={handleLinkClick}>
                About
              </Link>
            </li>
            <li>
              <Link to="/projects" onClick={handleLinkClick}>
                Projects
              </Link>
            </li>
            <li>
              <Link to="/skills" onClick={handleLinkClick}>
                Skills
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={handleLinkClick}>
                Contact
              </Link>
            </li>
          </ul>

          <div className="actions">
            <button
              className="icon-btn"
              onClick={toggleTheme}
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <FaSun /> : <FaMoon />}
            </button>
            <a className="btn" href={resumePdf}ddownload>
              Resume
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
