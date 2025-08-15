export interface FundDetailDto {
  id: string;
  fundName: string;
  code: string;
  unitPrice: number;
  currencyCode: string;
  priceDate: string;
  navChange: number;
  navChangePercent: number;
  fundType: string;
  manager: string;
  establishDate: string;
  fundSize: number;
  riskLevel: string;
  description: string;
}