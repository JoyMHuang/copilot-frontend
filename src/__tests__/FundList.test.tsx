import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import FundList from '../pages/FundList';
import { useFundList } from '../hooks/useFundData';
import { mockFundList, mockFundListEmpty, mockFundListSingleCurrency } from './mockData';

// Mock the hook
jest.mock('../../hooks/useFundData');
const mockUseFundList = useFundList as jest.MockedFunction<typeof useFundList>;

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock FundCard component
jest.mock('../components/FundCard', () => {
  return function MockFundCard({ fund }: { fund: any }) {
    return (
      <div data-testid={`fund-card-${fund.id}`}>
        <h3>{fund.fundName}</h3>
        <p>{fund.code}</p>
        <p>{fund.currencyCode}</p>
      </div>
    );
  };
});

// Test wrapper component
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe('FundList Component', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    jest.clearAllMocks();
  });

  describe('Loading State', () => {
    it('should display loading spinner when loading is true', () => {
      mockUseFundList.mockReturnValue({
        fundList: [],
        loading: true,
        error: null,
      });

      render(
        <TestWrapper>
          <FundList />
        </TestWrapper>
      );

      expect(screen.getByText('基金列表')).toBeInTheDocument();
      expect(screen.getByText(/animate-spin/)).toBeInTheDocument();
    });
  });

  describe('Error State', () => {
    it('should display error message when there is an error', () => {
      const errorMessage = 'Network error';
      mockUseFundList.mockReturnValue({
        fundList: [],
        loading: false,
        error: errorMessage,
      });

      render(
        <TestWrapper>
          <FundList />
        </TestWrapper>
      );

      expect(screen.getByText('基金列表')).toBeInTheDocument();
      expect(screen.getByText(`加载基金数据时出错: ${errorMessage}`)).toBeInTheDocument();
      expect(screen.getByText('重试')).toBeInTheDocument();
    });

    it('should reload page when retry button is clicked', () => {
      mockUseFundList.mockReturnValue({
        fundList: [],
        loading: false,
        error: 'Network error',
      });

      const mockReload = jest.fn();
      Object.defineProperty(window, 'location', {
        value: { reload: mockReload },
        writable: true,
      });

      render(
        <TestWrapper>
          <FundList />
        </TestWrapper>
      );

      const retryButton = screen.getByText('重试');
      fireEvent.click(retryButton);

      expect(mockReload).toHaveBeenCalledTimes(1);
    });
  });

  describe('Success State', () => {
    beforeEach(() => {
      mockUseFundList.mockReturnValue({
        fundList: mockFundList,
        loading: false,
        error: null,
      });
    });

    it('should render fund list correctly', () => {
      render(
        <TestWrapper>
          <FundList />
        </TestWrapper>
      );

      expect(screen.getByText('基金列表')).toBeInTheDocument();
      expect(screen.getByText('共 5 只基金 ✓')).toBeInTheDocument();

      // Check if all fund cards are rendered
      mockFundList.forEach((fund: any) => {
        expect(screen.getByTestId(`fund-card-${fund.id}`)).toBeInTheDocument();
        expect(screen.getByText(fund.fundName)).toBeInTheDocument();
      });
    });

    it('should display currency filter options', () => {
      render(
        <TestWrapper>
          <FundList />
        </TestWrapper>
      );

      const currencySelect = screen.getByDisplayValue('所有货币');
      expect(currencySelect).toBeInTheDocument();

      // Check if all unique currencies are in the options
      const expectedCurrencies = ['CAD', 'EUR', 'HKD', 'USD'];
      expectedCurrencies.forEach((currency) => {
        expect(screen.getByText(currency)).toBeInTheDocument();
      });
    });

    it('should navigate to fund detail when fund card is clicked', async () => {
      render(
        <TestWrapper>
          <FundList />
        </TestWrapper>
      );

      const firstFundCard = screen.getByTestId('fund-card-1');
      fireEvent.click(firstFundCard);

      expect(mockNavigate).toHaveBeenCalledWith('/fund/1');
    });
  });

  describe('Search Functionality', () => {
    beforeEach(() => {
      mockUseFundList.mockReturnValue({
        fundList: mockFundList,
        loading: false,
        error: null,
      });
    });

    it('should filter funds by name when searching', async () => {
      const user = userEvent.setup();

      render(
        <TestWrapper>
          <FundList />
        </TestWrapper>
      );

      const searchInput = screen.getByPlaceholderText('搜索基金名称或代码...');
      
      await user.type(searchInput, 'Growth');

      // Should show filtered results
      await waitFor(() => {
        expect(screen.getByText('找到 2 个匹配的基金 (搜索: "Growth")')).toBeInTheDocument();
        expect(screen.getByText('Manulife Growth Fund')).toBeInTheDocument();
        expect(screen.getByText('Manulife Asian Growth Fund')).toBeInTheDocument();
        expect(screen.queryByText('Manulife Income Fund')).not.toBeInTheDocument();
      });
    });

    it('should filter funds by code when searching', async () => {
      const user = userEvent.setup();

      render(
        <TestWrapper>
          <FundList />
        </TestWrapper>
      );

      const searchInput = screen.getByPlaceholderText('搜索基金名称或代码...');
      
      await user.type(searchInput, 'MFC001');

      await waitFor(() => {
        expect(screen.getByText('找到 1 个匹配的基金 (搜索: "MFC001")')).toBeInTheDocument();
        expect(screen.getByText('Manulife Growth Fund')).toBeInTheDocument();
        expect(screen.queryByText('Manulife Income Fund')).not.toBeInTheDocument();
      });
    });

    it('should show no results message when search returns empty', async () => {
      const user = userEvent.setup();

      render(
        <TestWrapper>
          <FundList />
        </TestWrapper>
      );

      const searchInput = screen.getByPlaceholderText('搜索基金名称或代码...');
      
      await user.type(searchInput, 'NonExistentFund');

      await waitFor(() => {
        expect(screen.getByText('未找到匹配的基金')).toBeInTheDocument();
        expect(screen.getByText('请尝试其他关键词')).toBeInTheDocument();
        mockFundList.forEach((fund: any) => {
          expect(screen.queryByText(fund.fundName)).not.toBeInTheDocument();
        });
      });
    });

    it('should be case insensitive when searching', async () => {
      const user = userEvent.setup();

      render(
        <TestWrapper>
          <FundList />
        </TestWrapper>
      );

      const searchInput = screen.getByPlaceholderText('搜索基金名称或代码...');
      
      await user.type(searchInput, 'growth');

      await waitFor(() => {
        expect(screen.getByText('找到 2 个匹配的基金 (搜索: "growth")')).toBeInTheDocument();
        expect(screen.getByText('Manulife Growth Fund')).toBeInTheDocument();
        expect(screen.getByText('Manulife Asian Growth Fund')).toBeInTheDocument();
      });
    });

    it('should clear search results when input is cleared', async () => {
      const user = userEvent.setup();

      render(
        <TestWrapper>
          <FundList />
        </TestWrapper>
      );

      const searchInput = screen.getByPlaceholderText('搜索基金名称或代码...');
      
      // Type search term
      await user.type(searchInput, 'Growth');
      
      await waitFor(() => {
        expect(screen.getByText('找到 2 个匹配的基金 (搜索: "Growth")')).toBeInTheDocument();
      });

      // Clear search
      await user.clear(searchInput);

      await waitFor(() => {
        expect(screen.getByText('共 5 只基金 ✓')).toBeInTheDocument();
        expect(screen.queryByText('找到 2 个匹配的基金')).not.toBeInTheDocument();
      });
    });
  });

  describe('Currency Filter Functionality', () => {
    beforeEach(() => {
      mockUseFundList.mockReturnValue({
        fundList: mockFundList,
        loading: false,
        error: null,
      });
    });

    it('should filter funds by currency', async () => {
      const user = userEvent.setup();

      render(
        <TestWrapper>
          <FundList />
        </TestWrapper>
      );

      const currencySelect = screen.getByDisplayValue('所有货币');
      
      await user.selectOptions(currencySelect, 'USD');

      await waitFor(() => {
        expect(screen.getByText('找到 2 个匹配的基金 (货币: USD)')).toBeInTheDocument();
        expect(screen.getByText('Manulife Growth Fund')).toBeInTheDocument();
        expect(screen.getByText('Manulife Bond Fund')).toBeInTheDocument();
        expect(screen.queryByText('Manulife Income Fund')).not.toBeInTheDocument(); // CAD fund
      });
    });

    it('should reset to all funds when "所有货币" is selected', async () => {
      const user = userEvent.setup();

      render(
        <TestWrapper>
          <FundList />
        </TestWrapper>
      );

      const currencySelect = screen.getByDisplayValue('所有货币');
      
      // First filter by USD
      await user.selectOptions(currencySelect, 'USD');
      
      await waitFor(() => {
        expect(screen.getByText('找到 2 个匹配的基金 (货币: USD)')).toBeInTheDocument();
      });

      // Then reset to all currencies
      await user.selectOptions(currencySelect, '');

      await waitFor(() => {
        expect(screen.getByText('共 5 只基金 ✓')).toBeInTheDocument();
        expect(screen.queryByText('找到 2 个匹配的基金')).not.toBeInTheDocument();
      });
    });
  });

  describe('Combined Search and Filter', () => {
    beforeEach(() => {
      mockUseFundList.mockReturnValue({
        fundList: mockFundList,
        loading: false,
        error: null,
      });
    });

    it('should apply both search and currency filter simultaneously', async () => {
      const user = userEvent.setup();

      render(
        <TestWrapper>
          <FundList />
        </TestWrapper>
      );

      const searchInput = screen.getByPlaceholderText('搜索基金名称或代码...');
      const currencySelect = screen.getByDisplayValue('所有货币');
      
      // Apply search filter
      await user.type(searchInput, 'Fund');
      
      // Apply currency filter
      await user.selectOptions(currencySelect, 'USD');

      await waitFor(() => {
        expect(screen.getByText('找到 2 个匹配的基金 (搜索: "Fund") (货币: USD)')).toBeInTheDocument();
        expect(screen.getByText('Manulife Growth Fund')).toBeInTheDocument();
        expect(screen.getByText('Manulife Bond Fund')).toBeInTheDocument();
        // Should not show CAD or other currency funds
        expect(screen.queryByText('Manulife Income Fund')).not.toBeInTheDocument();
      });
    });

    it('should show no results when combined filters match nothing', async () => {
      const user = userEvent.setup();

      render(
        <TestWrapper>
          <FundList />
        </TestWrapper>
      );

      const searchInput = screen.getByPlaceholderText('搜索基金名称或代码...');
      const currencySelect = screen.getByDisplayValue('所有货币');
      
      // Search for a term that only exists in non-USD funds
      await user.type(searchInput, 'Income');
      
      // But filter by USD
      await user.selectOptions(currencySelect, 'USD');

      await waitFor(() => {
        expect(screen.getByText('未找到匹配的基金')).toBeInTheDocument();
        expect(screen.getByText('请尝试其他关键词')).toBeInTheDocument();
      });
    });
  });

  describe('Empty State', () => {
    it('should show empty state when no funds are available', () => {
      mockUseFundList.mockReturnValue({
        fundList: mockFundListEmpty,
        loading: false,
        error: null,
      });

      render(
        <TestWrapper>
          <FundList />
        </TestWrapper>
      );

      expect(screen.getByText('基金列表')).toBeInTheDocument();
      expect(screen.getByText('共 0 只基金 ✓')).toBeInTheDocument();
      expect(screen.getByText('暂无基金数据')).toBeInTheDocument();
    });
  });

  describe('Currency Options Generation', () => {
    it('should generate currency options correctly from fund list', () => {
      mockUseFundList.mockReturnValue({
        fundList: mockFundListSingleCurrency,
        loading: false,
        error: null,
      });

      render(
        <TestWrapper>
          <FundList />
        </TestWrapper>
      );

      // Should only show USD option for single currency dataset
      expect(screen.getByText('USD')).toBeInTheDocument();
      expect(screen.queryByText('CAD')).not.toBeInTheDocument();
      expect(screen.queryByText('EUR')).not.toBeInTheDocument();
    });

    it('should sort currency options alphabetically', () => {
      mockUseFundList.mockReturnValue({
        fundList: mockFundList,
        loading: false,
        error: null,
      });

      render(
        <TestWrapper>
          <FundList />
        </TestWrapper>
      );

      const currencySelect = screen.getByDisplayValue('所有货币');
      const options = currencySelect.querySelectorAll('option');
      
      // Extract currency values (excluding "所有货币" option)
      const currencies = Array.from(options)
        .slice(1) // Skip first option (所有货币)
        .map(option => option.textContent)
        .filter(Boolean);

      expect(currencies).toEqual(['CAD', 'EUR', 'HKD', 'USD']);
    });
  });

  describe('Document Title', () => {
    it('should set document title on mount', () => {
      mockUseFundList.mockReturnValue({
        fundList: mockFundList,
        loading: false,
        error: null,
      });

      render(
        <TestWrapper>
          <FundList />
        </TestWrapper>
      );

      expect(document.title).toBe('Fund List - Manulife Investment Management');
    });
  });
});
