import { useState } from 'react';
import Sidebar from './Sidebar';
import { navigationItems, updateNavigationItems } from './navigationConfig';
import type { NavigationItem } from '../../types';

interface SidebarContainerProps {
  onNavigationChange?: (item: NavigationItem) => void;
}

export default function SidebarContainer({ onNavigationChange }: SidebarContainerProps) {
  const [currentNavigation, setCurrentNavigation] = useState(navigationItems);

  const handleNavigationChange = (selectedItem: NavigationItem) => {
    const updatedNavigation = updateNavigationItems(currentNavigation, selectedItem.id);
    setCurrentNavigation(updatedNavigation);
    
    // 调用外部传入的回调函数
    if (onNavigationChange) {
      onNavigationChange(selectedItem);
    }
  };

  return (
    <Sidebar 
      navigation={currentNavigation}
      onNavigationChange={handleNavigationChange}
    />
  );
}
