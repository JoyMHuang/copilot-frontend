import { useState } from 'react';
import { CustomerApiService } from '../services/customerApi';
import type { PortfolioData, WealthSpecialist } from '../types';

export default function SeparateApiTest() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [wealthSpecialist, setWealthSpecialist] = useState<WealthSpecialist | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testPortfolioApi = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('🧪 Testing Portfolio API...');
      const data = await CustomerApiService.getPortfolioData('C000027106');
      setPortfolioData(data);
      console.log('✅ Portfolio API Response:', data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      console.error('❌ Portfolio API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const testWealthSpecialistApi = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('🧪 Testing Wealth Specialist API...');
      const data = await CustomerApiService.getWealthSpecialist('C000027106');
      setWealthSpecialist(data);
      console.log('✅ Wealth Specialist API Response:', data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      console.error('❌ Wealth Specialist API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const testBothApis = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('🧪 Testing Both APIs simultaneously...');
      const [portfolio, specialist] = await Promise.all([
        CustomerApiService.getPortfolioData('C000027106'),
        CustomerApiService.getWealthSpecialist('C000027106')
      ]);
      setPortfolioData(portfolio);
      setWealthSpecialist(specialist);
      console.log('✅ Both APIs completed successfully');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      console.error('❌ API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">分离API接口测试</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <button 
          onClick={testPortfolioApi}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? '测试中...' : '📊 测试Portfolio API'}
        </button>

        <button 
          onClick={testWealthSpecialistApi}
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
        >
          {loading ? '测试中...' : '👨‍💼 测试Wealth Specialist API'}
        </button>

        <button 
          onClick={testBothApis}
          disabled={loading}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 disabled:opacity-50"
        >
          {loading ? '测试中...' : '🚀 同时测试两个API'}
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <h3 className="font-bold">错误:</h3>
          <p>{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Portfolio Data */}
        <div className="bg-white border rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-blue-600">📊 Portfolio Data</h2>
          {portfolioData ? (
            <div className="space-y-3">
              <div><strong>ID:</strong> {portfolioData.id}</div>
              <div><strong>CIF:</strong> {portfolioData.cifNumber}</div>
              <div><strong>总市值:</strong> PHP {portfolioData.totalValue.toLocaleString()}</div>
              <div><strong>风险等级:</strong> {portfolioData.riskProfile}</div>
              <div><strong>资产配置:</strong></div>
              <ul className="ml-4 space-y-1">
                {portfolioData.allocations.map((allocation, index) => (
                  <li key={index} className="text-sm">
                    • {allocation.name}: {allocation.percentage}% 
                    (PHP {allocation.amount.toLocaleString()})
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-gray-500">暂无数据，请点击测试按钮</p>
          )}
        </div>

        {/* Wealth Specialist Data */}
        <div className="bg-white border rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-green-600">👨‍💼 Wealth Specialist</h2>
          {wealthSpecialist ? (
            <div className="space-y-3">
              <div><strong>姓名:</strong> {wealthSpecialist.name}</div>
              <div><strong>邮箱:</strong> {wealthSpecialist.email}</div>
              <div><strong>电话:</strong> {wealthSpecialist.phone}</div>
            </div>
          ) : (
            <p className="text-gray-500">暂无数据，请点击测试按钮</p>
          )}
        </div>
      </div>

      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
        <h3 className="font-bold text-yellow-800 mb-2">💡 测试说明</h3>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• Dashboard页面现在使用两个独立的API调用</li>
          <li>• 每个API都有独立的缓存机制</li>
          <li>• 可以并行请求提高性能</li>
          <li>• 不再调用transactions接口，减少不必要的请求</li>
        </ul>
      </div>
    </div>
  );
}
