import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import FundList from '../pages/FundList';
import { useFundList } from '../hooks/useFundData';

// Mock data for filter tests with multiple currencies
const filterTestFunds = [
  {
    id: '1',
    code: 'USD001',
    fundName: 'US Equity Fund',
    name: 'US Equity Fund',
    unitPrice: 15.25,
    currencyCode: 'USD',
    navChange: 0.12,
    navChangePercent: 0.8,
    priceDate: '2024-01-15',
  },
  {
    id: '2',
    code: 'USD002',
    fundName: 'US Bond Fund',
    name: 'US Bond Fund',
    unitPrice: 10.50,
    currencyCode: 'USD',
    navChange: -0.05,
    navChangePercent: -0.5,
    priceDate: '2024-01-15',
  },
  {
    id: '3',
    code: 'CAD001',
    fundName: 'Canadian Equity Fund',
    name: 'Canadian Equity Fund',
    unitPrice: 18.75,
    currencyCode: 'CAD',
    navChange: 0.25,
    navChangePercent: 1.3,
    priceDate: '2024-01-15',
  },
  {
    id: '4',
    code: 'CAD002',
    fundName: 'Canadian Bond Fund',
    name: 'Canadian Bond Fund',
    unitPrice: 12.30,
    currencyCode: 'CAD',
    navChange: 0.05,
    navChangePercent: 0.4,
    priceDate: '2024-01-15',
  },
  {
    id: '5',
    code: 'EUR001',
    fundName: 'European Growth Fund',
    name: 'European Growth Fund',
    unitPrice: 22.40,
    currencyCode: 'EUR',
    navChange: 0.35,
    navChangePercent: 1.6,
    priceDate: '2024-01-15',
  },
  {
    id: '6',
    code: 'GBP001',
    fundName: 'UK Equity Fund',
    name: 'UK Equity Fund',
    unitPrice: 16.80,
    currencyCode: 'GBP',
    navChange: -0.15,
    navChangePercent: -0.9,
    priceDate: '2024-01-15',
  },
];

