import type { PortfolioData, WealthSpecialist, Transaction } from '../types';

export const mockPortfolioData: PortfolioData = {
  id: 'CWSXIFUNDSTHREE',
  name: 'CWSXIFUNDSTHREE,CWSXIFUNDSTHREE,CWSXIFUNDSTHREE',
  cifNumber: 'C000027106',
  totalValue: 14485393.54,
  unrealizedProfitLoss: 0.00,
  riskProfile: 'Moderate',
  lastUpdated: '08/07/2025',
  allocations: [
    {
      name: 'Equity',
      percentage: 85.89,
      amount: 11769860.89,
      color: '#22c55e'
    },
    {
      name: 'Bond',
      percentage: 6.13,
      amount: 839533.15,
      color: '#374151'
    },
    {
      name: 'Multi asset',
      percentage: 7.08,
      amount: 970399.80,
      color: '#3b82f6'
    },
    {
      name: 'Money market',
      percentage: 0.90,
      amount: 123466.60,
      color: '#ef4444'
    }
  ]
};

export const mockWealthSpecialist: WealthSpecialist = {
  name: 'EUSXHHUSO,MODOHMGO XCP,G.O',
  email: 'specialist@manulife.com',
  phone: '+1 (555) 123-4567'
};

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'Subscribe',
    amount: 50000,
    date: '2025-07-15',
    status: 'Completed'
  },
  {
    id: '2',
    type: 'Switch',
    amount: 25000,
    date: '2025-07-10',
    status: 'Pending'
  }
];
