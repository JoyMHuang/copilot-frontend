import type { Fund } from '../types/fund';

interface FundCardProps {
  fund: Fund;
}

export default function FundCard({ fund }: FundCardProps) {
  const isPositive = fund.navChangePercent >= 0;
  const formattedDate = new Date(fund.priceDate).toLocaleDateString('zh-CN');

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {fund.fundName}
          </h3>
          <p className="text-sm text-gray-500">
            代码: {fund.code}
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">
            {fund.unitPrice.toFixed(4)}
          </div>
          <div className="text-sm text-gray-500">
            {fund.currencyCode}
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          净值日期: {formattedDate}
        </div>
        <div className="text-right">
          <div className={`text-sm font-medium ${
            isPositive ? 'text-green-600' : 'text-red-600'
          }`}>
            {isPositive ? '+' : ''}{fund.navChange.toFixed(4)}
          </div>
          <div className={`text-sm font-medium ${
            isPositive ? 'text-green-600' : 'text-red-600'
          }`}>
            {isPositive ? '+' : ''}{fund.navChangePercent.toFixed(2)}%
          </div>
        </div>
      </div>
    </div>
  );
}
