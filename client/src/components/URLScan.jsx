import { useState } from 'react';
import { useAuth } from '../App';
import axios from 'axios';
import { Link2, ShieldCheck, AlertCircle, CheckCircle2, Clock } from 'lucide-react';

export default function URLScan() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const scanURL = async () => {
    if (!url) return;
    setLoading(true);
    try {
      const res = await axios.post('/api/check-url', { url }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setResult({ risk: 'high', message: 'Error scanning URL' });
    }
    setLoading(false);
  };

  const getRiskIcon = (risk) => {
    if (risk === 'low') return <CheckCircle2 className="w-16 h-16 text-green-400" />;
    if (risk === 'medium') return <ShieldCheck className="w-16 h-16 text-yellow-400" />;
    return <AlertCircle className="w-16 h-16 text-red-400" />;
  };

  const getRiskColor = (risk) => {
    if (risk === 'low') return 'text-green-400 bg-green-500/20 border-green-500/50';
    if (risk === 'medium') return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/50';
    return 'text-red-400 bg-red-500/20 border-red-500/50';
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card mb-12">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
          Phishing URL Scanner
        </h1>
        <div className="space-y-6">
          <div>
            <label className="block text-lg font-semibold mb-4">Enter URL to scan</label>
            <div className="flex gap-4">
              <input 
                type="url" 
                className="input-field flex-1" 
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <button 
                onClick={scanURL}
                disabled={loading || !url}
                className="btn-primary px-8 whitespace-nowrap"
              >
                {loading ? 'Scanning...' : 'Scan URL'}
              </button>
            </div>
          </div>
          
          {result && (
            <div className={`p-8 rounded-2xl border-4 ${getRiskColor(result.risk)}`}>
              <div className="flex items-start gap-6 mb-6">
                <div className="flex-shrink-0">
                  {getRiskIcon(result.risk)}
                </div>
                <div className="flex-1">
                  <div className={`text-2xl font-bold ${getRiskColor(result.risk)} mb-2 uppercase tracking-wide`}>
                    {result.risk === 'low' && 'Safe'}
                    {result.risk === 'medium' && 'Suspicious'}
                    {result.risk === 'high' && 'Dangerous'}
                  </div>
                  <div className="text-gray-300 mb-4">{result.message}</div>
                  {result.reason && (
                    <div className="flex items-center gap-2 bg-gray-800/50 p-3 rounded-xl">
                      <Clock size={20} />
                      <span>Reason: {result.reason}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
