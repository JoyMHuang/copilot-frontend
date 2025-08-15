import { useEffect, useState, useMemo } from 'react';
import { ChartBarIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useFundList } from '../../hooks/useFundData';
import FundCard from '../../components/FundCard';
import './FundList.css';

export default function FundList() {
  const { fundList, loading, error } = useFundList();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const navigate = useNavigate();

  // 添加页面标识
  useEffect(() => {
    document.title = 'Fund List - Manulife Investment Management';
  }, []);

  // 获取所有货币代码
  const availableCurrencies = useMemo(() => {
    const currencies = fundList
      .map(fund => fund.currencyCode)
      .filter(Boolean)
      .filter((currency, index, arr) => arr.indexOf(currency) === index)
      .sort();
    return currencies;
  }, [fundList]);

  // 过滤基金列表
  const filteredFunds = fundList.filter(fund => {
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      fund.name?.toLowerCase().includes(query) || 
      fund.code?.toLowerCase().includes(query);
    
    const matchesCurrency = !selectedCurrency || fund.currencyCode === selectedCurrency;
    
    return matchesSearch && matchesCurrency;
  });

  const handleViewDetails = (fundId: string) => {
    navigate(`/fund/${fundId}`);
  };

  // 加载状态
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-8">
            <ChartBarIcon className="w-8 h-8 text-green-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">基金列表</h1>
          </div>
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
          </div>
        </div>
      </div>
    );
  }

  // 错误状态
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-8">
            <ChartBarIcon className="w-8 h-8 text-green-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">基金列表</h1>
          </div>
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="text-red-500 text-lg mb-4">
                加载基金数据时出错: {error}
              </div>
              <button 
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                重试
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 成功状态
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <ChartBarIcon className="w-8 h-8 text-green-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">基金列表</h1>
          </div>
          <div className="text-sm text-green-600">
            共 {filteredFunds.length} 只基金 ✓
          </div>
        </div>

        {/* 搜索和筛选区域 */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          {/* 搜索框 */}
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索基金名称或代码..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* 货币筛选下拉框 */}
          <div className="relative">
            <select
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
              className="block w-full sm:w-48 px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">所有货币</option>
              {availableCurrencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 筛选结果提示 */}
        {(searchQuery || selectedCurrency) && (
          <p className="mb-4 text-sm text-gray-600">
            找到 {filteredFunds.length} 个匹配的基金
            {searchQuery && ` (搜索: "${searchQuery}")`}
            {selectedCurrency && ` (货币: ${selectedCurrency})`}
          </p>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFunds.map((fund) => (
            <div key={fund.id} onClick={() => handleViewDetails(fund.id)} className="cursor-pointer">
              <FundCard fund={fund} />
            </div>
          ))}
        </div>
        
        {filteredFunds.length === 0 && searchQuery && (
          <div className="text-center py-16">
            <MagnifyingGlassIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">未找到匹配的基金</p>
            <p className="text-gray-400 text-sm mt-2">请尝试其他关键词</p>
          </div>
        )}
        
        {fundList.length === 0 && !searchQuery && (
          <div className="text-center py-16">
            <ChartBarIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">暂无基金数据</p>
          </div>
        )}
      </div>
    </div>
  );
}
