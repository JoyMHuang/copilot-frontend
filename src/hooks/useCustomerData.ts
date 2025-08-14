import { useState, useEffect, useRef } from 'react';
import { CustomerApiService, type DashboardData } from '../services/customerApi';
import type { PortfolioData, WealthSpecialist, Transaction, Fund } from '../types';

// Dashboard数据Hook
export const useDashboard = (customerId: string) => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    // 如果有正在进行的请求，取消它
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const fetchData = async () => {
      // 创建新的AbortController
      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      try {
        setLoading(true);
        setError(null);
        
        console.log(`🔍 Frontend: Fetching dashboard data for customer ${customerId} at ${new Date().toISOString()}`);
        
        const dashboardData = await CustomerApiService.getDashboardData(customerId);
        
        // 检查请求是否被取消
        if (!abortController.signal.aborted) {
          setData(dashboardData);
          console.log(`✅ Frontend: Dashboard data loaded successfully for customer ${customerId}`);
        }
      } catch (err) {
        // 只有在请求没有被取消时才设置错误状态
        if (!abortController.signal.aborted) {
          setError(err instanceof Error ? err.message : 'An error occurred');
          console.error('Error fetching dashboard data:', err);
        }
      } finally {
        // 只有在请求没有被取消时才设置loading状态
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    };

    if (customerId) {
      fetchData();
    }

    // 清理函数：取消正在进行的请求
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [customerId]);

  return { data, loading, error, refetch: () => setData(null) };
};

// 投资组合数据Hook
export const usePortfolio = (customerId: string) => {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    // 如果有正在进行的请求，取消它
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const fetchPortfolio = async () => {
      // 创建新的AbortController
      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      try {
        setLoading(true);
        setError(null);
        
        console.log(`🔍 Frontend: Fetching portfolio data for customer ${customerId} at ${new Date().toISOString()}`);
        
        const data = await CustomerApiService.getPortfolioData(customerId);
        
        // 检查请求是否被取消
        if (!abortController.signal.aborted) {
          setPortfolioData(data);
          console.log(`✅ Frontend: Portfolio data loaded successfully for customer ${customerId}`);
        }
      } catch (err) {
        // 只有在请求没有被取消时才设置错误状态
        if (!abortController.signal.aborted) {
          setError(err instanceof Error ? err.message : 'An error occurred');
          console.error('Error fetching portfolio data:', err);
        }
      } finally {
        // 只有在请求没有被取消时才设置loading状态
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    };

    if (customerId) {
      fetchPortfolio();
    }

    // 清理函数：取消正在进行的请求
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [customerId]);

  return { portfolioData, loading, error };
};

// 财富专家信息Hook
export const useWealthSpecialist = (customerId: string) => {
  const [wealthSpecialist, setWealthSpecialist] = useState<WealthSpecialist | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    // 如果有正在进行的请求，取消它
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const fetchWealthSpecialist = async () => {
      // 创建新的AbortController
      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      try {
        setLoading(true);
        setError(null);
        
        console.log(`🔍 Frontend: Fetching wealth specialist data for customer ${customerId} at ${new Date().toISOString()}`);
        
        const data = await CustomerApiService.getWealthSpecialist(customerId);
        
        // 检查请求是否被取消
        if (!abortController.signal.aborted) {
          setWealthSpecialist(data);
          console.log(`✅ Frontend: Wealth specialist data loaded successfully for customer ${customerId}`);
        }
      } catch (err) {
        // 只有在请求没有被取消时才设置错误状态
        if (!abortController.signal.aborted) {
          setError(err instanceof Error ? err.message : 'An error occurred');
          console.error('Error fetching wealth specialist data:', err);
        }
      } finally {
        // 只有在请求没有被取消时才设置loading状态
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    };

    if (customerId) {
      fetchWealthSpecialist();
    }

    // 清理函数：取消正在进行的请求
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [customerId]);

  return { wealthSpecialist, loading, error };
};

// 交易记录Hook
export const useTransactions = (customerId: string) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await CustomerApiService.getTransactions(customerId);
        setTransactions(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching transactions:', err);
      } finally {
        setLoading(false);
      }
    };

    if (customerId) {
      fetchTransactions();
    }
  }, [customerId]);

  return { transactions, loading, error };
};

// 基金列表Hook
export const useFunds = () => {
  const [funds, setFunds] = useState<Fund[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFunds = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await CustomerApiService.getFunds();
        setFunds(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching funds:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFunds();
  }, []);

  return { funds, loading, error };
};
