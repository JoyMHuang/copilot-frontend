import axios from 'axios';

export interface Fund {
  id: string;
  name: string;
  code: string;
  type: string;
  netValue: number;
  currency: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  description?: string;
}

export interface FundPerformance {
  fundId: string;
  date: string;
  nav: number;
  returnYTD: number;
  return1Y: number;
  return3Y: number;
  return5Y: number;
}

const API_BASE = '/api/fund';

export const getFunds = async (): Promise<Fund[]> => {
  const res = await axios.get(API_BASE);
  return res.data;
};

export const getFundPerformance = async (id: string): Promise<FundPerformance[]> => {
  const res = await axios.get(`${API_BASE}/${id}/performance`);
  return res.data;
};

export const exportFundPerformancePdf = async (id: string, latest = false): Promise<Blob> => {
  const res = await axios.get(`${API_BASE}/${id}/performance/pdf?latest=${latest}`, {
    responseType: 'blob',
  });
  return res.data;
};
