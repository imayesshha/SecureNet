import { useState } from 'react';
import { useAuth } from '../App';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Mail, Lock, User, Shield } from 'lucide-react';

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('/api/register', formData);
      login(res.data.token);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto card animate-fade-in">
      <div className="text-center mb-8">
        <Shield className="w-16 h-16 mx-auto text-green-400 mb-4" />
        <h2 className="text-3xl font-bold mb-2">Create Account</h2>
        <p className="text-gray-400">Join SecureNet today</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">Full Name</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              className="input-field pl-12" 
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required 
            />
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">Email</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="email" 
              className="input-field pl-12" 
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required 
            />
          </div>
        </div>
        <div className="mb-8">
          <label className="block text-sm font-semibold mb-2">Password</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="password" 
              className="input-field pl-12" 
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              minLength={6}
              required 
            />
          </div>
        </div>
        {error && <div className="bg-red-500/20 border border-red-500/50 text-red-300 p-4 rounded-xl mb-6">{error}</div>}
        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? 'Creating...' : 'Create Account'}
        </button>
      </form>
      <p className="text-center mt-6 text-gray-400">
        Already have an account? <a href="/login" className="text-blue-400 hover:text-blue-300 font-semibold">Sign in</a>
      </p>
    </div>
  );
}
