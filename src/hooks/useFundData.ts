import { useState, useEffect, useRef } from 'react';
import { FundApiService } from '../services/fundApi';
import type { Fund } from '../types';

// 基金列表Hook
export const useFundList = () => {
  const [fundList, setFundList] = useState<Fund[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchFundList = async () => {
    // 如果有正在进行的请求，取消它
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // 创建新的AbortController
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    try {
      setLoading(true);
      setError(null);
      
      console.log(`🔍 Frontend: Fetching fund list at ${new Date().toISOString()}`);
      
      const data = await FundApiService.getFundList();
      
      // 检查请求是否被取消
      if (!abortController.signal.aborted) {
        setFundList(data);
        console.log(`✅ Frontend: Fund list loaded successfully with ${data.length} funds`);
      }
    } catch (err) {
      // 只有在请求没有被取消时才设置错误状态
      if (!abortController.signal.aborted) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred';
        setError(errorMessage);
        console.error('Error fetching fund list:', err);
      }
    } finally {
      // 只有在请求没有被取消时才设置loading状态
      if (!abortController.signal.aborted) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchFundList();

    // 清理函数：取消正在进行的请求
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const refetch = () => {
    fetchFundList();
  };

  return { fundList, loading, error, refetch };
};

// 基金详情Hook
export const useFund = (fundId: string) => {
  const [fund, setFund] = useState<Fund | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!fundId) {
      setLoading(false);
      return;
    }

    // 如果有正在进行的请求，取消它
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const fetchFund = async () => {
      // 创建新的AbortController
      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      try {
        setLoading(true);
        setError(null);
        
        console.log(`🔍 Frontend: Fetching fund details for ${fundId} at ${new Date().toISOString()}`);
        
        const data = await FundApiService.getFundById(fundId);
        
        // 检查请求是否被取消
        if (!abortController.signal.aborted) {
          setFund(data);
          console.log(`✅ Frontend: Fund details loaded successfully for ${fundId}`);
        }
      } catch (err) {
        // 只有在请求没有被取消时才设置错误状态
        if (!abortController.signal.aborted) {
          const errorMessage = err instanceof Error ? err.message : 'An error occurred';
          setError(errorMessage);
          console.error('Error fetching fund details:', err);
        }
      } finally {
        // 只有在请求没有被取消时才设置loading状态
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchFund();

    // 清理函数：取消正在进行的请求
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fundId]);

  return { fund, loading, error };
};