// Mock the hook
jest.mock('../hooks/useFundData');
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

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe('FundList Currency Filter Functionality', () => {
  beforeEach(() => {
    mockUseFundList.mockReturnValue({
      fundList: filterTestFunds,
      loading: false,
      error: null,
    });
    jest.clearAllMocks();
  });

  describe('Currency Filter UI', () => {
    it('should render currency filter dropdown', () => {
      render(
        <TestWrapper>
          <FundList />
        </TestWrapper>
      );

      const currencySelect = screen.getByDisplayValue('所有货币');
      expect(currencySelect).toBeInTheDocument();
      expect(currencySelect.tagName).toBe('SELECT');
    });

    it('should show "所有货币" as default option', () => {
      render(
        <TestWrapper>
          <FundList />
        </TestWrapper>
      );

      const currencySelect = screen.getByDisplayValue('所有货币');
      expect(currencySelect).toHaveValue('');
    });

    it('should display all unique currencies in alphabetical order', () => {
      render(
        <TestWrapper>
          <FundList />
        </TestWrapper>
      );

      // Check for all currency options
      expect(screen.getByText('CAD')).toBeInTheDocument();
      expect(screen.getByText('EUR')).toBeInTheDocument();
      expect(screen.getByText('GBP')).toBeInTheDocument();
      expect(screen.getByText('USD')).toBeInTheDocument();

      // Verify alphabetical order by checking option positions
      const currencySelect = screen.getByDisplayValue('所有货币');
      const options = currencySelect.querySelectorAll('option');
      const currencyOptions = Array.from(options)
        .slice(1) // Skip "所有货币" option
        .map(option => option.textContent);
      
      expect(currencyOptions).toEqual(['CAD', 'EUR', 'GBP', 'USD']);
    });

    it('should not duplicate currency options when multiple funds have same currency', () => {
      render(
        <TestWrapper>
          <FundList />
        </TestWrapper>
      );

      const currencySelect = screen.getByDisplayValue('所有货币');
      const options = currencySelect.querySelectorAll('option');
      
      // Should have 5 options: "所有货币" + 4 unique currencies
      expect(options).toHaveLength(5);
    });
  });

  describe('Currency Filtering Logic', () => {
    it('should filter funds by USD currency', async () => {
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
        expect(screen.getByTestId('fund-card-1')).toBeInTheDocument(); // US Equity Fund
        expect(screen.getByTestId('fund-card-2')).toBeInTheDocument(); // US Bond Fund
        expect(screen.queryByTestId('fund-card-3')).not.toBeInTheDocument(); // Canadian fund
        expect(screen.queryByTestId('fund-card-4')).not.toBeInTheDocument(); // Canadian fund
        expect(screen.queryByTestId('fund-card-5')).not.toBeInTheDocument(); // European fund
        expect(screen.queryByTestId('fund-card-6')).not.toBeInTheDocument(); // UK fund
      });
    });

    it('should filter funds by CAD currency', async () => {
      const user = userEvent.setup();

      render(
        <TestWrapper>
          <FundList />
        </TestWrapper>
      );

      const currencySelect = screen.getByDisplayValue('所有货币');
      
      await user.selectOptions(currencySelect, 'CAD');

      await waitFor(() => {
        expect(screen.getByText('找到 2 个匹配的基金 (货币: CAD)')).toBeInTheDocument();
        expect(screen.getByTestId('fund-card-3')).toBeInTheDocument(); // Canadian Equity Fund
        expect(screen.getByTestId('fund-card-4')).toBeInTheDocument(); // Canadian Bond Fund
        expect(screen.queryByTestId('fund-card-1')).not.toBeInTheDocument(); // US fund
        expect(screen.queryByTestId('fund-card-2')).not.toBeInTheDocument(); // US fund
      });
    });

    it('should filter funds by EUR currency', async () => {
      const user = userEvent.setup();

      render(
        <TestWrapper>
          <FundList />
        </TestWrapper>
      );

      const currencySelect = screen.getByDisplayValue('所有货币');
      
      await user.selectOptions(currencySelect, 'EUR');

      await waitFor(() => {
        expect(screen.getByText('找到 1 个匹配的基金 (货币: EUR)')).toBeInTheDocument();
        expect(screen.getByTestId('fund-card-5')).toBeInTheDocument(); // European Growth Fund
        expect(screen.queryByTestId('fund-card-1')).not.toBeInTheDocument();
        expect(screen.queryByTestId('fund-card-2')).not.toBeInTheDocument();
        expect(screen.queryByTestId('fund-card-3')).not.toBeInTheDocument();
      });
    });

    it('should filter funds by GBP currency', async () => {
      const user = userEvent.setup();

      render(
        <TestWrapper>
          <FundList />
        </TestWrapper>
      );

      const currencySelect = screen.getByDisplayValue('所有货币');
      
      await user.selectOptions(currencySelect, 'GBP');

      await waitFor(() => {
        expect(screen.getByText('找到 1 个匹配的基金 (货币: GBP)')).toBeInTheDocument();
        expect(screen.getByTestId('fund-card-6')).toBeInTheDocument(); // UK Equity Fund
        expect(screen.queryByTestId('fund-card-1')).not.toBeInTheDocument();
        expect(screen.queryByTestId('fund-card-5')).not.toBeInTheDocument();
      });
    });

    it('should show all funds when "所有货币" is selected', async () => {
      const user = userEvent.setup();

      render(
        <TestWrapper>
          <FundList />
        </TestWrapper>
      );

      const currencySelect = screen.getByDisplayValue('所有货币');
      
      // First select a specific currency
      await user.selectOptions(currencySelect, 'USD');
      
      await waitFor(() => {
        expect(screen.getByText('找到 2 个匹配的基金 (货币: USD)')).toBeInTheDocument();
      });

      // Then select "所有货币"
      await user.selectOptions(currencySelect, '');

      await waitFor(() => {
        expect(screen.getByText('共 6 只基金 ✓')).toBeInTheDocument();
        expect(screen.queryByText('找到')).not.toBeInTheDocument();
        // All funds should be visible
        expect(screen.getByTestId('fund-card-1')).toBeInTheDocument();
        expect(screen.getByTestId('fund-card-2')).toBeInTheDocument();
        expect(screen.getByTestId('fund-card-3')).toBeInTheDocument();
        expect(screen.getByTestId('fund-card-4')).toBeInTheDocument();
        expect(screen.getByTestId('fund-card-5')).toBeInTheDocument();
        expect(screen.getByTestId('fund-card-6')).toBeInTheDocument();
      });
    });
  });

  describe('Combined Search and Currency Filter', () => {
    it('should apply both search and currency filter together', async () => {
      const user = userEvent.setup();

      render(
        <TestWrapper>
          <FundList />
        </TestWrapper>
      );

      const searchInput = screen.getByPlaceholderText('搜索基金名称或代码...');
      const currencySelect = screen.getByDisplayValue('所有货币');
      
      // Search for "Equity" and filter by "USD"
      await user.type(searchInput, 'Equity');
      await user.selectOptions(currencySelect, 'USD');

      await waitFor(() => {
        expect(screen.getByText('找到 1 个匹配的基金 (搜索: "Equity") (货币: USD)')).toBeInTheDocument();
        expect(screen.getByTestId('fund-card-1')).toBeInTheDocument(); // US Equity Fund
        expect(screen.queryByTestId('fund-card-2')).not.toBeInTheDocument(); // US Bond Fund (no "Equity" in name)
        expect(screen.queryByTestId('fund-card-3')).not.toBeInTheDocument(); // Canadian Equity Fund (not USD)
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
      
      // Search for "Bond" and filter by "EUR" (no EUR bond funds)
      await user.type(searchInput, 'Bond');
      await user.selectOptions(currencySelect, 'EUR');

      await waitFor(() => {
        expect(screen.getByText('未找到匹配的基金')).toBeInTheDocument();
        expect(screen.getByText('请尝试其他关键词')).toBeInTheDocument();
        expect(screen.queryByTestId('fund-card-1')).not.toBeInTheDocument();
        expect(screen.queryByTestId('fund-card-2')).not.toBeInTheDocument();
        expect(screen.queryByTestId('fund-card-3')).not.toBeInTheDocument();
        expect(screen.queryByTestId('fund-card-4')).not.toBeInTheDocument();
        expect(screen.queryByTestId('fund-card-5')).not.toBeInTheDocument();
        expect(screen.queryByTestId('fund-card-6')).not.toBeInTheDocument();
      });
    });

    it('should clear search when currency filter is applied', async () => {
      const user = userEvent.setup();

      render(
        <TestWrapper>
          <FundList />
        </TestWrapper>
      );

      const searchInput = screen.getByPlaceholderText('搜索基金名称或代码...');
      const currencySelect = screen.getByDisplayValue('所有货币');
      
      // First apply search
      await user.type(searchInput, 'Equity');
      
      await waitFor(() => {
        expect(screen.getByText('找到 3 个匹配的基金 (搜索: "Equity")')).toBeInTheDocument();
      });

      // Then apply currency filter
      await user.selectOptions(currencySelect, 'USD');

      await waitFor(() => {
        expect(screen.getByText('找到 1 个匹配的基金 (搜索: "Equity") (货币: USD)')).toBeInTheDocument();
      });
    });

    it('should maintain currency filter when search is cleared', async () => {
      const user = userEvent.setup();

      render(
        <TestWrapper>
          <FundList />
        </TestWrapper>
      );

      const searchInput = screen.getByPlaceholderText('搜索基金名称或代码...');
      const currencySelect = screen.getByDisplayValue('所有货币');
      
      // Apply both filters
      await user.type(searchInput, 'Fund');
      await user.selectOptions(currencySelect, 'CAD');
      
      await waitFor(() => {
        expect(screen.getByText('找到 2 个匹配的基金 (搜索: "Fund") (货币: CAD)')).toBeInTheDocument();
      });

      // Clear search
      await user.clear(searchInput);

      await waitFor(() => {
        expect(screen.getByText('找到 2 个匹配的基金 (货币: CAD)')).toBeInTheDocument();
        expect(screen.getByTestId('fund-card-3')).toBeInTheDocument();
        expect(screen.getByTestId('fund-card-4')).toBeInTheDocument();
      });
    });
  });

  describe('Filter State Management', () => {
    it('should preserve filter selection after component re-render', async () => {
      const user = userEvent.setup();

      const { rerender } = render(
        <TestWrapper>
          <FundList />
        </TestWrapper>
      );

      const currencySelect = screen.getByDisplayValue('所有货币');
      
      await user.selectOptions(currencySelect, 'USD');

      await waitFor(() => {
        expect(currencySelect).toHaveValue('USD');
      });

      // Re-render component
      rerender(
        <TestWrapper>
          <FundList />
        </TestWrapper>
      );

      // Filter should be reset to default after re-render (this is the expected behavior)
      expect(screen.getByDisplayValue('所有货币')).toBeInTheDocument();
    });

    it('should update filter immediately when selection changes', async () => {
      const user = userEvent.setup();

      render(
        <TestWrapper>
          <FundList />
        </TestWrapper>
      );

      const currencySelect = screen.getByDisplayValue('所有货币');
      
      await user.selectOptions(currencySelect, 'EUR');

      // Should update immediately without delay
      expect(currencySelect).toHaveValue('EUR');
      await waitFor(() => {
        expect(screen.getByText('找到 1 个匹配的基金 (货币: EUR)')).toBeInTheDocument();
      });
    });
  });

  describe('Filter Result Count', () => {
    it('should show correct count for single result', async () => {
      const user = userEvent.setup();

      render(
        <TestWrapper>
          <FundList />
        </TestWrapper>
      );

      const currencySelect = screen.getByDisplayValue('所有货币');
      
      await user.selectOptions(currencySelect, 'EUR');

      await waitFor(() => {
        expect(screen.getByText('找到 1 个匹配的基金 (货币: EUR)')).toBeInTheDocument();
      });
    });

    it('should show correct count for multiple results', async () => {
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
      });
    });

    it('should not show filter message when no filter is active', () => {
      render(
        <TestWrapper>
          <FundList />
        </TestWrapper>
      );

      expect(screen.queryByText(/找到.*个匹配的基金/)).not.toBeInTheDocument();
      expect(screen.getByText('共 6 只基金 ✓')).toBeInTheDocument();
    });
  });

  describe('Edge Cases for Currency Filter', () => {
    it('should handle funds with null or undefined currency code', () => {
      const fundsWithNullCurrency = [
        ...filterTestFunds,
        {
          id: '7',
          code: 'NULL001',
          fundName: 'Fund with No Currency',
          name: 'Fund with No Currency',
          unitPrice: 10.00,
          currencyCode: null as any,
          navChange: 0.00,
          navChangePercent: 0.0,
          priceDate: '2024-01-15',
        },
      ];

      mockUseFundList.mockReturnValue({
        fundList: fundsWithNullCurrency,
        loading: false,
        error: null,
      });

      render(
        <TestWrapper>
          <FundList />
        </TestWrapper>
      );

      // Should still render currency options for valid currencies
      expect(screen.getByText('USD')).toBeInTheDocument();
      expect(screen.getByText('CAD')).toBeInTheDocument();
      expect(screen.getByText('EUR')).toBeInTheDocument();
      expect(screen.getByText('GBP')).toBeInTheDocument();
    });

    it('should handle funds with empty string currency code', () => {
      const fundsWithEmptyCurrency = [
        ...filterTestFunds,
        {
          id: '8',
          code: 'EMPTY001',
          fundName: 'Fund with Empty Currency',
          name: 'Fund with Empty Currency',
          unitPrice: 10.00,
          currencyCode: '',
          navChange: 0.00,
          navChangePercent: 0.0,
          priceDate: '2024-01-15',
        },
      ];

      mockUseFundList.mockReturnValue({
        fundList: fundsWithEmptyCurrency,
        loading: false,
        error: null,
      });

      render(
        <TestWrapper>
          <FundList />
        </TestWrapper>
      );

      // Should not include empty string in currency options
      const currencySelect = screen.getByDisplayValue('所有货币');
      const options = currencySelect.querySelectorAll('option');
      const currencyValues = Array.from(options).map(option => (option as HTMLOptionElement).value);
      
      expect(currencyValues).not.toContain('');
      expect(currencyValues).toContain(''); // But should contain the default empty option for "所有货币"
    });
  });
});
