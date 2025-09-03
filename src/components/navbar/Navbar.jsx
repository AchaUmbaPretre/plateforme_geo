import "./navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Close } from "@mui/icons-material";
import { useState, useEffect } from "react";
import logo from './../../assets/logo.jpeg';
import Avatar from '@mui/material/Avatar'; // ✅ avatar pro Material UI

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(prev => !prev);
  const closeMenu = () => setMenuOpen(false);

  // Vérifie le token au montage
  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("token"));
  }, []);

  // Gérer scroll pour sticky navbar
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Déconnexion
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-wrapper">
        <Link to="/">
          <img src={logo} alt="Logo" className="navbar-logo" />
        </Link>

        <div className="navbar-right">
          {/* Bouton burger pour mobile */}
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
            <li><a href="#nosservices" className="navbar-link" onClick={closeMenu}>Nos données</a></li>
            <li><a href="#contact" className="navbar-link" onClick={closeMenu}>Contactez-nous</a></li>

            {/* Si pas connecté */}
            {!isAuthenticated ? (
              <li>
                <Link to="/login" className="navbar-link" onClick={closeMenu}>
                  Se connecter
                </Link>
              </li>
            ) : (
              <li className="navbar-user">
                <Avatar alt="User Avatar" src="/static/images/avatar/1.jpg" />
                <button className="logout-btn" onClick={handleLogout}>
                  Déconnecter
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
