// @ts-nocheck
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TransactionHistory from './TransactionHistory';

// 模拟服务模块，供页面内部使用
vi.mock('../../services/transactionApi', () => {
  const getTransactionList = vi.fn();
  return {
    default: { getTransactionList },
    TransactionStatus: { Pending: 'Pending', Completed: 'Completed', Failed: 'Failed' },
  };
});

// 便捷访问 mock 的 getTransactionList
import TransactionApiService from '../../services/transactionApi';
const getTransactionListMock = (TransactionApiService as unknown as { getTransactionList: ReturnType<typeof vi.fn> }).getTransactionList;

const mockData = [
  { id: '1', transactionName: 'Subscription - Equity', transactionDate: '2025-07-01', transactionAmount: 1000, status: 'Completed' },
  { id: '2', transactionName: 'Redemption - Bond', transactionDate: '2025-07-02', transactionAmount: 2000, status: 'Pending' },
  { id: '3', transactionName: 'Switch - Growth', transactionDate: '2025-07-03', transactionAmount: 3000, status: 'Failed' },
  { id: '4', transactionName: 'Subscription - Money Market', transactionDate: '2025-07-04', transactionAmount: 4000, status: 'Completed' },
];

describe('TransactionHistory - 搜索与过滤', () => {
  beforeEach(() => {
    getTransactionListMock.mockReset();
    getTransactionListMock.mockResolvedValue(mockData);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('加载后展示所有交易卡片', async () => {
    render(<TransactionHistory />);

    await waitFor(() => expect(screen.queryByText('加载中...')).toBeNull());

    for (const item of mockData) {
      expect(screen.getByText(item.transactionName)).toBeDefined();
    }
  });

  it('按交易名称搜索能正确过滤结果', async () => {
    render(<TransactionHistory />);
    await waitFor(() => expect(screen.queryByText('加载中...')).toBeNull());

    const input = screen.getByPlaceholderText('搜索交易名称');
    await userEvent.clear(input);
    await userEvent.type(input, 'subscription'); // 不区分大小写

    expect(screen.getByText('Subscription - Equity')).toBeDefined();
    expect(screen.getByText('Subscription - Money Market')).toBeDefined();
    expect(screen.queryByText('Redemption - Bond')).toBeNull();
    expect(screen.queryByText('Switch - Growth')).toBeNull();
  });

  it('按状态筛选能正确过滤结果', async () => {
    render(<TransactionHistory />);
    await waitFor(() => expect(screen.queryByText('加载中...')).toBeNull());

    const select = screen.getByRole('combobox');
    await userEvent.selectOptions(select, 'Completed');

    expect(screen.getByText('Subscription - Equity')).toBeDefined();
    expect(screen.getByText('Subscription - Money Market')).toBeDefined();
    expect(screen.queryByText('Redemption - Bond')).toBeNull();
    expect(screen.queryByText('Switch - Growth')).toBeNull();
  });

  it('组合搜索 + 状态筛选能正确生效', async () => {
    render(<TransactionHistory />);
    await waitFor(() => expect(screen.queryByText('加载中...')).toBeNull());

    const input = screen.getByPlaceholderText('搜索交易名称');
    const select = screen.getByRole('combobox');

    await userEvent.type(input, 'redemption');
    await userEvent.selectOptions(select, 'Pending');

    expect(screen.getByText('Redemption - Bond')).toBeDefined();
    expect(screen.queryByText('Subscription - Equity')).toBeNull();
    expect(screen.queryByText('Subscription - Money Market')).toBeNull();
    expect(screen.queryByText('Switch - Growth')).toBeNull();
  });

  it('无匹配结果时显示提示', async () => {
    render(<TransactionHistory />);
    await waitFor(() => expect(screen.queryByText('加载中...')).toBeNull());

    const input = screen.getByPlaceholderText('搜索交易名称');
    await userEvent.type(input, 'zzz-not-exist');

    expect(screen.getByText('暂无匹配的交易记录')).toBeDefined();
  });
});
