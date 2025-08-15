import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import FundList from '../pages/FundList';
import { useFundList } from '../hooks/useFundData';

// Mock data for search tests
const searchTestFunds = [
  {
    id: '1',
    code: 'ABC123',
    fundName: 'Global Equity Fund',
    name: 'Global Equity Fund',
    unitPrice: 15.25,
    currencyCode: 'USD',
    navChange: 0.12,
    navChangePercent: 0.8,
    priceDate: '2024-01-15',
  },
  {
    id: '2',
    code: 'DEF456',
    fundName: 'Bond Income Fund',
    name: 'Bond Income Fund',
    unitPrice: 10.50,
    currencyCode: 'CAD',
    navChange: -0.05,
    navChangePercent: -0.5,
    priceDate: '2024-01-15',
  },
  {
    id: '3',
    code: 'GHI789',
    fundName: 'Technology Growth',
    name: 'Technology Growth',
    unitPrice: 25.75,
    currencyCode: 'USD',
    navChange: 0.35,
    navChangePercent: 1.4,
    priceDate: '2024-01-15',
  },
  {
    id: '4',
    code: 'JKL012',
    fundName: 'European Equity',
    name: 'European Equity',
    unitPrice: 18.90,
    currencyCode: 'EUR',
    navChange: 0.15,
    navChangePercent: 0.8,
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

describe('FundList Search Functionality', () => {
  beforeEach(() => {
    mockUseFundList.mockReturnValue({
      fundList: searchTestFunds,
      loading: false,
      error: null,
    });
    jest.clearAllMocks();
  });

  describe('Search Input Behavior', () => {
    it('should have proper search input attributes', () => {
      render(
        <TestWrapper>
          <FundList />
        </TestWrapper>
      );

      const searchInput = screen.getByPlaceholderText('搜索基金名称或代码...');
      expect(searchInput).toHaveAttribute('type', 'text');
      expect(searchInput).toHaveValue('');
    });

    it('should update input value when typing', async () => {
      const user = userEvent.setup();
      
      render(
        <TestWrapper>
          <FundList />
        </TestWrapper>
      );

      const searchInput = screen.getByPlaceholderText('搜索基金名称或代码...');
      
      await user.type(searchInput, 'test search');
      
      expect(searchInput).toHaveValue('test search');
    });

    it('should maintain search state when input loses focus', async () => {
      const user = userEvent.setup();
      
      render(
        <TestWrapper>
          <FundList />
        </TestWrapper>
      );

      const searchInput = screen.getByPlaceholderText('搜索基金名称或代码...');
      
      await user.type(searchInput, 'Equity');
      await user.tab(); // Move focus away
      
      expect(searchInput).toHaveValue('Equity');
    });
  });

  describe('Search by Fund Name', () => {
    it('should find funds by exact fund name match', async () => {
      const user = userEvent.setup();
      
      render(
        <TestWrapper>
          <FundList />
        </TestWrapper>
      );

      const searchInput = screen.getByPlaceholderText('搜索基金名称或代码...');
      
      await user.type(searchInput, 'Global Equity Fund');
      
      await waitFor(() => {
        expect(screen.getByText('找到 1 个匹配的基金 (搜索: "Global Equity Fund")')).toBeInTheDocument();
        expect(screen.getByTestId('fund-card-1')).toBeInTheDocument();
        expect(screen.queryByTestId('fund-card-2')).not.toBeInTheDocument();
      });
    });

    it('should find funds by partial fund name match', async () => {
      const user = userEvent.setup();
      
      render(
        <TestWrapper>
          <FundList />
        </TestWrapper>
      );

      const searchInput = screen.getByPlaceholderText('搜索基金名称或代码...');
      
      await user.type(searchInput, 'Equity');
      
      await waitFor(() => {
        expect(screen.getByText('找到 2 个匹配的基金 (搜索: "Equity")')).toBeInTheDocument();
        expect(screen.getByTestId('fund-card-1')).toBeInTheDocument(); // Global Equity Fund
        expect(screen.getByTestId('fund-card-4')).toBeInTheDocument(); // European Equity
        expect(screen.queryByTestId('fund-card-2')).not.toBeInTheDocument(); // Bond Income Fund
        expect(screen.queryByTestId('fund-card-3')).not.toBeInTheDocument(); // Technology Growth
      });
    });

    it('should handle search terms with multiple words', async () => {
      const user = userEvent.setup();
      
      render(
        <TestWrapper>
          <FundList />
        </TestWrapper>
      );

      const searchInput = screen.getByPlaceholderText('搜索基金名称或代码...');
      
      await user.type(searchInput, 'Bond Income');
      
      await waitFor(() => {
        expect(screen.getByText('找到 1 个匹配的基金 (搜索: "Bond Income")')).toBeInTheDocument();
        expect(screen.getByTestId('fund-card-2')).toBeInTheDocument();
        expect(screen.queryByTestId('fund-card-1')).not.toBeInTheDocument();
      });
    });
  });

  describe('Search by Fund Code', () => {
    it('should find funds by exact code match', async () => {
      const user = userEvent.setup();
      
      render(
        <TestWrapper>
          <FundList />
        </TestWrapper>
      );

      const searchInput = screen.getByPlaceholderText('搜索基金名称或代码...');
      
      await user.type(searchInput, 'ABC123');
      
      await waitFor(() => {
        expect(screen.getByText('找到 1 个匹配的基金 (搜索: "ABC123")')).toBeInTheDocument();
        expect(screen.getByTestId('fund-card-1')).toBeInTheDocument();
        expect(screen.queryByTestId('fund-card-2')).not.toBeInTheDocument();
      });
    });

    it('should find funds by partial code match', async () => {
      const user = userEvent.setup();
      
      render(
        <TestWrapper>
          <FundList />
        </TestWrapper>
      );

      const searchInput = screen.getByPlaceholderText('搜索基金名称或代码...');
      
      await user.type(searchInput, 'ABC');
      
      await waitFor(() => {
        expect(screen.getByText('找到 1 个匹配的基金 (搜索: "ABC")')).toBeInTheDocument();
        expect(screen.getByTestId('fund-card-1')).toBeInTheDocument();
      });
    });

    it('should handle numeric characters in codes', async () => {
      const user = userEvent.setup();
      
      render(
        <TestWrapper>
          <FundList />
        </TestWrapper>
      );

      const searchInput = screen.getByPlaceholderText('搜索基金名称或代码...');
      
      await user.type(searchInput, '456');
      
      await waitFor(() => {
        expect(screen.getByText('找到 1 个匹配的基金 (搜索: "456")')).toBeInTheDocument();
        expect(screen.getByTestId('fund-card-2')).toBeInTheDocument();
      });
    });
  });

  describe('Case Sensitivity', () => {
    it('should be case insensitive for fund names', async () => {
      const user = userEvent.setup();
      
      render(
        <TestWrapper>
          <FundList />
        </TestWrapper>
      );

      const searchInput = screen.getByPlaceholderText('搜索基金名称或代码...');
      
      await user.type(searchInput, 'GLOBAL equity FUND');
      
      await waitFor(() => {
        expect(screen.getByText('找到 1 个匹配的基金 (搜索: "GLOBAL equity FUND")')).toBeInTheDocument();
        expect(screen.getByTestId('fund-card-1')).toBeInTheDocument();
      });
    });

    it('should be case insensitive for fund codes', async () => {
      const user = userEvent.setup();
      
      render(
        <TestWrapper>
          <FundList />
        </TestWrapper>
      );

      const searchInput = screen.getByPlaceholderText('搜索基金名称或代码...');
      
      await user.type(searchInput, 'abc123');
      
      await waitFor(() => {
        expect(screen.getByText('找到 1 个匹配的基金 (搜索: "abc123")')).toBeInTheDocument();
        expect(screen.getByTestId('fund-card-1')).toBeInTheDocument();
      });
    });

    it('should handle mixed case searches', async () => {
      const user = userEvent.setup();
      
      render(
        <TestWrapper>
          <FundList />
        </TestWrapper>
      );

      const searchInput = screen.getByPlaceholderText('搜索基金名称或代码...');
      
      await user.type(searchInput, 'tEcHnOlOgY');
      
      await waitFor(() => {
        expect(screen.getByText('找到 1 个匹配的基金 (搜索: "tEcHnOlOgY")')).toBeInTheDocument();
        expect(screen.getByTestId('fund-card-3')).toBeInTheDocument();
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty search query', async () => {
      const user = userEvent.setup();
      
      render(
        <TestWrapper>
          <FundList />
        </TestWrapper>
      );

      const searchInput = screen.getByPlaceholderText('搜索基金名称或代码...');
      
      await user.type(searchInput, '   '); // Only spaces
      
      await waitFor(() => {
        expect(screen.getByText('共 4 只基金 ✓')).toBeInTheDocument();
        // All funds should be visible
        expect(screen.getByTestId('fund-card-1')).toBeInTheDocument();
        expect(screen.getByTestId('fund-card-2')).toBeInTheDocument();
        expect(screen.getByTestId('fund-card-3')).toBeInTheDocument();
        expect(screen.getByTestId('fund-card-4')).toBeInTheDocument();
      });
    });

    it('should handle search with special characters', async () => {
      const user = userEvent.setup();
      
      render(
        <TestWrapper>
          <FundList />
        </TestWrapper>
      );

      const searchInput = screen.getByPlaceholderText('搜索基金名称或代码...');
      
      await user.type(searchInput, '@#$%');
      
      await waitFor(() => {
        expect(screen.getByText('未找到匹配的基金')).toBeInTheDocument();
        expect(screen.getByText('请尝试其他关键词')).toBeInTheDocument();
      });
    });

    it('should trim whitespace from search query', async () => {
      const user = userEvent.setup();
      
      render(
        <TestWrapper>
          <FundList />
        </TestWrapper>
      );

      const searchInput = screen.getByPlaceholderText('搜索基金名称或代码...');
      
      await user.type(searchInput, '  Equity  ');
      
      await waitFor(() => {
        expect(screen.getByText('找到 2 个匹配的基金 (搜索: "  Equity  ")')).toBeInTheDocument();
        expect(screen.getByTestId('fund-card-1')).toBeInTheDocument();
        expect(screen.getByTestId('fund-card-4')).toBeInTheDocument();
      });
    });

    it('should handle very long search queries', async () => {
      const user = userEvent.setup();
      
      render(
        <TestWrapper>
          <FundList />
        </TestWrapper>
      );

      const searchInput = screen.getByPlaceholderText('搜索基金名称或代码...');
      const longQuery = 'This is a very long search query that does not match anything';
      
      await user.type(searchInput, longQuery);
      
      await waitFor(() => {
        expect(screen.getByText(`找到 0 个匹配的基金 (搜索: "${longQuery}")`)).not.toBeInTheDocument();
        expect(screen.getByText('未找到匹配的基金')).toBeInTheDocument();
      });
    });
  });

  describe('Search Performance', () => {
    it('should update results in real-time while typing', async () => {
      const user = userEvent.setup();
      
      render(
        <TestWrapper>
          <FundList />
        </TestWrapper>
      );

      const searchInput = screen.getByPlaceholderText('搜索基金名称或代码...');
      
      // Type character by character
      await user.type(searchInput, 'E');
      
      await waitFor(() => {
        expect(screen.getByText('找到 2 个匹配的基金 (搜索: "E")')).toBeInTheDocument();
      });
      
      await user.type(searchInput, 'q');
      
      await waitFor(() => {
        expect(screen.getByText('找到 2 个匹配的基金 (搜索: "Eq")')).toBeInTheDocument();
      });
      
      await user.type(searchInput, 'u');
      
      await waitFor(() => {
        expect(screen.getByText('找到 2 个匹配的基金 (搜索: "Equ")')).toBeInTheDocument();
      });
    });

    it('should handle rapid typing without lag', async () => {
      const user = userEvent.setup();
      
      render(
        <TestWrapper>
          <FundList />
        </TestWrapper>
      );

      const searchInput = screen.getByPlaceholderText('搜索基金名称或代码...');
      
      // Type rapidly
      await user.type(searchInput, 'Technology');
      
      await waitFor(() => {
        expect(screen.getByText('找到 1 个匹配的基金 (搜索: "Technology")')).toBeInTheDocument();
        expect(screen.getByTestId('fund-card-3')).toBeInTheDocument();
      });
    });
  });

  describe('Search Result Messaging', () => {
    it('should show correct count for single result', async () => {
      const user = userEvent.setup();
      
      render(
        <TestWrapper>
          <FundList />
        </TestWrapper>
      );

      const searchInput = screen.getByPlaceholderText('搜索基金名称或代码...');
      
      await user.type(searchInput, 'Technology');
      
      await waitFor(() => {
        expect(screen.getByText('找到 1 个匹配的基金 (搜索: "Technology")')).toBeInTheDocument();
      });
    });

    it('should show correct count for multiple results', async () => {
      const user = userEvent.setup();
      
      render(
        <TestWrapper>
          <FundList />
        </TestWrapper>
      );

      const searchInput = screen.getByPlaceholderText('搜索基金名称或代码...');
      
      await user.type(searchInput, 'Fund');
      
      await waitFor(() => {
        expect(screen.getByText('找到 2 个匹配的基金 (搜索: "Fund")')).toBeInTheDocument();
      });
    });

    it('should not show filter message when no search is active', () => {
      render(
        <TestWrapper>
          <FundList />
        </TestWrapper>
      );

      expect(screen.queryByText(/找到.*个匹配的基金/)).not.toBeInTheDocument();
      expect(screen.getByText('共 4 只基金 ✓')).toBeInTheDocument();
    });
  });
});
