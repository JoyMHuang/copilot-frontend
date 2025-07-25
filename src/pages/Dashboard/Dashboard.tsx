import { useEffect } from 'react';
import { ChartPieIcon } from '@heroicons/react/24/outline';
import PortfolioDashboard from '../../components/PortfolioDashboard';
import { usePortfolio, useWealthSpecialist } from '../../hooks/useCustomerData';
import { mockPortfolioData, mockWealthSpecialist } from '../../data/mockData';
import './Dashboard.css';

export default function Dashboard() {
  // 使用固定的客户ID，实际应用中应该从路由参数或用户上下文获取
  const customerId = 'C000027106';
  const { portfolioData, loading: portfolioLoading, error: portfolioError } = usePortfolio(customerId);
  const { wealthSpecialist, loading: specialistLoading, error: specialistError } = useWealthSpecialist(customerId);

  // 合并加载状态
  const loading = portfolioLoading || specialistLoading;
  // 合并错误状态
  const error = portfolioError || specialistError;

  // 添加页面标识
  useEffect(() => {
    document.title = 'Dashboard - Manulife Investment Management';
  }, []);

  // 加载状态
  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-content">
          <div className="dashboard-header">
            <ChartPieIcon className="dashboard-icon" />
            <h1 className="dashboard-title">Dashboard</h1>
          </div>
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
          </div>
        </div>
      </div>
    );
  }

  // 错误状态
  if (error) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-content">
          <div className="dashboard-header">
            <ChartPieIcon className="dashboard-icon" />
            <h1 className="dashboard-title">Dashboard</h1>
          </div>
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="text-red-500 text-lg mb-4">
                Error loading dashboard data: {error}
              </div>
              <div className="text-sm text-gray-500">
                Falling back to mock data...
              </div>
            </div>
          </div>
          <div className="dashboard-portfolio">
            <PortfolioDashboard 
              portfolioData={mockPortfolioData}
              wealthSpecialist={mockWealthSpecialist}
            />
          </div>
        </div>
      </div>
    );
  }

  // 成功状态
  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <div className="dashboard-header">
          <ChartPieIcon className="dashboard-icon" />
          <h1 className="dashboard-title">Dashboard</h1>
          <div className="text-sm text-green-600 ml-auto">
            Data loaded from API ✓
          </div>
        </div>
        <div className="dashboard-portfolio">
          <PortfolioDashboard 
            portfolioData={portfolioData || mockPortfolioData}
            wealthSpecialist={wealthSpecialist || mockWealthSpecialist}
          />
        </div>
      </div>
    </div>
  );
}
