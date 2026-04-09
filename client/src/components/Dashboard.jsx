import { Link } from 'react-router-dom';
import { BarChart3, Eye, Link2, FileText, Shield } from 'lucide-react';
import { useAuth } from '../App';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
          Dashboard
        </h1>
        <p className="text-xl text-gray-300">Welcome back, {user?.name || user?.email}</p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Link to="/password-check" className="card group hover:scale-105">
          <Eye className="w-12 h-12 text-blue-400 mx-auto mb-4 group-hover:rotate-12 transition-transform" />
          <h3 className="text-2xl font-bold mb-2 text-center">Password Strength</h3>
          <p className="text-gray-400 text-center mb-6">Analyze password complexity and get improvement suggestions</p>
          <div className="text-center">
            <span className="btn-primary inline-flex items-center gap-2 px-8 py-3 rounded-xl">
              Check Password
            </span>
          </div>
        </Link>

        <Link to="/url-scan" className="card group hover:scale-105">
          <Link2 className="w-12 h-12 text-green-400 mx-auto mb-4 group-hover:rotate-12 transition-transform" />
          <h3 className="text-2xl font-bold mb-2 text-center">URL Scanner</h3>
          <p className="text-gray-400 text-center mb-6">Detect phishing links and malicious domains instantly</p>
          <div className="text-center">
            <span className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all group-hover:-translate-y-1">
              Scan URL
            </span>
          </div>
        </Link>

        <Link to="/history" className="card group hover:scale-105">
          <FileText className="w-12 h-12 text-purple-400 mx-auto mb-4 group-hover:rotate-12 transition-transform" />
          <h3 className="text-2xl font-bold mb-2 text-center">Scan History</h3>
          <p className="text-gray-400 text-center mb-6">View all your previous scans and results</p>
          <div className="text-center">
            <span className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all group-hover:-translate-y-1">
              View History
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
