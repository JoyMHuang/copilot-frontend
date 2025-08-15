import axios from 'axios';

// Align with backend TransactionDto without using enum syntax
export const TransactionStatus = {
  Pending: 'Pending',
  Completed: 'Completed',
  Failed: 'Failed',
} as const;
export type TransactionStatus = typeof TransactionStatus[keyof typeof TransactionStatus];

export interface TransactionListItem {
  id: string;
  transactionName: string;
  transactionDate: string; // e.g., '2025-07-15'
  transactionAmount: number;
  status: TransactionStatus;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000,
});

export class TransactionApiService {
  // 获取 transaction list
  static async getTransactionList(): Promise<TransactionListItem[]> {
    try {
      const response = await api.get('/transaction-history');
      return response.data as TransactionListItem[];
    } catch (error) {
      console.error('Error fetching transaction list:', error);
      throw error;
    }
  }
}

export default TransactionApiService;
