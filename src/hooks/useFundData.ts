import { useState, useEffect, useCallback } from 'react';
import type { Fund, FundListResponse } from '../types/fund';
import type { FundDetail } from '../types/fundDetail.dto';
import { FundApiService, type FundListParams } from '../services/fundApi';
import { mockFundDetails } from '../data/mockFundDetails';

export function useFundList(params?: FundListParams) {
  const [fundList, setFundList] = useState<Fund[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFundList = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await FundApiService.getFundList(params);
        setFundList(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch fund list');
        console.error('Error fetching fund list:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFundList();
  }, [JSON.stringify(params)]);

  return { fundList, loading, error };
}

export function useFundListWithPagination(params?: FundListParams) {
  const [fundListResponse, setFundListResponse] = useState<FundListResponse>({ data: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFundList = useCallback(async (newParams?: FundListParams) => {
    try {
      setLoading(true);
      setError(null);
      const data = await FundApiService.getFundListWithPagination(newParams || params);
      setFundListResponse(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch fund list');
      console.error('Error fetching fund list:', err);
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchFundList();
  }, [fetchFundList]);

  return { 
    fundList: fundListResponse.data, 
    total: fundListResponse.total,
    page: fundListResponse.page,
    pageSize: fundListResponse.pageSize,
    loading, 
    error,
    refetch: fetchFundList
  };
}

export function useFundSearch() {
  const [searchResults, setSearchResults] = useState<Fund[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await FundApiService.searchFunds(query);
      setSearchResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search funds');
      console.error('Error searching funds:', err);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearResults = useCallback(() => {
    setSearchResults([]);
    setError(null);
  }, []);

  return { searchResults, loading, error, search, clearResults };
}

export function useAvailableCurrencies() {
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await FundApiService.getAvailableCurrencies();
        setCurrencies(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch currencies');
        console.error('Error fetching currencies:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrencies();
  }, []);

  return { currencies, loading, error };
}

export function useFundDetail(fundId: string | undefined) {
  const [fundDetail, setFundDetail] = useState<FundDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!fundId) {
      setFundDetail(null);
      setLoading(false);
      return;
    }

    const fetchFundDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // 首先尝试从模拟数据中获取
        const mockDetail = mockFundDetails[fundId];
        if (mockDetail) {
          setFundDetail(mockDetail);
        } else {
          // 如果模拟数据中没有，尝试从基金列表API获取基本信息并生成详细数据
          try {
            const fundListData = await FundApiService.getFundList();
            const basicFund = fundListData.find(f => f.id === fundId);
            
            if (basicFund) {
              // 基于基金列表数据生成详细信息
              const generatedDetail: FundDetail = {
                id: basicFund.id,
                name: basicFund.fundName || basicFund.name || '未知基金',
                code: basicFund.code,
                currencyCode: basicFund.currencyCode,
                nav: basicFund.unitPrice,
                navDate: basicFund.priceDate,
                inception: '2020-01-01', // 默认成立日期
                category: '混合型',
                riskLevel: 3,
                
                basicInfo: {
                  fundType: '开放式混合型基金',
                  benchmarkIndex: 'Custom Benchmark',
                  managementCompany: '宏利投资管理',
                  fundManager: '基金经理',
                  minimumInvestment: 1000,
                  managementFee: 1.5,
                  totalExpenseRatio: 1.75
                },
                
                performance: {
                  ytd: basicFund.navChangePercent,
                  oneMonth: 1.2,
                  threeMonths: 3.5,
                  sixMonths: 8.2,
                  oneYear: basicFund.navChangePercent * 12,
                  threeYears: 25.8,
                  fiveYears: 45.2,
                  sinceInception: 68.9
                },
                
                navHistory: [
                  { 
                    date: basicFund.priceDate, 
                    nav: basicFund.unitPrice, 
                    change: basicFund.navChange, 
                    changePercent: basicFund.navChangePercent 
                  }
                ],
                
                assetAllocation: [
                  { category: '股票', percentage: 60.0, value: 6000000 },
                  { category: '债券', percentage: 30.0, value: 3000000 },
                  { category: '现金及等价物', percentage: 10.0, value: 1000000 }
                ],
                
                topHoldings: [
                  { name: '持仓1', percentage: 5.0, sector: '科技' },
                  { name: '持仓2', percentage: 4.5, sector: '金融' },
                  { name: '持仓3', percentage: 4.0, sector: '消费' }
                ],
                
                riskMetrics: {
                  volatility: 15.0,
                  sharpeRatio: 1.0,
                  maxDrawdown: -10.0,
                  beta: 1.0,
                  alpha: 2.0
                }
              };
              
              setFundDetail(generatedDetail);
            } else {
              setError('基金详情未找到');
              setFundDetail(null);
            }
          } catch (apiError) {
            setError('基金详情未找到');
            setFundDetail(null);
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch fund detail');
        console.error('Error fetching fund detail:', err);
        setFundDetail(null);
      } finally {
        setLoading(false);
      }
    };

    fetchFundDetail();
  }, [fundId]);

  return { fundDetail, loading, error };
}
