export interface Transaction {
  id: string;
  transactionDate: string;
  settlementDate: string;
  transactionType: 'Subscribe' | 'Redeem' | 'Switch-Out' | 'Switch-In' | 'Dividend' | 'Fee';
  fundCode: string;
  fundName: string;
  amount: number;
  currency: string;
  units: number;
  unitPrice: number;
  status: 'Pending' | 'Completed' | 'Failed' | 'Processing' | 'Cancelled';
  reference: string;
  channel: 'Online' | 'Branch' | 'Phone' | 'Mobile App';
  description?: string;
  feeAmount?: number;
  switchToFund?: {
    code: string;
    name: string;
  };
}

export interface TransactionListResponse {
  data: Transaction[];
  total: number;
  page?: number;
  pageSize?: number;
}

export type TransactionStatus = Transaction['status'];
export type TransactionType = Transaction['transactionType'];
export type TransactionChannel = Transaction['channel'];
