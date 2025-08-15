export interface FundDetail {
  id: string;
  name: string;
  code: string;
  currencyCode: string;
  nav: number;
  navDate: string;
  inception: string;
  category: string;
  riskLevel: 1 | 2 | 3 | 4 | 5;
  
  // 基本信息
  basicInfo: {
    fundType: string;
    benchmarkIndex: string;
    managementCompany: string;
    fundManager: string;
    minimumInvestment: number;
    managementFee: number;
    performanceFee?: number;
    totalExpenseRatio: number;
  };
  
  // 业绩表现
  performance: {
    ytd: number;
    oneMonth: number;
    threeMonths: number;
    sixMonths: number;
    oneYear: number;
    threeYears: number;
    fiveYears: number;
    sinceInception: number;
  };
  
  // 历史净值
  navHistory: Array<{
    date: string;
    nav: number;
    change: number;
    changePercent: number;
  }>;
  
  // 资产配置
  assetAllocation: Array<{
    category: string;
    percentage: number;
    value: number;
  }>;
  
  // 持仓明细
  topHoldings: Array<{
    name: string;
    code?: string;
    percentage: number;
    sector?: string;
  }>;
  
  // 风险指标
  riskMetrics: {
    volatility: number;
    sharpeRatio: number;
    maxDrawdown: number;
    beta: number;
    alpha: number;
  };
}
