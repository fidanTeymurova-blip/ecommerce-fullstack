import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const res = await api.post('/auth/login', { email, password });
      login(res.data);
      navigate('/');
    } catch {
      setError('Email və ya şifrə yanlışdır.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Giriş</h2>
        <p className="auth-subtitle">Hesabınıza daxil olun</p>
        {error && <div className="auth-error">{error}</div>}
        <form onSubmit={handleSubmit} className="auth-form">
          <input placeholder="Email" type="email" value={email}
            onChange={e => setEmail(e.target.value)} required />
          <input placeholder="Şifrə" type="password" value={password}
            onChange={e => setPassword(e.target.value)} required />
          <button type="submit" className="btn-primary full" disabled={loading}>
            {loading ? 'Yüklənir...' : 'Daxil ol'}
          </button>
        </form>
        <p className="auth-link">Hesabınız yoxdur? <Link to="/register">Qeydiyyat</Link></p>
      </div>
    </div>
  );
};