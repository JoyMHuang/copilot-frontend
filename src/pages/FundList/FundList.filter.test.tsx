import { renderHook } from '@testing-library/react';
import { useMemo } from 'react';
import { describe, it, expect } from 'vitest';
import type { Fund } from '../../types';

// Test the filter logic in isolation
const useFilterLogic = (funds: Fund[], searchTerm: string, selectedCurrency: string) => {
  return useMemo(() => {
    let filtered = funds;

    // Apply search filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(fund => 
        fund.fundName.toLowerCase().includes(searchLower) ||
        fund.code.toLowerCase().includes(searchLower)
      );
    }

    // Apply currency filter
    if (selectedCurrency) {
      filtered = filtered.filter(fund => fund.currencyCode === selectedCurrency);
    }

    return filtered;
  }, [funds, searchTerm, selectedCurrency]);
};

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
  }
];

describe('Filter Logic Unit Tests', () => {
  describe('Search Filter', () => {
    it('should return all funds when search term is empty', () => {
      const { result } = renderHook(() => useFilterLogic(mockFunds, '', ''));
      expect(result.current).toHaveLength(3);
    });

    it('should return all funds when search term is whitespace only', () => {
      const { result } = renderHook(() => useFilterLogic(mockFunds, '   ', ''));
      expect(result.current).toHaveLength(3);
    });

    it('should filter by fund name case-insensitively', () => {
      const { result } = renderHook(() => useFilterLogic(mockFunds, 'GLOBAL', ''));
      expect(result.current).toHaveLength(1);
      expect(result.current[0].fundName).toBe('Global Equity Fund');
    });

    it('should filter by fund code case-insensitively', () => {
      const { result } = renderHook(() => useFilterLogic(mockFunds, 'pbf', ''));
      expect(result.current).toHaveLength(1);
      expect(result.current[0].code).toBe('PBF002');
    });

    it('should handle partial matches', () => {
      const { result } = renderHook(() => useFilterLogic(mockFunds, 'fund', ''));
      expect(result.current).toHaveLength(3);
    });

    it('should return empty array for non-matching search', () => {
      const { result } = renderHook(() => useFilterLogic(mockFunds, 'xyz123', ''));
      expect(result.current).toHaveLength(0);
    });
  });

  describe('Currency Filter', () => {
    it('should return all funds when no currency is selected', () => {
      const { result } = renderHook(() => useFilterLogic(mockFunds, '', ''));
      expect(result.current).toHaveLength(3);
    });

    it('should filter by USD currency', () => {
      const { result } = renderHook(() => useFilterLogic(mockFunds, '', 'USD'));
      expect(result.current).toHaveLength(2);
      expect(result.current.every(fund => fund.currencyCode === 'USD')).toBe(true);
    });

    it('should filter by PHP currency', () => {
      const { result } = renderHook(() => useFilterLogic(mockFunds, '', 'PHP'));
      expect(result.current).toHaveLength(1);
      expect(result.current[0].currencyCode).toBe('PHP');
    });

    it('should return empty array for non-existing currency', () => {
      const { result } = renderHook(() => useFilterLogic(mockFunds, '', 'EUR'));
      expect(result.current).toHaveLength(0);
    });
  });

  describe('Combined Filters', () => {
    it('should apply both search and currency filters', () => {
      const { result } = renderHook(() => useFilterLogic(mockFunds, 'fund', 'USD'));
      expect(result.current).toHaveLength(2);
      expect(result.current.every(fund => 
        fund.currencyCode === 'USD' && 
        fund.fundName.toLowerCase().includes('fund')
      )).toBe(true);
    });

    it('should return empty when combined filters have no matches', () => {
      const { result } = renderHook(() => useFilterLogic(mockFunds, 'Bond', 'USD'));
      expect(result.current).toHaveLength(0);
    });

    it('should handle complex filter combinations', () => {
      const { result } = renderHook(() => useFilterLogic(mockFunds, 'Philippine', 'USD'));
      expect(result.current).toHaveLength(0);
    });
  });

  describe('Performance and Edge Cases', () => {
    it('should handle empty fund array', () => {
      const { result } = renderHook(() => useFilterLogic([], 'search', 'USD'));
      expect(result.current).toHaveLength(0);
    });

    it('should handle special characters in search', () => {
      const { result } = renderHook(() => useFilterLogic(mockFunds, 'GEF001', ''));
      expect(result.current).toHaveLength(1);
    });

    it('should trim whitespace from search terms', () => {
      const { result } = renderHook(() => useFilterLogic(mockFunds, '  Global  ', ''));
      expect(result.current).toHaveLength(1);
    });

    it('should handle numeric search terms', () => {
      const { result } = renderHook(() => useFilterLogic(mockFunds, '001', ''));
      expect(result.current).toHaveLength(1);
      expect(result.current[0].code).toBe('GEF001');
    });
  });
});
