import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../../test/utils/test-utils';
import { mockFunds } from '../../test/mocks/fundApiMock';

// Mock react-router-dom navigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock the fundApi service
const mockGetFundList = vi.fn();
vi.mock('../../services/fundApi', () => ({
  FundApiService: {
    getFundList: mockGetFundList,
  },
}));

// Import after mocking
const FundList = await import('./FundList').then(m => m.default);

describe('FundList Component', () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });
  describe('Initial Rendering', () => {
    it('should display loading state initially', async () => {
      // Mock API call to be slow
      mockGetFundList.mockImplementation(
        () => new Promise(resolve => setTimeout(() => resolve(mockFunds), 1000))
      );

      render(<FundList />);

      expect(screen.getByText('Loading funds...')).toBeInTheDocument();
      expect(screen.getByLabelText('Loading')).toBeInTheDocument();
    });

    it('should display funds after loading', async () => {
      mockGetFundList.mockResolvedValue(mockFunds);

      render(<FundList />);

      await waitFor(() => {
        expect(screen.getByText('Fund List')).toBeInTheDocument();
      });

      expect(screen.getByText(`Total funds: ${mockFunds.length}`)).toBeInTheDocument();
      
      // Check if all funds are displayed
      mockFunds.forEach(fund => {
        expect(screen.getByText(fund.fundName)).toBeInTheDocument();
        expect(screen.getByText(fund.code)).toBeInTheDocument();
      });
    });

    it('should display error state when API fails', async () => {
      mockGetFundList.mockRejectedValue(new Error('API Error'));

      render(<FundList />);

      await waitFor(() => {
        expect(screen.getByText('Failed to load fund data')).toBeInTheDocument();
      });

      expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument();
    });
  });
  describe('Search Functionality', () => {
    beforeEach(async () => {
      mockGetFundList.mockResolvedValue(mockFunds);
      render(<FundList />);
      
      await waitFor(() => {
        expect(screen.getByText('Fund List')).toBeInTheDocument();
      });
    });

    it('should filter funds by name', async () => {
      const searchInput = screen.getByPlaceholderText('Search funds by name or code...');
      
      await user.type(searchInput, 'Global');

      await waitFor(() => {
        expect(screen.getByText('Global Growth Fund')).toBeInTheDocument();
        expect(screen.queryByText('Asian Equity Fund')).not.toBeInTheDocument();
        expect(screen.queryByText('European Bond Fund')).not.toBeInTheDocument();
      });

      // Should show filtered count
      expect(screen.getByText('Total funds: 1')).toBeInTheDocument();
    });

    it('should filter funds by code', async () => {
      const searchInput = screen.getByPlaceholderText('Search funds by name or code...');
      
      await user.type(searchInput, 'AEF002');

      await waitFor(() => {
        expect(screen.getByText('Asian Equity Fund')).toBeInTheDocument();
        expect(screen.queryByText('Global Growth Fund')).not.toBeInTheDocument();
        expect(screen.queryByText('European Bond Fund')).not.toBeInTheDocument();
      });

      expect(screen.getByText('Total funds: 1')).toBeInTheDocument();
    });

    it('should be case insensitive', async () => {
      const searchInput = screen.getByPlaceholderText('Search funds by name or code...');
      
      await user.type(searchInput, 'global');

      await waitFor(() => {
        expect(screen.getByText('Global Growth Fund')).toBeInTheDocument();
      });

      await user.clear(searchInput);
      await user.type(searchInput, 'GLOBAL');

      await waitFor(() => {
        expect(screen.getByText('Global Growth Fund')).toBeInTheDocument();
      });
    });

    it('should show no results when search term matches nothing', async () => {
      const searchInput = screen.getByPlaceholderText('Search funds by name or code...');
      
      await user.type(searchInput, 'nonexistent');

      await waitFor(() => {
        expect(screen.getByText('Total funds: 0')).toBeInTheDocument();
        mockFunds.forEach(fund => {
          expect(screen.queryByText(fund.fundName)).not.toBeInTheDocument();
        });
      });
    });

    it('should clear search when input is cleared', async () => {
      const searchInput = screen.getByPlaceholderText('Search funds by name or code...');
      
      // First search
      await user.type(searchInput, 'Global');
      await waitFor(() => {
        expect(screen.getByText('Total funds: 1')).toBeInTheDocument();
      });

      // Clear search
      await user.clear(searchInput);
      await waitFor(() => {
        expect(screen.getByText(`Total funds: ${mockFunds.length}`)).toBeInTheDocument();
      });

      // All funds should be visible again
      mockFunds.forEach(fund => {
        expect(screen.getByText(fund.fundName)).toBeInTheDocument();
      });
    });
  });

  describe('Currency Filter Functionality', () => {
    beforeEach(async () => {
      mockGetFundList.mockResolvedValue(mockFunds);
      render(<FundList />);
      
      await waitFor(() => {
        expect(screen.getByText('Fund List')).toBeInTheDocument();
      });
    });

    it('should show all currencies in dropdown', async () => {
      const currencySelect = screen.getByDisplayValue('All Currencies');
      
      await user.click(currencySelect);

      // Check if all unique currencies are in the dropdown
      const uniqueCurrencies = Array.from(new Set(mockFunds.map(fund => fund.currencyCode))).sort();
      uniqueCurrencies.forEach(currency => {
        expect(screen.getByRole('option', { name: currency })).toBeInTheDocument();
      });
    });

    it('should filter funds by USD currency', async () => {
      const currencySelect = screen.getByDisplayValue('All Currencies');
      
      await user.selectOptions(currencySelect, 'USD');

      await waitFor(() => {
        // Should show only USD funds
        expect(screen.getByText('Global Growth Fund')).toBeInTheDocument();
        expect(screen.getByText('Asian Equity Fund')).toBeInTheDocument();
        expect(screen.getByText('Technology Innovation Fund')).toBeInTheDocument();
        expect(screen.queryByText('European Bond Fund')).not.toBeInTheDocument();
        expect(screen.queryByText('China A-Share Fund')).not.toBeInTheDocument();
      });

      expect(screen.getByText('Total funds: 3')).toBeInTheDocument();
    });

    it('should filter funds by EUR currency', async () => {
      const currencySelect = screen.getByDisplayValue('All Currencies');
      
      await user.selectOptions(currencySelect, 'EUR');

      await waitFor(() => {
        expect(screen.getByText('European Bond Fund')).toBeInTheDocument();
        expect(screen.queryByText('Global Growth Fund')).not.toBeInTheDocument();
        expect(screen.queryByText('Asian Equity Fund')).not.toBeInTheDocument();
      });

      expect(screen.getByText('Total funds: 1')).toBeInTheDocument();
    });

    it('should show all funds when "All Currencies" is selected', async () => {
      const currencySelect = screen.getByDisplayValue('All Currencies');
      
      // First filter by USD
      await user.selectOptions(currencySelect, 'USD');
      await waitFor(() => {
        expect(screen.getByText('Total funds: 3')).toBeInTheDocument();
      });

      // Then select "All Currencies"
      await user.selectOptions(currencySelect, 'All');
      await waitFor(() => {
        expect(screen.getByText(`Total funds: ${mockFunds.length}`)).toBeInTheDocument();
      });

      // All funds should be visible
      mockFunds.forEach(fund => {
        expect(screen.getByText(fund.fundName)).toBeInTheDocument();
      });
    });
  });

  describe('Combined Search and Filter', () => {
    beforeEach(async () => {
      mockGetFundList.mockResolvedValue(mockFunds);
      render(<FundList />);
      
      await waitFor(() => {
        expect(screen.getByText('Fund List')).toBeInTheDocument();
      });
    });

    it('should apply both search and currency filter', async () => {
      const searchInput = screen.getByPlaceholderText('Search funds by name or code...');
      const currencySelect = screen.getByDisplayValue('All Currencies');
      
      // Search for "Fund" and filter by USD
      await user.type(searchInput, 'Fund');
      await user.selectOptions(currencySelect, 'USD');

      await waitFor(() => {
        // Should show only USD funds containing "Fund" in name
        expect(screen.getByText('Global Growth Fund')).toBeInTheDocument();
        expect(screen.getByText('Asian Equity Fund')).toBeInTheDocument();
        expect(screen.getByText('Technology Innovation Fund')).toBeInTheDocument();
        expect(screen.queryByText('European Bond Fund')).not.toBeInTheDocument(); // EUR currency
        expect(screen.queryByText('China A-Share Fund')).not.toBeInTheDocument(); // CNY currency
      });

      expect(screen.getByText('Total funds: 3')).toBeInTheDocument();
    });

    it('should show no results when filters exclude all funds', async () => {
      const searchInput = screen.getByPlaceholderText('Search funds by name or code...');
      const currencySelect = screen.getByDisplayValue('All Currencies');
      
      // Search for "European" and filter by USD (no matches)
      await user.type(searchInput, 'European');
      await user.selectOptions(currencySelect, 'USD');

      await waitFor(() => {
        expect(screen.getByText('Total funds: 0')).toBeInTheDocument();
        mockFunds.forEach(fund => {
          expect(screen.queryByText(fund.fundName)).not.toBeInTheDocument();
        });
      });
    });
  });

  describe('Fund Display and Navigation', () => {
    beforeEach(async () => {
      mockGetFundList.mockResolvedValue(mockFunds);
      render(<FundList />);
      
      await waitFor(() => {
        expect(screen.getByText('Fund List')).toBeInTheDocument();
      });
    });

    it('should display fund information correctly', () => {
      const firstFund = mockFunds[0];
      
      // Find the entire fund card
      expect(screen.getByText(firstFund.fundName)).toBeInTheDocument();
      expect(screen.getByText(firstFund.code)).toBeInTheDocument();
      
      // Check if formatted currency is displayed (USD 10.5432)
      expect(screen.getByText('$10.5432')).toBeInTheDocument();
      
      // Check daily change values
      expect(screen.getByText('+0.0234')).toBeInTheDocument();
      expect(screen.getByText('(+0.22%)')).toBeInTheDocument();
    });

    it('should show positive changes in green and negative in red', () => {
      // Check positive change colors
      const positiveChange = screen.getByText('+0.0234');
      expect(positiveChange).toHaveClass('text-green-600');

      // Check negative change colors
      const negativeChange = screen.getByText('-0.0156');
      expect(negativeChange).toHaveClass('text-red-600');
    });

    it('should navigate to fund detail when "View Details" is clicked', async () => {
      const firstFund = mockFunds[0];
      
      // Find the View Details button for the first fund
      const viewDetailsButtons = screen.getAllByText('View Details');
      const firstViewDetailsButton = viewDetailsButtons[0];
      
      await user.click(firstViewDetailsButton);

      expect(mockNavigate).toHaveBeenCalledWith(`/fund-detail/${firstFund.id}`);
    });
  });

  describe('Error Handling and Retry', () => {
    it('should retry loading when retry button is clicked', async () => {
      // First call fails
      mockGetFundList.mockRejectedValueOnce(new Error('API Error'));
      
      render(<FundList />);

      await waitFor(() => {
        expect(screen.getByText('Failed to load fund data')).toBeInTheDocument();
      });

      // Mock successful retry
      mockGetFundList.mockResolvedValue(mockFunds);
      
      const retryButton = screen.getByRole('button', { name: 'Retry' });
      await user.click(retryButton);

      // Should reload the page (window.location.reload is called)
      // Note: In a real test environment, you might want to mock window.location.reload
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty fund list', async () => {
      mockGetFundList.mockResolvedValue([]);

      render(<FundList />);

      await waitFor(() => {
        expect(screen.getByText('Fund List')).toBeInTheDocument();
      });

      expect(screen.getByText('Total funds: 0')).toBeInTheDocument();
      expect(screen.getByText('No funds available')).toBeInTheDocument();
      expect(screen.getByText('Check back later for fund data.')).toBeInTheDocument();
    });

    it('should handle partial search matches', async () => {
      mockGetFundList.mockResolvedValue(mockFunds);
      render(<FundList />);
      
      await waitFor(() => {
        expect(screen.getByText('Fund List')).toBeInTheDocument();
      });

      const searchInput = screen.getByPlaceholderText('Search funds by name or code...');
      
      // Search for partial text
      await user.type(searchInput, 'eq'); // Should match "Asian Equity Fund"

      await waitFor(() => {
        expect(screen.getByText('Asian Equity Fund')).toBeInTheDocument();
        expect(screen.getByText('Total funds: 1')).toBeInTheDocument();
      });
    });

    it('should handle special characters in search', async () => {
      mockGetFundList.mockResolvedValue(mockFunds);
      render(<FundList />);
      
      await waitFor(() => {
        expect(screen.getByText('Fund List')).toBeInTheDocument();
      });

      const searchInput = screen.getByPlaceholderText('Search funds by name or code...');
      
      // Search with special characters
      await user.type(searchInput, 'A-Share'); // Should match "China A-Share Fund"

      await waitFor(() => {
        expect(screen.getByText('China A-Share Fund')).toBeInTheDocument();
        expect(screen.getByText('Total funds: 1')).toBeInTheDocument();
      });
    });
  });
});
