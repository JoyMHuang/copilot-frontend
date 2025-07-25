import { useEffect } from 'react';
import { ChartBarIcon } from '@heroicons/react/24/outline';
import './FundList.css';

export default function FundList() {
  // 添加页面标识
  useEffect(() => {
    document.title = 'Fund List - Manulife Investment Management';
  }, []);

  return (
    <div className="fundlist-container">
      <div className="fundlist-content">
        <div className="fundlist-header">
          <ChartBarIcon className="fundlist-icon" />
          <h1 className="fundlist-title">Fund List</h1>
        </div>
        
        <div className="fundlist-card">
          <div className="fundlist-placeholder">
            <ChartBarIcon className="fundlist-placeholder-icon" />
            <h3 className="fundlist-placeholder-title">Fund List</h3>
            <p className="fundlist-placeholder-description">
              基金列表页面内容将在这里显示。包括基金搜索、筛选和详细信息。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
