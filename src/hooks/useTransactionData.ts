import { useState, useEffect } from 'react';
import type { Transaction } from '../types/transaction';
import { TransactionApiService } from '../services/transactionApi';

export function useTransactionList() {
  const [transactionList, setTransactionList] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactionList = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await TransactionApiService.getTransactionList();
        setTransactionList(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch transaction list');
        console.error('Error fetching transaction list:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactionList();
  }, []);

  return { transactionList, loading, error };
}

export function useTransactionDetail(transactionId: string | undefined) {
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!transactionId) {
      setTransaction(null);
      setLoading(false);
      return;
    }

    const fetchTransactionDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await TransactionApiService.getTransactionById(transactionId);
        setTransaction(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch transaction detail');
        console.error('Error fetching transaction detail:', err);
        setTransaction(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactionDetail();
  }, [transactionId]);

  return { transaction, loading, error };
}
