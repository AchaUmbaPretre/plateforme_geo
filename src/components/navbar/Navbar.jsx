import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Close } from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/logo.jpeg";
import "./navbar.scss";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Add scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-wrapper">
        
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="Logo" />
        </Link>

        {/* Hamburger */}
        <button className="navbar-bar" onClick={toggleMenu}>
          {menuOpen ? <Close /> : <Menu />}
        </button>

        {/* Main Menu */}
        <ul className={`navbar-menu ${menuOpen ? "open" : ""}`}>
          <li><Link to="/">Accueil</Link></li>
          <li><a href="#apropos">Apropos</a></li>
          <li><a href="#nosservices">Nos données</a></li>
          {user?.role === "admin" && (
            <li><a href="https://dashboard.geoconsult-rdc.com">Dashboard</a></li>
          )}
          <li><a href="#contact">Contactez-nous</a></li>
        </ul>

        {/* User (Avatar / Login Buttons) */}
        <div className="navbar-user-container">
          {user ? (
            <div className="navbar-user">
              <div className="navbar-avatar" onClick={toggleDropdown}>
                {`${user.nom?.[0] ?? ""}${user.prenom?.[0] ?? ""}`.toUpperCase()}
              </div>

              <div className={`user-dropdown ${dropdownOpen ? "open" : ""}`}>
                <div onClick={() => navigate("/profile")}>Profil</div>
                <div className="logout" onClick={handleLogout}>Déconnecter</div>
              </div>
            </div>
          ) : (
            <div className="navbar-auth">
              <Link to="/register" className="btn-outline">Inscription</Link>
              <Link to="/login" className="btn-primary">Connexion</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
