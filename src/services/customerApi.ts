import axios from 'axios';
import type { PortfolioData, WealthSpecialist, Transaction } from '../types';
import { memoryCache } from '../utils/cache';

// 创建axios实例
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000,
});

// 定义API响应类型
export interface DashboardData {
  portfolioData: PortfolioData;
  wealthSpecialist: WealthSpecialist;
  transactions: Transaction[];
}

// API服务类
export class CustomerApiService {
  // 获取完整的dashboard数据
  static async getDashboardData(customerId: string): Promise<DashboardData> {
    const cacheKey = `dashboard_${customerId}`;
    
    // 先检查缓存
    const cachedData = memoryCache.get<DashboardData>(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    try {
      console.log(`🌐 API: Making request to get dashboard data for customer ${customerId}`);
      const response = await api.get(`/customer/${customerId}/dashboard`);
      const data = response.data;
      
      // 缓存数据（5分钟）
      memoryCache.set(cacheKey, data, 5 * 60 * 1000);
      
      return data;
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      throw error;
    }
  }

  // 获取投资组合数据
  static async getPortfolioData(customerId: string): Promise<PortfolioData> {
    const cacheKey = `portfolio_${customerId}`;
    
    // 先检查缓存
    const cachedData = memoryCache.get<PortfolioData>(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    try {
      console.log(`🌐 API: Making request to get portfolio data for customer ${customerId}`);
      const response = await api.get(`/customer/${customerId}/portfolio`);
      const data = response.data;
      
      // 缓存数据（5分钟）
      memoryCache.set(cacheKey, data, 5 * 60 * 1000);
      
      return data;
    } catch (error) {
      console.error('Error fetching portfolio data:', error);
      throw error;
    }
  }

  // 获取财富专家信息
  static async getWealthSpecialist(customerId: string): Promise<WealthSpecialist> {
    const cacheKey = `wealth_specialist_${customerId}`;
    
    // 先检查缓存
    const cachedData = memoryCache.get<WealthSpecialist>(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    try {
      console.log(`🌐 API: Making request to get wealth specialist data for customer ${customerId}`);
      const response = await api.get(`/customer/${customerId}/wealth-specialist`);
      const data = response.data;
      
      // 缓存数据（5分钟）
      memoryCache.set(cacheKey, data, 5 * 60 * 1000);
      
      return data;
    } catch (error) {
      console.error('Error fetching wealth specialist data:', error);
      throw error;
    }
  }

  // 获取交易记录
  static async getTransactions(customerId: string): Promise<Transaction[]> {
    try {
      const response = await api.get(`/customer/${customerId}/transactions`);
      return response.data;
    } catch (error) {
      console.error('Error fetching transactions:', error);
      throw error;
    }
  }
}

// 导出默认实例
export default CustomerApiService;
