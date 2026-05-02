import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export const RegisterPage = () => {
  const [fullName, setFullName] = useState('');
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
      const res = await api.post('/auth/register', { fullName, email, password });
      login(res.data);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data || 'Xəta baş verdi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Qeydiyyat</h2>
        <p className="auth-subtitle">Yeni hesab yaradın</p>
        {error && <div className="auth-error">{error}</div>}
        <form onSubmit={handleSubmit} className="auth-form">
          <input placeholder="Ad Soyad" value={fullName}
            onChange={e => setFullName(e.target.value)} required />
          <input placeholder="Email" type="email" value={email}
            onChange={e => setEmail(e.target.value)} required />
          <input placeholder="Şifrə (min 6)" type="password" value={password}
            onChange={e => setPassword(e.target.value)} required minLength={6} />
          <button type="submit" className="btn-primary full" disabled={loading}>
            {loading ? 'Yüklənir...' : 'Qeydiyyatdan keç'}
          </button>
        </form>
        <p className="auth-link">Hesabınız var? <Link to="/login">Giriş</Link></p>
      </div>
    </div>
  );
};