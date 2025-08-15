import axios from 'axios';
import { getApiBaseUrl, getApiTimeout } from '../utils/env';

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
  baseURL: getApiBaseUrl(),
  timeout: getApiTimeout(),
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

export default FundApiService;
