import { useEffect, useState } from 'react';
import { ChartBarIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import FundApiService from '../../services/fundApi';
import type { FundDto } from '../../services/fundApi';
import './FundList.css';

export default function FundList() {
  const [funds, setFunds] = useState<FundDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Fund List - Manulife Investment Management';
    FundApiService.getFunds()
      .then(data => {
        setFunds(data);
        setLoading(false);
      })
      .catch(() => {
        setError('获取基金数据失败');
        setLoading(false);
      });
  }, []);

  // 获取所有currency选项
  const currencyOptions = Array.from(new Set(funds.map(f => f.currencyCode)));

  // 过滤逻辑
  const filteredFunds = funds.filter(fund => {
    const matchSearch = search
      ? fund.fundName.toLowerCase().includes(search.toLowerCase()) || fund.code.toLowerCase().includes(search.toLowerCase())
      : true;
    const matchCurrency = selectedCurrency ? fund.currencyCode === selectedCurrency : true;
    return matchSearch && matchCurrency;
  });

  return (
    <div className="fundlist-container">
      <div className="fundlist-content">
        <div className="fundlist-header">
          <ChartBarIcon className="fundlist-icon" />
          <h1 className="fundlist-title">Fund List</h1>
        </div>
        <div className="fundlist-controls" style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <input
            type="text"
            placeholder="搜索基金名称或代码"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="fundlist-search-input"
            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <select
            value={selectedCurrency}
            onChange={e => setSelectedCurrency(e.target.value)}
            className="fundlist-currency-select"
            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            <option value="">全部币种</option>
            {currencyOptions.map(currency => (
              <option key={currency} value={currency}>{currency}</option>
            ))}
          </select>
        </div>
        <div className="fundlist-card">
          {loading ? (
            <div className="fundlist-placeholder">加载中...</div>
          ) : error ? (
            <div className="fundlist-placeholder">{error}</div>
          ) : (
            <table className="min-w-full text-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>名称</th>
                  <th>代码</th>
                  <th>单位净值</th>
                  <th>币种</th>
                  <th>净值日期</th>
                  <th>净值变动</th>
                  <th>变动百分比</th>
                </tr>
              </thead>
              <tbody>
                {filteredFunds.map(fund => (
                  <tr key={fund.id}>
                    <td>
                      <span
                        className="text-green-600 cursor-pointer hover:underline"
                        onClick={() => {
                          navigate('/fund-detail', { state: { fund } });
                        }}
                      >
                        {fund.id}
                      </span>
                    </td>
                    <td>{fund.fundName}</td>
                    <td>{fund.code}</td>
                    <td>{fund.unitPrice}</td>
                    <td>{fund.currencyCode}</td>
                    <td>{fund.priceDate}</td>
                    <td>{fund.navChange}</td>
                    <td>{fund.navChangePercent}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
