import { ChartPieIcon } from '@heroicons/react/24/outline';
import PortfolioDashboard from '../../components/PortfolioDashboard';
import { mockPortfolioData, mockWealthSpecialist } from '../../data/mockData';
import './Dashboard.css';

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <div className="dashboard-header">
          <ChartPieIcon className="dashboard-icon" />
          <h1 className="dashboard-title">Dashboard</h1>
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
