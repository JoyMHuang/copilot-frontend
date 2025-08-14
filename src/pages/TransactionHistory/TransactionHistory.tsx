import { useEffect, useState } from 'react';
import { ClockIcon } from '@heroicons/react/24/outline';
import { useTransactions } from '../../hooks/useCustomerData';
import type { Transaction } from '../../types';
import './TransactionHistory.css';

export default function TransactionHistory() {
  // 添加页面标识
  useEffect(() => {
    document.title = 'Transaction History - Manulife Investment Management';
  }, []);

  // customerId筛选功能
  const [customerId, setCustomerId] = useState('');
  const { transactions, loading, error } = useTransactions(customerId);

  // 按类型分组
  const grouped = transactions.reduce<Record<string, Transaction[]>>((acc, txn) => {
    acc[txn.type] = acc[txn.type] || [];
    acc[txn.type].push(txn);
    return acc;
  }, {});

  return (
    <div className="transaction-container">
      <div className="transaction-content">
        <div className="transaction-header">
          <ClockIcon className="transaction-icon" />
          <h1 className="transaction-title">Transaction History</h1>
        </div>
        <div className="mb-4 flex items-center gap-2">
          <label htmlFor="customerId" className="text-sm font-medium text-gray-700">Customer ID:</label>
          <input
            id="customerId"
            type="text"
            value={customerId}
            onChange={e => setCustomerId(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-manulife-green"
            placeholder="Enter Customer ID"
          />
        </div>
        <div className="transaction-card">
          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading transactions...</div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">Error: {error}</div>
          ) : (
            Object.entries(grouped).map(([type, txns]) => (
              <div key={type} className="mb-8">
                <h2 className="text-lg font-semibold text-manulife-green mb-2">{type} Transactions</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white rounded-lg shadow-sm">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900">Transaction ID</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900">Type</th>
                        <th className="px-4 py-2 text-right text-sm font-semibold text-gray-900">Amount</th>
                        <th className="px-4 py-2 text-right text-sm font-semibold text-gray-900">Date</th>
                        <th className="px-4 py-2 text-right text-sm font-semibold text-gray-900">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {txns.map(txn => (
                        <tr key={txn.id} className="border-t">
                          <td className="px-4 py-2 text-sm text-gray-900">{txn.id}</td>
                          <td className="px-4 py-2 text-sm text-gray-900">{txn.type}</td>
                          <td className="px-4 py-2 text-sm text-right text-gray-900">{txn.amount.toFixed(2)}</td>
                          <td className="px-4 py-2 text-sm text-right text-gray-500">{new Date(txn.date).toLocaleDateString()}</td>
                          <td className="px-4 py-2 text-sm text-right">
                            <span className={
                              txn.status === 'Completed' ? 'text-green-600' : txn.status === 'Pending' ? 'text-yellow-500' : 'text-red-500'
                            }>
                              {txn.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
