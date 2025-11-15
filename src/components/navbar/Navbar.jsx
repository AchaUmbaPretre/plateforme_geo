import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/logo.jpeg";
import "./navbar.scss";

/* Ant Design Icons */
import {
  HomeOutlined,
  InfoCircleOutlined,
  EnvironmentOutlined,
  DashboardOutlined,
  PhoneOutlined,
  MenuOutlined,
  CloseOutlined,
  UserAddOutlined
} from "@ant-design/icons";

// Navigation items
const navItems = (isAdmin) => [
  { key: "home", label: "Accueil", to: "/", icon: <HomeOutlined /> },
  { key: "apropos", label: "Apropos", to: "#apropos", icon: <InfoCircleOutlined /> },
  { key: "services", label: "Nos données", to: "#nosservices", icon: <EnvironmentOutlined /> },
  ...(isAdmin ? [{ key: "dashboard", label: "Dashboard", to: "https://dashboard.geoconsult-rdc.com", icon: <DashboardOutlined /> }] : []),
  { key: "contact", label: "Contactez-nous", to: "#contact", icon: <PhoneOutlined /> },
];

// Framer Motion variants
const drawerVariants = {
  hidden: { x: "-100%" },
  visible: { x: 0, transition: { type: "tween", duration: 0.28 } },
  exit: { x: "-100%", transition: { type: "tween", duration: 0.22 } },
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

const Navbar = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const items = navItems(user?.role === "admin");

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-wrapper">
        {/* LOGO */}
        <Link to="/" className="navbar-logo" onClick={() => setMenuOpen(false)}>
          <img src={logo} alt="Logo" />
        </Link>

        {/* HAMBURGER */}
        <button
          className="navbar-bar"
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {menuOpen ? <CloseOutlined /> : <MenuOutlined />}
        </button>

        {/* DESKTOP MENU */}
        <ul className="navbar-menu-desktop">
          {items.map(i => (
            <li key={i.key}>
              {i.to.startsWith("http") ? (
                <a href={i.to} className="nav-link" target="_blank" rel="noopener noreferrer">{i.label}</a>
              ) : (
                <a href={i.to} className="nav-link">{i.label}</a>
              )}
            </li>
          ))}
        </ul>

        {/* USER */}
        <div className="navbar-user-container">
          {user ? (
            <div className="navbar-user">
              <div
                className="navbar-avatar"
                onClick={() => setDropdownOpen(prev => !prev)}
                role="button"
                aria-label="Ouvrir le menu utilisateur"
              >
                {`${user.nom?.[0] ?? ""}${user.prenom?.[0] ?? ""}`.toUpperCase()}
              </div>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    className="user-dropdown"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.16 }}
                  >
                    <div className="dropdown-item" onClick={() => { navigate("/profile"); setDropdownOpen(false); }}>
                      Profil
                    </div>
                    <div className="dropdown-item logout-btn" onClick={handleLogout}>
                      Déconnecter
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="navbar-auth">
              <button className="btn-auth" onClick={() => navigate('/login')}>
                <UserAddOutlined style={{ marginRight: 8, fontSize: 16 }} />
                Inscription / Connexion
              </button>
            </div>
          )}
        </div>
      </div>

      {/* SIDE DRAWER + OVERLAY (mobile & tablette) */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* overlay */}
            <motion.div
              className="drawer-overlay"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={overlayVariants}
              onClick={() => setMenuOpen(false)}
            />

            {/* drawer */}
            <motion.aside
              className="navbar-drawer"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={drawerVariants}
            >
              <div className="drawer-header">
                <Link to="/" onClick={() => setMenuOpen(false)}>
                  <img src={logo} alt="Logo" />
                </Link>
                <button className="drawer-close" onClick={() => setMenuOpen(false)} aria-label="Fermer">
                  <CloseOutlined />
                </button>
              </div>

              <nav className="drawer-nav">
                {items.map(i => (
                  <a
                    key={i.key}
                    href={i.to}
                    className="drawer-item"
                    onClick={() => setMenuOpen(false)}
                    target={i.to.startsWith("http") ? "_blank" : undefined}
                    rel={i.to.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    <span className="icon">{i.icon}</span>
                    <span className="label">{i.label}</span>
                  </a>
                ))}
              </nav>

              <div className="drawer-footer">
                {user ? (
                  <>
                    <div className="drawer-action" onClick={() => { navigate("/profile"); setMenuOpen(false); }}>
                      Profil
                    </div>
                    <div className="drawer-action logout" onClick={() => { handleLogout(); setMenuOpen(false); }}>
                      Déconnecter
                    </div>
                  </>
                ) : (
                  <div className="drawer-auth-section">
                    <button className="drawer-auth-btn" onClick={() => { navigate('/login'); setMenuOpen(false); }}>
                      Inscription / Connexion
                    </button>
                  </div>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
