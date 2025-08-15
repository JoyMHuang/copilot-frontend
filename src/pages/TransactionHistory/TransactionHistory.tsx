import { useEffect, useState, useMemo } from 'react';
import { ClockIcon, MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { useTransactionList } from '../../hooks/useTransactionData';
import TransactionCard from '../../components/TransactionCard';
import type { TransactionStatus, TransactionType } from '../../types/transaction';
import './TransactionHistory.css';

export default function TransactionHistory() {
  const { transactionList, loading, error } = useTransactionList();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<TransactionStatus | ''>('');
  const [selectedType, setSelectedType] = useState<TransactionType | ''>('');
  const [selectedDateRange, setSelectedDateRange] = useState('');

  // 添加页面标识
  useEffect(() => {
    document.title = 'Transaction History - Manulife Investment Management';
  }, []);

  // 获取所有状态和类型用于筛选
  const availableStatuses = useMemo(() => {
    const statuses = transactionList
      .map(transaction => transaction.status)
      .filter((status, index, arr) => arr.indexOf(status) === index)
      .sort();
    return statuses;
  }, [transactionList]);

  const availableTypes = useMemo(() => {
    const types = transactionList
      .map(transaction => transaction.transactionType)
      .filter((type, index, arr) => arr.indexOf(type) === index)
      .sort();
    return types;
  }, [transactionList]);

  // 过滤交易列表
  const filteredTransactions = useMemo(() => {
    return transactionList.filter(transaction => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || 
        transaction.fundName?.toLowerCase().includes(query) || 
        transaction.fundCode?.toLowerCase().includes(query) ||
        transaction.reference?.toLowerCase().includes(query);
      
      const matchesStatus = !selectedStatus || transaction.status === selectedStatus;
      const matchesType = !selectedType || transaction.transactionType === selectedType;
      
      let matchesDateRange = true;
      if (selectedDateRange) {
        const transactionDate = new Date(transaction.transactionDate);
        const now = new Date();
        
        switch (selectedDateRange) {
          case 'today':
            matchesDateRange = transactionDate.toDateString() === now.toDateString();
            break;
          case 'week':
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            matchesDateRange = transactionDate >= weekAgo;
            break;
          case 'month':
            const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            matchesDateRange = transactionDate >= monthAgo;
            break;
          case 'quarter':
            const quarterAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
            matchesDateRange = transactionDate >= quarterAgo;
            break;
        }
      }
      
      return matchesSearch && matchesStatus && matchesType && matchesDateRange;
    });
  }, [transactionList, searchQuery, selectedStatus, selectedType, selectedDateRange]);

  // 按日期排序（最新的在前）
  const sortedTransactions = useMemo(() => {
    return [...filteredTransactions].sort((a, b) => 
      new Date(b.transactionDate).getTime() - new Date(a.transactionDate).getTime()
    );
  }, [filteredTransactions]);

  const getStatusLabel = (status: TransactionStatus) => {
    switch (status) {
      case 'Completed': return '已完成';
      case 'Processing': return '处理中';
      case 'Pending': return '等待中';
      case 'Failed': return '失败';
      case 'Cancelled': return '已取消';
      default: return status;
    }
  };

  const getTypeLabel = (type: TransactionType) => {
    switch (type) {
      case 'Subscribe': return '申购';
      case 'Redeem': return '赎回';
      case 'Switch-In': return '转入';
      case 'Switch-Out': return '转出';
      case 'Dividend': return '分红';
      case 'Fee': return '费用';
      default: return type;
    }
  };

  // 加载状态
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-8">
            <ClockIcon className="w-8 h-8 text-green-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">交易历史</h1>
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
            <ClockIcon className="w-8 h-8 text-green-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">交易历史</h1>
          </div>
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="text-red-500 text-lg mb-4">
                加载交易数据时出错: {error}
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
            <ClockIcon className="w-8 h-8 text-green-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">交易历史</h1>
          </div>
          <div className="text-sm text-green-600">
            共 {sortedTransactions.length} 条记录 ✓
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
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索基金名称、代码或交易编号..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* 筛选器 */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <FunnelIcon className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-600">筛选:</span>
            </div>
            
            {/* 状态筛选 */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as TransactionStatus | '')}
              className="px-3 py-1 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">所有状态</option>
              {availableStatuses.map((status) => (
                <option key={status} value={status}>
                  {getStatusLabel(status)}
                </option>
              ))}
            </select>

            {/* 交易类型筛选 */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as TransactionType | '')}
              className="px-3 py-1 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">所有类型</option>
              {availableTypes.map((type) => (
                <option key={type} value={type}>
                  {getTypeLabel(type)}
                </option>
              ))}
            </select>

            {/* 日期范围筛选 */}
            <select
              value={selectedDateRange}
              onChange={(e) => setSelectedDateRange(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">所有时间</option>
              <option value="today">今天</option>
              <option value="week">最近一周</option>
              <option value="month">最近一月</option>
              <option value="quarter">最近三月</option>
            </select>
          </div>
        </div>

        {/* 筛选结果提示 */}
        {(searchQuery || selectedStatus || selectedType || selectedDateRange) && (
          <p className="mb-4 text-sm text-gray-600">
            找到 {sortedTransactions.length} 条匹配的交易记录
            {searchQuery && ` (搜索: "${searchQuery}")`}
            {selectedStatus && ` (状态: ${getStatusLabel(selectedStatus)})`}
            {selectedType && ` (类型: ${getTypeLabel(selectedType)})`}
            {selectedDateRange && ` (时间: ${selectedDateRange === 'today' ? '今天' : 
              selectedDateRange === 'week' ? '最近一周' : 
              selectedDateRange === 'month' ? '最近一月' : '最近三月'})`}
          </p>
        )}
        
        {/* 交易列表 */}
        <div className="space-y-4">
          {sortedTransactions.map((transaction) => (
            <TransactionCard key={transaction.id} transaction={transaction} />
          ))}
        </div>
        
        {/* 空状态 */}
        {sortedTransactions.length === 0 && (searchQuery || selectedStatus || selectedType || selectedDateRange) && (
          <div className="text-center py-16">
            <MagnifyingGlassIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">未找到匹配的交易记录</p>
            <p className="text-gray-400 text-sm mt-2">请尝试调整筛选条件</p>
          </div>
        )}
        
        {transactionList.length === 0 && !searchQuery && (
          <div className="text-center py-16">
            <ClockIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">暂无交易记录</p>
          </div>
        )}
      </div>
    </div>
  );
}
