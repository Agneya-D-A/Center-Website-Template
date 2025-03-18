import React, { useState, useEffect } from "react";
import { scroller } from "react-scroll";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Navbar.css";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (section) => {
    setIsMobileMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: section } });
    } else {
      scroller.scrollTo(section, { smooth: true, duration: 500, offset: -100 });
    }
  };

  // Close mobile menu when resizing above mobile width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="navbar">
      <div className="container">
        {/* Mobile Menu Icon */}
        <div className="mobile-menu-icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Logo */}
        <div className="logo-container" onClick={() => handleNavigation("home")} style={{ cursor: "pointer" }}>
          <img src="/assets/Navbar/uandi_logo.png" className="logo-img" alt="U&I Logo" />
          <div className="logo">x</div>
          <img id="KanasuLogo" className="logo-img-kanasu" src="/assets/Logo.png" alt="Kanasu Logo" />
        </div>

        {/* Navigation */}
        <ul className={`desktop-nav ${isMobileMenuOpen ? "mobile-nav-active" : ""}`}>
          <li onClick={() => handleNavigation("home")} className="scroll-link">Home</li>
          <li onClick={() => handleNavigation("about")} className="scroll-link">About</li>
          <li onClick={() => handleNavigation("impact-section")} className="scroll-link">Impact Stories</li>
          <li onClick={() => handleNavigation("gallery-container")} className="scroll-link">Gallery</li>
          <li onClick={() => handleNavigation("experiences")} className="scroll-link">Experiences</li>

          {/* Dropdown Menu */}
          <li
            className="dropdown scroll-link"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            Links
            {isDropdownOpen && (
              <ul className="dropdown-menu">
                <li><a href="https://uandi.org.in/volunteer" target="_blank" rel="noopener noreferrer">Sign Up</a></li>
                <li><a href="https://build.uandi.org.in/" target="_blank" rel="noopener noreferrer">Build: Student Logs</a></li>
                <li><a href="https://trainingandresources2024.softr.app/teacher-resources" target="_blank" rel="noopener noreferrer">Teaching Resources</a></li>
              </ul>
            )}
          </li>

          <li onClick={() => handleNavigation("contact")} className="scroll-link">Contact</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
