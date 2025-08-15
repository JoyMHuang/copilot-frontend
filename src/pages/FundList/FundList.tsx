import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChartBarIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { FundApiService } from '../../services/fundApi';
import type { Fund } from '../../services/fundApi';
import './FundList.css';

export default function FundList() {
  const navigate = useNavigate();
  const [funds, setFunds] = useState<Fund[]>([]);  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState<string>('All');

  // 添加页面标识
  useEffect(() => {
    document.title = 'Fund List - Manulife Investment Management';
  }, []);

  // 获取基金数据
  useEffect(() => {
    const loadFunds = async () => {
      try {
        setLoading(true);
        const fundData = await FundApiService.getFundList();
        setFunds(fundData);
      } catch (err) {
        setError('Failed to load fund data');
        console.error('Error loading funds:', err);
      } finally {
        setLoading(false);
      }
    };

    loadFunds();
  }, []);

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
      month: 'short',
      day: 'numeric',
    });
  };
  // Filter funds based on search term
  const filteredFunds = funds.filter(fund => {
    const matchesSearch = fund.fundName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fund.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCurrency = selectedCurrency === 'All' || fund.currencyCode === selectedCurrency;
    return matchesSearch && matchesCurrency;
  });

  // Get unique currency codes for filter dropdown
  const uniqueCurrencies = Array.from(new Set(funds.map(fund => fund.currencyCode))).sort();

  if (loading) {
    return (
      <div className="fundlist-container">
        <div className="fundlist-content">
          <div className="fundlist-header">
            <ChartBarIcon className="fundlist-icon" />
            <h1 className="fundlist-title">Fund List</h1>
          </div>          <div className="flex justify-center items-center min-h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500" aria-label="Loading"></div>
            <span className="ml-3 text-gray-600">Loading funds...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fundlist-container">
        <div className="fundlist-content">
          <div className="fundlist-header">
            <ChartBarIcon className="fundlist-icon" />
            <h1 className="fundlist-title">Fund List</h1>
          </div>
          <div className="flex justify-center items-center min-h-64">
            <div className="text-center">
              <p className="text-red-600 text-lg">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (    <div className="fundlist-container">
      <div className="fundlist-content">
        <div className="fundlist-header">
          <ChartBarIcon className="fundlist-icon" />
          <h1 className="fundlist-title">Fund List</h1>
          <p className="text-gray-600 mt-2">Total funds: {filteredFunds.length}</p>
        </div>
          {/* Search Box and Currency Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm"
              placeholder="Search funds by name or code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="sm:w-48">
            <select
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
            >
              <option value="All">All Currencies</option>
              {uniqueCurrencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredFunds.map((fund) => (
            <div key={fund.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">{fund.fundName}</h3>
                  <p className="text-sm text-gray-500 font-mono">{fund.code}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Unit Price</span>
                  <span className="text-lg font-semibold text-gray-900">
                    {formatCurrency(fund.unitPrice, fund.currencyCode)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Daily Change</span>
                  <div className="text-right">
                    <div className={`text-sm font-medium ${
                      fund.navChange >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {fund.navChange >= 0 ? '+' : ''}{fund.navChange.toFixed(4)}
                    </div>
                    <div className={`text-xs ${
                      fund.navChangePercent >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      ({fund.navChangePercent >= 0 ? '+' : ''}{fund.navChangePercent.toFixed(2)}%)
                    </div>
                  </div>
                </div>
                
                <div className="pt-3 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Price Date</span>
                    <span className="text-xs text-gray-600">{formatDate(fund.priceDate)}</span>
                  </div>
                </div>
              </div>
                <button 
                onClick={() => navigate(`/fund-detail/${fund.id}`)}
                className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
        
        {funds.length === 0 && (
          <div className="text-center py-12">
            <ChartBarIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No funds available</h3>
            <p className="mt-1 text-sm text-gray-500">Check back later for fund data.</p>
          </div>
        )}
      </div>
    </div>
  );
}
