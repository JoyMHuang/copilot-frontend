import { useEffect, useState } from 'react';
import { ClockIcon } from '@heroicons/react/24/outline';
import TransactionApiService, { type TransactionListItem, type TransactionStatus as TransactionStatusType } from '../../services/transactionApi';
import { TransactionStatus as TransactionStatusConst } from '../../services/transactionApi';
import './TransactionHistory.css';

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState<TransactionListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchName, setSearchName] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | TransactionStatusType>('ALL');

  useEffect(() => {
    document.title = 'Transaction History - Manulife Investment Management';
    let mounted = true;
    (async () => {
      try {
        const data = await TransactionApiService.getTransactionList();
        if (mounted) setTransactions(data);
      } catch (e) {
        if (mounted) setError('加载交易列表失败');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const statusColor: Record<TransactionStatusType, string> = {
    Pending: '#f59e0b',
    Completed: '#10b981',
    Failed: '#ef4444',
  };

  const filteredTransactions = transactions.filter((t) => {
    const nameMatch = t.transactionName.toLowerCase().includes(searchName.trim().toLowerCase());
    const statusMatch = statusFilter === 'ALL' || t.status === statusFilter;
    return nameMatch && statusMatch;
  });

  return (
    <div className="transaction-container">
      <div className="transaction-content">
        <div className="transaction-header">
          <ClockIcon className="transaction-icon" />
          <h1 className="transaction-title">Transaction History</h1>
        </div>

        <div style={{ display: 'flex', gap: 12, marginBottom: 12, alignItems: 'center' }}>
          <input
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="搜索交易名称"
            className="transaction-card"
            style={{ padding: '8px 12px', outline: 'none' }}
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as 'ALL' | TransactionStatusType)}
            className="transaction-card"
            style={{ padding: '8px 12px' }}
          >
            <option value="ALL">全部状态</option>
            <option value={TransactionStatusConst.Pending}>Pending</option>
            <option value={TransactionStatusConst.Completed}>Completed</option>
            <option value={TransactionStatusConst.Failed}>Failed</option>
          </select>
        </div>

        {loading && (
          <div className="transaction-card">加载中...</div>
        )}
        {!loading && error && (
          <div className="transaction-card" style={{ color: '#ef4444' }}>{error}</div>
        )}
        {!loading && !error && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
            {filteredTransactions.map((t) => (
              <div key={t.id} className="transaction-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <div className="transaction-title" style={{ fontSize: 16 }}>{t.transactionName}</div>
                  <span style={{ fontSize: 12, padding: '2px 8px', borderRadius: 999, background: '#f3f4f6', color: statusColor[t.status] }}>
                    {t.status}
                  </span>
                </div>
                <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 8 }}>日期：{t.transactionDate}</div>
                <div style={{ fontSize: 14 }}>金额：{t.transactionAmount.toLocaleString()}</div>
                <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 8 }}>ID：{t.id}</div>
              </div>
            ))}
            {filteredTransactions.length === 0 && (
              <div className="transaction-card">暂无匹配的交易记录</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
