import { vi } from 'vitest';
import type { Fund } from '../../services/fundApi';

export const mockFunds: Fund[] = [
  {
    id: '1',
    fundName: 'Global Growth Fund',
    code: 'GGF001',
    unitPrice: 10.5432,
    currencyCode: 'USD',
    priceDate: '2025-01-15',
    navChange: 0.0234,
    navChangePercent: 0.22,
  },
  {
    id: '2',
    fundName: 'Asian Equity Fund',
    code: 'AEF002',
    unitPrice: 15.7890,
    currencyCode: 'USD',
    priceDate: '2025-01-15',
    navChange: -0.0156,
    navChangePercent: -0.10,
  },
  {
    id: '3',
    fundName: 'European Bond Fund',
    code: 'EBF003',
    unitPrice: 98.2345,
    currencyCode: 'EUR',
    priceDate: '2025-01-15',
    navChange: 0.1234,
    navChangePercent: 0.13,
  },
  {
    id: '4',
    fundName: 'China A-Share Fund',
    code: 'CAS004',
    unitPrice: 8.9012,
    currencyCode: 'CNY',
    priceDate: '2025-01-15',
    navChange: -0.0567,
    navChangePercent: -0.63,
  },
  {
    id: '5',
    fundName: 'Technology Innovation Fund',
    code: 'TIF005',
    unitPrice: 25.6789,
    currencyCode: 'USD',
    priceDate: '2025-01-15',
    navChange: 0.3456,
    navChangePercent: 1.37,
  }
];

export const FundApiServiceMock = {
  getFundList: vi.fn().mockResolvedValue(mockFunds),
};
