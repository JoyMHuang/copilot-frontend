import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, ChartBarIcon, UserIcon, CurrencyDollarIcon, ChartPieIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { FundApiService } from '../../services/fundApi';
import type { FundDetail } from '../../services/fundApi';
import './FundDetail.css';

export default function FundDetail() {
  const { fundId } = useParams<{ fundId: string }>();
  const navigate = useNavigate();
  const [fund, setFund] = useState<FundDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'Fund Details - Manulife Investment Management';
  }, []);
  useEffect(() => {
    const loadFundDetail = async () => {
      if (!fundId) {
        setError('Fund ID not provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // Get fund detail using the new API method
        const fundDetail = await FundApiService.getFundDetail(fundId);
        setFund(fundDetail);
      } catch (err) {
        setError('Failed to load fund details');
        console.error('Error loading fund details:', err);
      } finally {
        setLoading(false);
      }
    };

    loadFundDetail();
  }, [fundId]);

  const formatCurrency = (value: number, currencyCode: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 4,
      maximumFractionDigits: 4,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="funddetail-container">
        <div className="funddetail-content">
          <div className="flex justify-center items-center min-h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
            <span className="ml-3 text-gray-600">Loading fund details...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !fund) {
    return (
      <div className="funddetail-container">
        <div className="funddetail-content">
          <div className="text-center">
            <p className="text-red-600 text-lg mb-4">{error || 'Fund not found'}</p>
            <button 
              onClick={() => navigate('/fund-list')}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            >
              Back to Fund List
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="funddetail-container">
      <div className="funddetail-content">
        {/* Header with back button */}
        <div className="funddetail-header">
          <button 
            onClick={() => navigate('/fund-list')}
            className="flex items-center text-green-600 hover:text-green-700 transition-colors mb-4"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Fund List
          </button>
          
          <div className="flex items-center mb-6">
            <ChartBarIcon className="funddetail-icon" />
            <div>
              <h1 className="funddetail-title">{fund.fundName}</h1>
              <p className="text-gray-500 font-mono text-lg">{fund.code}</p>
            </div>
          </div>
        </div>        {/* Fund Details Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Price Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <CurrencyDollarIcon className="h-5 w-5 mr-2 text-green-500" />
              Price Information
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Unit Price</span>
                <span className="text-2xl font-bold text-gray-900">
                  {formatCurrency(fund.unitPrice, fund.currencyCode)}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Accumulated NAV</span>
                <span className="text-lg font-semibold text-gray-700">
                  {formatCurrency(fund.accumulatedNav, fund.currencyCode)}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Daily Change</span>
                <div className="text-right">
                  <div className={`text-lg font-semibold ${
                    fund.navChange >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {fund.navChange >= 0 ? '+' : ''}{fund.navChange.toFixed(4)}
                  </div>
                  <div className={`text-sm ${
                    fund.navChangePercent >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    ({fund.navChangePercent >= 0 ? '+' : ''}{fund.navChangePercent.toFixed(2)}%)
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Price Date</span>
                  <span className="text-gray-900 font-medium">{formatDate(fund.priceDate)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Fund Overview */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <ChartBarIcon className="h-5 w-5 mr-2 text-green-500" />
              Fund Overview
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Fund Type</span>
                <span className="text-gray-900 font-medium">{fund.fundType}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Fund Size</span>
                <span className="text-gray-900 font-medium">¥{fund.fundSize.toLocaleString()} 万元</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Established</span>
                <span className="text-gray-900 font-medium">{formatDate(fund.establishDate)}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Status</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  fund.status === '正常申购赎回' ? 'bg-green-100 text-green-800' :
                  fund.status === '暂停申购' ? 'bg-yellow-100 text-yellow-800' :
                  fund.status === '暂停赎回' ? 'bg-orange-100 text-orange-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {fund.status}
                </span>
              </div>
              
              <div className="pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Min Subscription</span>
                  <span className="text-gray-900 font-medium">¥{fund.minSubscription.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-gray-600">Min Redemption</span>
                  <span className="text-gray-900 font-medium">{fund.minRedemption.toLocaleString()} 份额</span>
                </div>
              </div>
            </div>
          </div>

          {/* Fund Managers */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <UserIcon className="h-5 w-5 mr-2 text-green-500" />
              Fund Managers
            </h2>
            <div className="space-y-4">
              {fund.fundManagers.map((manager, index) => (
                <div key={index} className="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0">
                  <div className="font-medium text-gray-900">{manager.name}</div>
                  <div className="text-sm text-gray-600 mt-1">
                    {manager.experience} years experience
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {manager.education}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Risk Metrics */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <ExclamationTriangleIcon className="h-5 w-5 mr-2 text-green-500" />
              Risk Metrics
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Risk Level</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  fund.riskMetrics.riskLevel === '低风险' ? 'bg-green-100 text-green-800' :
                  fund.riskMetrics.riskLevel === '中低风险' ? 'bg-blue-100 text-blue-800' :
                  fund.riskMetrics.riskLevel === '中风险' ? 'bg-yellow-100 text-yellow-800' :
                  fund.riskMetrics.riskLevel === '中高风险' ? 'bg-orange-100 text-orange-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {fund.riskMetrics.riskLevel}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Sharpe Ratio</span>
                <span className="text-gray-900 font-medium">{fund.riskMetrics.sharpeRatio.toFixed(3)}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Max Drawdown</span>
                <span className="text-red-600 font-medium">{fund.riskMetrics.maxDrawdown.toFixed(2)}%</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Volatility</span>
                <span className="text-gray-900 font-medium">{fund.riskMetrics.volatility.toFixed(2)}%</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Beta</span>
                <span className="text-gray-900 font-medium">{fund.riskMetrics.beta.toFixed(3)}</span>
              </div>
            </div>
          </div>

          {/* Fee Structure */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <CurrencyDollarIcon className="h-5 w-5 mr-2 text-green-500" />
              Fee Structure
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Management Fee</span>
                <span className="text-gray-900 font-medium">{fund.feeStructure.managementFee.toFixed(2)}%</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Custodian Fee</span>
                <span className="text-gray-900 font-medium">{fund.feeStructure.custodianFee.toFixed(2)}%</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Subscription Fee</span>
                <span className="text-gray-900 font-medium">{fund.feeStructure.subscriptionFee.toFixed(2)}%</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Redemption Fee</span>
                <span className="text-gray-900 font-medium">{fund.feeStructure.redemptionFee.toFixed(2)}%</span>
              </div>
            </div>
          </div>

          {/* Top Holdings */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 lg:col-span-2 xl:col-span-3">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <ChartPieIcon className="h-5 w-5 mr-2 text-green-500" />
              Top Holdings
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Name</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Code</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-900">Percentage</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-900">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {fund.topHoldings.map((holding, index) => (
                    <tr key={index} className="border-b border-gray-100 last:border-b-0">
                      <td className="py-3 px-4 text-gray-900">{holding.name}</td>
                      <td className="py-3 px-4 text-gray-600 font-mono">{holding.code}</td>
                      <td className="py-3 px-4 text-right text-gray-900 font-medium">{holding.percentage.toFixed(2)}%</td>
                      <td className="py-3 px-4 text-right text-gray-900 font-medium">
                        {formatCurrency(holding.value, fund.currencyCode)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Performance History */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 lg:col-span-2 xl:col-span-3">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <ChartBarIcon className="h-5 w-5 mr-2 text-green-500" />
              Performance History
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Period</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-900">Return</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-900">Benchmark</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-900">Excess Return</th>
                  </tr>
                </thead>
                <tbody>
                  {fund.performance.map((perf, index) => (
                    <tr key={index} className="border-b border-gray-100 last:border-b-0">
                      <td className="py-3 px-4 text-gray-900 font-medium">{perf.period}</td>
                      <td className={`py-3 px-4 text-right font-medium ${
                        perf.return >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {perf.return >= 0 ? '+' : ''}{perf.return.toFixed(2)}%
                      </td>
                      <td className={`py-3 px-4 text-right font-medium ${
                        perf.benchmark >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {perf.benchmark >= 0 ? '+' : ''}{perf.benchmark.toFixed(2)}%
                      </td>
                      <td className={`py-3 px-4 text-right font-medium ${
                        perf.excess >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {perf.excess >= 0 ? '+' : ''}{perf.excess.toFixed(2)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Investment Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 lg:col-span-2 xl:col-span-3">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Investment Details</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Investment Objective</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{fund.investmentObjective}</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Investment Strategy</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{fund.investmentStrategy}</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Suitable Investors</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{fund.suitableInvestors}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4">
          <button className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-md text-lg font-medium transition-colors">
            Invest Now
          </button>
          <button className="flex-1 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 py-3 px-6 rounded-md text-lg font-medium transition-colors">
            Add to Watchlist
          </button>
        </div>
      </div>
    </div>
  );
}