import { useEffect, useState, useMemo } from 'react';
import { ChartBarIcon, ExclamationCircleIcon, ArrowPathIcon, MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { useFundList } from '../../hooks/useFundData';
import './FundList.css';

export default function FundList() {
  const { fundList, loading, error, refetch } = useFundList();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('');

  // 添加页面标识
  useEffect(() => {
    document.title = 'Fund List - Manulife Investment Management';
  }, []);

  // 获取所有可用的货币选项
  const availableCurrencies = useMemo(() => {
    const currencies = Array.from(new Set(fundList.map(fund => fund.currencyCode)));
    return currencies.sort();
  }, [fundList]);

  // 过滤基金列表
  const filteredFundList = useMemo(() => {
    let filtered = fundList;

    // 按搜索词过滤
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(fund => 
        fund.fundName.toLowerCase().includes(searchLower) ||
        fund.code.toLowerCase().includes(searchLower)
      );
    }

    // 按货币过滤
    if (selectedCurrency) {
      filtered = filtered.filter(fund => fund.currencyCode === selectedCurrency);
    }

    return filtered;
  }, [fundList, searchTerm, selectedCurrency]);

  // 格式化货币
  const formatCurrency = (amount: number, currency: string = 'PHP') => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // 格式化日期
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-PH', {
        year: 'numeric',
        month: 'short',
        day: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  // 清空所有过滤器
  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCurrency('');
  };

  // 加载状态
  if (loading) {
    return (
      <div className="fundlist-container">
        <div className="fundlist-content">
          <div className="fundlist-header">
            <ChartBarIcon className="fundlist-icon" />
            <h1 className="fundlist-title">Fund List</h1>
          </div>
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading fund list...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 错误状态
  if (error) {
    return (
      <div className="fundlist-container">
        <div className="fundlist-content">
          <div className="fundlist-header">
            <ChartBarIcon className="fundlist-icon" />
            <h1 className="fundlist-title">Fund List</h1>
          </div>
          <div className="fundlist-card">
            <div className="text-center p-8">
              <ExclamationCircleIcon className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Error loading fund list
              </h3>
              <p className="text-sm text-gray-600 mb-4">{error}</p>
              <button
                onClick={refetch}
                className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <ArrowPathIcon className="w-4 h-4 mr-2" />
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fundlist-container">
      <div className="fundlist-content">
        <div className="fundlist-header">
          <ChartBarIcon className="fundlist-icon" />
          <h1 className="fundlist-title">Fund List</h1>
          <div className="text-sm text-green-600 ml-auto">
            {filteredFundList.length} of {fundList.length} fund{fundList.length !== 1 ? 's' : ''}
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-6 space-y-4">
          {/* Search and Currency Filter Row */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search Box */}
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 placeholder-gray-500"
                placeholder="Search by fund name or code..."
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Currency Filter Dropdown */}
            <div className="relative">
              <select
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-700 min-w-[120px]"
              >
                <option value="">All Currencies</option>
                {availableCurrencies.map(currency => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ChevronDownIcon className="h-4 w-4 text-gray-400" />
              </div>
            </div>

            {/* Clear Filters Button */}
            {(searchTerm || selectedCurrency) && (
              <button
                onClick={clearAllFilters}
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors whitespace-nowrap text-sm"
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* Active Filters Display */}
          {(searchTerm || selectedCurrency) && (
            <div className="flex flex-wrap gap-2 items-center text-sm">
              <span className="text-gray-600">Active filters:</span>
              {searchTerm && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Search: "{searchTerm}"
                </span>
              )}
              {selectedCurrency && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Currency: {selectedCurrency}
                </span>
              )}
            </div>
          )}
        </div>
        
        <div className="fundlist-card">
          {filteredFundList.length === 0 ? (
            <div className="fundlist-placeholder">
              {searchTerm || selectedCurrency ? (
                <>
                  <MagnifyingGlassIcon className="fundlist-placeholder-icon" />
                  <h3 className="fundlist-placeholder-title">No Funds Found</h3>
                  <p className="fundlist-placeholder-description">
                    No funds match your filter criteria. Try adjusting your filters.
                  </p>
                  <button
                    onClick={clearAllFilters}
                    className="mt-4 inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Clear Filters
                  </button>
                </>
              ) : (
                <>
                  <ChartBarIcon className="fundlist-placeholder-icon" />
                  <h3 className="fundlist-placeholder-title">No Funds Available</h3>
                  <p className="fundlist-placeholder-description">
                    No funds are currently available for investment.
                  </p>
                  <button
                    onClick={refetch}
                    className="mt-4 inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <ArrowPathIcon className="w-4 h-4 mr-2" />
                    Refresh
                  </button>
                </>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredFundList.map((fund) => (
                <div key={fund.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                  {/* Fund Header - Compact */}
                  <div className="mb-3">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 truncate pr-2">{fund.fundName}</h3>
                      <div className="text-right shrink-0">
                        <div className="text-xl font-bold text-gray-900">
                          {formatCurrency(fund.unitPrice, fund.currencyCode)}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <span>Code: {fund.code}</span>
                      <span className="text-xs">as of {formatDate(fund.priceDate)}</span>
                    </div>
                  </div>
                  
                  {/* NAV Change Information - Compact Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-gray-50 p-3 rounded-md text-center">
                      <p className="text-xs text-gray-600 mb-1">NAV Change</p>
                      <p className={`text-sm font-bold ${fund.navChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {fund.navChange >= 0 ? '+' : ''}{formatCurrency(fund.navChange, fund.currencyCode)}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md text-center">
                      <p className="text-xs text-gray-600 mb-1">Change %</p>
                      <p className={`text-sm font-bold ${fund.navChangePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {fund.navChangePercent >= 0 ? '+' : ''}{fund.navChangePercent.toFixed(2)}%
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons - Compact */}
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-green-500 text-white py-2 px-3 rounded-md hover:bg-green-600 transition-colors font-medium text-sm">
                      Subscribe
                    </button>
                    <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded-md hover:bg-gray-200 transition-colors font-medium text-sm">
                      Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
