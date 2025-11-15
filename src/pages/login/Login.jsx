import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './login.scss';
import { loginUser, registerUser } from '../../services/auth.service';
import { useAuth } from '../../context/AuthContext';
import { UserOutlined, MailOutlined, PhoneOutlined, LockOutlined } from '@ant-design/icons';
import logo from "./../../assets/logo.jpeg";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ nom: '', email: '', phone: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const firstInputRef = useRef(null);

  useEffect(() => {
    if (firstInputRef.current) firstInputRef.current.focus();
  }, [isLogin]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const toggleForm = () => {
    setIsLogin(prev => !prev);
    setError('');
    setFormData({ nom: '', email: '', phone: '', password: '' });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : formData;

      const { data } = isLogin
        ? await loginUser(payload)
        : await registerUser(payload);

      if (isLogin) {
        if (data?.token && data?.user) {
          login(data.user, data.token);
          toast.success("Connexion réussie !");
          navigate("/");
        } else {
          throw new Error("Token non reçu du serveur");
        }
      } else {
        setIsLogin(true);
        setFormData({ nom: '', email: '', phone: '', password: '' });
        toast.success("Compte créé avec succès ! Connectez-vous maintenant.");
      }

    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Erreur serveur.');
      toast.error(err.response?.data?.message || err.message || 'Erreur serveur.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className={`form-container ${isLogin ? 'login-mode' : 'register-mode'}`}>
        <form className="auth-form" onSubmit={handleSubmit}>
          
          {/* Logo en haut du formulaire */}
          <div className="logo-container">
            <img src={logo} alt="Logo" />
          </div>

          <h1>{isLogin ? 'Connexion' : 'Inscription'}</h1>

          {error && <div className="form-error">{error}</div>}

          {!isLogin && (
            <div className="form-group">
              <label>Nom</label>
              <div className="input-wrapper">
                <UserOutlined className="icon" />
                <input
                  ref={firstInputRef}
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  placeholder="Votre nom"
                  required
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label>Email</label>
            <div className="input-wrapper">
              <MailOutlined className="icon" />
              <input
                ref={isLogin ? firstInputRef : null}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Votre email"
                required
              />
            </div>
          </div>

          {!isLogin && (
            <div className="form-group">
              <label>Téléphone</label>
              <div className="input-wrapper">
                <PhoneOutlined className="icon" />
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Votre téléphone"
                  required
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label>Mot de passe</label>
            <div className="input-wrapper">
              <LockOutlined className="icon" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Mot de passe"
                required
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className="login-btn">
            {loading ? <span className="loader"></span> : isLogin ? 'Se connecter' : 'S’inscrire'}
          </button>

          <p className="toggle-text">
            {isLogin ? "Pas de compte ?" : "Déjà un compte ?"}{' '}
            <span onClick={toggleForm}>
              {isLogin ? "Inscrivez-vous" : "Connectez-vous"}
            </span>
          </p>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Login;
