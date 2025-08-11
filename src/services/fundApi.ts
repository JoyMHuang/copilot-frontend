import axios from 'axios';
import type { FundDto } from '../types';
import { memoryCache } from '../utils/cache';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000,
});

export class FundApiService {
  // 获取基金列表
  static async getFundList(): Promise<FundDto[]> {
    const cacheKey = 'fund_list';
    const cachedData = memoryCache.get<FundDto[]>(cacheKey);
    if (cachedData) {
      return cachedData;
    }
    try {
      console.log('🌐 API: Requesting fund list');
      const response = await api.get('/fund');
      const data = response.data;
      memoryCache.set(cacheKey, data, 5 * 60 * 1000);
      return data;
    } catch (error) {
      console.error('Error fetching fund list:', error);
      throw error;
    }
  }
}

export default FundApiService;
