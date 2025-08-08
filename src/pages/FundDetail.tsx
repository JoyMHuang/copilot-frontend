import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFundDetail } from '../services/fundApi';
import type { FundDto } from '../types';

const FundDetail: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const [fund, setFund] = useState<FundDto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (code) {
      getFundDetail(code).then(data => {
        setFund(data);
        setLoading(false);
      });
    }
  }, [code]);

  if (loading) {
    return <div className="text-center py-8">加载中...</div>;
  }

  if (!fund) {
    return <div className="text-center py-8 text-red-500">未找到基金信息</div>;
  }

  return (
    <div className="max-w-xl mx-auto bg-white shadow-sm rounded-lg p-8 mt-8 border border-gray-100">
      <h2 className="text-2xl font-bold text-green-600 mb-4">{fund.fundName}</h2>
      <div className="mb-2 text-gray-700">代码: {fund.code}</div>
      <div className="mb-2 text-gray-700">单位净值: {fund.unitPrice}</div>
      <div className="mb-2 text-gray-700">币种: {fund.currencyCode}</div>
      <div className="mb-2 text-gray-700">净值日期: {fund.priceDate}</div>
      <div className="mb-2 text-gray-700">
        净值涨跌: 
        <span className={fund.navChange >= 0 ? "text-green-600" : "text-red-500"}>
          {fund.navChange}
        </span>
      </div>
      <div className="mb-2 text-gray-700">
        涨跌幅: 
        <span className={fund.navChangePercent >= 0 ? "text-green-600" : "text-red-500"}>
          {fund.navChangePercent}%
        </span>
      </div>
      {/* 可根据 FundDto 增加更多字段展示 */}
    </div>
  );
};

export default FundDetail;
