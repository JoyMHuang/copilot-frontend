import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChartBarIcon, 
  ArrowLeftIcon,
  ArrowTrendingUpIcon,
  ScaleIcon,
  CurrencyDollarIcon 
} from '@heroicons/react/24/outline';
import { mockFundDetails } from '../../data/mockFundDetails';

export default function FundDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const fund = id ? mockFundDetails[id] : null;

  useEffect(() => {
    if (fund) {
      document.title = `${fund.name} - Manulife Investment Management`;
    }
  }, [fund]);

  if (!fund) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-16">
            <ChartBarIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">基金信息未找到</p>
            <button
              onClick={() => navigate('/funds')}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              返回基金列表
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* 页面头部 */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate('/funds')}
            className="mr-4 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
          >
            <ArrowLeftIcon className="w-6 h-6" />
          </button>
          <ChartBarIcon className="w-8 h-8 text-green-600 mr-3" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{fund.name}</h1>
            <p className="text-gray-600">代码: {fund.code} | 货币: {fund.currencyCode}</p>
          </div>
        </div>

        {/* 基金概览卡片 */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{fund.nav}</div>
              <div className="text-sm text-gray-600">当前净值</div>
              <div className="text-xs text-gray-500">{fund.navDate}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">+{fund.performance.oneYear}%</div>
              <div className="text-sm text-gray-600">年度回报</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{fund.riskLevel}/5</div>
              <div className="text-sm text-gray-600">风险等级</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{fund.basicInfo.managementFee}%</div>
              <div className="text-sm text-gray-600">管理费</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 基本信息 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-4">
              <CurrencyDollarIcon className="w-6 h-6 text-green-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">基本信息</h2>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">基金类型:</span>
                <span className="font-medium">{fund.basicInfo.fundType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">基准指数:</span>
                <span className="font-medium">{fund.basicInfo.benchmarkIndex}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">基金经理:</span>
                <span className="font-medium">{fund.basicInfo.fundManager}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">成立日期:</span>
                <span className="font-medium">{fund.inception}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">最低投资额:</span>
                <span className="font-medium">{fund.currencyCode} {fund.basicInfo.minimumInvestment.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* 业绩表现 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-4">
              <ArrowTrendingUpIcon className="w-6 h-6 text-green-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">业绩表现</h2>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">年初至今:</span>
                <span className="font-medium text-green-600">+{fund.performance.ytd}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">近1个月:</span>
                <span className="font-medium text-green-600">+{fund.performance.oneMonth}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">近3个月:</span>
                <span className="font-medium text-green-600">+{fund.performance.threeMonths}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">近1年:</span>
                <span className="font-medium text-green-600">+{fund.performance.oneYear}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">近3年:</span>
                <span className="font-medium text-green-600">+{fund.performance.threeYears}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">成立以来:</span>
                <span className="font-medium text-green-600">+{fund.performance.sinceInception}%</span>
              </div>
            </div>
          </div>

          {/* 风险指标 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-4">
              <ScaleIcon className="w-6 h-6 text-green-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">风险指标</h2>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">波动率:</span>
                <span className="font-medium">{fund.riskMetrics.volatility}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">夏普比率:</span>
                <span className="font-medium">{fund.riskMetrics.sharpeRatio}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">最大回撤:</span>
                <span className="font-medium text-red-600">{fund.riskMetrics.maxDrawdown}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Beta系数:</span>
                <span className="font-medium">{fund.riskMetrics.beta}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Alpha系数:</span>
                <span className="font-medium">{fund.riskMetrics.alpha}</span>
              </div>
            </div>
          </div>

          {/* 前十大持仓 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">前十大持仓</h2>
            <div className="space-y-3">
              {fund.topHoldings.map((holding, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{holding.name}</div>
                    {holding.sector && (
                      <div className="text-sm text-gray-500">{holding.sector}</div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{holding.percentage}%</div>
                    {holding.code && (
                      <div className="text-sm text-gray-500">{holding.code}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
