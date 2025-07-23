import type { NavigationItem } from '../../types';

export const navigationItems: NavigationItem[] = [
  {
    id: 'portfolio',
    name: 'Portfolio Dashboard',
    icon: 'chart-pie',
    href: '/portfolio',
    current: true
  },
  {
    id: 'transact',
    name: 'Transact',
    icon: 'arrow-right-left',
    href: '/transact',
    current: false
  },
  {
    id: 'past-transactions',
    name: 'Past transactions',
    icon: 'clock',
    href: '/past-transactions',
    current: false
  },
  {
    id: 'profile',
    name: 'Profile',
    icon: 'user',
    href: '/profile',
    current: false
  },
  {
    id: 'fund-tools',
    name: 'Fund tools',
    icon: 'tool',
    href: '/fund-tools',
    current: false
  },
  {
    id: 'goal-based',
    name: 'Goal Based Investment',
    icon: 'target',
    href: '/goal-based',
    current: false
  },
  {
    id: 'prices',
    name: 'Prices',
    icon: 'trending-up',
    href: '/prices',
    current: false
  }
];

export const updateNavigationItems = (items: NavigationItem[], selectedId: string): NavigationItem[] => {
  return items.map(item => ({
    ...item,
    current: item.id === selectedId
  }));
};
