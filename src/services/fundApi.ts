import axios from 'axios';
import type { Fund, FundListResponse } from '../types/fund';
import { memoryCache } from '../utils/cache';
import { mockFundList } from '../data/mockFundList';

// 创建axios实例
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000,
});

// 定义API查询参数类型
export interface FundListParams {
  page?: number;
  pageSize?: number;
  currencyCode?: string;
  fundType?: string;
  search?: string;
}

// API服务类
export class FundApiService {
  // 获取基金列表（支持分页和筛选）
  static async getFundList(params?: FundListParams): Promise<Fund[]> {
    const cacheKey = `fund_list_${JSON.stringify(params || {})}`;
    
    // 先检查缓存
    const cachedData = memoryCache.get<Fund[]>(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    try {
      console.log('🌐 API: Making request to get fund list', params);
      const response = await api.get('/fund', { params });
      
      // 处理不同的响应格式
      let data: Fund[];
      if (response.data && Array.isArray(response.data.data)) {
        // 如果返回的是 FundListResponse 格式
        data = response.data.data;
      } else if (Array.isArray(response.data)) {
        // 如果直接返回数组
        data = response.data;
      } else {
        throw new Error('Invalid API response format');
      }
      
      // 缓存数据（5分钟）
      memoryCache.set(cacheKey, data, 5 * 60 * 1000);
      
      return data;
    } catch (error) {
      console.warn('Fund list API request failed, using mock data:', error);
      // API调用失败时使用模拟数据
      let filteredData = [...mockFundList];
      
      // 应用筛选参数到模拟数据
      if (params) {
        if (params.currencyCode) {
          filteredData = filteredData.filter(fund => fund.currencyCode === params.currencyCode);
        }
        if (params.search) {
          const searchLower = params.search.toLowerCase();
          filteredData = filteredData.filter(fund => 
            fund.fundName.toLowerCase().includes(searchLower) ||
            fund.code.toLowerCase().includes(searchLower)
          );
        }
        if (params.page && params.pageSize) {
          const startIndex = (params.page - 1) * params.pageSize;
          const endIndex = startIndex + params.pageSize;
          filteredData = filteredData.slice(startIndex, endIndex);
        }
      }
      
      memoryCache.set(cacheKey, filteredData, 5 * 60 * 1000);
      return filteredData;
    }
  }

  // 获取基金列表（带完整响应信息）
  static async getFundListWithPagination(params?: FundListParams): Promise<FundListResponse> {
    const cacheKey = `fund_list_paginated_${JSON.stringify(params || {})}`;
    
    // 先检查缓存
    const cachedData = memoryCache.get<FundListResponse>(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    try {
      console.log('🌐 API: Making request to get paginated fund list', params);
      const response = await api.get('/fund', { params });
      const data = response.data;
      
      // 确保返回格式符合 FundListResponse
      const result: FundListResponse = {
        data: Array.isArray(data.data) ? data.data : Array.isArray(data) ? data : [],
        total: data.total || (Array.isArray(data) ? data.length : 0),
        page: data.page || params?.page || 1,
        pageSize: data.pageSize || params?.pageSize || 10
      };
      
      // 缓存数据（5分钟）
      memoryCache.set(cacheKey, result, 5 * 60 * 1000);
      
      return result;
    } catch (error) {
      console.warn('Paginated fund list API request failed, using mock data:', error);
      
      // 使用模拟数据构建响应
      let filteredData = [...mockFundList];
      
      if (params) {
        if (params.currencyCode) {
          filteredData = filteredData.filter(fund => fund.currencyCode === params.currencyCode);
        }
        if (params.search) {
          const searchLower = params.search.toLowerCase();
          filteredData = filteredData.filter(fund => 
            fund.fundName.toLowerCase().includes(searchLower) ||
            fund.code.toLowerCase().includes(searchLower)
          );
        }
      }
      
      const total = filteredData.length;
      const page = params?.page || 1;
      const pageSize = params?.pageSize || 10;
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedData = filteredData.slice(startIndex, endIndex);
      
      const result: FundListResponse = {
        data: paginatedData,
        total,
        page,
        pageSize
      };
      
      memoryCache.set(cacheKey, result, 5 * 60 * 1000);
      return result;
    }
  }

  // 根据基金ID获取单个基金信息
  static async getFundById(id: string): Promise<Fund> {
    const cacheKey = `fund_id_${id}`;
    
    // 先检查缓存
    const cachedData = memoryCache.get<Fund>(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    try {
      console.log(`🌐 API: Making request to get fund data for ID ${id}`);
      const response = await api.get(`/fund/${id}`);
      const data = response.data;
      
      // 缓存数据（5分钟）
      memoryCache.set(cacheKey, data, 5 * 60 * 1000);
      
      return data;
    } catch (error) {
      console.warn(`Fund API request failed for ID ${id}, checking mock data:`, error);
      // API调用失败时从模拟数据中查找
      const mockFund = mockFundList.find(f => f.id === id);
      if (mockFund) {
        memoryCache.set(cacheKey, mockFund, 5 * 60 * 1000);
        return mockFund;
      }
      throw new Error(`Fund with ID ${id} not found`);
    }
  }

  // 根据基金代码获取单个基金信息
  static async getFundByCode(code: string): Promise<Fund> {
    const cacheKey = `fund_code_${code}`;
    
    // 先检查缓存
    const cachedData = memoryCache.get<Fund>(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    try {
      console.log(`🌐 API: Making request to get fund data for code ${code}`);
      const response = await api.get(`/fund/code/${code}`);
      const data = response.data;
      
      // 缓存数据（5分钟）
      memoryCache.set(cacheKey, data, 5 * 60 * 1000);
      
      return data;
    } catch (error) {
      console.warn(`Fund API request failed for code ${code}, checking mock data:`, error);
      // API调用失败时从模拟数据中查找
      const mockFund = mockFundList.find(f => f.code === code);
      if (mockFund) {
        memoryCache.set(cacheKey, mockFund, 5 * 60 * 1000);
        return mockFund;
      }
      throw new Error(`Fund with code ${code} not found`);
    }
  }

  // 获取基金货币代码列表（用于筛选器）
  static async getAvailableCurrencies(): Promise<string[]> {
    const cacheKey = 'fund_currencies';
    
    // 先检查缓存
    const cachedData = memoryCache.get<string[]>(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    try {
      console.log('🌐 API: Making request to get available currencies');
      const response = await api.get('/fund/currencies');
      const data = response.data;
      
      // 缓存数据（30分钟）
      memoryCache.set(cacheKey, data, 30 * 60 * 1000);
      
      return data;
    } catch (error) {
      console.warn('Currencies API request failed, using mock data:', error);
      // 从模拟数据中提取货币代码
      const currencies = [...new Set(mockFundList.map(fund => fund.currencyCode))].sort();
      memoryCache.set(cacheKey, currencies, 30 * 60 * 1000);
      return currencies;
    }
  }

  // 搜索基金
  static async searchFunds(query: string): Promise<Fund[]> {
    if (!query.trim()) {
      return [];
    }

    const cacheKey = `fund_search_${query}`;
    
    // 先检查缓存
    const cachedData = memoryCache.get<Fund[]>(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    try {
      console.log(`🌐 API: Making request to search funds for query: ${query}`);
      const response = await api.get('/fund/search', { params: { q: query } });
      const data = response.data;
      
      // 缓存数据（2分钟）
      memoryCache.set(cacheKey, data, 2 * 60 * 1000);
      
      return data;
    } catch (error) {
      console.warn(`Fund search API request failed for query ${query}, using mock data:`, error);
      // 在模拟数据中搜索
      const searchLower = query.toLowerCase();
      const results = mockFundList.filter(fund => 
        fund.fundName.toLowerCase().includes(searchLower) ||
        fund.code.toLowerCase().includes(searchLower) ||
        (fund.name && fund.name.toLowerCase().includes(searchLower))
      );
      
      memoryCache.set(cacheKey, results, 2 * 60 * 1000);
      return results;
    }
  }
}

// 导出默认实例
export default FundApiService;
