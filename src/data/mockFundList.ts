import type { Fund } from '../types/fund';

// 模拟基金列表数据，作为API的备用数据
export const mockFundList: Fund[] = [
  {
    id: 'CWSECUF003',
    fundName: 'Manulife Global Growth Fund',
    name: 'Manulife Global Growth Fund',
    code: 'MGGF',
    unitPrice: 15.68,
    currencyCode: 'USD',
    priceDate: '2025-08-15',
    navChange: 0.25,
    navChangePercent: 1.62
  },
  {
    id: 'CWSECUF004',
    fundName: 'Manulife Asia Pacific Equity Fund',
    name: 'Manulife Asia Pacific Equity Fund',
    code: 'MAPEF',
    unitPrice: 11.23,
    currencyCode: 'USD',
    priceDate: '2025-08-15',
    navChange: 0.08,
    navChangePercent: 0.72
  },
  {
    id: 'CWSECUF005',
    fundName: 'Manulife Conservative Bond Fund',
    name: 'Manulife Conservative Bond Fund',
    code: 'MCBF',
    unitPrice: 102.45,
    currencyCode: 'USD',
    priceDate: '2025-08-15',
    navChange: 0.05,
    navChangePercent: 0.05
  },
  {
    id: 'fund-001',
    fundName: '宏利环球股票基金',
    name: '宏利环球股票基金',
    code: 'ML001',
    unitPrice: 12.45,
    currencyCode: 'USD',
    priceDate: '2024-01-15',
    navChange: 0.15,
    navChangePercent: 1.22
  },
  {
    id: 'fund-002',
    fundName: '宏利亚洲债券基金',
    name: '宏利亚洲债券基金',
    code: 'ML002',
    unitPrice: 98.76,
    currencyCode: 'HKD',
    priceDate: '2024-01-15',
    navChange: 0.12,
    navChangePercent: 0.12
  },
  {
    id: 'CWSECUF006',
    fundName: 'Manulife European Equity Fund',
    name: 'Manulife European Equity Fund',
    code: 'MEEF',
    unitPrice: 9.87,
    currencyCode: 'EUR',
    priceDate: '2025-08-15',
    navChange: -0.12,
    navChangePercent: -1.20
  },
  {
    id: 'CWSECUF007',
    fundName: 'Manulife Emerging Markets Fund',
    name: 'Manulife Emerging Markets Fund',
    code: 'MEMF',
    unitPrice: 8.45,
    currencyCode: 'USD',
    priceDate: '2025-08-15',
    navChange: 0.18,
    navChangePercent: 2.18
  },
  {
    id: 'CWSECUF008',
    fundName: 'Manulife Technology Fund',
    name: 'Manulife Technology Fund',
    code: 'MTF',
    unitPrice: 22.67,
    currencyCode: 'USD',
    priceDate: '2025-08-15',
    navChange: 0.89,
    navChangePercent: 4.08
  }
];
