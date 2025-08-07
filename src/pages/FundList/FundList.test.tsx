import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import FundList from './FundList';
import { useFundList } from '../../hooks/useFundData';
import type { Fund } from '../../types';

// Mock the hook
vi.mock('../../hooks/useFundData');

const mockUseFundList = vi.mocked(useFundList);

const mockFunds: Fund[] = [
  {
    id: '1',
    fundName: 'Global Equity Fund',
    code: 'GEF001',
    unitPrice: 125.50,
    currencyCode: 'USD',
    priceDate: '2024-01-15',
    navChange: 2.50,
    navChangePercent: 2.03
  },
  {
    id: '2',
    fundName: 'Philippine Bond Fund',
    code: 'PBF002',
    unitPrice: 98.75,
    currencyCode: 'PHP',
    priceDate: '2024-01-15',
    navChange: -1.25,
    navChangePercent: -1.25
  },
  {
    id: '3',
    fundName: 'Asian Growth Fund',
    code: 'AGF003',
    unitPrice: 215.30,
    currencyCode: 'USD',
    priceDate: '2024-01-15',
    navChange: 5.20,
    navChangePercent: 2.47
  },
  {
    id: '4',
    fundName: 'Money Market Fund',
    code: 'MMF004',
    unitPrice: 1000.00,
    currencyCode: 'PHP',
    priceDate: '2024-01-15',
    navChange: 0.50,
    navChangePercent: 0.05
  }
];

