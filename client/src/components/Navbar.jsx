import { useAuth } from '../App';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, LogOut, BarChart3, FileText, Eye, Link2 } from 'lucide-react';

export default function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white/5 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/dashboard" className="flex items-center gap-3 text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            <Shield size={32} />
            SecureNet
          </Link>
          <div className="flex items-center gap-6">
            <Link to="/password-check" className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-white/10 transition-all">
              <Eye size={20} />
              Password
            </Link>
            <Link to="/url-scan" className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-white/10 transition-all">
              <Link2 size={20} />
              URL Scan
            </Link>
            <Link to="/history" className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-white/10 transition-all">
              <FileText size={20} />
              History
            </Link>
            <button onClick={handleLogout} className="flex items-center gap-2 px-6 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-xl transition-all">
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
