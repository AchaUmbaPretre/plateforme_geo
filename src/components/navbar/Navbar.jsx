import "./navbar.scss";
import { Link } from "react-router-dom";
import { Menu, Close } from "@mui/icons-material";
import { useState, useEffect } from "react";
import logo from './../../assets/logo.jpeg';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setMenuOpen(prev => !prev);
  const closeMenu = () => setMenuOpen(false);

  // Ajouter ombre et effet sticky au scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-wrapper">
        <Link to="/">
          <img src={logo} alt="Logo" className="navbar-logo" />
        </Link>

        <div className="navbar-right">
          <button 
            className="navbar-bar" 
            onClick={toggleMenu} 
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <Close /> : <Menu />}
          </button>

          <ul className={`navbar-ul ${menuOpen ? "navbarOpen" : ""}`}>
            <li><Link to="/" className="navbar-link" onClick={closeMenu}>Accueil</Link></li>
            <li><a href="#nosservices" className="navbar-link" onClick={closeMenu}>Nos services</a></li>
            <li><Link to="/donnees" className="navbar-link" onClick={closeMenu}>Données</Link></li>
            <li><a href="#contact" className="navbar-link" onClick={closeMenu}>Contactez-nous</a></li>
            <li><Link to="/login" className="navbar-link" onClick={closeMenu}>Se connecter</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
