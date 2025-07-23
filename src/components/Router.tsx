import { useState } from 'react';
import Sidebar from './Sidebar/Sidebar';
import { generateNavigationFromRoutes, findRouteByPath, getDefaultRoute } from '../routes';
import type { NavigationItem } from '../types';

export default function Router() {
  const [currentPath, setCurrentPath] = useState('/dashboard');
  
  // 根据当前路径获取导航项
  const navigation = generateNavigationFromRoutes(currentPath);
  
  // 根据当前路径找到对应的组件
  const currentRoute = findRouteByPath(currentPath) || getDefaultRoute();
  const CurrentComponent = currentRoute.component;
  
  // 处理导航变化
  const handleNavigationChange = (item: NavigationItem) => {
    setCurrentPath(item.href);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* 侧边栏 */}
      <Sidebar 
        navigation={navigation}
        onNavigationChange={handleNavigationChange}
      />
      
      {/* 主内容区域 */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-auto">
          <CurrentComponent />
        </div>
      </div>
    </div>
  );
}
