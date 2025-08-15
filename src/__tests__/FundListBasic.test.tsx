import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import FundList from '../pages/FundList/FundList';

// 简化的模拟数据
const mockFunds = [
  {
    id: '1',
    fundName: 'Test Fund A',
    name: 'Test Fund A',
    code: 'TFA001',
    unitPrice: 100.5012,
    currencyCode: 'USD',
    priceDate: '2024-01-15',
    navChange: 2.5,
    navChangePercent: 2.56
  },
  {
    id: '2',
    fundName: 'Test Fund B', 
    name: 'Test Fund B',
    code: 'TFB002',
    unitPrice: 85.3045,
    currencyCode: 'EUR',
    priceDate: '2024-01-15',
    navChange: -1.2,
    navChangePercent: -1.39
  }
];

// Mock the custom hook
jest.mock('../hooks/useFundData', () => ({
  useFundList: () => ({
    fundList: mockFunds,
    loading: false,
    error: null
  })
}));

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe('FundList Component - Basic Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render successfully', () => {
    render(
      <TestWrapper>
        <FundList />
      </TestWrapper>
    );
    
    // 基本元素检查
    expect(screen.getByText('基金列表')).toBeInTheDocument();
  });

  it('should display fund cards when data is loaded', () => {
    render(
      <TestWrapper>
        <FundList />
      </TestWrapper>
    );
    
    // 检查模拟数据是否显示
    expect(screen.getByText('Test Fund A')).toBeInTheDocument();
    expect(screen.getByText('Test Fund B')).toBeInTheDocument();
    expect(screen.getByText('TFA001')).toBeInTheDocument();
    expect(screen.getByText('TFB002')).toBeInTheDocument();
  });

  it('should have search input field', () => {
    render(
      <TestWrapper>
        <FundList />
      </TestWrapper>
    );
    
    const searchInput = screen.getByPlaceholderText(/搜索基金名称或代码/i);
    expect(searchInput).toBeInTheDocument();
  });

  it('should have currency filter', () => {
    render(
      <TestWrapper>
        <FundList />
      </TestWrapper>
    );
    
    const filterSelect = screen.getByDisplayValue('全部货币');
    expect(filterSelect).toBeInTheDocument();
  });
});
