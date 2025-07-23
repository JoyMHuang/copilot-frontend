import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import type { PortfolioData, WealthSpecialist } from '../types';

interface PortfolioDashboardProps {
  portfolioData: PortfolioData;
  wealthSpecialist: WealthSpecialist;
}

export default function PortfolioDashboard({ portfolioData, wealthSpecialist }: PortfolioDashboardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatPercentage = (percentage: number) => {
    return `${percentage.toFixed(2)}%`;
  };

  return (
    <div className="flex-1 bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {portfolioData.name}
            </h1>
            <p className="text-sm text-gray-600">CIF number: {portfolioData.cifNumber}</p>
          </div>
          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
            Logout
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Portfolio Summary */}
        <div className="lg:col-span-2 space-y-6">
          {/* Market Value Card */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">Total market value</h3>
                <p className="text-xs text-gray-500 mb-2">As of {portfolioData.lastUpdated}</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(portfolioData.totalValue)}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">Unrealised profit and loss</h3>
                <p className="text-2xl font-bold text-manulife-green">{formatCurrency(portfolioData.unrealizedProfitLoss)}</p>
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-600 mb-1">Risk profile</h4>
                  <p className="text-lg font-semibold text-gray-900">{portfolioData.riskProfile}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Allocation Chart and Details */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Chart */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Your allocation</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={portfolioData.allocations}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="percentage"
                      >
                        {portfolioData.allocations.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Allocation Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Allocation breakdown</h3>
                <div className="space-y-4">
                  {portfolioData.allocations.map((allocation, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div 
                          className="w-4 h-4 rounded-full mr-3"
                          style={{ backgroundColor: allocation.color }}
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {formatPercentage(allocation.percentage)} {allocation.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            ({formatCurrency(allocation.amount)})
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">What would you like to do?</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-manulife-green transition-colors">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-2">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-900">Subscribe</span>
              </button>

              <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-manulife-green transition-colors">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-2">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-900">Switch</span>
              </button>

              <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-manulife-green transition-colors">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-2">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H3" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-900">Redeem</span>
              </button>

              <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-manulife-green transition-colors">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-2">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div className="text-center">
                  <span className="text-sm font-medium text-gray-900">View pending</span>
                  <br />
                  <span className="text-sm font-medium text-gray-900">transactions</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Wealth Specialist Card */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Wealth Specialist</h3>
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4">{wealthSpecialist.name}</h4>
              <div className="space-y-2">
                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                  Email
                </button>
                <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                  Call
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
