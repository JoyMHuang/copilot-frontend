import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FundList from './FundList';
import FundListApiService from '../../services/fundApi';
import type { FundDto } from '../../services/fundApi';

jest.mock('../../services/fundApi');

const mockFunds: FundDto[] = [
  {
    id: '1', fundName: 'Alpha Growth Fund', code: 'AGF001', unitPrice: 1.23, currencyCode: 'USD', priceDate: '2024-06-01', navChange: 0.05, navChangePercent: 4.24
  },
  {
    id: '2', fundName: 'Beta Income Fund', code: 'BIF002', unitPrice: 2.34, currencyCode: 'USD', priceDate: '2024-06-01', navChange: -0.02, navChangePercent: -0.85
  },
  {
    id: '3', fundName: 'Gamma Equity Fund', code: 'GEF003', unitPrice: 0.98, currencyCode: 'EUR', priceDate: '2024-06-01', navChange: 0.01, navChangePercent: 1.03
  }
];

(FundListApiService.getFundList as jest.Mock).mockResolvedValue(mockFunds);

describe('FundList 搜索和过滤功能', () => {
  beforeEach(async () => {
    render(<FundList />);
    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());
  });

  it('默认显示所有基金', () => {
    expect(screen.getByText('Alpha Growth Fund')).toBeInTheDocument();
    expect(screen.getByText('Beta Income Fund')).toBeInTheDocument();
    expect(screen.getByText('Gamma Equity Fund')).toBeInTheDocument();
  });

  it('搜索功能：输入名称只显示匹配基金', () => {
    fireEvent.change(screen.getByPlaceholderText('Search by Fund Name or Code'), { target: { value: 'Alpha' } });
    expect(screen.getByText('Alpha Growth Fund')).toBeInTheDocument();
    expect(screen.queryByText('Beta Income Fund')).not.toBeInTheDocument();
    expect(screen.queryByText('Gamma Equity Fund')).not.toBeInTheDocument();
  });

  it('搜索功能：输入代码只显示匹配基金', () => {
    fireEvent.change(screen.getByPlaceholderText('Search by Fund Name or Code'), { target: { value: 'BIF002' } });
    expect(screen.getByText('Beta Income Fund')).toBeInTheDocument();
    expect(screen.queryByText('Alpha Growth Fund')).not.toBeInTheDocument();
    expect(screen.queryByText('Gamma Equity Fund')).not.toBeInTheDocument();
  });

  it('币种过滤功能：选择 EUR 只显示欧元基金', () => {
    fireEvent.change(screen.getByDisplayValue('All Currency'), { target: { value: 'EUR' } });
    expect(screen.getByText('Gamma Equity Fund')).toBeInTheDocument();
    expect(screen.queryByText('Alpha Growth Fund')).not.toBeInTheDocument();
    expect(screen.queryByText('Beta Income Fund')).not.toBeInTheDocument();
  });

  it('搜索和币种过滤组合：结果正确', () => {
    fireEvent.change(screen.getByPlaceholderText('Search by Fund Name or Code'), { target: { value: 'Gamma' } });
    fireEvent.change(screen.getByDisplayValue('All Currency'), { target: { value: 'EUR' } });
    expect(screen.getByText('Gamma Equity Fund')).toBeInTheDocument();
    expect(screen.queryByText('Alpha Growth Fund')).not.toBeInTheDocument();
    expect(screen.queryByText('Beta Income Fund')).not.toBeInTheDocument();
  });
});
