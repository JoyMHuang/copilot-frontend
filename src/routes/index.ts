import type { NavigationItem } from '../types';
import { Dashboard, FundList, TransactionHistory } from '../pages';

export interface Route {
  id: string;
  path: string;
  component: React.ComponentType;
  name: string;
  icon: string;
}

export const routes: Route[] = [
  {
    id: 'dashboard',
    path: '/dashboard',
    component: Dashboard,
    name: 'Dashboard',
    icon: 'chart-pie',
  },
  {
    id: 'fund-list',
    path: '/fund-list',
    component: FundList,
    name: 'Fund List',
    icon: 'trending-up',
  },
  {
    id: 'transaction-history',
    path: '/transaction-history',
    component: TransactionHistory,
    name: 'Transaction History',
    icon: 'clock',
  },
];

// 从路由生成导航项
export const generateNavigationFromRoutes = (currentPath: string = '/dashboard'): NavigationItem[] => {
  return routes.map(route => ({
    id: route.id,
    name: route.name,
    icon: route.icon,
    href: route.path,
    current: route.path === currentPath,
  }));
};

// 根据路径找到对应的路由
export const findRouteByPath = (path: string): Route | undefined => {
  return routes.find(route => route.path === path);
};

// 获取默认路由
export const getDefaultRoute = (): Route => {
  return routes[0]; // 返回第一个路由作为默认路由（Dashboard）
};
