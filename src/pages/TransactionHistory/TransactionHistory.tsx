import { ClockIcon } from '@heroicons/react/24/outline';
import './TransactionHistory.css';

export default function TransactionHistory() {
  return (
    <div className="transaction-container">
      <div className="transaction-content">
        <div className="transaction-header">
          <ClockIcon className="transaction-icon" />
          <h1 className="transaction-title">Transaction History</h1>
        </div>
        
        <div className="transaction-card">
          <div className="transaction-placeholder">
            <ClockIcon className="transaction-placeholder-icon" />
            <h3 className="transaction-placeholder-title">Transaction History</h3>
            <p className="transaction-placeholder-description">
              交易历史页面内容将在这里显示。包括交易记录、状态和详细信息。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
