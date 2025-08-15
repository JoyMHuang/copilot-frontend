import { useEffect, useState } from 'react';
import { 
  ChartBarIcon, 
  MagnifyingGlassIcon, 
  FunnelIcon,
  ArrowPathIcon 
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { 
  useFundListWithPagination, 
  useFundSearch, 
  useAvailableCurrencies 
} from '../../hooks/useFundData';
import type { FundListParams } from '../../services/fundApi';
import FundCard from '../../components/FundCard';

export default function EnhancedFundList() {
  const navigate = useNavigate();
  
  // 分页和筛选参数
  const [params, setParams] = useState<FundListParams>({
    page: 1,
    pageSize: 9,
    currencyCode: '',
    search: ''
  });
  
  // API hooks
  const { 
    fundList, 
    total, 
    page, 
    pageSize, 
    loading, 
    error, 
    refetch 
  } = useFundListWithPagination(params);
  
  const { currencies, loading: currenciesLoading } = useAvailableCurrencies();
  const { searchResults, loading: searchLoading, search, clearResults } = useFundSearch();
  
  // 本地状态
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchMode, setIsSearchMode] = useState(false);
  
  // 页面标识
  useEffect(() => {
    document.title = 'Enhanced Fund List - Manulife Investment Management';
  }, []);

  // 搜索处理
  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      setIsSearchMode(true);
      await search(query);
    } else {
      setIsSearchMode(false);
      clearResults();
    }
  };

  // 筛选处理
  const handleCurrencyChange = (currencyCode: string) => {
    setParams(prev => ({ 
      ...prev, 
      currencyCode, 
      page: 1 // 重置到第一页
    }));
    if (isSearchMode) {
      setIsSearchMode(false);
      clearResults();
      setSearchQuery('');
    }
  };

  // 分页处理
  const handlePageChange = (newPage: number) => {
    setParams(prev => ({ ...prev, page: newPage }));
  };

  // 刷新数据
  const handleRefresh = () => {
    if (isSearchMode) {
      search(searchQuery);
    } else {
      refetch();
    }
  };

  // 查看详情
  const handleViewDetails = (fundId: string) => {
    navigate(`/fund/${fundId}`);
  };

  // 计算显示的数据
  const displayData = isSearchMode ? searchResults : fundList;
  const isLoading = isSearchMode ? searchLoading : loading;
  const currentPage = page || 1;
  const currentPageSize = pageSize || 9;
  const totalPages = isSearchMode ? 1 : Math.ceil(total / currentPageSize);

  // 加载状态
  if (isLoading && displayData.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-8">
            <ChartBarIcon className="w-8 h-8 text-green-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">增强版基金列表</h1>
          </div>
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
          </div>
        </div>
      </div>
    );
  }

  // 错误状态
  if (error && displayData.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-8">
            <ChartBarIcon className="w-8 h-8 text-green-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">增强版基金列表</h1>
          </div>
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="text-red-500 text-lg mb-4">
                加载基金数据时出错: {error}
              </div>
              <button 
                onClick={handleRefresh}
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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* 页面头部 */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <ChartBarIcon className="w-8 h-8 text-green-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">增强版基金列表</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className="flex items-center px-3 py-2 text-sm text-green-600 hover:text-green-700 hover:bg-green-50 rounded-md transition-colors disabled:opacity-50"
            >
              <ArrowPathIcon className={`w-4 h-4 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
              刷新
            </button>
            <div className="text-sm text-green-600">
              {isSearchMode 
                ? `找到 ${displayData.length} 个搜索结果` 
                : `共 ${total} 只基金，第 ${currentPage} 页`
              } ✓
            </div>
          </div>
        </div>

        {/* 搜索和筛选区域 */}
        <div className="mb-6 space-y-4">
          {/* 搜索框 */}
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="搜索基金名称或代码..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* 筛选器 */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <FunnelIcon className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-600">筛选:</span>
            </div>
            
            {/* 货币筛选 */}
            <select
              value={params.currencyCode || ''}
              onChange={(e) => handleCurrencyChange(e.target.value)}
              disabled={currenciesLoading || isSearchMode}
              className="px-3 py-1 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 disabled:opacity-50"
            >
              <option value="">所有货币</option>
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>

            {/* 每页数量 */}
            {!isSearchMode && (
              <select
                value={currentPageSize}
                onChange={(e) => setParams(prev => ({ ...prev, pageSize: Number(e.target.value), page: 1 }))}
                className="px-3 py-1 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
              >
                <option value={9}>9 条/页</option>
                <option value={12}>12 条/页</option>
                <option value={24}>24 条/页</option>
              </select>
            )}
          </div>

          {/* 活动筛选器显示 */}
          {(params.currencyCode || isSearchMode) && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">活动筛选器:</span>
              {params.currencyCode && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  货币: {params.currencyCode}
                  <button
                    onClick={() => handleCurrencyChange('')}
                    className="ml-1 text-green-600 hover:text-green-800"
                  >
                    ×
                  </button>
                </span>
              )}
              {isSearchMode && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  搜索: "{searchQuery}"
                  <button
                    onClick={() => handleSearch('')}
                    className="ml-1 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          )}
        </div>
        
        {/* 基金列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {displayData.map((fund) => (
            <div key={fund.id} onClick={() => handleViewDetails(fund.id)} className="cursor-pointer">
              <FundCard fund={fund} />
            </div>
          ))}
        </div>

        {/* 分页控件 */}
        {!isSearchMode && totalPages > 1 && (
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              显示第 {(currentPage - 1) * currentPageSize + 1} - {Math.min(currentPage * currentPageSize, total)} 条，共 {total} 条
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1 || isLoading}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                上一页
              </button>
              
              {/* 页码显示 */}
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      disabled={isLoading}
                      className={`px-3 py-2 text-sm font-medium rounded-md disabled:opacity-50 ${
                        pageNum === currentPage
                          ? 'text-green-600 bg-green-50 border border-green-300'
                          : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages || isLoading}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                下一页
              </button>
            </div>
          </div>
        )}
        
        {/* 空状态 */}
        {displayData.length === 0 && !isLoading && (
          <div className="text-center py-16">
            {isSearchMode ? (
              <>
                <MagnifyingGlassIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">未找到匹配的基金</p>
                <p className="text-gray-400 text-sm mt-2">请尝试其他关键词</p>
              </>
            ) : (
              <>
                <ChartBarIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">暂无基金数据</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
