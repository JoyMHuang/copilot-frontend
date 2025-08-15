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
  },

  // 为API可能返回的基金ID创建详细数据
  'CWSECUF003': {
    id: 'CWSECUF003',
    name: 'Manulife Global Growth Fund',
    code: 'MGGF',
    currencyCode: 'USD',
    nav: 15.68,
    navDate: '2025-08-15',
    inception: '2016-05-20',
    category: '环球股票',
    riskLevel: 4,
    
    basicInfo: {
      fundType: '开放式股票型基金',
      benchmarkIndex: 'MSCI World Growth Index',
      managementCompany: '宏利投资管理',
      fundManager: 'Michael Chen',
      minimumInvestment: 1000,
      managementFee: 1.6,
      performanceFee: 20,
      totalExpenseRatio: 1.85
    },
    
    performance: {
      ytd: 12.8,
      oneMonth: 3.2,
      threeMonths: 8.5,
      sixMonths: 16.7,
      oneYear: 22.4,
      threeYears: 58.9,
      fiveYears: 95.2,
      sinceInception: 156.8
    },
    
    navHistory: [
      { date: '2025-08-15', nav: 15.68, change: 0.25, changePercent: 1.62 },
      { date: '2025-08-14', nav: 15.43, change: -0.12, changePercent: -0.77 },
      { date: '2025-08-13', nav: 15.55, change: 0.18, changePercent: 1.17 },
      { date: '2025-08-12', nav: 15.37, change: 0.08, changePercent: 0.52 },
      { date: '2025-08-11', nav: 15.29, change: -0.15, changePercent: -0.97 }
    ],
    
    assetAllocation: [
      { category: '美国股票', percentage: 52.3, value: 5230000 },
      { category: '欧洲股票', percentage: 22.1, value: 2210000 },
      { category: '亚太股票', percentage: 15.8, value: 1580000 },
      { category: '新兴市场', percentage: 7.5, value: 750000 },
      { category: '现金及等价物', percentage: 2.3, value: 230000 }
    ],
    
    topHoldings: [
      { name: 'NVIDIA Corporation', code: 'NVDA', percentage: 5.2, sector: '科技' },
      { name: '微软公司', code: 'MSFT', percentage: 4.8, sector: '科技' },
      { name: '苹果公司', code: 'AAPL', percentage: 4.3, sector: '科技' },
      { name: 'Meta Platforms', code: 'META', percentage: 3.9, sector: '科技' },
      { name: 'Tesla Inc', code: 'TSLA', percentage: 3.5, sector: '汽车' }
    ],
    
    riskMetrics: {
      volatility: 22.1,
      sharpeRatio: 1.42,
      maxDrawdown: -18.7,
      beta: 1.15,
      alpha: 3.8
    }
  },

  'CWSECUF004': {
    id: 'CWSECUF004',
    name: 'Manulife Asia Pacific Equity Fund',
    code: 'MAPEF',
    currencyCode: 'USD',
    nav: 11.23,
    navDate: '2025-08-15',
    inception: '2017-09-10',
    category: '亚太股票',
    riskLevel: 4,
    
    basicInfo: {
      fundType: '开放式股票型基金',
      benchmarkIndex: 'MSCI AC Asia Pacific Index',
      managementCompany: '宏利投资管理',
      fundManager: 'Sarah Wong',
      minimumInvestment: 500,
      managementFee: 1.7,
      performanceFee: 18,
      totalExpenseRatio: 1.95
    },
    
    performance: {
      ytd: 6.8,
      oneMonth: 1.8,
      threeMonths: 4.2,
      sixMonths: 9.5,
      oneYear: 13.7,
      threeYears: 28.9,
      fiveYears: 45.6,
      sinceInception: 67.3
    },
    
    navHistory: [
      { date: '2025-08-15', nav: 11.23, change: 0.08, changePercent: 0.72 },
      { date: '2025-08-14', nav: 11.15, change: -0.15, changePercent: -1.33 },
      { date: '2025-08-13', nav: 11.30, change: 0.12, changePercent: 1.07 },
      { date: '2025-08-12', nav: 11.18, change: 0.05, changePercent: 0.45 },
      { date: '2025-08-11', nav: 11.13, change: -0.18, changePercent: -1.59 }
    ],
    
    assetAllocation: [
      { category: '中国股票', percentage: 35.5, value: 3550000 },
      { category: '日本股票', percentage: 22.8, value: 2280000 },
      { category: '韩国股票', percentage: 15.2, value: 1520000 },
      { category: '台湾股票', percentage: 12.1, value: 1210000 },
      { category: '其他亚太', percentage: 11.7, value: 1170000 },
      { category: '现金及等价物', percentage: 2.7, value: 270000 }
    ],
    
    topHoldings: [
      { name: '台积电', code: '2330.TW', percentage: 6.8, sector: '科技' },
      { name: '腾讯控股', code: '0700.HK', percentage: 5.2, sector: '科技' },
      { name: '阿里巴巴', code: '9988.HK', percentage: 4.1, sector: '电商' },
      { name: '三星电子', code: '005930.KS', percentage: 3.9, sector: '科技' },
      { name: 'ASML Holding', code: 'ASML', percentage: 3.2, sector: '科技' }
    ],
    
    riskMetrics: {
      volatility: 24.8,
      sharpeRatio: 0.98,
      maxDrawdown: -22.3,
      beta: 1.25,
      alpha: 1.8
    }
  },

  'CWSECUF005': {
    id: 'CWSECUF005',
    name: 'Manulife Conservative Bond Fund',
    code: 'MCBF',
    currencyCode: 'USD',
    nav: 102.45,
    navDate: '2025-08-15',
    inception: '2014-02-28',
    category: '债券',
    riskLevel: 2,
    
    basicInfo: {
      fundType: '开放式债券型基金',
      benchmarkIndex: 'Bloomberg Global Aggregate Bond Index',
      managementCompany: '宏利投资管理',
      fundManager: 'David Liu',
      minimumInvestment: 1000,
      managementFee: 0.75,
      totalExpenseRatio: 0.95
    },
    
    performance: {
      ytd: 2.8,
      oneMonth: 0.5,
      threeMonths: 1.2,
      sixMonths: 2.8,
      oneYear: 4.2,
      threeYears: 12.8,
      fiveYears: 24.5,
      sinceInception: 45.2
    },
    
    navHistory: [
      { date: '2025-08-15', nav: 102.45, change: 0.05, changePercent: 0.05 },
      { date: '2025-08-14', nav: 102.40, change: -0.02, changePercent: -0.02 },
      { date: '2025-08-13', nav: 102.42, change: 0.08, changePercent: 0.08 },
      { date: '2025-08-12', nav: 102.34, change: 0.03, changePercent: 0.03 },
      { date: '2025-08-11', nav: 102.31, change: -0.04, changePercent: -0.04 }
    ],
    
    assetAllocation: [
      { category: '政府债券', percentage: 45.0, value: 4500000 },
      { category: '投资级公司债', percentage: 35.0, value: 3500000 },
      { category: '高收益债券', percentage: 12.0, value: 1200000 },
      { category: '新兴市场债券', percentage: 5.0, value: 500000 },
      { category: '现金及等价物', percentage: 3.0, value: 300000 }
    ],
    
    topHoldings: [
      { name: '美国国债 10年期', percentage: 15.2, sector: '政府' },
      { name: '德国国债 5年期', percentage: 8.5, sector: '政府' },
      { name: '苹果公司债券', percentage: 3.2, sector: '科技' },
      { name: '微软公司债券', percentage: 2.8, sector: '科技' },
      { name: '日本国债 7年期', percentage: 6.1, sector: '政府' }
    ],
    
    riskMetrics: {
      volatility: 3.2,
      sharpeRatio: 0.85,
      maxDrawdown: -2.1,
      beta: 0.15,
      alpha: 0.8
    }
  }
};
