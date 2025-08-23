import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.scss';

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ nom: '', email: '', phone: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError('');
    setFormData({ nom: '', email: '', phone: '', password: '' });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = isLogin 
        ? 'http://localhost:5000/api/auth/login' 
        : 'http://localhost:5000/api/auth/register';

      const payload = isLogin 
        ? { email: formData.email, password: formData.password } 
        : formData;

      const { data } = await axios.post(url, payload);
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data.message || 'Erreur serveur');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className={`form-container ${isLogin ? 'login-mode' : 'register-mode'}`}>
        <form className="auth-form" onSubmit={handleSubmit}>
          <h1>{isLogin ? 'Connexion' : 'Inscription'}</h1>

          {error && <div className="form-error">{error}</div>}

          {!isLogin && (
            <div className="form-group">
              <label>Nom</label>
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label>Téléphone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label>Mot de passe</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? <span className="loader"></span> : isLogin ? 'Se connecter' : 'S’inscrire'}
          </button>

          <p className="toggle-text">
            {isLogin ? "Pas de compte ?" : "Déjà un compte ?"}{' '}
            <span onClick={toggleForm}>{isLogin ? "Inscrivez-vous" : "Connectez-vous"}</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
