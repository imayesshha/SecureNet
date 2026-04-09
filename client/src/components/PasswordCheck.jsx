import { useState } from 'react';
import { useAuth } from '../App';
import axios from 'axios';
import { Eye, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';

export default function PasswordCheck() {
  const [password, setPassword] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const checkPassword = async () => {
    if (!password) return;
    setLoading(true);
    try {
      const res = await axios.post('/api/check-password', { password }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setResult({ score: 0, message: 'Error checking password' });
    }
    setLoading(false);
  };

  const getStrengthColor = (score) => {
    if (score >= 80) return 'text-green-400 bg-green-500/20';
    if (score >= 60) return 'text-yellow-400 bg-yellow-500/20';
    if (score >= 40) return 'text-orange-400 bg-orange-500/20';
    return 'text-red-400 bg-red-500/20';
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card mb-12">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Password Strength Analyzer
        </h1>
        <div className="space-y-6">
          <div>
            <label className="block text-lg font-semibold mb-4">Enter password to analyze</label>
            <div className="relative">
              <input 
                type="password" 
                className="input-field text-lg" 
                placeholder="Type your password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button 
                onClick={checkPassword}
                disabled={loading || !password}
                className="absolute right-4 top-1/2 -translate-y-1/2 btn-primary px-6 py-2"
              >
                {loading ? 'Analyzing...' : 'Check'}
              </button>
            </div>
          </div>
          
          {result && (
            <div className={`p-8 rounded-2xl border-4 ${getStrengthColor(result.score)} animate-fade-in`}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  {result.score >= 80 && <CheckCircle2 className="w-12 h-12 text-green-400" />}
                  {result.score >= 60 && result.score < 80 && <AlertTriangle className="w-12 h-12 text-yellow-400" />}
                  {result.score < 60 && <XCircle className="w-12 h-12 text-red-400" />}
                  <div>
                    <div className={`text-3xl font-bold ${getStrengthColor(result.score)}`}>
                      {result.score}/100
                    </div>
                    <div className="text-sm text-gray-400 uppercase tracking-wide font-semibold">
                      Strength Score
                    </div>
                  </div>
                </div>
                <div className="w-48 bg-gray-700 rounded-full h-4">
                  <div 
                    className={`h-4 rounded-full ${getStrengthColor(result.score)} transition-all duration-1000`}
                    style={{ width: `${result.score}%` }}
                  />
                </div>
              </div>
              <div className="text-lg mb-4">{result.message}</div>
              {result.suggestions && (
                <ul className="space-y-2 text-sm">
                  {result.suggestions.map((suggestion, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-300">
                      <CheckCircle2 size={16} className="text-green-400 flex-shrink-0" />
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
