export interface Fund {
  name: any;
  id: string;
  fundName: string;
  code: string;
  unitPrice: number;
  currencyCode: string;
  priceDate: string;
  navChange: number;
  navChangePercent: number;
}

export interface FundListResponse {
  data: Fund[];
  total: number;
  page?: number;
  pageSize?: number;
}
