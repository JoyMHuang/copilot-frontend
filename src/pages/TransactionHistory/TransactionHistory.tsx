import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClockIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { mockTransactions } from '../../data/mockData';
import './TransactionHistory.css';

export default function TransactionHistory() {
  useEffect(() => {
    document.title = 'Transaction History - Manulife Investment Management';
  }, []);

  const navigate = useNavigate();

  return (
    <div className="transaction-container">
      <div className="transaction-content">
        <div className="transaction-header">
          <ClockIcon className="transaction-icon" />
          <h1 className="transaction-title">Transaction History</h1>
        </div>
        <div className="transaction-card">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {mockTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => navigate(`/transaction-history/${tx.id}`)}>
                  <td className="px-4 py-2">{tx.type}</td>
                  <td className="px-4 py-2">${tx.amount.toLocaleString()}</td>
                  <td className="px-4 py-2">{tx.date}</td>
                  <td className="px-4 py-2">{tx.status}</td>
                  <td className="px-4 py-2 text-green-600"><ArrowRightIcon className="w-4 h-4 inline" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
