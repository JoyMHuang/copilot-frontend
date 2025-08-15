import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FundList from './FundList';
import FundApiService from '../../services/fundApi';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../../services/fundApi');
jest.mock('../../utils/env', () => ({
  getApiBaseUrl: () => 'http://localhost:8000/api',
  getApiTimeout: () => 10000,
}));

const mockFunds = [
  {
    id: '1',
    fundName: 'Manulife Growth Fund',
    code: 'MGF',
    unitPrice: 1.23,
    currencyCode: 'USD',
    priceDate: '2024-06-01',
    navChange: 0.01,
    navChangePercent: 0.8,
  },
  {
    id: '2',
    fundName: 'Manulife Income Fund',
    code: 'MIF',
    unitPrice: 2.34,
    currencyCode: 'HKD',
    priceDate: '2024-06-01',
    navChange: -0.02,
    navChangePercent: -0.5,
  },
  {
    id: '3',
    fundName: 'Asia Equity',
    code: 'AEQ',
    unitPrice: 3.45,
    currencyCode: 'USD',
    priceDate: '2024-06-01',
    navChange: 0.03,
    navChangePercent: 1.2,
  },
];

describe('FundList 搜索和过滤功能', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    (FundApiService.getFunds as jest.Mock).mockResolvedValue(mockFunds);
  });

  function renderWithRouter() {
    return render(
      <BrowserRouter>
        <FundList />
      </BrowserRouter>
    );
  }

  it('初始时显示所有基金', async () => {
    renderWithRouter();
    await waitFor(() => {
      expect(screen.getByText('Manulife Growth Fund')).toBeInTheDocument();
      expect(screen.getByText('Manulife Income Fund')).toBeInTheDocument();
      expect(screen.getByText('Asia Equity')).toBeInTheDocument();
    });
  });

  it('输入搜索关键词后只显示匹配的基金', async () => {
    renderWithRouter();
    await waitFor(() => screen.getByText('Manulife Growth Fund'));
    fireEvent.change(screen.getByPlaceholderText('搜索基金名称或代码'), { target: { value: 'Asia' } });
    expect(screen.getByText('Asia Equity')).toBeInTheDocument();
    expect(screen.queryByText('Manulife Growth Fund')).not.toBeInTheDocument();
    expect(screen.queryByText('Manulife Income Fund')).not.toBeInTheDocument();
  });

  it('选择币种后只显示该币种的基金', async () => {
    renderWithRouter();
    await waitFor(() => screen.getByText('Manulife Growth Fund'));
    fireEvent.change(screen.getByDisplayValue('全部币种'), { target: { value: 'USD' } });
    expect(screen.getByText('Manulife Growth Fund')).toBeInTheDocument();
    expect(screen.getByText('Asia Equity')).toBeInTheDocument();
    expect(screen.queryByText('Manulife Income Fund')).not.toBeInTheDocument();
  });

  it('搜索和币种过滤可以组合使用', async () => {
    renderWithRouter();
    await waitFor(() => screen.getByText('Manulife Growth Fund'));
    fireEvent.change(screen.getByPlaceholderText('搜索基金名称或代码'), { target: { value: 'Manulife' } });
    fireEvent.change(screen.getByDisplayValue('全部币种'), { target: { value: 'USD' } });
    expect(screen.getByText('Manulife Growth Fund')).toBeInTheDocument();
    expect(screen.queryByText('Manulife Income Fund')).not.toBeInTheDocument();
    expect(screen.queryByText('Asia Equity')).not.toBeInTheDocument();
  });

  it('无匹配时显示空表', async () => {
    renderWithRouter();
    await waitFor(() => screen.getByText('Manulife Growth Fund'));
    fireEvent.change(screen.getByPlaceholderText('搜索基金名称或代码'), { target: { value: 'NotExist' } });
    expect(screen.queryByText('Manulife Growth Fund')).not.toBeInTheDocument();
    expect(screen.queryByText('Manulife Income Fund')).not.toBeInTheDocument();
    expect(screen.queryByText('Asia Equity')).not.toBeInTheDocument();
  });
});
