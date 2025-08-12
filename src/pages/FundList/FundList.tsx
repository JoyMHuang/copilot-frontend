import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FundApiService from '../../services/fundApi';
import type { FundDto } from '../../types';

const FundList: React.FC = () => {
  const [funds, setFunds] = useState<FundDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currencyFilter, setCurrencyFilter] = useState('');

  useEffect(() => {
    FundApiService.getFundList()
      .then(setFunds)
      .catch(() => setError('加载基金列表失败'))
      .finally(() => setLoading(false));
  }, []);

  const currencyOptions = Array.from(new Set(funds.map(f => f.currencyCode)));

  const filteredFunds = funds.filter(fund =>
    (currencyFilter === '' || fund.currencyCode === currencyFilter) &&
    (fund.fundName.includes(searchTerm) || fund.code.includes(searchTerm))
  );

  if (loading) return <div>加载中...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <div style={{ marginBottom: 20, display: 'flex', gap: 16 }}>
        <input
          type="text"
          placeholder="搜索基金名称或代码"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ padding: 8, width: 260, borderRadius: 4, border: '1px solid #ccc' }}
        />
        <select
          value={currencyFilter}
          onChange={e => setCurrencyFilter(e.target.value)}
          style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc', width: 120 }}
        >
          <option value="">全部币种</option>
          {currencyOptions.map(code => (
            <option key={code} value={code}>{code}</option>
          ))}
        </select>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
        {filteredFunds.map(fund => (
          <div key={fund.id} style={{ border: '1px solid #eee', borderRadius: 8, padding: 16, width: 260, boxShadow: '0 2px 8px #f0f1f2' }}>
            <h3>
              <Link to={`/fund/${fund.id}`} style={{ color: '#1677ff', textDecoration: 'underline' }}>
                {fund.fundName}
              </Link>
              <span style={{ color: '#888', fontSize: 14 }}>({fund.code})</span>
            </h3>
            <div>单位净值：{fund.unitPrice}</div>
            <div>净值日期：{fund.priceDate}</div>
            <div>涨跌：<span style={{ color: fund.navChange >= 0 ? 'green' : 'red' }}>{fund.navChange} ({fund.navChangePercent}%)</span></div>
            <div>币种：{fund.currencyCode}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FundList;
