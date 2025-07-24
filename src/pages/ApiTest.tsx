import { useState } from 'react';
import { CustomerApiService, type DashboardData } from '../services/customerApi';

export default function ApiTest() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testApi = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await CustomerApiService.getDashboardData('C000027106');
      setDashboardData(data);
      console.log('API Response:', data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">API测试页面</h1>
      
      <button 
        onClick={testApi}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? '测试中...' : '测试API'}
      </button>

      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <h3 className="font-bold">错误:</h3>
          <p>{error}</p>
        </div>
      )}

      {dashboardData && (
        <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          <h3 className="font-bold">API响应成功:</h3>
          <pre className="mt-2 text-sm overflow-auto">
            {JSON.stringify(dashboardData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
