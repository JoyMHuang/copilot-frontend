import { useLocation } from 'react-router-dom';
import type { FundDto } from '../../services/fundApi';

export default function FundDetailPage() {
  const location = useLocation();
  const fund = (location.state as { fund?: FundDto })?.fund;

  if (!fund) {
    return <div className="p-8">未找到基金信息</div>;
  }

  return (
    <div className="max-w-xl mx-auto bg-white rounded shadow-sm p-8 mt-8">
      <h2 className="text-2xl font-bold mb-4 text-green-600">基金详情</h2>
      <div className="mb-2"><span className="font-semibold">ID：</span>{fund.id}</div>
      <div className="mb-2"><span className="font-semibold">名称：</span>{fund.fundName}</div>
      <div className="mb-2"><span className="font-semibold">代码：</span>{fund.code}</div>
      <div className="mb-2"><span className="font-semibold">单位净值：</span>{fund.unitPrice}</div>
      <div className="mb-2"><span className="font-semibold">币种：</span>{fund.currencyCode}</div>
      <div className="mb-2"><span className="font-semibold">净值日期：</span>{fund.priceDate}</div>
      <div className="mb-2"><span className="font-semibold">净值变动：</span>{fund.navChange}</div>
      <div className="mb-2"><span className="font-semibold">变动百分比：</span>{fund.navChangePercent}%</div>
    </div>
  );
}
