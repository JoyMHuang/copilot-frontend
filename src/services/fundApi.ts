import axios from 'axios';
import { memoryCache } from '../utils/cache';

// Fund interface based on backend DTO structure
export interface Fund {
  id: string;
  fundName: string;
  code: string;
  unitPrice: number;
  currencyCode: string;
  priceDate: string;
  navChange: number;
  navChangePercent: number;
}

// Fund detail interfaces based on backend DTO structure
export interface FundManager {
  name: string;
  experience: number;
  education: string;
}

export interface Performance {
  period: string;
  return: number;
  benchmark: number;
  excess: number;
}

export interface FeeStructure {
  managementFee: number;
  custodianFee: number;
  subscriptionFee: number;
  redemptionFee: number;
}

export interface Holding {
  name: string;
  code: string;
  percentage: number;
  value: number;
}

export interface RiskMetrics {
  sharpeRatio: number;
  maxDrawdown: number;
  volatility: number;
  beta: number;
  riskLevel: '低风险' | '中低风险' | '中风险' | '中高风险' | '高风险';
}

export interface FundDetail {
  id: string;
  fundName: string;
  code: string;
  fundType: string;
  fundSize: number;
  establishDate: string;
  unitPrice: number;
  accumulatedNav: number;
  currencyCode: string;
  priceDate: string;
  navChange: number;
  navChangePercent: number;
  fundManagers: FundManager[];
  performance: Performance[];
  feeStructure: FeeStructure;
  topHoldings: Holding[];
  riskMetrics: RiskMetrics;
  investmentObjective: string;
  investmentStrategy: string;
  suitableInvestors: string;
  status: '正常申购赎回' | '暂停申购' | '暂停赎回' | '暂停交易';
  minSubscription: number;
  minRedemption: number;
}

// 创建axios实例
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000,
});

// Fund API服务类
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
      console.error('Error fetching fund list:', error);
      throw error;
    }
  }

  // 获取基金详情
  static async getFundDetail(id: string): Promise<FundDetail> {
    const cacheKey = `fund_detail_${id}`;
    
    // 先检查缓存
    const cachedData = memoryCache.get<FundDetail>(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    try {
      console.log(`🌐 API: Making request to get fund detail for id: ${id}`);
      const response = await api.get(`/fund/${id}`);
      const data = response.data;
      
      // 缓存数据（5分钟）
      memoryCache.set(cacheKey, data, 5 * 60 * 1000);
      
      return data;
    } catch (error) {
      console.error(`Error fetching fund detail for id ${id}:`, error);
      throw error;
    }
  }
}

// 导出默认实例
export default FundApiService;