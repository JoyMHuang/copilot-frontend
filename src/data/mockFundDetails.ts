import type { FundDetail } from '../types/fundDetail.dto';

export const mockFundDetails: Record<string, FundDetail> = {
  'fund-001': {
    id: 'fund-001',
    name: '宏利环球股票基金',
    code: 'ML001',
    currencyCode: 'USD',
    nav: 12.45,
    navDate: '2024-01-15',
    inception: '2015-03-15',
    category: '环球股票',
    riskLevel: 4,
    
    basicInfo: {
      fundType: '开放式股票型基金',
      benchmarkIndex: 'MSCI World Index',
      managementCompany: '宏利投资管理',
      fundManager: '张明华',
      minimumInvestment: 1000,
      managementFee: 1.5,
      performanceFee: 15,
      totalExpenseRatio: 1.75
    },
    
    performance: {
      ytd: 8.5,
      oneMonth: 2.1,
      threeMonths: 6.8,
      sixMonths: 12.3,
      oneYear: 15.7,
      threeYears: 42.1,
      fiveYears: 78.9,
      sinceInception: 124.5
    },
    
    navHistory: [
      { date: '2024-01-15', nav: 12.45, change: 0.15, changePercent: 1.22 },
      { date: '2024-01-14', nav: 12.30, change: -0.08, changePercent: -0.65 },
      { date: '2024-01-13', nav: 12.38, change: 0.23, changePercent: 1.89 },
      { date: '2024-01-12', nav: 12.15, change: 0.10, changePercent: 0.83 },
      { date: '2024-01-11', nav: 12.05, change: -0.12, changePercent: -0.98 }
    ],
    
    assetAllocation: [
      { category: '美国股票', percentage: 45.2, value: 4520000 },
      { category: '欧洲股票', percentage: 25.8, value: 2580000 },
      { category: '亚太股票', percentage: 18.5, value: 1850000 },
      { category: '新兴市场', percentage: 8.3, value: 830000 },
      { category: '现金及等价物', percentage: 2.2, value: 220000 }
    ],
    
    topHoldings: [
      { name: 'Apple Inc.', code: 'AAPL', percentage: 5.2, sector: '科技' },
      { name: 'Microsoft Corp.', code: 'MSFT', percentage: 4.8, sector: '科技' },
      { name: 'Amazon.com Inc.', code: 'AMZN', percentage: 3.9, sector: '消费' },
      { name: 'Alphabet Inc.', code: 'GOOGL', percentage: 3.5, sector: '科技' },
      { name: 'Tesla Inc.', code: 'TSLA', percentage: 2.7, sector: '汽车' }
    ],
    
    riskMetrics: {
      volatility: 16.8,
      sharpeRatio: 1.23,
      maxDrawdown: -15.2,
      beta: 1.05,
      alpha: 2.8
    }
  },
  
  'fund-002': {
    id: 'fund-002',
    name: '宏利亚洲债券基金',
    code: 'ML002',
    currencyCode: 'HKD',
    nav: 98.76,
    navDate: '2024-01-15',
    inception: '2018-06-01',
    category: '亚洲债券',
    riskLevel: 2,
    
    basicInfo: {
      fundType: '开放式债券型基金',
      benchmarkIndex: 'JP Morgan Asia Credit Index',
      managementCompany: '宏利投资管理',
      fundManager: '李佳明',
      minimumInvestment: 5000,
      managementFee: 0.8,
      totalExpenseRatio: 1.0
    },
    
    performance: {
      ytd: 3.2,
      oneMonth: 0.8,
      threeMonths: 2.1,
      sixMonths: 4.5,
      oneYear: 6.8,
      threeYears: 18.2,
      fiveYears: 28.9,
      sinceInception: 35.6
    },
    
    navHistory: [
      { date: '2024-01-15', nav: 98.76, change: 0.12, changePercent: 0.12 },
      { date: '2024-01-14', nav: 98.64, change: -0.05, changePercent: -0.05 },
      { date: '2024-01-13', nav: 98.69, change: 0.08, changePercent: 0.08 },
      { date: '2024-01-12', nav: 98.61, change: 0.03, changePercent: 0.03 },
      { date: '2024-01-11', nav: 98.58, change: -0.02, changePercent: -0.02 }
    ],
    
    assetAllocation: [
      { category: '政府债券', percentage: 55.0, value: 5500000 },
      { category: '公司债券', percentage: 35.0, value: 3500000 },
      { category: '高收益债券', percentage: 8.0, value: 800000 },
      { category: '现金及等价物', percentage: 2.0, value: 200000 }
    ],
    
    topHoldings: [
      { name: '中国政府债券 10Y', percentage: 12.5, sector: '政府' },
      { name: '腾讯控股债券', code: '0700.HK', percentage: 3.8, sector: '科技' },
      { name: '新加坡政府债券 5Y', percentage: 8.2, sector: '政府' },
      { name: '阿里巴巴债券', percentage: 3.2, sector: '科技' },
      { name: '香港政府债券 7Y', percentage: 6.5, sector: '政府' }
    ],
    
    riskMetrics: {
      volatility: 4.2,
      sharpeRatio: 0.85,
      maxDrawdown: -3.8,
      beta: 0.25,
      alpha: 1.2
    }
  }
};
