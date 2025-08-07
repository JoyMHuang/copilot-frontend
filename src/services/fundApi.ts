import axios from 'axios';
import type { Fund } from '../types';
import { memoryCache } from '../utils/cache';

// 创建axios实例，与customerApi保持一致的配置
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000,
});

// 添加请求拦截器
api.interceptors.request.use(
  (config) => {
    console.log(`🌐 Fund API: Making ${config.method?.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    console.error('🔴 Fund API Request Error:', error);
    return Promise.reject(error);
  }
);

// 添加响应拦截器
api.interceptors.response.use(
  (response) => {
    console.log(`✅ Fund API: Success response from ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('🔴 Fund API Response Error:', error);
    return Promise.reject(error);
  }
);

// Fund API服务类
export class FundApiService {
  // 获取基金列表
  static async getFundList(): Promise<Fund[]> {
    const cacheKey = 'fund_list';
    
    // 先检查缓存
    const cachedData = memoryCache.get<Fund[]>(cacheKey);
    if (cachedData) {
      console.log('📦 Fund API: Using cached fund list data');
      return cachedData;
    }

    try {
      console.log('🌐 Fund API: Making request to get fund list');
      const response = await api.get('/fund');
      const data = response.data;
      
      // 验证数据格式
      if (!Array.isArray(data)) {
        throw new Error('Invalid response format: expected array of funds');
      }
      
      // 缓存数据（5分钟）
      memoryCache.set(cacheKey, data, 5 * 60 * 1000);
      
      console.log(`✅ Fund API: Successfully fetched ${data.length} funds`);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || error.message;
        console.error('Fund API Error:', {
          status: error.response?.status,
          message: errorMessage,
          url: error.config?.url,
        });
        throw new Error(`Failed to fetch fund list: ${errorMessage}`);
      } else {
        console.error('Unexpected error fetching fund list:', error);
        throw new Error('An unexpected error occurred while fetching fund list');
      }
    }
  }

  // 根据基金ID获取基金详情
  static async getFundById(fundId: string): Promise<Fund> {
    const cacheKey = `fund_${fundId}`;
    
    // 先检查缓存
    const cachedData = memoryCache.get<Fund>(cacheKey);
    if (cachedData) {
      console.log(`📦 Fund API: Using cached fund data for ${fundId}`);
      return cachedData;
    }

    try {
      console.log(`🌐 Fund API: Making request to get fund details for ${fundId}`);
      const response = await api.get(`/fund/${fundId}`);
      const data = response.data;
      
      // 缓存数据（5分钟）
      memoryCache.set(cacheKey, data, 5 * 60 * 1000);
      
      console.log(`✅ Fund API: Successfully fetched fund details for ${fundId}`);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || error.message;
        console.error('Fund API Error:', {
          status: error.response?.status,
          message: errorMessage,
          url: error.config?.url,
        });
        throw new Error(`Failed to fetch fund details: ${errorMessage}`);
      } else {
        console.error('Unexpected error fetching fund details:', error);
        throw new Error('An unexpected error occurred while fetching fund details');
      }
    }
  }
}

// 导出默认实例
export default FundApiService;
