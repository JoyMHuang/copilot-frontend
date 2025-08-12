import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FundList from './FundList';

// Mock FundApiService
jest.mock('../../services/fundApi', () => ({
  __esModule: true,
  default: {
    getFundList: jest.fn(),
  },
}));

import FundApiService from '../../services/fundApi';

const mockFunds = [
  {
    id: '1',
    fundName: 'Growth Fund',
    code: 'GF001',
    unitPrice: 1.23,
    currencyCode: 'USD',
    priceDate: '2025-08-10',
    navChange: 0.05,
    navChangePercent: 4.24,
  },
  {
    id: '2',
    fundName: 'Income Fund',
    code: 'IF002',
    unitPrice: 2.34,
    currencyCode: 'HKD',
    priceDate: '2025-08-10',
    navChange: -0.02,
    navChangePercent: -0.85,
  },
  {
    id: '3',
    fundName: 'Balanced Fund',
    code: 'BF003',
    unitPrice: 3.45,
    currencyCode: 'USD',
    priceDate: '2025-08-10',
    navChange: 0.01,
    navChangePercent: 0.29,
  },
];

const renderWithRouter = (ui: React.ReactElement) => render(<MemoryRouter>{ui}</MemoryRouter>);

describe('FundList - 搜索和过滤功能', () => {
  beforeEach(() => {
    jest.spyOn(FundApiService, 'getFundList').mockResolvedValue(mockFunds);
  });

  it('显示所有基金', async () => {
    renderWithRouter(<FundList />);
    await waitFor(() => {
      expect(screen.getByText('Growth Fund')).toBeInTheDocument();
      expect(screen.getByText('Income Fund')).toBeInTheDocument();
      expect(screen.getByText('Balanced Fund')).toBeInTheDocument();
    });
  });

  it('根据名称搜索基金', async () => {
    renderWithRouter(<FundList />);
    await screen.findByText('Growth Fund');
    fireEvent.change(screen.getByPlaceholderText('搜索基金名称或代码'), { target: { value: 'Income' } });
    expect(screen.queryByText('Growth Fund')).not.toBeInTheDocument();
    expect(screen.getByText('Income Fund')).toBeInTheDocument();
  });

  it('根据代码搜索基金', async () => {
    renderWithRouter(<FundList />);
    await screen.findByText('Growth Fund');
    fireEvent.change(screen.getByPlaceholderText('搜索基金名称或代码'), { target: { value: 'BF003' } });
    expect(screen.getByText('Balanced Fund')).toBeInTheDocument();
    expect(screen.queryByText('Growth Fund')).not.toBeInTheDocument();
  });

  it('根据币种过滤基金', async () => {
    renderWithRouter(<FundList />);
    await screen.findByText('Growth Fund');
    fireEvent.change(screen.getByDisplayValue('全部币种'), { target: { value: 'USD' } });
    expect(screen.getByText('Growth Fund')).toBeInTheDocument();
    expect(screen.getByText('Balanced Fund')).toBeInTheDocument();
    expect(screen.queryByText('Income Fund')).not.toBeInTheDocument();
  });

  it('搜索和币种过滤组合', async () => {
    renderWithRouter(<FundList />);
    await screen.findByText('Growth Fund');
    fireEvent.change(screen.getByDisplayValue('全部币种'), { target: { value: 'USD' } });
    fireEvent.change(screen.getByPlaceholderText('搜索基金名称或代码'), { target: { value: 'Balanced' } });
    expect(screen.getByText('Balanced Fund')).toBeInTheDocument();
    expect(screen.queryByText('Growth Fund')).not.toBeInTheDocument();
    expect(screen.queryByText('Income Fund')).not.toBeInTheDocument();
  });
});
