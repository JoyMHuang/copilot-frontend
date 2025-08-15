import { render, screen } from '@testing-library/react';
import TransactionHistory from '../pages/TransactionHistory/TransactionHistory';

// 简化的模拟交易数据
const mockTransactions = [
  {
    id: 'TXN001',
    transactionDate: '2025-08-15',
    settlementDate: '2025-08-16',
    transactionType: 'Subscribe' as const,
    fundCode: 'CWSECUF003',
    fundName: 'Manulife Global Growth Fund',
    amount: 50000,
    currency: 'USD',
    units: 3189.8,
    unitPrice: 15.68,
    status: 'Completed' as const,
    reference: 'SUB20250815001',
    channel: 'Online' as const,
    description: '定期投资计划'
  },
  {
    id: 'TXN002',
    transactionDate: '2025-08-14',
    settlementDate: '2025-08-15',
    transactionType: 'Redeem' as const,
    fundCode: 'CWSECUF004',
    fundName: 'Manulife Asia Pacific Equity Fund',
    amount: 25000,
    currency: 'USD',
    units: 2225.7,
    unitPrice: 11.23,
    status: 'Completed' as const,
    reference: 'RED20250814001',
    channel: 'Mobile App' as const,
    description: '部分赎回',
    feeAmount: 125
  }
];

// Mock the hook
jest.mock('../hooks/useTransactionData', () => ({
  useTransactionList: () => ({
    transactionList: mockTransactions,
    loading: false,
    error: null,
  }),
}));

describe('TransactionHistory Component - Basic Tests', () => {
  it('should render successfully', () => {
    render(<TransactionHistory />);
    expect(screen.getByText('交易历史')).toBeInTheDocument();
  });

  it('should display transaction count', () => {
    render(<TransactionHistory />);
    expect(screen.getByText('共 2 条记录 ✓')).toBeInTheDocument();
  });

  it('should have search input field', () => {
    render(<TransactionHistory />);
    
    const searchInput = screen.getByPlaceholderText('搜索基金名称、代码或交易编号...');
    expect(searchInput).toBeInTheDocument();
  });

  it('should have filter dropdowns', () => {
    render(<TransactionHistory />);
    
    // 检查筛选下拉框
    expect(screen.getByDisplayValue('所有状态')).toBeInTheDocument();
    expect(screen.getByDisplayValue('所有类型')).toBeInTheDocument();
    expect(screen.getByDisplayValue('所有时间')).toBeInTheDocument();
  });

  it('should display transaction cards', () => {
    render(<TransactionHistory />);
    
    // 检查是否显示了交易信息
    expect(screen.getByText('Manulife Global Growth Fund')).toBeInTheDocument();
    expect(screen.getByText('Manulife Asia Pacific Equity Fund')).toBeInTheDocument();
    expect(screen.getByText('SUB20250815001')).toBeInTheDocument();
    expect(screen.getByText('RED20250814001')).toBeInTheDocument();
  });
});
