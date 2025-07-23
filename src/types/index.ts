export interface FundAllocation {
  name: string;
  percentage: number;
  amount: number;
  color: string;
}

export interface PortfolioData {
  id: string;
  name: string;
  cifNumber: string;
  totalValue: number;
  unrealizedProfitLoss: number;
  riskProfile: 'Conservative' | 'Moderate' | 'Aggressive';
  lastUpdated: string;
  allocations: FundAllocation[];
}

export interface WealthSpecialist {
  name: string;
  email: string;
  phone: string;
}

export interface Transaction {
  id: string;
  type: 'Subscribe' | 'Switch' | 'Redeem';
  amount: number;
  date: string;
  status: 'Pending' | 'Completed' | 'Failed';
}

export interface NavigationItem {
  id: string;
  name: string;
  icon: string;
  href: string;
  current: boolean;
}
