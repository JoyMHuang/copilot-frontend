import axios from 'axios';
import type { FundDto } from '../types';

// 创建axios实例
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000,
});

// 获取基金列表
export async function getFundList(): Promise<FundDto[]> {
  try {
    const response = await api.get('/fund');
    return response.data;
  } catch (error) {
    console.error('Error fetching fund list:', error);
    throw error;
  }
}
