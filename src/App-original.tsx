import { useState } from 'react';
import SidebarContainer from './components/Sidebar/SidebarContainer';
import PortfolioDashboard from './components/PortfolioDashboard';
import { mockPortfolioData, mockWealthSpecialist } from './data/mockData';
import type { NavigationItem } from './types';

function App() {
  const [currentPageId, setCurrentPageId] = useState('portfolio');

  const handleNavigationChange = (selectedItem: NavigationItem) => {
    setCurrentPageId(selectedItem.id);
  };

  const getCurrentComponent = () => {
    switch (currentPageId) {
      case 'portfolio':
        return (
          <PortfolioDashboard 
            portfolioData={mockPortfolioData} 
            wealthSpecialist={mockWealthSpecialist} 
          />
        );
      default:
        return (
          <div className="flex-1 bg-gray-50 p-6 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Page under development
              </h2>
              <p className="text-gray-600">This section is under development.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarContainer onNavigationChange={handleNavigationChange} />
      {getCurrentComponent()}
    </div>
  );
}

export default App;
