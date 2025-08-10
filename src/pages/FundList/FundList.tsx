import React, { useEffect, useState } from 'react';
import { getFundList } from '../../services/fundApi';
import type { FundDto } from '../../types';
import { useNavigate } from 'react-router-dom';

const FundList: React.FC = () => {
  const [funds, setFunds] = useState<FundDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [currency, setCurrency] = useState('全部');
  const navigate = useNavigate();

  useEffect(() => {
    getFundList().then(data => {
      setFunds(data);
      setLoading(false);
    });
  }, []);

  // 获取所有币种选项
  const currencyOptions = Array.from(new Set(funds.map(f => f.currencyCode)));

  // 过滤逻辑：先按币种，再按搜索
  const filteredFunds = funds.filter(fund =>
    (currency === '全部' || fund.currencyCode === currency) &&
    (fund.fundName.includes(search) || fund.code.includes(search))
  );

  if (loading) {
    return <div className="text-center py-8">加载中...</div>;
  }

  return (
    <div className="p-6">
      {/* 搜索和币种筛选 */}
      <div className="mb-6 flex flex-col md:flex-row gap-4 justify-center items-center">
        <input
          type="text"
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-green-500"
          placeholder="搜索基金名称或代码"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-green-500"
          value={currency}
          onChange={e => setCurrency(e.target.value)}
        >
          <option value="全部">全部币种</option>
          {currencyOptions.map(code => (
            <option key={code} value={code}>{code}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFunds.map(fund => (
          <div
            key={fund.id}
            className="bg-white shadow-sm rounded-lg p-6 border border-gray-100 cursor-pointer transition hover:shadow-md"
            onClick={() => navigate(`/fund-detail/${fund.code}`)}
          >
            <h2 className="text-lg font-semibold text-green-600 mb-2">{fund.fundName}</h2>
            <div className="text-gray-700 mb-1">代码: {fund.code}</div>
            <div className="text-gray-700 mb-1">单位净值: {fund.unitPrice}</div>
            <div className="text-gray-700 mb-1">币种: {fund.currencyCode}</div>
            <div className="text-gray-700 mb-1">净值日期: {fund.priceDate}</div>
            <div className="text-gray-700 mb-1">
              净值涨跌: 
              <span className={fund.navChange >= 0 ? "text-green-600" : "text-red-500"}>
                {fund.navChange}
              </span>
            </div>
            <div className="text-gray-700">
              涨跌幅: 
              <span className={fund.navChangePercent >= 0 ? "text-green-600" : "text-red-500"}>
                {fund.navChangePercent}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FundList;
