import "./navbar.scss";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import logo from './../../assets/logo.jpeg';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const wrapperRef = useRef(null);

  const toggleMenu = () => setMenuOpen(prev => !prev);
  const closeMenu = () => setMenuOpen(false);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menu on route change
  useEffect(() => {
    closeMenu();
  }, [location]);

  const links = [
    { to: "/", label: "Accueil" },
    { href: "#nosservices", label: "Nos services" },
    { to: "/donnees", label: "Données" },
    { to: "/contact", label: "Contactez-nous" },
    { to: "/login", label: "Se connecter" },
  ];

  return (
    <nav className="navbar" role="navigation">
      <div className="navbar-wrapper" ref={wrapperRef}>
        <Link to="/">
          <img src={logo} alt="Logo" className="navbar-logo" />
        </Link>

        <div className="navbar-right">
          {/* Hamburger */}
          <button
            className={`navbar-bar ${menuOpen ? "open" : ""}`}
            onClick={toggleMenu}
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Menu */}
          <ul className={`navbar-ul ${menuOpen ? "navbarOpen" : ""}`}>
            {links.map((link, idx) => (
              <li key={idx}>
                {link.to ? (
                  <Link
                    to={link.to}
                    className={`navbar-link ${location.pathname === link.to ? "active" : ""}`}
                    onClick={closeMenu}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    className="navbar-link"
                    onClick={closeMenu}
                  >
                    {link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