describe('FundList Component - Search and Filter', () => {
  const mockRefetch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseFundList.mockReturnValue({
      fundList: mockFunds,
      loading: false,
      error: null,
      refetch: mockRefetch
    });
  });

  describe('Initial State', () => {
    it('should display all funds when no filters are applied', () => {
      render(<FundList />);
      
      expect(screen.getByText('Global Equity Fund')).toBeInTheDocument();
      expect(screen.getByText('Philippine Bond Fund')).toBeInTheDocument();
      expect(screen.getByText('Asian Growth Fund')).toBeInTheDocument();
      expect(screen.getByText('Money Market Fund')).toBeInTheDocument();
      expect(screen.getByText('4 of 4 funds')).toBeInTheDocument();
    });

    it('should display search input and currency dropdown', () => {
      render(<FundList />);
      
      expect(screen.getByPlaceholderText('Search by fund name or code...')).toBeInTheDocument();
      expect(screen.getByRole('combobox')).toBeInTheDocument();
      expect(screen.getByDisplayValue('All Currencies')).toBeInTheDocument();
    });
  });

  describe('Search Functionality', () => {
    it('should filter funds by fund name (case insensitive)', async () => {
      const user = userEvent.setup();
      render(<FundList />);

      const searchInput = screen.getByPlaceholderText('Search by fund name or code...');
      await user.type(searchInput, 'equity');

      expect(screen.getByText('Global Equity Fund')).toBeInTheDocument();
      expect(screen.queryByText('Philippine Bond Fund')).not.toBeInTheDocument();
      expect(screen.queryByText('Asian Growth Fund')).not.toBeInTheDocument();
      expect(screen.queryByText('Money Market Fund')).not.toBeInTheDocument();
      expect(screen.getByText('1 of 4 funds')).toBeInTheDocument();
    });

    it('should filter funds by fund code (case insensitive)', async () => {
      const user = userEvent.setup();
      render(<FundList />);

      const searchInput = screen.getByPlaceholderText('Search by fund name or code...');
      await user.type(searchInput, 'pbf');

      expect(screen.queryByText('Global Equity Fund')).not.toBeInTheDocument();
      expect(screen.getByText('Philippine Bond Fund')).toBeInTheDocument();
      expect(screen.queryByText('Asian Growth Fund')).not.toBeInTheDocument();
      expect(screen.queryByText('Money Market Fund')).not.toBeInTheDocument();
      expect(screen.getByText('1 of 4 funds')).toBeInTheDocument();
    });

    it('should handle partial matches in fund name', async () => {
      const user = userEvent.setup();
      render(<FundList />);

      const searchInput = screen.getByPlaceholderText('Search by fund name or code...');
      await user.type(searchInput, 'fund');

      // All funds contain "Fund"
      expect(screen.getByText('Global Equity Fund')).toBeInTheDocument();
      expect(screen.getByText('Philippine Bond Fund')).toBeInTheDocument();
      expect(screen.getByText('Asian Growth Fund')).toBeInTheDocument();
      expect(screen.getByText('Money Market Fund')).toBeInTheDocument();
      expect(screen.getByText('4 of 4 funds')).toBeInTheDocument();
    });

    it('should show no results when search yields no matches', async () => {
      const user = userEvent.setup();
      render(<FundList />);

      const searchInput = screen.getByPlaceholderText('Search by fund name or code...');
      await user.type(searchInput, 'nonexistent');

      expect(screen.getByText('No Funds Found')).toBeInTheDocument();
      expect(screen.getByText('No funds match your filter criteria. Try adjusting your filters.')).toBeInTheDocument();
      expect(screen.getByText('0 of 4 funds')).toBeInTheDocument();
    });

    it('should display active search filter badge', async () => {
      const user = userEvent.setup();
      render(<FundList />);

      const searchInput = screen.getByPlaceholderText('Search by fund name or code...');
      await user.type(searchInput, 'equity');

      expect(screen.getByText('Active filters:')).toBeInTheDocument();
      expect(screen.getByText('Search: "equity"')).toBeInTheDocument();
    });

    it('should clear search when clear button is clicked', async () => {
      const user = userEvent.setup();
      render(<FundList />);

      const searchInput = screen.getByPlaceholderText('Search by fund name or code...');
      await user.type(searchInput, 'equity');

      expect(screen.getByText('1 of 4 funds')).toBeInTheDocument();

      // Find and click the clear search button (X button in search input)
      const clearButton = screen.getByRole('button', { name: '' }); // SVG button
      await user.click(clearButton);

      expect(screen.getByText('4 of 4 funds')).toBeInTheDocument();
      expect(searchInput).toHaveValue('');
    });

    it('should handle whitespace-only search terms', async () => {
      const user = userEvent.setup();
      render(<FundList />);

      const searchInput = screen.getByPlaceholderText('Search by fund name or code...');
      await user.type(searchInput, '   ');

      // Should show all funds (whitespace should be ignored)
      expect(screen.getByText('4 of 4 funds')).toBeInTheDocument();
    });
  });

  describe('Currency Filter Functionality', () => {
    it('should display all available currencies in dropdown', () => {
      render(<FundList />);

      const currencySelect = screen.getByRole('combobox');
      expect(currencySelect).toBeInTheDocument();

      // Check if currency options are available
      expect(screen.getByRole('option', { name: 'All Currencies' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'PHP' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'USD' })).toBeInTheDocument();
    });

    it('should filter funds by selected currency', async () => {
      const user = userEvent.setup();
      render(<FundList />);

      const currencySelect = screen.getByRole('combobox');
      await user.selectOptions(currencySelect, 'USD');

      // Should show only USD funds
      expect(screen.getByText('Global Equity Fund')).toBeInTheDocument();
      expect(screen.getByText('Asian Growth Fund')).toBeInTheDocument();
      expect(screen.queryByText('Philippine Bond Fund')).not.toBeInTheDocument();
      expect(screen.queryByText('Money Market Fund')).not.toBeInTheDocument();
      expect(screen.getByText('2 of 4 funds')).toBeInTheDocument();
    });

    it('should display active currency filter badge', async () => {
      const user = userEvent.setup();
      render(<FundList />);

      const currencySelect = screen.getByRole('combobox');
      await user.selectOptions(currencySelect, 'PHP');

      expect(screen.getByText('Active filters:')).toBeInTheDocument();
      expect(screen.getByText('Currency: PHP')).toBeInTheDocument();
    });

    it('should reset to all funds when "All Currencies" is selected', async () => {
      const user = userEvent.setup();
      render(<FundList />);

      const currencySelect = screen.getByRole('combobox');
      
      // First filter by USD
      await user.selectOptions(currencySelect, 'USD');
      expect(screen.getByText('2 of 4 funds')).toBeInTheDocument();

      // Then select "All Currencies"
      await user.selectOptions(currencySelect, '');
      expect(screen.getByText('4 of 4 funds')).toBeInTheDocument();
    });
  });

  describe('Combined Search and Filter', () => {
    it('should apply both search and currency filters simultaneously', async () => {
      const user = userEvent.setup();
      render(<FundList />);

      const searchInput = screen.getByPlaceholderText('Search by fund name or code...');
      const currencySelect = screen.getByRole('combobox');

      await user.type(searchInput, 'fund');
      await user.selectOptions(currencySelect, 'USD');

      // Should show only USD funds containing "fund"
      expect(screen.getByText('Global Equity Fund')).toBeInTheDocument();
      expect(screen.getByText('Asian Growth Fund')).toBeInTheDocument();
      expect(screen.queryByText('Philippine Bond Fund')).not.toBeInTheDocument();
      expect(screen.queryByText('Money Market Fund')).not.toBeInTheDocument();
      expect(screen.getByText('2 of 4 funds')).toBeInTheDocument();

      // Check both filter badges are shown
      expect(screen.getByText('Search: "fund"')).toBeInTheDocument();
      expect(screen.getByText('Currency: USD')).toBeInTheDocument();
    });

    it('should show no results when combined filters yield no matches', async () => {
      const user = userEvent.setup();
      render(<FundList />);

      const searchInput = screen.getByPlaceholderText('Search by fund name or code...');
      const currencySelect = screen.getByRole('combobox');

      await user.type(searchInput, 'Bond');
      await user.selectOptions(currencySelect, 'USD');

      expect(screen.getByText('No Funds Found')).toBeInTheDocument();
      expect(screen.getByText('0 of 4 funds')).toBeInTheDocument();
    });
  });

  describe('Clear Filters Functionality', () => {
    it('should show Clear Filters button when any filter is active', async () => {
      const user = userEvent.setup();
      render(<FundList />);

      const searchInput = screen.getByPlaceholderText('Search by fund name or code...');
      await user.type(searchInput, 'equity');

      expect(screen.getByRole('button', { name: 'Clear Filters' })).toBeInTheDocument();
    });

    it('should clear all filters when Clear Filters button is clicked', async () => {
      const user = userEvent.setup();
      render(<FundList />);

      const searchInput = screen.getByPlaceholderText('Search by fund name or code...');
      const currencySelect = screen.getByRole('combobox');

      await user.type(searchInput, 'equity');
      await user.selectOptions(currencySelect, 'USD');

      expect(screen.getByText('1 of 4 funds')).toBeInTheDocument();

      const clearFiltersButton = screen.getByRole('button', { name: 'Clear Filters' });
      await user.click(clearFiltersButton);

      expect(searchInput).toHaveValue('');
      expect(currencySelect).toHaveValue('');
      expect(screen.getByText('4 of 4 funds')).toBeInTheDocument();
      expect(screen.queryByText('Active filters:')).not.toBeInTheDocument();
    });

    it('should clear filters from No Funds Found state', async () => {
      const user = userEvent.setup();
      render(<FundList />);

      const searchInput = screen.getByPlaceholderText('Search by fund name or code...');
      await user.type(searchInput, 'nonexistent');

      expect(screen.getByText('No Funds Found')).toBeInTheDocument();

      const clearFiltersButton = screen.getByRole('button', { name: 'Clear Filters' });
      await user.click(clearFiltersButton);

      expect(screen.getByText('4 of 4 funds')).toBeInTheDocument();
      expect(screen.getByText('Global Equity Fund')).toBeInTheDocument();
    });
  });

  describe('Loading and Error States', () => {
    it('should not show filters during loading state', () => {
      mockUseFundList.mockReturnValue({
        fundList: [],
        loading: true,
        error: null,
        refetch: mockRefetch
      });

      render(<FundList />);

      expect(screen.getByText('Loading fund list...')).toBeInTheDocument();
      expect(screen.queryByPlaceholderText('Search by fund name or code...')).not.toBeInTheDocument();
      expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
    });

    it('should not show filters during error state', () => {
      mockUseFundList.mockReturnValue({
        fundList: [],
        loading: false,
        error: 'Network error',
        refetch: mockRefetch
      });

      render(<FundList />);

      expect(screen.getByText('Error loading fund list')).toBeInTheDocument();
      expect(screen.queryByPlaceholderText('Search by fund name or code...')).not.toBeInTheDocument();
      expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
    });
  });

  describe('Fund Display', () => {
    it('should display fund information correctly', () => {
      render(<FundList />);

      expect(screen.getByText('Global Equity Fund')).toBeInTheDocument();
      expect(screen.getByText('Code: GEF001')).toBeInTheDocument();
      expect(screen.getByText('+$2.50')).toBeInTheDocument();
      expect(screen.getByText('+2.03%')).toBeInTheDocument();
    });

    it('should display negative NAV changes correctly', () => {
      render(<FundList />);

      expect(screen.getByText('-₱1.25')).toBeInTheDocument();
      expect(screen.getByText('-1.25%')).toBeInTheDocument();
    });

    it('should handle singular vs plural fund count correctly', () => {
      mockUseFundList.mockReturnValue({
        fundList: [mockFunds[0]],
        loading: false,
        error: null,
        refetch: mockRefetch
      });

      render(<FundList />);
      expect(screen.getByText('1 of 1 fund')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty fund list', () => {
      mockUseFundList.mockReturnValue({
        fundList: [],
        loading: false,
        error: null,
        refetch: mockRefetch
      });

      render(<FundList />);

      expect(screen.getByText('No Funds Available')).toBeInTheDocument();
      expect(screen.getByText('No funds are currently available for investment.')).toBeInTheDocument();
    });

    it('should handle special characters in search', async () => {
      const user = userEvent.setup();
      render(<FundList />);

      const searchInput = screen.getByPlaceholderText('Search by fund name or code...');
      await user.type(searchInput, 'GEF001');

      expect(screen.getByText('Global Equity Fund')).toBeInTheDocument();
      expect(screen.getByText('1 of 4 funds')).toBeInTheDocument();
    });
  });
});
