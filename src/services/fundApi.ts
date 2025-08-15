import axios from 'axios';

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

export class FundApiService {
  static async getFunds(): Promise<FundDto[]> {
    try {
      const response = await api.get('/fund');
      return response.data;
    } catch (error) {
      console.error('Error fetching fund data:', error);
      throw error;
    }
  }
}

export type { FundDto };
export default FundApiService;
