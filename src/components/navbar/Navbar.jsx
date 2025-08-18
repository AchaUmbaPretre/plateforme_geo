import "./navbar.scss";
import { Link } from "react-router-dom";
import { Menu } from "@mui/icons-material";
import { useEffect, useState } from "react";
import logo from './../../assets/logo.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScroll = () => setIsScrolled(window.scrollY > 0);
  const toggleMenu = () => setMenuOpen(prev => !prev);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar`}>
      <div className="navbar-wrapper">
        <img src={logo} alt="Logo" className="navbar-logo" />
        <div className="navbar-right">
          <Menu
            className="navbar-bar"
            onClick={toggleMenu}
            aria-label="Menu"
          />
          <ul className={`navbar-ul ${menuOpen ? "navbarOpen" : ""}`}>
            <li className="navbar-li">
              <Link to="/" className="navbar-link">Accueil</Link>
            </li>
            <li className="navbar-li">
              <Link to="/donnees" className="navbar-link">Données</Link>
            </li>
            <li className="navbar-li">
              <Link to="/login" className="navbar-link">Se connecter</Link>
            </li>
            <li className="navbar-li">
              <Link to="/register" className="navbar-link">Créer un compte</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
