import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Close } from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext";
import logo from './../../assets/logo.jpeg';
import './navbar.scss';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(prev => !prev);
  const toggleDropdown = () => setDropdownOpen(prev => !prev);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Effet sticky
  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-wrapper">
        <Link to="/"><img src={logo} alt="Logo" className="navbar-logo" /></Link>

        <div className="navbar-right">
          <button className="navbar-bar" onClick={toggleMenu}>
            {menuOpen ? <Close /> : <Menu />}
          </button>

          <ul className={`navbar-ul ${menuOpen ? "navbarOpen" : ""}`}>
            <li><Link to="/" className="navbar-link">Accueil</Link></li>
            <li><a href="#nosservices" className="navbar-link">Nos données</a></li>
            <li><a href="#contact" className="navbar-link">Contactez-nous</a></li>

            {user ? (
              <li className="navbar-user">
                <div className="navbar-avatar" onClick={toggleDropdown}>
                  {`${user.nom?.[0] ?? ""}${user.prenom?.[0] ?? ""}`.toUpperCase()}
                </div>
                <div className={`user-dropdown ${dropdownOpen ? "open" : ""}`}>
                  <div className="dropdown-item" onClick={() => navigate("/profile")}>Profil</div>
                  <div className="dropdown-item logout-btn" onClick={handleLogout}>Déconnecter</div>
                </div>
              </li>
            ) : (
              <li>
                <Link to="/login" className="login-btn">Se connecter</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
