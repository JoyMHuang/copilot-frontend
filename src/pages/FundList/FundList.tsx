import React, { useEffect, useState } from 'react';
import { ChartBarIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import FundListApiService from '../../services/fundApi';
import type { FundDto } from '../../services/fundApi';
import './FundList.css';

export default function FundList() {
  // 添加页面标识
  useEffect(() => {
    document.title = 'Fund List - Manulife Investment Management';
  }, []);

  const [funds, setFunds] = useState<FundDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const navigate = useNavigate();

  // 提取所有唯一币种
  const currencyOptions = Array.from(new Set(funds.map(f => f.currencyCode)));

  // 过滤后的基金列表
  const filteredFunds = funds.filter(fund =>
    (fund.fundName.toLowerCase().includes(search.toLowerCase()) ||
      fund.code.toLowerCase().includes(search.toLowerCase())) &&
    (selectedCurrency === '' || fund.currencyCode === selectedCurrency)
  );

  useEffect(() => {
    FundListApiService.getFundList()
      .then(data => {
        setFunds(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch fund list');
        setLoading(false);
      });
  }, []);

  return (
    <div className="fundlist-container">
      <div className="fundlist-content">
        <div className="fundlist-header">
          <ChartBarIcon className="fundlist-icon" />
          <h1 className="fundlist-title">Fund List</h1>
        </div>
        <div style={{ marginBottom: 20 }}>
          <input
            type="text"
            placeholder="Search by Fund Name or Code"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ padding: '8px', width: '300px', borderRadius: 4, border: '1px solid #ccc', marginRight: '16px' }}
          />
          <select
            value={selectedCurrency}
            onChange={e => setSelectedCurrency(e.target.value)}
            style={{ padding: '8px', borderRadius: 4, border: '1px solid #ccc', width: '150px' }}
          >
            <option value="">All Currency</option>
            {currencyOptions.map(code => (
              <option key={code} value={code}>{code}</option>
            ))}
          </select>
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <div className="fundlist-card-group">
            {filteredFunds.map(fund => (
              <div key={fund.id} className="fundlist-card" style={{ position: 'relative' }}>
                <button
                  style={{ position: 'absolute', top: 12, right: 12, background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4, padding: '6px 12px', cursor: 'pointer', fontSize: 14, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
                  onClick={() => navigate(`/fund-detail/${fund.id}`)}
                >
                  View Detail
                </button>
                <h3>{fund.fundName}</h3>
                <p>Code: {fund.code}</p>
                <p>Unit Price: {fund.unitPrice} {fund.currencyCode}</p>
                <p>Price Date: {fund.priceDate}</p>
                <p>NAV Change: {fund.navChange}</p>
                <p>NAV Change Percent: {fund.navChangePercent}%</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
