import { useState, useEffect } from 'react';
import { useAuth } from '../App';
import axios from 'axios';
import { FileText, Clock, Eye, Trash2 } from 'lucide-react';
import { ShieldCheck, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function History() {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await axios.get('/api/history', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setScans(res.data.scans || []);
    } catch (err) {
      console.error('History fetch error:', err);
    }
    setLoading(false);
  };

  const deleteScan = async (id) => {
    if (!confirm('Delete this scan?')) return;
    try {
      await axios.delete(`/api/history/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchHistory();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-12">
        <FileText className="w-12 h-12 text-purple-400" />
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
          Scan History
        </h1>
      </div>

      {scans.length === 0 ? (
        <div className="text-center py-24 card opacity-50">
          <FileText className="w-24 h-24 mx-auto text-gray-500 mb-6" />
          <h3 className="text-2xl font-bold mb-2 text-gray-400">No scans yet</h3>
          <p className="text-gray-500 mb-8">Your scan history will appear here.</p>
          <a href="/dashboard" className="btn-primary inline-flex items-center gap-2 mx-auto">
            Start Scanning
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {scans.map((scan) => (
            <div key={scan._id} className="card group hover:scale-[1.02] transition-all">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4 flex-1">
                  {scan.type === 'password' ? (
                    <Eye className="w-12 h-12 text-blue-400 flex-shrink-0" />
                  ) : (
                    <Link2 className="w-12 h-12 text-green-400 flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                        scan.risk === 'low' ? 'bg-green-500/20 text-green-400' :
                        scan.risk === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {scan.type === 'password' ? `${scan.score}/100` : scan.risk?.toUpperCase()}
                      </div>
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-500">
                        {new Date(scan.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold truncate">{scan.input || scan.url}</h3>
                    <p className="text-gray-400">{scan.message || scan.result}</p>
                  </div>
                </div>
                <button 
                  onClick={() => deleteScan(scan._id)}
                  className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                  title="Delete scan"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
