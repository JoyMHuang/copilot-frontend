import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TransactionHistory from './TransactionHistory';
import * as useCustomerDataModule from '../../hooks/useCustomerData';
import type { Transaction } from '../../types';

const mockUseTransactions = jest.fn();
jest.spyOn(useCustomerDataModule, 'useTransactions').mockImplementation(mockUseTransactions);

const mockTransactions: Transaction[] = [
  { id: 'TXN001', type: 'Subscribe', amount: 10000, date: '2024-01-15', status: 'Completed' },
  { id: 'TXN002', type: 'Redeem', amount: 5000, date: '2024-01-20', status: 'Pending' },
  { id: 'TXN003', type: 'Switch', amount: 3000, date: '2024-02-01', status: 'Failed' },
];

describe('TransactionHistory', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders header and input', () => {
    mockUseTransactions.mockReturnValue({ transactions: [], loading: false, error: null });
    render(<TransactionHistory />);
    expect(screen.getByText('Transaction History')).toBeInTheDocument();
    expect(screen.getByLabelText('Customer ID:')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter Customer ID')).toBeInTheDocument();
  });

  it('calls useTransactions with input value', async () => {
    mockUseTransactions.mockReturnValue({ transactions: [], loading: false, error: null });
    render(<TransactionHistory />);
    const input = screen.getByPlaceholderText('Enter Customer ID');
    fireEvent.change(input, { target: { value: 'CUST123' } });
    await waitFor(() => {
      expect(mockUseTransactions).toHaveBeenLastCalledWith('CUST123');
    });
  });

  it('shows loading and error states', () => {
    mockUseTransactions.mockReturnValue({ transactions: [], loading: true, error: null });
    render(<TransactionHistory />);
    expect(screen.getByText('Loading transactions...')).toBeInTheDocument();
    mockUseTransactions.mockReturnValue({ transactions: [], loading: false, error: 'Error!' });
    render(<TransactionHistory />);
    expect(screen.getByText('Error: Error!')).toBeInTheDocument();
  });

  it('groups transactions by type and displays them', () => {
    mockUseTransactions.mockReturnValue({ transactions: mockTransactions, loading: false, error: null });
    render(<TransactionHistory />);
    expect(screen.getByText('Subscribe Transactions')).toBeInTheDocument();
    expect(screen.getByText('Redeem Transactions')).toBeInTheDocument();
    expect(screen.getByText('Switch Transactions')).toBeInTheDocument();
    expect(screen.getByText('TXN001')).toBeInTheDocument();
    expect(screen.getByText('TXN002')).toBeInTheDocument();
    expect(screen.getByText('TXN003')).toBeInTheDocument();
  });

  it('handles empty transaction list', () => {
    mockUseTransactions.mockReturnValue({ transactions: [], loading: false, error: null });
    render(<TransactionHistory />);
    expect(screen.queryByText('Subscribe Transactions')).not.toBeInTheDocument();
    expect(screen.queryByText('Redeem Transactions')).not.toBeInTheDocument();
    expect(screen.queryByText('Switch Transactions')).not.toBeInTheDocument();
  });
});
