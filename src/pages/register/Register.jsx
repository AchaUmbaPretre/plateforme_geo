import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './../login/login.scss';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ nom: '', email: '', phone: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/register', formData);
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data.message || 'Erreur serveur');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <form className={`register-form ${loading ? 'loading' : ''}`} onSubmit={handleSubmit}>
        <h1>Inscription</h1>

        {error && <div className="form-error">{error}</div>}

        <div className="form-group">
          <label>Nom</label>
          <input type="text" name="nom" value={formData.nom} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Téléphone</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Mot de passe</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? <span className="loader"></span> : 'S’inscrire'}
        </button>
      </form>
    </div>
  );
};

export default Register;
