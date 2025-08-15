import axios from 'axios';

// FundDto 类型定义，参考后端 dto
export interface FundDto {
  id: string;
  fundName: string;
  code: string;
  unitPrice: number;
  currencyCode: string;
  priceDate: string;
  navChange: number;
  navChangePercent: number;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000,
});

export class FundListApiService {
  // 获取基金列表
  static async getFundList(): Promise<FundDto[]> {
    try {
      const response = await api.get('/fund', {
        headers: { 'Cache-Control': 'no-cache' }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching fund list:', error);
      throw error;
    }
  }

  // 获取基金详情
  static async getFundDetail(id: string): Promise<import('../types/fundDetailDto').FundDetailDto> {
    try {
      const response = await api.get(`/fund/${id}/detail`, {
        headers: { 'Cache-Control': 'no-cache' }
      });
      console.log(response)
      return response.data;
    } catch (error) {
      console.error('Error fetching fund detail:', error);
      throw error;
    }
  }
}

export default FundListApiService;