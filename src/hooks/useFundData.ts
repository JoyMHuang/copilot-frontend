import { useState, useEffect } from 'react';
import type { Fund } from '../types/fund';
import { FundApiService } from '../services/fundApi';

export function useFundList() {
  const [fundList, setFundList] = useState<Fund[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFundList = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await FundApiService.getFundList();
        setFundList(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch fund list');
        console.error('Error fetching fund list:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFundList();
  }, []);

  return { fundList, loading, error };
}
