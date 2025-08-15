import axios from 'axios';
import type { Transaction } from '../types/transaction';
import { memoryCache } from '../utils/cache';
import { mockTransactionList } from '../data/mockTransactionData';

// 创建axios实例
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000,
});

// 交易API服务类
export class TransactionApiService {
  // 获取交易历史列表
  static async getTransactionList(): Promise<Transaction[]> {
    const cacheKey = 'transaction_list';
    
    // 先检查缓存
    const cachedData = memoryCache.get<Transaction[]>(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    try {
      console.log('🌐 API: Making request to get transaction list');
      const response = await api.get('/transactions');
      const data = response.data;
      
      // 缓存数据（5分钟）
      memoryCache.set(cacheKey, data, 5 * 60 * 1000);
      
      return data;
    } catch (error) {
      console.warn('Transaction API request failed, using mock data:', error);
      // API调用失败时使用模拟数据
      memoryCache.set(cacheKey, mockTransactionList, 5 * 60 * 1000);
      return mockTransactionList;
    }
  }

  // 根据交易ID获取单个交易详情
  static async getTransactionById(id: string): Promise<Transaction> {
    const cacheKey = `transaction_${id}`;
    
    // 先检查缓存
    const cachedData = memoryCache.get<Transaction>(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    try {
      console.log(`🌐 API: Making request to get transaction data for ID ${id}`);
      const response = await api.get(`/transactions/${id}`);
      const data = response.data;
      
      // 缓存数据（5分钟）
      memoryCache.set(cacheKey, data, 5 * 60 * 1000);
      
      return data;
    } catch (error) {
      console.warn(`Transaction API request failed for ID ${id}, checking mock data:`, error);
      // API调用失败时从模拟数据中查找
      const mockTransaction = mockTransactionList.find(t => t.id === id);
      if (mockTransaction) {
        memoryCache.set(cacheKey, mockTransaction, 5 * 60 * 1000);
        return mockTransaction;
      }
      throw error;
    }
  }
}

// 导出默认实例
export default TransactionApiService;
