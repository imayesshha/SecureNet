import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, createContext, useContext, useState } from 'react';
import jwtDecode from 'jwt-decode'; // Note: Add to deps if needed
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import PasswordCheck from './components/PasswordCheck';
import URLScan from './components/URLScan';
import History from './components/History';
import { Shield, Lock, Eye, Link2, FileText } from 'lucide-react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch {
        logout();
      }
    }
  }, [token]);

  const login = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    navigate('/dashboard');
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    navigate('/');
  };

  const value = { token, user, login, logout };

  return (
    <AuthContext.Provider value={value}>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {user && <Navbar />}
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
            <Route path="/password-check" element={<Protected><PasswordCheck /></Protected>} />
            <Route path="/url-scan" element={<Protected><URLScan /></Protected>} />
            <Route path="/history" element={<Protected><History /></Protected>} />
          </Routes>
        </main>
      </div>
    </AuthContext.Provider>
  );
}

function Protected({ children }) {
  const { token, logout } = useAuth();
  useEffect(() => {
    if (!token) {
      window.location.href = '/login';
    }
  }, [token]);
  return token ? children : null;
}

function Home() {
  return (
    <div className="text-center py-24">
      <Shield className="w-24 h-24 mx-auto text-blue-400 mb-6 animate-pulse" />
      <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
        SecureNet
      </h1>
      <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
        Advanced security tools for password strength analysis, phishing detection, and scan history.
      </p>
      <div className="space-x-4">
        <a href="/login" className="btn-primary inline-flex items-center gap-2">
          <Lock size={20} />
          Get Started
        </a>
        <a href="/register" className="bg-white/10 border border-white/20 px-8 py-3 rounded-xl hover:bg-white/20 transition-all">
          Create Account
        </a>
      </div>
    </div>
  );
}

export default App;

