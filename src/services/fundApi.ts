import axios from 'axios';
import type { Fund } from '../types/fund';
import { memoryCache } from '../utils/cache';
import { mockFundList } from '../data/mockFundList';

// 创建axios实例
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000,
});

// API服务类
export class FundApiService {
  // 获取基金列表
  static async getFundList(): Promise<Fund[]> {
    const cacheKey = 'fund_list';
    
    // 先检查缓存
    const cachedData = memoryCache.get<Fund[]>(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    try {
      console.log('🌐 API: Making request to get fund list');
      const response = await api.get('/fund');
      const data = response.data;
      
      // 缓存数据（5分钟）
      memoryCache.set(cacheKey, data, 5 * 60 * 1000);
      
      return data;
    } catch (error) {
      console.warn('API request failed, using mock data:', error);
      // API调用失败时使用模拟数据
      memoryCache.set(cacheKey, mockFundList, 5 * 60 * 1000);
      return mockFundList;
    }
  }

  // 根据基金代码获取单个基金信息
  static async getFundByCode(code: string): Promise<Fund> {
    const cacheKey = `fund_${code}`;
    
    // 先检查缓存
    const cachedData = memoryCache.get<Fund>(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    try {
      console.log(`🌐 API: Making request to get fund data for code ${code}`);
      const response = await api.get(`/fund/${code}`);
      const data = response.data;
      
      // 缓存数据（5分钟）
      memoryCache.set(cacheKey, data, 5 * 60 * 1000);
      
      return data;
    } catch (error) {
      console.warn(`API request failed for fund ${code}, checking mock data:`, error);
      // API调用失败时从模拟数据中查找
      const mockFund = mockFundList.find(f => f.code === code);
      if (mockFund) {
        memoryCache.set(cacheKey, mockFund, 5 * 60 * 1000);
        return mockFund;
      }
      throw error;
    }
  }
}

// 导出默认实例
export default FundApiService;
