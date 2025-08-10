import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import FundList from './FundList';
import * as fundApi from '../../services/fundApi';
import type { FundDto } from '../../types';

const mockFunds: FundDto[] = [
  {
    id: '1',
    fundName: '成长基金',
    code: 'A001',
    unitPrice: 1.23,
    currencyCode: 'USD',
    priceDate: '2025-08-10',
    navChange: 0.05,
    navChangePercent: 4.2,
  },
  {
    id: '2',
    fundName: '价值基金',
    code: 'B002',
    unitPrice: 2.34,
    currencyCode: 'CNY',
    priceDate: '2025-08-09',
    navChange: -0.02,
    navChangePercent: -1.5,
  },
  {
    id: '3',
    fundName: '平衡基金',
    code: 'C003',
    unitPrice: 3.45,
    currencyCode: 'USD',
    priceDate: '2025-08-08',
    navChange: 0.01,
    navChangePercent: 0.3,
  },
];

vi.mock('../../services/fundApi', () => ({
  getFundList: vi.fn(),
}));

describe('FundList 搜索和过滤功能', () => {
  beforeEach(() => {
  (fundApi.getFundList as ReturnType<typeof vi.fn>).mockResolvedValue(mockFunds);
  });

  it('初始渲染显示所有基金', async () => {
    render(
      <MemoryRouter>
        <FundList />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText('成长基金')).toBeInTheDocument();
      expect(screen.getByText('价值基金')).toBeInTheDocument();
      expect(screen.getByText('平衡基金')).toBeInTheDocument();
    });
  });

  it('搜索功能：输入基金名称过滤结果', async () => {
    render(
      <MemoryRouter>
        <FundList />
      </MemoryRouter>
    );
    await waitFor(() => screen.getByText('成长基金'));
    const input = screen.getByPlaceholderText('搜索基金名称或代码');
    fireEvent.change(input, { target: { value: '价值' } });
    expect(screen.getByText('价值基金')).toBeInTheDocument();
    expect(screen.queryByText('成长基金')).not.toBeInTheDocument();
    expect(screen.queryByText('平衡基金')).not.toBeInTheDocument();
  });

  it('搜索功能：输入基金代码过滤结果', async () => {
    render(
      <MemoryRouter>
        <FundList />
      </MemoryRouter>
    );
    await waitFor(() => screen.getByText('成长基金'));
    const input = screen.getByPlaceholderText('搜索基金名称或代码');
    fireEvent.change(input, { target: { value: 'C003' } });
    expect(screen.getByText('平衡基金')).toBeInTheDocument();
    expect(screen.queryByText('成长基金')).not.toBeInTheDocument();
    expect(screen.queryByText('价值基金')).not.toBeInTheDocument();
  });

  it('币种过滤功能：选择币种后只显示对应币种的基金', async () => {
    render(
      <MemoryRouter>
        <FundList />
      </MemoryRouter>
    );
    await waitFor(() => screen.getByText('成长基金'));
    const select = screen.getByDisplayValue('全部币种');
    fireEvent.change(select, { target: { value: 'USD' } });
    expect(screen.getByText('成长基金')).toBeInTheDocument();
    expect(screen.getByText('平衡基金')).toBeInTheDocument();
    expect(screen.queryByText('价值基金')).not.toBeInTheDocument();
  });

  it('币种和搜索组合过滤：先选币种再搜索', async () => {
    render(
      <MemoryRouter>
        <FundList />
      </MemoryRouter>
    );
    await waitFor(() => screen.getByText('成长基金'));
    const select = screen.getByDisplayValue('全部币种');
    fireEvent.change(select, { target: { value: 'USD' } });
    const input = screen.getByPlaceholderText('搜索基金名称或代码');
    fireEvent.change(input, { target: { value: '平衡' } });
    expect(screen.getByText('平衡基金')).toBeInTheDocument();
    expect(screen.queryByText('成长基金')).not.toBeInTheDocument();
    expect(screen.queryByText('价值基金')).not.toBeInTheDocument();
  });
});
