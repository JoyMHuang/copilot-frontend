import { useEffect } from 'react';
import { ChartBarIcon } from '@heroicons/react/24/outline';
import './FundList.css';
import { useFunds } from '../../hooks/useCustomerData';

export default function FundList() {
  // 添加页面标识
  useEffect(() => {
    document.title = 'Fund List - Manulife Investment Management';
  }, []);

  const { funds, loading, error } = useFunds();

  return (
    <div className="fundlist-container">
      <div className="fundlist-content">
        <div className="fundlist-header">
          <ChartBarIcon className="fundlist-icon" />
          <h1 className="fundlist-title">Fund List</h1>
        </div>
        
        <div className="fundlist-card">
          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading funds...</div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">Error: {error}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900">Fund Name</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900">Code</th>
                    <th className="px-4 py-2 text-right text-sm font-semibold text-gray-900">Unit Price</th>
                    <th className="px-4 py-2 text-right text-sm font-semibold text-gray-900">Currency</th>
                    <th className="px-4 py-2 text-right text-sm font-semibold text-gray-900">Price Date</th>
                    <th className="px-4 py-2 text-right text-sm font-semibold text-gray-900">Change</th>
                  </tr>
                </thead>
                <tbody>
                  {funds.map(fund => (
                    <tr key={fund.id} className="border-t">
                      <td className="px-4 py-2 text-sm text-gray-900">{fund.fundName}</td>
                      <td className="px-4 py-2 text-sm text-gray-500">{fund.code}</td>
                      <td className="px-4 py-2 text-sm text-right text-gray-900">{fund.unitPrice.toFixed(2)}</td>
                      <td className="px-4 py-2 text-sm text-right text-gray-500">{fund.currencyCode}</td>
                      <td className="px-4 py-2 text-sm text-right text-gray-500">{new Date(fund.priceDate).toLocaleDateString()}</td>
                      <td className="px-4 py-2 text-sm text-right">
                        <span className={fund.navChange >= 0 ? 'text-green-600' : 'text-red-500'}>
                          {fund.navChange >= 0 ? '+' : ''}{fund.navChange.toFixed(2)} ({fund.navChangePercent.toFixed(2)}%)
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
